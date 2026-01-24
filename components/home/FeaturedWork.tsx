import Link from "next/link";
import Image from "next/image";

const projects = [
    {
        client: "Telecallers.ai",
        headline: "Autonomous voice agents at calling scale.",
        tags: ["AI Voice", "Sales Ops"],
        image: "/cms-uploads/featured-work-0rai5.jpg",
        href: "/work/telecallers-ai", // Corrected slug usage
    },
    {
        client: "SlaySwag.com",
        headline: "B2B gifting with credit lines.",
        tags: ["Commerce", "Fintech"],
        image: "/cms-uploads/featured-work-5gtr8m.jpg",
        href: "/work/slayswag",
    },
    {
        client: "EstateKart.ai",
        headline: "AI concierge for NRI real estate.",
        tags: ["Marketplace", "GenAI"],
        image: "/cms-uploads/featured-work-4rmn7n.jpg",
        href: "/work/estatekart",
    }
];

export default function FeaturedWork() {
    return (
        <section className="py-24 bg-surface-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-heading font-medium tracking-tight mb-2">Featured Work</h2>
                        <p className="text-gray-500">Systems shipped. Outcomes verified.</p>
                    </div>
                    <Link href="/work" className="text-sm font-medium border-b border-black pb-1 hover:text-electric-blue hover:border-electric-blue transition-colors">
                        View all case studies
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link key={project.client} href={project.href} className="group block">
                            <div className="relative aspect-[4/3] bg-gray-200 mb-6 overflow-hidden rounded-lg">
                                {/* Using standard img tag for immediate feedback in dev/static export */}
                                <img
                                    src={project.image}
                                    alt={project.client}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono uppercase tracking-wider text-gray-500 border border-gray-200 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-2xl font-heading font-medium leading-tight group-hover:text-electric-blue transition-colors">
                                {project.headline}
                            </h3>
                            <p className="text-gray-500 mt-2 text-sm">{project.client}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
