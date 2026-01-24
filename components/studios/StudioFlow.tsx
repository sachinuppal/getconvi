import { Studio } from "@/types/cms";

export default function StudioFlow({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {data.flow.steps.map((step) => (
                        <div key={step.number} className="relative">
                            <div className="text-4xl font-mono text-white/20 mb-6">{step.number}</div>
                            <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
