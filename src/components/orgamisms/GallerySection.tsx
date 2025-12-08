import React from "react";
import Image from "next/image";

// Tipe data untuk item galeri
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  // Class untuk mengatur ukuran grid (Bento Layout)
  className: string;
}

// Data Dummy dengan konfigurasi Grid agar mirip referensi
const galleryItems: GalleryItem[] = [
  // --- BARIS 1 ---
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop", // Tas Oranye
    alt: "Hand holding bag",
    className: "md:col-span-1 md:row-span-1", // Kotak Kecil
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", // Wanita Baju Pink
    alt: "Fashion model pink",
    className: "md:col-span-1 md:row-span-1", // Kotak Kecil
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop", // Vas Bunga
    alt: "Vases collection",
    className: "md:col-span-2 md:row-span-1", // Kotak Lebar (Wide)
  },
  // --- BIG ITEM (KANAN) ---
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop", // Orang Duduk Background Merah
    alt: "Red background editorial",
    className: "md:col-span-2 md:row-span-2", // Kotak Besar (Big Square)
  },
  // --- BARIS 2 & 3 (Campuran) ---
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop", // Sepatu Hijau
    alt: "Green shoes",
    className: "md:col-span-1 md:row-span-2", // Kotak Tinggi (Tall)
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop", // Couple Putih
    alt: "Couple standing",
    className: "md:col-span-1 md:row-span-1", // Kotak Kecil
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", // Couple Back to Back
    alt: "Couple back to back",
    className: "md:col-span-1 md:row-span-1", // Kotak Kecil
  },
];

export const GallerySection = () => {
  return (
    <section
      id="gallery"
      className="relative bg-brand-yellow py-10 px-6 md:px-12 w-full overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- Header --- */}
        <h2 className="font-gotham w-full text-end font-black text-brand-red text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-8 md:mb-10">
          Gallery
        </h2>

        <div className="transition-all hover:rotate-45 duration-500 absolute top-10 left-8 md:left-16 select-none">
          <Image
            src="/sun-red.svg"
            alt="Decorative Sun"
            width={100}
            height={100}
            className="animate-spin-slow object-contain w-18 h-18 md:w-20 md:h-20 lg:w-25 lg:h-25"
          />
        </div>
        {/* --- BENTO GRID SYSTEM --- */}
        {/* Mobile: grid-cols-1 (Tumpuk ke bawah)
            Tablet: grid-cols-2 (2 Kolom)
            Desktop: grid-cols-4 (4 Kolom - Bento Style)
            auto-rows: Tinggi baris dasar (200px di mobile, 250px di desktop)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden bg-brand-red/10 ${item.className}`}
            >
              {/* Overlay Hover Effect (Opsional) */}
              <div className="absolute inset-0 bg-brand-red/0 group-hover:bg-brand-red/20 transition-colors duration-300 z-10" />

              {/* Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
