import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

const aiLabels = ["Keine", "Basis", "Fortgeschritten", "Führend"];

function AIDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" title={aiLabels[level]}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i <= level ? "bg-black" : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function MirrorSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  const threat = data.competitors[0];

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        {/* Market context */}
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            {data.market.name}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            {pitch.mirror.headline(data)}
          </h2>
          <p className="text-lg text-neutral-500 mb-16">
            Ihr größter Wettbewerber: <strong className="text-black">{threat.name}</strong> — {threat.employees} Mitarbeiter, {threat.customers} Kunden.
          </p>
        </AnimateIn>

        {/* Full competitor table */}
        <AnimateIn delay={200}>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="py-4 pr-6 font-bold">Anbieter</th>
                  <th className="py-4 pr-6 font-bold">Kunden</th>
                  <th className="py-4 pr-6 font-bold">Mitarbeiter</th>
                  <th className="py-4 pr-6 font-bold">AI</th>
                  <th className="py-4 pr-6 font-bold">Cloud</th>
                </tr>
              </thead>
              <tbody>
                {data.competitors.map((c, i) => (
                  <tr key={i} className="border-b border-neutral-100">
                    <td className="py-4 pr-6 font-medium">{c.name}</td>
                    <td className="py-4 pr-6">{c.customers}</td>
                    <td className="py-4 pr-6">{c.employees}</td>
                    <td className="py-4 pr-6">
                      <AIDots level={c.aiMaturity} />
                    </td>
                    <td className="py-4 pr-6">
                      <AIDots level={c.cloudReady} />
                    </td>
                  </tr>
                ))}
                <tr className="border-b-2 border-black bg-neutral-50">
                  <td className="py-4 pr-6 font-black">{data.product.name}</td>
                  <td className="py-4 pr-6 text-neutral-400">Klein</td>
                  <td className="py-4 pr-6 font-bold">
                    {data.employees.current}
                  </td>
                  <td className="py-4 pr-6">
                    <AIDots level={0} />
                  </td>
                  <td className="py-4 pr-6">
                    <AIDots level={0} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </AnimateIn>

        {/* Google Trends — visual bar comparison */}
        {data.googleTrends && (() => {
          const gt = data.googleTrends;
          const max = Math.max(gt.competitorScore, gt.productScore, 1);
          const compPct = Math.max((gt.competitorScore / max) * 100, 2);
          const prodPct = Math.max((gt.productScore / max) * 100, 2);
          return (
            <AnimateIn delay={280}>
              <div className="mb-12">
                <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
                  Google-Suchinteresse · {gt.period}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-40 shrink-0 text-right">{gt.competitor}</span>
                    <div className="flex-1 bg-neutral-100 rounded-full h-7 overflow-hidden">
                      <div
                        className="bg-black rounded-full h-7 transition-all duration-1000"
                        style={{ width: `${compPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold w-8 shrink-0">{gt.competitorScore}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium w-40 shrink-0 text-right">{gt.product}</span>
                    <div className="flex-1 bg-neutral-100 rounded-full h-7 overflow-hidden">
                      <div
                        className="bg-red-400 rounded-full h-7 transition-all duration-1000"
                        style={{ width: `${prodPct}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-red-400 w-8 shrink-0">{gt.productScore}</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          );
        })()}

        {/* Market trend pills */}
        <AnimateIn delay={300}>
          <div className="flex flex-wrap gap-2 mb-16">
            {data.market.trends.map((t, i) => (
              <span
                key={i}
                className="bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2 text-sm text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        </AnimateIn>

        {/* Closing — narrative bridge */}
        <AnimateIn delay={400}>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl leading-relaxed">
              {pitch.mirror.closing}
            </p>
            <p className="text-xl md:text-2xl leading-relaxed mt-4 text-neutral-400">
              {pitch.mirror.closingSub}
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
