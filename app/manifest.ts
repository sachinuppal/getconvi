import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Getconvi",
        short_name: "Getconvi",
        description: "AI-Native Product Execution Partner",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563EB", // Electric Blue
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
