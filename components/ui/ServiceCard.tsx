"use client";

import { MoveRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    href: string;
    index: number;
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
    return (
        <Link
            href={href}
            className="service-card group relative block p-8 bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-colors"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 p-3 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    {icon}
                </div>

                <h3 className="text-2xl font-bold font-heading mb-3 group-hover:text-accent transition-colors">
                    {title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 mb-8 flex-grow leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center text-sm font-semibold text-primary dark:text-white uppercase tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                    Explore <MoveRight className="ml-2 w-4 h-4 text-accent" />
                </div>
            </div>
        </Link>
    );
}
