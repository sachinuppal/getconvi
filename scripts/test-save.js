// using global fetch


const API_Endpoint = 'http://localhost:3000/api/admin/save-image';
const IMAGE_URL = "https://image.pollinations.ai/prompt/Construction%20logistics%20system%20represented%20through%20modular%20concrete%20slabs%20and%20material%20blocks%20moving%20through%20optimized%20paths%2C%20architectural%20precision%2C%20industrial%20realism%20without%20vehicles%20or%20people%2C%20neutral%20stone%20and%20steel%20palette?model=flux&seed=78989&nologin=true&nologo=true";

async function testSave() {
    console.log("Attempting to save image...");
    try {
        const res = await fetch(API_Endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: IMAGE_URL,
                filepath: 'cms-uploads/debug-test-image.jpg',
                metadata: {
                    prompt: "Debug Prompt",
                    slotName: "Debug Slot",
                    pageUrl: "/debug"
                }
            })
        });

        const data = await res.json();
        console.log("Status:", res.status);
        console.log("Response:", data);

    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testSave();
