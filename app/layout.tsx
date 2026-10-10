import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutriVé — Nutrition that tastes like a treat",
  description: "Discover NutriVé nutritious bites, dipped in dark, white, or milk chocolate.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
