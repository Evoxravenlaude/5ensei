"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Complimentary standard shipping on orders over $75.",
  "Every fragrance is blended and labeled at the moment of order.",
  "Refill your vessel: bring any 5ensei bottle or jar back for 20% off.",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-graphite text-bone text-center text-[11px] sm:text-xs py-2 px-4 tracking-wide">
      <span key={index} className="animate-rise-in inline-block">
        {MESSAGES[index]}
      </span>
    </div>
  );
}
