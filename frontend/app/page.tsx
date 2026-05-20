"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // Consultation Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  const servicesList = [
    "CAD/CAM Machinery Applications",
    "Aluminium Anodizing Plant Rectifiers",
    "Food Processing Equipment & Chambers",
    "PLC-Based Control Panels",
    "Water Bottling Automation",
    "Injection Moulding Machines",
    "Spark Erosion Machinery",
    "UPS Systems & Industrial Power"
  ];

  const projects = [
    {
      client: "Mildura Airport, Victoria",
      task: "Generator & ATS Panel Circuit Redesign",
      desc: "Investigated and rectified a critical generator starting failure. Designed, built, and integrated a custom monitoring and control circuit directly into the Automatic Transfer Switch (ATS) panel to guarantee backup power continuity."
    },
    {
      client: "Bundaberg Airport, Queensland",
      task: "Lightning Damage Forensic Investigation",
      desc: "Conducted an extensive technical diagnostic investigation into electrical and electronic system failures caused by catastrophic lightning events. Submitted an engineering report outlining corrective and preventive shielding measures."
    },
    {
      client: "Coffs Harbour & Bundaberg Airports",
      task: "Flight Information Display Systems (FIDS)",
      desc: "Appointed as the official local technical agent for CONRAC (Germany). Provided advanced after-sales engineering support, systems maintenance, and component-level electronics servicing."
    },
    {
      client: "PGH Bricks & Pavers Pty Ltd",
      task: "Remote Gas Meter Monitoring Integration",
      desc: "Engineered, prototyped, and deployed a custom electronic monitoring circuit enabling reliable long-range remote tracking of industrial gas meters."
    }
  ];

  // Helper function to handle smooth scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500 selection:text-white">
      
      {/* 1. COMPREHENSIVE NAV BAR */}
      <nav className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <span className="w-6 h-6 bg-red-600 rounded-sm block animate-pulse"></span>
            SNAPS <span className="text-zinc-500 font-normal">ENGINEERING</span>
          </div>
          
          {/* Complete Taskbar Menu */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <button onClick={() => scrollToSection("about")} className="hover:text-white transition">About</button>
            <button onClick={() => scrollToSection("services")} className="hover:text-white transition">Services</button>
            <button onClick={() => scrollToSection("solutions")} className="hover:text-white transition">Solutions</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-white transition">Projects</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-white transition">Contact Us</button>
            <Link href="/admin" className="text-amber-500 hover:text-amber-400 transition border border-amber-500/20 px-3 py-1 rounded bg-amber-500/5">[ Admin Portal ]</Link>
          </div>

          {/* Right-Side Call and Action Trigger */}
          <div className="flex items-center gap-4">
            <a href="tel:+61426264300" className="hidden sm:flex items-center gap-2 font-mono text-sm text-zinc-200 hover:text-red-500 transition font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +61 4 2626 4300
            </a>
            <Link href="/emergency" className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              Emergency Dispatch
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 py-28 md:py-40 max-w-7xl mx-auto flex flex-col items-start justify-center border-b border-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-900/10 via-zinc-950 to-zinc-950 -z-10"></div>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-8 uppercase tracking-widest">
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          Critical Plant & Machinery Restoration
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-6 max-w-4xl">
          Industrial Breakdown Solved.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
            Downtime Engineered Out.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Specialized electrical and electronics repair, modification, and heavy upgrades for industrial installations across Australia. 
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button onClick={() => scrollToSection("contact")} className="px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-lg transition text-center">
            Request Engineering Consultation
          </button>
          <button onClick={() => scrollToSection("services")} className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 font-bold border border-zinc-800 rounded-lg transition text-center">
            Explore Capabilities
          </button>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-900 grid md:grid-cols-3 gap-12 items-start">
        <div>
          <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-2">// Operational Directives</span>
          <h2 className="text-3xl font-black tracking-tight text-white">About SNAPS Engineering</h2>
        </div>
        <div className="md:col-span-2 space-y-6 text-zinc-400 text-base leading-relaxed">
          <p>
            SNAPS Engineering undertakes expert electrical and electronic repairs on high-capacity industrial plants and automated machinery. Backed by complex electrical diagnostics and profound system knowledge, we deliver engineering upgrades that prevent repeat operational failure.
          </p>
          <p>
            Led by Director <strong>Suren Goonawardane</strong>, our mission centers around offering an elite tier of field service, failure troubleshooting, and robust electrical modification for manufacturing, airport systems, and production lines nationwide.
          </p>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-900">
        <div className="mb-12">
          <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-2">// core capabilities</span>
          <h2 className="text-3xl font-black tracking-tight text-white">Repair & Maintenance Scope</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-zinc-900/40 border border-zinc-800/60 p-6 rounded-xl hover:border-zinc-700 transition flex flex-col justify-between">
              <div className="w-7 h-7 rounded bg-red-950/50 border border-red-900/30 text-red-400 flex items-center justify-center mb-4 font-mono text-xs font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
              <p className="font-bold text-zinc-200 text-sm leading-snug">{service}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <section id="solutions" className="bg-zinc-900/20 border-b border-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-2">// System Optimization</span>
            <h2 className="text-3xl font-black tracking-tight text-white mb-6">Engineered System Upgrades & 24/7 Breakdown Defenses</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Beyond reactive fix loops, SNAPS designs modern hardware logic modifications. We reverse-engineer legacy control problems, specify bulletproof component substitutes, and restructure wiring layouts to fortify plants against recurring overhead drops.
            </p>
            <div className="space-y-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-3"><span className="text-red-500">✔</span> Component Level Diagnosis & Structural Testing</div>
              <div className="flex items-center gap-3"><span className="text-red-500">✔</span> Legacy Industrial Logic & PLC Retrofitting</div>
              <div className="flex items-center gap-3"><span className="text-red-500">✔</span> High-Voltage Rectification & Power Supply Hardening</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden">
            <span className="absolute -top-10 -right-10 text-[12rem] font-black text-zinc-800/10 pointer-events-none font-mono select-none">247</span>
            <h4 className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest mb-2">High Priority Operational Line</h4>
            <h3 className="text-2xl font-black text-white mb-4">Urgent Rapid Field Support</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              When production completely freezes, manual tracking wastes hours. Use our encrypted priority dashboard to instantly dispatch an electronics specialist straight to your coordinates.
            </p>
            <Link href="/emergency" className="inline-block w-full text-center py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition uppercase font-mono tracking-widest text-xs">
              Open Live Emergency Bridge
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SECTION (REFERENCES) */}
      <section id="projects" className="max-w-7xl mx-auto px-6 py-24 border-b border-zinc-900">
        <div className="mb-12">
          <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-2">// Engineering Case Studies</span>
          <h2 className="text-3xl font-black tracking-tight text-white">Track Record & Field References</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-500 block mb-1 uppercase tracking-wider">{proj.client}</span>
                <h3 className="text-xl font-bold text-white mb-4">{proj.task}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{proj.desc}</p>
              </div>
              <div className="border-t border-zinc-800/60 pt-4 text-xs font-mono text-zinc-500 uppercase">
                Status: Complete & Verifiable
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DUAL COLUMN CONTACT SECTION */}
      <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Contact and Location Details */}
          <div className="space-y-8">
            <div>
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest block mb-2">// Head Office Coordinates</span>
              <h2 className="text-4xl font-black tracking-tight text-white mb-4">Get In Touch With Our Team</h2>
              <p className="text-zinc-400 leading-relaxed">
                Have a planned engineering modernization project or need a long-term service contract overview? Leave Suren a transmission directly or route your map directions.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl space-y-6">
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Director of Engineering</p>
                <p className="text-lg font-medium text-white">Suren Goonawardane</p>
                <p className="text-xs text-zinc-500 font-mono">SNAPS Engineering PTY LTD</p>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Direct Mobile</p>
                <a href="tel:+61426264300" className="text-lg font-bold text-red-500 hover:text-red-400 transition">+61 4 2626 4300</a>
              </div>
              <div>
                <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Secure Mail</p>
                <a href="mailto:suren@snapsengineering.com.au" className="text-lg text-zinc-300 hover:text-white transition">suren@snapsengineering.com.au</a>
              </div>
            </div>

            {/* Simulated Live Google Maps Navigation Block */}
            <a 
              href="https://maps.google.com/?q=59+Clovelly+Circuit,+Truganina,+VIC+3029" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-6 rounded-2xl transition overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Corporate Infrastructure Depot</p>
              <p className="text-lg font-bold text-zinc-200 group-hover:text-red-500 transition">59 Clovelly Circuit</p>
              <p className="text-sm text-zinc-400">Truganina, VIC 3029</p>
              <span className="inline-block mt-4 text-xs font-mono font-bold text-red-500 group-hover:translate-x-1 transition-transform">
                ROUTE DIRECTIONS GOOGLE MAPS →
              </span>
            </a>
          </div>

          {/* Right Column: Dynamic Consultation Request */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2">Request Technical Consultation</h3>
            <p className="text-xs text-zinc-500 mb-6">Complete the routing registry to review technical drawings or scope allocations.</p>
            
            {status === "success" ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-900 rounded-xl text-emerald-400 text-sm">
                <strong className="block text-base font-bold mb-1">Consultation Request Logged</strong> 
                Transmission verified. Suren will review your project requirements and make contact inside standard trading margins.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Full Identification Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Secure Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Direct Tel Line</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+61 400 000 000"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Project Site Location</label>
                  <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter industrial site facility address..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-red-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-500 mb-2 uppercase tracking-wider">Engineering Scope / Problem Profile</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Describe your industrial machinery profile, engineering failure logs, or timeline deadlines..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-red-500 outline-none transition resize-none" />
                </div>
                <button type="submit" disabled={status === "submitting"}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-black py-4 rounded-lg transition text-xs uppercase tracking-widest disabled:opacity-50 font-mono">
                  {status === "submitting" ? "TRANSMITTING..." : "LOG REGISTRY APPLICATION"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 bg-zinc-950 text-center text-xs font-mono text-zinc-600">
        &copy; {new Date().getFullYear()} SNAPS Engineering PTY LTD. All Rights Reserved. ABN 73 009 403 356.
      </footer>
      
    </main>
  );
}