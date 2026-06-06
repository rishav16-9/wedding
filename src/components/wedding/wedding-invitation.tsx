"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin, Plus } from "lucide-react";

import { Grain } from "./grain";
import { Cursor } from "./cursor";
import { SmoothScroll } from "./smooth-scroll";
import { EnvelopeIntro } from "./envelope-intro";
import { MusicToggle } from "./music-toggle";
import { MaskText, Reveal, Kicker, Magnetic } from "./primitives";
import { CornerFlourish, FloralDivider, Bloom } from "./design-decor";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */
const weddingDate = new Date("2026-07-06T19:00:00+05:45");

const CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" +
  encodeURIComponent("Aditya & Rashmi — Wedding") +
  "&dates=20260706T131500Z/20260706T171500Z" +
  "&details=" +
  encodeURIComponent("With love — #AdiKiRashmi") +
  "&location=" +
  encodeURIComponent("Kathmandu, Nepal");

type WeddingEvent = {
  no: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  dress: string;
  accent: string;
};

const events: WeddingEvent[] = [
  { no: "01", title: "Mayara", subtitle: "Tradition, held with love", date: "5th July 2026", time: "—", venue: "Kathmandu, Nepal", dress: "Traditional & comfortable", accent: "#c23b5a" },
  { no: "02", title: "Sangeet", subtitle: "Dance, glamour & blessings", date: "5th July 2026", time: "—", venue: "Kathmandu, Nepal", dress: "Glamorous & festive", accent: "#7d1f3d" },
  { no: "03", title: "Haldi", subtitle: "A golden glow & blessings", date: "6th July 2026", time: "—", venue: "Kathmandu, Nepal", dress: "As you wish, but in style", accent: "#c69749" },
  { no: "04", title: "Reception & Wedding", subtitle: "The grand celebration", date: "6th July 2026", time: "Evening", venue: "Kathmandu, Nepal", dress: "Ethnic elegance / Formal/ Evening glam", accent: "#a8284b" },
];

const gallery: { src: string; caption: string; span: string }[] = [
  { src: "/images/Image1.jpg", caption: "Celebration", span: "col-span-6 row-span-2" },
  { src: "/images/Image2.jpg", caption: "Henna", span: "col-span-6 row-span-2" },
  { src: "/images/Image3.jpg", caption: "Marigold", span: "col-span-12 row-span-2" },
  { src: "/images/Image4.jpg", caption: "The Vows", span: "col-span-6 row-span-2" },
  { src: "/images/Image5.jpg", caption: "Celebration", span: "col-span-6 row-span-2" },
];

/* -------------------------------------------------------------------------- */
/* Small helpers                                                               */
/* -------------------------------------------------------------------------- */
function ParallaxY({ children, range = 70, className = "" }: { children: ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

function Marquee({ text, className = "", duration = 26, reverse = false }: { text: string; className?: string; duration?: number; reverse?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex overflow-hidden ${className}`}>
      <motion.div
        className="flex shrink-0 whitespace-nowrap"
        animate={reduce ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((dup) => (
          <span key={dup} className="flex shrink-0">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span>{text}</span>
                <span className="mx-6 text-gold">✦</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function WashRose() {
  const layers = [
    "radial-gradient(120% 90% at 50% -12%, #fff8ec 0%, transparent 55%)",
    "radial-gradient(72% 60% at 85% 12%, rgba(168,40,75,0.13), transparent 60%)",
    "radial-gradient(70% 60% at 12% 88%, rgba(198,151,73,0.16), transparent 60%)",
  ];
  return (
    <>
      {layers.map((g, i) => (
        <div key={i} className="pointer-events-none absolute inset-0" style={{ backgroundImage: g }} />
      ))}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero — a framed invitation                                                  */
/* -------------------------------------------------------------------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="motif-rose relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
      <WashRose />
      <motion.div style={{ y, opacity }} className="relative w-full max-w-2xl">
        <Reveal y={26} duration={1.1}>
          <div className="relative overflow-hidden rounded-[1.85rem] border border-gold/45 bg-cream/75 px-7 py-14 text-center shadow-luxe backdrop-blur-[2px] sm:px-14 sm:py-[4.5rem]">
            <span className="pointer-events-none absolute inset-3 rounded-[1.45rem] border border-gold/25" />
            <CornerFlourish className="pointer-events-none absolute left-3 top-3 h-10 w-10 text-gold" />
            <CornerFlourish className="pointer-events-none absolute right-3 top-3 h-10 w-10 rotate-90 text-gold" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-10 w-10 rotate-180 text-gold" />
            <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-10 w-10 -rotate-90 text-gold" />

            <p className="font-deva text-base text-gold-deep">श्री गणेशाय नमः</p>
            <Kicker tone="dark" className="mt-5 justify-center">
              Together with their families, request the pleasure of your company as they celebrate their marriage.
            </Kicker>

            <div className="mt-7">
              <MaskText as="h1" lines={["Aditya"]} className="font-display text-[clamp(2.7rem,10vw,5.2rem)] font-light leading-[0.9] text-ink" />
              <div className="my-1.5 flex items-center justify-center gap-4 sm:my-2.5">
                <span className="h-px w-12 rule-gold opacity-60" />
                <span className="font-display text-[clamp(1.7rem,5vw,2.6rem)] leading-none text-wine">&amp;</span>
                <span className="h-px w-12 rule-gold opacity-60" />
              </div>
              <MaskText as="h1" lines={["Rashmi"]} className="font-display text-[clamp(2.7rem,10vw,5.2rem)] font-light italic leading-[0.9] text-ink" delay={0.12} />
            </div>

            <Reveal delay={0.45}>
              <FloralDivider className="mx-auto mt-9 h-5 w-52 text-gold" />
              <p className="font-display mt-5 text-2xl italic text-ink/90">
                the 6<sup>th</sup> of July, 2026
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-stone-warm">
                <MapPin className="h-3.5 w-3.5 text-wine" /> Kathmandu, Nepal
              </p>
              <div className="mt-7">
                <span className="kicker rounded-full bg-wine/10 px-4 py-2 text-wine">#AdiKiRashmi</span>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </motion.div>

      <a href="#blessing" data-cursor className="group absolute bottom-9 left-1/2 flex -translate-x-1/2 items-center gap-3 text-stone-warm">
        <span className="kicker">Begin the journey</span>
        <motion.span
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 transition-colors group-hover:border-wine group-hover:text-wine"
        >
          <ArrowDownRight className="h-4 w-4" />
        </motion.span>
      </a>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Invocation (light)                                                          */
/* -------------------------------------------------------------------------- */
function Invocation() {
  return (
    <section id="blessing" className="motif-rose relative overflow-hidden bg-parchment-2 px-5 py-28 sm:px-10 sm:py-36">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="font-deva text-5xl text-wine">ॐ</span>
        </Reveal>
        <MaskText as="p" lines={["श्री गणेशाय नमः"]} className="font-deva mt-6 text-2xl text-gold-deep sm:text-3xl" />
        <Reveal delay={0.2} className="mx-auto mt-10 max-w-xl">
          <p className="font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ
            <br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <FloralDivider className="mx-auto mt-12 h-5 w-48 text-gold" />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Save the date + countdown                                                   */
/* -------------------------------------------------------------------------- */
function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = now === null ? null : Math.max(0, weddingDate.getTime() - now);
  if (diff === null) {
    return null;
  }

  if (diff <= 0) {
  return "Today is the day!"
  }
  const units = [
    { label: "Days", value: diff === null ? null : Math.floor(diff / 864e5) },
    { label: "Hours", value: diff === null ? null : Math.floor((diff / 36e5) % 24) },
    { label: "Minutes", value: diff === null ? null : Math.floor((diff / 6e4) % 60) },
    { label: "Seconds", value: diff === null ? null : Math.floor((diff / 1e3) % 60) },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {units.map(({ label, value }) => (
        <div key={label} className="rounded-2xl border border-gold/35 bg-cream px-2 py-6 text-center shadow-[0_10px_30px_-18px_rgba(47,26,32,0.4)] sm:py-8">
          <div className="font-display text-4xl tabular-nums text-wine sm:text-6xl">
            {value === null ? "––" : String(value).padStart(2, "0")}
          </div>
          <div className="kicker mt-2 text-[0.5625rem] text-stone-warm/70">{label}</div>
        </div>
      ))}
    </div>
  );
}

function SaveTheDate() {
  return (
    <section id="date" className="motif-rose relative bg-parchment px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Kicker index="I" tone="dark" className="mb-8">Save the Date</Kicker>
          <MaskText as="div" lines={["06 · 07"]} className="font-display text-[clamp(4rem,16vw,11rem)] font-light leading-[0.85] tracking-tight text-ink" />
          <div className="mt-2 flex items-end gap-5">
            <span className="font-display text-[clamp(2rem,6vw,4rem)] italic text-wine">2026</span>
            <span className="mb-2 h-px flex-1 rule-gold opacity-50" />
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-sm text-stone-warm">
              A new chapter begins, and we're excited to share this special moment with you. Join us as we celebrate love, laughter, and a lifetime of happiness together. Mark your calendar. The countdown to our big day is on.
            </p>
            <Magnetic className="mt-8">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" data-cursor className="group inline-flex items-center gap-3 rounded-full bg-wine px-6 py-4 text-cream transition-colors hover:bg-wine-bright">
                <span className="kicker text-[0.625rem]">Add to calendar</span>
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal y={50} delay={0.1}>
          <p className="kicker mb-4 text-stone-warm/60">Counting every moment</p>
          <Countdown />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Families / lineage                                                          */
/* -------------------------------------------------------------------------- */
function Family({ side, name, relation, parents, grandparents, italic = false }: { side: string; name: string; relation: string; parents: string; grandparents: string; italic?: boolean }) {
  return (
    <Reveal y={40} className="flex-1">
      <Kicker tone="dark" className="mb-6">{side}</Kicker>
      <h3 className={`font-display text-[clamp(3rem,7vw,5rem)] font-light leading-none text-ink ${italic ? "italic" : ""}`}>{name}</h3>
      <p className="mt-5 text-sm uppercase tracking-[0.18em] text-clay">{relation}</p>
      <p className="mt-4 text-stone-warm">{parents}</p>
      <p className="mt-2 text-sm italic text-stone-warm/70">{grandparents}</p>
    </Reveal>
  );
}

function Families() {
  return (
    <section className="motif-rose relative overflow-hidden bg-parchment-2 px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-8">
          <Family side="The Groom" name="Aditya" relation="Surana" parents="Son of Mrs. Madhu Mita Surana & Mr. Rajesh Surana" grandparents="Grandson of Mrs. Maina Devi Surana & Lt. Mr. Deep Chand Ji Surana" />
          <div className="flex shrink-0 flex-col items-center justify-center lg:py-8">
            <span className="hidden h-24 w-px rule-gold opacity-40 lg:block" />
            <span className="font-display py-3 text-5xl text-wine">&amp;</span>
            <span className="hidden h-24 w-px rule-gold opacity-40 lg:block" />
          </div>
          <Family side="The Bride" name="Rashmi" relation="Barmecha" parents="Daughter of Mrs. Lalita Barmecha & Mr. Deepak Barmecha" grandparents="Granddaughter of Mrs. Sundar Devi Barmecha & Lt. Mr. Sumermal Ji Barmecha" italic />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Ceremonies — ticket-stub invitation cards                                   */
/* -------------------------------------------------------------------------- */
function CeremonyCard({ event, index }: { event: WeddingEvent; index: number }) {
  const tint = `${event.accent}14`;
  const when = event.time !== "—" ? `${event.date} · ${event.time}` : event.date;
  return (
    <Reveal y={42} delay={(index % 2) * 0.06} amount={0.2}>
      <article className="group relative flex overflow-hidden rounded-[1.25rem] border border-gold/35 bg-cream shadow-[0_14px_44px_-22px_rgba(47,26,32,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
        <div className="min-w-0 flex-1 px-6 py-7 sm:px-9 sm:py-8">
          <div className="flex items-center gap-3">
            <span className="font-display text-2xl leading-none text-gold-deep">{event.no}</span>
            <span className="h-px w-10" style={{ backgroundColor: event.accent }} />
            <span className="kicker text-stone-warm/55">{when}</span>
          </div>
          <h3 className="font-display mt-3 text-3xl font-light leading-none text-ink sm:text-[2.6rem]">{event.title}</h3>
          <p className="mt-2 text-sm text-stone-warm">{event.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
            <div>
              <p className="kicker text-stone-warm/50">Dress</p>
              <p className="mt-1 text-sm text-ink">{event.dress}</p>
            </div>
            <div>
              <p className="kicker text-stone-warm/50">Where</p>
              <a href="https://maps.app.goo.gl/KmnuVa1xZGqWRir16" target="_blank" rel="noreferrer" data-cursor className="link-underline mt-1 inline-flex items-center gap-1.5 text-sm text-wine">
                <MapPin className="h-3.5 w-3.5" /> {event.venue}
              </a>
            </div>
          </div>
        </div>

        <div className="relative flex w-[4.75rem] shrink-0 flex-col items-center justify-center gap-2 sm:w-28" style={{ backgroundColor: tint }}>
          <span className="absolute left-0 top-4 bottom-4 border-l-2 border-dashed border-ink/15" />
          <span className="absolute -left-[11px] -top-[11px] h-[22px] w-[22px] rounded-full bg-parchment" />
          <span className="absolute -left-[11px] -bottom-[11px] h-[22px] w-[22px] rounded-full bg-parchment" />
          <span style={{ color: event.accent }}>
            <Bloom className="h-8 w-8 transition-transform duration-500 group-hover:rotate-45" />
          </span>
          <span className="font-display text-lg italic" style={{ color: event.accent }}>{event.no}</span>
        </div>
      </article>
    </Reveal>
  );
}

function Ceremonies() {
  return (
    <section id="ceremonies" className="motif-rose relative bg-parchment-2 px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <Kicker index="II" tone="dark" className="mb-6 justify-center">The Itinerary</Kicker>
          <MaskText as="h2" lines={["Five celebrations"]} className="font-display text-[clamp(2.3rem,7vw,4.5rem)] font-light leading-[0.98] text-ink" />
          <FloralDivider className="mx-auto mt-7 h-5 w-56 text-gold" />
          <p className="mx-auto mt-6 max-w-md text-stone-warm">
            Two days, Four invitations. Each ceremony carries its own color, its own dress code, its own kind of joy.
          </p>
        </div>
        <div className="space-y-5 sm:space-y-6">
          {events.map((event, i) => (
            <CeremonyCard key={event.no} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery — light art-directed mosaic                                         */
/* -------------------------------------------------------------------------- */
function Gallery() {
  return (
    <section className="relative bg-parchment px-5 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center sm:mb-16">
          <Kicker index="III" tone="dark" className="mb-6 justify-center">Moments</Kicker>
          <MaskText as="h2" lines={["A glimpse, in advance"]} className="font-display text-[clamp(2.3rem,7vw,4.5rem)] font-light leading-[0.98] text-ink" />
          <FloralDivider className="mx-auto mt-7 h-5 w-56 text-gold" />
        </div>

        <div className="grid auto-rows-[150px] grid-cols-12 gap-3 sm:auto-rows-[180px] sm:gap-4">
          {gallery.map((img, i) => (
            <Reveal key={img.src} y={40} delay={(i % 3) * 0.08} amount={0.15} className={`group relative overflow-hidden rounded-xl ring-1 ring-gold/30 ${img.span}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.caption} className="h-full w-full scale-105 object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100" />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/60" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1.5 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                <span className="h-px w-4 bg-wine" />
                <span className="kicker text-wine">{img.caption}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* RSVP                                                                        */
/* -------------------------------------------------------------------------- */
const DANCERS = ["Aditya", "Rashmi", "The Family"];
const MOODS = ["The Food", "The Dance", "The Blessings", "All of It"];

function UnderlineInput({ placeholder }: { placeholder: string }) {
  return (
    <input placeholder={placeholder} className="w-full border-b border-ink/20 bg-transparent pb-3 pt-1 text-lg text-ink outline-none transition-colors placeholder:text-stone-warm/45 focus:border-wine" />
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} data-cursor className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${active ? "border-wine bg-wine text-cream" : "border-ink/20 text-stone-warm hover:border-wine hover:text-wine"}`}>
      {label}
    </button>
  );
}

function Rsvp({ onSubmit }: { onSubmit: () => void }) {
  const [dancer, setDancer] = useState<string | null>(null);
  const [mood, setMood] = useState("All of It");

  return (
    <section id="rsvp" className="motif-rose relative bg-parchment px-5 py-24 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <Kicker index="IV" tone="dark" className="mb-6 justify-center">RSVP &amp; Blessings</Kicker>
          <MaskText as="h2" lines={["Will you celebrate with us?"]} className="font-display text-[clamp(2rem,6vw,3.75rem)] font-light leading-[1] text-ink" />
          <FloralDivider className="mx-auto mt-7 h-5 w-56 text-gold" />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-stone-warm">
              Leave your name, a blessing, or a playful guess. We read every single one.
            </p>
          </Reveal>
        </div>

        <Reveal y={40} delay={0.1}>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); onSubmit(); }} className="space-y-12 rounded-[1.5rem] border border-gold/30 bg-cream/70 p-7 shadow-[0_14px_44px_-26px_rgba(47,26,32,0.4)] backdrop-blur-[2px] sm:p-12">
            <div className="grid gap-10 sm:grid-cols-2">
              <UnderlineInput placeholder="Your name" />
              <UnderlineInput placeholder="Phone number" />
            </div>

            <div>
              <p className="font-display mb-5 text-2xl italic text-ink">Who will dance the most?</p>
              <div className="flex flex-wrap gap-3">
                {DANCERS.map((d) => (
                  <Chip key={d} label={d} active={dancer === d} onClick={() => setDancer(d)} />
                ))}
              </div>
            </div>

            <div>
              <p className="font-display mb-5 text-2xl italic text-ink">I&rsquo;m mostly here for…</p>
              <div className="flex flex-wrap gap-3">
                {MOODS.map((m) => (
                  <Chip key={m} label={m} active={mood === m} onClick={() => setMood(m)} />
                ))}
              </div>
            </div>

            <div>
              <p className="kicker mb-3 text-stone-warm/60">A note for the couple</p>
              <textarea rows={3} placeholder="Write a blessing or a message…" className="w-full resize-none border-b border-ink/20 bg-transparent pb-3 pt-1 text-lg text-ink outline-none transition-colors placeholder:text-stone-warm/45 focus:border-wine" />
            </div>

            <Magnetic strength={0.25}>
              <button type="submit" data-cursor className="group inline-flex items-center gap-4 rounded-full bg-wine px-8 py-5 text-cream transition-colors hover:bg-wine-bright">
                <span className="kicker">Send with love</span>
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </Magnetic>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer (light)                                                              */
/* -------------------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="motif-rose relative overflow-hidden border-t border-gold/30 bg-parchment-2 px-5 pb-12 pt-24 sm:px-10 sm:pt-32">
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="font-deva text-3xl text-wine">𑁍</span>
        </Reveal>
        <MaskText as="h2" lines={["With love,"]} className="font-display mt-6 text-[clamp(2.5rem,9vw,6rem)] font-light italic text-ink" />
        <MaskText as="h2" lines={["Aditya & Rashmi"]} className="font-display text-[clamp(2.5rem,9vw,6rem)] font-light text-wine" delay={0.1} />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-stone-warm">
            Your presence is the only dress code that truly matters — but a little colour never hurt a celebration.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <FloralDivider className="mx-auto mt-12 h-5 w-48 text-gold" />
          <p className="kicker mt-8 text-gold-deep">06 · 07 · 2026 — Kathmandu, Nepal</p>
        </Reveal>
      </div>

      <div className="relative z-10 mt-20 border-t border-ink/10 pt-8">
        <Marquee text="ADITYA & RASHMI" className="kicker text-ink/30" duration={30} />
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Floating header                                                             */
/* -------------------------------------------------------------------------- */
function FloatingHeader() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.08], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0.04, 0.08], [-20, 0]);

  return (
    <motion.header style={{ opacity, y }} className="fixed inset-x-0 top-0 z-[110] flex items-center justify-between px-5 py-4 sm:px-10">
      <div className="flex items-center gap-3 rounded-full border border-gold/30 bg-cream/80 px-4 py-2 backdrop-blur-md">
        <span className="font-display text-base italic text-wine">A &amp; R</span>
        <span className="h-3 w-px bg-gold/40" />
        <span className="kicker text-[0.5625rem] text-stone-warm/70">06.07.26</span>
      </div>
      <Magnetic strength={0.3}>
        <a href="#rsvp" data-cursor className="rounded-full border border-gold/30 bg-cream/80 px-5 py-2.5 backdrop-blur-md">
          <span className="kicker text-[0.5625rem] text-wine">RSVP</span>
        </a>
      </Magnetic>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/* Root                                                                        */
/* -------------------------------------------------------------------------- */
export default function WeddingInvitation() {
  const [introOpen, setIntroOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Always start at the very top — don't let the browser restore a prior scroll
  // position underneath the intro overlay.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (introOpen) {
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0); // reveal from the hero, never mid-page
    } else {
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [introOpen]);

  return (
    <>
      {/* Lenis only after the intro is dismissed — otherwise it scrolls the page
          behind the overlay and we reveal mid-page. */}
      {introOpen && <SmoothScroll />}
      <Cursor />
      <Grain />
      <MusicToggle playing={playing} setPlaying={setPlaying} audioRef={audioRef}/>

      <AnimatePresence>
        {!introOpen && <EnvelopeIntro onOpen={() => setIntroOpen(true)} setPlaying={setPlaying} audioRef={audioRef} />}
      </AnimatePresence>

      <motion.div className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left bg-gold" style={{ scaleX }} />

      <FloatingHeader />

      <main className="relative">
        <Hero />
        <Marquee text="ADITYA & RASHMI · 06.07.2026 · KATHMANDU · #AdiKiRashmi" className="border-y border-gold/25 bg-cream py-4 text-sm tracking-[0.2em] text-ink/70" duration={40} />
        <Invocation />
        <SaveTheDate />
        <Families />
        <Ceremonies />
        <Gallery />
        <Rsvp onSubmit={() => setSubmitted(true)} />
        <Footer />
      </main>

      {/* RSVP confirmation */}
      <AnimatePresence>
        {submitted && (
          <motion.div className="fixed inset-0 z-[140] flex items-center justify-center bg-ink/40 px-5 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSubmitted(false)}>
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gold/40 bg-cream p-10 text-center text-ink shadow-luxe"
            >
              <CornerFlourish className="pointer-events-none absolute left-3 top-3 h-9 w-9 text-gold" />
              <CornerFlourish className="pointer-events-none absolute right-3 top-3 h-9 w-9 rotate-90 text-gold" />
              <CornerFlourish className="pointer-events-none absolute bottom-3 right-3 h-9 w-9 rotate-180 text-gold" />
              <CornerFlourish className="pointer-events-none absolute bottom-3 left-3 h-9 w-9 -rotate-90 text-gold" />
              <span className="font-deva text-4xl text-wine">ॐ</span>
              <h3 className="font-display mt-4 text-4xl italic text-ink">With joy, noted.</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-warm">
                Thank you — we can&rsquo;t wait to celebrate with you in Kathmandu. Until then, keep the date close.
              </p>
              <button onClick={() => setSubmitted(false)} data-cursor className="kicker mt-8 rounded-full border border-wine/40 px-6 py-3 text-wine transition-colors hover:bg-wine hover:text-cream">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
