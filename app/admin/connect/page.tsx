"use client";

import { connectContent } from "@/lib/data/connect";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function AdminConnectPage() {
    const [data, setData] = useState(connectContent);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/cms/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
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
                    <h2 className="text-2xl font-bold">Connect Page</h2>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-black text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Hero Section */}
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="font-bold border-b pb-2 mb-4">Hero Section</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    value={data.hero.title}
                                    onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    rows={3}
                                    value={data.hero.subtitle}
                                    onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="font-bold border-b pb-2 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    value={data.contact_info.email}
                                    onChange={(e) => setData({ ...data, contact_info: { ...data.contact_info, email: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    value={data.contact_info.address}
                                    onChange={(e) => setData({ ...data, contact_info: { ...data.contact_info, address: e.target.value } })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                        value={data.contact_info.socials.linkedin}
                                        onChange={(e) => setData({ ...data, contact_info: { ...data.contact_info, socials: { ...data.contact_info.socials, linkedin: e.target.value } } })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Twitter</label>
                                    <input
                                        className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                        value={data.contact_info.socials.twitter}
                                        onChange={(e) => setData({ ...data, contact_info: { ...data.contact_info, socials: { ...data.contact_info.socials, twitter: e.target.value } } })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
