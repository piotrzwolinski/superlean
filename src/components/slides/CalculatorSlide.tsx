"use client";

import { CompanyData } from "@/lib/types";
import AnimateIn from "@/components/ui/AnimateIn";
import { useState } from "react";

function formatEur(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

type Category = "all" | "support" | "development" | "admin" | "management";

const categoryLabels: Record<Category, string> = {
  all: "Alle Stellen",
  support: "Support",
  development: "Entwicklung",
  admin: "Verwaltung",
  management: "Führung",
};

const categoryColors: Record<string, string> = {
  support: "bg-red-500",
  development: "bg-blue-500",
  management: "bg-purple-500",
  admin: "bg-amber-500",
};

export default function CalculatorSlide({ data }: { data: CompanyData }) {
  const [active, setActive] = useState<Category>("all");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const categories = ["all", ...new Set(data.openPositions.map((p) => p.type))] as Category[];

  const filtered =
    active === "all"
      ? data.openPositions
      : data.openPositions.filter((p) => p.type === active);

  const totalSalary = data.openPositions.reduce((s, p) => s + p.estimatedSalary, 0);
  const totalAI = data.openPositions.reduce((s, p) => s + Math.round(p.estimatedSalary * 0.5), 0);
  const savings = totalSalary - totalAI;

  // For the visual bar chart
  const maxSalary = Math.max(...data.openPositions.map((p) => p.estimatedSalary));

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-5xl mx-auto w-full">
        <AnimateIn>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
            Der Kalkulator
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            {data.openPositions.length} Stellen. Ein besserer Weg.
          </h2>
          <p className="text-lg text-neutral-500 mb-8">
            Basierend auf Ihren LinkedIn-Stellenanzeigen und
            Marktgehaltern (Quelle: Stepstone/Gehalt.de, Stand 2025).
          </p>
        </AnimateIn>

        {/* Category tabs */}
        <AnimateIn delay={100}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  active === cat
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {categoryLabels[cat]}
                <span className="ml-1.5 text-xs opacity-60">
                  {cat === "all"
                    ? data.openPositions.length
                    : data.openPositions.filter((p) => p.type === cat).length}
                </span>
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Interactive bar chart */}
        <AnimateIn delay={200}>
          <div className="space-y-2 mb-8">
            {filtered.map((pos, i) => {
              const aiCost = Math.round(pos.estimatedSalary * 0.5);
              const pct = (pos.estimatedSalary / maxSalary) * 100;
              const isHovered = hoveredIdx === i;

              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all cursor-pointer ${
                    isHovered
                      ? "border-black bg-neutral-50 shadow-sm"
                      : "border-neutral-100 bg-white"
                  }`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-2 h-2 rounded-full shrink-0 ${categoryColors[pos.type] || "bg-neutral-400"}`}
                        />
                        <span className="font-bold text-sm md:text-base truncate">
                          {pos.title}
                        </span>
                        {pos.postedAgo && (
                          <span className="text-xs text-red-500 font-medium shrink-0">
                            {pos.postedAgo}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-sm text-neutral-400 line-through">
                          {formatEur(pos.estimatedSalary)}
                        </span>
                        <span className="text-sm font-black text-green-600">
                          {formatEur(aiCost)}
                        </span>
                      </div>
                    </div>

                    {/* Dual bar */}
                    <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-neutral-300 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct * 0.5}%` }}
                      />
                    </div>

                    {/* Expand on hover */}
                    <div
                      className={`grid transition-all duration-300 ${
                        isHovered ? "grid-rows-[1fr] mt-3 opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap items-start justify-between gap-4 text-sm">
                          <div>
                            <span className="text-neutral-400">AI-Alternative: </span>
                            <span className="font-medium">{pos.aiAlternative}</span>
                          </div>
                        </div>
                        <p className="text-sm text-neutral-500 mt-1">
                          {pos.savingsNote}
                        </p>
                        <p className="text-xs text-neutral-400 mt-1">
                          Setup und Betrieb durch unser Team. 12 Monate inkl.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>

        {/* Summary */}
        <AnimateIn delay={300}>
          <div className="bg-black text-white rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  Hiring-Budget
                </div>
                <div className="text-2xl md:text-3xl font-black">
                  {formatEur(totalSalary)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  Mit AI
                </div>
                <div className="text-2xl md:text-3xl font-black text-green-400">
                  {formatEur(totalAI)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  Ersparnis
                </div>
                <div className="text-2xl md:text-3xl font-black text-green-400">
                  {formatEur(savings)}
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
