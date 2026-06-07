import React from "react";
import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Expertise from "@/components/Expertise";
import Works from "@/components/Works";
import Achievements from "@/components/Achievements";
import ExperienceEducation from "@/components/ExperienceEducation";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-accent-purple selection:text-white">
      {/* Dynamic Background Layout with PCB Traces and glows */}
      <GlowBackground />

      {/* Main Layout wrapper */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Expertise />
          <Works />
          <Achievements />
          <ExperienceEducation />
          <Skills />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  );
}
