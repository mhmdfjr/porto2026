import { getDailyGalleryImages } from "@/lib/unsplash";
import { GalleryGrid, type GalleryItem } from "./GalleryGrid";

export const GallerySection = async () => {
  const images = await getDailyGalleryImages();

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: images[0].src,
      alt: "Mountain",
      className:
        "col-span-2 row-span-1 md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      src: images[1].src,
      alt: "Coffee Shop",
      className: "col-span-1 row-span-1",
    },
    {
      id: 3,
      src: images[2].src,
      alt: "Book",
      className: "col-span-1 row-span-1",
    },
    {
      id: 4,
      src: images[3].src,
      alt: "Painting",
      className: "col-span-1 row-span-1",
    },
    {
      id: 5,
      src: images[4].src,
      alt: "City",
      className: "col-span-1 row-span-1",
    },
  ];

  return <GalleryGrid items={galleryItems} />;
};
