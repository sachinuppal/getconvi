const fs = require('fs');
const path = require('path');

const WORK_FILE = path.join(process.cwd(), 'content/work.json');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

try {
    const workData = JSON.parse(fs.readFileSync(WORK_FILE, 'utf-8'));
    console.log(`Checking ${workData.length} work items...`);

    const missing = [];
    const present = [];

    workData.forEach(item => {
        if (!item.hero.image) {
            console.log(`[WARN] ${item.slug} has no hero.image configured.`);
            return;
        }

        const relativePath = item.hero.image;
        const fullPath = path.join(PUBLIC_DIR, relativePath);

        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);
            present.push({ slug: item.slug, size: stats.size });
        } else {
            console.log(`[MISSING] ${item.slug} -> expected at ${relativePath}`);
            missing.push(item.slug);
        }
    });

    console.log("\nSummary:");
    console.log(`Present: ${present.length}`);
    console.log(`Missing: ${missing.length}`);
    console.log("Missing Slugs:", missing.join(", "));

} catch (e) {
    console.error("Error:", e);
}
