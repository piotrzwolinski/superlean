import { CompanyData } from "@/lib/types";
import { getPitchCopy } from "@/lib/pitch";
import AnimateIn from "@/components/ui/AnimateIn";

function KununuBar({ label, score }: { label: string; score: number }) {
  const pct = (score / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-500 w-40 shrink-0">{label}</span>
      <div className="flex-1 bg-neutral-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${score >= 3.5 ? "bg-green-400" : score >= 2.5 ? "bg-amber-400" : "bg-red-400"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-bold w-8 text-right">{score.toFixed(1)}</span>
    </div>
  );
}

export default function LocationSlide({ data }: { data: CompanyData }) {
  const pitch = getPitchCopy(data.pitchType);
  const regional = data.regionalLabor;
  const kununu = data.kununu;
  const departures = data.linkedinPresence?.departures;

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-4xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            {pitch.location.label}
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="mb-16">
            <p className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              {data.location.city}.
              <br />
              <span className="text-neutral-300">
                {data.location.population.toLocaleString("de-DE")} Einwohner.
              </span>
              <br />
              <span className="text-neutral-300">{data.location.region}.</span>
            </p>
          </div>
        </AnimateIn>

        {/* Distance indicators */}
        <AnimateIn delay={200}>
          <div className="flex flex-wrap gap-4 mb-16">
            {data.location.nearestCities.map((c, i) => (
              <AnimateIn key={c.name} delay={250 + i * 80} direction="left">
                <div className="bg-neutral-50 rounded-xl px-5 py-3 border border-neutral-100">
                  <span className="text-xl font-black">{c.distanceKm} km</span>
                  <span className="text-neutral-400 ml-2 text-sm">bis {c.name}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>

        {/* Regional labor market — hyper-local from Bundesagentur */}
        {regional ? (
          <AnimateIn delay={300}>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                <div className="text-sm text-neutral-500 mb-1">Offene IT-Stellen</div>
                <div className="text-4xl font-black">{regional.openITRoles}</div>
                <div className="text-sm text-neutral-400 mt-1">{regional.landkreis}</div>
              </div>
              <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6">
                <div className="text-sm text-neutral-500 mb-1">Ø Vakanzzeit IT</div>
                <div className="text-4xl font-black">{regional.averageVacancyDays} Tage</div>
                <div className="text-sm text-neutral-400 mt-1">{regional.source}</div>
              </div>
            </div>
          </AnimateIn>
        ) : (
          <div className="space-y-5 mb-16">
            <AnimateIn delay={300}>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-6xl font-black">
                  {data.talentMarket.nationalOpenITRoles}
                </span>
                <span className="text-lg text-neutral-500">
                  unbesetzte IT-Stellen in Deutschland
                </span>
              </div>
            </AnimateIn>
            <AnimateIn delay={400}>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl md:text-6xl font-black">
                  {data.talentMarket.talentShortageRate}
                </span>
                <span className="text-lg text-neutral-500">
                  aller Unternehmen finden keine Fachkräfte
                </span>
              </div>
            </AnimateIn>
          </div>
        )}

        {/* Specific challenges */}
        <div className="space-y-3 mb-16">
          {data.talentMarket.specificChallenges.map((c, i) => (
            <AnimateIn key={i} delay={450 + i * 80}>
              <div className="flex items-start gap-3 text-lg text-neutral-600">
                <span className="text-neutral-300 mt-1 shrink-0">&#x2014;</span>
                <span>{c}</span>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* LinkedIn departures */}
        {departures && departures.length > 0 && (
          <AnimateIn delay={550}>
            <div className="mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
                Wer gegangen ist
              </p>
              <div className="space-y-3">
                {departures.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 text-base">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {d.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <span className="font-medium">{d.name}</span>
                      <span className="text-neutral-400"> · {d.previousRole}</span>
                      <span className="text-neutral-400"> → </span>
                      <span className="font-medium text-red-600">{d.newCompany}</span>
                      <span className="text-neutral-400 text-sm ml-2">{d.when}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        )}

        {/* Kununu */}
        {kununu && (
          <AnimateIn delay={600}>
            <div className="border border-neutral-200 rounded-2xl p-8 mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-1">
                    kununu.com
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black">{kununu.score.toFixed(1)}</span>
                    <span className="text-neutral-400">/ {kununu.outOf}</span>
                    <span className="text-sm text-neutral-400 ml-2">
                      ({kununu.reviewCount} Bewertungen)
                    </span>
                  </div>
                </div>
              </div>
              {kununu.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  {kununu.highlights.map((h) => (
                    <KununuBar key={h.label} label={h.label} score={h.score} />
                  ))}
                </div>
              )}
              {kununu.quotes.length > 0 && (
                <div className="space-y-3 border-t border-neutral-100 pt-4">
                  {kununu.quotes.map((q, i) => (
                    <p key={i} className={`text-sm italic ${q.sentiment === "negative" ? "text-red-600" : "text-neutral-600"}`}>
                      &ldquo;{q.text}&rdquo;
                    </p>
                  ))}
                </div>
              )}
            </div>
          </AnimateIn>
        )}

        {/* Customer quote */}
        {data.product.customerQuotes[0] && (
          <AnimateIn delay={650}>
            <blockquote className="border-l-4 border-black pl-6 py-2 mb-12">
              <p className="text-xl italic text-neutral-700 leading-relaxed">
                &ldquo;{data.product.customerQuotes[0].text}&rdquo;
              </p>
              <cite className="text-sm text-neutral-400 mt-2 block not-italic">
                {data.product.customerQuotes[0].source}
              </cite>
            </blockquote>
          </AnimateIn>
        )}

        <AnimateIn delay={700}>
          <p className="text-2xl font-bold">
            {pitch.location.closing}
            <br />
            <span className="text-neutral-400">
              {pitch.location.closingSub}
            </span>
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
