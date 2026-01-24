import workData from "@/content/work.json";
import { CaseStudy } from "@/types/cms";

// Convert array to Record for easy lookup by slug
export const caseStudies: Record<string, CaseStudy> = (workData as CaseStudy[]).reduce((acc, study) => {
    acc[study.slug] = study;
    return acc;
}, {} as Record<string, CaseStudy>);

export function getAllCaseStudies(): CaseStudy[] {
    return workData as CaseStudy[];
}
