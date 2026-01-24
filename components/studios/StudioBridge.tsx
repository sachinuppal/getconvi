import { Studio } from "@/types/cms";

export default function StudioBridge({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-black text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-electric-blue mb-4 block">Getconvi Ecosystem</span>
                <h2 className="text-3xl md:text-4xl font-heading font-medium mb-6">
                    {data.bridge?.headline}
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
                    {data.bridge?.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
                    {data.bridge?.learnings?.map((learning, idx) => (
                        <div key={idx} className="p-4 border border-white/10 rounded bg-white/5">
                            <span className="block text-sm font-medium text-white">{learning}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
