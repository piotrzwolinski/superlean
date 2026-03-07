import { CompanyData } from "@/lib/types";
import HeroSlide from "./slides/HeroSlide";
import InsightSlide from "./slides/InsightSlide";
import TeamSlide from "./slides/TeamSlide";
import MirrorSlide from "./slides/MirrorSlide";
import LocationSlide from "./slides/LocationSlide";
import ShiftSlide from "./slides/ShiftSlide";
import FinancialsSlide from "./slides/FinancialsSlide";
import CalculatorSlide from "./slides/CalculatorSlide";
import ProcessSlide from "./slides/ProcessSlide";
import EndGameSlide from "./slides/EndGameSlide";
import CountdownSlide from "./slides/CountdownSlide";
import CTASlide from "./slides/CTASlide";
import StickyNav from "./ui/StickyNav";

export default function LandingPage({ data }: { data: CompanyData }) {
  return (
    <main className="bg-white text-black">
      {/* 1. Hook */}
      <HeroSlide data={data} />

      {/* 2. Killer insight — the one fact */}
      <div className="border-t border-neutral-100" />
      <InsightSlide data={data} />

      {/* 3. Competitive landscape — diagnosis */}
      <div className="border-t border-neutral-100" />
      <MirrorSlide data={data} />

      {/* 3. Talent problem — you can't hire */}
      <div className="border-t border-neutral-100" />
      <LocationSlide data={data} />

      {/* 4. But you have money */}
      <FinancialsSlide data={data} />

      {/* 5. Pivot: don't hire people, hire AI */}
      <div className="border-t border-neutral-100" />
      <ShiftSlide data={data} />

      {/* 6. Who can help — credibility after pain */}
      <div className="border-t border-neutral-100" />
      <TeamSlide />

      {/* 7. Concrete numbers */}
      <div className="border-t border-neutral-100" />
      <CalculatorSlide data={data} />

      {/* 8. Roadmap + what you get + pricing */}
      <div className="border-t border-neutral-100" />
      <ProcessSlide data={data} />

      {/* 9. Two scenarios */}
      <div className="border-t border-neutral-100" />
      <EndGameSlide data={data} />

      {/* 10. Urgency */}
      <div className="border-t border-neutral-100" />
      <CountdownSlide data={data} />

      {/* 11. Action */}
      <div id="cta" className="border-t border-neutral-100" />
      <CTASlide data={data} />

      <StickyNav data={data} />
    </main>
  );
}
