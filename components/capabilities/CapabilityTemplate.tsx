import { Capability } from "@/types/cms";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CapabilityTemplate({ data }: { data: Capability }) {
    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">

                {/* 1. HERO */}
                <header className="mb-24">
                    <span className="text-electric-blue font-mono text-xs uppercase tracking-widest mb-6 block">
                        Capability / {data.slug}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-8 leading-tight">
                        {data.hero.headline}
                    </h1>
                    <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
                        {data.hero.subline}
                    </p>
                </header>

                <hr className="border-gray-100 mb-24" />

                {/* 2. THE DEEPER PROBLEM */}
                <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-black">
                            {data.deeper_problem.headline}
                        </h2>
                    </div>
                    <div className="md:col-span-8">
                        <div className="space-y-6 mb-8">
                            <ul className="space-y-4">
                                {data.deeper_problem.points.map((point, i) => (
                                    <li key={i} className="text-2xl md:text-3xl font-heading font-light text-gray-400">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="text-lg text-gray-900 font-medium border-l-2 border-electric-pink pl-6 py-1">
                            {data.deeper_problem.summary}
                        </p>
                    </div>
                </section>

                <hr className="border-gray-100 mb-24" />

                {/* 3. POINT OF VIEW */}
                <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-black">
                            {data.point_of_view.headline}
                        </h2>
                    </div>
                    <div className="md:col-span-8">
                        <div className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed">
                            {Array.isArray(data.point_of_view.content)
                                ? data.point_of_view.content.map((p, i) => <p key={i} className="mb-4">{p}</p>)
                                : <p>{data.point_of_view.content}</p>
                            }
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100 mb-24" />

                {/* 4. HOW WE BUILD */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                        <div className="md:col-span-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-black">
                                How we build {data.slug}
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {data.how_we_build.steps.map((step, i) => (
                            <div key={i} className="group">
                                <span className="text-electric-blue font-mono text-xs mb-4 block">0{i + 1}</span>
                                <h3 className="text-xl font-heading font-medium mb-3">{step.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    {data.how_we_build.summary && (
                        <div className="mt-16 text-center">
                            <p className="text-lg font-medium text-black inline-block border-b border-black pb-1">
                                {data.how_we_build.summary}
                            </p>
                        </div>
                    )}
                </section>

                {/* 5. ENABLEMENT & COMPOUNDING */}
                <section className="bg-surface-50 -mx-6 md:-mx-12 px-6 md:px-12 py-24 rounded-3xl mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Enables */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-8">
                                What this enables
                            </h2>
                            <ul className="space-y-4">
                                {data.what_this_enables.map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="mt-1.5 w-1.5 h-1.5 bg-electric-blue rounded-full flex-shrink-0" />
                                        <span className="text-lg text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compounds */}
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-black mb-8">
                                {data.why_this_compounds.headline || "Why this compounds"}
                            </h2>
                            <p className="text-lg text-gray-600 font-light leading-relaxed">
                                {data.why_this_compounds.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* 6. APPLIED IN */}
                <section className="text-center mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
                        Applied In
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {data.applied_in.map((platform, i) => (
                            <Link
                                key={i}
                                href={`/studios/${platform}`}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                            >
                                {platform}
                                <ArrowUpRight className="w-4 h-4 opacity-50" />
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-24 border-t border-gray-100">
                    <Link
                        href="/capabilities"
                        className="text-gray-400 hover:text-black transition-colors text-sm font-medium"
                    >
                        ← Back to all Capabilities
                    </Link>
                </div>

            </div>
        </div>
    );
}
