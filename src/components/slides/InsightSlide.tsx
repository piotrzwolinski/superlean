import { CompanyData } from "@/lib/types";
import AnimateIn from "@/components/ui/AnimateIn";

export default function InsightSlide({ data }: { data: CompanyData }) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            {data.killerInsight.text}
          </p>
        </AnimateIn>
        <AnimateIn delay={400}>
          <p className="text-sm text-neutral-400 mt-8">
            {data.killerInsight.source}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
