import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png" },
    ],
  };
}
