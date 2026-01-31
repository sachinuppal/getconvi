import { Capability } from "@/types/cms";

export default function AudienceCheck({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

                <div>
                    <h3 className="font-heading font-medium text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Ideal For
                    </h3>
                    <ul className="space-y-4">
                        {data.audience?.for?.map((item: string, idx: number) => (
                            <li key={idx} className="text-gray-700 text-sm border-l-2 border-green-100 pl-4">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-heading font-medium text-xl mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        Not For
                    </h3>
                    <ul className="space-y-4">
                        {data.audience?.notFor?.map((item: string, idx: number) => (
                            <li key={idx} className="text-gray-500 text-sm border-l-2 border-gray-100 pl-4">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
