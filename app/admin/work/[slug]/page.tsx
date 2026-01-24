"use client";

import { caseStudies } from "@/lib/data/work";
import { CaseStudy } from "@/types/cms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { use } from "react";
import AIGeneratorModal from "@/components/admin/AIGeneratorModal";

const defaultStudy: CaseStudy = {
    slug: "", client: "", headline: "",
    tags: { capability: [], industry: "", outcome: "" },
    hero: { title: "", outcome: "", image: undefined },
    context: { paragraph: "", constraints: [] },
    problem: { core: "" },
    build: [], flow: [], results: [],
    transformation: { before: [], after: [] },
    learnings: []
};

export default function WorkEditorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const isNew = slug === "new";

    const [data, setData] = useState<CaseStudy>(defaultStudy);
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal State
    const [aiState, setAiState] = useState({
        isOpen: false, type: "text" as any, context: "", initialPrompt: ""
    });

    useEffect(() => {
        if (!isNew && caseStudies[slug]) {
            setData(caseStudies[slug]);
            setIsLoading(false);
        } else if (!isNew) {
            setIsLoading(false);
        }
    }, [slug, isNew]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const current = { ...caseStudies };
            if (isNew) {
                if (!data.slug) throw new Error("Slug required");
                current[data.slug] = data;
            } else {
                current[slug] = data;
            }

            await fetch("/api/cms/work", {
                method: "POST",
                body: JSON.stringify(Object.values(current))
            });

            alert("Saved!");
            if (isNew) router.push("/admin/work");
        } catch (e) {
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    const openAI = (type: any, context: string, prompt: string) =>
        setAiState({ isOpen: true, type, context, initialPrompt: prompt });

    const handleAIResult = (result: any) => {
        if (aiState.context === "Core Problem") setData({ ...data, problem: { core: result } });
        if (aiState.context === "Headline") setData({ ...data, headline: result });
        if (aiState.context === "Context") setData({ ...data, context: { constraints: [], ...(data.context || {}), paragraph: result } });
        if (aiState.context === "Hero Image") setData({ ...data, hero: { ...data.hero, image: result.url } });
    };

    if (isLoading) return <div className="p-12">Loading...</div>;

    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/work" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold">{isNew ? "New Case Study" : `Edit ${data.client}`}</h1>
                    </div>
                </div>
                {/* Basics */}
                <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                    <h3 className="font-bold">Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="label">Client</label><input className="input" value={data.client} onChange={e => setData({ ...data, client: e.target.value })} /></div>
                        <div><label className="label">Slug</label><input className="input" value={data.slug} disabled={!isNew} onChange={e => setData({ ...data, slug: e.target.value })} /></div>
                        <div className="col-span-2">
                            <div className="flex justify-between"><label className="label">Headline</label><button onClick={() => openAI("text", "Headline", "Write a punchy one-line specific headline about the outcome for " + data.client)}><Sparkles className="w-3 h-3 text-electric-blue" /></button></div>
                            <input className="input" value={data.headline} onChange={e => setData({ ...data, headline: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Problem */}
                <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                    <div className="flex justify-between"><h3 className="font-bold">The Problem</h3><button onClick={() => openAI("text", "Core Problem", "Describe the core business problem for " + data.client)}><Sparkles className="w-3 h-3 text-electric-blue" /></button></div>
                    <textarea className="input" rows={3} value={data.problem?.core || ""} onChange={e => setData({ ...data, problem: { core: e.target.value } })} />
                </div>

                <div className="flex justify-end pt-8">
                    <button onClick={handleSave} disabled={isSaving} className="px-8 py-3 bg-black text-white rounded-md font-bold hover:bg-gray-800">
                        {isSaving ? "Saving..." : "Save Case Study"}
                    </button>
                </div>
            </div>


            <AIGeneratorModal
                isOpen={aiState.isOpen}
                onClose={() => setAiState({ ...aiState, isOpen: false })}
                onGenerate={handleAIResult}
                type={aiState.type}
                initialPrompt={aiState.initialPrompt}
                context={aiState.context}
            />
        </main >
    );
}
