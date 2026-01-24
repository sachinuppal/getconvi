"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data/work";

const allStudies = Object.values(caseStudies);

// Extract unique filter options
const outcomes = Array.from(new Set(allStudies.map(s => s.tags.outcome)));
const capabilities = Array.from(new Set(allStudies.flatMap(s => s.tags.capability)));

export default function WorkGrid() {
    const [activeOutcome, setActiveOutcome] = useState<string | "all">("all");

    // "GETCONVI" Categories
    const CATEGORIES = [
        "Games", "Entertainment", "Technology", "Communications",
        "Operations", "Networks", "Voice", "Integration"
    ];

    const filtered = useMemo(() => {
        if (activeOutcome === "all") return allStudies;
        return allStudies.filter(s =>
            s.tags.capability.some(c => c.toLowerCase() === activeOutcome.toLowerCase())
        );
    }, [activeOutcome]);

    return (
        <div className="min-h-screen bg-white">
            {/* New Work Hero */}
            <div className="relative h-[50vh] flex items-end pb-12 px-6 bg-black overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url(/cms-uploads/portfolio-montage-mcjxh.jpg)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight text-white mb-4">Work.</h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl">
                        Shipped systems. Real outcomes. This is not a portfolio of screenshots; it's a log of systems built.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-12">
                    <button
                        onClick={() => setActiveOutcome("all")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeOutcome === "all" ? "bg-black text-white" : "bg-surface-50 text-gray-500 hover:bg-gray-100"}`}
                    >
                        All Work
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveOutcome(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeOutcome === cat ? "bg-black text-white" : "bg-surface-50 text-gray-500 hover:bg-gray-100"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filtered.map((study) => {
                        const isMini = !study.context; // Check if full details exist
                        const CardContent = (
                            <div className={`group block h-full bg-surface-50 rounded-lg overflow-hidden min-h-[400px] flex flex-col ${!isMini ? "hover:shadow-xl transition-all duration-300 cursor-pointer" : "opacity-90"}`}>
                                {/* Card Image */}
                                <div className="h-64 bg-gray-200 relative overflow-hidden">
                                    {/* @ts-ignore */}
                                    {study.hero.image ? (
                                        <div
                                            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                            // @ts-ignore
                                            style={{ backgroundImage: `url(${study.hero.image})` }}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 font-mono text-xs uppercase tracking-widest text-center p-4">
                                            {study.client}
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{study.client}</span>
                                            {!isMini && <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />}
                                        </div>
                                        <h2 className="text-2xl font-heading font-medium leading-tight mb-4 group-hover:text-electric-blue transition-colors">
                                            {study.headline}
                                        </h2>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {study.tags.capability.map(cap => (
                                            <span key={cap} className="px-2 py-1 bg-white border border-gray-200 text-[10px] font-mono uppercase tracking-widest text-gray-500 rounded">
                                                {cap}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );

                        return isMini ? (
                            <div key={study.slug}>{CardContent}</div>
                        ) : (
                            <Link key={study.slug} href={`/work/${study.slug}`}>
                                {CardContent}
                            </Link>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
