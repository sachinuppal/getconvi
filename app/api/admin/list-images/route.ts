import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        const uploadsDir = path.join(process.cwd(), "public/cms-uploads");
        const historyPath = path.join(uploadsDir, "history.json");

        if (!fs.existsSync(uploadsDir)) {
            return NextResponse.json({ images: [] });
        }

        // 1. Read History JSON (Rich Metadata)
        let historyData: any[] = [];
        if (fs.existsSync(historyPath)) {
            try {
                const data = fs.readFileSync(historyPath, "utf-8");
                historyData = JSON.parse(data);
            } catch (e) {
                console.error("Failed to parse history.json", e);
            }
        }

        // 2. Scan Files (Source of Truth for existence)
        const files = fs.readdirSync(uploadsDir)
            .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
            .map(file => {
                const stats = fs.statSync(path.join(uploadsDir, file));

                // Find matching metadata
                const meta = historyData.find((h: any) => h.filename === file);

                return {
                    name: file, // ID
                    path: `/cms-uploads/${file}`,
                    created: stats.birthtimeMs,
                    size: stats.size,
                    // Merge Metadata if available
                    prompt: meta?.prompt || "",
                    slotName: meta?.slotName || "",
                    pageUrl: meta?.pageUrl || undefined
                };
            })
            .sort((a, b) => b.created - a.created); // Newest first

        return NextResponse.json({ images: files });
    } catch (error) {
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}
