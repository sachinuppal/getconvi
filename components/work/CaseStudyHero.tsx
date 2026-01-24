import { CaseStudy } from "@/types/cms";

export default function CaseStudyHero({ data }: { data: CaseStudy }) {
    return (
        <section className="min-h-[50vh] flex items-center bg-white px-6 pt-32 pb-12 border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-2 py-1 bg-surface-50 border border-gray-200 text-[10px] font-mono uppercase tracking-widest text-gray-500 rounded">
                        {data.tags.industry}
                    </span>
                    <span className="px-2 py-1 bg-surface-50 border border-gray-200 text-[10px] font-mono uppercase tracking-widest text-gray-500 rounded">
                        {data.tags.outcome}
                    </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tight text-black mb-6 leading-tight">
                    {data.hero.title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                    {data.hero.outcome}
                </p>
            </div>
        </section>
    );
}
