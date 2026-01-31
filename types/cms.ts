export type MediaType = "image" | "video" | "svg" | "pdf";

export interface MediaAsset {
    url: string;
    alt_text: string;
    caption?: string;
    credit?: string;
    width?: number;
    height?: number;
    type: MediaType;
    aeo_context?: string; // "What is this image depicting?"
    generated_prompt?: string;
}

export interface SEO {
    meta_title: string;
    meta_description: string;
    canonical_url?: string;
    robots?: {
        index: boolean;
        follow: boolean;
        noarchive?: boolean;
        nosnippet?: boolean;
    };
    open_graph?: {
        title?: string;
        description?: string;
        image?: MediaAsset;
        type?: "website" | "article";
    };
    twitter?: {
        card_type?: "summary_large_image";
        title?: string;
        description?: string;
        image?: MediaAsset;
    };
    keywords?: string[];
}

export interface AEO {
    entity_name: string;
    entity_type: "Organization" | "Product" | "Service" | "Website" | "SoftwareApplication";
    one_sentence_definition: string;
    two_paragraph_summary?: string;
    key_facts?: { label: string; value: string }[];
    faqs?: { question: string; answer: string }[];
    llm_snippets?: { snippet_purpose: string; snippet_text: string }[];
}

export type CategorySlug = "games" | "entertainment" | "technology" | "communications" | "operations" | "voice" | "integration" | "networks" | "growth";

export interface Capability {
    title: string;
    slug: CategorySlug;
    one_liner: string;
    description: string;
    enables: string[];
    why_it_matters: string;
    applied_in: string[]; // Slugs of platforms
    hero: {
        headline: string;
        subline: string;
    };
    deeper_problem: {
        headline: string;
        points: string[];
        summary: string;
    };
    point_of_view: {
        headline: string;
        content: string | string[];
        summary?: string;
    };
    how_we_build: {
        steps: { title: string; description: string; items?: string[] }[];
        summary?: string;
    };
    what_this_enables: string[];
    why_this_compounds: {
        headline?: string;
        description: string;
    };

    // Keep generic for flexibility
    [key: string]: any;
}

export type PlatformStatus = "live" | "scaling" | "beta" | "archived" | "stealth";

export interface Platform {
    name: string;
    domain: string;
    website_url: string;
    slug: string;
    status: PlatformStatus;
    tagline: string;
    short_description: string;
    long_description?: string;
    logo?: MediaAsset;

    // Classification
    capabilities: CategorySlug[];
    primary_capability: CategorySlug;
    audience: {
        for: string[];
        not_for: string[];
    };

    // Page Content Blocks
    hero: {
        headline: string;
        subline: string;
        primary_cta: { label: string; url: string };
        secondary_cta?: { label: string; url: string };
        microcopy?: string;
        image?: MediaAsset;
    };
    problem: {
        headline: string;
        points: string[];
        summary: string;
    };
    value: {
        headline: string;
        description: string;
        enables?: string[];
    };
    how_it_works: {
        steps: { number: string; title: string; description: string }[];
    };
    showcase: {
        headline: string;
        pillars: string[];
        summary: string;
    };
    proof: {
        signals: string[];
        status: string;
    };
    bridge: {
        headline: string;
        description: string;
        learnings: string[];
    };
    footer: {
        tagline: string;
        description: string;
    };

    // Meta
    seo: SEO;
    aeo: AEO;
}

export interface SiteSettings {
    brand_name: string;
    brand_tagline?: string;
    company_info: {
        legal_name: string;
        address?: string;
        email?: string;
        social_links?: { platform: string; url: string }[];
    };
    default_seo: SEO;
    default_aeo: AEO;
}

export interface NavItem {
    label: string;
    href: string;
    description?: string;
    icon?: string;
}

export interface NavColumn {
    title?: string;
    items: NavItem[];
}

export interface NavSection {
    label: string;
    href: string;
    type: "link" | "dropdown";
    columns?: NavColumn[];
}

export interface Navigation {
    name: string;
    items: NavSection[];
}
export interface HomeContent {
    hero: {
        headline_lines: string[];
        subline: string;
    };
    manifesto: string[];
    proof_strip: { label: string; value: string }[];
    cta: {
        headline: string;
        button_text: string;
    };
}

export interface CaseStudy {
    slug: string;
    client: string;
    headline: string;
    tags: {
        capability: string[];
        industry: string;
        outcome: string;
    };
    hero: {
        title: string;
        outcome: string;
        image?: string;
    };
    context?: {
        paragraph: string;
        constraints: string[];
    };
    problem?: {
        core: string;
    };
    build?: {
        name: string;
        description: string;
    }[];
    flow?: {
        step: string;
        logic: string;
    }[];
    results?: {
        metric: string;
        value: string;
        context: string;
    }[];
    transformation?: {
        before: string[];
        after: string[];
    };
    learnings?: string[];
    seo?: SEO;
    image_prompt?: string; // For generation

}

export interface InsightPost {
    slug: string;
    title: string;
    category: "Essay" | "Playbook" | "System";
    date: string;
    readTime: string;
    excerpt: string;
    content: string; // Markdown
    cover_image?: MediaAsset;
    seo?: SEO;
}

export interface CompanyContent {
    principles: { title: string; description: string }[];
    legal: {
        privacy_policy: string;
        terms_of_service: string;
    };
}

export interface Studio {
    hero: {
        headline: string;
        subline: string;
        primaryCta: string;
        secondaryCta: string;
        microcopy: string;
    };
    audience: {
        for: string[];
        notFor: string[];
    };
    flow: {
        steps: { number: string; title: string; description: string }[];
    };
    bridge?: {
        headline: string;
        description: string;
        learnings: string[];
    };
    problem?: {
        headline: string;
        points: string[];
        summary: string;
    };
    proof?: {
        signals: string[];
        status: string;
    };
    showcase?: {
        headline: string;
        pillars: string[];
        summary: string;
    };
    value?: {
        headline: string;
        description: string;
        enables?: string[];
    };
    cta?: {
        headline: string;
        primaryCta: string;
        secondaryCta: string;
        microcopy: string;
    };
    [key: string]: any;
}
