import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { capabilities } from "@/lib/data/capabilities";

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
                <h2 className="text-3xl font-heading font-medium mb-6">Most companies build products.<br />Some build platforms.<br />Very few build capabilities.</h2>
                <div className="text-lg text-gray-500 font-light max-w-3xl space-y-4">
                    <p>GetConvi exists in that third category.</p>
                    <p>We believe products are temporary expressions of deeper strengths. Markets shift. Use cases evolve. Technology cycles reset. But capabilities compound — across industries, across time, across entirely different problem spaces.</p>
                    <p>Every GetConvi platform looks different on the surface. But underneath, they are built from the same set of deeply practiced capabilities, refined through real usage, real failures, and real-world constraints.</p>
                    <p className="font-medium text-black pt-4">We don’t ask: “What product should we build next?”</p>
                    <p className="font-medium text-black">We ask: “Which capability, if strengthened, unlocks multiple futures?”</p>
                    <p className="text-sm uppercase tracking-widest text-gray-400 pt-4">This page is not a feature list. It is our operating system.</p>
                </div>
            </div>

            {/* CAPABILITIES GRID */}
            <div className="grid grid-cols-1 gap-16">
                {capabilities.map((cap, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-gray-100 pt-16">
                        <div className="md:col-span-4">
                            <Link href={`/capabilities/${cap.slug}`} className="group block">
                                <span className="text-electric-blue font-mono text-xs uppercase tracking-widest mb-4 block">Capability {String(index + 1).padStart(2, '0')}</span>
                                <h3 className="text-4xl font-heading font-medium mb-4 group-hover:text-electric-blue transition-colors flex items-center gap-2">
                                    {cap.title}
                                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-lg text-gray-500 font-light leading-relaxed mb-6">{cap.one_liner}</p>
                                <span className="inline-block text-sm font-medium border-b border-black pb-0.5">Read case study</span>
                            </Link>
                        </div>

                        <div className="md:col-span-4 space-y-8">
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">What this enables</h4>
                                <ul className="space-y-3">
                                    {cap.enables.slice(0, 3).map((item, i) => (
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
                                    "{cap.why_it_matters}"
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-4 bg-surface-50 p-8 rounded-lg">
                            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-black">Applied In</h4>
                            <div className="space-y-3">
                                {cap.applied_in.map((app, i) => (
                                    <Link key={i} href={`/studios/${app}`} className="flex items-center gap-2 text-gray-900 font-medium hover:text-electric-blue transition-colors">
                                        <ArrowUpRight className="w-4 h-4 text-gray-400" />
                                        <span className="capitalize">{app}</span>
                                    </Link>
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
