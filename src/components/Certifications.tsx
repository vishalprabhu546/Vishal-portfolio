"use client";

import React from "react";
import { Award, Compass, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Certifications() {
  const certifications = [
    {
      title: "VLSI for Beginners",
      org: "NIELIT Calicut",
      description: "Comprehensive introduction to semiconductor physics, logic synthesis, layout design, and microelectronics design flow.",
    },
    {
      title: "IoT & Electronics",
      org: "Infosys Springboard",
      description: "Foundational training in electronic circuits, sensor telemetry, wireless networks, and embedded IoT architectures.",
    },
    {
      title: "Smart IoT Innovation",
      org: "Kakunje Software",
      description: "Hands-on project work interfacing ESP32 microcontrollers, building local networks, and integrating actuators.",
    },
    {
      title: "C Programming",
      org: "IIT Bombay, Spoken Tutorial",
      description: "Rigorous assessment in structural programming, pointers, low-level memory allocation, and firmware scripting.",
    },
    {
      title: "Introduction to C++",
      org: "Learntube",
      description: "Object-oriented program structure, data abstraction, structures, and low-level firmware syntax optimizations.",
    },
    {
      title: "Antenna Fabrication & Satellite Tracking",
      org: "NMAMIT Workshop",
      description: "Practical workshop engineering RF antennas, signal reception, satellite pass calculations, and spectrum telemetry.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#070314]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase inline-block mb-4">
            Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Certifications & Training
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            Professional qualifications and specialized technical workshops completed in core domains.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-2xl bg-[#0f0722]/40 border border-accent-purple/15 flex flex-col justify-between group hover:border-accent-purple/35"
            >
              <div className="space-y-4">
                {/* Header: Organization and Medal */}
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold text-accent-light px-2.5 py-1 rounded-md bg-accent-purple/10 border border-accent-purple/25">
                    {cert.org}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-accent-purple/15 border border-accent-purple/20 flex items-center justify-center text-accent-light group-hover:scale-105 transition-transform">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-accent-light transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
                  {cert.description}
                </p>
              </div>

              {/* Footer info */}
              <div className="mt-6 pt-3 border-t border-accent-purple/5 flex justify-between items-center text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Verified
                </span>
                <span className="flex items-center gap-0.5 text-accent-light group-hover:text-white transition-colors cursor-pointer">
                  Credential <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
