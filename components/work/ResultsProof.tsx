import { CaseStudy } from "@/types/cms";

export default function ResultsProof({ data }: { data: CaseStudy }) {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6">

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {data.results?.map((r, i) => (
                        <div key={i} className="text-center md:text-left">
                            <span className="block text-4xl md:text-5xl font-heading font-bold text-black mb-2">{r.value}</span>
                            <span className="text-sm font-bold text-gray-900 block">{r.metric}</span>
                            <span className="text-xs text-gray-400">{r.context}</span>
                        </div>
                    ))}
                </div>

                {/* Before / After */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-surface-50 p-8 md:p-12">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-red-400 mb-6">Before</h3>
                        <ul className="space-y-3">
                            {data.transformation?.before?.map((item, i) => (
                                <li key={i} className="text-gray-500 text-sm flex gap-2">
                                    <span>×</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-8 md:p-12">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 mb-6">After</h3>
                        <ul className="space-y-3">
                            {data.transformation?.after?.map((item, i) => (
                                <li key={i} className="text-black font-medium text-sm flex gap-2">
                                    <span>✓</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Learnings */}
                <div>
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Learnings</h3>
                    <div className="space-y-4">
                        {data.learnings?.map((l, i) => (
                            <p key={i} className="text-lg text-gray-700 italic border-l-4 border-electric-blue pl-4">
                                "{l}"
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
