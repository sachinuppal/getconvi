import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { capabilities } from "@/lib/data/capabilities";
import CapabilityTemplate from "@/components/capabilities/CapabilityTemplate";

// Generate paths for all keys in capabilities object
export async function generateStaticParams() {
    return Object.keys(capabilities).map((slug) => ({
        slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function CapabilityPage({ params }: Props) {
    const { slug } = await params;
    const data = capabilities.find(c => c.slug === slug);

    if (!data) {
        notFound();
    }

    return <CapabilityTemplate data={data} />;
}
