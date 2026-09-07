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
        "col-start-1 col-span-3 row-start-1 row-span-4 " +
        "md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-2 " +
        "lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:row-span-3",
    },
    {
      id: 2,
      src: images[1].src,
      alt: "Forest",
      className:
        "col-start-4 col-span-3 row-start-1 row-span-2 " +
        "md:col-start-3 md:col-span-2 md:row-start-1 md:row-span-3 " +
        "lg:col-start-4 lg:col-span-3 lg:row-start-1 lg:row-span-3",
    },
    {
      id: 3,
      src: images[2].src,
      alt: "Coffee Shop",
      className:
        "col-start-4 col-span-3 row-start-3 row-span-2 " +
        "md:col-start-5 md:col-span-2 md:row-start-1 md:row-span-4 " +
        "lg:col-start-7 lg:col-span-2 lg:row-start-1 lg:row-span-3",
    },
    {
      id: 4,
      src: images[3].src,
      alt: "Book",
      className:
        "col-start-1 col-span-6 row-start-5 row-span-3 " +
        "md:col-start-1 md:col-span-2 md:row-start-3 md:row-span-3 " +
        "lg:col-start-9 lg:col-span-4 lg:row-start-1 lg:row-span-3",
    },
    {
      id: 5,
      src: images[4].src,
      alt: "Painting",
      className:
        "col-start-1 col-span-3 row-start-8 row-span-2 " +
        "md:col-start-3 md:col-span-2 md:row-start-4 md:row-span-3 " +
        "lg:col-start-1 lg:col-span-2 lg:row-start-4 lg:row-span-3",
    },
    {
      id: 6,
      src: images[5].src,
      alt: "Art Gallery",
      className:
        "col-start-4 col-span-3 row-start-8 row-span-3 " +
        "md:col-start-5 md:col-span-2 md:row-start-5 md:row-span-2 " +
        "lg:col-start-3 lg:col-span-5 lg:row-start-4 lg:row-span-3",
    },
    {
      id: 7,
      src: images[6].src,
      alt: "City",
      className:
        "col-start-1 col-span-3 row-start-10 row-span-3 " +
        "md:col-start-1 md:col-span-2 md:row-start-6 md:row-span-3 " +
        "lg:col-start-8 lg:col-span-2 lg:row-start-4 lg:row-span-3",
    },
    {
      id: 8,
      src: images[7].src,
      alt: "Ocean",
      className:
        "col-start-4 col-span-3 row-start-11 row-span-2 " +
        "md:col-start-3 md:col-span-4 md:row-start-7 md:row-span-2 " +
        "lg:col-start-10 lg:col-span-3 lg:row-start-4 lg:row-span-3",
    },
  ];

  return <GalleryGrid items={galleryItems} />;
};
