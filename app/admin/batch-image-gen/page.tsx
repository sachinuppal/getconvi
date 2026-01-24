"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, CheckCircle2, Clock, Image as ImageIcon, AlertCircle, LayoutTemplate, MapPin, RefreshCcw, ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";

type GenerationStatus = "pending" | "requesting" | "loading_image" | "completed" | "failed";

interface QueueItem {
    id: string;
    originalText: string;
    pageUrl?: string;
    slotName?: string;
    imageId?: string;
    prompt: string;
    status: GenerationStatus;
    imageUrl?: string;
    error?: string;
    startTime?: number;
    endTime?: number;
    duration?: number;
    logs: string[];
}

export default function BatchImageGenPage() {
    const [promptsText, setPromptsText] = useState("");
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [activeTab, setActiveTab] = useState<"queue" | "history">("queue");
    const [history, setHistory] = useState<{ name: string, path: string, created: number }[]>([]);

    useEffect(() => {
        if (activeTab === "history") {
            fetch("/api/admin/list-images")
                .then(res => res.json())
                .then(data => setHistory(data.images || []));
        }
    }, [activeTab]);

    // Check if we are auto-processing
    const isProcessingRef = useRef(false);

    // Live timer update
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 100);
        return () => clearInterval(interval);
    }, []);

    // Prevent accidental page leave
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (isProcessingRef.current || queue.some(i => i.status === "pending")) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [queue]);

    const parseCSVLine = (line: string): Partial<QueueItem> => {
        const csvRegex = /^([^,]+),([^,]+),([^,]+),(.*)$/;
        const match = line.match(csvRegex);

        if (match) {
            let promptClean = match[4].trim();
            if (promptClean.startsWith('"') && promptClean.endsWith('"')) {
                promptClean = promptClean.slice(1, -1);
            }
            promptClean = promptClean.replace(/""/g, '"');

            return {
                pageUrl: match[1].trim(),
                slotName: match[2].trim(),
                imageId: match[3].trim(),
                prompt: promptClean
            };
        }
        return { prompt: line.trim() };
    };

    const addToQueue = () => {
        if (!promptsText.trim()) return;

        const lines = promptsText.split("\n").map(p => p.trim()).filter(p => p.length > 0);

        const newItems = lines.map(line => {
            if (line.toLowerCase().startsWith("page url,image slot")) return null;
            const parsed = parseCSVLine(line);
            return {
                id: Math.random().toString(36).substring(7),
                originalText: line,
                pageUrl: parsed.pageUrl,
                slotName: parsed.slotName,
                imageId: parsed.imageId,
                prompt: parsed.prompt || line,
                status: "pending" as GenerationStatus,
                logs: [] as string[]
            };
        }).filter(item => item !== null) as QueueItem[];

        setQueue(prev => [...prev, ...newItems]);
        setPromptsText("");
    };

    const queueRef = useRef(queue);
    useEffect(() => { queueRef.current = queue; }, [queue]);

    const processNextSafe = async () => {
        if (!isProcessingRef.current) return;

        const currentQueue = queueRef.current;
        const targetItem = currentQueue.find(item => item.status === "pending");

        if (!targetItem) {
            console.log("[Queue] No pending items found. Stopping.");
            isProcessingRef.current = false;
            setIsProcessing(false);
            return;
        }

        console.log(`[Queue] Processing item ${targetItem.id}`);

        // 1. Mark as requesting
        setQueue(prev => prev.map(item =>
            item.id === targetItem.id
                ? {
                    ...item,
                    status: "requesting",
                    startTime: Date.now(),
                    logs: [...item.logs, `[${new Date().toLocaleTimeString()}] Requesting API...`]
                }
                : item
        ));

        try {
            await new Promise(r => setTimeout(r, 1000)); // Pace it slightly

            const res = await fetch("/api/ai/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "image", prompt: targetItem.prompt })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();

            if (data.success && data.data?.url) {
                updateItemStatus(targetItem.id, "loading_image", data.data.url, undefined, undefined, `API Success. URL generated. Saving...`);

                // Auto-trigger completion to avoid getting stuck if browser fails to load external image
                setTimeout(() => {
                    handleImageLoad(targetItem.id);
                }, 1000);

            } else {
                updateItemStatus(targetItem.id, "failed", undefined, data.error || "Unknown error", Date.now(), "API returned failure response.");
                setTimeout(() => processNextSafe(), 2000);
            }
        } catch (err: any) {
            updateItemStatus(targetItem.id, "failed", undefined, "Network/API error", Date.now(), `Request Failed: ${err.message}`);
            setTimeout(() => processNextSafe(), 2000);
        }
    };

    const startProcessing = () => {
        if (isProcessingRef.current) return;
        isProcessingRef.current = true;
        setIsProcessing(true);
        processNextSafe();
    };

    const updateItemStatus = (id: string, status: GenerationStatus, url?: string, error?: string, endTime?: number, logMsg?: string) => {
        setQueue(prev => prev.map(item => {
            if (item.id === id) {
                const duration = endTime && item.startTime ? (endTime - item.startTime) : item.duration;
                const newLogs = logMsg ? [...item.logs, `[${new Date().toLocaleTimeString()}] ${logMsg}`] : item.logs;
                return { ...item, status, imageUrl: url, error, endTime, duration, logs: newLogs };
            }
            return item;
        }));
    };

    const handleImageLoad = (id: string) => {
        // Check strict current status from Ref to avoid race conditions or double-fires
        const item = queueRef.current.find(i => i.id === id);

        // Only proceed if it's in a loading state
        if (!item || (item.status !== "loading_image" && item.status !== "failed")) return;

        console.log(`[Queue] Image Loaded for ${id}. Triggering completion sequence.`);

        const endTime = Date.now();
        const duration = item.startTime ? (endTime - item.startTime) : 0;

        // 1. Update UI to show complete (so user sees it green immediately)
        setQueue(prev => prev.map(i => i.id === id ? {
            ...i,
            status: "completed",
            endTime,
            duration,
            logs: [...i.logs, `[${new Date().toLocaleTimeString()}] Pixels received & rendered.`]
        } : i));

        // 2. Trigger Auto-Save / Next Loop
        // We pass the explicit item data to avoid waiting for state update
        if (autoSave && item.imageUrl) {
            const itemToSave = { ...item, status: "completed" as GenerationStatus };

            saveImage(itemToSave).then(() => {
                console.log(`[Queue] Save finished for ${id}. Checking next...`);

                // Artificial delay to ensure user sees the "Saved" status before moving on
                if (isProcessingRef.current) {
                    setTimeout(() => {
                        console.log(`[Queue] Triggering next item.`);
                        processNextSafe();
                    }, 2000);
                }
            });
        } else {
            // No save needed, just verify next
            if (isProcessingRef.current) {
                setTimeout(() => processNextSafe(), 2000);
            }
        }
    };

    const saveImage = async (item: QueueItem) => {
        if (!item.imageUrl) return;

        // Create filename from prompt or slot
        const slug = (item.slotName || item.prompt).substring(0, 30).toLowerCase().replace(/[^a-z0-9]/g, '-');
        const filename = `cms-uploads/${slug}-${item.id}.jpg`;

        updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, "Saving to project...");

        try {
            const res = await fetch("/api/admin/save-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: item.imageUrl,
                    filepath: filename,
                    metadata: {
                        prompt: item.prompt,
                        slotName: item.slotName,
                        pageUrl: item.pageUrl
                    }
                })
            });
            const data = await res.json();

            if (data.success) {
                const savedPath = `/public${data.savedPath}`;

                // Auto-Update Content Logic
                const SLOT_MAPPINGS: Record<string, { file: string; path: string }> = {
                    "Home Hero": { file: "home.json", path: "hero.hero_image" },
                    // Placeholder for future mappings
                };

                if (item.slotName && SLOT_MAPPINGS[item.slotName]) {
                    const mapping = SLOT_MAPPINGS[item.slotName];
                    updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, `Updating Website Content...`);

                    await fetch("/api/admin/update-content", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            file: mapping.file,
                            path: mapping.path,
                            value: data.savedPath // Web path e.g. /cms-uploads/...
                        })
                    });
                    updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, `Saved & Live on Website!`);
                } else {
                    updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, `Saved: ${data.savedPath}`);
                }

            } else {
                updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, `Save Error: ${data.error}`);
            }
        } catch (e: any) {
            updateItemStatus(item.id, "completed", item.imageUrl, undefined, undefined, `Save Failed: ${e.message}`);
        }
    };

    const handleImageError = (id: string) => {
        updateItemStatus(id, "failed", undefined, "Image failed to load", Date.now(), "Browser fired onError event.");
        // If errored, we should move to next
        if (isProcessingRef.current) {
            setTimeout(() => processNextSafe(), 2000);
        }
    };

    const retryItem = (id: string) => {
        setQueue(prev => prev.map(item =>
            item.id === id ? {
                ...item,
                status: "pending",
                error: undefined,
                startTime: undefined,
                duration: undefined,
                logs: [...item.logs, "Retrying..."]
            } : item
        ));
    };

    const retryAllFailed = () => {
        setQueue(prev => prev.map(item =>
            item.status === "failed" ? {
                ...item,
                status: "pending",
                error: undefined,
                startTime: undefined,
                duration: undefined,
                logs: [...item.logs, "Batch Retry..."]
            } : item
        ));
    };

    const clearCompleted = () => {
        setQueue(prev => prev.filter(item => item.status !== "completed"));
    };

    const handleRegenerate = (newItem: QueueItem) => {
        setQueue(prev => [newItem, ...prev]);
        setActiveTab("queue");

        // Auto-start if not already
        if (!isProcessingRef.current) {
            // Small delay to let React update state
            setTimeout(() => startProcessing(), 500);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-heading mb-2">Batch Image Generation</h1>
                    <p className="text-gray-500">Full transparent queue with live status tracking.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab("queue")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "queue" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            Queue ({queue.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === "history" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            History
                        </button>
                    </div>

                    {activeTab === "queue" && (
                        <div className="flex gap-2">
                            {queue.some(i => i.status === "failed") && (
                                <button onClick={retryAllFailed} className="px-4 py-2 text-sm text-red-600 border border-red-200 bg-red-50 rounded-md font-medium hover:bg-red-100 flex items-center gap-2">
                                    <RefreshCcw className="w-4 h-4" /> Retry Failed
                                </button>
                            )}
                            {queue.some(i => i.status === "completed") && (
                                <button onClick={clearCompleted} className="px-4 py-2 text-sm text-gray-600 border border-gray-200 bg-white rounded-md hover:bg-gray-50">
                                    Clear Completed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {activeTab === "history" ? (
                <div className="grid grid-cols-1 gap-4 max-w-4xl">
                    {history.map((img: any) => (
                        <GenerationCard
                            key={img.name}
                            // Adapt api response to component prop
                            item={{
                                id: img.name,
                                status: "completed",
                                prompt: img.prompt,
                                slotName: img.slotName,
                                pageUrl: img.pageUrl,
                                path: img.path,
                                savedAt: img.created
                            }}
                            minimal
                            onRegenerate={handleRegenerate}
                        />
                    ))}
                    {history.length === 0 && (
                        <div className="py-20 text-center text-gray-400">
                            No history found. Generated images will appear here.
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Input Column - 4 cols */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                            <textarea
                                value={promptsText}
                                onChange={(e) => setPromptsText(e.target.value)}
                                placeholder={"Paste your CSV here...\nFormat: Page URL, Slot, Name, \"Prompt\""}
                                className="w-full h-80 p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-black font-mono text-xs resize-none mb-4 whitespace-pre leading-relaxed"
                            />
                            <button
                                onClick={addToQueue}
                                disabled={!promptsText.trim()}
                                className="w-full py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                            >
                                Queue {promptsText ? promptsText.trim().split('\n').length : 0} Items
                            </button>

                            <div className="bg-blue-50 p-4 rounded text-xs text-blue-700 space-y-2">
                                <p><strong>Note on Privacy:</strong> No external accounts (Supabase/Vercel) needed. Images are generated on-the-fly.</p>
                            </div>
                        </div>
                    </div>

                    {/* Queue Column - 8 cols */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center sticky top-0 z-20">
                                <h2 className="font-medium flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4" /> Queue ({queue.length})
                                </h2>
                                <div>
                                    {!isProcessing && queue.some(i => i.status === "pending") && (
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={autoSave}
                                                    onChange={e => setAutoSave(e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                                />
                                                Auto-Save to Project
                                            </label>
                                            <button onClick={startProcessing} className="px-5 py-2 bg-green-600 text-white text-sm rounded-md font-medium hover:bg-green-700 shadow-sm flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> Start Processing
                                            </button>
                                        </div>
                                    )}
                                    {isProcessing && (
                                        <span className="px-4 py-2 bg-green-50 text-green-700 text-sm rounded-md font-medium border border-green-100 flex items-center gap-2 animate-pulse">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Processing Queue...
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[800px]">
                                {queue.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon className="w-12 h-12 mb-4 opacity-20" />
                                        <p>Ready to generate.</p>
                                    </div>
                                ) : (
                                    queue.map((item) => (
                                        <GenerationCard
                                            key={item.id}
                                            item={item}
                                            onSave={saveImage}
                                            onRegenerate={handleRegenerate}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function GenerationCard({ item, minimal, onSave, onRegenerate }: { item: any, minimal?: boolean, onSave?: (item: any) => void, onRegenerate?: (newItem: any) => void }) {
    const isRunning = item.status === "requesting" || item.status === "loading_image";
    const statusColor = isRunning ? "border-blue-200 bg-blue-50/10 ring-1 ring-blue-100" : "border-gray-100 bg-white";

    const [isEditing, setIsEditing] = useState(false);
    const [editPrompt, setEditPrompt] = useState(item.prompt || "");

    const handleRegenSubmit = () => {
        if (!onRegenerate) return;

        onRegenerate({
            ...item,
            id: Math.random().toString(36).substring(7), // New ID
            prompt: editPrompt,
            status: "pending",
            imageUrl: undefined, // Clear image
            path: undefined,
            logs: [],
            startTime: undefined,
            endTime: undefined,
            error: undefined
        });
        setIsEditing(false);
    };

    return (
        <div className={`border rounded-lg p-5 flex gap-6 items-start transition-all relative ${statusColor}`}>
            <div className="mt-1 flex-shrink-0">
                {item.status === "pending" && <Clock className="w-5 h-5 text-gray-300" />}
                {item.status === "requesting" && <div className="w-5 h-5 rounded-full border-2 border-orange-400 border-t-transparent animate-spin" />}
                {item.status === "loading_image" && <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />}
                {item.status === "completed" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {item.status === "failed" && <AlertCircle className="w-5 h-5 text-red-500" />}
            </div>

            <div className="flex-1 min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge icon={LayoutTemplate} label={item.slotName} color="gray" />
                    {item.savedAt && (
                        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                            {new Date(item.savedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-2">
                        <textarea
                            value={editPrompt}
                            onChange={(e) => setEditPrompt(e.target.value)}
                            className="w-full p-2 border border-blue-300 rounded-md text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                            rows={3}
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button onClick={handleRegenSubmit} className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-blue-700 flex items-center gap-1">
                                <RefreshCcw className="w-3 h-3" /> Generate New
                            </button>
                            <button onClick={() => setIsEditing(false)} className="text-gray-500 text-xs px-3 py-1.5 hover:text-gray-800">
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-900 font-medium text-sm leading-relaxed border-l-2 border-gray-100 pl-3 line-clamp-2 hover:line-clamp-none transition-all cursor-text group/text">
                        {item.prompt}
                        {!isRunning && onRegenerate && (
                            <button onClick={() => setIsEditing(true)} className="ml-2 opacity-0 group-hover/text:opacity-100 transition-opacity text-blue-400 hover:text-blue-600 inline-block align-middle" title="Edit & Regenerate">
                                <RefreshCcw className="w-3 h-3" />
                            </button>
                        )}
                    </p>
                )}

                {/* Status Steps - Hide in minimal mode */}
                {!minimal && (
                    <div className="flex items-center gap-3 text-xs">
                        <StatusStep label="API Request" active={item.status === "requesting"} completed={["loading_image", "completed", "failed"].includes(item.status)} />
                        <ArrowRight className="w-3 h-3 text-gray-300" />
                        <StatusStep label="Generating Pixels" active={item.status === "loading_image"} completed={["completed"].includes(item.status)} />
                        <ArrowRight className="w-3 h-3 text-gray-300" />
                        <StatusStep label="Done" active={false} completed={item.status === "completed"} error={item.status === "failed"} />
                    </div>
                )}

                {/* Fallback Link & Save */}
                <div className="mt-2 flex gap-3 flex-wrap">
                    {item.path && (
                        <a href={item.path} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> View Image
                        </a>
                    )}
                    {item.imageUrl && !item.path && (
                        <a href={item.imageUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-500 hover:underline flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> Test URL
                        </a>
                    )}

                    {onSave && item.status === "completed" && item.imageUrl && (
                        <button onClick={() => onSave(item)} className="text-[10px] text-green-600 hover:text-green-800 font-bold border border-green-200 px-2 py-0.5 rounded bg-green-50 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Save to Project
                        </button>
                    )}

                    {item.pageUrl && (
                        <a href={item.pageUrl} target="_blank" rel="noreferrer" className="text-[10px] text-purple-600 hover:text-purple-800 font-bold border border-purple-200 px-2 py-0.5 rounded bg-purple-50 flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" /> View Page Use
                        </a>
                    )}

                    {!isEditing && onRegenerate && !isRunning && (
                        <button onClick={() => setIsEditing(true)} className="text-[10px] text-blue-600 hover:text-blue-800 font-bold border border-blue-200 px-2 py-0.5 rounded bg-blue-50 flex items-center gap-1">
                            <RefreshCcw className="w-3 h-3" /> Regenerate
                        </button>
                    )}
                </div>
            </div>

            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden relative group/image shadow-sm">
                {/* Support both live Image URL (Queue) and Saved Path (History) */}
                {(item.imageUrl || item.path) ? (
                    <Image
                        src={item.imageUrl || item.path}
                        alt={item.prompt || "Generated Image"}
                        fill
                        className={`object-cover transition-opacity duration-500`}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                        {item.status === "requesting" ? (
                            <Loader2 className="w-6 h-6 animate-spin text-orange-400" />
                        ) : (
                            <ImageIcon className="w-8 h-8 opacity-20" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function Badge({ icon: Icon, label, color }: { icon: any, label?: string, color: "gray" | "light" }) {
    if (!label) return null;
    return (
        <span className={`flex items-center gap-1 text-[10px] font-bold tracking-wider px-2 py-1 rounded border overflow-hidden max-w-[120px] truncate
            ${color === "gray" ? "text-gray-700 bg-gray-100 border-gray-200" : "text-gray-500 bg-white border-gray-200"}
        `}>
            <Icon className="w-3 h-3 flex-shrink-0" />
            {label}
        </span>
    );
}

function StatusStep({ label, active, completed, error }: { label: string, active: boolean, completed: boolean, error?: boolean }) {
    let style = "text-gray-300";
    if (completed) style = "text-green-600 font-medium";
    if (active) style = "text-blue-600 font-bold animate-pulse";
    if (error) style = "text-red-500 font-bold";

    return (
        <div className={`flex items-center gap-1 ${style}`}>
            {completed && !error && <CheckCircle2 className="w-3 h-3" />}
            {active && <Loader2 className="w-3 h-3 animate-spin" />}
            <span>{label}</span>
        </div>
    );
}
