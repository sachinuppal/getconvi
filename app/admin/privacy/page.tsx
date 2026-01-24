"use client";

import { legal } from "@/lib/data/legal";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function AdminPrivacyPage() {
    const [data, setData] = useState(legal.privacy);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/cms/legal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "privacy", data })
            });
            alert("Saved successfully!");
        } catch (e) {
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Privacy Policy</h2>
                    <div className="flex gap-2">
                        <input
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                            value={data.lastUpdated}
                            onChange={(e) => setData({ ...data, lastUpdated: e.target.value })}
                            placeholder="Last Updated"
                        />
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-black text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Content (Markdown)</label>
                        <textarea
                            className="w-full h-96 p-4 bg-gray-50 border border-gray-200 rounded font-mono text-sm focus:ring-black focus:border-black"
                            value={data.content}
                            onChange={(e) => setData({ ...data, content: e.target.value })}
                        />
                    </div>
                    <div className="text-xs text-gray-500">
                        Supports standard Markdown formatting.
                    </div>
                </div>
            </div>
        </main>
    );
}
