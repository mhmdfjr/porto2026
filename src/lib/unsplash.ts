const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const FALLBACK_IMAGE =
  "https://lgklimjczxflxpmtjsoi.supabase.co/storage/v1/object/public/porto/nature10.jpg";

export async function getDailyUnsplashImage(query: string): Promise<string> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn(
      "UNSPLASH_ACCESS_KEY belum di-set di environment variable, memakai gambar fallback"
    );
    return FALLBACK_IMAGE;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query
      )}&orientation=squarish&content_filter=high`,
      {
        headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
        next: { revalidate: 60 * 60 * 24 },
      }
    );

    if (!res.ok) {
      console.error(`Unsplash API error (${res.status}) untuk query "${query}"`);
      return FALLBACK_IMAGE;
    }

    const data = await res.json();
    return data?.urls?.full ?? data?.urls?.regular ?? FALLBACK_IMAGE;
  } catch (error) {
    console.error(`Gagal mengambil gambar Unsplash untuk "${query}":`, error);
    return FALLBACK_IMAGE;
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
    keywords.map((keyword) => getDailyUnsplashImage(keyword))
  );

  return keywords.map((keyword, i) => ({
    keyword,
    src: results[i],
  }));
}