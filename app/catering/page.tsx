export default function CateringPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end justify-center overflow-hidden pb-6">
        <img src="/slideshow-snickerdoodles.jpg" alt="Fresh-baked snickerdoodle cookies" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.95)] via-[rgba(255,248,240,0.6)_45%] to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl lg:text-9xl text-reba-pink mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]">
            Sweet Reba&apos;s Catering
          </h1>
          <p className="text-3xl sm:text-5xl font-bold text-reba-pink mb-2 tracking-wide drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            Feeding a Crowd?
          </p>
        </div>
      </section>

      {/* Coming Soon + Call Us */}
      <section style={{ backgroundColor: "#fff5f5" }}>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-6xl sm:text-8xl text-reba-pink mb-10">
            Coming Soon
          </h2>

          <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-md mx-auto">
            <div className="text-5xl mb-4">{"\u{1F4DE}"}</div>
            <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-3">
              Call Us
            </h3>
            <p className="text-reba-muted text-base sm:text-lg mb-8">
              Interested in catering for your next event? Give us a call and we&apos;ll put something special together for you.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-reba-muted text-sm mb-1">Old Town Salinas</p>
                <a href="tel:8316760628" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 676-0628
                </a>
              </div>
              <div>
                <p className="text-reba-muted text-sm mb-1">Carmel Crossroads</p>
                <a href="tel:8316014818" className="text-reba-pink font-bold text-2xl hover:text-reba-pink-hover transition-colors">
                  (831) 601-4818
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
