import { Capability } from "@/types/cms";

export default function FAQSection({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl font-mono uppercase tracking-widest text-gray-400 mb-12 text-center">
                    Questions
                </h2>

                <div className="space-y-6">
                    {data.faqs?.map((faq, idx) => (
                        <div key={idx} className="bg-white p-6 rounded border border-gray-200">
                            <h3 className="font-medium text-lg mb-3">{faq.question}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Plain English Summary (AEO Block) */}
                <div className="mt-16 p-8 bg-black text-white rounded-lg">
                    <span className="text-xs font-mono text-electric-pink uppercase block mb-4">Summary</span>
                    <p className="leading-relaxed">
                        {data.summary}
                    </p>
                </div>
            </div>
        </section>
    );
}
