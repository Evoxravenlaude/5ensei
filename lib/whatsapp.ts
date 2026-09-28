import { getProduct, money } from "./products";
import type { CartLine } from "./cart-context";

export const WHATSAPP_NUMBER = "2348034900874";

/** A wa.me link with the order written out, so the atelier gets the whole bag in one message. */
export function whatsappOrderLink(lines: CartLine[], subtotal: number) {
  const rows = lines
    .map((l) => {
      const p = getProduct(l.slug);
      if (!p) return null;
      const label = l.label?.name ? ` (label for: ${l.label.name}${l.label.note ? `, "${l.label.note}"` : ""})` : "";
      return `${l.qty} x ${p.name}, ${p.sizeLabel}${label}`;
    })
    .filter(Boolean);
  const text = ["Hello 5ENSEI, I would like to order:", ...rows, `Subtotal: ${money(subtotal)}`, "Please confirm availability and delivery."].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function whatsappProductLink(name: string, sizeLabel: string, label?: { name: string; note?: string }) {
  const l = label?.name ? ` Label for: ${label.name}${label.note ? `, "${label.note}"` : ""}.` : "";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello 5ENSEI, I would like to order ${name}, ${sizeLabel}.${l}`)}`;
}

/** dd.mm.yyyy, the way a lab writes a date on a label. */
export function labelDate(d = new Date()) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`;
}
