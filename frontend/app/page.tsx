"use client";
import { useState } from "react";

function Chatbot() {
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
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] border border-slate-700 shadow-2xl rounded-xl flex flex-col bg-slate-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
          className="flex-1 bg-slate-800 rounded p-2 text-white outline-none"
          placeholder="Ask a technical question..."
        />
        <button type="submit" className="bg-blue-500 px-4 rounded font-bold">Send</button>
      </form>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">SNAPS Engineering Portal</h1>
      <Chatbot />
    </main>
  );
}