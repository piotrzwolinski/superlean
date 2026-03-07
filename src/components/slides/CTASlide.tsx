"use client";

import { CompanyData } from "@/lib/types";
import { useState } from "react";

export default function CTASlide({ data }: { data: CompanyData }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-24">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-sm uppercase tracking-[0.2em] text-neutral-400 mb-4">
          Nächster Schritt
        </h2>
        <p className="text-3xl md:text-4xl font-black mb-4">
          Kostenloses AI-Readiness-Gespräch
        </p>
        <p className="text-lg text-neutral-500 mb-12">
          90 Minuten mit zwei Software-Leuten, die Ihre Welt verstehen:
        </p>

        <div className="space-y-4 mb-12">
          {[
            "90 Minuten mit Alexander & Piotr — persönlich oder remote",
            `Wo steht ${data.product.name} heute? Wo kann AI sofort helfen?`,
            "Konkreter Fahrplan: Welche Rollen und Prozesse zuerst umstellen",
            "Ehrliche Einschätzung: Was lohnt sich, was nicht",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-lg">
              <span className="text-green-500 mt-1 shrink-0">&#x2713;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <p className="text-neutral-400 mb-8">
          Kein Vertrag. Kein Commitment. Keine PowerPoint. Nur Klarheit.
        </p>

        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                Name
              </label>
              <input
                type="text"
                defaultValue={data.management.ceo}
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                E-Mail
              </label>
              <input
                type="email"
                placeholder={`${data.management.ceo.toLowerCase().replace(" ", ".")}@${data.slug}.de`}
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                defaultValue={data.ctaPhone}
                className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white rounded-lg px-8 py-4 text-lg font-bold hover:bg-neutral-800 transition-colors mt-4 cursor-pointer"
            >
              Termin vereinbaren
            </button>
          </form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
            <p className="text-2xl font-bold text-green-800">
              Vielen Dank.
            </p>
            <p className="text-green-600 mt-2">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-neutral-100 text-center text-sm text-neutral-400">
          <p>
            Erstellt für {data.legalName} &middot; {data.location.address}
          </p>
          <p className="mt-1">
            von <strong className="text-neutral-600">Alexander Grosse</strong> &amp;{" "}
            <strong className="text-neutral-600">Piotr Zwolinski</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
