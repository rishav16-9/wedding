"use client";

import { useRef } from "react";
import type { ElementType, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------------------------------------------------------------- */
/* MaskText — word-by-word reveal from behind a clip mask                      */
/* -------------------------------------------------------------------------- */
export function MaskText({
  lines,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  once = true,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const word = {
    hidden: { y: reduce ? 0 : "118%" },
    show: { y: 0, transition: { duration: reduce ? 0 : duration, ease: EASE } },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.55 }}
        className="block"
      >
        {lines.map((line, li) => {
          const parts = typeof line === "string" ? line.split(" ") : [line];
          return (
            <span key={li} className="block">
              {parts.map((part, pi) => (
                <span
                  key={pi}
                  className="inline-block overflow-hidden align-bottom"
                  style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
                >
                  <motion.span variants={word} className="inline-block">
                    {part}
                  </motion.span>
                  {typeof line === "string" && pi < parts.length - 1 ? " " : null}
                </span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

/* -------------------------------------------------------------------------- */
/* Reveal — generic fade + rise on scroll                                      */
/* -------------------------------------------------------------------------- */
export function Reveal({
  children,
  className = "",
  y = 30,
  delay = 0,
  duration = 1,
  amount = 0.3,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduce ? 0 : duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Kicker — mono section label with index + hairline                           */
/* -------------------------------------------------------------------------- */
export function Kicker({
  index,
  children,
  className = "",
  tone = "dark",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const color = tone === "dark" ? "text-wine" : "text-gold-light";
  const dim = tone === "dark" ? "text-stone-warm/70" : "text-gold-light/60";
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index && <span className={`kicker ${dim}`}>{index}</span>}
      <span className="h-px w-8 rule-gold opacity-60" />
      <span className={`kicker ${color}`}>{children}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Magnetic — element drifts toward the cursor                                 */
/* -------------------------------------------------------------------------- */
export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 17, mass: 0.5 });
  const y = useSpring(my, { stiffness: 200, damping: 17, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * strength);
    my.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
