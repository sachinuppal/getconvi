"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insights } from "@/lib/data/insights";

const allInsights = Object.values(insights);
const categories = ["All", "Essay", "Playbook", "System"];

export default function InsightGrid() {
    const [activeCat, setActiveCat] = useState("All");

    const filtered = activeCat === "All"
        ? allInsights
        : allInsights.filter(i => i.category === activeCat);

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">Insights.</h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mb-16">
                    Thinking in systems. Unconventional wisdom from the trenches of building and operating companies.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCat === cat ? "bg-black text-white" : "bg-surface-50 text-gray-500 hover:bg-gray-100"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((post) => (
                        <Link key={post.slug} href={`/insights/${post.slug}`} className="group block h-full flex flex-col justify-between p-8 border border-gray-100 rounded hover:border-gray-300 transition-colors">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-2 py-1 bg-surface-50 text-[10px] font-mono uppercase tracking-widest text-gray-500 rounded">
                                        {post.category}
                                    </span>
                                    <span className="text-xs font-mono text-gray-400">{post.readTime}</span>
                                </div>
                                <h2 className="text-2xl font-heading font-bold leading-tight mb-4 group-hover:text-electric-blue transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:text-electric-blue transition-colors mt-auto">
                                Read Essay <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
