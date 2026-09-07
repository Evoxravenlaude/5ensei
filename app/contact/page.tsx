import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — 5ENSEI",
  description: "Reach the 5ensei atelier in Ilorin, Kwara.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 sm:px-10 pt-16 pb-11">
        <p className="font-mono font-bold text-[11.5px] uppercase tracking-widest2 text-rust mb-3">
          Get in touch
        </p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl">Book a visit</h1>
        <p className="mt-4 text-ink/68 max-w-[52ch]">
          The atelier works by appointment. Tell us a little about what you&rsquo;re looking for and
          we&rsquo;ll follow up directly.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-10 pb-20">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-16">
          <div className="border-t border-line">
            <div className="py-7 border-b border-line">
              <h3 className="text-[17px] font-bold mb-2">Atelier</h3>
              <p className="text-ink/68 text-sm">
                Ilorin, Kwara, Nigeria
                <br />
                Reach out via WhatsApp or email to arrange a visit
              </p>
            </div>
            <div className="py-7 border-b border-line">
              <h3 className="text-[17px] font-bold mb-2">Enquiries</h3>
              <p className="text-ink/68 text-sm">
                senseiibrand@gmail.com
                <br />
                +234 803 490 0874
              </p>
            </div>
            <div className="py-7 border-b border-line">
              <h3 className="text-[17px] font-bold mb-2">Elsewhere</h3>
              <p className="text-ink/68 text-sm">
                Find us on Instagram, TikTok, and WhatsApp &mdash; links in the footer below.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
