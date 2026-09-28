import { labelDate } from "@/lib/whatsapp";

/**
 * The typewritten bottle label. Pure markup, so it renders on the server, in the bag, and in the composer.
 * Sizes scale from the container width via container query units.
 */
export default function Label({
  product = "Soren",
  format = "extrait de parfum, 50 ml",
  name,
  note,
  date,
  batch = "001",
  className = "",
  tilt = true,
}: {
  product?: string;
  format?: string;
  name?: string;
  note?: string;
  date?: string;
  batch?: string;
  className?: string;
  tilt?: boolean;
}) {
  const forName = name?.trim() || "you";
  return (
    <div
      className={`label ${tilt ? "label-tilt" : ""} ${className}`}
      aria-label={`Label: ${product}, ${format}, for ${forName}`}
    >
      <div className="label-row label-top">
        <span>5ENSEI</span>
        <span>ilorin, kwara</span>
      </div>
      <div className="label-name">{product}</div>
      <div className="label-format">{format}</div>
      <div className="label-for">
        <span className="label-key">for:</span>
        <span className="label-val">{forName}</span>
      </div>
      {note?.trim() ? <div className="label-note">&ldquo;{note.trim()}&rdquo;</div> : null}
      <div className="label-row label-bottom">
        <span>hand-filled {date || labelDate()}</span>
        <span>batch {batch}</span>
      </div>
      <div className="label-foot">presence before introduction</div>
    </div>
  );
}
