import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { platforms } from "@/lib/data/platforms";
import StudioTemplate from "@/components/studios/StudioTemplate";
import { Studio } from "@/types/cms";

// Generate paths for all keys in platforms object
export async function generateStaticParams() {
    return Object.keys(platforms).map((slug) => ({
        slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

// Use async/await for dynamic params (Next.js 15 pattern)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const platform = platforms[slug as keyof typeof platforms];

    if (!platform) {
        return {
            title: "Studio Not Found",
        };
    }

    return {
        title: platform.seo.meta_title || `${platform.name} | Getconvi Studio`,
        description: platform.seo.meta_description || platform.short_description,
    };
}

export default async function StudioPage({ params }: Props) {
    const { slug } = await params;
    const platform = platforms[slug as keyof typeof platforms];

    if (!platform) {
        notFound();
    }

    // Cast Platform to Studio as they share the structure required by the template components
    // and both adhere to the CMS schema patterns.
    // We need to map incompatible fields:
    // 1. Platform uses 'how_it_works' -> Studio uses 'flow'
    // 2. Platform missing 'cta' object -> Map from hero/footer

    // @ts-ignore - Constructing the adapter object
    const adaptedStudio: Studio = {
        ...platform,
        flow: platform.how_it_works,
        audience: {
            // @ts-ignore - Platform has not_for, Studio expects notFor
            for: platform.audience.for,
            notFor: platform.audience.not_for
        },
        hero: {
            ...platform.hero,
            primaryCta: platform.hero.primary_cta?.label || "Get Started",
            secondaryCta: platform.hero.secondary_cta?.label || "Learn More",
            microcopy: platform.hero.microcopy || ""
        },
        cta: {
            headline: platform.footer?.tagline || "Ready to build?",
            primaryCta: platform.hero.primary_cta?.label || "Get Started",
            secondaryCta: platform.hero.secondary_cta?.label || "Learn More",
            microcopy: platform.hero.microcopy || "Built by Getconvi."
        }
    };

    return <StudioTemplate studio={adaptedStudio} />;
}
