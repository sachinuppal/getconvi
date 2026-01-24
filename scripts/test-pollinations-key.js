// global fetch
const prompt = "Abstract cosmic intelligence system";
// Private Authenticated URL
const privateUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=flux&seed=12345&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4`;

async function testUrl(url, label) {
    console.log(`Testing ${label}: ${url}`);
    try {
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
        } else {
            const text = await res.text();
            console.log(`Error Body (${label}):`, text.substring(0, 500));
        }
    } catch (e) {
        console.error(`Error (${label}):`, e.message);
    }
}

async function main() {
    await testUrl(privateUrl, "PRIVATE_KEY");
}

main();
