interface ProofStripProps {
    stats: { label: string; value: string }[];
}

export default function ProofStrip({ stats = [] }: ProofStripProps) {
    // Fallback if stats is undefined/empty
    const displayStats = stats.length > 0 ? stats : [
        { label: "Revenue Generated", value: "$50M+" },
        { label: "Active Users", value: "2.5M+" },
        { label: "Systems Deployed", value: "100+" }
    ];

    return (
        <div className="w-full border-y border-gray-100 bg-white py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">

                    {/* Brand Logos (Static for now) */}
                    <div className="flex items-center gap-8 opacity-40 grayscale mix-blend-multiply font-heading font-bold text-xl tracking-tight text-black">
                        <span>EstateKart</span>
                        <span>Revenueable.ai</span>
                        <span>NexoCircle</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-12">
                        {displayStats.map((stat, i) => (
                            <div key={i} className="text-right">
                                <div className="font-heading font-bold text-3xl text-black">{stat.value}</div>
                                <div className="text-xs font-mono uppercase tracking-wider text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
