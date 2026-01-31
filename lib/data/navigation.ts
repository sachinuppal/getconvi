import { Navigation } from "@/types/cms";

export const headerNav: Navigation = {
    name: "Header",
    items: [
        {
            label: "Method",
            href: "/about",
            type: "link"
        },
        {
            label: "Capabilities",
            href: "/capabilities",
            type: "dropdown",
            columns: [
                {
                    title: "Systems & Intelligence",
                    items: [
                        { label: "AI & Automation", href: "/capabilities/ai-automation", description: "Agents, workflows & decision engines." },
                        { label: "Product Engineering", href: "/capabilities/product-engineering", description: "Scalable tech infrastructure." },
                        { label: "Integration", href: "/capabilities/integration", description: "APIs & system connectivity." },
                        { label: "Voice", href: "/capabilities/voice", description: "AI-driven call orchestration." }
                    ]
                },
                {
                    title: "Growth & Experience",
                    items: [
                        { label: "Growth & Performance", href: "/capabilities/growth-performance", description: "Behavioral design & acquisition." },
                        { label: "Content & Creative", href: "/capabilities/content-creative", description: "Emotional continuity & media." },
                        { label: "Community & Experiential", href: "/capabilities/community-experiential", description: "Networks & trust engines." }
                    ]
                }
            ]
        },
        {
            label: "Studios",
            href: "/studios",
            type: "dropdown",
            columns: [
                {
                    title: "Growth & Enterprise",
                    items: [
                        { label: "SachinUppal.com", href: "/studios/sachinuppal", description: "Personal brand & portfolio." },
                        { label: "Revenueable", href: "/studios/revenueable", description: "AI revenue operating system." },
                        { label: "Vriksha.ai", href: "/studios/vriksha", description: "AI venture studio." },
                        { label: "ListOnChatGPT", href: "/studios/listonchatgpt", description: "LLM visibility tool." },
                        { label: "SpendSignal", href: "/studios/spendsignal", description: "Attribution platform." },
                        { label: "SlaySwag", href: "/studios/slayswag", description: "Corporate gifting." }
                    ]
                },
                {
                    title: "Ops & Networks",
                    items: [
                        { label: "BuilderPick", href: "/studios/builderpick", description: "Construction logistics." },
                        { label: "EstateKart", href: "/studios/estatekart", description: "NRI real estate." },
                        { label: "PestWorld", href: "/studios/pestworld", description: "Service CRM." },
                        { label: "NexoCircle", href: "/studios/nexocircle", description: "Offline-first communities." },
                        { label: "NRIKosh", href: "/studios/nrikosh", description: "NRI concierge." },
                        { label: "LexCapstone", href: "/studios/lexcapstone", description: "Legal education." }
                    ]
                },
                {
                    title: "Voice & Consumer",
                    items: [
                        { label: "Aurl", href: "/studios/aurl", description: "Voice infrastructure." },
                        { label: "Telecallers", href: "/studios/telecallers", description: "SMB sales agent." },
                        { label: "MarketResearchLabs", href: "/studios/marketresearchlabs", description: "Voice surveys." },
                        { label: "AstroLife365", href: "/studios/astrolife", description: "Voice astrology." },
                        { label: "PokerShark", href: "/studios/pokershark", description: "AI poker coaching." },
                        { label: "PujaDaily.com", href: "/studios/pujadaily", description: "Spiritual network." }
                    ]
                }
            ]
        },
        {
            label: "Work",
            href: "/work",
            type: "link"
        },
        {
            label: "Insights",
            href: "/insights",
            type: "link"
        },
        {
            label: "Connect",
            href: "/connect",
            type: "link"
        }
    ]
};

export const footerNav: Navigation = {
    name: "Footer",
    items: [
        {
            label: "Capabilities",
            href: "/capabilities",
            type: "dropdown",
            columns: [
                {
                    items: [
                        { label: "AI & Automation", href: "/capabilities/ai-automation" },
                        { label: "Product Engineering", href: "/capabilities/product-engineering" },
                        { label: "Growth & Performance", href: "/capabilities/growth-performance" },
                        { label: "Content & Creative", href: "/capabilities/content-creative" },
                        { label: "Community & Experiential", href: "/capabilities/community-experiential" },
                        { label: "Integration", href: "/capabilities/integration" },
                        { label: "Voice", href: "/capabilities/voice" }
                    ]
                }
            ]
        },
        {
            label: "Studios",
            href: "/studios",
            type: "dropdown",
            columns: [
                {
                    items: [
                        { label: "SachinUppal.com", href: "/studios/sachinuppal" },
                        { label: "Revenueable", href: "/studios/revenueable" },
                        { label: "Vriksha.ai", href: "/studios/vriksha" },
                        { label: "ListOnChatGPT", href: "/studios/listonchatgpt" },
                        { label: "SpendSignal", href: "/studios/spendsignal" },
                        { label: "SlaySwag", href: "/studios/slayswag" },
                        { label: "BuilderPick", href: "/studios/builderpick" },
                        { label: "EstateKart", href: "/studios/estatekart" },
                        { label: "PestWorld", href: "/studios/pestworld" }
                    ]
                },
                {
                    items: [
                        { label: "NexoCircle", href: "/studios/nexocircle" },
                        { label: "NRIKosh", href: "/studios/nrikosh" },
                        { label: "LexCapstone", href: "/studios/lexcapstone" },
                        { label: "Aurl", href: "/studios/aurl" },
                        { label: "Telecallers", href: "/studios/telecallers" },
                        { label: "MarketResearchLabs", href: "/studios/marketresearchlabs" },
                        { label: "AstroLife365", href: "/studios/astrolife" },
                        { label: "PokerShark", href: "/studios/pokershark" },
                        { label: "PujaDaily.com", href: "/studios/pujadaily" }
                    ]
                }
            ]
        },
        {
            label: "Company",
            href: "/about",
            type: "dropdown",
            columns: [
                {
                    items: [
                        { label: "Who We Are", href: "/about" },
                        { label: "Our Work", href: "/work" },
                        { label: "Insights", href: "/insights" },
                        { label: "Connect", href: "/connect" }
                    ]
                }
            ]
        }
    ]
};

export const legalNav: Navigation = {
    name: "Legal",
    items: [
        {
            label: "Legal",
            href: "/legal",
            type: "link", // Flat list effectively
            columns: [
                {
                    items: [
                        { label: "Privacy Policy", href: "/privacy" },
                        { label: "Terms of Service", href: "/terms" }
                    ]
                }
            ]
        }
    ]
};
