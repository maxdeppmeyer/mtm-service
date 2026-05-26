import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MTM Möbel Transport Montage",
    short_name: "MTM",
    description: "Umzug, Möbeltransport, Montage und Entrümpelung in Hannover & Umland.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d81c2d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
