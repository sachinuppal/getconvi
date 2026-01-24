import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const streamPipeline = promisify(pipeline);

export async function POST(req: NextRequest) {
    try {
        const { url, filepath, metadata } = await req.json();

        if (!url || !filepath) {
            return NextResponse.json({ error: "Missing url or filepath" }, { status: 400 });
        }

        // Validate filepath
        const safePath = filepath.replace(/^(\.\.(\/|\\|$))+/, '');
        const publicDir = path.join(process.cwd(), "public");
        const fullPath = path.join(publicDir, safePath);

        // Ensure directory exists
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Save Image File
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        if (!response.body) throw new Error("No image body");

        // @ts-ignore
        await streamPipeline(response.body, fs.createWriteStream(fullPath));

        // Save Metadata to History
        if (metadata) {
            const historyPath = path.join(publicDir, "cms-uploads", "history.json");
            let history = [];

            if (fs.existsSync(historyPath)) {
                try {
                    const data = fs.readFileSync(historyPath, "utf-8");
                    history = JSON.parse(data);
                } catch (e) {
                    console.error("Failed to parse history.json", e);
                }
            }

            // Append new entry
            const newEntry = {
                filename: path.basename(safePath),
                path: `/${safePath}`,
                savedAt: Date.now(),
                ...metadata // prompt, pageUrl, slotName
            };

            history.unshift(newEntry); // Newest first
            fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
        }

        return NextResponse.json({ success: true, savedPath: `/${safePath}` });

    } catch (error: any) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
