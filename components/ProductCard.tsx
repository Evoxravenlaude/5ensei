import Link from "next/link";
import { Product } from "@/lib/products";
import VesselArt from "./VesselArt";

export default function ProductCard({
  product,
  size = "regular",
}: {
  product: Product;
  size?: "regular" | "large";
}) {
  const startingPrice = Math.min(...product.sizes.map((s) => s.price));
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group border border-line bg-ink-soft hover:border-smoke transition-colors flex flex-col ${
        size === "large" ? "sm:row-span-2" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center p-8 text-smoke group-hover:text-bone/70 transition-colors ${
          size === "large" ? "h-72 sm:h-96" : "h-56"
        }`}
      >
        <VesselArt
          format={product.format}
          tint={product.tint}
          code={product.code}
          className="h-full w-auto max-w-[60%]"
        />
      </div>
      <div className="border-t border-line px-5 py-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-sm tracking-wide text-bone">{product.name}</h3>
          <span className="text-xs text-smoke">from ${startingPrice}</span>
        </div>
        <p className="text-xs text-smoke mt-1 line-clamp-1">{product.tagline}</p>
      </div>
    </Link>
  );
}
