"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const GROUPS = [
  { title: "About 5ensei", links: [["Philosophy", "/philosophy"], ["The collection", "/collection"], ["The atelier", "/contact"], ["Personalised label", "/products/soren#label"]] },
  { title: "Client care", links: [["Contact us", "/contact"], ["WhatsApp orders", "https://wa.me/2348034900874"], ["Delivery", "/products/soren"], ["Admin", "/admin"]] },
  { title: "Visit us", links: [["Ilorin, Kwara, Nigeria", "/contact"], ["By appointment", "/contact"], ["+234 803 490 0874", "tel:+2348034900874"], ["senseiibrand@gmail.com", "mailto:senseiibrand@gmail.com"]] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // columns are open on desktop and collapse into accordions on phones
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync(); mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-14 pb-10 grid gap-x-10 md:grid-cols-[1.1fr_1fr_1fr_1fr_1.4fr]">
        <div className="pb-8 md:pb-0">
          <Image src="/logo-mark.png" alt="5ENSEI" width={60} height={100} className="h-[26px] w-auto mb-4 brightness-0 invert" />
          <p className="font-mono text-paper/60 text-[0.75rem] lowercase max-w-[26ch] leading-relaxed">presence before introduction. a nigerian fragrance house, ilorin.</p>
        </div>

        {GROUPS.map((g) => (
          <details key={g.title} className="foot-group border-t border-line-soft md:border-0 group" open={wide || undefined}>
            <summary className="flex items-center justify-between py-4 md:py-0 md:mb-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brass-soft">
              {g.title}
              <span className="pm font-mono text-paper/60 group-open:hidden">+</span>
              <span className="pm font-mono text-paper/60 hidden group-open:inline">–</span>
            </summary>
            <ul className="space-y-2.5 pb-6 md:pb-0 text-[0.8125rem] text-paper/75">
              {g.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-brass-soft transition-colors">{label}</Link></li>
              ))}
            </ul>
          </details>
        ))}

        <div className="border-t border-line-soft md:border-0 pt-6 md:pt-0">
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brass-soft mb-4">Join the list</h3>
          {submitted ? (
            <p className="font-mono text-sm text-brass-soft lowercase">you&rsquo;re on the list…</p>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); if (email.includes("@") && agree) setSubmitted(true); }}>
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" className="bg-transparent border-b border-line-soft px-0 py-2 font-mono text-sm text-paper placeholder:text-paper/35 focus:outline-none focus:border-brass-soft" />
              <label className="flex items-start gap-2.5 font-mono text-[0.6875rem] text-paper/55 leading-relaxed lowercase">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 accent-[#b7924a]" required />
                we write when there is something to say: a new release, a batch, an open day at the atelier. unsubscribe whenever.
              </label>
              <button type="submit" className="self-start text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-brass-soft hover:text-paper transition-colors mt-1">Sign up</button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 py-6 border-t border-line-soft flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[0.6875rem] text-paper/45 lowercase">
        <span>&copy; {new Date().getFullYear()} 5ensei. all rights reserved.</span>
        <span>ilorin, nigeria</span>
      </div>
    </footer>
  );
}
