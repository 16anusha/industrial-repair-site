export default async function Home() {
  // 1. THIS IS THE BRIDGE: We reach out to your Python backend
  const response = await fetch("http://127.0.0.1:8000/", {
    cache: "no-store" // This tells Next.js to always get fresh data
  });
  
  // 2. We translate the JSON package we received from Python
  const data = await response.json();

  // 3. We display the website UI using Tailwind CSS
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-24 text-white">
      <div className="z-10 max-w-3xl w-full flex flex-col items-center text-center font-mono">
        
        <h1 className="text-4xl font-bold mb-8 tracking-tighter">
          Industrial Repair <span className="text-orange-500">Copilot</span>
        </h1>
        
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
          <p className="text-zinc-400 mb-2 text-sm uppercase tracking-widest">
            System Status
          </p>
          {/* Here is where we inject the secret message from Python! */}
          <p className="text-2xl text-emerald-400 font-semibold">
            {data.message}
          </p>
        </div>

      </div>
    </main>
  );
}