"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Massive hero title with staggered word reveal
            const words = gsap.utils.toArray<HTMLElement>(".hero-title-word");

            gsap.from(words, {
                duration: 1.2,
                y: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2, // Small delay to let fonts load/layout settle
            });

            // Subheadline fade up
            gsap.from(".hero-sub", {
                y: 40,
                opacity: 0,
                duration: 1,
                delay: 0.8,
                ease: "power3.out",
            });

            // Buttons fade up
            gsap.from(".hero-btn", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                delay: 1,
                stagger: 0.1,
                ease: "power3.out",
            });

            // Background gradient shift on scroll
            gsap.to(".hero-gradient", {
                scrollTrigger: {
                    trigger: ".hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                backgroundPosition: "50% 100%",
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="hero relative min-h-screen flex items-center justify-center overflow-hidden bg-primary px-4 sm:px-6 lg:px-8 pt-20"
        >
            {/* Dynamic Background */}
            <div className="hero-gradient absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1a3a6c_0%,#0A1F44_70%)] opacity-80 z-0" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto text-center">
                {/* Badge */}
                <div className="hero-sub inline-inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-accent mb-8 backdrop-blur-sm">
                    <span>RUNNING 20+ VENTURES</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-[1.1] font-heading">
                    <span className="block overflow-hidden">
                        <span className="hero-title-word inline-block">From</span>{" "}
                        <span className="hero-title-word inline-block text-white/50">Idea</span>
                    </span>
                    <span className="block overflow-hidden">
                        <span className="hero-title-word inline-block">To</span>{" "}
                        <span className="hero-title-word inline-block text-accent">Internet</span>{" "}
                        <span className="hero-title-word inline-block">Scale</span>
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="hero-sub max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed font-light">
                    We build, run, and scale chaos-proofed revenue systems.
                    <br className="hidden md:block" />
                    More than an agency—your execution partner.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/contact"
                        className="hero-btn group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-primary bg-accent rounded-full overflow-hidden transition-all hover:bg-white hover:scale-105"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Book Strategy Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        href="/work"
                        className="hero-btn inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all"
                    >
                        View Our Work
                    </Link>
                </div>

                {/* Trust Signals */}
                <div className="hero-sub mt-20 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 text-neutral-400 text-sm font-mono uppercase tracking-wider">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white font-bold text-xl">100M+</span>
                        <span>Users Scaled</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white font-bold text-xl">20+</span>
                        <span>Launches</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-white font-bold text-xl">2020</span>
                        <span>Est.</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
