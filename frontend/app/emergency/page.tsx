"use client";

import { useState } from "react";

export default function EmergencyDispatch() {
  // 1. Setup the memory (state) for our form fields
  const [formData, setFormData] = useState({
    company_name: "",
    facility_location: "",
    system_type: "",
    severity: "Medium", // Default value
    description: "",
  });

  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  // 2. Handle typing in the inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle the Submit Button
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Send the POST request across the bridge to Python
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/emergency`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        // Clear the form
        setFormData({
          company_name: "", facility_location: "", system_type: "", severity: "Medium", description: ""
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 selection:bg-red-500 selection:text-white">
      <div className="max-w-2xl w-full bg-zinc-900/50 border border-red-900/50 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur">
        
        {/* Header */}
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-3 w-3 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-sm font-bold uppercase tracking-widest text-red-500">Critical Priority</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">24/7 Emergency Dispatch</h2>
          <p className="text-zinc-400 mt-2">Log a critical system failure. Our engineering team will be notified instantly.</p>
        </div>

        {/* Success Message */}
        {status === "success" && (
          <div className="mb-8 p-4 bg-emerald-950/50 border border-emerald-900 rounded-xl text-emerald-400">
            <strong>Ticket Submitted Successfully.</strong> An engineer is reviewing your system logs and will contact you shortly.
          </div>
        )}

        {/* Error Message */}
        {status === "error" && (
          <div className="mb-8 p-4 bg-red-950/50 border border-red-900 rounded-xl text-red-400">
            <strong>Connection Error.</strong> Unable to reach the dispatch server. Please call +61 4 2626 4300 immediately.
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Company Name</label>
              <input required type="text" name="company_name" value={formData.company_name} onChange={handleChange} 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Facility Location</label>
              <input required type="text" name="facility_location" value={formData.facility_location} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">System Type</label>
              <select required name="system_type" value={formData.system_type} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition appearance-none">
                <option value="" disabled>Select System...</option>
                <option value="PLC Automation">PLC Automation</option>
                <option value="Industrial Rectifier">Industrial Rectifier</option>
                <option value="CAD/CAM Machinery">CAD/CAM Machinery</option>
                <option value="Power Supply/UPS">Power Supply / UPS</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Severity Level</label>
              <select name="severity" value={formData.severity} onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition appearance-none">
                <option value="Low">Low - Maintenance Required</option>
                <option value="Medium">Medium - Partial Outage</option>
                <option value="CRITICAL">CRITICAL - FULL SYSTEM DOWN</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Fault Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={4}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition resize-none placeholder-zinc-700" 
              placeholder="Describe the breakdown, error codes, or physical damage..." />
          </div>

          <button type="submit" disabled={status === "submitting"}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-lg transition shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] disabled:opacity-50">
            {status === "submitting" ? "TRANSMITTING..." : "DISPATCH ENGINEER"}
          </button>
        </form>

      </div>
    </main>
  );
}