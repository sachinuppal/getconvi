import { Capability } from "@/types/cms";

export default function ContextualProof({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-gray-400 mb-12">
                    Proof of Work
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.proof?.map((item: { project: string; whatChanged: string; result: string }, idx: number) => (
                        <div key={idx} className="bg-white p-8 rounded border border-gray-100 shadow-sm">
                            <div className="text-xs font-mono text-gray-400 mb-6 uppercase">{item.project}</div>
                            <div className="mb-4">
                                <span className="block text-gray-500 text-sm mb-1">Construct</span>
                                <h4 className="text-lg font-medium">{item.whatChanged}</h4>
                            </div>
                            <div>
                                <span className="block text-gray-500 text-sm mb-1">Outcome</span>
                                <h4 className="text-xl font-bold text-electric-blue">{item.result}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
