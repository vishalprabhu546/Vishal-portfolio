"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlowBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const blobs = containerRef.current.querySelectorAll(".cursor-glow");
      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: e.clientX - 150,
          y: e.clientY - 150,
          duration: 2,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#04010a]"
    >
      {/* Dynamic Ambient Purple Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-accent-purple/15 blur-[130px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-indigo/12 blur-[150px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-2/3 left-10 w-[350px] h-[350px] rounded-full bg-accent-pink/8 blur-[110px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "-6s" }} />
      
      {/* Interactive mouse follow glow overlay */}
      <div className="cursor-glow absolute w-[300px] h-[300px] rounded-full bg-accent-light/8 blur-[100px] opacity-60 pointer-events-none hidden md:block" />

      {/* SVG PCB Trace & Electronics Circuit Background (Responsive 1920x1080 viewBox) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18]"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#c789ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="bus-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>

          {/* Premium Blueprints/Technical Grid Pattern */}
          <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1.0" fill="rgba(167, 139, 250, 0.12)" />
            <path
              d="M 60,0 L 0,0 0,60"
              fill="none"
              stroke="rgba(124, 58, 237, 0.03)"
              strokeWidth="0.5"
            />
            {/* Tiny sub-grid dots */}
            <circle cx="15" cy="15" r="0.6" fill="rgba(167, 139, 250, 0.06)" />
            <circle cx="45" cy="15" r="0.6" fill="rgba(167, 139, 250, 0.06)" />
            <circle cx="15" cy="45" r="0.6" fill="rgba(167, 139, 250, 0.06)" />
            <circle cx="45" cy="45" r="0.6" fill="rgba(167, 139, 250, 0.06)" />
          </pattern>
        </defs>

        {/* 1. Subtle blueprints grid background */}
        <rect width="100%" height="100%" fill="url(#tech-grid)" />

        {/* 2. Motherboard Frame Border Outline */}
        <rect x="25" y="25" width="1870" height="1030" fill="none" stroke="rgba(124, 58, 237, 0.06)" strokeWidth="1" />
        <path d="M 15,25 L 35,25 M 25,15 L 25,35" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" />
        <path d="M 1885,25 L 1905,25 M 1895,15 L 1895,35" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" />
        <path d="M 15,1055 L 35,1055 M 25,1045 L 25,1065" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" />
        <path d="M 1885,1055 L 1905,1055 M 1895,1045 L 1895,1065" stroke="rgba(124, 58, 237, 0.15)" strokeWidth="1" />

        {/* 3. Top-Left CPU Socket & Parallel Bus Network */}
        {/* CPU/IC Chip */}
        <g opacity="0.85">
          <rect x="220" y="120" width="100" height="100" rx="8" fill="rgba(17, 9, 36, 0.6)" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="230" y="130" width="80" height="80" rx="4" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3, 3" />
          <circle cx="270" cy="170" r="15" fill="none" stroke="#c789ff" strokeWidth="1.2" />
          <path d="M 270,150 L 270,190 M 250,170 L 290,170" stroke="rgba(199, 137, 255, 0.3)" strokeWidth="1" />
          
          {/* CPU Pins */}
          {Array.from({ length: 9 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={220} y1={130 + i * 10} x2={210} y2={130 + i * 10} stroke="#7c3aed" strokeWidth="1.5" />
              <line x1={320} y1={130 + i * 10} x2={330} y2={130 + i * 10} stroke="#7c3aed" strokeWidth="1.5" />
              <line x1={230 + i * 10} y1={120} x2={230 + i * 10} y2={110} stroke="#7c3aed" strokeWidth="1.5" />
              <line x1={230 + i * 10} y1={220} x2={230 + i * 10} y2={230} stroke="#7c3aed" strokeWidth="1.5" />
            </React.Fragment>
          ))}
        </g>

        {/* 3-Line Motherboard Data Bus running from CPU to left edge */}
        <g opacity="0.9">
          <path
            id="tl-bus-1"
            d="M 220,150 L 110,150 L 50,210 L 50,380 L -30,380"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
          <path
            id="tl-bus-2"
            d="M 220,170 L 115,170 L 60,225 L 60,370 L -30,370"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
          <path
            id="tl-bus-3"
            d="M 220,190 L 120,190 L 70,240 L 70,360 L -30,360"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
        </g>

        {/* Data pulses flowing down the top-left parallel bus */}
        <g>
          <circle r="3.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 5px #22d3ee)" }}>
            <animateMotion dur="4.2s" repeatCount="indefinite">
              <mpath href="#tl-bus-1" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}>
            <animateMotion dur="3.6s" repeatCount="indefinite" begin="1.2s">
              <mpath href="#tl-bus-2" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 5px #22d3ee)" }}>
            <animateMotion dur="4.8s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#tl-bus-3" />
            </animateMotion>
          </circle>
        </g>

        {/* 4. Left-Side PCI Slot and memory lines */}
        <g opacity="0.6">
          {/* Memory Slot Outline */}
          <rect x="100" y="550" width="12" height="250" rx="2" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="120" y="550" width="12" height="250" rx="2" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          
          <path d="M 106,580 L 106,770 M 126,580 L 126,770" stroke="#7c3aed" strokeWidth="1" strokeDasharray="4, 4" />
          
          {/* Outward traces */}
          <path d="M 106,550 L 106,500 L 40,440" fill="none" stroke="url(#trace-grad)" strokeWidth="1" />
          <path d="M 126,550 L 126,495 L 60,435" fill="none" stroke="url(#trace-grad)" strokeWidth="1" />
          <path d="M 112,800 L 112,840 L 170,898" fill="none" stroke="url(#trace-grad)" strokeWidth="1" />
          
          <circle cx="40" cy="440" r="2.5" fill="#c789ff" />
          <circle cx="60" cy="435" r="2.5" fill="#c789ff" />
          <circle cx="170" cy="898" r="2.5" fill="#c789ff" />
        </g>

        {/* 5. Center-Top & Center-Bottom Diagnostic Circuit Nodes */}
        <g opacity="0.75" className="pcb-trace">
          {/* Center-Top Lines */}
          <path d="M 700,50 L 850,50 L 890,90 L 1050,90 L 1100,40 L 1200,40" fill="none" stroke="url(#trace-grad)" strokeWidth="1.2" />
          <circle cx="700" cy="50" r="3.5" fill="#7c3aed" className="pcb-node" />
          <circle cx="1200" cy="40" r="3.5" fill="#7c3aed" className="pcb-node" />
          
          {/* Center-Bottom Lines */}
          <path d="M 680,1030 L 780,1030 L 840,970 L 980,970 L 1040,1030 L 1180,1030" fill="none" stroke="url(#trace-grad)" strokeWidth="1.2" />
          <circle cx="680" cy="1030" r="3.5" fill="#4f46e5" className="pcb-node" />
          <circle cx="1180" cy="1030" r="3.5" fill="#4f46e5" className="pcb-node" />
        </g>

        {/* 6. Top-Right Inductor Coil & Antenna Layout */}
        <g opacity="0.8">
          {/* Concentric antenna coil */}
          <circle cx="1650" cy="220" r="60" fill="none" stroke="url(#trace-grad)" strokeWidth="1.5" strokeDasharray="30, 8, 10, 8" />
          <circle cx="1650" cy="220" r="45" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="15, 6" />
          <circle cx="1650" cy="220" r="30" fill="none" stroke="#c789ff" strokeWidth="1" />
          <circle cx="1650" cy="220" r="15" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          
          {/* Technical target crosshairs */}
          <line x1="1570" y1="220" x2="1730" y2="220" stroke="rgba(199, 137, 255, 0.2)" strokeWidth="1" />
          <line x1="1650" y1="140" x2="1650" y2="300" stroke="rgba(199, 137, 255, 0.2)" strokeWidth="1" />
          
          {/* Outward feed lines */}
          <path d="M 1650,160 L 1650,80 L 1580,10 L 1400,10" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
          <circle cx="1400" cy="10" r="3" fill="#7c3aed" />
        </g>

        {/* 7. Bottom-Right Chipset & 4-Line Parallel Motherboard Bus */}
        <g opacity="0.85">
          {/* Microcontroller IC */}
          <rect x="1560" y="760" width="120" height="70" rx="6" fill="rgba(17, 9, 36, 0.6)" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="1570" y="770" width="100" height="50" rx="3" fill="none" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2, 2" />
          {/* IC text schematic print */}
          <text x="1620" y="800" fill="rgba(199, 137, 255, 0.45)" fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
            PROB_V2
          </text>
          
          {/* IC Chip pins */}
          {Array.from({ length: 5 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={1550} y1={775 + i * 10} x2={1560} y2={775 + i * 10} stroke="#7c3aed" strokeWidth="1.5" />
              <line x1={1680} y1={775 + i * 10} x2={1690} y2={775 + i * 10} stroke="#7c3aed" strokeWidth="1.5" />
            </React.Fragment>
          ))}
        </g>

        {/* 4-Line Parallel Data Bus connecting bottom-right chip to page edge */}
        <g opacity="0.9">
          <path
            id="br-bus-1"
            d="M 1550,785 L 1420,785 L 1360,845 L 1360,980 L 1280,1040 H 1150"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
          <path
            id="br-bus-2"
            d="M 1550,797 L 1425,797 L 1370,852 L 1370,975 L 1292,1035 H 1150"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
          <path
            id="br-bus-3"
            d="M 1550,809 L 1430,809 L 1380,859 L 1380,970 L 1304,1030 H 1150"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
          <path
            id="br-bus-4"
            d="M 1550,821 L 1435,821 L 1390,866 L 1390,965 L 1316,1025 H 1150"
            fill="none"
            stroke="url(#bus-glow-grad)"
            strokeWidth="1.8"
          />
        </g>

        {/* Data pulses flowing along the bottom-right parallel bus */}
        <g>
          <circle r="3.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 5px #22d3ee)" }}>
            <animateMotion dur="5.0s" repeatCount="indefinite">
              <mpath href="#br-bus-1" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}>
            <animateMotion dur="4.4s" repeatCount="indefinite" begin="0.8s">
              <mpath href="#br-bus-2" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 5px #22d3ee)" }}>
            <animateMotion dur="5.6s" repeatCount="indefinite" begin="1.8s">
              <mpath href="#br-bus-3" />
            </animateMotion>
          </circle>
          <circle r="3.5" fill="#3b82f6" style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}>
            <animateMotion dur="4.8s" repeatCount="indefinite" begin="0.3s">
              <mpath href="#br-bus-4" />
            </animateMotion>
          </circle>
        </g>

        {/* 8. Technical Schematic Symbols & Details (Scattered subtly) */}
        <g opacity="0.3" fill="none" stroke="rgba(199, 137, 255, 0.2)" strokeWidth="1">
          {/* Capacitor symbols */}
          <g transform="translate(450, 80)">
            <line x1="0" y1="0" x2="30" y2="0" />
            <line x1="12" y1="-10" x2="12" y2="10" />
            <line x1="18" y1="-10" x2="18" y2="10" fill="none" stroke="rgba(199, 137, 255, 0.2)" />
            <line x1="30" y1="0" x2="45" y2="0" />
          </g>
          <g transform="translate(1380, 500)">
            <line x1="0" y1="0" x2="30" y2="0" />
            <line x1="12" y1="-10" x2="12" y2="10" />
            <line x1="18" y1="-10" x2="18" y2="10" />
            <line x1="30" y1="0" x2="45" y2="0" />
          </g>
          <g transform="translate(900, 850)">
            <line x1="0" y1="0" x2="30" y2="0" />
            <line x1="12" y1="-10" x2="12" y2="10" />
            <line x1="18" y1="-10" x2="18" y2="10" />
            <line x1="30" y1="0" x2="45" y2="0" />
          </g>

          {/* Resistor schematic symbols */}
          <g transform="translate(80, 850)">
            <path d="M 0,0 H 15 L 18,-6 L 22,6 L 26,-6 L 30,6 L 34,-6 L 38,6 L 41,0 H 56" />
          </g>
          <g transform="translate(1780, 380)">
            <path d="M 0,0 H 15 L 18,-6 L 22,6 L 26,-6 L 30,6 L 34,-6 L 38,6 L 41,0 H 56" />
          </g>

          {/* Test Point Labels and GND symbols */}
          <g fontStyle="normal" transform="translate(100, 480)" fill="rgba(199, 137, 255, 0.25)" stroke="none">
            <text x="0" y="0" fontSize="8" fontFamily="monospace">TP_GND_ISO</text>
          </g>
          <g fontStyle="normal" transform="translate(1620, 740)" fill="rgba(199, 137, 255, 0.25)" stroke="none">
            <text x="0" y="0" fontSize="8" fontFamily="monospace">VCC_5V_MAIN</text>
          </g>
          <g fontStyle="normal" transform="translate(120, 110)" fill="rgba(199, 137, 255, 0.25)" stroke="none">
            <text x="0" y="0" fontSize="8" fontFamily="monospace">SYS_CLK_16MHZ</text>
          </g>
          <g fontStyle="normal" transform="translate(1690, 295)" fill="rgba(199, 137, 255, 0.25)" stroke="none">
            <text x="0" y="0" fontSize="8" fontFamily="monospace">ANT_RF_IN</text>
          </g>
          
          {/* Ground Symbol */}
          <g transform="translate(145, 485)">
            <line x1="0" y1="0" x2="0" y2="12" />
            <line x1="-8" y1="12" x2="8" y2="12" />
            <line x1="-5" y1="15" x2="5" y2="15" />
            <line x1="-2" y1="18" x2="2" y2="18" />
          </g>
        </g>
      </svg>
    </div>
  );
}
