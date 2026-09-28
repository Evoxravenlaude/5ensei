import Link from "next/link";

/** One quiet line, like the notices above Le Labo's nav. */
export default function AnnouncementBar() {
  return (
    <div className="bg-rust text-paper">
      <p className="mx-auto max-w-7xl px-5 sm:px-10 py-2 font-mono text-[11px] lowercase text-center sm:text-left">
        soren is now available in 50 ml. filled by hand in ilorin, delivered across nigeria.{" "}
        <Link href="/products/soren" className="underline underline-offset-4 hover:text-paper/80">view more</Link>
      </p>
    </div>
  );
}
