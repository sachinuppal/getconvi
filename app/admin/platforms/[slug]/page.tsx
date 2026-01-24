"use client";

import { platforms } from "@/lib/data/platforms";
import { Platform } from "@/types/cms";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { useState, useEffect, use } from "react";
import AIGeneratorModal from "@/components/admin/AIGeneratorModal";

// Default empty state for new platform
const defaultPlatform: Platform = {
    slug: "",
    name: "",
    domain: "",
    website_url: "",
    status: "live",
    tagline: "",
    short_description: "",
    capabilities: [],
    primary_capability: "technology",
    audience: { for: [], not_for: [] },
    hero: { headline: "", subline: "", primary_cta: { label: "", url: "" } },
    problem: { headline: "", points: [], summary: "" },
    value: { headline: "", description: "", enables: [] },
    how_it_works: { steps: [] },
    showcase: { headline: "", pillars: [], summary: "" },
    proof: { signals: [], status: "" },
    bridge: { headline: "", description: "", learnings: [] },
    footer: { tagline: "", description: "" },
    seo: { meta_title: "", meta_description: "", robots: { index: true, follow: true } },
    aeo: { entity_name: "", entity_type: "Organization", one_sentence_definition: "" }
};

export default function PlatformEditorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const router = useRouter();
    const isNew = slug === "new";

    // Initialize state
    const [data, setData] = useState<Platform>(defaultPlatform);
    const [isLoading, setIsLoading] = useState(!isNew);
    const [isSaving, setIsSaving] = useState(false);

    // AI Modal State
    const [aiState, setAiState] = useState({
        isOpen: false,
        type: "text" as "text" | "image" | "video",
        context: "", // Which field generated this?
        initialPrompt: ""
    });

    useEffect(() => {
        if (!isNew && platforms[slug]) {
            setData(platforms[slug]);
            setIsLoading(false);
        } else if (!isNew) {
            // Handle not found
            setIsLoading(false);
        }
    }, [slug, isNew]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const currentPlatforms = { ...platforms };

            if (isNew) {
                if (!data.slug) {
                    alert("Slug is required");
                    setIsSaving(false);
                    return;
                }
                currentPlatforms[data.slug] = data;
            } else {
                currentPlatforms[slug] = data;
            }

            const payload = Object.values(currentPlatforms);

            const res = await fetch("/api/cms/platforms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Saved successfully!");
                if (isNew) router.push("/admin/platforms");
            } else {
                throw new Error("Failed to save");
            }
        } catch (e) {
            console.error(e);
            alert("Error saving platform");
        } finally {
            setIsSaving(false);
        }
    };

    const openAI = (type: "text" | "image" | "video", context: string, prompt: string) => {
        setAiState({ isOpen: true, type, context, initialPrompt: prompt });
    };

    const handleAIResult = (result: any) => {
        const context = aiState.context;

        if (context === "Short Description") {
            setData(prev => ({ ...prev, short_description: result }));
        } else if (context === "Headline") {
            setData(prev => ({ ...prev, hero: { ...prev.hero, headline: result } }));
        } else if (context === "AEO Definition") {
            setData(prev => ({ ...prev, aeo: { ...prev.aeo, one_sentence_definition: result } }));
        } else if (context === "Hero Image") {
            setData(prev => ({
                ...prev,
                hero: { ...prev.hero, image: { type: "image", url: result.url, alt_text: prev.name } }
            }));
        } else if (context === "Logo") {
            setData(prev => ({
                ...prev,
                logo: { type: "image", url: result.url, alt_text: `${prev.name} Logo` }
            }));
        }
    };

    if (isLoading) return <div className="p-12">Loading...</div>;

    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/platforms" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold">{isNew ? "New Platform" : `Edit ${data.name}`}</h1>
                    </div>
                </div>

                {/* Basics */}
                <div id="basics" className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Basics</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <label className="label">Name</label>
                            <input className="input" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="label">Slug (URL)</label>
                            <input className="input" disabled={!isNew} value={data.slug} onChange={e => setData({ ...data, slug: e.target.value })} />
                        </div>
                        <div className="col-span-2">
                            <div className="flex justify-between items-center mb-2">
                                <label className="label mb-0">Short Description</label>
                                <button
                                    onClick={() => openAI("text", "Short Description", "Write a short, high-impact description for " + data.name)}
                                    className="text-xs flex items-center gap-1 text-electric-blue hover:underline"
                                >
                                    <Sparkles className="w-3 h-3" /> Generate with AI
                                </button>
                            </div>
                            <textarea className="input" rows={3} value={data.short_description} onChange={e => setData({ ...data, short_description: e.target.value })} />
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div id="media" className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Media Assets</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex justify-between items-center mb-2">
                                <label className="label mb-0">Hero Image</label>
                                <button
                                    onClick={() => openAI("image", "Hero Image", `Cinematic 3D render of ${data.name} dashboard, dark mode, futuristic UI, high resolution`)}
                                    className="text-xs flex items-center gap-1 text-electric-blue hover:underline"
                                >
                                    <Sparkles className="w-3 h-3" /> Generate Image
                                </button>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        className="input mb-2"
                                        placeholder="Image URL"
                                        value={data.hero.image?.url || ""}
                                        onChange={e => setData({
                                            ...data,
                                            hero: {
                                                ...data.hero,
                                                image: { type: "image", url: e.target.value, alt_text: data.name }
                                            }
                                        })}
                                    />
                                </div>
                                {data.hero.image?.url && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={data.hero.image.url} alt="Hero" className="w-20 h-12 object-cover rounded border border-gray-200 bg-gray-50" />
                                )}
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <div className="flex justify-between items-center mb-2">
                                <label className="label mb-0">Logo Image</label>
                                <button
                                    onClick={() => openAI("image", "Logo", `Minimalist modern logo for ${data.name}, vector style, geometric shapes`)}
                                    className="text-xs flex items-center gap-1 text-electric-blue hover:underline"
                                >
                                    <Sparkles className="w-3 h-3" /> Generate Logo
                                </button>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <input
                                        className="input mb-2"
                                        placeholder="Logo URL"
                                        value={data.logo?.url || ""}
                                        onChange={e => setData({
                                            ...data,
                                            logo: { type: "image", url: e.target.value, alt_text: `${data.name} Logo` }
                                        })}
                                    />
                                </div>
                                {data.logo?.url && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={data.logo.url} alt="Logo" className="w-12 h-12 object-contain rounded border border-gray-200 bg-white p-1" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Text */}
                <div id="hero" className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Hero Section</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="label mb-0">Headline</label>
                                <button
                                    onClick={() => openAI("text", "Headline", "Write a powerful 5-word homepage headline for " + data.name)}
                                    className="text-xs flex items-center gap-1 text-electric-blue hover:underline"
                                >
                                    <Sparkles className="w-3 h-3" /> Generate
                                </button>
                            </div>
                            <input className="input" value={data.hero.headline} onChange={e => setData({ ...data, hero: { ...data.hero, headline: e.target.value } })} />
                        </div>
                        <div>
                            <label className="label">Subline</label>
                            <textarea className="input" rows={2} value={data.hero.subline} onChange={e => setData({ ...data, hero: { ...data.hero, subline: e.target.value } })} />
                        </div>
                    </div>
                </div>

                {/* SEO */}
                <div id="seo" className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">SEO & AEO</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="label">Meta Title</label>
                            <input className="input" value={data.seo.meta_title} onChange={e => setData({ ...data, seo: { ...data.seo, meta_title: e.target.value } })} />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="label mb-0">One Sentence Definition (AEO)</label>
                                <button
                                    onClick={() => openAI("text", "AEO Definition", "Define " + data.name + " in one clear, factual sentence for AI knowledge graphs.")}
                                    className="text-xs flex items-center gap-1 text-electric-blue hover:underline"
                                >
                                    <Sparkles className="w-3 h-3" /> Generate
                                </button>
                            </div>
                            <textarea className="input" rows={2} value={data.aeo.one_sentence_definition} onChange={e => setData({ ...data, aeo: { ...data.aeo, one_sentence_definition: e.target.value } })} />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-8">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm font-bold shadow-lg"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? "Saving..." : "Save Platform"}
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
