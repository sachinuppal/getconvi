const fs = require('fs');
const path = require('path');

const WORK_FILE = path.join(process.cwd(), 'content/work.json');
const API_BASE = 'http://localhost:3000'; // Assuming verified local port

async function generateImages() {
    let workData = [];
    try {
        workData = JSON.parse(fs.readFileSync(WORK_FILE, 'utf-8'));
    } catch (e) {
        console.error("Failed to read work.json", e);
        process.exit(1);
    }

    const itemsToGenerate = workData.filter(item => item.hero.image_prompt && item.hero.image);

    console.log(`Found ${itemsToGenerate.length} items to check for generation.`);

    for (const item of itemsToGenerate) {
        const imagePath = path.join(process.cwd(), 'public', item.hero.image);
        if (fs.existsSync(imagePath)) {
            console.log(`[Skip] Image exists for ${item.slug}`);
            continue;
        }

        console.log(`[Generating] ${item.slug}...`);

        try {
            // 1. Generate
            const genRes = await fetch(`${API_BASE}/api/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: "image",
                    prompt: item.hero.image_prompt
                })
            });

            if (!genRes.ok) {
                console.error(`Generation failed for ${item.slug}: ${genRes.status} ${genRes.statusText}`);
                continue;
            }

            const genData = await genRes.json();
            if (!genData.success || !genData.data?.url) {
                console.error(`Generation API error for ${item.slug}:`, genData);
                continue;
            }

            const imageUrl = genData.data.url;
            console.log(`   > URL: ${imageUrl}`);

            // 2. Save (and update history)
            // Remove /public from the saved path request, the API expects 'cms-uploads/filename.jpg'
            // The item.hero.image is like "/cms-uploads/filename.jpg". 
            // We need to strip the leading slash for the API likely, or just pass it?
            // Checking save-image route: const safePath = filepath.replace(...) -> join(public, safePath)
            // So if we pass "cms-uploads/foo.jpg" it joins public/cms-uploads/foo.jpg.
            // If we pass "/cms-uploads/foo.jpg" it might double slash or be relative.
            // Let's pass without leading slash.
            const saveFilepath = item.hero.image.startsWith('/') ? item.hero.image.substring(1) : item.hero.image;

            const saveRes = await fetch(`${API_BASE}/api/admin/save-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: imageUrl,
                    filepath: saveFilepath,
                    metadata: {
                        prompt: item.hero.image_prompt,
                        slotName: "Work Hero",
                        pageUrl: `/work` // No detail page for mini items
                    }
                })
            });

            const saveData = await saveRes.json();
            if (saveData.success) {
                console.log(`   > Saved to ${saveData.savedPath}`);
            } else {
                console.error(`   > Save failed: ${saveData.error}`);
            }

        } catch (err) {
            console.error(`   > Error processing ${item.slug}:`, err);
        }

        // Wait a bit to be nice to the API
        await new Promise(r => setTimeout(r, 2000));
    }
}

generateImages();
