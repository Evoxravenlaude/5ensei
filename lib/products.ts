export type Sense = "smell" | "touch" | "sound";

export type Format = "eau de parfum" | "candle" | "body oil" | "hand cream";

export interface ProductSize {
  label: string;
  ml?: number;
  g?: number;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  code: number;
  sense: Sense;
  format: Format;
  collection: "atelier" | "field-notes" | "home";
  tagline: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  sizes: ProductSize[];
  tint: string; // hex accent used for vial/jar art
  personalizable: boolean;
  featured?: boolean;
}

export const SENSE_LABEL: Record<Sense, string> = {
  smell: "Smell",
  touch: "Touch",
  sound: "Sound",
};

export const SENSE_COPY: Record<Sense, string> = {
  smell:
    "Fine fragrance, blended to order. Each formula is a study in one raw material pushed past what's comfortable.",
  touch:
    "Oils, creams and balms that carry the same accord onto skin — texture as a second instrument.",
  sound:
    "Candles and home pours named for the quiet they make: a struck match, a room settling at night.",
};

export const products: Product[] = [
  {
    slug: "yuzu-14",
    name: "YUZU 14",
    code: 14,
    sense: "smell",
    format: "eau de parfum",
    collection: "atelier",
    tagline: "A citrus held too long over the flame.",
    description:
      "YUZU 14 starts where most citrus fragrances end: past the initial brightness, into the bitter pith and warm rind. Fourteen raw materials, built around a Japanese yuzu that's been distilled twice to strip out the sweetness and keep the shadow.",
    notes: {
      top: ["yuzu rind", "green shiso", "pink pepper"],
      heart: ["cedar smoke", "fig leaf"],
      base: ["vetiver", "ambrette seed"],
    },
    sizes: [
      { label: "15 ml", ml: 15, price: 98 },
      { label: "50 ml", ml: 50, price: 198 },
      { label: "100 ml", ml: 100, price: 268 },
    ],
    tint: "#A9673A",
    personalizable: true,
    featured: true,
  },
  {
    slug: "sumi-6",
    name: "SUMI 6",
    code: 6,
    sense: "smell",
    format: "eau de parfum",
    collection: "atelier",
    tagline: "Ink, paper, and the room where both are kept.",
    description:
      "Named for sumi ink, ground slow against a stone. Six materials only — we kept subtracting until nothing was left to cut. Reads like a closed library at dusk: dry cedar, wet stone, a trace of soot.",
    notes: {
      top: ["black pepper", "cypress"],
      heart: ["sumi ink accord", "paper"],
      base: ["cedar", "musk"],
    },
    sizes: [
      { label: "15 ml", ml: 15, price: 98 },
      { label: "50 ml", ml: 50, price: 198 },
      { label: "100 ml", ml: 100, price: 268 },
    ],
    tint: "#3A3E3F",
    personalizable: true,
    featured: true,
  },
  {
    slug: "kuromoji-17",
    name: "KUROMOJI 17",
    code: 17,
    sense: "smell",
    format: "eau de parfum",
    collection: "field-notes",
    tagline: "The spice rack of a forest floor.",
    description:
      "Kuromoji is a Japanese spicebush used in old tea ceremonies — camphor-green and peppery. We built seventeen materials around it, tilted toward damp wood and crushed leaves rather than anything sweet.",
    notes: {
      top: ["kuromoji", "juniper"],
      heart: ["birch tar", "clary sage"],
      base: ["oakmoss", "vetiver"],
    },
    sizes: [
      { label: "15 ml", ml: 15, price: 98 },
      { label: "50 ml", ml: 50, price: 198 },
      { label: "100 ml", ml: 100, price: 268 },
    ],
    tint: "#4E5B43",
    personalizable: true,
  },
  {
    slug: "mugi-11",
    name: "MUGI 11",
    code: 11,
    sense: "smell",
    format: "eau de parfum",
    collection: "field-notes",
    tagline: "Toasted barley, malt, and warm skin.",
    description:
      "Mugi — barley — roasted until it smells more like bread crust than grain. Eleven materials, gourmand only at a distance; up close it's closer to a bakery's back door than a dessert.",
    notes: {
      top: ["toasted barley", "cardamom"],
      heart: ["tonka", "malt accord"],
      base: ["sandalwood", "musk"],
    },
    sizes: [
      { label: "15 ml", ml: 15, price: 98 },
      { label: "50 ml", ml: 50, price: 198 },
      { label: "100 ml", ml: 100, price: 268 },
    ],
    tint: "#C97D48",
    personalizable: true,
  },
  {
    slug: "yuzu-14-oil",
    name: "YUZU 14",
    code: 14,
    sense: "touch",
    format: "body oil",
    collection: "atelier",
    tagline: "The same accord, worn closer to the skin.",
    description:
      "A dry-finish body oil carrying the YUZU 14 accord at a lower register — built to sit under fragrance or wear alone on bare skin after a shower.",
    notes: {
      top: ["yuzu rind", "green shiso"],
      heart: ["cedar smoke"],
      base: ["vetiver", "squalane"],
    },
    sizes: [
      { label: "200 ml", ml: 200, price: 78 },
    ],
    tint: "#A9673A",
    personalizable: false,
  },
  {
    slug: "shiso-9-cream",
    name: "SHISO 9",
    code: 9,
    sense: "touch",
    format: "hand cream",
    collection: "field-notes",
    tagline: "Green, peppery, gone in a minute.",
    description:
      "A fast-absorbing hand cream built around green shiso leaf and a whisper of black pepper — nine materials, dry-down only, made to layer under any fragrance without a fight.",
    notes: {
      top: ["shiso leaf", "black pepper"],
      heart: ["white tea"],
      base: ["shea", "musk"],
    },
    sizes: [{ label: "75 ml", ml: 75, price: 42 }],
    tint: "#4E5B43",
    personalizable: false,
  },
  {
    slug: "sumi-6-candle",
    name: "SUMI 6",
    code: 6,
    sense: "sound",
    format: "candle",
    collection: "home",
    tagline: "The sound of a room after everyone's left.",
    description:
      "Poured by hand into a matte stoneware vessel, the SUMI 6 candle carries the ink-and-cedar accord at low heat — a slow burn built for a room that's gone quiet.",
    notes: {
      top: ["cypress"],
      heart: ["sumi ink accord", "paper"],
      base: ["cedar", "musk"],
    },
    sizes: [
      { label: "245 g / 60 hr burn", g: 245, price: 88 },
    ],
    tint: "#3A3E3F",
    personalizable: true,
    featured: true,
  },
  {
    slug: "hiba-15-candle",
    name: "HIBA 15",
    code: 15,
    sense: "sound",
    format: "candle",
    collection: "home",
    tagline: "A cedar sauna, three seconds after the door opens.",
    description:
      "Hiba wood is used to line Japanese bathhouses for its steam-activated scent. This candle chases that exact moment: warm wood, faint water, cold air behind it.",
    notes: {
      top: ["eucalyptus"],
      heart: ["hiba wood", "steam accord"],
      base: ["hinoki", "amber"],
    },
    sizes: [
      { label: "245 g / 60 hr burn", g: 245, price: 88 },
    ],
    tint: "#7A8471",
    personalizable: true,
  },
  {
    slug: "agar-21",
    name: "AGAR 21",
    code: 21,
    sense: "smell",
    format: "eau de parfum",
    collection: "atelier",
    tagline: "Dense, dark, and built to outlast the room.",
    description:
      "Our heaviest formula — twenty-one materials layered around a cultivated agarwood, animalic and resinous. Wears close and lasts long; this is the one people ask about.",
    notes: {
      top: ["saffron", "black tea"],
      heart: ["agarwood", "rose absolute"],
      base: ["labdanum", "leather accord"],
    },
    sizes: [
      { label: "15 ml", ml: 15, price: 108 },
      { label: "50 ml", ml: 50, price: 228 },
      { label: "100 ml", ml: 100, price: 308 },
    ],
    tint: "#5C3A2E",
    personalizable: true,
    featured: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySense(sense: Sense) {
  return products.filter((p) => p.sense === sense);
}

export function getProductsByCollection(collection: Product["collection"]) {
  return products.filter((p) => p.collection === collection);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}
