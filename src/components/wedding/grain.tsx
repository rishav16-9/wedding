"use client";

/**
 * Fixed film-grain overlay. A subtle, tactile noise layer that unifies the
 * whole page and kills the "flat digital" look. Rendered once, sits above
 * everything but ignores pointer events.
 */
export function Grain() {
  const noise = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`,
  )}`;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] opacity-[0.045] mix-blend-soft-light"
      style={{
        backgroundImage: `url("${noise}")`,
        backgroundSize: "160px 160px",
      }}
    />
  );
}
