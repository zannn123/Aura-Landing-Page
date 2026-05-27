import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScanFace, ShieldCheck, Activity, FileBarChart, Users } from "lucide-react";

const smoothEase = [0.23, 1, 0.32, 1];

const Counter = ({ to = 100, isInView, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) { setCount(to); return; }
    const duration = 1600;
    const startTs = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - startTs) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, to, reduce]);

  return <span>{count}{suffix}</span>;
};

const BentoShell = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: smoothEase }}
      className={`group relative overflow-hidden rounded-[2rem] border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm transition-colors duration-500 hover:border-zinc-700 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

const CardContactless = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <BentoShell className="col-span-full lg:col-span-2">
      <div ref={ref} className="flex h-full flex-col justify-between p-8 md:p-10">
        <div className="relative flex h-32 w-full items-center justify-center">
          <svg className="absolute inset-0 h-full w-full text-zinc-800/70" viewBox="0 0 254 104" fill="none">
            <motion.path
              d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: smoothEase }}
            />
          </svg>
          <div className="relative font-black tracking-tight text-white" style={{ fontSize: "clamp(2.6rem, 5vw, 3.4rem)" }}>
            <Counter to={100} suffix="%" isInView={inView} />
          </div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white">Contactless</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Face-scan attendance in under a second. No paper, no roll call, no clipboard chaos.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

const CardVerified = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  return (
    <BentoShell className="col-span-full sm:col-span-3 lg:col-span-2" delay={0.1}>
      <div ref={ref} className="flex h-full flex-col justify-between p-8 md:p-10">
        <div className="relative mx-auto flex aspect-square h-32 w-32 items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-white/15"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={inView ? { scale: [0.6, 1.2, 1.6], opacity: [0, 0.6, 0] } : {}}
              transition={{ duration: 2.8, repeat: reduce ? 0 : Infinity, delay: i * 0.6, ease: "easeOut" }}
            />
          ))}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10"
          >
            <ScanFace className="h-10 w-10 text-white" strokeWidth={1.5} />
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={inView && !reduce ? { y: 40, opacity: [0, 1, 0] } : {}}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            />
          </motion.div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white">Verified Identity</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Biometric face match locks attendance to the real student. No proxy sign-ins, ever.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

const CardRealTime = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  return (
    <BentoShell className="col-span-full sm:col-span-3 lg:col-span-2" delay={0.2}>
      <div ref={ref} className="flex h-full flex-col justify-between p-8 md:p-10">
        <div className="relative mx-auto flex h-32 w-full items-center justify-center">
          <svg viewBox="0 0 240 100" className="w-full h-full" fill="none">
            <defs>
              <linearGradient id="rtFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,70 C20,60 35,40 55,45 C75,50 85,75 105,72 C125,69 135,38 155,30 C175,22 190,52 210,48 C220,46 230,40 240,42 L240,100 L0,100 Z"
              fill="url(#rtFill)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.path
              d="M0,70 C20,60 35,40 55,45 C75,50 85,75 105,72 C125,69 135,38 155,30 C175,22 190,52 210,48 C220,46 230,40 240,42"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            {[55, 105, 155, 210].map((cx, i) => (
              <motion.circle
                key={cx}
                cx={cx}
                cy={[45, 72, 30, 48][i]}
                r={3.5}
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.2 }}
              />
            ))}
          </svg>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300"
          >
            <motion.span
              animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
            Live
          </motion.div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-white">Real-Time Sync</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Every check-in writes to your live dashboard the moment it happens. No refresh button needed.
          </p>
        </div>
      </div>
    </BentoShell>
  );
};

const CardAutoReports = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const bars = [62, 78, 54, 88, 70, 92, 81];
  return (
    <BentoShell className="col-span-full lg:col-span-3" delay={0.1}>
      <div ref={ref} className="grid h-full pt-8 sm:grid-cols-2">
        <div className="flex flex-col justify-between space-y-6 p-8 md:p-10 md:pr-6">
          <div className="relative flex aspect-square h-12 w-12 items-center justify-center rounded-full border border-white/10">
            <div className="absolute -inset-2 rounded-full border border-white/5" />
            <FileBarChart className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Reports That Write Themselves</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Monthly attendance, chronic-absence flags, compliance reports — generated by Aura AI in seconds, not hours.
            </p>
          </div>
        </div>
        <div className="relative mt-2 -mb-px -mr-px overflow-hidden rounded-tl-2xl border-l border-t border-zinc-800/70 bg-black/30 p-6 md:mt-0 md:ml-2">
          <div className="absolute top-3 left-3 flex gap-1">
            <span className="block h-2 w-2 rounded-full bg-zinc-700" />
            <span className="block h-2 w-2 rounded-full bg-zinc-700" />
            <span className="block h-2 w-2 rounded-full bg-zinc-700" />
          </div>
          <div className="mt-6 flex h-32 items-end justify-between gap-2">
            {bars.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={inView ? { height: `${h}%` } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: smoothEase }}
                className="relative flex-1 overflow-hidden rounded-md bg-gradient-to-t from-white/10 to-white/60"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="absolute inset-x-0 top-0 h-px bg-white"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-600">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </div>
    </BentoShell>
  );
};

const CardCentralRoster = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const people = [
    { name: "Gabriel D.", role: "BSCPE 2", side: "right", top: "10%" },
    { name: "Maria L.", role: "BSIT 3", side: "left", top: "44%" },
    { name: "James T.", role: "BSCPE 1", side: "right", top: "76%" },
  ];
  return (
    <BentoShell className="col-span-full lg:col-span-3" delay={0.2}>
      <div ref={ref} className="grid h-full pt-8 sm:grid-cols-2">
        <div className="flex flex-col justify-between space-y-6 p-8 md:p-10 md:pr-6">
          <div className="relative flex aspect-square h-12 w-12 items-center justify-center rounded-full border border-white/10">
            <div className="absolute -inset-2 rounded-full border border-white/5" />
            <Users className="h-5 w-5 text-white" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">One Central Roster</h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              Every class, every student, every record — unified. No more twelve spreadsheets and three chat apps.
            </p>
          </div>
        </div>
        <div className="relative mt-2 -mb-px -mr-px overflow-hidden rounded-tl-2xl border-l border-t border-zinc-800/70 bg-black/30 md:mt-0 md:ml-2">
          <div className="relative h-full min-h-[220px]">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />
            {people.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: p.side === "right" ? -20 : 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.25, ease: smoothEase }}
                className={`absolute flex items-center gap-2 ${p.side === "right" ? "right-4 flex-row-reverse" : "left-4"}`}
                style={{ top: p.top }}
              >
                <div className="ring-4 ring-black">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 text-[10px] font-bold text-black">
                    {p.name.split(" ").map((s) => s[0]).join("")}
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-left backdrop-blur-sm">
                  <div className="text-xs font-semibold text-white">{p.name}</div>
                  <div className="text-[10px] text-zinc-500">{p.role}</div>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.25 }}
                  className={`absolute top-1/2 h-px w-6 -translate-y-1/2 bg-zinc-700 ${p.side === "right" ? "right-full mr-1" : "left-full ml-1"}`}
                />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView && !reduce ? { opacity: [0, 0.6, 0] } : {}}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-white to-transparent"
              style={{ filter: "blur(1px)" }}
            />
          </div>
        </div>
      </div>
    </BentoShell>
  );
};

export default function FeaturesBento() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-10 overflow-hidden border-t border-zinc-900 bg-zinc-950 py-24 md:py-32"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.04),transparent_50%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 lg:max-w-6xl">
        <div ref={headingRef} className="mb-16 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-zinc-400" />
            What Aura solves
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
            className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl"
          >
            From clipboards{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">
              to clarity.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
            className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-zinc-400 md:text-lg"
          >
            Every annoying part of attendance — paper rosters, scattered records, manual entry — gone. Replaced by one centralized, biometric-verified system that just works.
          </motion.p>
        </div>

        <div className="relative">
          <div className="relative z-10 grid grid-cols-6 gap-3 md:gap-4">
            <CardContactless />
            <CardVerified />
            <CardRealTime />
            <CardAutoReports />
            <CardCentralRoster />
          </div>
        </div>
      </div>
    </section>
  );
}
