import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-black px-4 text-center text-white">
      <p className="font-gotham text-6xl font-black text-brand-red">404</p>
      <h1 className="text-xl font-semibold">Halaman tidak ditemukan</h1>
      <p className="max-w-md text-sm text-neutral-400">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="rounded bg-white px-6 py-2 font-semibold text-black"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
