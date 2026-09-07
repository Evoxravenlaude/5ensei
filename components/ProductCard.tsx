import Link from "next/link";
import Image from "next/image";
import { Product, money } from "@/lib/products";
import ComingSoonGlyph from "./VesselArt";

export default function ProductCard({
  product,
  size = "regular",
}: {
  product: Product;
  size?: "regular" | "large";
}) {
  const available = product.status === "available";

  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group border border-line bg-paper hover:bg-paper-deep transition-colors flex flex-col ${
        size === "large" ? "sm:row-span-2" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center p-8 ${
          size === "large" ? "h-72 sm:h-96" : "h-56"
        }`}
      >
        {available ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={380}
            className="h-full w-auto max-w-[60%] object-contain drop-shadow-[0_14px_18px_rgba(23,19,16,0.18)] transition-transform group-hover:-translate-y-1 group-hover:scale-[1.03]"
          />
        ) : (
          <ComingSoonGlyph className="h-16 w-auto text-rust opacity-35" />
        )}
      </div>
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink">{product.name}</h3>
          <span className="font-mono text-xs text-rust">{money(product.price, product.currency)}</span>
        </div>
        <p className="font-mono text-xs text-ink/55 mt-1">{product.sizeLabel}</p>
      </div>
    </Link>
  );
}
