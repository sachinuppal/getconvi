import insightsData from "@/content/insights.json";
import { InsightPost } from "@/types/cms";

export const insights: Record<string, InsightPost> = (insightsData as InsightPost[]).reduce((acc, post) => {
    acc[post.slug] = post;
    return acc;
}, {} as Record<string, InsightPost>);

export function getAllInsights(): InsightPost[] {
    return insightsData as InsightPost[];
}
