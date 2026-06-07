"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function ExperienceEducation() {
  const experiences = [
    {
      role: "Intern – AI & Embedded Systems",
      company: "iTelematics Software Private Limited",
      location: "Mangaluru, Karnataka",
      period: "Apr 2025 – Dec 2025",
      points: [
        "Interfaced a Battery Management System (BMS) with an MCU to capture real-time Temperature, Voltage, and Current from hardware sensors.",
        "Integrated thermal and voltage sensors to monitor internal temperature and battery State of Charge (SoC) in an automotive-grade control circuit.",
        "Engineered a robust data pipeline transmitting BMS data to a centralized database, and built a two-phase AI-powered EV battery fire prevention system."
      ],
    },
    {
      role: "Intern – VLSI Domain",
      company: "InternPE",
      location: "Online",
      period: "May 2025 – Jun 2025",
      points: [
        "Designed digital logic circuits using CMOS design principles.",
        "Performed IC integration and used LTspice for circuit simulation, testing, and waveform analysis.",
        "Completed end-to-end IC design flow tasks."
      ],
    },
  ];

  const educations = [
    {
      degree: "BE – Electronics & Communication Engineering",
      institution: "Canara Engineering College",
      university: "Visvesvaraya Technological University (VTU)",
      location: "Bantwal, Karnataka",
      period: "Aug 2023 – Aug 2027 (Expected)",
      details: "CGPA: 8.0 / 10.0",
      points: [
        "Core focus on Analog & Digital Circuits, Microcontrollers (ESP32/Arduino), VLSI & RTL design (Verilog), PCB layout, and semiconductor theory.",
        "Hands-on lab work in troubleshooting and schematic design using LTspice and NI Multisim."
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#070314]/30">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: Experience */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-purple/20 border border-accent-purple/35 flex items-center justify-center text-accent-light shadow-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                My Experience
              </h2>
            </div>

            <div className="relative border-l-2 border-accent-purple/20 pl-6 ml-6 space-y-10">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative space-y-4"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-accent-purple border-4 border-[#05020c] shadow-[0_0_8px_rgba(124,58,237,0.8)]" />

                  {/* Header details */}
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-purple/80">
                      <span className="font-semibold text-slate-300">{exp.company}</span>
                      <span className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2.5 pl-4 list-disc text-slate-400 text-sm font-light leading-relaxed">
                    {exp.points.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent-indigo/20 border border-accent-indigo/35 flex items-center justify-center text-indigo-400 shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                My Education
              </h2>
            </div>

            <div className="relative border-l-2 border-accent-indigo/20 pl-6 ml-6 space-y-10">
              {educations.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative space-y-4"
                >
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[33px] top-1.5 w-4.5 h-4.5 rounded-full bg-accent-indigo border-4 border-[#05020c] shadow-[0_0_8px_rgba(79,70,229,0.8)]" />

                  {/* Header details */}
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-accent-indigo/10 border border-accent-indigo/20 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white mt-2">
                      {edu.degree}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-purple/80">
                      <span className="font-semibold text-slate-300">{edu.institution}</span>
                      <span className="flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Grade Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/25">
                    <Award className="w-3.5 h-3.5" />
                    {edu.details}
                  </div>

                  {/* Points */}
                  <ul className="space-y-2.5 pl-4 list-disc text-slate-400 text-sm font-light leading-relaxed">
                    {edu.points.map((p, pIdx) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
