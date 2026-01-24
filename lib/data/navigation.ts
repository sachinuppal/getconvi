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
                        { label: "Technology", href: "/capabilities/technology", description: "Core software & AI workflows." },
                        { label: "Integration", href: "/capabilities/integration", description: "APIs & system connectivity." },
                        { label: "Operations", href: "/capabilities/operations", description: "Real-world execution systems." },
                        { label: "Voice", href: "/capabilities/voice", description: "AI-driven call orchestration." }
                    ]
                },
                {
                    title: "Experience & Networks",
                    items: [
                        { label: "Entertainment", href: "/capabilities/entertainment", description: "Interactive content & media." },
                        { label: "Games", href: "/capabilities/games", description: "Gamified retention systems." },
                        { label: "Networks", href: "/capabilities/networks", description: "Compounding value loops." },
                        { label: "Communications", href: "/capabilities/communications", description: "Real-time messaging." }
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
                    title: "Enterprise Solutions",
                    items: [
                        { label: "Revenueable", href: "/studios/revenueable", description: "AI revenue operating system." },
                        { label: "Aurl", href: "/studios/aurl", description: "Voice infrastructure." },
                        { label: "BuilderPick", href: "/studios/builderpick", description: "Construction logistics." }
                    ]
                },
                {
                    title: "Consumer & Community",
                    items: [
                        { label: "NexoCircle", href: "/studios/nexocircle", description: "Offline-first communities." },
                        { label: "PujaDaily", href: "/studios/pujadaily", description: "Daily devotion platform." },
                        { label: "PokerShark", href: "/studios/pokershark", description: "AI poker coaching." }
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
                        { label: "Technology", href: "/capabilities/technology" },
                        { label: "Integration", href: "/capabilities/integration" },
                        { label: "Operations", href: "/capabilities/operations" },
                        { label: "Voice", href: "/capabilities/voice" },
                        { label: "Entertainment", href: "/capabilities/entertainment" },
                        { label: "Games", href: "/capabilities/games" },
                        { label: "Networks", href: "/capabilities/networks" },
                        { label: "Communications", href: "/capabilities/communications" }
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
                        { label: "Revenueable", href: "/studios/revenueable" },
                        { label: "NexoCircle", href: "/studios/nexocircle" },
                        { label: "PujaDaily", href: "/studios/pujadaily" },
                        { label: "PokerShark", href: "/studios/pokershark" },
                        { label: "Aurl", href: "/studios/aurl" },
                        { label: "BuilderPick", href: "/studios/builderpick" }
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
