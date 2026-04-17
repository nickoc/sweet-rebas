export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <img src="/slideshow-lemons.jpg" alt="Fresh lemons in Sweet Reba's kitchen" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.3)] to-transparent" />
        <div className="relative min-h-[60vh]" />
      </section>
      <section className="py-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-7xl sm:text-9xl lg:text-[10rem] text-reba-pink mb-4">
          Our Story
        </h1>
        <p className="text-3xl sm:text-4xl font-bold text-reba-pink mb-2 tracking-wide">
          A journey of love, family, and the perfect cake.
        </p>
      </section>

      {/* The Journey */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-12">
          {/* Grandmother's Kitchen */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <img src="/about-soup.jpg" alt="Homemade soup at Sweet Reba's" className="w-full h-64 md:h-80 object-cover rounded-xl" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                  Where It All Began
                </h2>
                <p className="text-reba-soft leading-relaxed mb-4">
                  Every great bakery has an origin story, and ours starts in a
                  grandmother&apos;s kitchen. Reba grew up watching her grandmother
                  transform simple ingredients into extraordinary creations &mdash;
                  cakes that made people smile, cookies that brought comfort, and
                  pies that turned ordinary days into celebrations.
                </p>
                <p className="text-reba-muted leading-relaxed">
                  Those recipes, passed down through generations, became the
                  foundation for everything Sweet Reba&apos;s would become.
                </p>
              </div>
            </div>
          </div>

          {/* The Birthday Cake */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                  The Birthday Cake That Changed Everything
                </h2>
                <p className="text-reba-soft leading-relaxed mb-4">
                  In 2004, Reba made a birthday cake for her son&apos;s 7th
                  birthday. It was more than a cake &mdash; it was a work of art.
                  The other parents at the party couldn&apos;t stop talking about it.
                  Orders started coming in. Word spread through the neighborhood.
                </p>
                <p className="text-reba-muted leading-relaxed">
                  What began as a mother&apos;s gift to her child became a calling.
                  Sweet Reba&apos;s was born.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src="/about-birthday-cake.jpg" alt="Beach-themed birthday cake by Sweet Reba's" className="w-full h-64 md:h-80 object-cover rounded-xl" />
              </div>
            </div>
          </div>

          {/* Local Legend */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                  Becoming a Local Legend
                </h2>
                <p className="text-reba-soft leading-relaxed mb-4">
                  Reba&apos;s cakes became legendary at Nepenthe&apos;s famous Sign
                  Parties along the Big Sur coast. Her creations were the talk of
                  every gathering &mdash; intricate designs, incredible flavors, and
                  that unmistakable warmth that only comes from baking with genuine
                  love.
                </p>
                <p className="text-reba-muted leading-relaxed">
                  The reputation grew from Carmel to Monterey to the entire
                  peninsula. Sweet Reba&apos;s wasn&apos;t just a bakery anymore
                  &mdash; it was an institution.
                </p>
              </div>
              <div className="bg-reba-warm border-2 border-dashed border-reba-border rounded-xl h-64 md:h-80 flex items-center justify-center">
                <div className="text-center text-reba-muted">
                  <div className="text-5xl mb-3">{"\u{1F30A}"}</div>
                  <p className="text-sm">Photo coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Network */}
          <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-reba-warm border-2 border-dashed border-reba-border rounded-xl h-64 md:h-80 flex items-center justify-center">
                <div className="text-center text-reba-muted">
                  <div className="text-5xl mb-3">{"\u{1F4FA}"}</div>
                  <p className="text-sm">Photo coming soon</p>
                </div>
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                  Food Network Cake Wars
                </h2>
                <p className="text-reba-soft leading-relaxed mb-4">
                  Then came the call from Food Network. Reba competed on Cake Wars,
                  where her artistry earned recognition from the legendary Ron Ben
                  Israel himself. It was validation of what her community already
                  knew &mdash; Reba&apos;s cakes are extraordinary.
                </p>
                <p className="text-reba-muted leading-relaxed">
                  But for Reba, the greatest recognition still comes from the smile
                  on a child&apos;s face when they see their birthday cake for the
                  first time.
                </p>
              </div>
            </div>
          </div>

          {/* Expansion */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-xl overflow-hidden">
                <img src="/about-team.png" alt="The Sweet Reba's team" className="w-full h-64 md:h-80 object-cover rounded-xl" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                  Two Locations, One Team
                </h2>
                <p className="text-reba-soft leading-relaxed">
                  The bakery found its first permanent home at Carmel Crossroads,
                  becoming a beloved stop for locals and visitors alike. Then came
                  Old Town Salinas, bringing Sweet Reba&apos;s magic to a whole new
                  community. Two locations, same recipes, same love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reba & Michael Section */}
      <section className="bg-reba-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
            The Heart Behind the Bakery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Reba */}
            <div className="bg-white border border-reba-border rounded-2xl p-8 text-center">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-reba-pink">
                <img src="/reba.png" alt="Reba" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                Reba
              </h3>
              <p className="text-reba-pink font-medium text-base mb-4">
                Baker, Cake Artist &amp; Dreamer
              </p>
              <p className="text-reba-soft text-base leading-relaxed">
                From her grandmother&apos;s kitchen to Food Network&apos;s Cake Wars,
                Reba has turned a passion for baking into something extraordinary.
                Every cake, cookie, and pie is made with the same love she put into
                that very first birthday cake in 2004.
              </p>
            </div>
            {/* Michael */}
            <div className="bg-white border border-reba-border rounded-2xl p-8 text-center">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-reba-pink">
                <img src="/michael.png" alt="Michael" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                Michael Abbruzzese
              </h3>
              <p className="text-reba-pink font-medium text-base mb-4">
                Partner, Chef &amp; Rock
              </p>
              <p className="text-reba-soft text-base leading-relaxed">
                Food has always been at the heart of who I am. Growing up surrounded by parents and grandparents with a deep passion for cooking, and with a brother who went on to become a professional chef, a love of great food was simply part of the family DNA. That foundation led me to a business degree and years spent in the restaurant world &mdash; experiences that shaped both my high standards for quality and my understanding of what it takes to run a great operation. At Sweet Reba&apos;s, I get to bring all of that together. Baking alongside Reba is a joy, and being part of a bakery that genuinely serves and celebrates this community is something I&apos;m proud of every single day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              emoji: "🌾",
              title: "Highest Quality",
              desc: "We source the finest ingredients available. No shortcuts, no compromises.",
            },
            {
              emoji: "🌿",
              title: "Freshest Ingredients",
              desc: "Everything is made fresh, from scratch, every single day.",
            },
            {
              emoji: "👩\u200d🍳",
              title: "Small-Batch",
              desc: "We bake in small batches to ensure every item meets our standards.",
            },
            {
              emoji: "❤️",
              title: "Made with Love",
              desc: "The secret ingredient in everything we make. You can taste the difference.",
            },
          ].map((value) => (
            <div
              key={value.title}
              className="bg-reba-card border border-reba-border rounded-2xl p-6 text-center"
            >
              <div className="text-3xl mb-3">{value.emoji}</div>
              <h3 className="text-reba-cream font-semibold mb-2">
                {value.title}
              </h3>
              <p className="text-reba-muted text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community */}
      <section className="bg-reba-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-6">
            Our Community
          </h2>
          <p className="text-reba-soft leading-relaxed mb-4 max-w-2xl mx-auto">
            We&apos;re humbled and honored that 10 Nextdoor neighborhoods have
            named Sweet Reba&apos;s as their favorite bakery. From Carmel to
            Salinas, Marina to Pacific Grove, our community is our greatest
            ingredient.
          </p>
          <p className="text-reba-muted leading-relaxed max-w-2xl mx-auto mb-6">
            Every cookie, every cake, every breakfast burrito is made for the
            people who walk through our doors.
          </p>
          <p className="text-reba-pink font-bold text-lg max-w-2xl mx-auto">
            You&apos;re not customers &mdash; you&apos;re family.
          </p>
        </div>
      </section>
    </div>
  );
}
