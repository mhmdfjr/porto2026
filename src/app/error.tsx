"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-black px-4 text-center text-white">
      <h1 className="text-xl font-semibold">Terjadi kesalahan</h1>
      <p className="max-w-md text-sm text-neutral-400">
        Muat ulang halaman atau coba lagi dalam beberapa saat.
      </p>
      <button
        onClick={reset}
        className="rounded bg-white px-6 py-2 font-semibold text-black"
      >
        Coba lagi
      </button>
    </main>
  );
}
