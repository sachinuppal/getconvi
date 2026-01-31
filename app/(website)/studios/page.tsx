"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { platforms } from "@/lib/data/platforms";
import { CategorySlug, Platform } from "@/types/cms";
import { useState } from "react";

const studioList = Object.values(platforms);

const CATEGORIES: (CategorySlug | "All")[] = [
    "All",
    "games",
    "entertainment",
    "technology",
    "communications",
    "operations",
    "voice",
    "integration",
    "networks",
    "growth",
];

export default function StudiosPage() {
    const [selectedCategory, setSelectedCategory] = useState<CategorySlug | "All">("All");

    const filteredStudios = studioList.filter((studio) => {
        if (selectedCategory === "All") return true;
        return studio.capabilities.includes(selectedCategory);
    });

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">Studios.</h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mb-12">
                    Our product labs. Where we build, test, and scale own-IP systems.
                    We don't just advise; we operate.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-black text-white"
                                : "bg-surface-100 text-gray-500 hover:bg-surface-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Studio Grid */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredStudios.map((studio) => (
                        <Link
                            key={studio.slug}
                            href={`/studios/${studio.slug}`}
                            className="group block py-12 px-8 bg-surface-50 border border-surface-200 rounded hover:bg-surface-100 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-8"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    <h2 className="text-3xl font-heading font-medium">{studio.name}</h2>
                                    <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-black text-white rounded-full">Live</span>

                                    {/* Capability Badges */}
                                    <div className="flex gap-2">
                                        {studio.capabilities.map(cat => (
                                            <span key={cat} className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-surface-200 text-gray-600 rounded-full border border-surface-300">
                                                {cat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-electric-blue font-medium mb-1 mt-2">{studio.hero.headline}</p>
                                <p className="text-gray-500 text-sm max-w-xl">{studio.hero.subline}</p>
                            </div>

                            <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors mt-2" />
                        </Link>
                    ))}

                    {filteredStudios.length === 0 && (
                        <div className="py-24 text-center text-gray-400">
                            No studios found for this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
