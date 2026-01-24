import { Capability, CategorySlug } from "@/types/cms";
import capabilitiesData from "@/content/capabilities.json";

export const capabilities: Capability[] = (capabilitiesData as any[]).map(cap => ({
    ...cap,
    slug: cap.slug as CategorySlug
}));
