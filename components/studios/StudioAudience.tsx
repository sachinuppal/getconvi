import { Studio } from "@/types/cms";

export default function StudioAudience({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-surface-50 border-t border-surface-200">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                {/* For */}
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">Who It's For</h3>
                    <ul className="space-y-4">
                        {data.audience.for.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-green-600 font-bold">✓</span>
                                <span className="text-gray-900 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Not For */}
                <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-6">Who It's Not For</h3>
                    <ul className="space-y-4">
                        {data.audience.notFor.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-500">
                                <span className="text-gray-400">×</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
