import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Apple, Share2 } from "lucide-react";

export default function IosComingSoonModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
          style={{ background: "rgba(0,0,0,0.75)" }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="absolute inset-0 backdrop-blur-xl pointer-events-none" />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 shadow-[0_-40px_120px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 transition-all hover:text-white hover:border-zinc-600 active:scale-90"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="p-7 md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                <Apple className="h-6 w-6" strokeWidth={2} />
              </div>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white md:text-[26px]">
                The iOS app is on its way
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
                Our team is actively seeking an investor to cover the{" "}
                <span className="text-zinc-200 font-medium">Apple Developer Program</span> subscription so we can ship the native iPhone build to the App Store.
              </p>
              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Share2 className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Use Aura on iPhone today</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                      Open Aura in Safari, tap the Share icon, then{" "}
                      <span className="text-zinc-200">Add to Home Screen</span>. Acts like the native app — full-screen, with face scan ready to go.
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                Thanks for your patience — we'll announce it the day it ships.
              </p>
              <button
                onClick={onClose}
                className="mt-6 w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
