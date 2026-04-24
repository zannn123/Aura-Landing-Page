import React, { useState, useEffect, useRef } from 'react';
import { Download, Apple, Smartphone, Shield, Zap, Lock, Star, Menu, X, CheckCircle2, Globe, MessageCircle, Share2, Bot, Sparkles, BarChart3, FileText, Database, RotateCcw, Box, Command, Code, Folder, GitBranch, Terminal, Layout, Key, GitMerge } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

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

// --- Early Access Modal ---
const EarlyAccessModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    // Using mailto to trigger email client
    const subject = encodeURIComponent("Aura Early Access Feedback");
    const body = encodeURIComponent(feedback);
    window.location.href = `mailto:auraautomessage@gmail.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setTimeout(() => {
       onClose();
    }, 3000);
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
                className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl p-6 text-center flex flex-col items-center gap-3 relative z-10"
              >
                <CheckCircle2 className="w-8 h-8" />
                <p className="font-medium text-sm">Thank you! Opening your mail client...</p>
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Show early access modal after 2 seconds
    const timer = setTimeout(() => setShowEarlyAccess(true), 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-200 selection:text-black overflow-hidden">
      <EarlyAccessModal isOpen={showEarlyAccess} onClose={() => setShowEarlyAccess(false)} />
      
      {/* Background gradients for visual depth */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-700/10 blur-[100px] rounded-full mix-blend-screen"
        />
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
            <a
              href="/ios-setup"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-zinc-700 rounded-2xl font-semibold hover:bg-zinc-900 hover:border-zinc-500 transition-all"
            >
              <Apple className="w-5 h-5" />
              <span>Install iOS PWA</span>
            </a>
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
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black z-0" />

            {/* Mockup App Content */}
            <div className="relative z-10 p-6 pt-14 flex flex-col gap-6 h-full">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">Dashboard</h3>
                  <p className="text-xs text-zinc-500">Welcome back, User</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">U</div>
              </div>

              <div className="p-5 rounded-3xl bg-zinc-800/50 border border-zinc-700/50 backdrop-blur-md">
                <p className="text-sm text-zinc-400 mb-1">Attendance Status</p>
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-white">Present</h2>
                  <CheckCircle2 className="w-6 h-6 text-white mb-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
                  <Shield className="w-6 h-6 text-zinc-400" />
                  <span className="text-sm font-medium text-white">Security</span>
                </div>
                <div className="p-4 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2">
                  <Zap className="w-6 h-6 text-zinc-400" />
                  <span className="text-sm font-medium text-white">Performance</span>
                </div>
              </div>

              <div className="mt-auto space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center px-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-1/2 bg-zinc-800 rounded-full" />
                      <div className="h-2 w-1/4 bg-zinc-800/50 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Decorative blur elements behind mockup */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </section>

      {/* Immersive AI Sequence */}
      <section id="ai-chat" className="pt-20 pb-10 relative z-10 bg-black overflow-hidden border-t border-zinc-900 min-h-[80vh] flex items-center">
        <ImmersiveChat />
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">Your intelligent <br className="hidden md:block" />academic engine.</h2>
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
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Uncompromising Quality</h2>
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
              { name: 'Lance D Celicious', role: 'Iterator Manager', img: 'lance.jpg' },
              { name: 'Meeko Pauleonard Tan', role: 'Project Manager', img: 'tan.jpg' },
              { name: 'Gloryzann H Aclao', role: 'Frontend', img: 'zann.jpg' },
              { name: 'Frienzal Labisig', role: 'Backend Developer', img: 'zal.jpg' },
              { name: 'Carlsam M. Puliran Jr.', role: 'Ai Integration Developer', img: 'https://i.pravatar.cc/400?img=9' },
              { name: 'Gabriel Ryan Duterte', role: 'Documentation and Testing', img: 'https://i.pravatar.cc/400?img=9' },
              { name: 'Anthony Gabriel Tolentino', role: 'Deployment', img: 'tolentino.jpg' }
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="h-full p-8 rounded-[3rem] bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors group flex flex-col items-center text-center shadow-2xl"
              >
                <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-8 border-2 border-zinc-900 group-hover:border-zinc-700 transition-colors relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-lg text-zinc-500 font-light mb-8">{member.role}</p>
                <div className="flex items-center gap-6 mt-auto">
                  <a href="#" className="text-zinc-600 hover:text-white transition-colors hover:scale-110 transform duration-300">
                    <Globe className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-zinc-600 hover:text-[#1DA1F2] transition-colors hover:scale-110 transform duration-300">
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

            <a
              href="/ios-setup"
              className="w-full sm:w-auto px-10 py-6 bg-white text-black border-[3px] border-black rounded-[2rem] font-bold text-xl hover:bg-zinc-100 hover:-translate-y-2 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex items-center justify-center gap-4 group"
            >
              <Apple className="w-8 h-8 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-medium text-zinc-500">Install for iOS</div>
                <div>Add PWA to Home Screen</div>
              </div>
            </a>
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
