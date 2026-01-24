"use client";

import { siteSettings } from "@/lib/data/site";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function AdminSitePage() {
    const [settings, setSettings] = useState(siteSettings);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/cms/site", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            alert("Settings saved!");
        } catch (e) {
            alert("Error saving settings");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="p-12">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">General Information</h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                            <input
                                type="text"
                                value={settings.brand_name}
                                onChange={e => setSettings({ ...settings, brand_name: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                            <input
                                type="text"
                                value={settings.brand_tagline}
                                onChange={e => setSettings({ ...settings, brand_tagline: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Legal Name</label>
                            <input
                                type="text"
                                value={settings.company_info.legal_name}
                                onChange={e => setSettings({ ...settings, company_info: { ...settings.company_info, legal_name: e.target.value } })}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
