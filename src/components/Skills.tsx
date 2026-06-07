"use client";

import React from "react";
import { Code2, Cpu, Wrench, Binary, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["C (Firmware Dev)", "C++ (MCU-Level)"],
      glow: "from-accent-purple to-accent-indigo",
    },
    {
      title: "Embedded & IoT Platforms",
      icon: Cpu,
      skills: ["Arduino IDE", "ESP32 MCU", "ESP32-CAM AI", "Sensor Integration", "BMS Interfacing"],
      glow: "from-accent-indigo to-accent-pink",
    },
    {
      title: "Simulation & EDA Tools",
      icon: Wrench,
      skills: ["LTspice XVII", "NI Multisim", "MATLAB", "Scilab", "Solid Edge CAD"],
      glow: "from-accent-pink to-accent-purple",
    },
    {
      title: "VLSI & Digital Logic Design",
      icon: Binary,
      skills: ["Verilog HDL", "CMOS Layout Design", "IC Design Flow", "Waveform Verification"],
      glow: "from-accent-purple to-accent-light",
    },
    {
      title: "Hardware & Circuit Analysis",
      icon: Layers,
      skills: [
        "Analog & Digital Circuits",
        "PCB Design Concepts",
        "CMOS Logic Principles",
        "Component Troubleshooting (Resistors, Caps, Transistors, Op-amps, Diodes)",
      ],
      glow: "from-accent-light to-accent-indigo",
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Glow background circle */}
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-accent-purple/10 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase inline-block mb-4">
            Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            My Skills & Tech Stack
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            Categorized skillset spanning firmware scripting, circuit layouts, digital VLSI registers, and electrical simulation tools.
          </p>
        </div>

        {/* Skills Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const CategoryIcon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel relative p-6 md:p-8 rounded-3xl bg-[#0e071e]/30 border border-accent-purple/15 flex flex-col justify-between group"
              >
                {/* Background Card Hover Glow Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10" />

                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.glow} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-accent-light transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills Badges Grid */}
                  <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent-purple/10 border border-accent-purple/20 text-slate-200 group-hover:bg-accent-purple/15 group-hover:text-white transition-all hover:border-accent-light/40 text-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle bottom design accent */}
                <div className="mt-6 pt-3 border-t border-accent-purple/5 flex items-center justify-center sm:justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-purple group-hover:bg-accent-light transition-colors" />
                </div>

                {/* Card outline glow on hover */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-accent-purple/30 pointer-events-none transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
