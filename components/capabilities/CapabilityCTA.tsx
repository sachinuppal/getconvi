import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Capability } from "@/types/cms";

export default function CapabilityCTA({ data }: { data: Capability }) {
    return (
        <section className="py-24 bg-white border-t border-gray-100 text-center">
            <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-8">
                    {data.cta?.headline || "Ready to build systems that work?"}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <Link href="/connect" className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                        {data.cta?.label || "Start a Conversation"} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <p className="text-gray-400 text-sm">
                    {data.cta?.microcopy || "No pitch decks. Just engineering."}
                </p>
            </div>
        </section>
    );
}
