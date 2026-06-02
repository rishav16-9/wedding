"use client";

/**
 * Decorative SVG flourishes for the three prototype landing designs.
 * Everything draws in `currentColor`, so colour is controlled by a Tailwind
 * text-* class on the element (e.g. text-gold/40). All are aria-hidden and
 * non-interactive — pure ornament.
 */

/* -------------------------------------------------------------------------- */
/* A — Lilac: tall ornamental arch frame + apex sprig                          */
/* -------------------------------------------------------------------------- */
export function ArchFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 580"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      {/* outer arch */}
      <path
        d="M24 576 L24 188 Q24 60 200 26 Q376 60 376 188 L376 576"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeOpacity="0.6"
      />
      {/* inner hairline arch */}
      <path
        d="M40 576 L40 192 Q40 78 200 46 Q360 78 360 192 L360 576"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.32"
      />
      {/* apex sprig */}
      <g stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.7" strokeLinecap="round">
        <path d="M200 14 L200 54" />
        <path d="M200 30 Q186 22 178 30" />
        <path d="M200 30 Q214 22 222 30" />
        <path d="M200 44 Q190 38 184 44" />
        <path d="M200 44 Q210 38 216 44" />
      </g>
      <circle cx="200" cy="12" r="3.4" fill="currentColor" fillOpacity="0.8" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* B — Mint: eucalyptus leaf sprig                                             */
/* -------------------------------------------------------------------------- */
export function LeafSprig({ className = "" }: { className?: string }) {
  const leaves = [
    { t: 18, s: 1 },
    { t: 40, s: 0.9 },
    { t: 62, s: 0.82 },
    { t: 84, s: 0.72 },
    { t: 106, s: 0.6 },
  ];
  return (
    <svg
      aria-hidden
      viewBox="0 0 160 160"
      fill="none"
      className={className}
    >
      <path
        d="M30 150 C70 120 96 86 110 30"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      {leaves.map((l, i) => {
        // position along the stem, alternate sides
        const px = 30 + (l.t / 132) * 80;
        const py = 150 - (l.t / 132) * 120;
        const side = i % 2 === 0 ? 1 : -1;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={6.5 * l.s}
            ry={13 * l.s}
            transform={`rotate(${side * 48} ${px} ${py})`}
            fill="currentColor"
            fillOpacity="0.32"
          />
        );
      })}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* C — Marigold: concentric line mandala                                       */
/* -------------------------------------------------------------------------- */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 }, (_, i) => (i / 16) * 360);
  const inner = Array.from({ length: 24 }, (_, i) => (i / 24) * 360);
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      fill="none"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="200" cy="200" r="196" strokeOpacity="0.18" />
        <circle cx="200" cy="200" r="150" strokeOpacity="0.28" />
        <circle cx="200" cy="200" r="96" strokeOpacity="0.22" />
      </g>
      {/* outer petal ring */}
      <g>
        {petals.map((deg, i) => (
          <ellipse
            key={i}
            cx="200"
            cy="40"
            rx="10"
            ry="26"
            transform={`rotate(${deg} 200 200)`}
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />
        ))}
      </g>
      {/* inner dotted ring */}
      <g fill="currentColor" fillOpacity="0.45">
        {inner.map((deg, i) => (
          <circle
            key={i}
            cx="200"
            cy="104"
            r="2.2"
            transform={`rotate(${deg} 200 200)`}
          />
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Rose: ornate corner flourish (rotate per corner via className)              */
/* -------------------------------------------------------------------------- */
export function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 70 70" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.75" strokeLinecap="round">
        <path d="M6 6 L6 30 Q6 44 20 44" />
        <path d="M6 6 L30 6 Q44 6 44 20" />
        <path d="M14 14 Q30 18 30 34" />
        <path d="M14 14 Q18 30 34 30" />
      </g>
      <circle cx="6" cy="6" r="2.6" fill="currentColor" fillOpacity="0.85" />
      <circle cx="30" cy="34" r="1.7" fill="currentColor" fillOpacity="0.7" />
      <circle cx="34" cy="30" r="1.7" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Rose: small floral divider — a hairline with a centred bloom                */
/* -------------------------------------------------------------------------- */
export function FloralDivider({ className = "" }: { className?: string }) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg aria-hidden viewBox="0 0 220 26" fill="none" className={className}>
      <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.55">
        <line x1="0" y1="13" x2="86" y2="13" />
        <line x1="134" y1="13" x2="220" y2="13" />
      </g>
      <circle cx="92" cy="13" r="1.6" fill="currentColor" fillOpacity="0.7" />
      <circle cx="128" cy="13" r="1.6" fill="currentColor" fillOpacity="0.7" />
      <g transform="translate(110 13)" fill="currentColor" fillOpacity="0.85">
        {petals.map((deg) => (
          <ellipse key={deg} rx="2.1" ry="5" cy="-5" transform={`rotate(${deg})`} />
        ))}
        <circle r="1.8" fill="currentColor" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Rose: a single bloom — used on the invitation-card stubs                    */
/* -------------------------------------------------------------------------- */
export function Bloom({ className = "" }: { className?: string }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg aria-hidden viewBox="-20 -20 40 40" fill="none" className={className}>
      <g fill="currentColor" fillOpacity="0.9">
        {petals.map((deg) => (
          <ellipse key={deg} rx="3.4" ry="9" cy="-9" transform={`rotate(${deg})`} />
        ))}
      </g>
      <circle r="3.6" fill="currentColor" />
      <circle r="1.8" fill="#fffaf1" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* C — Marigold garland: an arc of blossoms to drape over the names            */
/* -------------------------------------------------------------------------- */
export function Garland({ className = "" }: { className?: string }) {
  // blossoms spaced along a shallow downward arc
  const n = 13;
  const blossoms = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1); // 0..1
    const x = 20 + t * 460;
    const y = 50 - Math.sin(t * Math.PI) * 38; // arc up in the middle
    const r = 5.5 + Math.sin(t * Math.PI) * 3;
    return { x, y, r };
  });
  return (
    <svg
      aria-hidden
      viewBox="0 0 500 70"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <path
        d={`M20 50 ${blossoms.map((b) => `L${b.x.toFixed(1)} ${b.y.toFixed(1)}`).join(" ")}`}
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {blossoms.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <circle r={b.r} fill="currentColor" fillOpacity="0.85" />
          <circle r={b.r * 0.45} fill="currentColor" fillOpacity="0.4" />
        </g>
      ))}
    </svg>
  );
}
