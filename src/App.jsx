import React, { useState, useEffect, useRef } from 'react';
import { Download, Apple, Smartphone, Shield, Zap, Lock, Star, Menu, X, CheckCircle2, Globe, MessageCircle, Share2, Bot, Sparkles, BarChart3, FileText, Database, RotateCcw, Box, Command, Code, Folder, GitBranch, Terminal, Layout, Key, GitMerge, MapPin, ScanFace } from 'lucide-react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import TextPressure from './TextPressure';
import TrueFocus from './TrueFocus';
import ScrollFloat from './ScrollFloat';

const Beams = React.lazy(() => import('./Beams'));

// --- Immersive Chat Simulation ---
const ImmersiveChat = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isInView) {
      const t1 = setTimeout(() => setPhase(1), 500);  // User message pops in
      const t2 = setTimeout(() => setPhase(2), 1500); // Loader pops in
      const t3 = setTimeout(() => setPhase(3), 4500); // AI Response pops in

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isInView]);

  // Smooth easing curve for Pro Max feel
  const smoothEase = [0.23, 1, 0.32, 1];

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] py-20 px-6">
      <div className="w-full flex flex-col gap-8">

        {/* User Message */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: smoothEase }}
              className="flex justify-end origin-bottom-right"
            >
              <div className="bg-zinc-900 border border-zinc-800 text-white rounded-3xl rounded-tr-sm px-6 py-4 text-base md:text-lg max-w-[85%] md:max-w-[75%] shadow-lg leading-relaxed">
                Can you generate the monthly attendance report for Computer Engineering BSCPE 2?
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loader */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="flex justify-center py-2"
            >
              {/* Scale down the loader slightly to fit the chat flow */}
              <div className="transform scale-75 md:scale-100 origin-center">
                <Loader />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Response */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="flex justify-start origin-top-left"
            >
              <div className="bg-white text-black rounded-[2rem] rounded-tl-sm p-6 md:p-8 w-full md:max-w-[85%] shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center overflow-hidden border border-zinc-200">
                    <img
                      src="/logo-black.png"
                      alt="Aura AI"
                      className="w-7 h-7 object-contain"
                      onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"; }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Aura AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Database className="w-3 h-3 text-zinc-500" />
                      <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">System Administrator</p>
                    </div>
                  </div>
                </div>

                <p className="text-base md:text-lg font-medium text-zinc-800 mb-6">Report successfully generated and verified.</p>

                <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-sm md:text-base text-zinc-800 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> Overall Attendance
                    </span>
                    <span className="font-bold text-2xl text-black">92%</span>
                  </div>
                  <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                      className="bg-black h-full rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-full h-full animate-[pulse_2s_ease-in-out_infinite]" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

// --- Face Attendance Scan Simulation ---
const FaceAttendanceScan = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30% 0px -30% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const isPerformanceMode = usePerformanceMode();
  const [phase, setPhase] = useState(0);
  const smoothEase = [0.23, 1, 0.32, 1];
  const stages = [
    {
      label: 'Checking In...',
      icon: MapPin,
      detail: 'Location confirmed',
      kind: 'anchor'
    },
    {
      label: 'Scanning Face',
      icon: ScanFace,
      detail: 'Matching biometric profile',
      kind: 'scan'
    },
    {
      label: 'Attendance Marked.',
      icon: CheckCircle2,
      detail: 'Synced to class record',
      kind: 'done'
    }
  ];
  const activeStage = stages[Math.min(phase, stages.length - 1)];
  const ActiveIcon = activeStage.icon;

  useEffect(() => {
    if (!isInView) return undefined;
    if (shouldReduceMotion || isPerformanceMode) {
      setPhase(3);
      return undefined;
    }

    const timers = [
      setTimeout(() => setPhase(1), 1300),
      setTimeout(() => setPhase(2), 2700),
      setTimeout(() => setPhase(3), 4100)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isInView, shouldReduceMotion, isPerformanceMode]);

  return (
    <div ref={ref} className="relative bg-black py-16 md:py-24">
      <div className="relative flex min-h-[72svh] items-center justify-center overflow-hidden px-6 py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-black/55" />

        <AnimatePresence mode="wait">
          {phase < 3 ? (
            <motion.div
              key="seamless-sync-card"
              initial={{ opacity: 0, y: 40, scale: 0.94, filter: "blur(12px)" }}
              animate={{
                opacity: 1,
                y: 0,
                scale: phase === 2 ? [1, 1.025, 1] : 1,
                filter: "blur(0px)"
              }}
              exit={{ opacity: 0, y: -30, scale: 0.96, filter: "blur(14px)" }}
              transition={{ duration: 0.7, ease: smoothEase }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:p-12"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

              <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/15 bg-black/40 md:h-44 md:w-44">
                {activeStage.kind === 'anchor' && (
                  <>
                    <motion.div
                      animate={{ opacity: [0, 0.55, 0], scale: [0.82, 1.35, 1.75] }}
                      transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-6 rounded-full border border-white/35"
                    />
                    <motion.div
                      animate={{ opacity: [0.1, 0.35, 0.1], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-[2rem] bg-white/10 blur-xl"
                    />
                  </>
                )}

                {activeStage.kind === 'scan' && (
                  <motion.div
                    initial={{ y: -52, opacity: 0 }}
                    animate={{ y: 52, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.9, repeat: 1, ease: "easeInOut" }}
                    className="absolute left-6 right-6 h-12 bg-gradient-to-b from-transparent via-white/45 to-transparent blur-sm"
                  />
                )}

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.label}
                    initial={{ opacity: 0, scale: 0.72, rotate: -8, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.72, rotate: 8, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: smoothEase }}
                    className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-[1.5rem] ${activeStage.kind === 'done' ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
                  >
                    <ActiveIcon className="h-10 w-10" strokeWidth={1.7} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeStage.label}-copy`}
                  initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: smoothEase }}
                  className="mt-8"
                >
                  <p className="text-4xl font-black tracking-tight text-white md:text-6xl">{activeStage.label}</p>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.22em] text-zinc-500">{activeStage.detail}</p>
                </motion.div>
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mx-auto mt-8 max-w-sm text-base leading-relaxed text-zinc-300 md:text-lg"
              >
                Using Insight for reliable, accurate face scan.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="seamless-sync-statement"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: smoothEase }}
              className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-0 text-center"
            >
              {[
                { text: 'Fast attendance.', height: 'h-[70px] sm:h-[88px] md:h-[112px]', min: 28, max: 104 },
                { text: 'Reliable.', height: 'h-[64px] sm:h-[78px] md:h-[100px]', min: 34, max: 104 },
                { text: 'Secure.', height: 'h-[64px] sm:h-[78px] md:h-[100px]', min: 34, max: 104 }
              ].map((line) => (
                <div key={line.text} className={`w-full max-w-[92vw] ${line.height}`}>
                  <TextPressure
                    text={line.text}
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
                    italic={true}
                    textColor="#ffffff"
                    strokeColor="#ffffff"
                    minFontSize={line.min}
                    maxFontSize={line.max}
                    disableAnimation={isPerformanceMode}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Framer Motion Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  }
};

const usePerformanceMode = () => {
  const [isPerformanceMode, setIsPerformanceMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setIsPerformanceMode(reducedMotion.matches);
    update();
    reducedMotion.addEventListener('change', update);
    return () => reducedMotion.removeEventListener('change', update);
  }, []);

  return isPerformanceMode;
};

// --- iOS PWA Install Modal ---
const IOSInstallModal = ({ isOpen, onClose }) => {
  const smoothEase = [0.23, 1, 0.32, 1];
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    if (!isOpen) { setActiveStep(0); setLaunched(false); return; }
    const timers = [
      setTimeout(() => setActiveStep(1), 1200),
      setTimeout(() => setActiveStep(2), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  const steps = [
    {
      number: '01',
      title: 'Open in Safari',
      desc: 'Tap the button below. This only works in Safari — not Chrome or Firefox.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
          <path d="m16.24 7.76-4.95 2.83-2.83 4.95 4.95-2.83 2.83-4.95z" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Tap the Share Icon',
      desc: 'At the bottom of Safari, tap the Share button — the box with an arrow pointing up.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Add to Home Screen',
      desc: 'Scroll the share sheet and tap "Add to Home Screen", then tap Add in the top right.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('https://aura-test.coeofjrmsu.com/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunch = () => {
    setLaunched(true);
    setTimeout(() => window.open('https://aura-test.coeofjrmsu.com/', '_blank'), 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          style={{ background: 'rgba(0,0,0,0.75)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop blur layer */}
          <div className="absolute inset-0 backdrop-blur-2xl pointer-events-none" />

          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="relative w-full sm:max-w-md z-10"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/0 pointer-events-none" />

            <div className="bg-[#0a0a0a] rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/[0.07] shadow-[0_-40px_120px_rgba(0,0,0,0.8)]">

              {/* Shimmer top line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Drag pill */}
              <div className="flex justify-center pt-3.5 pb-0 sm:hidden">
                <motion.div
                  animate={{ scaleX: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-9 h-1 bg-zinc-700 rounded-full"
                />
              </div>

              <div className="px-6 pt-5 pb-7 sm:px-8 sm:pt-7 sm:pb-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3.5">
                    <motion.div
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="w-11 h-11 bg-white text-black rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-shrink-0"
                    >
                      <Apple className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <h2 className="text-[17px] font-bold text-white tracking-tight leading-tight">Install on iPhone</h2>
                      <p className="text-zinc-500 text-xs mt-0.5">Safari required · 3 steps</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all active:scale-90"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visual phone preview strip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: smoothEase }}
                  className="relative mb-6 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-4"
                >
                  {/* Fake Safari bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                    </div>
                    <div className="flex-1 bg-zinc-800 rounded-md px-3 py-1 flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full border border-zinc-600 flex-shrink-0" />
                      <span className="text-[10px] text-zinc-500 font-mono truncate">aura-test.coeofjrmsu.com</span>
                    </div>
                  </div>
                  {/* Fake page content */}
                  <div className="space-y-1.5">
                    <div className="h-2 bg-zinc-800 rounded-full w-3/4" />
                    <div className="h-2 bg-zinc-800 rounded-full w-1/2" />
                    <div className="h-2 bg-zinc-800 rounded-full w-2/3" />
                  </div>
                  {/* Animated active step highlight */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-3 right-3 px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-lg"
                    >
                      {activeStep === 0 && '① Open Safari'}
                      {activeStep === 1 && '② Tap Share ↑'}
                      {activeStep === 2 && '③ Add to Home'}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Steps */}
                <div className="flex flex-col gap-2 mb-6">
                  {steps.map((step, i) => {
                    const isActive = activeStep === i;
                    const isDone = activeStep > i;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: smoothEase }}
                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border transition-all duration-500 ${
                          isActive
                            ? 'bg-white/[0.06] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.04)]'
                            : isDone
                            ? 'bg-zinc-900/40 border-zinc-800/40 opacity-60'
                            : 'bg-zinc-900/30 border-zinc-800/30 opacity-40'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                          isActive ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                          : isDone ? 'bg-zinc-800 text-zinc-400'
                          : 'bg-zinc-900 text-zinc-600'
                        }`}>
                          {isDone
                            ? <CheckCircle2 className="w-5 h-5" />
                            : step.icon
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black tracking-[0.18em] uppercase transition-colors duration-500 ${
                              isActive ? 'text-zinc-400' : 'text-zinc-700'
                            }`}>{step.number}</span>
                            <span className={`text-sm font-semibold transition-colors duration-500 ${
                              isActive ? 'text-white' : isDone ? 'text-zinc-500' : 'text-zinc-600'
                            }`}>{step.title}</span>
                          </div>
                          <p className={`text-[11px] leading-relaxed mt-0.5 transition-colors duration-500 ${
                            isActive ? 'text-zinc-400' : 'text-zinc-700'
                          }`}>{step.desc}</p>
                        </div>
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-white flex-shrink-0"
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: smoothEase }}
                  className="flex gap-2.5"
                >
                  <motion.button
                    onClick={handleLaunch}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-[0_0_40px_rgba(255,255,255,0.12)] hover:bg-zinc-100 transition-colors relative overflow-hidden"
                  >
                    {launched ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" /> Opened!
                      </motion.span>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" />
                        Open in Safari
                      </>
                    )}
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 1 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                    />
                  </motion.button>

                  <motion.button
                    onClick={handleCopy}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Copied!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex items-center gap-1.5 text-xs whitespace-nowrap"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Copy Link
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>

                <p className="text-center text-[10px] text-zinc-700 mt-4 font-medium tracking-wide">SAFARI ONLY · iOS 16.4+ REQUIRED FOR PWA</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Early Access Modal ---
const EarlyAccessModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    try {
      // Use the raw email endpoint to ensure delivery. 
      // Formsubmit will process this asynchronously.
      const response = await fetch("https://formsubmit.co/ajax/auraautomessage@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "🔥 New Aura Early Access Feedback",
          message: feedback,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        // Fallback to mailto if API fails
        throw new Error("API failed");
      }
    } catch (error) {
      console.error("Failed to send feedback silently:", error);
      // Fallback: Open mail client if FormSubmit is blocked or fails
      const subject = encodeURIComponent("Aura Early Access Feedback");
      const body = encodeURIComponent(feedback);
      window.location.href = `mailto:auraautomessage@gmail.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setTimeout(() => onClose(), 3000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-[50px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8 relative z-10">
              <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-lg shadow-white/10">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Early Release Access</h2>
              <p className="text-zinc-400 font-light text-sm leading-relaxed">
                Welcome to Aura! You are experiencing an early development build. We'd love your feedback to help shape the future of the platform.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts, feature requests, or report bugs..."
                  className="w-full h-32 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-zinc-200 hover:-translate-y-1 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Feedback
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 border border-white/20 text-white rounded-2xl p-6 text-center flex flex-col items-center gap-3 relative z-10"
              >
                <CheckCircle2 className="w-8 h-8 text-white" />
                <p className="font-medium text-sm">Feedback sent successfully!</p>
              </motion.div>
            )}

            <p className="text-xs text-zinc-600 text-center mt-6 relative z-10">
              Or contact our team directly in the Team section below.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEarlyAccess, setShowEarlyAccess] = useState(false);
  const [showIOSInstall, setShowIOSInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const isPerformanceMode = usePerformanceMode();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const timer = setTimeout(() => setShowEarlyAccess(true), 2000);

    const handleBeforeInstall = (e) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallPWA = () => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      setShowIOSInstall(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
    } else {
      window.open('https://aura-test.coeofjrmsu.com/', '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-200 selection:text-black overflow-x-hidden">
      <EarlyAccessModal isOpen={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
      <IOSInstallModal isOpen={showIOSInstall} onClose={() => setShowIOSInstall(false)} />

      {/* Background gradients for visual depth */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 z-0">
          {!isPerformanceMode ? (
            <React.Suspense fallback={null}>
              <Beams
                beamWidth={2}
                beamHeight={15}
                beamNumber={12}
                lightColor="#ffffff"
                speed={2}
                noiseIntensity={1.75}
                scale={0.2}
                rotation={49}
              />
            </React.Suspense>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_42%)]" />
          )}
        </div>
        {!isPerformanceMode && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-700/10 blur-[100px] rounded-full mix-blend-screen" />
          </>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img
              src="/logo-white.png"
              alt="Aura Logo"
              className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
              loading="lazy"
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"; }}
            />
            <span className="font-bold text-xl tracking-tight">Aura</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#team" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Team</a>
            <a href="#reviews" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Reviews</a>
            <a href="#download" className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
              Get Started
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-300 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
        >
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-zinc-300 hover:text-white transition-colors">Features</a>
          <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-zinc-300 hover:text-white transition-colors">Team</a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-zinc-300 hover:text-white transition-colors">Reviews</a>
          <a href="#download" onClick={() => setMobileMenuOpen(false)} className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-full mt-4">
            Get the App
          </a>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex-1 text-center lg:text-left"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-xs font-medium text-zinc-300 mb-8">
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-white"
            />
            Aura v1.3 is now live
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-6">
            Elegance in every <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
              interaction.
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Experience the pinnacle of digital attendance and academic management. Aura brings a minimalist, hyper-fast, and secure platform right to your fingertips.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <a
              href="/app-release.apk"
              download
              className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white text-black rounded-2xl font-semibold hover:bg-zinc-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              <Smartphone className="w-5 h-5" />
              <span>Download APK</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <button
              onClick={handleInstallPWA}
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <Apple className="w-5 h-5" />
              <span>Install the App</span>
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-zinc-500 font-medium">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-zinc-${i * 2}00 flex items-center justify-center overflow-hidden shadow-lg`}>
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
                <Star className="w-4 h-4 fill-white text-white" />
              </div>
              <span>Trusted by 10k+ users</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-[320px] h-[650px] bg-black border-[8px] border-zinc-800 rounded-[3.5rem] shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-zinc-800 rounded-b-xl z-20" />
            <div className="absolute inset-0 bg-black z-0" />

            {/* Mockup App Screenshot */}
            <img
              src="/demo.png"
              alt="Aura mobile app demo"
              className="relative z-10 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          {/* Decorative blur elements behind mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </section>

      {/* Immersive AI Sequence */}
      <section id="ai-chat" className="pt-20 pb-10 relative z-10 bg-black overflow-hidden border-t border-zinc-900 min-h-[80vh] flex items-center">
        <ImmersiveChat />
      </section>

      {/* Face Scanning Attendance View */}
      <section id="face-attendance" className="relative z-10 overflow-hidden bg-black border-t border-zinc-900">
        <FaceAttendanceScan />
      </section>

      {/* Aura AI Capabilities Section */}
      <section id="ai-features" className="py-24 relative z-10 bg-black overflow-hidden">
        {/* Dynamic Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[1000px] bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 relative z-10"
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 bg-black/50 backdrop-blur-md text-sm font-medium text-white mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <Sparkles className="w-4 h-4 text-zinc-300" />
              Meet Aura AI
            </div>
            <div className="mb-6">
              <TrueFocus
                sentence="Your intelligent academic engine."
                manualMode={false}
                blurAmount={3}
                borderColor="#c8c8cb"
                glowColor="rgba(255, 255, 255, 0.45)"
                animationDuration={0.7}
                pauseBetweenAnimations={0.8}
                disableAnimation={isPerformanceMode}
              />
            </div>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed">Not just a chatbot. Aura AI actively analyzes complex attendance patterns, autonomously generates official reports, and has deep, secure access to your institutional data permissions.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Capabilities Cards */}
            <motion.div variants={fadeInUp} className="flex-1 rounded-[3rem] bg-zinc-950 border border-zinc-800 p-8 md:p-10 relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <FileText className="w-10 h-10 text-white mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold text-white mb-4">Deep Data Analysis</h3>
                <p className="text-zinc-400 font-light text-base leading-relaxed">Aura actively monitors trends, identifies chronic absences, and structures massive datasets into clear, actionable reporting.</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex-1 rounded-[3rem] bg-zinc-950 border border-zinc-800 p-8 md:p-10 relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <Shield className="w-10 h-10 text-white mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-2xl font-bold text-white mb-4">System-Level Autonomy</h3>
                <p className="text-zinc-400 font-light text-base leading-relaxed">It doesn't just read data. With verified clearance, the AI can execute commands, create official records, and modify system state.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative z-10 bg-zinc-950 border-t border-zinc-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <ScrollFloat
              containerClassName="mb-6"
              textClassName="text-white"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="top bottom-=10%"
              scrollEnd="center center+=20%"
              stagger={0.025}
            >
              Uncompromising Quality
            </ScrollFloat>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">Everything you need, wrapped in a beautiful monochrome interface designed for focus and speed.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Lightning Fast',
                desc: 'Optimized architecture ensures that Aura loads instantly and transitions smoothly without any lag.'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Enterprise Security',
                desc: 'Your data is encrypted and protected with industry-leading security protocols.'
              },
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'Privacy First',
                desc: 'We believe your data belongs to you. No hidden tracking, no intrusive analytics.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleUp}
                className="h-full p-10 rounded-[2.5rem] bg-black border border-zinc-800 hover:border-zinc-600 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-white text-black rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-lg font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 relative z-10 bg-black border-t border-zinc-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6"
        >
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Meet the Developers</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">The brilliant minds behind Aura. We're a team of passionate engineers and designers dedicated to building the future.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Lance D Celicious', role: 'Tech Lead', img: 'lance.jpg' },
              { name: 'Meeko Pauleonard Tan', role: 'Project Manager', img: 'tan.jpg' },
              { name: 'Gloryzann H Aclao', role: 'Frontend Developer x Backburner x Second Option', img: 'zann.jpg' },
              { name: 'Frienzal Labisig', role: 'Backend Developer', img: 'zal.jpg' },
              { name: 'Carlsam M. Puliran Jr.', role: 'Ai Integration Developer', img: 'cmp.png' },
              { name: 'Gabriel Ryan Duterte', role: 'Documentation and Testing', img: 'gab.jpg' },
              { name: 'Anthony Gabriel Tolentino', role: 'Deployment', img: 'tolentino.jpg' }
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="h-full p-8 rounded-[3rem] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors group flex flex-col items-center text-center shadow-2xl"
              >
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 border-2 border-zinc-900 group-hover:border-zinc-700 transition-colors relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={member.img} alt={member.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-lg text-zinc-500 font-light mb-8">{member.role}</p>
                <div className="flex items-center gap-6 mt-auto">
                  <a href="#" className="text-zinc-600 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Globe className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-zinc-600 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-zinc-600 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Share2 className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-40 relative z-10 overflow-hidden bg-white text-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 relative z-10 text-center"
        >
          <motion.div variants={fadeInUp}>
            <img
              src="/logo-black.png"
              alt="Aura Logo"
              className="w-20 h-20 mx-auto mb-10 object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"; }}
            />
            <h2 className="text-5xl md:text-7xl font-black text-black mb-8 tracking-tighter">Ready to elevate your workflow?</h2>
            <p className="text-2xl text-zinc-600 mb-16 max-w-3xl mx-auto font-light">Join thousands of users who have already upgraded to Aura. Available now for your mobile devices.</p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="/app-release.apk"
              download
              className="w-full sm:w-auto px-10 py-6 bg-black text-white rounded-[2rem] font-bold text-xl hover:bg-zinc-800 hover:-translate-y-2 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-center gap-4 group"
            >
              <Smartphone className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-medium text-zinc-400">Download for Android</div>
                <div>Get the APK</div>
              </div>
            </a>

            <button
              onClick={handleInstallPWA}
              className="w-full sm:w-auto px-10 py-6 bg-white text-black border-[3px] border-black rounded-[2rem] font-bold text-xl hover:bg-zinc-100 hover:-translate-y-2 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center justify-center gap-4 group"
            >
              <Apple className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-medium text-zinc-500">One-tap install</div>
                <div>Install the App</div>
              </div>
            </button>
          </motion.div>
          <motion.p variants={fadeInUp} className="mt-12 text-base text-zinc-500 font-medium tracking-wide uppercase">Version 1.3.0 • Free to use</motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-zinc-900 relative z-10 text-zinc-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <img
              src="/logo-white.png"
              alt="Aura Logo"
              className="w-6 h-6 object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"; }}
            />
            <span className="font-bold text-zinc-300">Aura</span>
          </div>
          <p className="text-sm font-light">© {new Date().getFullYear()} Aura Platform. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
