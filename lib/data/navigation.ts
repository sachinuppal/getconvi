import { Navigation } from "@/types/cms";

export const headerNav: Navigation = {
    name: "Header",
    items: [
        { label: "Method", type: "internal_page", url: "/about" },
        { label: "Capabilities", type: "internal_page", url: "/capabilities" },
        { label: "Studios", type: "internal_page", url: "/studios" },
        { label: "Work", type: "internal_page", url: "/work" },
        { label: "Insights", type: "internal_page", url: "/insights" },
        { label: "Contact", type: "internal_page", url: "/connect", is_primary: true },
    ]
};

export const footerNav: Navigation = {
    name: "Footer",
    items: [
        { label: "About", type: "internal_page", url: "/about" },
        { label: "Capabilities", type: "internal_page", url: "/capabilities" },
        { label: "Studios", type: "internal_page", url: "/studios" },
        { label: "Work", type: "internal_page", url: "/work" },
        { label: "Insights", type: "internal_page", url: "/insights" },
        { label: "Contact", type: "internal_page", url: "/connect" },
    ]
};

export const legalNav: Navigation = {
    name: "Legal",
    items: [
        { label: "Privacy Policy", type: "internal_page", url: "/legal/privacy" },
        { label: "Terms of Service", type: "internal_page", url: "/legal/terms" },
    ]
};
