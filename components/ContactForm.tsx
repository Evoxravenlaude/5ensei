"use client";

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" id="name" type="text" />
        <Field label="Email" id="email" type="email" />
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label htmlFor="reason" className="font-mono text-[11px] text-ink/58">
            What brings you in
          </label>
          <select
            id="reason"
            className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink focus:outline-none focus:border-rust"
          >
            <option>A first fitting</option>
            <option>Re-ordering a fragrance</option>
            <option>Stockist enquiry</option>
            <option>Press or partnership</option>
          </select>
        </div>
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label htmlFor="message" className="font-mono text-[11px] text-ink/58">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink focus:outline-none focus:border-rust resize-y"
          />
        </div>
      </div>
      <button
        type="submit"
        className="self-start bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-7 py-3.5 mt-2"
      >
        Send enquiry
      </button>
    </form>
  );
}

function Field({ label, id, type }: { label: string; id: string; type: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-[11px] text-ink/58">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink focus:outline-none focus:border-rust"
      />
    </div>
  );
}
