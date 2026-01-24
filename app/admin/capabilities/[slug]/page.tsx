"use client";

import { capabilities } from "@/lib/data/capabilities";
import { Capability } from "@/types/cms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { use } from "react";
import AIGeneratorModal from "@/components/admin/AIGeneratorModal";

const defaultCapability: Capability = {
    slug: "" as any,
    title: "",
    badge_style: "default",
    one_liner: "",
    description: "",
    hero_image: { type: "image", url: "", alt_text: "" },
    applied_in: [],
    enables: [],
    why_it_matters: ""
};

export default function CapabilityEditorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const isNew = slug === "new";

    const [data, setData] = useState<Capability>(defaultCapability);
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal State
    const [aiState, setAiState] = useState({
        isOpen: false,
        type: "text" as "text" | "image" | "video",
        context: "",
        initialPrompt: "",
        onSuccess: (val: any) => { }
    });

    useEffect(() => {
        if (!isNew) {
            const found = capabilities.find(c => c.slug === slug);
            if (found) {
                setData(found);
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, [slug, isNew]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const current = [...capabilities];
            const index = current.findIndex(c => c.slug === (isNew ? data.slug : slug));

            if (index >= 0) {
                current[index] = data;
            } else {
                if (!data.slug) throw new Error("Slug required");
                current.push(data);
            }

            await fetch("/api/cms/capabilities", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(current)
            });

            alert("Saved!");
            if (isNew) router.push("/admin/capabilities");
        } catch (e) {
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    const openAI = (
        type: "text" | "image" | "video",
        context: string,
        initialPrompt: string,
        onSuccess: (val: any) => void
    ) => {
        setAiState({ isOpen: true, type, context, initialPrompt, onSuccess });
    };

    const handleAIResult = (result: any) => {
        aiState.onSuccess(result);
        setAiState({ ...aiState, isOpen: false });
    };

    if (isLoading) return <div className="p-12">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar is persistent in layout, but we need to match the spacing if layout wraps this */}
            {/* Wait, the layout automatically wraps pages. I don't need to re-implement sidebar here. */}
            {/* But I need to check if the layout adds the ml-64. The layout I made earlier WRAPS children. */}
            {/* So I should NOT include the sidebar or the outer flex div. Just the main content. */}
            {/* However, the other pages I just viewed (platforms/[slug]) had the sidebar hardcoded? */}
            {/* Let me check platforms/[slug]/page.tsx again. Yes, it has the sidebar logic. */}
            {/* I should probably REMOVE the sidebar from those pages later to match the new layout refactor. */}
            {/* But for now, to be safe, I'll follow the pattern of the others if they haven't been refactored yet. */}
            {/* Wait, I refactored the LIST pages. I did NOT refactor the [slug] pages in the previous turn. */}
            {/* So I need to use the sidebar pattern here to match them, OR better, I should refactor the [slug] pages too. */}
            {/* The user wants AI integration. I'll stick to making it work first. */}
            {/* I will assume the layout handles it if I made a global layout. */}
            {/* In Step 63, I created app/admin/layout.tsx. So the global layout exists. */}
            {/* This means the [slug] pages currently have DOUBLE sidebars if they still have the code. */}
            {/* I should fix that. But first, let's build this page correct (without sidebar). */}

            <main className="flex-1 p-12">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/capabilities" className="p-2 hover:bg-gray-100 rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-bold">{isNew ? "New Capability" : `Edit ${data.title}`}</h1>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-black text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    <div className="bg-white border rounded-lg p-8 shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="label">Title</label>
                                <input className="input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="label">Slug</label>
                                <input className="input" value={data.slug} disabled={!isNew} onChange={e => setData({ ...data, slug: e.target.value as any })} />

                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="label">One Liner</label>
                                <button onClick={() => openAI("text", "One Liner", "Write a punchy one-liner description for capability: " + data.title, (val) => setData({ ...data, one_liner: val }))}>
                                    <Sparkles className="w-3 h-3 text-electric-blue" />
                                </button>
                            </div>
                            <input className="input" value={data.one_liner} onChange={e => setData({ ...data, one_liner: e.target.value })} />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="label">Full Description</label>
                                <button onClick={() => openAI("text", "Description", "Write a detailed description for capability: " + data.title, (val) => setData({ ...data, description: val }))}>
                                    <Sparkles className="w-3 h-3 text-electric-blue" />
                                </button>
                            </div>
                            <textarea className="input" rows={4} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="label">Hero Image</label>
                                <button onClick={() => openAI("image", "Hero Image", "Abstract 3D illustration for " + data.title, (val) => setData({ ...data, hero_image: { type: "image", url: val.url, alt_text: String(data.title) } }))}>
                                    <Sparkles className="w-3 h-3 text-electric-blue" />
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <input className="input" placeholder="Image URL" value={data.hero_image?.url || ""} onChange={e => setData({ ...data, hero_image: { ...data.hero_image!, url: e.target.value } })} />
                                {data.hero_image?.url && <img src={data.hero_image.url} alt="Preview" className="h-10 w-10 rounded border" />}
                            </div>
                        </div>
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
