import { mediaConfig } from "./config";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const GALLERY_FALLBACK_IMAGE = mediaConfig.galleryFallback;

const FETCH_TIMEOUT_MS = 10_000;

export async function getDailyUnsplashImage(query: string): Promise<string> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn(
      "UNSPLASH_ACCESS_KEY belum di-set di environment variable, memakai gambar fallback",
    );
    return GALLERY_FALLBACK_IMAGE;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query,
      )}&orientation=squarish&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    );

    if (!res.ok) {
      console.error(
        `Unsplash API error (${res.status}) untuk query "${query}"`,
      );
      return GALLERY_FALLBACK_IMAGE;
    }

    const data = await res.json();
    return data?.urls?.regular ?? data?.urls?.small ?? GALLERY_FALLBACK_IMAGE;
  } catch (error) {
    console.error(`Gagal mengambil gambar Unsplash untuk "${query}":`, error);
    return GALLERY_FALLBACK_IMAGE;
  }
}

export async function getDailyGalleryImages() {
  const keywords = [
    "mountain",
    "forest",
    "coffee shop",
    "book",
    "painting",
    "art gallery",
    "city",
    "ocean",
  ] as const;

  const results = await Promise.all(
    keywords.map((keyword) => getDailyUnsplashImage(keyword)),
  );

  return keywords.map((keyword, i) => ({
    keyword,
    src: results[i],
  }));
}

const HERO_IMAGE_COUNT = 5;

const QUOTE_QUERIES = ["art", "architecture", "cafe"] as const;

export async function getQuoteImages(): Promise<string[]> {
  const results = await Promise.all(
    QUOTE_QUERIES.map((query) => getDailyUnsplashImage(query)),
  );
  return results;
}

export async function getSkillImage(): Promise<string> {
  return getDailyUnsplashImage("nature");
}

export async function getHeroGalleryImages(): Promise<string[]> {
  const fallback = Array(HERO_IMAGE_COUNT).fill(
    mediaConfig.heroImage,
  ) as string[];

  if (!UNSPLASH_ACCESS_KEY) {
    console.warn(
      "UNSPLASH_ACCESS_KEY belum di-set di environment variable, memakai gambar fallback",
    );
    return fallback;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?count=${HERO_IMAGE_COUNT}&query=${encodeURIComponent(
        "mountain landscape",
      )}&orientation=landscape&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        next: { revalidate: 60 * 60 * 24 },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    );

    if (!res.ok) {
      console.error(`Unsplash API error (${res.status}) untuk hero images`);
      return fallback;
    }

    const data: unknown = await res.json();
    const list = Array.isArray(data) ? data : [data];
    const urls = list
      .map((item) => {
        const raw =
          item && typeof item === "object"
            ? (item as { urls?: { raw?: string } }).urls?.raw
            : undefined;
        return raw ? `${raw}&w=1920&q=75&fm=webp&fit=crop` : undefined;
      })
      .filter((url): url is string => Boolean(url));

    return urls.length > 0 ? urls : fallback;
  } catch (error) {
    console.error("Gagal mengambil hero images Unsplash:", error);
    return fallback;
  }
}
