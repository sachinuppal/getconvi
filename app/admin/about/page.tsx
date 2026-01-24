"use client";

import { aboutContent } from "@/lib/data/about";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminAboutPage() {
    const [data, setData] = useState(aboutContent);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/cms/about", {
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
                    <h2 className="text-2xl font-bold">About Page</h2>
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

                    {/* Mission Section */}
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <h3 className="font-bold border-b pb-2 mb-4">Mission</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    value={data.mission.title}
                                    onChange={(e) => setData({ ...data, mission: { ...data.mission, title: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-black focus:border-black"
                                    rows={3}
                                    value={data.mission.description}
                                    onChange={(e) => setData({ ...data, mission: { ...data.mission, description: e.target.value } })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="bg-white border rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="font-bold">Team</h3>
                            <button
                                onClick={() => setData({ ...data, team: [...data.team, { name: "New Member", role: "Role", bio: "Bio" }] })}
                                className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                            >
                                <Plus className="w-3 h-3" /> Add Member
                            </button>
                        </div>

                        <div className="space-y-6">
                            {data.team.map((member, i) => (
                                <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded relative group">
                                    <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Name</label>
                                                <input
                                                    className="w-full p-2 text-sm border border-gray-200 rounded"
                                                    value={member.name}
                                                    onChange={(e) => {
                                                        const newTeam = [...data.team];
                                                        newTeam[i].name = e.target.value;
                                                        setData({ ...data, team: newTeam });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold text-gray-500 mb-1">Role</label>
                                                <input
                                                    className="w-full p-2 text-sm border border-gray-200 rounded"
                                                    value={member.role}
                                                    onChange={(e) => {
                                                        const newTeam = [...data.team];
                                                        newTeam[i].role = e.target.value;
                                                        setData({ ...data, team: newTeam });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1">Bio</label>
                                            <textarea
                                                className="w-full p-2 text-sm border border-gray-200 rounded"
                                                rows={2}
                                                value={member.bio}
                                                onChange={(e) => {
                                                    const newTeam = [...data.team];
                                                    newTeam[i].bio = e.target.value;
                                                    setData({ ...data, team: newTeam });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newTeam = data.team.filter((_, idx) => idx !== i);
                                            setData({ ...data, team: newTeam });
                                        }}
                                        className="text-red-400 hover:text-red-600 p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
