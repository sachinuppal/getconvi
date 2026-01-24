import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/lib/data/home";

export default function HomeCTA() {
    // @ts-ignore - Dynamic key
    const ctaImage = homeContent.cta.cta_background;

    return (
        <section className="relative py-24 bg-black border-t border-surface-200 overflow-hidden">
            {/* Background Image */}
            {ctaImage && (
                <div className="absolute inset-0 z-0 opacity-50">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${ctaImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight text-white mb-8">
                    {homeContent.cta.headline}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/connect"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-electric-blue rounded-full overflow-hidden transition-all hover:bg-blue-700 hover:scale-105"
                    >
                        {homeContent.cta.button_text}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/work"
                        className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-black border border-gray-200 bg-white rounded-full hover:bg-gray-50 transition-all"
                    >
                        Explore our platforms
                    </Link>
                </div>
                <p className="mt-8 text-sm text-gray-400">
                    If there’s no fit, we’ll tell you quickly.
                </p>
            </div>
        </section>
    );
}
