"use client";

import React, { useState } from "react";
import { ArrowUpRight, Award, Layers, Zap, Sun, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Works() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Works" },
    { id: "embedded", label: "Embedded/IoT" },
    { id: "power", label: "Power Electronics" },
    { id: "vlsi", label: "VLSI/Digital" },
  ];

  const projects = [
    {
      id: 1,
      title: "Advanced Power Supply with Inverter",
      category: "power",
      award: "1st Prize, Hardware Project Expo 2025",
      description:
        "Designed a compact power supply integrating buck and boost converters for adjustable DC output (1.5 V – 30 V) with a 12 V battery back. Incorporated mobile charging protection and a 50 W inverter for AC appliances.",
      tags: ["Buck-Boost", "Power Electronics", "50W Inverter", "Overcurrent Protection"],
      icon: Zap,
      circuitDesign: (
        <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="20" width="40" height="30" rx="3" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="40" y="38" fill="#7c3aed" fontSize="8" textAnchor="middle">12V Batt</text>
          <path d="M 60,35 L 90,35" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="3,3" />
          <polygon points="90,30 110,35 90,40" fill="none" stroke="#c789ff" strokeWidth="1.5" />
          <rect x="110" y="20" width="50" height="30" rx="3" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="135" y="38" fill="#4f46e5" fontSize="8" textAnchor="middle">Buck-Boost</text>
          <path d="M 160,35 L 180,35 L 180,75 L 150,75" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="90" y="65" width="60" height="30" rx="3" fill="none" stroke="#d946ef" strokeWidth="1.5" />
          <text x="120" y="83" fill="#d946ef" fontSize="8" textAnchor="middle">50W Inverter</text>
          <path d="M 90,80 L 70,80 L 70,50" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Solar-Powered IoT Retractable Roof",
      category: "embedded",
      award: "1st Prize, Akshay Urja Diwas 2025",
      description:
        "Engineered an automated smart retractable roof system powered by solar battery storage. Integrated rain sensors and servo motor mechanisms via ESP32 for intelligent weather-based protection.",
      tags: ["ESP32 MCU", "Solar Energy", "Rain Sensors", "Servo Control", "IoT Smart Home"],
      icon: Sun,
      circuitDesign: (
        <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="15" fill="none" stroke="#d946ef" strokeWidth="1.5" />
          <line x1="40" y1="20" x2="40" y2="15" stroke="#d946ef" strokeWidth="1.5" />
          <line x1="40" y1="60" x2="40" y2="65" stroke="#d946ef" strokeWidth="1.5" />
          <line x1="20" y1="40" x2="15" y2="40" stroke="#d946ef" strokeWidth="1.5" />
          <text x="40" y="43" fill="#d946ef" fontSize="7" textAnchor="middle">Solar Panel</text>
          <path d="M 55,40 L 90,40" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="90" y="25" width="50" height="40" rx="4" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="115" y="45" fill="#7c3aed" fontSize="10" textAnchor="middle">ESP32</text>
          <text x="115" y="55" fill="#7c3aed" fontSize="6" textAnchor="middle">IoT Hub</text>
          <path d="M 140,45 L 170,45" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          <circle cx="175" cy="45" r="5" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="175" y="60" fill="#4f46e5" fontSize="7" textAnchor="middle">Servo</text>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Edge-Based Object Recognition System",
      category: "embedded",
      description:
        "Built a fully offline AI object recognition system on ESP32-CAM. Configured an OV2640 camera and I2C OLED display for real-time inference and on-device visualization using TinyML models.",
      tags: ["TinyML", "ESP32-CAM", "OV2640 Camera", "I2C OLED", "Edge AI"],
      icon: Cpu,
      circuitDesign: (
        <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" width="50" height="50" rx="5" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="55" y="55" fill="#4f46e5" fontSize="8" textAnchor="middle">ESP32-CAM</text>
          <circle cx="55" cy="67" r="6" fill="none" stroke="#c789ff" strokeWidth="1.5" />
          <circle cx="55" cy="67" r="2" fill="#c789ff" />
          <path d="M 80,45 L 120,45" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <rect x="120" y="30" width="50" height="30" rx="3" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="145" y="48" fill="#7c3aed" fontSize="8" textAnchor="middle">OLED Display</text>
          <path d="M 55,80 L 55,100 L 110,100" fill="none" stroke="#d946ef" strokeWidth="1.5" />
          <text x="135" y="103" fill="#d946ef" fontSize="8">TinyML Model</text>
        </svg>
      ),
    },
    {
      id: 4,
      title: "8-Bit ALU Processor",
      category: "vlsi",
      description:
        "Engineered an 8-bit arithmetic logic unit using Verilog. Implemented mathematical operations along with key hardware flags (carry, zero, overflow) with waveform-based simulation and verification.",
      tags: ["Verilog HDL", "ALU Design", "ModelSim / LTspice", "Waveform Verification"],
      icon: Layers,
      circuitDesign: (
        <svg className="w-full h-full opacity-30" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,20 80,20 90,40 100,20 150,20 120,70 60,70" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="90" y="35" fill="#7c3aed" fontSize="12" fontWeight="bold" textAnchor="middle">ALU</text>
          <line x1="50" y1="10" x2="50" y2="20" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="50" y="8" fill="#4f46e5" fontSize="7" textAnchor="middle">A [7:0]</text>
          <line x1="130" y1="10" x2="130" y2="20" stroke="#4f46e5" strokeWidth="1.5" />
          <text x="130" y="8" fill="#4f46e5" fontSize="7" textAnchor="middle">B [7:0]</text>
          <line x1="90" y1="70" x2="90" y2="95" stroke="#d946ef" strokeWidth="1.5" />
          <text x="90" y="105" fill="#d946ef" fontSize="7" textAnchor="middle">Result [7:0]</text>
        </svg>
      ),
    },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="works" className="py-24 relative overflow-hidden bg-[#070314]/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase inline-block mb-4">
            Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            Featured projects from a portfolio of 20+ engineering projects. Exploring hardware engineering through core PCB circuits, microcontroller firmware, and VLSI RTL design.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border ${
                filter === cat.id
                  ? "bg-accent-purple border-accent-purple text-white shadow-lg shadow-accent-purple/20"
                  : "bg-accent-purple/5 border-accent-purple/10 text-text-purple hover:border-accent-purple/40 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              const ProjectIcon = proj.icon;
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel group rounded-3xl overflow-hidden flex flex-col justify-between h-full border border-accent-purple/15 bg-card-dark relative"
                >
                  <div>
                    {/* Visual schematic panel (circuit schematic SVG mockup) */}
                    <div className="h-48 bg-[#0b051c]/95 border-b border-accent-purple/10 flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-[#0d0622] transition-colors duration-300">
                      {proj.circuitDesign}
                      
                      {/* Floating Category Icon */}
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-accent-purple/20 border border-accent-purple/30 flex items-center justify-center text-accent-light group-hover:scale-110 transition-transform">
                        <ProjectIcon className="w-4.5 h-4.5" />
                      </div>

                      {/* Award Badge Overlay */}
                      {proj.award && (
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-amber-500 to-amber-600 border border-amber-400 text-white shadow-lg">
                          <Award className="w-3 h-3 text-white" />
                          {proj.award}
                        </div>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="p-6 md:p-8 space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-accent-light transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  {/* Tags and Action */}
                  <div className="p-6 md:px-8 md:pb-8 pt-0 space-y-5">
                    {/* Technology tags */}
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-md bg-accent-purple/10 border border-accent-purple/20 text-accent-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom row (Link / CTA) */}
                    <div className="flex justify-between items-center border-t border-accent-purple/10 pt-4">
                      <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                        {proj.category === "power" ? "Power Electronics" : proj.category === "vlsi" ? "VLSI / Digital" : "Embedded & IoT"}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-accent-light group-hover:text-white transition-colors cursor-pointer">
                        View Schematic
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Active highlight glow border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent-purple/40 pointer-events-none transition-all duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Explore All Projects CTA */}
        <div className="flex justify-center mt-12">
          <a
            href="https://sites.google.com/view/vishalprabhuprojects/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-accent-purple text-white border border-accent-purple/40 font-bold text-sm shadow-lg shadow-accent-purple/30 group transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
          >
            Explore All Projects
            <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
