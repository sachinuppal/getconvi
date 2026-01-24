import { Studio } from "@/types/cms";

export default function StudioProblem({ data }: { data: Studio }) {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-heading font-medium mb-12 text-center">
                    {data.problem?.headline}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {data.problem?.points?.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-lg border border-surface-200">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold">!</span>
                            <p className="text-gray-700">{point}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-lg text-gray-500 max-w-2xl mx-auto">
                    {data.problem?.summary}
                </p>
            </div>
        </section>
    );
}
