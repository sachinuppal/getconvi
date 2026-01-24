"use client";

import { insights } from "@/lib/data/insights";
import Link from "next/link";
import { ArrowLeft, Edit2, Plus } from "lucide-react";

export default function AdminInsightsPage() {
    const list = Object.values(insights);

    return (
        <main className="p-12">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Posts ({list.length})</h2>
                    <Link href="/admin/insights/new" className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        New Post
                    </Link>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {list.map((post) => (
                                <tr key={post.slug} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{post.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/insights/${post.slug}`} className="text-electric-blue hover:text-blue-700 font-medium inline-flex items-center gap-1">
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
