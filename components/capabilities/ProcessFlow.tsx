import { Capability } from "@/types/cms";

export default function ProcessFlow({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-black text-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-white/50 mb-16">
                    Our Approach
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {data.flow?.map((step: { step: string; title: string; outcome: string }) => (
                        <div key={step.step} className="relative pl-6 border-l border-white/20">
                            <div className="text-xs font-mono text-electric-blue mb-4">{step.step}</div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm">
                                {step.outcome}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
