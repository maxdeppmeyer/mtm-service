import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MTM Möbel Transport Montage",
    short_name: "MTM",
    description: "Umzug, Möbeltransport, Montage und Entrümpelung in Hannover und Umgebung.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#102b43",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
