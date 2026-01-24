"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(container.current, {
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 85%", // Trigger when top of section hits 85% of viewport height
                    toggleActions: "play none none reverse",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                delay: delay,
                ease: "power3.out",
            });
        },
        { scope: container }
    );

    return (
        <div ref={container} className={cn("will-change-transform", className)}>
            {children}
        </div>
    );
}
