import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export async function POST(req: NextRequest) {
    try {
        const { file, path: jsonPath, value } = await req.json();

        if (!file || !jsonPath || value === undefined) {
            return NextResponse.json({ error: "Missing file, path, or value" }, { status: 400 });
        }

        // Security check: only allow files in 'content' dir
        if (file.includes("/") || file.includes("..")) {
            return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "content", file);
        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const content = await readFile(filePath, "utf-8");
        let data = JSON.parse(content);

        // Update logic (support dot notation e.g. "hero.image_url")
        const keys = jsonPath.split(".");
        let current = data;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) current[key] = {};
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;

        await writeFile(filePath, JSON.stringify(data, null, 4));

        return NextResponse.json({ success: true, updated: { file, path: jsonPath, value } });

    } catch (error: any) {
        console.error("Content Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
