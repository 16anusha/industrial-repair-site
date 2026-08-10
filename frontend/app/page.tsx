"use client";
import { useState } from "react";

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false); // Controls open/closed state
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
      {/* 1. The Open Chat Window (Only visible when isOpen is true) */}
      {isOpen && (
        <div className="w-96 h-[500px] border border-slate-700 shadow-2xl rounded-xl flex flex-col bg-slate-900 text-white mb-4 animate-in fade-in slide-in-from-bottom-4">
          {/* Header with Close Button */}
          <div className="p-3 bg-slate-800 rounded-t-xl flex justify-between items-center border-b border-slate-700">
            <span className="font-bold text-sm">SNAPS AI Assistant</span>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white font-bold px-2"
            >
              ✕
            </button>
          </div>

          {/* Message History */}
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

          {/* Input Box */}
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

      {/* 2. The Floating "Ask Me Anything" Trigger Button */}
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
    <main className="min-h-screen bg-black relative text-white p-8">
      <h1 className="text-4xl font-bold">SNAPS Engineering Portal</h1>
      <p className="text-slate-400 mt-2">Welcome to our industrial repair and asset management platform.</p>
      
      {/* Floating collapsible chat widget */}
      <ChatbotWidget />
    </main>
  );
}