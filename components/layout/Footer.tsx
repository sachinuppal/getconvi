import Link from "next/link";
import { footerNav, legalNav } from "@/lib/data/navigation";

export default function Footer() {
    return (
        <footer className="bg-surface-50 border-t border-surface-200 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="font-heading font-bold text-xl tracking-tight block mb-4">
                            Getconvi<span className="text-gray-400">.com</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                            An operator-led venture studio.
                            <br />
                            We build and run AI, community, voice, and commerce platforms—designed to survive reality, not impress in rooms.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders - could make these data-driven later */}
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerNav.items.map((section) => (
                        <div key={section.label}>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">{section.label}</h3>
                            <ul className="space-y-3">
                                {/* Flatten columns for footer if multiple exist, but usually simple list */}
                                {section.columns?.flatMap(col => col.items).map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Legal Column - manually added or from legalNav */}
                    {legalNav.items.map((section) => (
                        <div key={section.label}>
                            <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">{section.label}</h3>
                            <ul className="space-y-3">
                                {section.columns?.flatMap(col => col.items).map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-surface-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Getconvi Technologies. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs text-gray-500 font-mono">ALL SYSTEMS OPERATIONAL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
