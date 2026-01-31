"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { headerNav } from "@/lib/data/navigation";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Clear active menu on route change
    useEffect(() => {
        setActiveMenu(null);
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled || activeMenu || mobileMenuOpen
                    ? "bg-white/90 backdrop-blur-md border-surface-200 py-3"
                    : "bg-transparent border-transparent py-5"
            )}
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 z-50 relative group">
                    <img
                        src="/logo.png"
                        alt="Getconvi"
                        className="h-8 w-auto object-contain"
                    />
                    <span className="font-heading font-bold text-xl tracking-tight">
                        Getconvi<span className="text-gray-400 group-hover:text-electric-pink transition-colors">.com</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 h-full">
                    {headerNav.items.map((item) => {
                        if (item.label === "Connect") return null; // Handle CTA separately

                        return (
                            <div
                                key={item.label}
                                onMouseEnter={() => item.type === "dropdown" && setActiveMenu(item.label)}
                                className="h-full flex items-center"
                            >
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        "text-sm font-medium transition-colors hover:text-black relative group py-2",
                                        pathname.startsWith(item.href) ? "text-electric-blue" : "text-gray-600",
                                        activeMenu === item.label && "text-black"
                                    )}
                                    onClick={() => setActiveMenu(null)} // Close on click if it's a link
                                >
                                    {item.label}
                                    <span className={clsx(
                                        "absolute -bottom-1 left-0 w-full h-[1px] bg-electric-blue scale-x-0 transition-transform origin-left group-hover:scale-x-100",
                                        (pathname.startsWith(item.href) || activeMenu === item.label) && "scale-x-100"
                                    )} />
                                </Link>

                                {/* Mega Menu Dropdown */}
                                {item.type === "dropdown" && (
                                    <MegaMenu
                                        data={item}
                                        isOpen={activeMenu === item.label}
                                        onClose={() => setActiveMenu(null)}
                                    />
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* CTA (Connect) */}
                <Link
                    href="/connect"
                    className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                >
                    Connect
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <span className="sr-only">Open menu</span>
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Menu Sheet */}
            <MobileMenu
                data={headerNav.items}
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </header>
    );
}
