import Link from "next/link";

export const metadata = {
  title: "Philosophy — 5ENSEI",
  description: "The thinking behind 5ENSEI: presence before introduction.",
};

const PRINCIPLES = [
  {
    mark: "i.",
    title: "One accord, not forty notes",
    body: "Every 5ENSEI fragrance is built around a single dominant idea \u2014 an accord you could describe in one sentence. We'd rather you remember one thing clearly than ten things faintly.",
  },
  {
    mark: "ii.",
    title: "Nothing is ever discontinued",
    body: "We don't do seasonal drops or limited editions. If it earns a place in the collection, it stays \u2014 the same bottle you buy today should still be there in ten years.",
  },
  {
    mark: "iii.",
    title: "We don't advertise. We're found.",
    body: "5ENSEI travels by way of the people who wear it, not by campaign. Our only shopfront is the atelier, and it carries no sign.",
  },
];

export default function PhilosophyPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-16 pb-11">
        <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-rust mb-3">
          Our thinking
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl">
          Presence before <em className="italic text-rust">introduction</em>.
        </h1>
        <p className="mt-4 text-ink/68 max-w-[52ch]">
          The phrase is on every bottle we make, so it should mean something specific. Here is what
          it means to us.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 pb-4">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-16">
          <h2 className="font-display font-bold text-[26px]">Why we started here</h2>
          <div className="space-y-4 text-ink/78">
            <p>
              Most fragrance is built to be described &mdash; top notes, dry-down, sillage, a story
              for the counter. We started 5ENSEI because the people we admired most never needed to
              explain themselves. Their scent arrived first, said very little, and was remembered
              anyway.
            </p>
            <p>
              We wanted to build for that kind of person: someone whose taste is already settled,
              who isn&rsquo;t shopping for a personality, only for the last, quiet detail.
            </p>
          </div>
        </div>
      </div>

      <section className="bg-ink text-paper border-t border-b border-rust-deep py-20 my-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-10">
          <div className="w-11 h-px bg-brass-soft mb-6" />
          <h2 className="font-display italic font-bold text-3xl sm:text-4xl">
            Old money doesn&rsquo;t ask to be noticed. It simply is.
          </h2>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 pb-4">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-6 mb-4 flex-wrap">
          <h2 className="font-display font-bold text-2xl sm:text-3xl">How we work</h2>
          <p className="text-ink/60 text-sm max-w-[34ch]">
            Three commitments that shape every decision, from formula to shelf.
          </p>
        </div>
        <div className="border-t border-line">
          {PRINCIPLES.map((p) => (
            <div
              key={p.mark}
              className="grid grid-cols-[70px_1fr] sm:grid-cols-[90px_1fr] gap-7 py-8 border-b border-line hover:pl-2 hover:bg-brass/5 transition-all"
            >
              <div className="font-mono font-bold text-rust text-sm">{p.mark}</div>
              <div>
                <h3 className="font-display italic font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-ink/66 text-sm max-w-[52ch]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 py-20">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-16">
          <h2 className="font-display font-bold text-[26px]">Made in Kwara</h2>
          <div className="space-y-4 text-ink/78">
            <p>
              Every fragrance is compounded and bottled in our Ilorin atelier, in small batches. We
              source raw materials the way a tailor sources cloth &mdash; slowly, and only from
              houses we trust.
            </p>
            <p>
              This is not a global brand pretending to be local. It is a local house that has no
              interest in becoming global.
            </p>
            <Link
              href="/collection"
              className="inline-block mt-3 border border-ink text-ink text-xs font-bold uppercase tracking-wide px-7 py-3.5 hover:bg-ink hover:text-paper transition-colors"
            >
              See the collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
