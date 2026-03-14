import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dolcevilla Studio",
    short_name: "Dolcevilla",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f1eb",
    theme_color: "#191612",
  };
}
