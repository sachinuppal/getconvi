import { Capability } from "@/types/cms";

export default function CapabilityHero({ data }: { data: Capability }) {
    return (
        <section className="min-h-[60vh] flex items-center bg-black relative overflow-hidden px-6 pt-32 pb-20">
            {/* Background Image */}
            {data.hero_image && (
                <div className="absolute inset-0 z-0 opacity-60">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-105"
                        style={{ backgroundImage: `url(${data.hero_image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>
            )}

            <div className="max-w-4xl mx-auto relative z-10 text-white">
                <span className="font-mono text-xs uppercase tracking-widest text-electric-blue mb-6 block">
                    Capability / {data.title}
                </span>

                <h1 className="text-5xl md:text-7xl font-heading font-medium tracking-tight mb-8 leading-[1.05]">
                    {data.hero?.headline || data.one_liner}
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed border-l-2 border-electric-pink pl-6">
                    {data.hero?.subline || data.description}
                </p>
            </div>
        </section>
    );
}
