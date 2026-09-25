export type Quote = {
  text: string;
  author: string;
  source?: string;
};

const API_URL = "https://dummyjson.com/quotes/random";

/**
 * Live quote from DummyJSON. Cached for an hour on the server so the whole
 * site shares one request per hour. Returns null on any failure so callers
 * can fall back to curated quotes.
 */
export async function getLiveQuote(): Promise<Quote | null> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data: { quote?: string; author?: string } = await res.json();
    if (!data.quote || !data.author) return null;

    return {
      text: data.quote,
      author: data.author,
    };
  } catch {
    return null;
  }
}

const FALLBACK_QUOTES: Quote[] = [
  {
    text: "If you don’t take risks, you can’t create a future.",
    author: "Monkey D. Luffy",
    source: "One Piece",
  },
  {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    text: "The world isn’t perfect. But it’s there for us, doing the best it can.",
    author: "Roy Mustang",
    source: "Fullmetal Alchemist: Brotherhood",
  },
  {
    text: "Whether you think you can, or you think you can’t — you’re right.",
    author: "Henry Ford",
  },
  {
    text: "Fall seven times, stand up eight.",
    author: "Japanese Proverb",
  },
];

/**
 * Builds the rotation pool: the live DummyJSON quote first (when available),
 * followed by curated fallbacks so the section always has something to show.
 */
export async function getQuotes(): Promise<Quote[]> {
  const live = await getLiveQuote();
  return [...(live ? [live] : []), ...FALLBACK_QUOTES];
}
