import { NextRequest, NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

// Basic security middleware (in a real app, use auth)
function isAuthorized(req: NextRequest) {
    // For local dev/virtual CMS, we're assuming localhost access is safe enough.
    // In production, you'd check a session/token.
    return true;
}

export async function POST(req: NextRequest, props: { params: Promise<{ collection: string }> }) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await props.params;
    const collection = params.collection;
    const body = await req.json();

    // Define allowed collections to create/update
    const validCollections = ["site", "capabilities", "platforms", "navigation", "home", "work", "insights", "about"];

    if (!validCollections.includes(collection)) {
        return NextResponse.json({ error: "Invalid collection" }, { status: 400 });
    }

    try {
        const filePath = path.join(process.cwd(), "content", `${collection}.json`);

        // Write the updated JSON to file
        await fs.writeJson(filePath, body, { spaces: 4 });

        return NextResponse.json({ success: true, message: `Updated ${collection}` });
    } catch (error) {
        console.error(`Error writing to ${collection}:`, error);
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}

export async function GET(req: NextRequest, props: { params: Promise<{ collection: string }> }) {
    const params = await props.params;
    const collection = params.collection;
    const filePath = path.join(process.cwd(), "content", `${collection}.json`);

    try {
        if (await fs.pathExists(filePath)) {
            const data = await fs.readJson(filePath);
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
}
