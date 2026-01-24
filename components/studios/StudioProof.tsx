import { Studio } from "@/types/cms";

export default function StudioProof({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Live
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                    {data.proof?.signals?.map((signal, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-2xl font-heading font-medium text-black mb-2">{signal}</span>
                        </div>
                    ))}
                </div>

                <p className="text-gray-500 font-medium">
                    {data.proof?.status}
                </p>
            </div>
        </section>
    );
}
