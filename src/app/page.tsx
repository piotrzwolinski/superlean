import Link from "next/link";
import { getAllCompanySlugs, getCompanyData } from "@/lib/utils";

export default function Home() {
  const slugs = getAllCompanySlugs();
  const companies = slugs
    .map((s) => getCompanyData(s)!)
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2">SuperLean</h1>
        <p className="text-neutral-500 mb-12">
          AI-Transformation Pitches &mdash; {companies.length} Unternehmen
        </p>

        <div className="space-y-4">
          {companies.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="block border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: c.accent }}
                    />
                    <h2 className="text-xl font-black group-hover:underline">
                      {c.name}
                    </h2>
                    <span className="text-xs bg-neutral-100 text-neutral-500 rounded-full px-2 py-0.5">
                      {c.pitchType}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm ml-6">
                    {c.legalName} &middot; {c.location.city},{" "}
                    {c.location.state}
                  </p>
                  <p className="text-neutral-400 text-sm ml-6 mt-1">
                    {c.product.name} &middot; {c.employees.current} MA &middot;{" "}
                    {c.openPositions.length} offene Stellen &middot;{" "}
                    {c.product.techStack.slice(0, 3).join(", ")}
                  </p>
                </div>
                <span className="text-neutral-300 group-hover:text-neutral-500 text-2xl shrink-0 mt-1">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {companies.length === 0 && (
          <p className="text-neutral-400">
            Keine Unternehmen konfiguriert. Legen Sie eine JSON-Datei in
            src/data/companies/ an.
          </p>
        )}

        <p className="text-neutral-300 text-xs mt-12 text-center">
          SuperLean &middot; Alexander Grosse &amp; Piotr Zwolinski
        </p>
      </div>
    </main>
  );
}
