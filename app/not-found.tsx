import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 sm:px-8 py-32 text-center">
      <p className="text-xs uppercase tracking-widest2 text-smoke mb-4">404</p>
      <h1 className="font-display text-3xl text-bone mb-4">
        Nothing's been blended at this address.
      </h1>
      <p className="text-bone/70 mb-8">
        The page you're looking for doesn't exist — but the library does.
      </p>
      <Link
        href="/"
        className="inline-block bg-copper hover:bg-copper-bright transition-colors text-bone text-sm px-6 py-3"
      >
        Back to the studio
      </Link>
    </div>
  );
}
