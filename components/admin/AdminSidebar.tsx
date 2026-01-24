"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Home,
    Box,
    Layers,
    Briefcase,
    PenTool,
    LineChart,
    Settings,
    FileText,
    Users,
    Shield,
    ScrollText,
    ImagePlus
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Home Page", href: "/admin/home", icon: Home },
    { name: "Platforms", href: "/admin/platforms", icon: Box },
    { name: "Capabilities", href: "/admin/capabilities", icon: Layers },
    { name: "Work", href: "/admin/work", icon: Briefcase },
    { name: "AI Studio", href: "/admin/studio", icon: PenTool },
    { name: "Insights", href: "/admin/insights", icon: LineChart },
    { name: "Site Settings", href: "/admin/site", icon: Settings },
];

const secondaryLinks = [
    { name: "About", href: "/admin/about", icon: Users },
    { name: "Connect", href: "/admin/connect", icon: FileText },
    { name: "Privacy Policy", href: "/admin/privacy", icon: Shield },
    { name: "Terms of Service", href: "/admin/terms", icon: ScrollText },
    { name: "Batch Image Gen", href: "/admin/batch-image-gen", icon: ImagePlus },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/admin") {
            return pathname === "/admin";
        }
        return pathname.startsWith(path);
    };

    return (
        <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col h-screen sticky top-0">
            <div className="mb-10 pt-2">
                <Link href="/admin" className="block">
                    <h1 className="text-xl font-bold tracking-tight">
                        Getconvi <span className="text-gray-400 font-normal">Admin</span>
                    </h1>
                </Link>
            </div>

            <nav className="space-y-1 flex-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Management
                </div>
                {links.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                active
                                    ? "bg-gray-100 text-black"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <link.icon className={cn("w-4 h-4", active ? "text-black" : "text-gray-500")} />
                            {link.name}
                        </Link>
                    );
                })}

                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-8">
                    Pages
                </div>
                {secondaryLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                active
                                    ? "bg-gray-100 text-black"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <link.icon className={cn("w-4 h-4", active ? "text-black" : "text-gray-500")} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="pt-4 border-t border-gray-100 mt-4 text-xs text-gray-400">
                v2.0.0 (Virtual CMS)
            </div>
        </div>
    );
}
