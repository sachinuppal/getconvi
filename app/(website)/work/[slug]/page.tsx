import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { caseStudies } from "@/lib/data/work";
import CaseStudyTemplate from "@/components/work/CaseStudyTemplate";

// Generate paths for all keys in caseStudies object
export async function generateStaticParams() {
    return Object.keys(caseStudies).map((slug) => ({
        slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const data = caseStudies[slug];

    if (!data) {
        return {
            title: "Work Not Found",
        };
    }

    return {
        title: `${data.client} | Getconvi Work`,
        description: data.hero.outcome,
        openGraph: {
            title: `${data.client} Case Study`,
            description: data.hero.outcome,
            type: "article",
        }
    };
}

export default async function CaseStudyPage({ params }: Props) {
    const { slug } = await params;
    const data = caseStudies[slug];

    if (!data) {
        notFound();
    }

    return <CaseStudyTemplate data={data} />;
}
