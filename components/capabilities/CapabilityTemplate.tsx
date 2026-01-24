
import CapabilityHero from "./CapabilityHero";
import ProblemFraming from "./ProblemFraming";
import SystemOutputs from "./SystemOutputs";
import ProcessFlow from "./ProcessFlow";
import ContextualProof from "./ContextualProof";
import AudienceCheck from "./AudienceCheck";
import FAQSection from "./FAQSection";
import CapabilityCTA from "./CapabilityCTA";
import { Capability } from "@/types/cms";

export default function CapabilityTemplate({ data }: { data: Capability }) {
    return (
        <div className="min-h-screen bg-white">
            <CapabilityHero data={data} />
            <ProblemFraming data={data} />
            <SystemOutputs data={data} />
            <ProcessFlow data={data} />
            <ContextualProof data={data} />
            <AudienceCheck data={data} />
            <FAQSection data={data} />
            <CapabilityCTA data={data} />
        </div>
    );
}
