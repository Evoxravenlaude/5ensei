const BELIEFS = [
  "We believe a fragrance should be built around one material doing something unreasonable, not ten materials playing it safe.",
  "We believe the nose gets lazy when everything smells finished — so we leave the rough edges in.",
  "We believe a scent studio should train attention the way a dojo trains a body: slowly, and with correction.",
  "We believe personalization isn't a monogram. It's a batch date, a place, and whoever you're making it for.",
  "We believe a bottle you return is worth more than a bottle you throw away.",
  "We believe smell, touch and sound are one instrument with three strings, not three separate departments.",
];

const FAQS = [
  {
    q: "Why organize the shop by sense instead of by gender or occasion?",
    a: "Because a raw material doesn't know who's wearing it. Sorting by smell, touch and sound keeps the focus on what a formula actually does, not who it's marketed at.",
  },
  {
    q: "What does the number after each name mean?",
    a: "It's the count of raw materials in that formula. YUZU 14 is built from fourteen materials; SUMI 6 from six. Fewer materials isn't simpler — it just means less room to hide.",
  },
  {
    q: "How does personalization work?",
    a: "At checkout you can add a short line for the label — a name, a date, a place. Leave it blank and we'll print 'For: You'. Personalized bottles are made to order and final sale.",
  },
  {
    q: "Do you really refill bottles and jars?",
    a: "Yes. Any 5ensei vessel — glass or stoneware — can be brought back (or mailed back) for a 20% refill discount on the same formula.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16">
      <section id="practice">
        <p className="text-xs uppercase tracking-widest2 text-copper-bright mb-4">
          The practice
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-bone leading-snug mb-6">
          A sensei doesn't teach you something new. They teach you to notice
          what you'd already stopped paying attention to.
        </h1>
        <p className="text-bone/70 leading-relaxed mb-4">
          5ensei started as a sensory-training studio before it became a
          fragrance house — weekend sessions where a handful of people
          practiced isolating one note in a glass of tea, one texture in a
          handshake, one sound in a quiet room. The formulas came later, as a
          way of taking that practice home.
        </p>
        <p className="text-bone/70 leading-relaxed">
          Every fragrance is still blended to order, in small batches, by
          someone trained to notice the difference between a material that's
          balanced and one that's just been diluted into politeness.
        </p>
      </section>

      <section className="mt-16 border-t border-line pt-12">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-6">
          What we believe
        </p>
        <ul className="space-y-5">
          {BELIEFS.map((b, i) => (
            <li key={i} className="font-display text-lg text-bone/90 leading-snug">
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section id="studio" className="mt-16 border-t border-line pt-12">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">The studio</p>
        <p className="text-bone/70 leading-relaxed">
          The first 5ensei counter opened above a hardware store, chosen
          because the smell of cut wood and machine oil was more honest than
          anything a retail fit-out could manufacture. Every counter since has
          kept the same rule: something in the room should smell like work.
        </p>
      </section>

      <section id="refill" className="mt-16 border-t border-line pt-12">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Refill program</p>
        <p className="text-bone/70 leading-relaxed">
          Glass and stoneware are the most durable things we make — it seemed
          wasteful to throw them away. Bring any 5ensei vessel back for a 20%
          refill discount on the same formula, in person or by mail.
        </p>
      </section>

      <section id="shipping" className="mt-16 border-t border-line pt-12">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">
          Shipping &amp; returns
        </p>
        <p className="text-bone/70 leading-relaxed">
          Standard shipping is complimentary on orders over $75 and ships
          within two business days. Unpersonalized items can be returned
          within 30 days in original condition; personalized items are made
          to order and final sale.
        </p>
      </section>

      <section id="faq" className="mt-16 border-t border-line pt-12">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-6">FAQ</p>
        <div className="space-y-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <p className="text-bone mb-2">{f.q}</p>
              <p className="text-sm text-bone/70 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-16 border-t border-line pt-12 pb-4">
        <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">Contact</p>
        <p className="text-bone/70 leading-relaxed">
          Questions about an order or the practice in general —{" "}
          <a href="mailto:hello@5ensei.example" className="text-copper-bright hover:text-bone underline underline-offset-2">
            hello@5ensei.example
          </a>
          .
        </p>
      </section>
    </div>
  );
}
