import LegalLayout from "@/components/legal/LegalLayout";
import { legal } from "@/lib/data/legal";

export default function TermsPage() {
    return <LegalLayout
        title={legal.terms.title}
        lastUpdated={legal.terms.lastUpdated}
        content={legal.terms.content}
    />;
}
