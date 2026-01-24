import { CaseStudy } from "@/types/cms";
import CaseStudyHero from "./CaseStudyHero";
import ProjectContext from "./ProjectContext";
import SystemArchitecture from "./SystemArchitecture";
import ResultsProof from "./ResultsProof";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CaseStudyTemplate({ data }: { data: CaseStudy }) {
    return (
        <div className="min-h-screen bg-white">
            <CaseStudyHero data={data} />
            <ProjectContext data={data} />
            <SystemArchitecture data={data} />
            <ResultsProof data={data} />

            {/* Footer CTA */}
            <section className="py-24 bg-surface-50 text-center border-t border-gray-200">
                <h2 className="text-2xl font-heading font-medium mb-8">Build something like this?</h2>
                <Link href="/connect" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
                    Start a project <ArrowRight className="w-4 h-4" />
                </Link>
            </section>
        </div>
    );
}
