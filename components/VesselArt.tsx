export default function ComingSoonGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="M22 10h16v12l6 8v58a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V30l6-8z" />
      <path d="M22 10V4h16v6" />
    </svg>
  );
}
