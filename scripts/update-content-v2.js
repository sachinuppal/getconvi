const fs = require('fs');
const path = require('path');

// Configuration
const UPDATES = [
    {
        slug: 'revenueable',
        imageUrl: 'https://image.pollinations.ai/prompt/Real-time%20revenue%20intelligence%20system%20visualized%20as%20layered%20data%20planes%2C%20intent%20signals%2C%20attribution%20paths%2C%20and%20conversion%20flows%20converging%20into%20a%20central%20decision%20core%2C%20dark%20enterprise%20SaaS%20aesthetic%2C%20teal%20and%20deep%20blue%20accents%2C%20high-density%20information%20without%20UI%20screens%2C%20cinematic%20lighting%2C%20no%20text%2C%20no%20logos?model=flux&seed=85405&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4',
        filename: 'revenueable-v2.jpg',
        headline: 'Revenue Operating System.'
    },
    {
        slug: 'nexocircle',
        imageUrl: 'https://image.pollinations.ai/prompt/Offline-first%20community%20and%20network%20platform%20visualized%20as%20interconnected%20human%20nodes%20forming%20small%20real-world%20clusters%2C%20warm%20architectural%20spaces%20blended%20with%20abstract%20network%20lines%2C%20premium%20experiential%20aesthetic%2C%20subtle%20social%20energy%2C%20intimate%20yet%20scalable%2C%20no%20faces%2C%20no%20text%2C%20no%20logos?model=flux&seed=974563&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4',
        filename: 'nexocircle-v2.jpg'
    }
];

const WORK_JSON_PATH = path.join(process.cwd(), 'content', 'work.json');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'cms-uploads');

async function downloadImage(url, filename) {
    const dest = path.join(UPLOAD_DIR, filename);
    console.log(`Downloading ${filename}...`);

    // We use global fetch which is available in Node 18+
    const res = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);

    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Saved to ${dest}`);
    return `/cms-uploads/${filename}`;
}

async function main() {
    // 1. Download Images
    const updatesMap = {};
    for (const item of UPDATES) {
        try {
            const localPath = await downloadImage(item.imageUrl, item.filename);
            updatesMap[item.slug] = {
                imagePath: localPath,
                headline: item.headline
            };
        } catch (e) {
            console.error(`Failed to download for ${item.slug}:`, e.message);
        }
    }

    // 2. Update JSON
    console.log('Updating work.json...');
    const workData = JSON.parse(fs.readFileSync(WORK_JSON_PATH, 'utf8'));
    let changesCount = 0;

    const newWorkData = workData.map(item => {
        const update = updatesMap[item.slug];
        if (update) {
            console.log(`Updating ${item.slug}...`);
            changesCount++;

            // Construct new item preserving order but updating fields
            const newItem = { ...item };

            if (update.headline) {
                newItem.headline = update.headline;
            }

            // Ensure hero object exists
            if (!newItem.hero) newItem.hero = {};

            newItem.hero.image = update.imagePath;

            return newItem;
        }
        return item;
    });

    if (changesCount > 0) {
        fs.writeFileSync(WORK_JSON_PATH, JSON.stringify(newWorkData, null, 4));
        console.log(`Successfully updated ${changesCount} items in work.json`);
    } else {
        console.log('No matching slugs found to update.');
    }
}

main();
