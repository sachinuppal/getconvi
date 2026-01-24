"use client";

import { platforms } from "@/lib/data/platforms";
import Link from "next/link";
import { ArrowLeft, Edit2, Plus } from "lucide-react";
import { useState } from "react";

export default function AdminPlatformsPage() {
    const list = Object.values(platforms);

    return (
        <main className="p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">All Platforms ({list.length})</h2>
                    <Link href="/admin/platforms/new" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        New Platform
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Capabilities</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {list.map((platform) => (
                                <tr key={platform.slug} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{platform.name}</td>
                                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{platform.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 capitalize">
                                            {platform.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex gap-1">
                                            {platform.capabilities.map(c => (
                                                <span key={c} className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                                                    {c}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/platforms/${platform.slug}`} className="text-electric-blue hover:text-blue-700 font-medium inline-flex items-center gap-1">
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {list.length === 0 && (
                        <div className="p-12 text-center text-gray-500">
                            No platforms found.
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
