"use client";

import { NavSection } from "@/types/cms";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MegaMenuProps {
    data: NavSection;
    isOpen: boolean;
    onClose: () => void;
}

export default function MegaMenu({ data, isOpen, onClose }: MegaMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!menuRef.current) return;

        if (isOpen) {
            gsap.fromTo(menuRef.current,
                { opacity: 0, y: -10, display: "none" },
                { opacity: 1, y: 0, display: "block", duration: 0.2, ease: "power2.out" }
            );
        } else {
            gsap.to(menuRef.current, {
                opacity: 0,
                y: -10,
                duration: 0.15,
                ease: "power2.in",
                onComplete: () => {
                    if (menuRef.current) menuRef.current.style.display = "none";
                }
            });
        }
    }, [isOpen]);

    if (!data.columns) return null;

    return (
        <div
            ref={menuRef}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-surface-200 shadow-xl z-40 hidden"
            onMouseLeave={onClose}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {data.columns.map((column, idx) => (
                        <div key={idx}>
                            {column.title && (
                                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
                                    {column.title}
                                </h3>
                            )}
                            <ul className="space-y-6">
                                {column.items.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="group block" onClick={onClose}>
                                            <div className="font-heading font-medium text-lg text-black group-hover:text-electric-blue transition-colors mb-1">
                                                {item.label}
                                            </div>
                                            {item.description && (
                                                <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Optional: Hero Card for the section? 
                        Could add dynamic highlighting here later.
                    */}
                </div>
            </div>
        </div>
    );
}
