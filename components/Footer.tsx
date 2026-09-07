"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 border-b border-line-soft">
        <div className="lg:col-span-1">
          <Image
            src="/logo-mark.png"
            alt="5ENSEI"
            width={60}
            height={100}
            className="h-[26px] w-auto mb-4 brightness-0 invert"
          />
          <p className="text-paper/65 text-sm max-w-[26ch]">
            Presence before introduction. A Nigerian fragrance house.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-brass-soft mb-4">
            About 5ensei
          </h3>
          <ul className="space-y-2.5 text-[13.5px] text-paper/75">
            <li><Link href="/philosophy" className="hover:text-brass-soft">Our philosophy</Link></li>
            <li><Link href="/collection" className="hover:text-brass-soft">The collection</Link></li>
            <li><Link href="/contact" className="hover:text-brass-soft">The atelier</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-brass-soft mb-4">
            Client care
          </h3>
          <ul className="space-y-2.5 text-[13.5px] text-paper/75">
            <li><Link href="/contact" className="hover:text-brass-soft">Contact us</Link></li>
            <li><a href="https://wa.me/2348034900874" className="hover:text-brass-soft">WhatsApp orders</a></li>
            <li><Link href="/contact" className="hover:text-brass-soft">Shipping &amp; handling</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-brass-soft mb-4">
            Visit us
          </h3>
          <ul className="space-y-2.5 text-[13.5px] text-paper/75">
            <li>Ilorin, Kwara, Nigeria</li>
            <li>By appointment</li>
            <li>+234 803 490 0874</li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-brass-soft mb-4">
            Stay in the loop
          </h3>
          {submitted ? (
            <p className="text-sm text-brass-soft">You're on the list.</p>
          ) : (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubmitted(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-transparent border-b border-line-soft px-0 py-2 text-sm text-paper placeholder:text-paper/40 focus:outline-none focus:border-brass-soft"
              />
              <button
                type="submit"
                className="text-[11px] font-mono font-bold uppercase tracking-widest2 text-brass-soft hover:text-paper text-left transition-colors mt-1"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-paper/50">
        <span>&copy; {new Date().getFullYear()} 5ENSEI. All rights reserved.</span>
        <span>Ilorin, Nigeria</span>
      </div>
    </footer>
  );
}
