// global fetch
const prompt = "Abstract cosmic intelligence system";
// New Format
const newUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?model=flux&seed=12345&nologin=true&nologo=true`;
// Old Format for comparison (optional)
const oldUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&seed=12345&nologin=true&nologo=true`;

async function testUrl(url, label) {
    console.log(`Testing ${label}: ${url}`);
    try {
        // We need a proper User-Agent to avoid 403 blocks AND to perhaps get the right content
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        console.log(`Status (${label}): ${res.status}`);
        const contentType = res.headers.get('content-type');
        console.log(`Content-Type (${label}): ${contentType}`);

        if (res.ok) {
            const buffer = await res.arrayBuffer();
            console.log(`Size (${label}): ${buffer.byteLength} bytes`);
        }
    } catch (e) {
        console.error(`Error (${label}):`, e.message);
    }
}

// Global fetch wrapper if node-fetch fails
async function main() {
    await testUrl(newUrl, "NEW");
    await testUrl(oldUrl, "OLD");
}

main();
