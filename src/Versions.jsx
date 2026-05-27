import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, Package } from "lucide-react";

const smoothEase = [0.23, 1, 0.32, 1];

const FALLBACK = {
  history: [
    {
      version: "1.33.2",
      buildNumber: "75",
      releasedAt: "2026-05-24",
      note: null
    }
  ]
};

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
};

const Row = ({ entry, index, isLatest }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: smoothEase }}
      className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-zinc-900 py-7 transition-colors hover:bg-white/[0.015] md:gap-10 md:py-8"
    >
      <div className="flex flex-col">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-600">
          v
        </span>
        <span className="text-2xl font-bold tabular-nums tracking-tight text-white md:text-3xl">
          {entry.version}
        </span>
        {entry.buildNumber && (
          <span className="mt-1 font-mono text-[11px] text-zinc-600">
            build {entry.buildNumber}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          {formatDate(entry.releasedAt)}
          {isLatest && (
            <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold tracking-[0.18em] text-black">
              LATEST
            </span>
          )}
        </div>
        {entry.note && (
          <p className="mt-2 max-w-2xl text-[15px] font-light leading-relaxed text-zinc-400 md:text-base">
            {entry.note}
          </p>
        )}
      </div>

      <div className="hidden text-right md:block">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700 transition-colors group-hover:text-zinc-500">
          Release
        </div>
        <div className="mt-1 font-mono text-[11px] text-zinc-600 transition-colors group-hover:text-zinc-400">
          #{String(index + 1).padStart(2, "0")}
        </div>
      </div>
    </motion.div>
  );
};

export default function Versions() {
  const [data, setData] = useState(FALLBACK);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    let alive = true;
    fetch("/versions-history.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : FALLBACK))
      .then((d) => {
        if (alive && d && Array.isArray(d.history) && d.history.length > 0) setData(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const list = data.history || [];

  return (
    <section
      id="releases"
      className="relative z-10 overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 lg:max-w-5xl">
        <div ref={headerRef} className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm"
            >
              <GitBranch className="h-3.5 w-3.5 text-zinc-400" strokeWidth={1.8} />
              Releases
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08, ease: smoothEase }}
              className="mt-5 text-3xl font-black tracking-tight text-white md:text-5xl"
            >
              Every version, every build.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
              className="mt-4 max-w-xl text-base font-light leading-relaxed text-zinc-400 md:text-lg"
            >
              Aura ships often. This log updates automatically the moment a new APK lands.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.22, ease: smoothEase }}
            className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3"
          >
            <Package className="h-4 w-4 text-zinc-400" strokeWidth={1.6} />
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Total releases
              </div>
              <div className="font-mono text-lg font-bold tabular-nums text-white">
                {String(list.length).padStart(2, "0")}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-zinc-900">
          {list.map((entry, i) => (
            <Row
              key={`${entry.version}-${entry.buildNumber || i}`}
              entry={entry}
              index={i}
              isLatest={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
