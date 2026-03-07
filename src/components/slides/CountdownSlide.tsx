import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import Countdown from "@/components/ui/Countdown";
import AnimateIn from "@/components/ui/AnimateIn";

export default function CountdownSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="text-2xl md:text-3xl font-bold mb-16">
            {pitch.countdown.intro}
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <Countdown target={data.countdown} />
        </AnimateIn>

        <AnimateIn delay={500}>
          <p className="text-lg text-neutral-400 mt-16 max-w-xl mx-auto">
            {data.countdownReason}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
