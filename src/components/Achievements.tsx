"use client";

import React from "react";
import { Award, Trophy, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "1st Prize Winner",
      sub: "Hardware Project Expo 2025",
      project: "Advanced Power Supply with Inverter",
      description:
        "Awarded first place among dozens of innovative hardware proposals. The project was commended for its high utility in power-outage situations, integrating dual buck-boost conversions with a 50W inverter output and built-in mobile battery protections.",
      date: "2025",
      type: "hardware",
    },
    {
      id: 2,
      title: "1st Prize Winner",
      sub: "Akshay Urja Diwas 2025",
      project: "Solar-Powered IoT Retractable Roof",
      description:
        "Recognized with the top honor for promoting renewable energy integration. The smart roof combines solar charging storage with real-time rain sensing and automation, highlighting practical applications of microcontrollers in sustainable tech.",
      date: "2025",
      type: "iot",
    },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-transparent">
      {/* Background glow specific to achievements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-pink/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-accent-light bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 rounded-full uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Recognition
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Honors & Achievements
          </h2>
          <p className="text-slate-400 mt-4 text-sm md:text-base">
            Recognized excellence in hardware execution and smart energy innovations.
          </p>
        </div>

        {/* Achievements Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-panel relative rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-[#0e071e]/30 border border-accent-purple/15 group hover:border-accent-pink/40"
            >
              {/* Highlight Background Glow */}
              <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-accent-purple/10 blur-[50px] group-hover:bg-accent-pink/15 transition-all duration-500 pointer-events-none" />

              <div className="space-y-6">
                {/* Header row (Icon, Badge & Year) */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/25 to-yellow-600/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_4px_15px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-all duration-300">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-extrabold">
                        {item.sub}
                      </h4>
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-xs text-text-purple/80 bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-1 rounded-md font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <div className="inline-block px-3 py-1 rounded-md bg-accent-purple/15 border border-accent-purple/35">
                    <span className="text-xs text-accent-light font-bold">
                      Project: {item.project}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Design */}
              <div className="mt-8 pt-4 border-t border-accent-purple/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-accent-purple" />
                  Hardware Innovation
                </span>
                <span className="text-xs font-semibold text-accent-light group-hover:translate-x-1 transition-transform">
                  Winner Certificate &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
