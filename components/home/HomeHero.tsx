"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface HomeHeroProps {
    headline_lines: string[];
    subline: string;
}

export default function HomeHero({ headline_lines, subline, hero_image }: HomeHeroProps & { hero_image?: string }) {
    const container = useRef<HTMLDivElement>(null);
    const textContainer = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!textContainer.current) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=150%", // Pin for 1.5 screen heights
                    pin: true,
                    scrub: 1,

                },
            });

            // Line stagger reveal
            tl.fromTo(
                ".hero-line",
                { y: 100, opacity: 0, filter: "blur(10px)" },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    stagger: 0.2,
                    duration: 1,
                    ease: "power2.out"
                }
            )
                .fromTo(
                    ".hero-bg-image",
                    { scale: 1.1, opacity: 0 },
                    { scale: 1, opacity: 0.4, duration: 1.5, ease: "power2.out" },
                    0 // Start at same time
                )
                // Fade out at the very end of pin to transition cleanly
                .to(".hero-content", {
                    opacity: 0,
                    y: -50,
                    duration: 0.5,
                    ease: "power1.in",
                }, "+=0.5");

        },
        { scope: container }
    );

    return (
        <section ref={container} className="h-screen w-full flex items-center justify-center bg-transparent relative overflow-hidden">
            {/* Dynamic Background Image */}
            {hero_image && (
                <div className="hero-bg-image absolute inset-0 z-0 opacity-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${hero_image})` }}
                    />
                    <div className="absolute inset-0 bg-white/60" /> {/* Overlay for readability */}
                </div>
            )}

            {/* Fallback Grid (if no image or for texture) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none z-0" />

            <div ref={textContainer} className="hero-content relative z-10 max-w-5xl mx-auto px-6 text-center text-black">

                {/* New 4-Line Stagger Reveal */}
                <h1 className="font-heading font-bold text-6xl md:text-8xl tracking-tight leading-[0.95] text-black mb-12">
                    {headline_lines.map((line, i) => (
                        <div key={i} className="overflow-hidden py-1"><div className="hero-line">{line}</div></div>
                    ))}
                </h1>

                {/* Subline */}
                <p className="hero-line text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed whitespace-pre-line">
                    {subline}
                </p>

            </div>
        </section>
    );
}
