import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple, Smartphone, ArrowUp, Heart } from "lucide-react";
import IosComingSoonModal from "./IosComingSoonModal";
import useAuraVersion from "./useAuraVersion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.aura-cinematic-footer {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;

  --acf-bg: #000000;
  --acf-fg: #ffffff;
  --acf-muted: rgba(255,255,255,0.55);
  --acf-pill-bg-1: rgba(255,255,255,0.04);
  --acf-pill-bg-2: rgba(255,255,255,0.01);
  --acf-pill-bg-1-hover: rgba(255,255,255,0.1);
  --acf-pill-bg-2-hover: rgba(255,255,255,0.03);
  --acf-pill-border: rgba(255,255,255,0.08);
  --acf-pill-border-hover: rgba(255,255,255,0.22);
  --acf-pill-shadow: rgba(0,0,0,0.6);
  --acf-pill-shadow-hover: rgba(0,0,0,0.7);
  --acf-pill-highlight: rgba(255,255,255,0.12);
  --acf-pill-highlight-hover: rgba(255,255,255,0.22);
  --acf-pill-inset-shadow: rgba(0,0,0,0.4);
  --acf-heart: #ff5a72;
}

@keyframes acf-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
}

@keyframes acf-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes acf-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px rgba(255,90,114,0.5)); }
  15%, 45% { transform: scale(1.22); filter: drop-shadow(0 0 12px rgba(255,90,114,0.8)); }
  30% { transform: scale(1); }
}

.acf-breathe { animation: acf-breathe 8s ease-in-out infinite alternate; }
.acf-marquee { animation: acf-marquee 40s linear infinite; }
.acf-heartbeat { animation: acf-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; }

.acf-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.acf-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(255,255,255,0.10) 0%,
    rgba(160,160,160,0.07) 40%,
    transparent 70%
  );
}

.acf-glass-pill {
  background: linear-gradient(145deg, var(--acf-pill-bg-1) 0%, var(--acf-pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--acf-pill-shadow),
    inset 0 1px 1px var(--acf-pill-highlight),
    inset 0 -1px 2px var(--acf-pill-inset-shadow);
  border: 1px solid var(--acf-pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.acf-glass-pill:hover {
  background: linear-gradient(145deg, var(--acf-pill-bg-1-hover) 0%, var(--acf-pill-bg-2-hover) 100%);
  border-color: var(--acf-pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--acf-pill-shadow-hover),
    inset 0 1px 1px var(--acf-pill-highlight-hover);
  color: var(--acf-fg);
}

.acf-giant-text {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.acf-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255,255,255,0.15));
}
`;

const MagneticButton = React.forwardRef(({ as: Component = "button", className = "", children, ...props }, forwardedRef) => {
  const localRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = localRef.current;
    if (!element) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const onMove = (e) => {
        const rect = element.getBoundingClientRect();
        const hw = rect.width / 2;
        const hh = rect.height / 2;
        const x = e.clientX - rect.left - hw;
        const y = e.clientY - rect.top - hh;
        gsap.to(element, {
          x: x * 0.35,
          y: y * 0.35,
          rotationX: -y * 0.12,
          rotationY: x * 0.12,
          scale: 1.04,
          ease: "power2.out",
          duration: 0.4
        });
      };
      const onLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: "elastic.out(1, 0.4)",
          duration: 1.0
        });
      };
      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);
      return () => {
        element.removeEventListener("mousemove", onMove);
        element.removeEventListener("mouseleave", onLeave);
      };
    }, element);

    return () => ctx.revert();
  }, []);

  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Component ref={setRef} className={`cursor-pointer ${className}`} {...props}>
      {children}
    </Component>
  );
});
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 text-white/55">
    <span>Attendance, Reimagined</span><span className="text-white/30">✦</span>
    <span>Zero Manual Entry</span><span className="text-white/30">✦</span>
    <span>Real-Time Sync</span><span className="text-white/30">✦</span>
    <span>One Central Roster</span><span className="text-white/30">✦</span>
    <span>Built for Campuses</span><span className="text-white/30">✦</span>
  </div>
);

export default function CinematicFooter() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const [iosOpen, setIosOpen] = useState(false);
  const auraVersion = useAuraVersion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <IosComingSoonModal open={iosOpen} onClose={() => setIosOpen(false)} />

      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="aura-cinematic-footer fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-black text-white">
          <div className="acf-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 acf-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="acf-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div
            ref={giantTextRef}
            className="acf-giant-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            AURA
          </div>

          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/[0.06] bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max acf-marquee text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-8xl font-black acf-text-glow tracking-tighter mb-12 text-center"
            >
              Ready to begin?
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="a"
                  href="/Aura.apk"
                  download
                  className="acf-glass-pill px-10 py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <Smartphone className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.8} />
                  Download Android
                </MagneticButton>

                <MagneticButton
                  as="button"
                  onClick={() => setIosOpen(true)}
                  className="acf-glass-pill px-10 py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <Apple className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" strokeWidth={1.8} />
                  Download iOS
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mt-2">
                <MagneticButton
                  as="a"
                  href="#help/privacy-policy/privacy-policy-full"
                  className="acf-glass-pill px-6 py-3 rounded-full text-white/55 font-medium text-xs md:text-sm hover:text-white"
                >
                  Privacy Policy
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#help/terms/terms-full"
                  className="acf-glass-pill px-6 py-3 rounded-full text-white/55 font-medium text-xs md:text-sm hover:text-white"
                >
                  Terms of Service
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href="#help/contact/contact-flow"
                  className="acf-glass-pill px-6 py-3 rounded-full text-white/55 font-medium text-xs md:text-sm hover:text-white"
                >
                  Support
                </MagneticButton>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
              <div className="text-white/45 text-[10px] md:text-xs font-semibold tracking-widest uppercase">
                © {new Date().getFullYear()} Aura Platform. All rights reserved.
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono text-white/35">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                Aura v{auraVersion.version}{auraVersion.buildNumber ? `+${auraVersion.buildNumber}` : ""} · Free to use
              </div>
            </div>

            <div className="acf-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10">
              <span className="text-white/55 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <Heart className="acf-heartbeat h-3.5 w-3.5 md:h-4 md:w-4" fill="#ff5a72" stroke="none" />
              <span className="text-white/55 text-[10px] md:text-xs font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">Byteforce</span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full acf-glass-pill flex items-center justify-center text-white/55 hover:text-white group order-3"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" strokeWidth={1.8} />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
