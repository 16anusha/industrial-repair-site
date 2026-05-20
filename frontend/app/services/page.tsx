import Link from "next/link";

export default function ServicesPage() {
  const servicesList = [
    "CAD/CAM machinery used in industrial applications",
    "Rectifiers used in aluminium anodizing plants",
    "Food processing equipment (e.g. cooking chambers)",
    "PLC-based control panels",
    "Water bottling plants",
    "Injection moulding machines",
    "Spark erosion machines",
    "UPS systems",
    "Industrial rectifiers",
    "Power supplies"
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500 selection:text-white pb-20">
      
      {/* Mini Navbar */}
      <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter flex items-center gap-2">
            <span className="w-6 h-6 bg-red-600 rounded-sm block"></span>
            SNAPS <span className="text-zinc-500 font-normal">ENGINEERING</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-zinc-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/services" className="text-white font-bold transition">Services</Link>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-zinc-800 bg-zinc-900/30 pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Repair Services</h1>
          <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
            We undertake repairs on electrical and electronic-based plants and machinery. With extensive industry knowledge and hands-on experience, we provide reliable repair, upgrade, and modification services for a wide range of industrial systems and equipment.
          </p>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-red-500">■</span> Our Expertise Includes
          </h2>
          <Link href="/emergency" className="hidden sm:inline-flex px-6 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-600/30 rounded-lg text-sm font-bold transition">
            Log Emergency Breakdown
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((service, index) => (
            <div key={index} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-zinc-600 hover:bg-zinc-900 transition flex flex-col justify-center min-h-[120px]">
              <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center mb-4 text-zinc-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              </div>
              <p className="font-medium text-zinc-200 leading-snug">{service}</p>
            </div>
          ))}
        </div>
      </section>
      
    </main>
  );
}