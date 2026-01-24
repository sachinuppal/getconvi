import LegalLayout from "@/components/legal/LegalLayout";
import { legal } from "@/lib/data/legal";

export default function PrivacyPage() {
    return <LegalLayout
        title={legal.privacy.title}
        lastUpdated={legal.privacy.lastUpdated}
        content={legal.privacy.content}
    />;
}
