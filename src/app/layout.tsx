import type { Metadata } from "next";
import {
  Inter,
  Fraunces,
  JetBrains_Mono,
  Noto_Serif_Devanagari,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aditya & Rashmi — 06.07.2026 · Kathmandu",
  description:
    "With the blessings of the Almighty and our elders, we joyfully invite you to the wedding of Aditya Surana & Rashmi Barmecha. Kathmandu, 6th July 2026. #AdiKiRashmi",
  openGraph: {
    title: "Aditya & Rashmi — A Wedding Invitation",
    description:
      "Kathmandu · 6th July 2026 · #AdiKiRashmi — you are warmly invited.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} ${notoDevanagari.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
