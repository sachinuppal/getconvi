import { Capability } from "@/types/cms";

export default function SystemOutputs({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-gray-400 mb-12">
                    What We Build
                </h2>

                <div className="space-y-8">
                    {data.outputs?.map((output: { name: string; description: string }, idx: number) => (
                        <div key={idx} className="group border-b border-gray-100 pb-8 last:border-0 hover:pl-4 transition-all duration-300">
                            <h3 className="text-2xl font-heading font-bold text-black group-hover:text-electric-blue transition-colors mb-2">
                                {output.name}
                            </h3>
                            <p className="text-gray-500">
                                {output.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
