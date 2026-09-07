import Image from "next/image";

export default function AnnouncementBar() {
  const items = Array(6).fill("Presence before introduction");

  return (
    <div className="bg-rust text-paper overflow-hidden whitespace-nowrap relative flex items-center gap-3.5 pl-4">
      <Image
        src="/logo-mark.png"
        alt=""
        width={40}
        height={70}
        className="h-[13px] w-auto shrink-0 brightness-0 invert opacity-90 animate-floaty-sm"
      />
      <div className="inline-flex animate-marquee py-2">
        {items.concat(items).map((text, i) => (
          <span
            key={i}
            className="font-mono font-bold text-[11.5px] tracking-[0.2em] px-11 text-paper/90"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
