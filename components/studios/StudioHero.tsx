import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Studio } from "@/types/cms";

export default function StudioHero({ data }: { data: Studio }) {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-white px-6 pt-20">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-3 py-1 mb-8 rounded-full border border-gray-200 bg-gray-50 text-xs font-mono uppercase tracking-widest text-gray-500">
                    Getconvi Platform
                </div>

                <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-black mb-8 leading-[1.1]">
                    {data.hero.headline}
                </h1>

                <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-3xl mx-auto mb-10">
                    {data.hero.subline}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <button className="px-8 py-4 text-white bg-black rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        {data.hero.primaryCta} <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-8 py-4 text-black border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
                        {data.hero.secondaryCta}
                    </button>
                </div>

                <p className="text-sm text-gray-400">
                    {data.hero.microcopy}
                </p>
            </div>
        </section>
    );
}
