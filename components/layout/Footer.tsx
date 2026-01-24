import Link from "next/link";

const footerLinks = {
    capabilities: [
        { label: "AI & Automation", href: "/capabilities" }, // In real impl, deep link
        { label: "Growth Engines", href: "/capabilities" },
        { label: "Product Engineering", href: "/capabilities" },
        { label: "Content Systems", href: "/capabilities" },
    ],
    studios: [
        { label: "Revenueable", href: "/studios" },
        { label: "NexoCircle", href: "/studios" },
        { label: "PujaDaily", href: "/studios" },
        { label: "All Studios", href: "/studios" },
    ],
    company: [
        { label: "Who We Are", href: "/about" },
        { label: "Principles", href: "/about" },
        { label: "Insights", href: "/insights" },
        { label: "Connect", href: "/connect" },
    ],
    legal: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
        { label: "Sitemap", href: "/sitemap.xml" },
    ]
};

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
                            {/* Social placeholders */}
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                            <div className="w-8 h-8 rounded-full bg-surface-200"></div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">Capabilities</h3>
                        <ul className="space-y-3">
                            {footerLinks.capabilities.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">Studios</h3>
                        <ul className="space-y-3">
                            {footerLinks.studios.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-wider text-gray-400 mb-6">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-black transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

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
