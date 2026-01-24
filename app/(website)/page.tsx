import HomeHero from "@/components/home/HomeHero";
import ProofStrip from "@/components/home/ProofStrip";
import CapabilitiesGrid from "@/components/home/CapabilitiesGrid";
import FeaturedWork from "@/components/home/FeaturedWork";
import StudiosGrid from "@/components/home/StudiosGrid";
import Manifesto from "@/components/home/Manifesto";
import HomeCTA from "@/components/home/HomeCTA";
import { homeContent } from "@/lib/data/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <HomeHero
        headline_lines={homeContent.hero.headline_lines}
        subline={homeContent.hero.subline}
        // @ts-ignore - Dynamic key added via CMS
        hero_image={homeContent.hero.hero_image}
      />
      <ProofStrip stats={homeContent.proof_strip} />
      <CapabilitiesGrid />
      <FeaturedWork />
      <StudiosGrid />
      <Manifesto lines={homeContent.manifesto} />
      <HomeCTA />
    </div>
  );
}
