import { ArrowRight } from "lucide-react";
import { Studio } from "@/types/cms";

export default function StudioCTA({ data }: { data: Studio }) {
    return (
        <section className="py-32 bg-electric-blue text-white text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-10">
                    {data.cta?.headline}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <button className="px-8 py-4 bg-white text-electric-blue rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                        {data.cta?.primaryCta} <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-8 py-4 border border-white/30 hover:bg-white/10 text-white rounded-full font-medium transition-colors">
                        {data.cta?.secondaryCta}
                    </button>
                </div>

                <p className="text-white/70 text-sm">
                    {data.cta?.microcopy}
                </p>
            </div>
        </section>
    );
}
