import type { ArtKind, Product } from "@/lib/catalog";

/**
 * Stand-in packaging artwork drawn in the brand colours. Replace with real
 * product photography (see the notes in the README) and keep the same aspect.
 */

const PALETTE = {
  magenta: { label: "#D42A7E", label2: "#8E1F7A", ink: "#3B0E33" },
  violet: { label: "#7B2FBE", label2: "#D42A7E", ink: "#2A0F45" },
  rose: { label: "#E8749A", label2: "#B63C75", ink: "#5A1B3B" },
  mint: { label: "#5FB38F", label2: "#2F7D5E", ink: "#17402F" },
  ink: { label: "#2B2530", label2: "#D42A7E", ink: "#0F0D12" },
} as const;

function splitLabel(name: string, max = 13) {
  const words = name.replace(/[&,!]/g, "").split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > max && current) {
      lines.push(current);
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function Pouch({ product, dark }: { product: Product; dark: boolean }) {
  const c = PALETTE[product.accent];
  const body = dark ? "#1B1A1F" : "#F4F1F5";
  const lines = splitLabel(product.name);
  return (
    <g>
      <defs>
        <linearGradient id={`g-${product.slug}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.label} />
          <stop offset="1" stopColor={c.label2} />
        </linearGradient>
        <linearGradient id={`s-${product.slug}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      {/* pouch body */}
      <path
        d="M52 34 Q52 22 66 22 L134 22 Q148 22 148 34 L154 232 Q154 244 142 244 L58 244 Q46 244 46 232 Z"
        fill={body}
      />
      {/* heat seal ridge */}
      <path d="M52 34 Q100 40 148 34" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="2" />
      {/* label */}
      <rect x="58" y="92" width="84" height="112" rx="5" fill={`url(#g-${product.slug})`} />
      <rect x="58" y="92" width="84" height="112" rx="5" fill={`url(#s-${product.slug})`} />
      <text x="100" y="118" textAnchor="middle" fontFamily="var(--font-script)" fontSize="19" fill="#fff">
        Kitty Karma
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x="100"
          y={150 + i * 15}
          textAnchor="middle"
          fontFamily="var(--font-sans)"
          fontWeight="700"
          fontSize="11.5"
          letterSpacing="0.6"
          fill="#fff"
        >
          {line.toUpperCase()}
        </text>
      ))}
      {/* pouch highlight */}
      <path d="M62 40 Q60 130 62 226" fill="none" stroke="#fff" strokeOpacity={dark ? "0.12" : "0.7"} strokeWidth="4" strokeLinecap="round" />
      <path d="M46 232 Q46 244 58 244 L142 244 Q154 244 154 232" fill={c.ink} fillOpacity="0.08" />
    </g>
  );
}

function Tub({ product }: { product: Product }) {
  const c = PALETTE[product.accent];
  return (
    <g>
      <defs>
        <linearGradient id={`t-${product.slug}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.6" stopColor="#F3EFF3" />
          <stop offset="1" stopColor="#D8D1DA" />
        </linearGradient>
      </defs>
      <rect x="54" y="92" width="92" height="132" rx="10" fill={`url(#t-${product.slug})`} />
      <ellipse cx="100" cy="92" rx="46" ry="11" fill="#FFFFFF" />
      <rect x="54" y="60" width="92" height="36" rx="8" fill={c.label} />
      <rect x="54" y="60" width="92" height="36" rx="8" fill="#000" fillOpacity="0.1" />
      <rect x="66" y="128" width="68" height="62" rx="6" fill={c.label} fillOpacity="0.92" />
      <text x="100" y="150" textAnchor="middle" fontFamily="var(--font-script)" fontSize="15" fill="#fff">
        Kitty Karma
      </text>
      <text x="100" y="170" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="10" fill="#fff" letterSpacing="0.6">
        {product.size?.toUpperCase() ?? ""}
      </text>
    </g>
  );
}

function Dropper({ product }: { product: Product }) {
  return (
    <g>
      <defs>
        <linearGradient id={`d-${product.slug}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9A24E" />
          <stop offset="0.5" stopColor="#B8691F" />
          <stop offset="1" stopColor="#8A4614" />
        </linearGradient>
      </defs>
      {/* pipette */}
      <rect x="92" y="18" width="16" height="56" rx="3" fill="#2B2530" />
      <rect x="96" y="70" width="8" height="26" rx="2" fill="#CFC7D2" />
      {/* collar */}
      <rect x="78" y="92" width="44" height="18" rx="3" fill="#1B1A1F" />
      {/* bottle */}
      <rect x="60" y="106" width="80" height="136" rx="16" fill={`url(#d-${product.slug})`} />
      <rect x="60" y="106" width="80" height="136" rx="16" fill="#fff" fillOpacity="0.05" />
      {/* label */}
      <rect x="70" y="150" width="60" height="70" rx="4" fill="#FFF7EC" />
      <text x="100" y="176" textAnchor="middle" fontFamily="var(--font-script)" fontSize="13" fill="#B63C75">
        Kitty Karma
      </text>
      <text x="100" y="192" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="8" fill="#17402F" letterSpacing="0.5">
        OOPS! NEEM
      </text>
      <text x="100" y="204" textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="700" fontSize="8" fill="#17402F" letterSpacing="0.5">
        OIL
      </text>
      <path d="M72 116 Q70 170 72 232" fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Kit({ product }: { product: Product }) {
  return (
    <g>
      {/* back pouch */}
      <g transform="translate(-34 14) rotate(-7 100 130) scale(0.8)">
        <Pouch product={{ ...product, slug: `${product.slug}-b`, accent: "violet" }} dark={false} />
      </g>
      {/* tub */}
      <g transform="translate(64 80) scale(0.42)">
        <Tub product={{ ...product, slug: `${product.slug}-t`, accent: "rose", size: "Pops" }} />
      </g>
      {/* front pouch */}
      <g transform="translate(36 10) rotate(5 100 130) scale(0.82)">
        <Pouch product={{ ...product, slug: `${product.slug}-f` }} dark={true} />
      </g>
    </g>
  );
}

export function ProductArt({ product, className = "", bare = false }: { product: Product; className?: string; bare?: boolean }) {
  const art: ArtKind = product.art;
  const bg = PALETTE[product.accent];
  return (
    <svg
      viewBox="0 0 200 260"
      role="img"
      aria-label={`${product.name} packaging illustration`}
      className={className}
    >
      <defs>
        <radialGradient id={`bg-${product.slug}`} cx="50%" cy="38%" r="70%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor={bg.label} stopOpacity="0.14" />
        </radialGradient>
      </defs>
      {!bare && <rect width="200" height="260" fill={`url(#bg-${product.slug})`} />}
      <ellipse cx="100" cy="246" rx="62" ry="7" fill="#2B1A2B" fillOpacity="0.14" />
      {art === "pouch" && <Pouch product={product} dark={false} />}
      {art === "pouch-dark" && <Pouch product={product} dark={true} />}
      {art === "tub" && <Tub product={product} />}
      {art === "dropper" && <Dropper product={product} />}
      {art === "kit" && <Kit product={product} />}
    </svg>
  );
}
