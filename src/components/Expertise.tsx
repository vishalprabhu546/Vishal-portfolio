"use client";

import React, { useState } from "react";
import { ArrowUpRight, Cpu, Activity, Layout, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Expertise() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const expertises = [
    {
      num: "01",
      title: "Embedded Systems & Firmware Development",
      description:
        "Microcontroller firmware development in C/C++ on platforms like Arduino, ESP32, and ESP32-CAM. Designing TinyML offline object detection models and edge computing solutions.",
      icon: Cpu,
      subItems: ["Firmware (C/C++)", "ESP32 & ESP32-CAM", "Edge AI / TinyML", "MCU Peripherals"],
    },
    {
      num: "02",
      title: "Circuit Design & Analog/Digital Electronics",
      description:
        "Designing CMOS logic, analog signal conditioning, and power electronics circuits. Performing component-level hardware troubleshooting (resistors, caps, transistors, op-amps).",
      icon: Activity,
      subItems: ["Analog & Digital", "CMOS Logic", "Troubleshooting", "Sensor Interfacing"],
    },
    {
      num: "03",
      title: "EDA Tools, Simulation & PCB Design",
      description:
        "Accurate circuit simulation and verification. Generating schematics and simulating waveforms to validate circuits before hardware assembly.",
      icon: Layout,
      subItems: ["LTspice Simulation", "NI Multisim", "MATLAB & Scilab", "PCB Layout Concepts"],
    },
    {
      num: "04",
      title: "VLSI & Digital Processor Design",
      description:
        "Writing hardware description language (Verilog HDL) for arithmetic/logical processors. Understanding semiconductor physics, layout design, and full IC fabrication integration flow.",
      icon: Terminal,
      subItems: ["Verilog HDL", "ALU Processor Design", "IC Integration Flow", "Waveform Verification"],
    },
  ];

  return (
    <section id="expertise" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase inline-block mb-4"
          >
            My Quality Services
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
          >
            My Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 mt-4 text-sm md:text-base"
          >
            A solid foundation in electronics engineering, merging hardware circuit physics with embedded system logic.
          </motion.p>
        </div>

        {/* Accordion / List */}
        <div className="flex flex-col border-t border-accent-purple/10">
          {expertises.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    setHoveredIdx(hoveredIdx === idx ? null : idx);
                  }
                }}
                className="relative py-8 md:py-10 border-b border-accent-purple/10 flex flex-col md:flex-row md:items-start justify-between gap-6 cursor-pointer group transition-all duration-500"
              >
                {/* Background purple hover glow row */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-accent-purple/15 to-transparent -z-10 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Desktop Version: side-by-side alignment */}
                <div className="hidden md:flex items-start gap-8 md:w-[45%]">
                  {/* Item Number */}
                  <span
                    className={`text-lg md:text-xl font-bold transition-all duration-300 ${
                      isHovered ? "text-accent-light scale-105" : "text-slate-500"
                    }`}
                  >
                    {item.num}
                  </span>
                  
                  {/* Icon and Title */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
                        isHovered
                          ? "bg-accent-purple border-accent-purple text-white rotate-6 shadow-[0_0_12px_rgba(124,58,237,0.4)]"
                          : "border-accent-purple/20 bg-accent-purple/5 text-accent-light"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`text-lg md:text-2xl font-bold tracking-tight transition-all duration-300 ${
                          isHovered ? "text-white" : "text-slate-200"
                        }`}
                      >
                        {item.title}
                      </h4>
                      {/* Sub-item tags only visible or highlighted when hovered */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.subItems.map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-300 ${
                              isHovered
                                ? "bg-accent-purple/20 border-accent-light/45 text-white"
                                : "bg-transparent border-accent-purple/10 text-slate-500"
                            }`}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Version: stacked title and full-width tags wrapper */}
                <div className="flex md:hidden flex-col gap-3.5 w-full">
                  {/* Header Row: Number, Icon, Title */}
                  <div className="flex items-start gap-3 w-full">
                    {/* Item Number */}
                    <span className="text-base font-bold text-slate-500 shrink-0 pt-0.5">
                      {item.num}
                    </span>
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-accent-purple/20 bg-accent-purple/5 text-accent-light shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    {/* Title */}
                    <h4 className="text-base font-bold tracking-tight text-slate-200 leading-snug">
                      {item.title}
                    </h4>
                  </div>

                  {/* Tags wrapping below title with proper indentation */}
                  <div className="flex flex-wrap gap-2 w-full pl-8">
                    {item.subItems.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-[10.5px] px-2.5 py-1 rounded-full border transition-all duration-300 ${
                          isHovered
                            ? "bg-accent-purple/20 border-accent-light/45 text-white"
                            : "bg-accent-purple/5 border-accent-purple/15 text-slate-300"
                        }`}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description Details */}
                <div className="w-full md:w-[45%] pl-8 md:pl-8 flex justify-between items-start gap-4">
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-light group-hover:text-slate-300 transition-colors">
                    {item.description}
                  </p>
                  
                  {/* Arrow Icon */}
                  <div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 shrink-0 ${
                      isHovered
                        ? "bg-white border-white text-accent-purple rotate-45 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : "border-accent-purple/20 text-accent-light"
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
