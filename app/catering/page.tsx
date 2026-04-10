export default function CateringPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <img src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.6)] via-[rgba(255,248,240,0.15)_30%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl lg:text-8xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s Catering
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-2 tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Let Us Feed Your People
          </p>
        </div>
      </section>
    </div>
  );
}
