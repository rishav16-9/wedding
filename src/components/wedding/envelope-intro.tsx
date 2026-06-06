"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import { CornerFlourish, FloralDivider, Bloom } from "./design-decor";

/* Falling petals — deterministic so SSR and client agree */
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  size: 9 + (i % 4) * 5,
  delay: (i % 9) * 0.8,
  dur: 8 + (i % 5) * 1.7,
  sway: (i % 2 ? 1 : -1) * (24 + (i % 3) * 14),
  color: ["#c23b5a", "#e39aa6", "#c69749"][i % 3],
  rot: (i % 2 ? 1 : -1) * (180 + i * 12),
}));

function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.25,
            backgroundColor: p.color,
            borderRadius: "0 80% 55% 80%",
            opacity: 0.55,
          }}
          initial={{ y: "-12vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "112vh",
            x: [0, p.sway, -p.sway * 0.6, 0],
            rotate: p.rot,
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function EnvelopeIntro({ onOpen, setPlaying, audioRef }: {
  onOpen: () => void;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
 }) {
  const [opening, setOpening] = useState(false);
  const startY = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const open = (shouldPlayMusic = true) => {
    if (opening) return;
    setOpening(true);
    if (shouldPlayMusic) {
      const audio = audioRef.current;
      if (audio) {
      audio.volume = 0.22;

      try {
        audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Audio blocked:", error);
      }
    }

    }
    window.setTimeout(onOpen, reduce ? 200 : 1250);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches?.[0]?.clientY ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startY.current === null) return;
    const endY = e.changedTouches?.[0]?.clientY ?? startY.current;
    if (startY.current - endY > 45) open(true);
    startY.current = null;
  };
  // Desktop: a mouse-wheel / trackpad scroll opens the invitation too.
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 10) open(false);
  };
  // Keyboard: Enter / Space / arrows / page-down also open.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (["Enter", " ", "ArrowDown", "ArrowUp", "PageDown"].includes(e.key)) {
      e.preventDefault();
      open(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden px-6 outline-none"
      role="button"
      tabIndex={0}
      aria-label="Open the wedding invitation"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.05, ease: [0.83, 0, 0.17, 1] }}
    >
      {/* warm ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#fff9ef_0%,#fbeede_45%,#f6dcd2_100%)]" />
      <div className="motif-rose absolute inset-0 opacity-90" />
      {!reduce && <Petals />}

      <motion.div
        className="relative z-10 w-full max-w-md"
        animate={opening ? { opacity: 0, y: -24, scale: 0.97, filter: "blur(3px)" } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative overflow-hidden rounded-[1.85rem] border border-gold/50 bg-cream/85 px-8 py-14 text-center shadow-luxe backdrop-blur-[2px] sm:px-12">
          <span className="pointer-events-none absolute inset-3 rounded-[1.45rem] border border-gold/25" />
          <CornerFlourish className="pointer-events-none absolute left-3 top-3 h-10 w-10 text-gold" />
          <CornerFlourish className="pointer-events-none absolute right-3 top-3 h-10 w-10 rotate-90 text-gold" />
          <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-10 w-10 rotate-180 text-gold" />
          <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 -rotate-90 text-gold" />

          <p className="kicker text-wine">You are invited</p>
          <p className="font-deva mt-5 text-lg text-gold-deep">श्री गणेशाय नमः</p>

          <h1 className="font-display mt-3 text-[clamp(2.4rem,11vw,3.6rem)] font-light italic leading-[1.05] text-ink">
            Aditya <p className="text-wine not-italic">&amp;</p> Rashmi
          </h1>

          <FloralDivider className="mx-auto mt-6 h-5 w-44 text-gold" />
          <p className="kicker mt-5 text-stone-warm/75">06 · 07 · 2026 — Kathmandu</p>

          {/* open trigger */}
          <button
            onClick={() => open(true)}
            aria-label="Open the invitation"
            data-cursor
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-wine px-7 py-4 text-cream shadow-[0_14px_30px_-12px_rgba(168,40,75,0.6)] outline-none transition-colors hover:bg-wine-bright"
          >
            <motion.span
              animate={reduce || opening ? {} : { rotate: [0, 12, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-gold-light"
            >
              <Bloom className="h-5 w-5" />
            </motion.span>
            <span className="kicker text-[0.6875rem]">Open the invitation</span>
          </button>

          <motion.p
            className="kicker mt-5 text-stone-warm/50"
            animate={opening ? { opacity: 0 } : { opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 2.4, repeat: opening ? 0 : Infinity }}
          >
            Open your invitation
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
