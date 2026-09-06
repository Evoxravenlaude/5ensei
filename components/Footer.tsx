"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-ink-soft border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-smoke mb-4">Studio</h3>
          <ul className="space-y-2 text-sm text-bone/80">
            <li><Link href="/about" className="hover:text-bone">About 5ensei</Link></li>
            <li><Link href="/about#practice" className="hover:text-bone">Our practice</Link></li>
            <li><Link href="/collections/smell" className="hover:text-bone">Fragrance library</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-smoke mb-4">Client care</h3>
          <ul className="space-y-2 text-sm text-bone/80">
            <li><Link href="/about#contact" className="hover:text-bone">Contact us</Link></li>
            <li><Link href="/about#shipping" className="hover:text-bone">Shipping &amp; returns</Link></li>
            <li><Link href="/about#faq" className="hover:text-bone">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-smoke mb-4">Visit</h3>
          <ul className="space-y-2 text-sm text-bone/80">
            <li><Link href="/about#studio" className="hover:text-bone">The studio</Link></li>
            <li><Link href="/about#refill" className="hover:text-bone">Refill program</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-smoke mb-4">Stay in the loop</h3>
          {submitted ? (
            <p className="text-sm text-copper-bright">You're on the list.</p>
          ) : (
            <form
              className="flex flex-col gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setSubmitted(true);
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent border border-line px-3 py-2 text-sm text-bone placeholder:text-smoke focus:outline-none focus:border-copper-bright"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-widest2 text-copper-bright hover:text-bone text-left transition-colors"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-smoke">
          <span>© {new Date().getFullYear()} 5ensei. All formulas blended to order.</span>
          <span>Prototype build — not a live store.</span>
        </div>
      </div>
    </footer>
  );
}
