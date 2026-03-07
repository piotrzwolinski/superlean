"use client";

import { CompanyData } from "@/lib/types";
import { useEffect, useState } from "react";

export default function StickyNav({ data }: { data: CompanyData }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const totalSalary = data.openPositions.reduce(
    (sum, p) => sum + p.estimatedSalary,
    0
  );
  const savings = Math.round(totalSalary * 0.5);

  const scrollToCTA = () => {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-black/95 backdrop-blur-sm text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:block text-sm">
            <span className="text-neutral-400">Mögliche Ersparnis:</span>{" "}
            <span className="font-bold text-green-400">
              {new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(savings)}
              /Jahr
            </span>
          </div>
          <button
            onClick={scrollToCTA}
            className="bg-white text-black font-bold px-6 py-2.5 rounded-lg hover:bg-neutral-200 transition-colors text-sm cursor-pointer"
          >
            Kostenlosen Audit buchen
          </button>
        </div>
      </div>
    </div>
  );
}
