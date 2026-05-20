"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate a network request for the mockup
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500 selection:text-white pb-20">
      
      {/* Mini Navbar (Matches Home Page) */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter flex items-center gap-2">
            <span className="w-6 h-6 bg-red-600 rounded-sm block"></span>
            SNAPS <span className="text-zinc-500 font-normal">ENGINEERING</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-zinc-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/services" className="hover:text-white transition">Services</Link>
            <Link href="/contact" className="text-white font-bold transition">Contact</Link>
            <a href="tel:+61426264300" className="px-4 py-2 bg-red-600/10 text-red-500 border border-red-600/30 rounded-full hover:bg-red-600 hover:text-white transition">
              +61 4 2626 4300
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Contact Our Team</h1>
          <p className="text-zinc-400 text-lg max-w-2xl">Require immediate emergency dispatch or want to discuss a planned upgrade? Reach out to our engineering directors directly.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Details */}
          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-red-500">■</span> Direct Lines
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Director</p>
                  <p className="text-lg font-medium text-white">Suren Goonawardane</p>
                </div>
                
                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Mobile (24/7 Response)</p>
                  <a href="tel:+61426264300" className="text-lg font-medium text-red-400 hover:text-red-300 transition">+61 4 2626 4300</a>
                </div>

                <div>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Email</p>
                  <a href="mailto:suren@snapsengineering.com.au" className="text-lg font-medium text-zinc-300 hover:text-white transition">suren@snapsengineering.com.au</a>
                </div>
              </div>
            </div>

            {/* Google Maps Shortcut */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=59+Clovelly+Circuit,+Truganina+VIC+3029" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-zinc-900 border border-zinc-800 hover:border-zinc-600 p-6 rounded-2xl transition overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">Headquarters</p>
              <p className="text-lg font-medium text-zinc-200">59 Clovelly Circuit</p>
              <p className="text-zinc-400 mb-4">Truganina, VIC 3029</p>
              <p className="text-sm font-bold text-red-500 group-hover:text-red-400 flex items-center gap-2">
                Get Directions →
              </p>
            </a>
          </div>

          {/* Right Side: Consultation Form */}
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Request a Consultation</h3>
            
            {status === "success" ? (
              <div className="p-4 bg-emerald-950/50 border border-emerald-900 rounded-xl text-emerald-400">
                <strong>Request Sent.</strong> Suren will contact you shortly to discuss your project.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Project Location (Address)</label>
                  <input required type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Start typing address..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none transition" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">How can we help?</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={3}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 outline-none transition resize-none" />
                </div>
                <button type="submit" disabled={status === "submitting"}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 rounded-lg transition mt-2">
                  {status === "submitting" ? "SENDING..." : "SUBMIT REQUEST"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}