"use client";
import { useState } from "react";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://industrial-repair-api-v2.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_message: input }),
      });
      
      const data = await res.json();
      setMessages([...newMessages, { role: "ai", text: data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "ai", text: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. The Open Chat Window */}
      {isOpen && (
        <div className="w-96 h-[500px] border border-slate-700 shadow-2xl rounded-xl flex flex-col bg-slate-900 text-white mb-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-3 bg-slate-800 rounded-t-xl flex justify-between items-center border-b border-slate-700">
            <span className="font-bold text-sm">SNAPS AI Assistant</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white font-bold px-2"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-slate-400 text-sm text-center mt-10">
                Hello! Ask me anything about industrial repairs or equipment.
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg w-3/4 ${msg.role === 'user' ? 'bg-blue-600 ml-auto' : 'bg-slate-700'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="text-slate-400 text-sm">Searching SNAPS database...</div>}
          </div>

          <form onSubmit={sendMessage} className="p-2 flex gap-2 border-t border-slate-700">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-800 rounded p-2 text-white outline-none text-sm"
              placeholder="Ask a technical question..."
            />
            <button type="submit" className="bg-blue-500 px-4 rounded font-bold text-sm">Send</button>
          </form>
        </div>
      )}

      {/* 2. The Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-full shadow-2xl font-medium flex items-center gap-2 transition-transform hover:scale-105"
      >
        <span>💬</span> Ask me anything
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white relative flex flex-col">
      
      {/* Top Navigation Bar */}
      <nav className="w-full border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 p-4 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-xl">S</div>
          <span className="font-bold text-xl tracking-wide">SNAPS</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-blue-400 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Assets</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Repair Logs</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-8 py-16 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
          Engineering Portal
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-12">
          Centralized industrial repair management, asset tracking, and AI-powered technical manual retrieval.
        </p>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-blue-500/50 transition-all group">
            <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-400 text-2xl group-hover:scale-110 transition-transform">
              ⚙️
            </div>
            <h2 className="text-xl font-semibold mb-2">Repair Dispatch</h2>
            <p className="text-slate-400 text-sm mb-4">View logs of the latest industrial maintenance tickets and real-time resolutions.</p>
            <button className="text-blue-400 text-sm font-semibold hover:text-blue-300 flex items-center gap-1">
              View Tickets <span>→</span>
            </button>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mb-4 text-emerald-400 text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <h2 className="text-xl font-semibold mb-2">Asset Telemetry</h2>
            <p className="text-slate-400 text-sm mb-4">Track equipment status, Azure IoT telemetry, and predictive maintenance schedules.</p>
            <button className="text-emerald-400 text-sm font-semibold hover:text-emerald-300 flex items-center gap-1">
              Monitor Assets <span>→</span>
            </button>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 text-purple-400 text-2xl group-hover:scale-110 transition-transform">
              📚
            </div>
            <h2 className="text-xl font-semibold mb-2">SharePoint Manuals</h2>
            <p className="text-slate-400 text-sm mb-4">Access the official integrated repository for complex equipment documentation.</p>
            <button className="text-purple-400 text-sm font-semibold hover:text-purple-300 flex items-center gap-1">
              Browse Docs <span>→</span>
            </button>
          </div>

        </div>
      </div>

      {/* Floating Chat Widget */}
      <ChatbotWidget />
      
    </main>
  );
}