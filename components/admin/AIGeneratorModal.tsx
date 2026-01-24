"use client";

import { useState, useEffect } from "react";
import { Sparkles, X, Loader2, Check } from "lucide-react";

interface AIGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGenerate: (result: string | { url: string; alt: string }) => void;
    type: "text" | "image" | "video";
    initialPrompt?: string;
    context?: string; // e.g., "Headline", "Short Description", "Hero Image"
}

export default function AIGeneratorModal({ isOpen, onClose, onGenerate, type, initialPrompt = "", context }: AIGeneratorModalProps) {
    const [prompt, setPrompt] = useState(initialPrompt);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [model, setModel] = useState("gemini-1.5-pro");

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setPrompt(initialPrompt);
            setResult(null);
            // Default models based on type
            if (type === "video") setModel("veo-3.1");
            else if (type === "image") setModel("imagen-3");
            else setModel("gemini-1.5-pro");
        }
    }, [isOpen, initialPrompt, type]);

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
            alert("Generation failed");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleConfirm = () => {
        if (!result) return;

        if (type === "text") {
            // Text results come back as result.content
            // We strip the markdown wrapper if present for cleaner insertion into inputs
            onGenerate(result.content);
        } else {
            // Media results come back as result.url
            onGenerate({ url: result.url, alt: result.alt_text });
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <div className="flex items-center gap-2">
                        <span className="p-1.5 bg-electric-blue text-white rounded">
                            <Sparkles className="w-4 h-4" />
                        </span>
                        <h3 className="font-bold text-sm">Generate {context || type}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-black">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 overflow-y-auto">
                    {/* Model Selector */}
                    <div className="mb-4">
                        <label className="label">Model</label>
                        <select
                            className="input bg-white"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        >
                            {type === "text" && (
                                <>
                                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                                </>
                            )}
                            {type === "image" && <option value="imagen-3">Imagen 3</option>}
                            {type === "video" && <option value="veo-3.1">Google Veo 3.1</option>}
                        </select>
                    </div>

                    {/* Prompt */}
                    <div className="mb-6">
                        <label className="label">Prompt</label>
                        <textarea
                            className="input min-h-[100px]"
                            placeholder={`Describe the ${context || "content"} you want...`}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>

                    {/* Result Preview */}
                    {result && (
                        <div className="mb-6 bg-gray-50 rounded p-4 border border-gray-200">
                            <div className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Generated
                            </div>

                            {type === "text" ? (
                                <div className="text-sm prose prose-sm max-h-[200px] overflow-y-auto">
                                    {result.content}
                                </div>
                            ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={result.url} alt="Generated" className="w-full h-auto rounded border border-gray-200" />
                            )}
                        </div>
                    )}

                    {!result && !isGenerating && (
                        <p className="text-xs text-center text-gray-400">
                            Ready to generate using {model}.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black">Cancel</button>

                    {result ? (
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 flex items-center gap-2"
                        >
                            <Check className="w-4 h-4" />
                            Insert Result
                        </button>
                    ) : (
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className="px-4 py-2 bg-electric-blue text-white rounded text-sm font-medium hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            Generate
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
