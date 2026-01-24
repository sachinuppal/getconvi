import { Studio } from "@/types/cms";

export default function StudioShowcase({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-3xl font-heading font-medium mb-12 text-center">
                    {data.showcase?.headline}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {data.showcase?.pillars?.map((pillar, idx) => (
                        <div key={idx} className="p-6 bg-surface-50 rounded border border-surface-100 flex items-center gap-4">
                            <span className="w-2 h-2 rounded-full bg-black shrink-0"></span>
                            <span className="text-gray-800 font-medium">{pillar}</span>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 italic">
                    {data.showcase?.summary}
                </p>
            </div>
        </section>
    );
}
