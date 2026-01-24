import { CaseStudy } from "@/types/cms";

export default function ProjectContext({ data }: { data: CaseStudy }) {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">

                <div>
                    <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Context</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-8">
                        {data.context?.paragraph}
                    </p>
                    <ul className="space-y-2">
                        {data.context?.constraints?.map((c, i) => (
                            <li key={i} className="text-sm text-gray-500 border-l border-gray-300 pl-3">
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xs font-mono uppercase tracking-widest text-electric-pink mb-6">The Core Problem</h2>
                    <p className="text-xl md:text-2xl font-heading font-medium text-black leading-snug">
                        {data.problem?.core}
                    </p>
                </div>

            </div>
        </section>
    );
}
