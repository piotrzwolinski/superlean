import { CompanyData } from "@/lib/types";
import AnimateIn from "@/components/ui/AnimateIn";

const deliverables = [
  {
    icon: "01",
    title: "Setup",
    description:
      "Wir implementieren den AI-Agenten für die jeweilige Rolle. Sie müssen nichts tun außer Zugang geben. Kein internes IT-Projekt.",
  },
  {
    icon: "02",
    title: "Betrieb",
    description:
      "Wir betreiben, überwachen und optimieren für 12 Monate. Ihr Team arbeitet mit dem Agenten — wir sorgen dafür, dass er funktioniert.",
  },
  {
    icon: "03",
    title: "Übergabe",
    description:
      "Nach 12 Monaten gehört alles Ihnen: Code, Modelle, Dokumentation, Know-how. Keine Abhängigkeit. Kein Vendor-Lock-in.",
  },
];

export default function OfferSlide({ data }: { data: CompanyData }) {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            Was Sie konkret bekommen
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Kein Konzeptpapier.
            <br />
            <span className="text-neutral-400">
              Ein funktionierendes System.
            </span>
          </h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-3xl">
            Für jede Stelle im Kalkulator bauen wir einen AI-Agenten, der die
            Routinearbeit dieser Rolle übernimmt. Ihr bestehendes Team arbeitet
            weiter — nur schneller und mit weniger Engpässen.
          </p>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {deliverables.map((d, i) => (
            <AnimateIn key={d.title} delay={i * 150}>
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

        <AnimateIn delay={500}>
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-sm uppercase tracking-widest text-neutral-400 mb-2">
                  Preismodell
                </div>
                <p className="text-2xl font-black">
                  50% des Jahresgehalts der ersetzten Stelle.
                </p>
                <p className="text-neutral-500 mt-1">
                  Einmalig. Keine laufenden Kosten. Keine versteckten Gebühren.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm text-neutral-400">Beispiel</div>
                <div className="text-lg">
                  Support-Stelle (35.000 &euro;/Jahr)
                </div>
                <div className="text-2xl font-black text-green-600">
                  = 17.500 &euro; einmalig
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
