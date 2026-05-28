/**
 * sync-version.mjs
 *
 * Source-of-truth for the Aura landing-page's displayed version.
 *
 * Resolution order (first hit wins):
 *   1. `aapt dump badging public/Aura.apk` — best, reads APK metadata directly
 *      (Android SDK build-tools must be on PATH; CI always has this).
 *   2. `package.json#auraAppVersion` / `auraAppBuildNumber` — local fallback.
 *      Update these when the APK changes if you don't have aapt installed.
 *   3. Hard default "0.0.0".
 *
 * Writes `public/version.json` which the landing page fetches at runtime.
 * Also overwrites `package.json` fields when aapt produced a fresher value,
 * so the package.json fallback stays in sync.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const apkPath = join(root, "public", "Aura.apk");
const pkgPath = join(root, "package.json");
const outPath = join(root, "public", "version.json");
const historyPath = join(root, "public", "versions-history.json");

const tryAapt = () => {
  if (!existsSync(apkPath)) return null;
  let output;
  try {
    output = execSync(`aapt dump badging "${apkPath}"`, {
      stdio: ["pipe", "pipe", "pipe"]
    }).toString();
  } catch {
    return null;
  }
  const versionMatch = output.match(/versionName='([^']*)'/);
  const buildMatch = output.match(/versionCode='([^']*)'/);
  if (!versionMatch) return null;
  return {
    version: versionMatch[1],
    buildNumber: buildMatch ? buildMatch[1] : null,
    source: "aapt"
  };
};

const readPkg = () => {
  try {
    return JSON.parse(readFileSync(pkgPath, "utf-8"));
  } catch {
    return null;
  }
};

const fromPackageJson = () => {
  const pkg = readPkg();
  if (!pkg) return null;
  if (!pkg.auraAppVersion) return null;
  return {
    version: pkg.auraAppVersion,
    buildNumber: pkg.auraAppBuildNumber || null,
    source: "package.json"
  };
};

const info =
  tryAapt() ||
  fromPackageJson() || {
    version: "0.0.0",
    buildNumber: null,
    source: "default"
  };

// If aapt produced a newer value than package.json, keep them in sync so the
// next run still has a sensible fallback if aapt isn't available.
if (info.source === "aapt") {
  const pkg = readPkg();
  if (pkg) {
    let changed = false;
    if (pkg.auraAppVersion !== info.version) {
      pkg.auraAppVersion = info.version;
      changed = true;
    }
    if (info.buildNumber && pkg.auraAppBuildNumber !== info.buildNumber) {
      pkg.auraAppBuildNumber = info.buildNumber;
      changed = true;
    }
    if (changed) {
      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log(
        `[sync-version] package.json updated: v${pkg.auraAppVersion}${
          pkg.auraAppBuildNumber ? `+${pkg.auraAppBuildNumber}` : ""
        }`
      );
    }
  }
}

const payload = {
  version: info.version,
  buildNumber: info.buildNumber,
  generatedAt: new Date().toISOString(),
  source: info.source
};

writeFileSync(outPath, JSON.stringify(payload, null, 2) + "\n");

const label = `v${payload.version}${
  payload.buildNumber ? `+${payload.buildNumber}` : ""
}`;
console.log(
  `[sync-version] wrote ${outPath.replace(root + "\\", "").replace(root + "/", "")}: ${label} (source: ${payload.source})`
);

// Update versions-history.json — prepend a new entry whenever the current
// version isn't already at the top. Keeps a rolling release log fed by the
// same sync mechanism the APK runs through.
try {
  let history = { history: [] };
  if (existsSync(historyPath)) {
    history = JSON.parse(readFileSync(historyPath, "utf-8"));
    if (!Array.isArray(history.history)) history.history = [];
  }
  // Match on versionName ONLY. Same-version rebuilds (per-ABI split codes,
  // CI build offsets, etc.) should refresh the buildNumber on the existing
  // row rather than creating a duplicate. New versionNames get prepended.
  const existingIdx = history.history.findIndex(
    (e) => e && e.version === payload.version
  );
  if (existingIdx >= 0) {
    const existing = history.history[existingIdx];
    let changed = false;
    if (
      payload.buildNumber &&
      String(existing.buildNumber || "") !== String(payload.buildNumber)
    ) {
      existing.buildNumber = payload.buildNumber;
      changed = true;
    }
    if (changed) {
      writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");
      console.log(
        `[sync-version] refreshed buildNumber on existing ${payload.version} → ${payload.buildNumber}`
      );
    }
  } else {
    history.history.unshift({
      version: payload.version,
      buildNumber: payload.buildNumber,
      releasedAt: new Date().toISOString().slice(0, 10),
      // Generic placeholder — edit public/versions-history.json directly
      // (note + optional highlights array) to give a release real text.
      note: "New build — rolling improvements and fixes."
    });
    if (history.history.length > 30) history.history = history.history.slice(0, 30);
    writeFileSync(historyPath, JSON.stringify(history, null, 2) + "\n");
    console.log(`[sync-version] prepended ${label} to versions-history.json`);
  }
} catch (err) {
  console.warn(`[sync-version] could not update versions-history.json: ${err.message}`);
}
