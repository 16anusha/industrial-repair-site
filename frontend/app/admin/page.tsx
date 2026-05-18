"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
  // --- STATE MANAGEMENT ---
  const [token, setToken] = useState<string | null>(null);
  const [tickets, setTickets] = useState([]);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- 1. CHECK FOR SAVED WRISTBAND ON LOAD ---
  useEffect(() => {
    const savedToken = localStorage.getItem("snaps_admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchTickets(savedToken);
    }
  }, []);

  // --- 2. HANDLE LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save the wristband to the browser's memory
        localStorage.setItem("snaps_admin_token", data.access_token);
        setToken(data.access_token);
        // Fetch the data immediately
        fetchTickets(data.access_token);
      } else {
        setLoginError("Invalid credentials. Access denied.");
      }
    } catch (error) {
      setLoginError("Cannot connect to authorization server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- 3. FETCH SECURE DATA ---
  const fetchTickets = async (activeToken: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/admin/tickets`, {
        headers: {
          // Present the wristband to Python!
          "Authorization": `Bearer ${activeToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        // If the token expired or is fake, kick them out
        handleLogout();
      }
    } catch (error) {
      console.error("Failed to fetch tickets");
    }
  };

  // --- 4. HANDLE LOGOUT ---
  const handleLogout = () => {
    localStorage.removeItem("snaps_admin_token");
    setToken(null);
    setTickets([]);
  };

  // ==========================================
  // VIEW 1: THE LOGIN SCREEN (If no token)
  // ==========================================
  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-white selection:bg-amber-500 selection:text-black">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-amber-500 font-bold tracking-widest text-xs uppercase mb-2 block">Restricted Area</span>
            <h1 className="text-2xl font-black tracking-tight">Admin Login</h1>
          </div>

          {loginError && (
            <div className="mb-6 p-3 bg-red-950/50 border border-red-900 text-red-400 text-sm rounded-lg text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition" />
            </div>
            <button type="submit" disabled={isLoggingIn}
              className="w-full bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold py-3 rounded-lg transition disabled:opacity-50 mt-4">
              {isLoggingIn ? "AUTHENTICATING..." : "SECURE LOGIN"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: THE DASHBOARD (If token is valid)
  // ==========================================
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Operations Command</h1>
            <p className="text-zinc-400 font-mono text-sm mt-2">Authorized Access: Suren Goonawardane</p>
          </div>
          <div className="text-right flex flex-col items-end gap-3">
            <span className="inline-block px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-full border border-emerald-900">
              System Online
            </span>
            <button onClick={handleLogout} className="text-xs font-mono text-zinc-500 hover:text-red-400 transition">
              [ LOGOUT ]
            </button>
          </div>
        </header>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-500">■</span> Live Emergency Dispatch Logs
        </h2>

        {/* The Database Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-900 border-b border-zinc-800 font-mono text-zinc-400">
              <tr>
                <th className="p-4 font-medium uppercase tracking-wider">ID</th>
                <th className="p-4 font-medium uppercase tracking-wider">Company</th>
                <th className="p-4 font-medium uppercase tracking-wider">System Type</th>
                <th className="p-4 font-medium uppercase tracking-wider">Severity</th>
                <th className="p-4 font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">No active emergency tickets in the database.</td>
                </tr>
              ) : (
                tickets.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-zinc-800/30 transition">
                    <td className="p-4 font-mono text-zinc-500">#{ticket.id}</td>
                    <td className="p-4 font-bold">{ticket.company_name}</td>
                    <td className="p-4 text-zinc-300">{ticket.system_type}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        ticket.severity === 'CRITICAL' ? 'bg-red-950 text-red-400' : 
                        ticket.severity === 'Medium' ? 'bg-amber-950 text-amber-400' : 
                        'bg-zinc-800 text-zinc-300'
                      }`}>
                        {ticket.severity}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-zinc-800 rounded text-xs font-mono text-zinc-400">
                        {ticket.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}