const fs = require('fs');
const path = require('path');
const https = require('https');

// Map of User Provided URL -> Target Filename
const IMAGES = [
    {
        filename: 'astrolife365.jpg',
        url: 'https://image.pollinations.ai/prompt/Abstract%20cosmic%20intelligence%20system%20visualized%20as%20layered%20star%20charts%2C%20orbital%20lines%2C%20ephemeris-style%20geometry%2C%20and%20waveform%20signals%20converging%20into%20a%20central%20node%2C%20deep%20blues%20and%20indigo%20tones%2C%20subtle%20glow%2C%20technical%20not%20mystical%2C%20precision%20astrology%20aesthetic%2C%20cinematic%20lighting%2C%20no%20faces%2C%20no%20religious%20icons%2C%20no%20text%2C%20no%20logos?model=flux&seed=220482&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    },
    {
        filename: 'buydatabase-ai.jpg',
        url: 'https://image.pollinations.ai/prompt/Enterprise-scale%20structured%20data%20warehouse%20visualized%20as%20stacked%20modular%20containers%20and%20flowing%20ETL%20pipelines%2C%20schemas%20and%20field%20grids%20subtly%20embossed%20into%20surfaces%2C%20neutral%20industrial%20palette%2C%20dark%20background%2C%20high-scale%20commerce%20intelligence%20feel%2C%20cinematic%20depth%2C%20no%20text%2C%20no%20logos?model=flux&seed=860090&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    },
    {
        filename: 'marketresearchlabs.jpg',
        url: 'https://image.pollinations.ai/prompt/Research%20lab%20aesthetic%3A%20human%20insights%20abstracted%20into%20layered%20data%20planes%20with%20sentiment%20waves%2C%20clustering%20maps%2C%20anonymized%20conversation%20fragments%20as%20subtle%20texture%2C%20charts%20and%20signals%20floating%20in%20a%20dark%20analytical%20environment%2C%20cerebral%20and%20premium%2C%20muted%20tones%20with%20focused%20highlights%2C%20no%20text%2C%20no%20logos?model=flux&seed=11884&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    },
    {
        filename: 'spendsignal.jpg',
        url: 'https://image.pollinations.ai/prompt/Attribution%20and%20signal-detection%20visual%3A%20noisy%20scattered%20data%20points%20resolving%20into%20clean%20trajectories%20and%20crisp%20signal%20lines%2C%20faint%20funnel%2Fattribution%20graph%20geometry%20in%20the%20background%2C%20dark%20background%2C%20sharp%20contrast%2C%20high-clarity%20analytics%20aesthetic%2C%20minimal%20accent%20glow%2C%20no%20text%2C%20no%20logos?model=flux&seed=644761&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    },
    {
        filename: 'pestworld.jpg',
        url: 'https://image.pollinations.ai/prompt/Operational%20control%20and%20containment%20visual%3A%20clean%20facility%20corridors%20with%20containment%20grids%2C%20invisible%20threat%20neutralization%20layers%20shown%20as%20subtle%20protective%20fields%2C%20sterile%20and%20professional%20tone%2C%20abstract%20protection%20infrastructure%2C%20no%20insects%2C%20no%20literal%20pests%2C%20no%20text%2C%20no%20logos?model=flux&seed=954216&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    },
    {
        filename: 'vriksha-ai.jpg',
        url: 'https://image.pollinations.ai/prompt/Sustainability%20and%20impact%20modeling%20visual%3A%20organic%20growth%20rings%20and%20tree-like%20structures%20merged%20with%20data%20layers%2C%20timelines%2C%20and%20forecasting%20contours%2C%20earth-toned%20palette%20with%20subtle%20digital%20overlays%2C%20calm%20long-horizon%20planning%20aesthetic%2C%20premium%20cinematic%20lighting%2C%20no%20text%2C%20no%20logos?model=flux&seed=639136&nologin=true&nologo=true&private=true&token=sk_lhUavIxy2AG3l0bhWaKA9wvsII56wDP4'
    }
];

const DOWNLOAD_DIR = path.join(process.cwd(), 'public', 'cms-uploads');

async function downloadImage(url, filename) {
    const dest = path.join(DOWNLOAD_DIR, filename);
    console.log(`Downloading ${filename}...`);

    return new Promise((resolve, reject) => {
        // Use Global fetch for easier header handling and consistency
        fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status} - ${res.statusText}`);
                return res.arrayBuffer();
            })
            .then(buffer => {
                fs.writeFileSync(dest, Buffer.from(buffer));
                console.log(`Saved to ${dest}`);
                resolve();
            })
            .catch(err => {
                console.error(`Failed to download ${filename}:`, err.message);
                reject(err);
            });
    });
}

(async () => {
    if (!fs.existsSync(DOWNLOAD_DIR)) fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

    for (const img of IMAGES) {
        try {
            await downloadImage(img.url, img.filename);
        } catch (e) {
            console.error("Skipping", img.filename);
        }
    }
})();
