"use client";

import { insights } from "@/lib/data/insights";
import { InsightPost } from "@/types/cms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { use } from "react";
import AIGeneratorModal from "@/components/admin/AIGeneratorModal";

const defaultPost: InsightPost = {
    slug: "", title: "", category: "Essay",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    readTime: "5 min read", excerpt: "", content: ""
};

export default function InsightsEditorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const isNew = slug === "new";

    const [data, setData] = useState<InsightPost>(defaultPost);
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal State
    const [aiState, setAiState] = useState({
        isOpen: false, type: "text" as any, context: "", initialPrompt: ""
    });

    useEffect(() => {
        if (!isNew && insights[slug]) {
            setData(insights[slug]);
            setIsLoading(false);
        } else if (!isNew) {
            setIsLoading(false);
        }
    }, [slug, isNew]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const current = { ...insights };
            if (isNew) {
                if (!data.slug) throw new Error("Slug required");
                current[data.slug] = data;
            } else {
                current[slug] = data;
            }

            await fetch("/api/cms/insights", {
                method: "POST",
                body: JSON.stringify(Object.values(current))
            });

            alert("Saved!");
            if (isNew) router.push("/admin/insights");
        } catch (e) {
            alert("Error saving");
        } finally {
            setIsSaving(false);
        }
    };

    const openAI = (type: any, context: string, prompt: string) =>
        setAiState({ isOpen: true, type, context, initialPrompt: prompt });

    const handleAIResult = (result: any) => {
        if (aiState.context === "Content") setData({ ...data, content: data.content + "\n\n" + result });
        if (aiState.context === "Excerpt") setData({ ...data, excerpt: result });
    };

    if (isLoading) return <div className="p-12">Loading...</div>;

    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/insights" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold">{isNew ? "New Post" : "Edit Post"}</h1>
                    </div>
                </div>
                {/* Basics */}
                <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2"><label className="label">Title</label><input className="input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></div>
                        <div><label className="label">Slug</label><input className="input" value={data.slug} disabled={!isNew} onChange={e => setData({ ...data, slug: e.target.value })} /></div>
                        <div>
                            <label className="label">Category</label>
                            <select className="input" value={data.category} onChange={e => setData({ ...data, category: e.target.value as any })}>
                                <option value="Essay">Essay</option>
                                <option value="Playbook">Playbook</option>
                                <option value="System">System</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <div className="flex justify-between"><label className="label">Excerpt</label><button onClick={() => openAI("text", "Excerpt", "Write a 1-sentence hook for: " + data.title)}><Sparkles className="w-3 h-3 text-electric-blue" /></button></div>
                            <textarea className="input" rows={2} value={data.excerpt} onChange={e => setData({ ...data, excerpt: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white border rounded-lg p-8 shadow-sm space-y-4">
                    <div className="flex justify-between"><h3 className="font-bold">Content (Markdown)</h3><button onClick={() => openAI("text", "Content", "Write an outline for: " + data.title)}><Sparkles className="w-3 h-3 text-electric-blue" /></button></div>
                    <textarea className="input font-mono text-sm" rows={20} value={data.content} onChange={e => setData({ ...data, content: e.target.value })} />
                </div>

                <div className="flex justify-end pt-8">
                    <button onClick={handleSave} disabled={isSaving} className="px-8 py-3 bg-black text-white rounded-md font-bold hover:bg-gray-800">
                        {isSaving ? "Saving..." : "Save Post"}
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
