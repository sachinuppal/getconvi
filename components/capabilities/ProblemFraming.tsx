import { Capability } from "@/types/cms";

export default function ProblemFraming({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-gray-400 mb-12">
                    The Problem
                </h2>

                <p className="text-3xl md:text-4xl font-heading font-medium mb-12">
                    {data.problem?.intro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.problem?.points?.map((point: string, idx: number) => (
                        <div key={idx} className="flex gap-4">
                            <span className="text-gray-300 font-mono">0{idx + 1}</span>
                            <p className="text-lg text-gray-700 leading-snug">{point}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
