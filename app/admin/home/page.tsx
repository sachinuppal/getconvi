"use client";

import { homeContent } from "@/lib/data/home";
import { HomeContent } from "@/types/cms";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useState } from "react";
import AIGeneratorModal from "@/components/admin/AIGeneratorModal";

export default function AdminHomePage() {
    const [data, setData] = useState<HomeContent>(homeContent);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal
    const [aiState, setAiState] = useState({ isOpen: false, type: "text" as any, context: "", initialPrompt: "" });
    const openAI = (type: any, context: string, prompt: string) => setAiState({ isOpen: true, type, context, initialPrompt: prompt });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch("/api/cms/home", {
                method: "POST",
                body: JSON.stringify(data)
            });
            alert("Saved successfully!");
        } catch (e) {
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAIResult = (result: any) => {
        if (aiState.context.includes("Headline Line")) {
            const index = parseInt(aiState.context.split(" ")[2]) - 1;
            const newLines = [...data.hero.headline_lines];
            newLines[index] = result;
            setData({ ...data, hero: { ...data.hero, headline_lines: newLines } });
        } else if (aiState.context === "Subline") {
            setData({ ...data, hero: { ...data.hero, subline: result } });
        } else if (aiState.context.includes("Manifesto Line")) {
            const index = parseInt(aiState.context.split(" ")[2]) - 1;
            const newLines = [...data.manifesto];
            newLines[index] = result;
            setData({ ...data, manifesto: newLines });
        }
    };

    return (
        <div className="bg-gray-50">
            <main className="p-12">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Hero Section */}
                    <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                        <h3 className="font-bold border-b pb-2 mb-4">Hero Section</h3>
                        <div className="space-y-4">
                            {data.hero.headline_lines.map((line, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="label">Headline Line {i + 1}</label>
                                        <button onClick={() => openAI("text", `Headline Line ${i + 1}`, "Write a powerful 2-3 word headline segment")}><Sparkles className="w-3 h-3 text-electric-blue" /></button>
                                    </div>
                                    <input className="input font-heading font-bold text-lg" value={line} onChange={(e) => {
                                        const newLines = [...data.hero.headline_lines];
                                        newLines[i] = e.target.value;
                                        setData({ ...data, hero: { ...data.hero, headline_lines: newLines } });
                                    }} />
                                </div>
                            ))}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="label">Subline</label>
                                    <button onClick={() => openAI("text", "Subline", "Write a subline explaining we build operating companies, not decks.")}><Sparkles className="w-3 h-3 text-electric-blue" /></button>
                                </div>
                                <textarea className="input" rows={2} value={data.hero.subline} onChange={(e) => setData({ ...data, hero: { ...data.hero, subline: e.target.value } })} />
                            </div>
                        </div>
                    </div>

                    {/* Proof Strip */}
                    <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                        <h3 className="font-bold border-b pb-2 mb-4">Proof Strip</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {data.proof_strip.map((stat, i) => (
                                <div key={i} className="space-y-2 p-3 bg-gray-50 rounded">
                                    <input className="input text-xs" value={stat.label} onChange={(e) => {
                                        const newStats = [...data.proof_strip];
                                        newStats[i].label = e.target.value;
                                        setData({ ...data, proof_strip: newStats });
                                    }} />
                                    <input className="input font-mono font-bold" value={stat.value} onChange={(e) => {
                                        const newStats = [...data.proof_strip];
                                        newStats[i].value = e.target.value;
                                        setData({ ...data, proof_strip: newStats });
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Manifesto */}
                    <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                        <h3 className="font-bold border-b pb-2 mb-4">Manifesto</h3>
                        <div className="space-y-3">
                            {data.manifesto.map((line, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="label text-xs">Line {i + 1}</label>
                                        <button onClick={() => openAI("text", `Manifesto Line ${i + 1}`, "Write a punched manifesto line about building software systems.")}><Sparkles className="w-3 h-3 text-electric-blue" /></button>
                                    </div>
                                    <input className="input" value={line} onChange={(e) => {
                                        const newLines = [...data.manifesto];
                                        newLines[i] = e.target.value;
                                        setData({ ...data, manifesto: newLines });
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end pt-8">
                        <button onClick={handleSave} disabled={isSaving} className="px-8 py-3 bg-black text-white rounded-md font-bold hover:bg-gray-800">
                            {isSaving ? "Saving..." : "Save Home Page"}
                        </button>
                    </div>

                </div>
            </main>

            <AIGeneratorModal
                isOpen={aiState.isOpen}
                onClose={() => setAiState({ ...aiState, isOpen: false })}
                onGenerate={handleAIResult}
                type={aiState.type}
                initialPrompt={aiState.initialPrompt}
                context={aiState.context}
            />
        </div>
    );
}
