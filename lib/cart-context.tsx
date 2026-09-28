"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { getProduct } from "./products";

/** The typewritten label that goes on a bottle. Optional; a line without one is "for: you". */
export interface LabelPersonalization {
  name: string;
  note?: string;
}

export interface CartLine {
  id: string; // slug + label, so two differently-labelled bottles are two lines
  slug: string;
  qty: number;
  label?: LabelPersonalization;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, label?: LabelPersonalization) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "5ensei-cart-v2";

export const lineId = (slug: string, label?: LabelPersonalization) =>
  label?.name?.trim() ? `${slug}::${label.name.trim().toLowerCase()}::${(label.note || "").trim().toLowerCase()}` : slug;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable; the bag still works in memory for this session
    }
  }, [lines, hydrated]);

  const addItem = useCallback((slug: string, label?: LabelPersonalization) => {
    const clean = label?.name?.trim() ? { name: label.name.trim(), note: label.note?.trim() || undefined } : undefined;
    const id = lineId(slug, clean);
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id);
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, slug, qty: 1, label: clean }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      count += line.qty;
      subtotal += (product?.price ?? 0) * line.qty;
    }
    return { count, subtotal };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    updateQty,
    removeItem,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
