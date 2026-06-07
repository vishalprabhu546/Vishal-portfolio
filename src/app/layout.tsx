import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "G. Vishal V Prabhu | Electronics & Embedded Systems Engineer",
  description: "Aspiring Electronics & Communication Engineering student with strong hands-on foundation in embedded systems, PCB design, firmware development, and VLSI design.",
  keywords: [
    "G. Vishal V Prabhu",
    "Vishal Prabhu",
    "Electronics Engineer",
    "Embedded Systems",
    "PCB Design",
    "VLSI Design",
    "Verilog",
    "ESP32",
    "Firmware",
    "Hardware Portfolio"
  ],
  authors: [{ name: "G. Vishal V Prabhu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-background-dark text-white font-sans antialiased selection:bg-accent-purple selection:text-white">
        {children}
      </body>
    </html>
  );
}
