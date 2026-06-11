"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    option: "embedded",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/vishalprabhu58@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: `${form.firstName} ${form.lastName}`,
          Email: form.email,
          Phone: form.phone,
          Interest: form.option === "embedded" ? "Embedded Systems / Firmware" 
                    : form.option === "hardware" ? "Analog / Digital Circuit Design"
                    : form.option === "vlsi" ? "VLSI / Verilog Processor Design"
                    : "Other Collaboration",
          Message: form.message,
          _subject: `New Portfolio Contact Form Submission from ${form.firstName} ${form.lastName}`,
          _template: "box"
        })
      });

      const data = await response.json();

      if (response.ok && data.success === "true") {
        setStatus("success");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          option: "embedded",
          message: "",
        });
        setTimeout(() => {
          setStatus("idle");
        }, 6000);
      } else {
        throw new Error(data.message || "Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error("Form submit error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setTimeout(() => {
        setStatus("idle");
      }, 6000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent">
      {/* Glow background sphere */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-accent-purple/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-10 bg-[#0e071e]/30 border border-accent-purple/15">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              Let's work together!
            </h3>
            <p className="text-slate-400 text-sm md:text-base font-light mb-8">
              I am open to internships, core hardware research opportunities, and firmware prototyping collaborations.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    placeholder="Enter First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="option" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                  Select Interest
                </label>
                <select
                  id="option"
                  value={form.option}
                  onChange={(e) => setForm({ ...form, option: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all"
                >
                  <option value="embedded">Embedded Systems / Firmware</option>
                  <option value="hardware">Analog / Digital Circuit Design</option>
                  <option value="vlsi">VLSI / Verilog Processor Design</option>
                  <option value="other">Other Collaboration</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-text-purple/80 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#080315] border border-accent-purple/15 text-white placeholder-slate-600 focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all resize-none"
                  placeholder="How can we collaborate?"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`glow-btn flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all hover:scale-[1.02] cursor-pointer ${
                    status === "success"
                      ? "bg-[#10b981] hover:bg-[#059669] text-white shadow-emerald-500/20"
                      : status === "error"
                      ? "bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-red-500/20"
                      : "bg-accent-purple hover:bg-accent-purple/90 text-white shadow-accent-purple/20"
                  }`}
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : status === "success" ? (
                    <>Message Sent Successfully!</>
                  ) : status === "error" ? (
                    <>Error! Try Again</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-[#10b981] text-xs font-semibold mt-2 animate-fade-in leading-relaxed">
                    ✓ Message sent! (Note: Check your email inbox at <a href="mailto:vishalprabhu58@gmail.com" className="underline font-bold">vishalprabhu58@gmail.com</a> for FormSubmit's activation/confirmation link on this first test submission).
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[#ef4444] text-xs font-semibold mt-2 animate-fade-in">
                    ✗ {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Info coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pl-0 lg:pl-8">
            <div className="space-y-6">
              
              {/* Phone info card */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-light group-hover:bg-accent-purple group-hover:text-white transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    Call / WhatsApp
                  </h4>
                  <a href="tel:+918618058289" className="text-base font-bold text-white hover:text-accent-light transition-colors">
                    +91 8618058289
                  </a>
                </div>
              </div>

              {/* Email info card */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-light group-hover:bg-accent-purple group-hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    Email Address
                  </h4>
                  <a href="mailto:vishalprabhu58@gmail.com" className="text-base font-bold text-white hover:text-accent-light transition-colors">
                    vishalprabhu58@gmail.com
                  </a>
                </div>
              </div>

              {/* Location info card */}
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center text-accent-light group-hover:bg-accent-purple group-hover:text-white transition-all duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                    Location
                  </h4>
                  <p className="text-base font-bold text-white">
                    Mangaluru, Karnataka, India
                  </p>
                </div>
              </div>

            </div>

            {/* Quote details */}
            <div className="p-6 rounded-2xl border border-accent-purple/10 bg-[#0c061a]/30 backdrop-blur-sm relative">
              <MessageSquare className="w-8 h-8 text-accent-purple/20 absolute -top-4 -left-4" />
              <p className="text-slate-400 text-xs md:text-sm italic leading-relaxed font-light">
                "Hardware engineering isn't just about combining resistors and chips. It's about designing elegant pathways for signals to flow and control the physical world."
              </p>
              <span className="block text-right text-[10px] uppercase font-bold text-accent-light mt-3 tracking-widest">
                — G. Vishal V Prabhu
              </span>
            </div>
          </div>

        </div>
        
        {/* Footer Credit line */}
        <div className="mt-24 pt-8 border-t border-accent-purple/10 flex items-center justify-center text-slate-500 text-xs font-semibold text-center">
          <span className="tracking-wide">&copy; {new Date().getFullYear()} G. Vishal V Prabhu. All Rights Reserved.</span>
        </div>
      </div>
    </section>
  );
}
