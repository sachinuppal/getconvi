import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { insights } from "@/lib/data/insights";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// In a real app, use react-markdown. Here we render raw text with simple styling.

export async function generateStaticParams() {
    return Object.keys(insights).map((slug) => ({
        slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = insights[slug];

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} | Getconvi Insights`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: ["Getconvi Team"]
        }
    };
}

export default async function InsightPage({ params }: Props) {
    const { slug } = await params;
    const post = insights[slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-black mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Insights
                </Link>

                <span className="block font-mono text-xs uppercase tracking-widest text-electric-blue mb-4">
                    {post.category} — {post.date}
                </span>

                <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-8 leading-tight">
                    {post.title}
                </h1>

                <div className="prose prose-lg prose-gray max-w-none">
                    {/* 
                   Simulating markdown rendering by splitting on newlines for now.
                   In production, install 'react-markdown' and '@tailwindcss/typography' 
                */}
                    <div className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
                        {post.content.replace(/^#\s.*\n/gm, '')} {/* Remove H1 from content as we rendered it above */}
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Written by Getconvi Team</span>
                    <span>{post.readTime}</span>
                </div>
            </div>
        </div>
    );
}
