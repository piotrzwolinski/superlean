import { CompanyData } from "@/lib/types";
import AnimateIn from "@/components/ui/AnimateIn";

const deliverables = [
  {
    icon: "01",
    title: "Setup",
    description:
      "Wir analysieren Ihren Stack, Ihre Prozesse, Ihr Team. Dann richten wir die AI-Tools ein und schulen Ihre Leute. In Wochen, nicht Monaten.",
  },
  {
    icon: "02",
    title: "Betrieb",
    description:
      "12 Monate Begleitung: Wir optimieren Workflows, lösen Probleme und stellen sicher, dass Ihr Team AI produktiv nutzt. Nicht einmal, sondern dauerhaft.",
  },
  {
    icon: "03",
    title: "Übergabe",
    description:
      "Nach 12 Monaten gehört alles Ihnen: Code, Modelle, Dokumentation, Know-how. Keine Abhängigkeit. Kein Vendor-Lock-in.",
  },
];

export default function ProcessSlide({ data }: { data: CompanyData }) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            Der Weg nach vorne
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Von Legacy zu AI-Native.
            <br />
            <span className="text-neutral-400">In 18 Monaten.</span>
          </h2>
          <p className="text-lg text-neutral-500 mb-16 max-w-3xl">
            Kein generischer Plan. Drei Phasen — zugeschnitten auf{" "}
            <strong className="text-black">{data.product.name}</strong>, Ihren
            Stack und Ihr Team.
          </p>
        </AnimateIn>

        {/* 3 Phases — from company JSON */}
        <div className="space-y-6 mb-20">
          {data.plan.map((phase, pi) => (
            <AnimateIn key={pi} delay={pi * 150}>
              <div className="border border-neutral-200 rounded-2xl p-8 md:p-10 hover:border-neutral-400 transition-all hover:shadow-sm">
                <div className="flex flex-wrap items-start gap-6 mb-6">
                  <span className="text-6xl font-black text-neutral-100 leading-none">
                    {String(pi + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex items-center gap-4 mb-1">
                      <h3 className="text-2xl md:text-3xl font-black">
                        {phase.title}
                      </h3>
                      <span className="text-sm bg-neutral-100 text-neutral-500 rounded-full px-3 py-1">
                        {phase.timeline}
                      </span>
                    </div>
                    <p className="text-lg text-neutral-500 italic">
                      &ldquo;{phase.tagline}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  {phase.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-base">
                      <span className="text-green-500 mt-0.5 shrink-0">&#x2713;</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-neutral-50 rounded-lg px-5 py-2.5 inline-block">
                  <span className="text-sm text-neutral-500">Ergebnis:</span>{" "}
                  <span className="font-bold text-sm">{phase.result}</span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* How we work: Setup / Betrieb / Übergabe */}
        <AnimateIn delay={500}>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            So arbeiten wir
          </p>
          <h3 className="text-2xl md:text-3xl font-black mb-10">
            Kein Konzeptpapier. Ein funktionierendes System.
          </h3>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {deliverables.map((d, i) => (
            <AnimateIn key={d.title} delay={600 + i * 150}>
              <div className="border border-neutral-200 rounded-2xl p-8 h-full">
                <div className="text-4xl font-black text-neutral-100 mb-4">
                  {d.icon}
                </div>
                <h3 className="text-xl font-black mb-3">{d.title}</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {d.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
