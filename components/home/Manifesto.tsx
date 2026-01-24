"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ManifestoProps {
    lines: string[];
}

export default function Manifesto({ lines }: ManifestoProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const elLines = gsap.utils.toArray<HTMLElement>(".manifesto-line");

            gsap.fromTo(
                elLines,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container.current,
                        start: "top 70%", // Start animating when top of section hits 70% of viewport
                        toggleActions: "play none none reverse",
                    },
                }
            );
        },
        { scope: container }
    );

    return (
        <section ref={container} className="bg-black py-32 md:py-48 text-white">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="space-y-4 md:space-y-8 font-heading text-3xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight">
                    {lines.map((line, i) => (
                        <p key={i} className={`manifesto-line ${i >= lines.length - 2 ? (i === lines.length - 1 ? "text-electric-blue pt-8" : "text-white/70") : "text-white/90"}`}>
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
