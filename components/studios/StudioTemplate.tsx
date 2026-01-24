import { Studio } from "@/types/cms";
import StudioHero from "./StudioHero";
import StudioProblem from "./StudioProblem";
import StudioValue from "./StudioValue";
import StudioFlow from "./StudioFlow";
import StudioShowcase from "./StudioShowcase";
import StudioAudience from "./StudioAudience";
import StudioProof from "./StudioProof";
import StudioBridge from "./StudioBridge";
import StudioCTA from "./StudioCTA";

interface StudioTemplateProps {
    studio: Studio;
}

export default function StudioTemplate({ studio }: StudioTemplateProps) {
    // Adapter: Ensure child components receive the expected data shape if they haven't been refactored yet.
    // Ideally, we would refactor all child components to use `Platform` too, but for now we pass the whole object
    // assuming they access fields that exist on both (like hero, problem, etc.)
    // If they rely on `categories` (legacy), we might need to map it or update them.
    // Based on previous work, child components likely just take the "data" prop. 
    // Wait, the previous file had `data={data}` passed to children. 
    // The new interface has `studio: Platform`. 
    // Let's pass `data={studio}` to be safe if children expect `data`.

    return (
        <div className="min-h-screen bg-white">
            <StudioHero data={studio} />
            <StudioProblem data={studio} />
            <StudioValue data={studio} />
            <StudioFlow data={studio} />
            <StudioShowcase data={studio} />
            <StudioAudience data={studio} />
            <StudioProof data={studio} />
            <StudioBridge data={studio} />
            <StudioCTA data={studio} />
            {/* Footer handles its own data */}
        </div>
    );
}
