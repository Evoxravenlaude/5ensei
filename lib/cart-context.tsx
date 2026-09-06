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

export interface CartLine {
  id: string; // slug + size + personalization, unique key
  slug: string;
  sizeLabel: string;
  qty: number;
  personalization?: string;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (slug: string, sizeLabel: string, personalization?: string) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  count: number;
  subtotal: number;
  lastAdded: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "5ensei-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // hydrate from localStorage once, client-side only
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
      // storage unavailable — cart still works in-memory for this session
    }
  }, [lines, hydrated]);

  const addItem = useCallback(
    (slug: string, sizeLabel: string, personalization?: string) => {
      const id = `${slug}__${sizeLabel}__${personalization ?? ""}`;
      setLines((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) =>
            l.id === id ? { ...l, qty: l.qty + 1 } : l
          );
        }
        return [...prev, { id, slug, sizeLabel, qty: 1, personalization }];
      });
      setLastAdded(id);
      setIsOpen(true);
    },
    []
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = getProduct(line.slug);
      const size = product?.sizes.find((s) => s.label === line.sizeLabel);
      count += line.qty;
      subtotal += (size?.price ?? 0) * line.qty;
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
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
