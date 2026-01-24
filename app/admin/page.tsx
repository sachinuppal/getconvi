"use client";

import Link from "next/link";
import { ArrowRight, Layout, Settings, Layers, Box, PenTool } from "lucide-react";
import { siteSettings } from "@/lib/data/site";

export default function AdminPage() {
    return (
        <main className="p-12">
            <div className="max-w-4xl">
                <h2 className="text-2xl font-bold mb-2">Welcome back.</h2>
                <p className="text-gray-500 mb-12">Manage the portfolio content and generate assets for {siteSettings.brand_name}.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/admin/studio" className="group block p-8 bg-gradient-to-br from-electric-blue/10 to-transparent border border-electric-blue/20 rounded-xl hover:shadow-lg hover:border-electric-blue/40 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="p-3 bg-white rounded-lg shadow-sm">
                                <PenTool className="w-6 h-6 text-electric-blue" />
                            </span>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-electric-blue transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">AI Asset Studio</h3>
                        <p className="text-sm text-gray-600">Generate copy, images, and videos using Gemini & Veo.</p>
                    </Link>

                    <Link href="/admin/platforms" className="group block p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-gray-300 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="p-3 bg-gray-50 rounded-lg">
                                <Box className="w-6 h-6 text-gray-600" />
                            </span>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Edit Platforms</h3>
                        <p className="text-sm text-gray-600">Update the 20 portfolio companies, add capabilities, and SEO.</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
