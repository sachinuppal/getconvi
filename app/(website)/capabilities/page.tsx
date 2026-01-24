import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
    {
        title: "Games",
        description: "Gamified systems that reveal behavior, sharpen incentives, and drive repeat action.",
        enables: ["Fast onboarding and learning curves", "Motivation through progress and feedback", "Repeat engagement without coercion"],
        applied: ["PokerShark.ai", "TripsyGames", "House.Games"],
        why: "Games expose truth faster than dashboards."
    },
    {
        title: "Entertainment",
        description: "Interactive content and experience design that earns attention and sustains interest.",
        enables: ["Emotional connection", "Habitual consumption", "Long-form attention"],
        applied: ["NexoCircle", "AstroLife365", "NRIKosh"],
        why: "Retention is designed, not demanded."
    },
    {
        title: "Technology",
        description: "Core software, AI workflows, and scalable systems built to execute ideas reliably.",
        enables: ["Scalable architectures", "AI-native workflows", "Product systems that survive growth"],
        applied: ["Revenueable.ai", "Vriksha.ai", "LexCapstone", "MarketResearchLabs"],
        why: "Ideas die without execution discipline."
    },
    {
        title: "Communications",
        description: "Real-time, context-aware messaging and conversational feedback loops.",
        enables: ["Two-way interaction", "Context-aware engagement", "Faster feedback loops"],
        applied: ["NexoCircle", "Telecallers.ai", "AstroLife365", "MarketResearchLabs"],
        why: "Speed and clarity are communication problems."
    },
    {
        title: "Operations",
        description: "Workflow automation, logistics, and real-world execution systems that survive reality.",
        enables: ["Reliability under real-world constraints", "Multi-party coordination", "Predictable outcomes"],
        applied: ["BuilderPick", "PestWorld", "SlaySwag", "EstateKart"],
        why: "Reality is operational."
    },
    {
        title: "Networks",
        description: "Human, data, and agent networks that compound value through connection and trust.",
        enables: ["Compound value creation", "Trust-based connections", "Decentralized growth"],
        applied: ["NexoCircle", "PujaBook / PujaDaily", "IMX", "Caller Connection Doctor"],
        why: "Products scale. Networks compound."
    },
    {
        title: "Voice",
        description: "AI-driven voice infrastructure and call orchestration for high-intent interaction.",
        enables: ["Natural human interaction", "24×7 conversational scale", "Low-latency response systems"],
        applied: ["Aurl.ai", "Telecallers.ai", "AstroLife365", "MarketResearchLabs"],
        why: "Voice forces clarity — there’s nowhere to hide."
    },
    {
        title: "Integration",
        description: "APIs, attribution, and system connectivity that prevent false confidence.",
        enables: ["Data flow across tools", "Attribution and visibility", "Automation without fragility"],
        applied: ["SpendSignal", "Revenueable.ai", "ListOnChatGPT", "BuyDatabase.ai"],
        why: "Disconnected systems lie."
    },
];

export default function CapabilitiesPage() {
    return (
        <div className="pt-32 px-6 pb-24 max-w-7xl mx-auto min-h-screen">
            {/* HERO */}
            <div className="mb-24">
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">Capabilities that compound<br />across platforms.</h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mb-12">
                    Getconvi doesn’t build one-off products. We build reusable capabilities—applied across games, AI, voice, community, and infrastructure platforms.
                </p>
                <div className="flex gap-6">
                    <Link href="/studios" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        Explore platforms
                    </Link>
                    <Link href="/about" className="bg-surface-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors">
                        See how we build
                    </Link>
                </div>
            </div>

            {/* INTRO */}
            <div className="mb-24 border-l-2 border-electric-blue pl-8 py-4">
                <h2 className="text-3xl font-heading font-medium mb-6">Built once. Applied many times.</h2>
                <div className="text-lg text-gray-500 font-light max-w-3xl space-y-4">
                    <p>Each Getconvi platform is different on the surface. Underneath, they share a small set of deeply practiced capabilities.</p>
                    <p>These capabilities are forged through real usage, real failures, and real scale—not theory.</p>
                </div>
            </div>

            {/* CAPABILITIES GRID */}
            <div className="grid grid-cols-1 gap-16">
                {capabilities.map((cap, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-16">
                        <div className="md:col-span-4">
                            <span className="text-electric-blue font-mono text-xs uppercase tracking-widest mb-4 block">Capability {String(index + 1).padStart(2, '0')}</span>
                            <h3 className="text-4xl font-heading font-medium mb-4">{cap.title}</h3>
                            <p className="text-lg text-gray-500 font-light leading-relaxed">{cap.description}</p>
                        </div>

                        <div className="md:col-span-4 space-y-8">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">What this enables</h4>
                                <ul className="space-y-3">
                                    {cap.enables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-600">
                                            <span className="mt-1.5 w-1.5 h-1.5 bg-electric-blue rounded-full flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">Why it matters</h4>
                                <p className="text-gray-600 italic border-l-2 border-gray-200 pl-4 py-1">
                                    "{cap.why}"
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-4 bg-surface-50 p-8 rounded-lg">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-black">Applied In</h4>
                            <div className="space-y-3">
                                {cap.applied.map((app, i) => (
                                    <div key={i} className="flex items-center gap-2 text-gray-900 font-medium">
                                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                        {app}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* CLOSING */}
            <div className="mt-32 pt-24 border-t border-gray-200 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-medium mb-8">Capabilities are the real asset.</h2>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12">
                    Platforms come and go. Capabilities compound. Getconvi invests in the latter.
                </p>
                <div className="flex justify-center gap-6">
                    <Link href="/studios" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        View platforms
                    </Link>
                    <Link href="/connect" className="bg-surface-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors">
                        Start a conversation
                    </Link>
                </div>
            </div>
        </div>
    );
}
