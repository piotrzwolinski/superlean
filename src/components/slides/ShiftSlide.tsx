import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

export default function ShiftSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  const lines1 = pitch.shift.line1(data.openPositions.length).split("\n");
  const lines2 = pitch.shift.line2.split("\n");

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            {lines1.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </AnimateIn>
        <AnimateIn delay={300}>
          <p className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mt-6 text-neutral-300">
            {lines2.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </AnimateIn>
        <AnimateIn delay={600}>
          <p className="text-xl text-neutral-400 mt-12">
            {pitch.shift.line3}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
