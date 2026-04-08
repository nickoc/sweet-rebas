export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-reba-card to-reba-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-cream mb-4">
            Our Story
          </h1>
          <p className="text-reba-muted text-lg">
            A journey of love, family, and the perfect cake.
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-12">
          {/* Grandmother's Kitchen */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
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

          {/* The Birthday Cake */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="text-4xl mb-4">🎂</div>
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

          {/* Local Legend */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="text-4xl mb-4">🌊</div>
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

          {/* Food Network */}
          <div className="bg-reba-card border border-reba-pink/30 rounded-2xl p-8">
            <div className="text-4xl mb-4">📺</div>
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

          {/* Expansion */}
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <div className="text-4xl mb-4">🏪</div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
              Two Locations, One Heart
            </h2>
            <p className="text-reba-soft leading-relaxed">
              The bakery found its first permanent home at Carmel Crossroads,
              becoming a beloved stop for locals and visitors alike. Then came
              Old Town Salinas, bringing Sweet Reba&apos;s magic to a whole new
              community. Two locations, same recipes, same love.
            </p>
          </div>
        </div>
      </section>

      {/* Michael Section */}
      <section className="bg-reba-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="bg-reba-card border border-reba-border rounded-2xl p-8">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
              Michael &mdash; Partner in Everything
            </h2>
            <p className="text-reba-soft leading-relaxed mb-4">
              Behind every great bakery is a great team, and Michael is
              Reba&apos;s rock. As husband and business partner, Michael brings
              his Italian heritage and culinary training to the kitchen. His
              savory creations &mdash; the breakfast burritos, sandwiches, and
              soups &mdash; perfectly complement Reba&apos;s sweet masterpieces.
            </p>
            <p className="text-reba-muted leading-relaxed">
              Together, they&apos;ve built more than a bakery. They&apos;ve
              built a gathering place where the community comes together over
              incredible food.
            </p>
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
          <p className="text-reba-muted leading-relaxed max-w-2xl mx-auto">
            Every cookie, every cake, every breakfast burrito is made for the
            people who walk through our doors. You&apos;re not customers &mdash;
            you&apos;re family.
          </p>
        </div>
      </section>
    </div>
  );
}
