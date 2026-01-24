import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const studios = [
    {
        name: "Revenueable.ai",
        tagline: "AI agents for CRO & SEO.",
        description: "Real-time revenue system that identifies visitors and personalizes experiences.",
        status: "Scaling",
        href: "/studios/revenueable",
    },
    {
        name: "NexoCircle",
        tagline: "Communities that belong.",
        description: "Offline-first community platform designed for real connection.",
        status: "Live",
        href: "/studios/nexocircle",
    },
    {
        name: "PujaDaily",
        tagline: "Rituals simplified.",
        description: "Structured spiritual platform turning daily rituals into habits.",
        status: "Live",
        href: "/studios/pujadaily",
    },
    {
        name: "Telecallers.ai",
        tagline: "AI at calling scale.",
        description: "Autonomous voice agents that manage phone calls across operations.",
        status: "Beta",
        href: "/studios/telecallers",
    },
];

export default function StudiosGrid() {
    return (
        <section className="py-24 bg-white border-t border-surface-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-4xl font-heading font-medium tracking-tight mb-4">Studios</h2>
                    <p className="text-xl text-gray-500 font-light max-w-2xl">
                        Our product labs. Where we build, test, and scale own-IP systems.
                    </p>
                </div>

                <div className="space-y-0 divide-y divide-gray-100">
                    {studios.map((studio) => (
                        <Link
                            key={studio.name}
                            href={studio.href}
                            className="group block py-12 md:py-16 hover:bg-surface-50 transition-colors -mx-6 px-6"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8">
                                <div className="md:w-1/3">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-3xl font-heading font-medium">{studio.name}</h3>
                                        <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-black text-white rounded-full">
                                            {studio.status}
                                        </span>
                                    </div>
                                    <p className="text-electric-blue font-medium">{studio.tagline}</p>
                                </div>

                                <div className="md:w-1/2 flex items-center justify-between gap-8">
                                    <p className="text-gray-500 group-hover:text-black transition-colors max-w-md">
                                        {studio.description}
                                    </p>
                                    <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-electric-blue transition-colors flex-shrink-0" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
