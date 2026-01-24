import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import GSAPRegistry from "@/components/providers/GSAPRegistry";
import Schema from "@/components/seo/Schema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Getconvi - AI-Native Product Execution Partner",
    template: "%s | Getconvi Technologies",
  },
  description: "Getconvi builds, scales, and monetizes AI-native products and growth engines from idea to internet scale. We ship businesses, not decks.",
  alternates: {
    canonical: "https://getconvi.com",
  },
  metadataBase: new URL("https://getconvi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased selection:bg-electric-blue selection:text-white`}
      >
        <GSAPRegistry />
        <Schema
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Getconvi",
            "url": "https://getconvi.com",
            "logo": "https://getconvi.com/logo.png",
            "description": "Getconvi builds, scales, and monetizes AI-native products.",
            "sameAs": [
              "https://twitter.com/getconvi",
              "https://linkedin.com/company/getconvi"
            ]
          }}
        />
        {children}
      </body>
    </html>
  );
}
