const http = require('http');

const links = [
    // Top Level
    "/about",
    "/capabilities",
    "/studios",
    "/work",
    "/insights",
    "/connect",

    // Capabilities
    "/capabilities/technology",
    "/capabilities/integration",
    "/capabilities/operations",
    "/capabilities/voice",
    "/capabilities/entertainment",
    "/capabilities/games",
    "/capabilities/networks",
    "/capabilities/communications",

    // Studios
    "/studios/revenueable",
    "/studios/aurl",
    "/studios/builderpick",
    "/studios/nexocircle",
    "/studios/pujadaily",
    "/studios/pokershark",

    // Legal
    "/privacy",
    "/terms"
];

async function checkLink(path) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'HEAD' // Use HEAD for speed
        };

        const req = http.request(options, (res) => {
            resolve({ path, status: res.statusCode });
        });

        req.on('error', (e) => {
            resolve({ path, status: 'ERROR: ' + e.message });
        });

        req.end();
    });
}

async function run() {
    console.log("Checking links against http://localhost:3000...");
    let failureCount = 0;

    // Run sequentially to avoid overwhelming dev server
    for (const link of links) {
        const result = await checkLink(link);
        if (result.status === 200) {
            console.log(`[PASS] ${result.path} (200)`);
        } else {
            console.log(`[FAIL] ${result.path} (${result.status})`);
            failureCount++;
        }
    }

    if (failureCount > 0) {
        console.log(`\nFound ${failureCount} broken links.`);
        process.exit(1);
    } else {
        console.log("\nAll links verified successfully!");
    }
}

run();
