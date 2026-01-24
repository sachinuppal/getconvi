import { Studio } from "@/types/cms";

export default function StudioValue({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-medium mb-8">
                    {data.value?.headline}
                </h2>

                <p className="text-xl text-gray-500 leading-relaxed mb-12">
                    {data.value?.description}
                </p>

                {data.value?.enables && data.value.enables.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        {data.value.enables.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-electric-blue"></span>
                                <span className="text-gray-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
