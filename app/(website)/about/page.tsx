import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-32 px-6 pb-24 max-w-7xl mx-auto min-h-screen">
            {/* HERO */}
            <div className="mb-24">
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">We build capabilities.<br />Platforms are the outcome.</h1>
                <p className="text-xl text-gray-500 font-light max-w-2xl mb-12">
                    Getconvi is an operator-led platform group that builds, runs, and compounds shared capabilities across AI, voice, community, and infrastructure businesses.
                </p>
                <div className="flex gap-6">
                    <Link href="/studios" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        Explore platforms
                    </Link>
                    <Link href="/capabilities" className="bg-surface-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors">
                        View capabilities
                    </Link>
                </div>
            </div>

            {/* INTRO */}
            <div className="mb-24 border-l-2 border-electric-blue pl-8 py-4">
                <h2 className="text-3xl font-heading font-medium mb-6">Not a studio. Not an agency. Not a holding company.</h2>
                <div className="text-lg text-gray-500 font-light max-w-3xl space-y-4">
                    <p>Getconvi exists to do one thing well: build reusable capabilities and apply them to real problems.</p>
                    <p>Every platform inside Getconvi is live, operated, and improved in-market.</p>
                    <p className="font-medium text-black">No pitch decks. No experiments without ownership.</p>
                </div>
            </div>

            {/* HOW WE THINK */}
            <div className="mb-32">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-4xl font-heading font-medium mb-4">Capability-first,<br />not idea-first.</h2>
                    </div>
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-surface-50 p-8 rounded border border-surface-100">
                            <h3 className="text-lg font-bold mb-3">Ideas are cheap.</h3>
                            <p className="text-gray-600">Capabilities are earned.</p>
                        </div>
                        <div className="bg-surface-50 p-8 rounded border border-surface-100">
                            <h3 className="text-lg font-bold mb-3">Platforms validate.</h3>
                            <p className="text-gray-600">Capabilities are tested under pressure.</p>
                        </div>
                        <div className="bg-surface-50 p-8 rounded border border-surface-100">
                            <h3 className="text-lg font-bold mb-3">Learning compounds.</h3>
                            <p className="text-gray-600">Only when systems are shared.</p>
                        </div>
                        <div className="bg-electric-pink text-white p-8 rounded">
                            <h3 className="text-lg font-bold mb-3">We don’t chase categories.</h3>
                            <p className="opacity-90">We deepen capabilities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE GETCONVI CAPABILITY STACK */}
            <div className="mb-32">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-12 text-gray-400">The Getconvi Capability Stack</h2>
                <div className="space-y-16">
                    {[
                        { title: "Games", desc: "Gamified systems that drive learning, engagement, and repeat behavior.", why: "Games reveal truth fast—about users, systems, and incentives.", applied: "PokerShark.ai · TripsyGames · House.Games" },
                        { title: "Entertainment", desc: "Interactive content and experience design that earns attention.", why: "Retention is a design problem, not a marketing one.", applied: "NexoCircle · AstroLife365 · NRIKosh" },
                        { title: "Technology", desc: "Core software systems, AI workflows, and scalable architectures.", why: "Ideas die without execution discipline.", applied: "Revenueable.ai · Vriksha.ai · LexCapstone · MarketResearchLabs" },
                        { title: "Communications", desc: "Real-time, context-aware messaging and conversational systems.", why: "Feedback loops decide speed and quality.", applied: "NexoCircle · Telecallers.ai · AstroLife365 · MarketResearchLabs" },
                        { title: "Operations", desc: "Workflow automation, logistics, and real-world execution systems.", why: "Reality is operational. Systems must survive it.", applied: "BuilderPick · PestWorld · SlaySwag · EstateKart" },
                        { title: "Networks", desc: "Human, data, and agent networks that compound value through connection and trust.", why: "Products scale. Networks compound.", applied: "NexoCircle · PujaBook · IMX · CallerConnection" },
                        { title: "Voice", desc: "AI-driven voice infrastructure and call orchestration.", why: "Voice is the hardest interface. It forces clarity.", applied: "Aurl.ai · Telecallers.ai · AstroLife365 · MarketResearchLabs" },
                        { title: "Integration", desc: "APIs, data flow, attribution, and system connectivity.", why: "Disconnected systems create false confidence.", applied: "SpendSignal · Revenueable.ai · ListOnChatGPT · BuyDatabase.ai" },
                    ].map((item, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-100 pb-12 last:border-0">
                            <div className="md:col-span-3">
                                <span className="text-xs font-mono text-gray-400 mb-2 block">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="text-2xl font-heading font-medium">{item.title}</h3>
                            </div>
                            <div className="md:col-span-5">
                                <p className="text-lg font-medium text-black mb-2">{item.desc}</p>
                                <p className="text-gray-500 italic">"{item.why}"</p>
                            </div>
                            <div className="md:col-span-4 flex items-end justify-start md:justify-end">
                                <div className="text-sm text-gray-500 font-mono text-right">{item.applied}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOW WE BUILD */}
            <div className="mb-32 bg-surface-50 p-12 rounded-lg">
                <h2 className="text-4xl font-heading font-medium mb-12">Build. Operate. Learn. Repeat.</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {["Identify a real, recurring problem", "Apply existing capabilities first", "Ship fast with ownership", "Operate under real constraints", "Improve the shared stack"].map((step, i) => (
                        <div key={i} className="flex flex-col gap-4">
                            <span className="text-4xl font-light text-gray-200">{String(i + 1).padStart(2, '0')}</span>
                            <p className="font-medium text-gray-900">{step}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 font-mono text-sm text-gray-500 uppercase tracking-widest text-center">
                    Platforms earn their place by surviving.
                </div>
            </div>

            {/* WHAT MAKES GETCONVI DIFFERENT */}
            <div className="mb-32">
                <h2 className="text-4xl md:text-5xl font-heading font-medium mb-12">What makes us different.</h2>
                <ul className="space-y-6">
                    {[
                        "No platform is “advisory only”",
                        "No capability is theoretical",
                        "No product is built in isolation",
                        "No learning stays siloed",
                        "Every success and failure feeds the system."
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-xl md:text-2xl font-light text-gray-800">
                            <ArrowUpRight className="w-6 h-6 text-electric-blue flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* WHO WE WORK WITH */}
            <div className="mb-32 border-y border-gray-100 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-medium mb-4">Who we work with.</h2>
                        <p className="text-gray-500">If the problem is real, we’re interested.</p>
                    </div>
                    <div className="space-y-4">
                        {["Founders building real products", "Operators scaling systems", "Enterprises seeking execution partners", "Teams solving hard, messy problems"].map((partner, i) => (
                            <div key={i} className="bg-white border border-gray-200 p-4 rounded-lg text-gray-800 font-medium text-center">
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CLOSING */}
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-medium mb-8">Capabilities compound.<br />Platforms follow.</h2>
                <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto mb-12">
                    Getconvi is designed to outlast individual products by investing in what truly scales—capability depth.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                    <Link href="/studios" className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">
                        Explore platforms
                    </Link>
                    <Link href="/capabilities" className="bg-surface-100 text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors w-full sm:w-auto text-center">
                        View capabilities
                    </Link>
                    <Link href="/connect" className="bg-electric-blue text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto text-center">
                        Start a conversation
                    </Link>
                </div>
                <p className="mt-8 text-sm text-gray-400">We’ll tell you quickly if there’s a fit.</p>
            </div>
        </div>
    );
}
