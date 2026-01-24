import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Set default ease
    gsap.defaults({
        ease: "power3.out",
        duration: 1,
    });
};

export const revealText = (target: string, delay = 0) => {
    return gsap.from(target, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay,
    });
};

export const fadeInUp = (target: string | Element, delay = 0) => {
    return gsap.from(target, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay,
    });
};
