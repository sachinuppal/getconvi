const fs = require('fs');
const path = require('path');

const WORK_FILE = path.join(process.cwd(), 'content/work.json');

const newItems = [
    {
        slug: "pokershark-ai",
        client: "PokerShark.ai",
        headline: "AI-powered poker analysis engine for decision review and ROI tracking.",
        tags: {
            capability: ["Games"],
            industry: "Gaming",
            outcome: "Player Ranking"
        },
        hero: {
            title: "PokerShark.ai",
            outcome: "AI-powered poker analysis engine.",
            image_prompt: "Dark cinematic render of a poker table dissolving into data streams, probability graphs, and neural network lines. Moody lighting, black and deep green tones, abstract not literal cards, high-tech strategy aesthetic.",
            image: "/cms-uploads/pokershark-ai.jpg"
        }
    },
    {
        slug: "tripsygames",
        client: "TripsyGames",
        headline: "Casual and social games designed for rapid experimentation.",
        tags: {
            capability: ["Games"],
            industry: "Gaming",
            outcome: "Engagement Mechanics"
        },
        hero: {
            title: "TripsyGames",
            outcome: "Rapid experimentation in engagement mechanics.",
            image_prompt: "Abstract modular game blocks floating in a dark space, glowing interaction points, minimal UI fragments, playful but sophisticated, no characters, system-driven design language.",
            image: "/cms-uploads/tripsygames.jpg"
        }
    },
    {
        slug: "house-games",
        client: "House.Games",
        headline: "Private, real-money and social gaming infrastructure.",
        tags: {
            capability: ["Games"],
            industry: "Gaming",
            outcome: "Community Systems"
        },
        hero: {
            title: "House.Games",
            outcome: "Private gaming infrastructure for closed communities.",
            image_prompt: "Secure private room rendered as a digital vault, soft lighting, layered permissions and access rings visualized abstractly, premium and exclusive feel.",
            image: "/cms-uploads/house-games.jpg"
        }
    },
    {
        slug: "pujadaily",
        client: "PujaDaily",
        headline: "Spiritual social platform combining daily rituals and community.",
        tags: {
            capability: ["Networks", "Voice"],
            industry: "Consumer Social",
            outcome: "Content Systems"
        },
        hero: {
            title: "PujaDaily / PujaBook",
            outcome: "Spiritual social platform.",
            image_prompt: "Calm, dark-toned sacred geometry with soft golden light, abstract ritual symbols, modern minimal spirituality, no gods or faces, serene and timeless.",
            image: "/cms-uploads/pujadaily.jpg"
        }
    },
    {
        slug: "astrolife365",
        client: "AstroLife365",
        headline: "Always-on astrology and guidance platform powered by AI.",
        tags: {
            capability: ["Voice", "Networks"],
            industry: "Consumer Tech",
            outcome: "AI Guidance"
        },
        hero: {
            title: "AstroLife365",
            outcome: "AI and voice agent powered astrology.",
            image_prompt: "Star maps and cosmic charts morphing into waveform patterns, deep blues and purples, mystical but technical, precision over fantasy.",
            image: "/cms-uploads/astrolife365.jpg"
        }
    },
    {
        slug: "listonchatgpt",
        client: "ListOnChatGPT.com",
        headline: "Technical SEO diagnostic tool to audit AI crawler access.",
        tags: {
            capability: ["Integration"],
            industry: "MarTech",
            outcome: "Infrastructure"
        },
        hero: {
            title: "ListOnChatGPT.com",
            outcome: "Audit AI crawler access and visibility readiness.",
            image_prompt: "Robots.txt files visualized as architectural blueprints, scanners and validation grids, monochrome with subtle neon accents, precision engineering vibe.",
            image: "/cms-uploads/listonchatgpt.jpg"
        }
    },
    {
        slug: "buydatabase-ai",
        client: "BuyDatabase.ai",
        headline: "Structured product and supplier intelligence extraction.",
        tags: {
            capability: ["Integration"],
            industry: "Commerce",
            outcome: "Data Systems"
        },
        hero: {
            title: "BuyDatabase.ai",
            outcome: "Product and supplier intelligence extraction.",
            image_prompt: "Massive data warehouse visualized as stacked containers of structured fields, flowing pipelines, neutral industrial palette.",
            image: "/cms-uploads/buydatabase-ai.jpg"
        }
    },
    {
        slug: "marketresearchlabs",
        client: "MarketResearchLabs.ai",
        headline: "AI-driven market, consumer, and narrative research engine.",
        tags: {
            capability: ["Technology"],
            industry: "Research",
            outcome: "Research Systems"
        },
        hero: {
            title: "MarketResearchLabs.ai",
            outcome: "AI-driven market and consumer research.",
            image_prompt: "Abstract human silhouettes formed from survey data, conversation fragments, and charts, dark research-lab aesthetic, intelligence-focused.",
            image: "/cms-uploads/marketresearchlabs.jpg"
        }
    },
    {
        slug: "spendsignal",
        client: "SpendSignal",
        headline: "Attribution and signal-detection system for hidden revenue.",
        tags: {
            capability: ["Integration"],
            industry: "FinTech",
            outcome: "Revenue Intelligence"
        },
        hero: {
            title: "SpendSignal",
            outcome: "Signal-detection system for spend efficiency.",
            image_prompt: "Financial signals emerging from noise, waveforms turning into clear lines, dark background, sharp clarity contrast.",
            image: "/cms-uploads/spendsignal.jpg"
        }
    },
    {
        slug: "builderpick",
        client: "BuilderPick.com",
        headline: "Logistics and procurement platform for construction.",
        tags: {
            capability: ["Operations"],
            industry: "Construction",
            outcome: "Infrastructure"
        },
        hero: {
            title: "BuilderPick.com",
            outcome: "Logistics and procurement platform.",
            image_prompt: "Construction materials represented as modular system blocks moving through optimized paths, industrial realism without trucks or people.",
            image: "/cms-uploads/builderpick.jpg"
        }
    },
    {
        slug: "pestworld",
        client: "PestWorld.co.in",
        headline: "Operations and lead-management system for pest control.",
        tags: {
            capability: ["Operations"],
            industry: "Field Services",
            outcome: "Growth Engines"
        },
        hero: {
            title: "PestWorld.co.in",
            outcome: "Operations management system.",
            image_prompt: "Clean, controlled environments with invisible threat layers neutralized, abstract containment visuals, not literal pests.",
            image: "/cms-uploads/pestworld.jpg"
        }
    },
    {
        slug: "slayswag",
        client: "SlaySwag.com",
        headline: "End-to-end corporate gifting platform with credit-led operations.",
        tags: {
            capability: ["Operations"],
            industry: "Commerce",
            outcome: "Commerce Systems"
        },
        hero: {
            title: "SlaySwag.com",
            outcome: "Corporate gifting platform.",
            image_prompt: "Premium gift boxes abstracted into supply-chain flows, elegant material textures, enterprise-grade polish.",
            image: "/cms-uploads/slayswag.jpg"
        }
    },
    {
        slug: "lexcapstone",
        client: "LexCapstone.com",
        headline: "Structured legal and compliance knowledge systems.",
        tags: {
            capability: ["Technology"],
            industry: "LegalTech",
            outcome: "Knowledge Systems"
        },
        hero: {
            title: "LexCapstone.com",
            outcome: "Legal and compliance knowledge system.",
            image_prompt: "Legal documents rendered as architectural slabs, order, symmetry, muted tones, trust-first aesthetic.",
            image: "/cms-uploads/lexcapstone.jpg"
        }
    },
    {
        slug: "vriksha-ai",
        client: "Vriksha.ai",
        headline: "AI systems for sustainability, planning, and impact modeling.",
        tags: {
            capability: ["Technology"],
            industry: "Sustainability",
            outcome: "Data Modeling"
        },
        hero: {
            title: "Vriksha.ai",
            outcome: "AI systems for sustainability.",
            image_prompt: "Tree growth rings merging with data layers and timelines, organic-meets-system visual language.",
            image: "/cms-uploads/vriksha-ai.jpg"
        }
    },
    {
        slug: "imx",
        client: "IMX",
        headline: "Fantasy-market platform where influencers trade as assets.",
        tags: {
            capability: ["Networks", "Games"],
            industry: "Creator Economy",
            outcome: "Market Systems"
        },
        hero: {
            title: "IMX (Influencer Market Exchange)",
            outcome: "Fantasy-market platform for influencers.",
            image_prompt: "Stock exchange abstracted with human influence nodes, fluctuating value lines, modern financial energy, no faces.",
            image: "/cms-uploads/imx.jpg"
        }
    }
];

// Read existing
let existing = [];
try {
    existing = JSON.parse(fs.readFileSync(WORK_FILE, 'utf-8'));
} catch (e) {
    console.error("Failed to read work.json", e);
    process.exit(1);
}

// Check for duplicates before adding
let addedCount = 0;
newItems.forEach(item => {
    if (!existing.find(e => e.slug === item.slug)) {
        existing.push(item);
        addedCount++;
    }
});

fs.writeFileSync(WORK_FILE, JSON.stringify(existing, null, 4));
console.log(`Updated work.json. Added ${addedCount} new items. Total: ${existing.length}`);
