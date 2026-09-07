"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product, money } from "@/lib/products";

type EditableProduct = Product & { _isNew?: boolean };

const emptyProduct = (): EditableProduct => ({
  slug: "",
  name: "",
  status: "coming-soon",
  sizeLabel: "",
  price: null,
  currency: "\u20a6",
  image: "",
  description: "",
  tabs: { scent: "", bottle: "", delivery: "" },
  _isNew: true,
});

async function api(path: string, options?: RequestInit) {
  const res = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  let data: any = {};
  try {
    data = await res.json();
  } catch {
    /* no body */
  }
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `product-${Date.now()}`
  );
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<EditableProduct | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(null);

  useEffect(() => {
    api("/api/session")
      .then((d) => setAuthed(!!d.authenticated))
      .catch(() => setAuthed(false))
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (authed) loadProducts();
  }, [authed]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(id);
  }, [toast]);

  async function loadProducts() {
    try {
      const { products } = await api("/api/products");
      setProducts(products || []);
    } catch (err: any) {
      setToast({ msg: err.message, error: true });
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    try {
      await api("/api/login", { method: "POST", body: JSON.stringify({ username, password }) });
      setAuthed(true);
    } catch (err: any) {
      setLoginError(err.message);
    }
  }

  async function handleLogout() {
    try {
      await api("/api/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setAuthed(false);
  }

  async function persist(next: Product[]) {
    setProducts(next);
    try {
      await api("/api/products", { method: "POST", body: JSON.stringify({ products: next }) });
      setToast({ msg: "Saved \u2014 live on the site shortly." });
    } catch (err: any) {
      setToast({ msg: err.message, error: true });
    }
  }

  async function handleDelete(slug: string) {
    if (!window.confirm("Delete this product? This takes effect as soon as it saves.")) return;
    await persist(products.filter((p) => p.slug !== slug));
  }

  async function handleSave(product: EditableProduct) {
    const clean: Product = {
      slug: product.slug || slugify(product.name),
      name: product.name,
      status: product.status,
      sizeLabel: product.sizeLabel,
      price: product.status === "available" ? product.price : null,
      currency: product.currency || "\u20a6",
      image: product.image,
      description: product.description,
      tabs: product.tabs,
    };
    const idx = products.findIndex((p) => p.slug === clean.slug);
    const next = idx >= 0 ? products.map((p, i) => (i === idx ? clean : p)) : [...products, clean];
    setEditing(null);
    await persist(next);
  }

  async function handleUpload(file: File) {
    if (file.size > 3 * 1024 * 1024) {
      setToast({ msg: "Please use an image under 3MB.", error: true });
      return;
    }
    setUploadStatus("Uploading\u2026");
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const base64 = dataUrl.split(",")[1];
      const result = await api("/api/upload", {
        method: "POST",
        body: JSON.stringify({ filename: file.name, dataBase64: base64 }),
      });
      setEditing((cur) => (cur ? { ...cur, image: result.path } : cur));
      setUploadStatus("Uploaded \u2014 will be saved with this product.");
    } catch (err: any) {
      setUploadStatus("");
      setToast({ msg: err.message, error: true });
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-8">
        <div className="w-full max-w-sm border border-line bg-paper p-10">
          <h1 className="font-display font-bold italic text-3xl mb-2">Admin</h1>
          <p className="font-mono text-[13px] text-ink/60 mb-7">
            Sign in to manage the 5ENSEI collection.
          </p>
          {loginError && (
            <div className="font-mono text-[13px] text-[#8a2c1e] bg-rust/10 border border-rust/30 px-3.5 py-2.5 mb-4">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-ink/58" htmlFor="u">
                Username
              </label>
              <input
                id="u"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-transparent border-b border-line py-2 text-[15px] focus:outline-none focus:border-rust"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[11px] text-ink/58" htmlFor="p">
                Password
              </label>
              <input
                id="p"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-b border-line py-2 text-[15px] focus:outline-none focus:border-rust"
              />
            </div>
            <button
              type="submit"
              className="bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-7 py-3.5"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-10 py-12">
      <div className="flex items-end justify-between gap-6 border-b border-line pb-6 mb-9 flex-wrap">
        <div>
          <h1 className="font-display font-bold italic text-3xl">The collection</h1>
          <p className="font-mono text-xs text-ink/55 mt-1.5">
            Changes are committed to GitHub and go live after a short redeploy.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setEditing(emptyProduct())}
            className="bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-6 py-3"
          >
            + Add product
          </button>
          <button onClick={handleLogout} className="font-mono text-xs text-ink/60 hover:text-ink underline">
            Log out
          </button>
        </div>
      </div>

      <div className="border-t border-line">
        {products.length === 0 && (
          <p className="py-12 text-center font-mono text-sm text-ink/45">No products yet.</p>
        )}
        {products.map((p) => (
          <div
            key={p.slug}
            className="grid grid-cols-[56px_1fr_auto_auto_auto] items-center gap-4 py-4 border-b border-line"
          >
            {p.image ? (
              <Image src={p.image} alt="" width={56} height={70} className="w-full h-auto" />
            ) : (
              <div className="w-9 h-14 bg-paper-deep" />
            )}
            <div>
              <div className="font-display italic font-bold text-lg">{p.name}</div>
              <div className="font-mono text-xs text-ink/55">
                {p.sizeLabel}
                {p.status === "available" && ` \u00b7 ${money(p.price, p.currency)}`}
              </div>
            </div>
            <span
              className={`font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 border ${
                p.status === "available" ? "text-rust border-rust" : "text-ink/55 border-line"
              }`}
            >
              {p.status === "available" ? "Available" : "Coming soon"}
            </span>
            <button
              onClick={() => setEditing({ ...p })}
              className="font-mono text-xs hover:border-b border-brass"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p.slug)}
              className="font-mono text-xs text-[#8a2c1e] hover:border-b border-[#8a2c1e]"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-ink/45" onClick={() => setEditing(null)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-paper border-l border-line p-9 overflow-y-auto">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-7 right-7 font-mono text-xs text-ink/50"
            >
              Close &#10005;
            </button>
            <h2 className="font-display italic font-bold text-2xl mb-6">
              {editing._isNew ? "Add product" : `Edit ${editing.name}`}
            </h2>

            <div className="w-full max-w-[180px] aspect-[4/5] border border-line bg-paper-deep flex items-center justify-center mb-3.5 overflow-hidden">
              {editing.image ? (
                <Image src={editing.image} alt="" width={180} height={225} className="w-[70%] h-auto" unoptimized />
              ) : (
                <span className="font-mono text-xs text-ink/40">No image yet</span>
              )}
            </div>
            <label className="inline-block font-mono text-xs border border-line px-4 py-2 cursor-pointer hover:border-brass mb-1">
              Choose image
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              />
            </label>
            <p className="font-mono text-xs text-ink/55 mb-5">{uploadStatus}</p>

            <FieldText
              label="Product name"
              value={editing.name}
              onChange={(v) => setEditing({ ...editing, name: v })}
            />

            <div className="flex flex-col gap-1.5 mb-5">
              <label className="font-mono text-[11px] text-ink/58">Status</label>
              <select
                value={editing.status}
                onChange={(e) =>
                  setEditing({ ...editing, status: e.target.value as Product["status"] })
                }
                className="bg-transparent border-b border-line py-2 text-[15px] focus:outline-none focus:border-rust"
              >
                <option value="available">Available now</option>
                <option value="coming-soon">Coming soon</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <FieldText
                label="Price (blank if coming soon)"
                value={editing.price?.toString() ?? ""}
                onChange={(v) => setEditing({ ...editing, price: v ? Number(v) : null })}
              />
              <FieldText
                label="Currency symbol"
                value={editing.currency}
                onChange={(v) => setEditing({ ...editing, currency: v })}
              />
            </div>

            <FieldText
              label="Size / label"
              value={editing.sizeLabel}
              onChange={(v) => setEditing({ ...editing, sizeLabel: v })}
            />
            <FieldArea
              label="Short description"
              value={editing.description}
              onChange={(v) => setEditing({ ...editing, description: v })}
            />
            <FieldArea
              label='"The scent" tab copy'
              value={editing.tabs.scent}
              onChange={(v) => setEditing({ ...editing, tabs: { ...editing.tabs, scent: v } })}
            />
            <FieldArea
              label='"The bottle" tab copy'
              value={editing.tabs.bottle}
              onChange={(v) => setEditing({ ...editing, tabs: { ...editing.tabs, bottle: v } })}
            />
            <FieldArea
              label='"Delivery" tab copy'
              value={editing.tabs.delivery}
              onChange={(v) => setEditing({ ...editing, tabs: { ...editing.tabs, delivery: v } })}
            />

            <div className="flex gap-4 mt-7 pt-6 border-t border-line">
              <button
                onClick={() => handleSave(editing)}
                className="bg-ink hover:bg-rust transition-colors text-paper text-xs font-bold uppercase tracking-wide px-6 py-3"
              >
                Save product
              </button>
              {!editing._isNew && (
                <button
                  onClick={() => {
                    setEditing(null);
                    handleDelete(editing.slug);
                  }}
                  className="font-mono text-xs text-[#8a2c1e]"
                >
                  Delete this product
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-7 left-1/2 -translate-x-1/2 text-paper font-mono text-[13.5px] px-6 py-3.5 border z-[80] ${
            toast.error ? "bg-[#3a1610] border-[#8a2c1e]" : "bg-ink border-rust-deep"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function FieldText({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="font-mono text-[11px] text-ink/58">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-line py-2 text-[15px] focus:outline-none focus:border-rust"
      />
    </div>
  );
}

function FieldArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 mb-5">
      <label className="font-mono text-[11px] text-ink/58">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-b border-line py-2 text-[15px] focus:outline-none focus:border-rust resize-y"
      />
    </div>
  );
}
