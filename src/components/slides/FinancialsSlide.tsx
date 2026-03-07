import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

function formatM(n: number) {
  return (n / 1_000_000).toFixed(1).replace(".", ",") + " Mio. EUR";
}

function formatK(n: number) {
  return Math.round(n / 1000).toLocaleString("de-DE") + " TEUR";
}

function TrendArrow({ current, previous }: { current: number; previous: number }) {
  if (current > previous * 1.02) return <span className="text-green-400">&#8599;</span>;
  if (current < previous * 0.98) return <span className="text-red-400">&#8600;</span>;
  return <span className="text-neutral-500">&#8594;</span>;
}

function MiniTrend({ history, field }: { history: CompanyData["financialsHistory"]; field: "totalAssets" | "cash" | "liabilities" | "retainedEarnings" }) {
  if (!history || history.length < 2) return null;
  const sorted = [...history].sort((a, b) => a.year - b.year);
  const max = Math.max(...sorted.map((h) => h[field]));
  if (max === 0) return null;

  return (
    <div className="flex items-end gap-1 mt-3 h-8">
      {sorted.map((h) => (
        <div key={h.year} className="flex flex-col items-center gap-0.5 flex-1">
          <div
            className="w-full bg-neutral-700 rounded-sm min-h-[2px]"
            style={{ height: `${(h[field] / max) * 100}%` }}
          />
          <span className="text-[9px] text-neutral-600">{String(h.year).slice(2)}</span>
        </div>
      ))}
    </div>
  );
}

export default function FinancialsSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  const f = data.financials;
  const hist = data.financialsHistory;
  const cashPct = Math.round((f.cash / f.totalAssets) * 100);
  const yearRange = hist && hist.length >= 2
    ? `${Math.min(...hist.map((h) => h.year))}–${f.year}`
    : String(f.year);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24 bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Jahresabschluss {yearRange} &middot; Öffentlich einsehbar im
            Unternehmensregister
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            {pitch.financials.headline}
            <br />
            <span className="text-neutral-500">
              {pitch.financials.headlineSub}
            </span>
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimateIn delay={100}>
            <div className="border border-neutral-800 rounded-2xl p-8">
              <div className="text-sm text-neutral-500 mb-2">
                Cash & Bank
              </div>
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">
                {formatM(f.cash)}
              </div>
              <div className="text-neutral-500">
                {cashPct}% Ihrer gesamten Bilanzsumme
              </div>
              {/* Visual bar */}
              <div className="mt-4 w-full bg-neutral-800 rounded-full h-3">
                <div
                  className="bg-green-400 rounded-full h-3 transition-all duration-1000"
                  style={{ width: `${cashPct}%` }}
                />
              </div>
              <MiniTrend history={hist} field="cash" />
            </div>
          </AnimateIn>

          <AnimateIn delay={200}>
            <div className="border border-neutral-800 rounded-2xl p-8">
              <div className="text-sm text-neutral-500 mb-2">
                Bilanzgewinn
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2">
                {formatM(f.retainedEarnings)}
              </div>
              <div className="text-neutral-500">
                Unverändert seit {f.year - 1}
              </div>
              {data.ownership.parent && (
                <div className="mt-4 text-amber-400 text-sm font-medium">
                  Gewinnabführungsvertrag mit {data.ownership.parent.split(" ")[0]}
                </div>
              )}
              <MiniTrend history={hist} field="retainedEarnings" />
            </div>
          </AnimateIn>

          <AnimateIn delay={300}>
            <div className="border border-neutral-800 rounded-2xl p-8">
              <div className="text-sm text-neutral-500 mb-2">
                Verbindlichkeiten
              </div>
              <div className="text-4xl md:text-5xl font-black mb-2">
                {formatM(f.liabilities)}
              </div>
              <div className="text-neutral-500">
                {Math.round((f.liabilities / f.totalAssets) * 100)}% der Bilanzsumme
              </div>
              {f.shareholderDebt > 0 && (
                <div className="mt-4 text-amber-400 text-sm font-medium">
                  Davon {formatM(f.shareholderDebt)} Gesellschafterdarlehen
                </div>
              )}
              <MiniTrend history={hist} field="liabilities" />
            </div>
          </AnimateIn>
        </div>

        {/* Narrative interpretation */}
        {data.financialsStory.length > 0 && (
          <AnimateIn delay={350}>
            <div className="border-l-2 border-neutral-700 pl-6 mb-16 space-y-3">
              {data.financialsStory.map((line, i) => (
                <p key={i} className="text-lg text-neutral-300 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </AnimateIn>
        )}

        {/* Multi-year trend table */}
        {hist && hist.length >= 2 && (
          <AnimateIn delay={400}>
            <div className="overflow-x-auto mb-16">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="py-3 pr-6 text-neutral-500 font-medium">Jahr</th>
                    <th className="py-3 pr-6 text-neutral-500 font-medium">Bilanzsumme</th>
                    <th className="py-3 pr-6 text-neutral-500 font-medium">Cash</th>
                    <th className="py-3 pr-6 text-neutral-500 font-medium">Bilanzgewinn</th>
                    <th className="py-3 pr-6 text-neutral-500 font-medium">Verbindl.</th>
                    {hist.some((h) => h.employees) && (
                      <th className="py-3 text-neutral-500 font-medium">MA</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[...hist].sort((a, b) => b.year - a.year).map((h, i, arr) => {
                    const prev = arr[i + 1];
                    return (
                      <tr key={h.year} className="border-b border-neutral-800/50">
                        <td className="py-3 pr-6 font-bold">{h.year}</td>
                        <td className="py-3 pr-6">
                          {formatM(h.totalAssets)}{" "}
                          {prev && <TrendArrow current={h.totalAssets} previous={prev.totalAssets} />}
                        </td>
                        <td className="py-3 pr-6">
                          {formatM(h.cash)}{" "}
                          {prev && <TrendArrow current={h.cash} previous={prev.cash} />}
                        </td>
                        <td className="py-3 pr-6">
                          {formatM(h.retainedEarnings)}{" "}
                          {prev && <TrendArrow current={h.retainedEarnings} previous={prev.retainedEarnings} />}
                        </td>
                        <td className="py-3 pr-6">
                          {formatM(h.liabilities)}{" "}
                          {prev && <TrendArrow current={h.liabilities} previous={prev.liabilities} />}
                        </td>
                        {hist.some((hh) => hh.employees) && (
                          <td className="py-3">
                            {h.employees ?? "–"}{" "}
                            {prev?.employees && h.employees && (
                              <TrendArrow current={h.employees} previous={prev.employees} />
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </AnimateIn>
        )}

        <AnimateIn delay={450}>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="border border-neutral-800 rounded-2xl p-8">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-sm text-neutral-500">Mitarbeiter</div>
                  <div className="text-3xl font-black">{data.employees.current}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-neutral-500">{data.employees.previousYear}</div>
                  <div className="text-2xl font-bold text-neutral-600">{data.employees.previous}</div>
                </div>
              </div>
              <div className="text-red-400 text-sm font-medium">
                {data.employees.previous - data.employees.current} Mitarbeiter verloren. {data.openPositions.length} Stellen offen.
              </div>
            </div>

            <div className="border border-neutral-800 rounded-2xl p-8">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-sm text-neutral-500">Bilanzsumme {f.year}</div>
                  <div className="text-3xl font-black">{formatM(f.totalAssets)}</div>
                </div>
                {hist && hist.length >= 2 && (() => {
                  const sorted = [...hist].sort((a, b) => b.year - a.year);
                  return <TrendArrow current={sorted[0].totalAssets} previous={sorted[sorted.length - 1].totalAssets} />;
                })()}
                {(!hist || hist.length < 2) && <div className="text-red-400 text-xl">&#8600;</div>}
              </div>
              <div className="text-neutral-500 text-sm">
                Eine Trendwende ist möglich — mit dem richtigen Hebel.
              </div>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={550}>
          {(() => {
            const aiCost = data.openPositions.reduce((s, p) => s + p.estimatedSalary * 0.5, 0);
            const cashCoversAI = f.cash >= aiCost;
            return (
              <p className="text-xl md:text-2xl text-center max-w-3xl mx-auto text-neutral-400 leading-relaxed">
                {cashCoversAI ? (
                  <>
                    <span className="text-white font-bold">{formatM(f.cash)} auf der Bank.</span>{" "}
                    Geben Sie {formatK(aiCost)} davon für AI aus — und bekommen Sie mehr als {data.openPositions.length} Mitarbeiter je liefern könnten.
                  </>
                ) : (
                  <>
                    <span className="text-white font-bold">{formatM(f.retainedEarnings)} Bilanzgewinn.</span>{" "}
                    Investieren Sie {formatK(aiCost)} in AI — weniger als ein Jahresgewinn — und bekommen Sie mehr als {data.openPositions.length} Mitarbeiter je liefern könnten.
                  </>
                )}
              </p>
            );
          })()}
        </AnimateIn>
      </div>
    </section>
  );
}
