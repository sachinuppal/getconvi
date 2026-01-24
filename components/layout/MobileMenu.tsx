"use client";

import { NavSection } from "@/types/cms";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, ChevronDown, ChevronRight } from "lucide-react";

interface MobileMenuProps {
    data: NavSection[];
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileMenu({ data, isOpen, onClose }: MobileMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    useEffect(() => {
        if (!menuRef.current || !backdropRef.current) return;

        if (isOpen) {
            // Document body lock
            document.body.style.overflow = "hidden";

            // Animation In
            gsap.to(backdropRef.current, {
                display: "block",
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(menuRef.current, {
                x: "0%",
                duration: 0.4,
                ease: "power3.out"
            });
        } else {
            // Document body unlock
            document.body.style.overflow = "";

            // Animation Out
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    if (backdropRef.current) backdropRef.current.style.display = "none";
                }
            });
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.3,
                ease: "power3.in"
            });
        }
    }, [isOpen]);

    const toggleSection = (label: string) => {
        setExpandedSections(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        );
    };

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 bg-black/50 z-50 hidden"
                onClick={onClose}
            />

            {/* Slide-over Panel */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-[60] transform translate-x-full border-l border-gray-100 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <span className="font-heading font-bold text-lg">Menu</span>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-6 h-6 text-gray-800" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <nav className="space-y-6">
                        {data.map((section) => (
                            <div key={section.label}>
                                {section.type === "dropdown" ? (
                                    // Accordion Item
                                    <div className="border-b border-gray-100 pb-4 last:border-0">
                                        <button
                                            onClick={() => toggleSection(section.label)}
                                            className="flex items-center justify-between w-full text-left py-2"
                                        >
                                            <span className="font-heading font-medium text-xl text-black">{section.label}</span>
                                            {expandedSections.includes(section.label) ? (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-500" />
                                            )}
                                        </button>

                                        {/* Dropdown Content */}
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSections.includes(section.label) ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className="space-y-6 pl-4">
                                                {section.columns?.map((col, idx) => (
                                                    <div key={idx} className="space-y-3">
                                                        {col.title && (
                                                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{col.title}</h4>
                                                        )}
                                                        <ul className="space-y-3 border-l border-gray-100 pl-4">
                                                            {col.items.map((item) => (
                                                                <li key={item.href}>
                                                                    <Link href={item.href} onClick={onClose} className="block text-gray-600 hover:text-black">
                                                                        {item.label}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Direct Link
                                    <Link
                                        href={section.href}
                                        onClick={onClose}
                                        className="block font-heading font-medium text-xl text-black py-2 border-b border-gray-100 last:border-0 hover:text-electric-blue transition-colors"
                                    >
                                        {section.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Footer / CTA */}
                <div className="p-6 border-t border-gray-100 bg-surface-50">
                    <Link
                        href="/connect"
                        onClick={onClose}
                        className="flex items-center justify-center w-full px-6 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Connect
                    </Link>
                </div>
            </div>
        </>
    );
}
