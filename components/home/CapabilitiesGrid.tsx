"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        number: "01",
        title: "AI & Automation Systems",
        oneLiner: "Replace human busywork with autonomous agents.",
        outcomes: ["70% reduction in op-ex", "24/7 autonomous support", "Zero-latency scale"],
        href: "/capabilities/ai-automation",
    },
    {
        number: "02",
        title: "Growth & Performance Engines",
        oneLiner: "Acquisition systems that compound over time.",
        outcomes: ["Lower CAC at scale", "Full-funnel attribution", "Programmatic SEO dominance"],
        href: "/capabilities/growth-performance",
    },
    {
        number: "03",
        title: "Product & Engineering",
        oneLiner: "We ship businesses, not just code.",
        outcomes: ["Market-ready in weeks", "Enterprise-grade security", "High-leverage architecture"],
        href: "/capabilities/product-engineering",
    },
    {
        number: "04",
        title: "Content & Creative Systems",
        oneLiner: "Brand storytelling at algorithmic scale.",
        outcomes: ["Asset production @ 10x", "Conversion-focused creative", "Unified brand voice"],
        href: "/capabilities/content-creative",
    },
    {
        number: "05",
        title: "Community & Experiential",
        oneLiner: "Real connection in a digital world.",
        outcomes: ["High-retention cohorts", "Offline-to-online loops", "Member-led growth"],
        href: "/capabilities/community-experiential",
    },
];

export default function CapabilitiesGrid() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const cards = gsap.utils.toArray<HTMLElement>(".cap-card");

            gsap.fromTo(
                cards,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 80%",
                    }
                }
            );
        },
        { scope: container }
    );

    return (
        <section ref={container} className="py-24 md:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-20 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight mb-6">
                        What we build.
                    </h2>
                    <p className="text-xl text-gray-500 font-light">
                        Every platform follows the same discipline. Built as systems, not features. Operated continuously.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
                    {capabilities.map((cap) => (
                        <Link
                            key={cap.number}
                            href={cap.href}
                            className="cap-card group relative bg-white p-8 md:p-12 min-h-[400px] flex flex-col justify-between hover:z-10 transition-all duration-300 hover:shadow-2xl"
                        >
                            <div>
                                <span className="font-mono text-xs text-gray-400 mb-6 block">{cap.number}</span>
                                <h3 className="font-heading text-2xl font-bold mb-4 pr-8">{cap.title}</h3>
                                <p className="text-gray-500 leading-relaxed max-w-[90%] group-hover:text-black transition-colors">
                                    {cap.oneLiner}
                                </p>
                            </div>

                            {/* Hover Reveal Content */}
                            <div className="mt-8 pt-8 border-t border-gray-100 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <ul className="space-y-2 mb-6">
                                    {cap.outcomes.map((outcome, i) => (
                                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-electric-pink"></span>
                                            {outcome}
                                        </li>
                                    ))}
                                </ul>
                                <span className="text-sm font-semibold text-electric-blue flex items-center gap-1">
                                    Explore Capability <ArrowUpRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
