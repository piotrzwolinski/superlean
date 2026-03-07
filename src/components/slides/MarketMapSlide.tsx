import { CompanyData } from "@/lib/types";
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

export default function MarketMapSlide({ data }: { data: CompanyData }) {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            {data.market.name}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            {data.market.totalProviders} Anbieter. Die Großen investieren.{" "}
            <br />
            <span className="text-neutral-400">
              Wo steht {data.product.name}?
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div className="overflow-x-auto">
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

        {/* Market trend pills */}
        <AnimateIn delay={300}>
          <div className="flex flex-wrap gap-2 mt-10 mb-12">
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

        <AnimateIn delay={400}>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl leading-relaxed">
              Die Großen migrieren Monolithen. Das dauert{" "}
              <strong>Jahre</strong>. Sie können in <strong>Monaten</strong>{" "}
              dort sein, wo die anderen in 3 Jahren ankommen.
            </p>
            <p className="text-xl md:text-2xl leading-relaxed mt-4 text-neutral-400">
              Klein sein ist Ihr größter Vorteil — wenn Sie ihn jetzt nutzen.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
