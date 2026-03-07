import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

export default function EndGameSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            März 2028
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Zwei Szenarien. Eine Entscheidung.
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimateIn delay={200} direction="left">
            <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12 h-full">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-6">
                Szenario A: Sie haben nichts getan
              </div>
              <div className="space-y-4 text-neutral-300 text-lg leading-relaxed">
                {data.endgameScenarioA.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="text-white font-bold pt-4">
                  {pitch.endgame.scenarioAClosing(data)}
                </p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={400} direction="right">
            <div className="bg-white border-2 border-black rounded-2xl p-8 md:p-12 h-full">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-6">
                Szenario B: Sie sind AI-native gegangen
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  <strong>{data.product.name}</strong> ist die Geschichte des
                  deutschen {data.market.name}-Marktes.
                </p>
                <p>
                  David gegen Goliath.{" "}
                  <strong>
                    {data.employees.current} Menschen + AI-Agents.
                  </strong>{" "}
                  Automatisierte Prozesse — von Code-Reviews bis
                  Kundenanfragen — die Routinearbeit übernehmen. Schneller
                  als Unternehmen mit 600 Ingenieuren.
                </p>
                <p>
                  Die erste AI-native Lösung im {data.market.name}-Markt. Kunden wechseln{" "}
                  <strong>zu Ihnen</strong>.
                </p>
                <p className="font-bold pt-4">
                  {data.location.city} ist kein Nachteil mehr. Es ist der Beweis:
                  Im AI-Zeitalter zählt nicht der Standort. Es zählt die Vision.
                </p>
                <p className="text-neutral-500">
                  {pitch.endgame.scenarioBClosing(data)}
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
