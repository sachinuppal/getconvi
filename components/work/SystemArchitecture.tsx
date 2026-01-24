import { CaseStudy } from "@/types/cms";

export default function SystemArchitecture({ data }: { data: CaseStudy }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-12">System Architecture</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {data.build?.map((b, i) => (
                        <div key={i} className="bg-surface-50 p-6 rounded border border-surface-200">
                            <h3 className="font-heading font-bold text-lg mb-2">{b.name}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-black text-white p-8 md:p-12 rounded-lg">
                    <h3 className="font-mono text-xs uppercase tracking-widest text-white/50 mb-8">System Logic Flow</h3>
                    <div className="space-y-6">
                        {data.flow?.map((f, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <span className="font-mono text-electric-blue text-sm pt-1">{f.step}</span>
                                <p className="text-lg font-light border-b border-white/10 pb-6 w-full last:border-0 last:pb-0">
                                    {f.logic}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
