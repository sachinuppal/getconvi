"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navItems = [
    { label: "Capabilities", href: "/capabilities" },
    { label: "Work", href: "/work" },
    { label: "Studios", href: "/studios" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-surface-200 py-3"
                    : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="font-heading font-bold text-xl tracking-tight z-50 relative group">
                    Getconvi<span className="text-gray-400 group-hover:text-electric-pink transition-colors">.com</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-black relative group",
                                pathname.startsWith(item.href) ? "text-electric-blue" : "text-gray-600"
                            )}
                        >
                            {item.label}
                            <span className={clsx(
                                "absolute -bottom-1 left-0 w-full h-[1px] bg-electric-blue scale-x-0 transition-transform origin-left group-hover:scale-x-100",
                                pathname.startsWith(item.href) && "scale-x-100"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* CTA (Connect) */}
                <Link
                    href="/connect"
                    className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                    Connect
                </Link>

                {/* Mobile Menu Button (Placeholder for now) */}
                <button className="md:hidden p-2 text-gray-800">
                    <span className="sr-only">Open menu</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
