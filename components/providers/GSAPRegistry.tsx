"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPRegistry() {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Default GSAP settings
        gsap.defaults({
            ease: "power3.out",
            duration: 1,
        });
    }, []);

    return null;
}
