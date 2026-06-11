"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Download } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoGlow, setLogoGlow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Expertise", href: "#expertise" },
    { name: "Projects", href: "#works" },
    { name: "Certifications", href: "#certifications" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0518]/85 backdrop-blur-md border-b border-accent-purple/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onMouseEnter={() => setLogoGlow(true)}
          onMouseLeave={() => setLogoGlow(false)}
        >
          <div className="relative h-11 w-11 transition-all duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="VP Logo"
              fill
              className="object-contain"
              style={{
                filter: logoGlow
                  ? "brightness(0) invert(1) drop-shadow(0 0 10px rgba(199, 137, 255, 0.9))"
                  : "brightness(0) invert(1) drop-shadow(0 0 5px rgba(124, 58, 237, 0.5))",
                transition: "filter 0.3s ease",
              }}
              priority
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-accent-light transition-all leading-tight">
              G. Vishal V Prabhu
            </span>
            <span className="text-[11px] md:text-[12px] text-text-purple/85 font-semibold leading-none mt-1">
              Electronics & Communication Engineer
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-purple/80 hover:text-white font-semibold text-[14px] lg:text-base transition-all hover:translate-y-[-1px] whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <a
            href="/resume.pdf"
            download="Resume-G_Vishal_V_Prabhu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 lg:px-5.5 lg:py-2.5 rounded-full bg-accent-purple/25 hover:bg-accent-purple text-white border border-accent-purple/50 font-bold text-[14px] lg:text-base transition-all hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] group whitespace-nowrap"
          >
            <Download className="w-4.5 h-4.5 group-hover:animate-bounce" />
            Download Resume
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-text-purple hover:text-white transition-all focus:outline-none"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Side Drawer Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-[260px] bg-[#0c061a] border-l border-accent-purple/15 shadow-2xl z-50 p-6 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header with Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-accent-purple/10 mb-6">
            <span className="font-bold text-white text-base tracking-tight">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-purple hover:text-white p-1 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-text-purple/90 hover:text-white font-semibold text-[17px] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Drawer Footer with Download Button */}
        <div className="pt-6 border-t border-accent-purple/10">
          <a
            href="/resume.pdf"
            download="Resume-G_Vishal_V_Prabhu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2.5 w-full px-5 py-3.5 rounded-xl bg-accent-purple text-white font-bold text-base transition-all shadow-lg shadow-accent-purple/20"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
