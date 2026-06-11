import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ayomide Olaniyan | Frontend Developer & Creative Coder",
  description: "Portfolio of Ayomide Olaniyan, a Frontend Developer specialized in React, Next.js, GSAP, and Tailwind CSS. Crafting interactive and high-performance web applications.",
  keywords: ["Ayomide Olaniyan", "Frontend Developer", "Creative Coder", "React Developer", "Next.js", "GSAP Animations", "Tailwind CSS Portfolio"],
  authors: [{ name: "Ayomide Olaniyan" }],
  openGraph: {
    title: "Ayomide Olaniyan | Frontend Developer & Creative Coder",
    description: "Portfolio of Ayomide Olaniyan, a Frontend Developer specialized in React, Next.js, GSAP, and Tailwind CSS. Crafting interactive and high-performance web applications.",
    type: "website",
    url: "https://github.com/Ayomidejhay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
