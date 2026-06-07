"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Download, GraduationCap, Briefcase, Cpu, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// Custom inline SVG icons for LinkedIn and GitHub to avoid missing Lucide exports
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Count-Up animator helper component
function CountUp({
  end,
  decimals = 0,
  suffix = "",
  duration = 2.0,
}: {
  end: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && active) {
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
            // Quadratic ease-out
            const easeProgress = progress * (2 - progress);
            const currentValue = easeProgress * end;
            
            if (active) {
              setCount(currentValue);
            }
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              if (active) {
                setCount(end);
                setCompleted(true);
              }
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      active = false;
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span
      ref={elementRef}
      className={`transition-all duration-700 ${
        completed
          ? "text-accent-light drop-shadow-[0_0_15px_rgba(199,137,255,0.8)] scale-110 font-black"
          : "text-white"
      }`}
    >
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

interface Point {
  x: number;
  y: number;
}

interface LightningPath {
  d: string;
  branches: string[];
  opacity: number;
  width: number;
  colorType: 'cyan' | 'blue' | 'purple';
}

// Midpoint displacement algorithm to generate a jagged line between two points
function generateJaggedLine(
  p1: Point,
  p2: Point,
  displace: number,
  minSegmentLength: number = 8
): Point[] {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < minSegmentLength) {
    return [p1, p2];
  }

  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;

  // Normal vector (perpendicular to path)
  const perpX = -dy / dist;
  const perpY = dx / dist;

  // Displace mid point perpendicular to path
  const offset = (Math.random() - 0.5) * displace;
  const midPoint: Point = {
    x: midX + perpX * offset,
    y: midY + perpY * offset,
  };

  const left = generateJaggedLine(p1, midPoint, displace / 2, minSegmentLength);
  const right = generateJaggedLine(midPoint, p2, displace / 2, minSegmentLength);

  return [...left.slice(0, -1), ...right];
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightningPaths, setLightningPaths] = useState<LightningPath[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cx = 250;
    const cy = 250;
    const r = 175;

    interface LightningStrike {
      id: number;
      d: string;
      branches: string[];
      life: number;
      maxLife: number;
      flicker: number;
      width: number;
      colorType: 'cyan' | 'blue' | 'purple';
    }

    const createStrike = (type: 'circle' | 'discharge'): LightningStrike => {
      const id = Math.random();
      const maxLife = Math.random() * 200 + 200; // 200ms to 400ms lifetime
      const dParts: string[] = [];
      const branchParts: string[] = [];

      if (type === 'circle') {
        const startAngle = Math.random() * Math.PI * 2;
        const span = (Math.random() * 60 + 70) * (Math.PI / 180);
        const steps = 3;
        const arcPoints: Point[] = [];

        for (let i = 0; i <= steps; i++) {
          const angle = startAngle + (span * i) / steps;
          const rad = r + (Math.random() - 0.5) * 6;
          arcPoints.push({
            x: cx + rad * Math.cos(angle),
            y: cy + rad * Math.sin(angle),
          });
        }

        let mainPoints: Point[] = [];
        for (let i = 0; i < arcPoints.length - 1; i++) {
          const seg = generateJaggedLine(arcPoints[i], arcPoints[i+1], 10, 6);
          if (i === 0) mainPoints = seg;
          else mainPoints = [...mainPoints, ...seg.slice(1)];

          // Spawn branches off the circle
          if (Math.random() < 0.6) {
            const mid = seg[Math.floor(seg.length / 2)];
            const angle = Math.atan2(mid.y - cy, mid.x - cx);
            const bLen = Math.random() * 50 + 35;
            const bAngle = angle + (Math.random() - 0.5) * 0.6;
            const bEnd = {
              x: mid.x + bLen * Math.cos(bAngle),
              y: mid.y + bLen * Math.sin(bAngle)
            };
            const bPoints = generateJaggedLine(mid, bEnd, 8, 6);
            branchParts.push(bPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));
          }
        }
        dParts.push(mainPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));

      } else {
        // Discharge strike (Tesla bolt shooting far outward)
        const angle = Math.random() * Math.PI * 2;
        const startPt = {
          x: cx + r * Math.cos(angle),
          y: cy + r * Math.sin(angle)
        };
        const baseLen = isMobile ? 80 : 150;
        const varLen = isMobile ? 90 : 180;
        const spikeLen = Math.random() * varLen + baseLen; // Scaled down by ~50% on mobile
        const spikeAngle = angle + (Math.random() - 0.5) * 0.45;
        const endPt = {
          x: startPt.x + spikeLen * Math.cos(spikeAngle),
          y: startPt.y + spikeLen * Math.sin(spikeAngle)
        };

        const trunkPoints = generateJaggedLine(startPt, endPt, 20, 8);
        dParts.push(trunkPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));

        // Primary branches off the trunk
        const numBranches = Math.floor(Math.random() * 2) + 2; // 2 or 3 branches
        for (let j = 0; j < numBranches; j++) {
          const tIdx = Math.floor(Math.random() * (trunkPoints.length - 4)) + 2;
          const bStart = trunkPoints[tIdx];
          const bLen = spikeLen * (1 - tIdx / trunkPoints.length) * 0.65 + 30;
          const bAngle = spikeAngle + (Math.random() > 0.5 ? 0.6 : -0.6) + (Math.random() - 0.5) * 0.25;
          const bEnd = {
            x: bStart.x + bLen * Math.cos(bAngle),
            y: bStart.y + bLen * Math.sin(bAngle)
          };

          const bPoints = generateJaggedLine(bStart, bEnd, 12, 6);
          branchParts.push(bPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));

          // Secondary branch off primary branch
          if (Math.random() < 0.65 && bPoints.length > 4) {
            const subStart = bPoints[Math.floor(bPoints.length / 2)];
            const subLen = bLen * 0.5;
            const subAngle = bAngle + (Math.random() > 0.5 ? 0.7 : -0.7);
            const subEnd = {
              x: subStart.x + subLen * Math.cos(subAngle),
              y: subStart.y + subLen * Math.sin(subAngle)
            };
            const subPoints = generateJaggedLine(subStart, subEnd, 6, 6);
            branchParts.push(subPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));
          }
        }
      }

      const colors: ('cyan' | 'blue' | 'purple')[] = ['cyan', 'blue', 'purple'];
      const colorType = colors[Math.floor(Math.random() * colors.length)];

      return {
        id,
        d: dParts[0],
        branches: branchParts,
        life: maxLife,
        maxLife,
        flicker: 1.0,
        width: type === 'circle' ? 1.5 : 2.2,
        colorType
      };
    };

    let activeStrikes: LightningStrike[] = [];
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      // Update active strikes (subtract lifetime and calculate flicker)
      activeStrikes = activeStrikes
        .map((strike) => ({
          ...strike,
          life: strike.life - delta,
          flicker: Math.random() * 0.85 + 0.15
        }))
        .filter((strike) => strike.life > 0);

      const circleCount = activeStrikes.filter(s => s.width === 1.5).length;
      const dischargeCount = activeStrikes.filter(s => s.width === 2.2).length;

      const maxCircles = isMobile ? 2 : 5;
      const maxDischarges = isMobile ? 1 : 3;
      const circleSpawnRate = isMobile ? 0.12 : 0.22;
      const dischargeSpawnRate = isMobile ? 0.08 : 0.16;

      // Maintain active circular wrapping strikes (throttled on mobile)
      if (circleCount < maxCircles && Math.random() < circleSpawnRate) {
        activeStrikes.push(createStrike('circle'));
      }

      // Maintain active outward discharge strikes (throttled on mobile)
      if (dischargeCount < maxDischarges && Math.random() < dischargeSpawnRate) {
        activeStrikes.push(createStrike('discharge'));
      }

      setLightningPaths(
        activeStrikes.map((s) => ({
          d: s.d,
          branches: s.branches,
          opacity: s.flicker * (s.life / s.maxLife),
          width: s.width,
          colorType: s.colorType
        }))
      );

      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isMobile]);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "Electronics Engineer",
    "VLSI Enthusiast",
    "Embedded Systems",
    "IoT Innovator",
  ];

  // Rotate roles every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Custom mouse follow local glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Framer Motion 3D tilt values for the portrait (Max 5-10px parallax movement)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [4, -4]);
  const rotateY = useTransform(x, [-150, 150], [-4, 4]);

  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleCardMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const stats = [
    { value: 8.0, decimals: 1, suffix: "/10", label: "CGPA", icon: GraduationCap },
    { value: 2, decimals: 0, suffix: "+", label: "Internships", icon: Briefcase },
    { value: 4, decimals: 0, suffix: "+", label: "Key Projects", icon: Cpu },
    { value: 6, decimals: 0, suffix: "+", label: "Certifications", icon: ShieldCheck },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-20 pb-4 flex flex-col justify-center overflow-hidden bg-transparent animate-fade-in"
    >
      {/* Stylesheet injector for continuous high-fidelity electric/thunder lightning flashes */}
      <style jsx global>{`
        @keyframes electric-lightning-flicker {
          0%, 100% { opacity: 0.1; filter: drop-shadow(0 0 1px transparent); }
          5%, 25%, 45%, 65%, 85% { opacity: 1; }
          15%, 35%, 55%, 75% { opacity: 0.3; }
          90% { opacity: 0.95; }
        }
        @keyframes shockwave-out-continuous {
          0% { transform: scale(0.96); opacity: 0.2; stroke-width: 1.5px; }
          50% { transform: scale(1.15); opacity: 0.85; stroke-width: 2.5px; }
          100% { transform: scale(1.3); opacity: 0; stroke-width: 0.1px; }
        }
        .lightning-branch-1 {
          animation: electric-lightning-flicker 1.2s infinite linear;
          stroke: #ffffff;
        }
        .lightning-branch-2 {
          animation: electric-lightning-flicker 1.5s infinite linear 0.3s;
          stroke: #ffffff;
        }
        .lightning-branch-3 {
          animation: electric-lightning-flicker 1.3s infinite linear 0.6s;
          stroke: #ffffff;
        }
        .lightning-branch-4 {
          animation: electric-lightning-flicker 1.6s infinite linear 0.9s;
          stroke: #ffffff;
        }
        .lightning-branch-spikes {
          animation: electric-lightning-flicker 2s infinite linear 0.1s;
          stroke: #ffffff;
        }
        .electric-shockwave-continuous {
          transform-origin: 250px 250px;
          animation: shockwave-out-continuous 3s infinite cubic-bezier(0.1, 0.8, 0.2, 1);
          stroke: #3b82f6;
        }
      `}</style>

      {/* Subtle localized mouse follow glow overlay */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full bg-accent-purple/8 blur-[130px] pointer-events-none transition-all duration-300 hidden md:block"
        style={{
          left: `${mousePos.x - 225}px`,
          top: `${mousePos.y - 225}px`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Side Details */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-3 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Custom Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-accent-light bg-accent-purple/10 border border-accent-purple/20 uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-light animate-ping" />
              WELCOME TO MY SPACE
            </div>

            <h2 className="text-xl md:text-2xl font-medium text-text-purple tracking-wide">
              Hi, I'm <span className="text-white font-extrabold">{`G. Vishal V Prabhu`}</span>
            </h2>
            
            {/* Dynamic Role Swapping Animation */}
            <div className="h-8 md:h-10 overflow-hidden relative mt-0.5 w-full">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="text-gradient-purple font-extrabold text-xl md:text-2xl block w-full text-center lg:text-left"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            <h1 className="text-[26px] min-[375px]:text-3xl md:text-5xl lg:text-[54px] font-black tracking-tight mt-2.5 leading-[1.15] text-center lg:text-left">
              <span className="text-gradient block">Electronics &</span>
              <span className="text-white block">Communication Engineer</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-slate-400 w-full max-w-xl mx-auto lg:mx-0 text-sm md:text-base leading-relaxed font-light text-center lg:text-left"
          >
            BE Electronics & Communication Engineering student specializing in embedded systems, VLSI circuits, and power electronics. Eager to design robust hardware and firmware for real-world electronic challenges.
          </motion.p>

          {/* Socials & Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col lg:flex-row items-center gap-4 pt-1 w-full"
          >
            <a
              href="/resume.pdf"
              download="Resume-G_Vishal_V_Prabhu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn flex items-center justify-center gap-2 w-full sm:w-[320px] lg:w-auto px-5 py-3 rounded-full bg-accent-purple text-white border border-accent-purple/40 font-bold text-sm shadow-lg shadow-accent-purple/30 group"
            >
              <Download className="w-4.5 h-4.5 group-hover:animate-bounce" />
              Download Resume
            </a>

            <div className="flex items-center gap-2.5 justify-center mt-1 lg:mt-0">
              <a
                href="https://linkedin.com/in/gvishalvprabhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-accent-purple/20 bg-accent-purple/5 flex items-center justify-center hover:bg-accent-purple hover:border-accent-purple text-text-purple hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:vishalprabhu58@gmail.com"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-accent-purple/20 bg-accent-purple/5 flex items-center justify-center hover:bg-accent-purple hover:border-accent-purple text-text-purple hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:-translate-y-1"
                aria-label="Email Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/gvishalvprabhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl border border-accent-purple/20 bg-accent-purple/5 flex items-center justify-center hover:bg-accent-purple hover:border-accent-purple text-text-purple hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Circular Premium Portrait Display & Energy Network */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative py-4 lg:py-0 select-none order-1 lg:order-2">
          
          {/* Centered Wrapper ensuring pixel-perfect centering of SVG and Profile photo */}
          <div className="relative w-[220px] h-[220px] min-[375px]:w-[250px] min-[375px]:h-[250px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] flex items-center justify-center">
            
            {/* Layered Energy System & PCB Traces behind portrait */}
            <div className="absolute w-[324px] h-[324px] min-[375px]:w-[368px] min-[375px]:h-[368px] sm:w-[412px] sm:h-[412px] md:w-[516px] md:h-[516px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="neon-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c789ff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9" />
                  </linearGradient>

                  <filter id="circuit-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Layer 1: Rotating Concentric Scan Rings (Gyroscope effect) */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <circle
                    cx="250"
                    cy="250"
                    r="170"
                    fill="none"
                    stroke="url(#neon-purple-grad)"
                    strokeWidth="2"
                    strokeDasharray="45, 15, 5, 25"
                    opacity="0.7"
                    filter="url(#circuit-neon-glow)"
                  />
                </motion.g>

                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <circle
                    cx="250"
                    cy="250"
                    r="192"
                    fill="none"
                    stroke="rgba(199, 137, 255, 0.25)"
                    strokeWidth="1.2"
                    strokeDasharray="15, 30, 8, 12"
                  />
                  
                  {/* Solder nodes on scan rings */}
                  <circle cx="250" cy="58" r="3.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="250" cy="442" r="3.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="58" cy="250" r="3.5" fill="#4f46e5" className="pcb-node" />
                  <circle cx="442" cy="250" r="3.5" fill="#4f46e5" className="pcb-node" />
                </motion.g>

                {/* Layer 2: PCB traces extending outward */}
                <g className="opacity-75">
                  {/* Top Left Path */}
                  <path d="M 130,130 L 60,60 L 10,60" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                  <circle cx="60" cy="60" r="4.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="10" cy="60" r="4" fill="#7c3aed" />

                  {/* Top Right Path */}
                  <path d="M 370,130 L 440,60 L 490,60" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                  <circle cx="440" cy="60" r="4.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="490" cy="60" r="4" fill="#7c3aed" />

                  {/* Bottom Left Path */}
                  <path d="M 130,370 L 60,440 L 10,440" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="60" cy="440" r="4.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="10" cy="440" r="4" fill="#4f46e5" />

                  {/* Bottom Right Path */}
                  <path d="M 370,370 L 440,440 L 490,440" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
                  <circle cx="440" cy="440" r="4.5" fill="#c789ff" className="pcb-node" />
                  <circle cx="490" cy="440" r="4" fill="#4f46e5" />
                  
                  {/* Side lines */}
                  <path d="M 80,250 L 15,250" fill="none" stroke="#7c3aed" strokeWidth="2" />
                  <path d="M 420,250 L 485,250" fill="none" stroke="#4f46e5" strokeWidth="2" />
                </g>

                {/* Layer 3: Animated electric pulses / data packets moving along traces */}
                <g>
                  <circle r="5" fill="#c789ff" filter="drop-shadow(0 0 10px #c789ff)">
                    <animateMotion dur="2.8s" repeatCount="indefinite" path="M 130,130 L 60,60 L 10,60" />
                  </circle>
                  <circle r="5" fill="#d946ef" filter="drop-shadow(0 0 10px #d946ef)">
                    <animateMotion dur="3.5s" repeatCount="indefinite" path="M 370,130 L 440,60 L 490,60" />
                  </circle>
                  <circle r="5" fill="#4f46e5" filter="drop-shadow(0 0 10px #4f46e5)">
                    <animateMotion dur="4.0s" repeatCount="indefinite" path="M 130,370 L 60,440 L 10,440" />
                  </circle>
                  <circle r="5" fill="#c789ff" filter="drop-shadow(0 0 10px #c789ff)">
                    <animateMotion dur="3.6s" repeatCount="indefinite" path="M 370,370 L 440,440 L 490,440" />
                  </circle>
                </g>

                {/* Layer 4: Flowing neon energy particles (orbiting particles) */}
                <motion.g
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 15, 0],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <circle cx="40" cy="100" r="3" fill="#c789ff" className="animate-pulse" />
                  <circle cx="440" cy="170" r="3.5" fill="#4f46e5" className="animate-pulse" style={{ animationDelay: "1s" }} />
                  <circle cx="80" cy="420" r="3" fill="#d946ef" className="animate-pulse" style={{ animationDelay: "1.8s" }} />
                  <circle cx="420" cy="410" r="2" fill="#c789ff" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
                </motion.g>

                {/* Concentric scan lines */}
                <circle cx="250" cy="250" r="158" fill="none" stroke="rgba(124, 58, 237, 0.5)" strokeWidth="2.5" filter="url(#circuit-neon-glow)" />
                <circle cx="250" cy="250" r="164" fill="none" stroke="rgba(199, 137, 255, 0.25)" strokeWidth="1" />

                {/* THIN GLOWING CIRCULAR ENERGY RING - Slow rotation, purple neon glow */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <circle cx="250" cy="96" r="3" fill="#ffffff" />
                  <circle cx="250" cy="404" r="3" fill="#ffffff" />
                </motion.g>

                {/* CONTINUOUS DYNAMIC SHOCKWAVE / EXPANDING ENERGY PULSE RIPPLE */}
                <circle
                  cx="250"
                  cy="250"
                  r="170"
                  fill="none"
                  strokeWidth="2"
                  className="electric-shockwave-continuous"
                />

                {/* DYNAMIC HIGH-FIDELITY ELECTRIC LIGHTNING ARCS */}
                {lightningPaths.map((path, idx) => {
                  let outerColor = "#2563eb";
                  let innerColor = "#06b6d4";
                  if (path.colorType === 'purple') {
                    outerColor = "#7c3aed";
                    innerColor = "#a78bfa";
                  } else if (path.colorType === 'cyan') {
                    outerColor = "#0891b2";
                    innerColor = "#22d3ee";
                  }

                  return (
                    <g key={idx} style={{ opacity: path.opacity }}>
                      {/* --- Main Trunk --- */}
                      {/* Layer 1: Thick outer color glow */}
                      <path
                        d={path.d}
                        fill="none"
                        stroke={outerColor}
                        strokeWidth={path.width * 3.5}
                        style={{ filter: "blur(5px)" }}
                      />
                      {/* Layer 2: Intense white glow envelope */}
                      <path
                        d={path.d}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={path.width * 2.2}
                        style={{ filter: "blur(2.5px)" }}
                      />
                      {/* Layer 3: Inner color glow */}
                      <path
                        d={path.d}
                        fill="none"
                        stroke={innerColor}
                        strokeWidth={path.width * 1.5}
                        style={{ filter: "blur(1px)" }}
                      />
                      {/* Layer 4: Hot white core */}
                      <path
                        d={path.d}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth={path.width * 0.7}
                      />

                      {/* --- Branches --- */}
                      {path.branches.map((bd, bIdx) => (
                        <g key={bIdx}>
                          {/* Layer 1: Outer color glow */}
                          <path
                            d={bd}
                            fill="none"
                            stroke={outerColor}
                            strokeWidth={path.width * 2.2}
                            style={{ filter: "blur(3.5px)" }}
                          />
                          {/* Layer 2: White glow envelope */}
                          <path
                            d={bd}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth={path.width * 1.4}
                            style={{ filter: "blur(1.5px)" }}
                          />
                          {/* Layer 3: Inner color glow */}
                          <path
                            d={bd}
                            fill="none"
                            stroke={innerColor}
                            strokeWidth={path.width * 0.9}
                            style={{ filter: "blur(0.5px)" }}
                          />
                          {/* Layer 4: Thin hot core */}
                          <path
                            d={bd}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth={path.width * 0.4}
                          />
                        </g>
                      ))}
                    </g>
                  );
                })}

              </svg>
            </div>

            {/* Premium Circular Portrait Display (STATIONARY - Tilt Parallax on Mouse Move ONLY) */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="w-full h-full rounded-full p-2 bg-gradient-to-tr from-[#2e1065]/20 to-[#1e1b4b]/15 border-[3.5px] border-[#5b21b6]/85 hover:border-accent-purple transition-colors duration-300 shadow-[0_0_65px_rgba(124,58,237,0.55)] group cursor-pointer z-10 overflow-visible relative"
            >
              {/* Glassmorphic border ring effect */}
              <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none z-20 group-hover:border-accent-light/40 transition-colors duration-300" />
              
              {/* Outer Circular Neon Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-accent-purple/20 group-hover:bg-accent-purple/35 blur-md transition-all duration-300 pointer-events-none -z-10" />

              {/* Inner Portrait Container: Circular crop showing original portrait filling the circle with a thick dark purple frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-[4px] border-[#3b0764]">
                {/* Profile Image - Original photo directly cropped inside circle with object-fit: cover */}
                <Image
                  src="/profile.jpg"
                  alt="G. Vishal V Prabhu"
                  fill
                  priority
                  className="object-cover scale-[1.32] object-[center_30%] group-hover:scale-[1.38] transition-transform duration-500 filter contrast-[1.03]"
                />
              </div>
              
              {/* Status light element */}
              <div className="absolute bottom-4 right-10 w-6.5 h-6.5 rounded-full bg-[#110825] border border-accent-purple/40 flex items-center justify-center shadow-lg z-20">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* Refined Count-Up Statistics counter row */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-5 md:mt-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 rounded-[24px] border border-accent-purple/15 bg-[#0e071e]/55 backdrop-blur-md overflow-hidden"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`relative flex items-center justify-center p-4 md:p-5 flex-col sm:flex-row gap-3.5 group cursor-pointer transition-all duration-300 hover:bg-accent-purple/5
                  ${idx % 2 === 0 ? "border-r border-accent-purple/10 lg:border-r-0" : ""}
                  ${idx < 2 ? "border-b border-accent-purple/10 lg:border-b-0" : ""}
                `}
              >
                {/* Visual Glass highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Divider Line on Desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-accent-purple/15" />
                )}

                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-light group-hover:scale-110 group-hover:bg-accent-purple group-hover:text-white transition-all duration-300">
                  <Icon className="w-4.5 h-4.5" />
                </div>

                <div className="flex flex-col text-center sm:text-left">
                  {/* The animating counter */}
                  <span className="text-2xl md:text-3xl font-extrabold tracking-tight flex items-center justify-center sm:justify-start">
                    <CountUp end={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                  </span>
                  
                  <span className="text-xs font-semibold text-slate-400 mt-1 tracking-wider uppercase group-hover:text-white transition-colors">
                    {stat.label}
                  </span>
                </div>

                {/* Subtly glowing border accent when hovered */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-accent-purple group-hover:to-accent-pink transition-colors duration-300" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
