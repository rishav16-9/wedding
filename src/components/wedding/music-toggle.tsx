"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BARS = [0.4, 0.85, 0.55, 1, 0.65];

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.22;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  return (
    <>
      {/* "A Man Approaches with Bowed Sitar, Rishikesh" by Samuel Corwin, CC BY 4.0 */}
      <audio ref={audioRef} loop preload="none">
        <source src="/music/ambient.mp3" type="audio/mpeg" />
        <source src="/music/ambient.ogg" type="audio/ogg" />
      </audio>
      <motion.button
        onClick={() => setPlaying((p) => !p)}
        data-cursor
        aria-label={playing ? "Pause music" : "Play music"}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-full border border-gold/40 bg-ink/80 px-4 py-3 text-cream backdrop-blur-md"
      >
        <span className="flex h-4 items-end gap-[3px]">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="w-[2.5px] rounded-full bg-gold-light"
              animate={
                playing
                  ? { height: [`${h * 40}%`, "100%", `${h * 55}%`] }
                  : { height: "30%" }
              }
              transition={
                playing
                  ? { duration: 0.7 + i * 0.12, repeat: Infinity, repeatType: "mirror" }
                  : { duration: 0.3 }
              }
              style={{ height: "30%" }}
            />
          ))}
        </span>
        <span className="kicker text-[0.625rem] text-gold-light/80">
          {playing ? "Now Playing" : "Play Music"}
        </span>
      </motion.button>
    </>
  );
}
