/** The Soren film: 31 s, portrait. Chapter times match the storyboard it was generated from. */
export const FILM = {
  src: "/soren-film.mp4",          // 720px, with sound
  srcLite: "/soren-film-480.mp4",  // 480px, muted, for phones and low-power devices
  poster: "/soren-film-poster.jpg",
  chapters: [
    { key: "cream", label: "soft cream", start: 0, end: 7, line: "the opening. heavy vanilla cream, whipped slowly. warm before it is sweet." },
    { key: "marshmallow", label: "marshmallow", start: 7, end: 14, line: "the heart. pillowed, toasted sweetness that gives the accord its softness." },
    { key: "musk", label: "musk", start: 14, end: 22, line: "the base. a powdery white musk that stays close to the skin, long after you\u2019ve left." },
    { key: "bottle", label: "soren", start: 22, end: 31.3, line: "one accord. filled by hand in ilorin, 50 ml." },
  ],
};

export const isLite = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || (navigator.hardwareConcurrency || 8) <= 4 || (navigator as any).connection?.saveData);
