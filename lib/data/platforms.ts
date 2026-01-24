import { Platform } from "@/types/cms";
import platformsData from "@/content/platforms.json";

export const platforms: Record<string, Platform> = (platformsData as Platform[]).reduce((acc, platform) => {
    acc[platform.slug] = platform;
    return acc;
}, {} as Record<string, Platform>);
