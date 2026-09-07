import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-10 py-32 text-center">
      <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-rust mb-4">404</p>
      <h1 className="font-display font-bold text-3xl mb-4">Nothing&rsquo;s been bottled at this address.</h1>
      <p className="text-ink/68 mb-8">
        The page you&rsquo;re looking for doesn&rsquo;t exist &mdash; but the collection does.
      </p>
      <Link
        href="/"
        className="inline-block bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-7 py-3.5"
      >
        Back to 5ENSEI
      </Link>
    </div>
  );
}
