import { MetadataRoute } from "next";
import { capabilities } from "@/lib/data/capabilities";
import { studios } from "@/lib/data/studios";
import { caseStudies } from "@/lib/data/work";
import { insights } from "@/lib/data/insights";

const BASE_URL = "https://getconvi.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/capabilities",
        "/work",
        "/studios",
        "/insights",
        "/connect",
        "/about",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    const capabilityRoutes = Object.keys(capabilities).map((slug) => ({
        url: `${BASE_URL}/capabilities/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    const studioRoutes = Object.keys(studios).map((slug) => ({
        url: `${BASE_URL}/studios/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.9,
    }));

    const workRoutes = Object.keys(caseStudies).map((slug) => ({
        url: `${BASE_URL}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const insightRoutes = Object.keys(insights).map((slug) => ({
        url: `${BASE_URL}/insights/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...routes, ...capabilityRoutes, ...studioRoutes, ...workRoutes, ...insightRoutes];
}
