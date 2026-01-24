"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Image as ImageIcon, FileText, Loader2, Video } from "lucide-react";

export default function AIStudioPage() {
    const [prompt, setPrompt] = useState("");
    const [type, setType] = useState<"text" | "image" | "video">("text");
    const [model, setModel] = useState("gemini-1.5-pro");
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsGenerating(true);
        setResult(null);

        try {
            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, model, type })
            });
            const data = await res.json();
            setResult(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="p-12">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[600px]">

                    {/* INPUT PANEL */}
                    <div className="flex-1 p-8 border-r border-gray-100 flex flex-col">
                        <div className="mb-8">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Asset Type</label>
                            <div className="flex gap-2">
                                {[
                                    { id: "text", icon: FileText, label: "Copy" },
                                    { id: "image", icon: ImageIcon, label: "Image" },
                                    { id: "video", icon: Video, label: "Veo Video" }
                                ].map((mode) => (
                                    <button
                                        key={mode.id}
                                        onClick={() => setType(mode.id as any)}
                                        className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded border transition-all ${type === mode.id
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <mode.icon className="w-5 h-5" />
                                        <span className="text-sm font-medium">{mode.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Model</label>
                            <select
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                            >
                                <option value="gemini-1.5-pro">Gemini 1.5 Pro (Text/Code)</option>
                                <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast)</option>
                                <option value="imagen-3">Imagen 3 (Standard)</option>
                                <option value="veo-3.1">Google Veo 3.1 (Video)</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col">
                            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Prompt</label>
                            <textarea
                                className="flex-1 w-full p-4 bg-gray-50 border border-gray-200 rounded resize-none text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-black"
                                placeholder={type === 'text' ? "Describe the section you want to write..." : "Describe the scene details, lighting, and style..."}
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt}
                                className="w-full bg-electric-blue text-white py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate Asset
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* RESULT PANEL */}
                    <div className="flex-1 p-8 bg-gray-50 flex flex-col items-center justify-center text-center">
                        {result ? (
                            <div className="w-full text-left animation-fade-in">
                                <div className="mb-4">
                                    <span className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded">
                                        Completed by {result.metadata.model}
                                    </span>
                                </div>

                                {type === "text" ? (
                                    <div className="prose prose-sm bg-white p-6 rounded border border-gray-200 shadow-sm">
                                        {result.content}
                                    </div>
                                ) : (
                                    <div className="bg-white p-2 rounded border border-gray-200 shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={result.url} alt={result.alt_text} className="w-full h-auto rounded" />
                                    </div>
                                )}

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="px-4 py-2 bg-white border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">Save to Library</button>
                                    <button className="px-4 py-2 text-red-500 text-sm font-medium hover:text-red-600">Discard</button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-400">
                                <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                <p className="text-sm">Enter a prompt to start generating.</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
