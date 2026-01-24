"use client";

import { capabilities } from "@/lib/data/capabilities";
import Link from "next/link";
import { ArrowLeft, Edit2 } from "lucide-react";

export default function AdminCapabilitiesPage() {
    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Capabilities ({capabilities.length})</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {capabilities.map(cap => (
                        <div key={cap.slug} className="bg-white border border-gray-200 rounded-lg p-6 flex items-start justify-between hover:shadow-sm transition-shadow">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg">{cap.title}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider 
                                        ${cap.badge_style === 'pink' ? 'bg-pink-100 text-pink-700' :
                                            cap.badge_style === 'blue' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'}`}>
                                        {cap.slug}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm max-w-lg mb-4">{cap.one_liner}</p>

                                <div className="flex gap-2">
                                    {cap.applied_in.map(p => (
                                        <span key={p} className="text-xs text-gray-400 font-mono">
                                            {p}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button className="text-gray-400 hover:text-black p-2">
                                <Edit2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
