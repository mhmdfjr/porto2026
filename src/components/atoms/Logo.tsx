import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    // Bungkus dengan Link agar logo bisa diklik untuk kembali ke Home
    <Link href="/" className="relative z-50 block">
      <Image
        src="/logo.svg" // Next.js otomatis mencari di folder 'public'
        alt="MF Logo"
        // Sesuaikan width dan height dengan aspek rasio gambar logo Anda sebenarnya.
        // Contoh di bawah ini estimasi ukuran agar terlihat pas di navbar.
        width={80}
        height={45}
        priority // Prioritaskan loading karena ini LCP (Largest Contentful Paint) di mobile
        className="object-contain h-10 w-auto md:h-12" // Responsif: tinggi 40px di mobile, 48px di desktop
      />
    </Link>
  );
};
