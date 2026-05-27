import { useEffect, useState } from "react";

const FALLBACK = { version: "1.33.2", buildNumber: "75" };
let cached = null;
let pending = null;

const fetchOnce = () => {
  if (cached) return Promise.resolve(cached);
  if (pending) return pending;
  pending = fetch("/version.json", { cache: "no-cache" })
    .then((r) => (r.ok ? r.json() : FALLBACK))
    .then((data) => {
      cached = data;
      return data;
    })
    .catch(() => FALLBACK);
  return pending;
};

export default function useAuraVersion() {
  const [v, setV] = useState(cached || FALLBACK);
  useEffect(() => {
    let alive = true;
    fetchOnce().then((data) => {
      if (alive) setV(data);
    });
    return () => {
      alive = false;
    };
  }, []);
  return v;
}
