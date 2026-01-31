import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";
import manifesto from "../../../content/manifesto.json";

export default function AboutPage() {
    return (
        <div className="pt-32 px-6 pb-24 max-w-7xl mx-auto min-h-screen">
            {/* HERO */}
            <div className="mb-24 text-center max-w-4xl mx-auto">
                <span className="text-sm font-bold uppercase tracking-widest text-electric-blue mb-6 block">The Manifesto</span>
                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8">
                    {manifesto.hero.headline}
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
                    {manifesto.hero.subline}
                </p>
            </div>

            {/* PROBLEM STATEMENT */}
            <div className="mb-32 max-w-4xl mx-auto border-l-4 border-electric-pink pl-8 py-2">
                <h2 className="text-3xl font-heading font-medium mb-6">{manifesto.problem.headline}</h2>
                <ul className="space-y-2 mb-8">
                    {manifesto.problem.points.map((point, i) => (
                        <li key={i} className="text-lg text-gray-600 font-medium flex items-center gap-3">
                            <X className="w-5 h-5 text-red-400" />
                            {point}
                        </li>
                    ))}
                </ul>
                <p className="text-xl text-gray-800 leading-relaxed font-light">
                    {manifesto.problem.description}
                </p>
            </div>

            {/* CORE BELIEF */}
            <div className="mb-32 bg-black text-white p-12 md:p-20 rounded-2xl text-center">
                <span className="text-electric-blue font-mono text-sm tracking-widest uppercase mb-6 block">{manifesto.core_belief.headline}</span>
                <h2 className="text-4xl md:text-6xl font-heading font-medium mb-12 leading-tight">
                    {manifesto.core_belief.statement}
                </h2>
                <div className="flex flex-wrapjustify-center gap-4 md:gap-8 mb-12 flex-wrap">
                    {manifesto.core_belief.points.map((point, i) => (
                        <span key={i} className="text-lg md:text-xl font-light border border-white/20 px-4 py-2 rounded-full">
                            {point}
                        </span>
                    ))}
                </div>
                <p className="text-2xl font-medium text-gray-300">
                    {manifesto.core_belief.subtext}
                </p>
            </div>

            {/* 5 FORCES */}
            <div className="mb-32">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-12 text-gray-400 text-center">The Five Forces That Shape Everything</h2>
                <div className="grid grid-cols-1 gap-8">
                    {manifesto.forces.map((force, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-100 pb-16 pt-8 first:pt-0">
                            <div className="md:col-span-4">
                                <span className="text-4xl font-light text-gray-200 mb-4 block">0{i + 1}</span>
                                <h3 className="text-3xl font-heading font-medium mb-2">{force.title}</h3>
                                <p className="text-electric-blue font-medium">{force.subtitle}</p>
                            </div>
                            <div className="md:col-span-8">
                                <p className="text-xl md:text-2xl text-gray-800 font-light mb-8 leading-relaxed">
                                    {force.description}
                                </p>
                                <div className="space-y-4 mb-8">
                                    {force.beliefs.map((belief, j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <span className="text-lg text-gray-600">{belief}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-surface-50 p-6 rounded-lg border-l-4 border-black">
                                    <p className="font-bold text-gray-900">
                                        {force.conclusion}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SYSTEM MODEL */}
            <div className="mb-32 bg-surface-50 p-12 md:p-24 rounded-3xl text-center">
                <h2 className="text-4xl font-heading font-medium mb-4">{manifesto.system_model.headline}</h2>
                <p className="text-gray-500 mb-16">{manifesto.system_model.subline}</p>

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-16">
                    {manifesto.system_model.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4 md:gap-8">
                            <span className="text-2xl md:text-4xl font-bold text-black">{step}</span>
                            {i < manifesto.system_model.steps.length - 1 && (
                                <span className="text-gray-300 text-2xl">→</span>
                            )}
                        </div>
                    ))}
                </div>

                <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
                    {manifesto.system_model.description}
                </p>
            </div>

            {/* PROMISE & VALUES */}
            <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 className="text-4xl font-heading font-medium mb-8">{manifesto.promise.headline}</h2>
                    <ul className="space-y-6">
                        {manifesto.promise.points.map((point, i) => (
                            <li key={i} className="text-xl text-gray-800 font-light flex items-center gap-4">
                                <span className="w-2 h-2 bg-electric-blue rounded-full"></span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-4">
                    {manifesto.promise.values.map((val, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                            <span className="text-xl font-bold text-black">{val.label}</span>
                            <span className="text-gray-400 custom-italic">{val.vs}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* AUDIENCE & FUTURE */}
            <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-black text-white p-12 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-8">{manifesto.audience.headline}</h3>
                    <ul className="space-y-4 mb-8">
                        {manifesto.audience.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 opacity-90">
                                <Check className="w-5 h-5 text-electric-blue flex-shrink-0" />
                                {point}
                            </li>
                        ))}
                    </ul>
                    <p className="text-gray-400 text-sm font-mono border-t border-white/20 pt-6">
                        {manifesto.audience.disclaimer}
                    </p>
                </div>
                <div className="bg-electric-blue text-white p-12 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-8">{manifesto.future.headline}</h3>
                    <ul className="space-y-4 mb-8">
                        {manifesto.future.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 opacity-90">
                                <ArrowUpRight className="w-5 h-5 text-white flex-shrink-0" />
                                {point}
                            </li>
                        ))}
                    </ul>
                    <p className="text-white font-bold text-lg pt-6">
                        {manifesto.future.closing}
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-16 border-t border-gray-100">
                <h2 className="text-4xl md:text-6xl font-heading font-medium mb-6">{manifesto.cta.headline}</h2>
                <p className="text-xl text-gray-500 mb-8">{manifesto.cta.subline}</p>
                <div className="bg-surface-50 inline-block px-8 py-6 rounded-xl border border-surface-200 mb-12 max-w-2xl">
                    <p className="text-xl md:text-2xl font-medium text-black">
                        "{manifesto.cta.statement}"
                    </p>
                </div>

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
            </div>
        </div>
    );
}
