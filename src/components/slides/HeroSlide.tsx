import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

export default function HeroSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn delay={200}>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-12">
            Eine persönliche Analyse für {data.legalName}
          </p>
        </AnimateIn>

        <AnimateIn delay={400}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-12">
            {data.product.name}.
            <br />
            <span className="text-neutral-400">
              {data.employees.current} Mitarbeiter.
            </span>
            <br />
            <span className="text-neutral-400">
              {data.openPositions.length} offene Stellen.
            </span>
            <br />
            <span className="text-neutral-400">{data.location.city}.</span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={800}>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {pitch.hero.closing}
          </p>
        </AnimateIn>
      </div>

      <AnimateIn delay={1200} className="absolute bottom-12">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </AnimateIn>
    </section>
  );
}
