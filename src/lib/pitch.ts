import { CompanyData, PitchType } from "./types";

interface PitchCopy {
  hero: { closing: string };
  mirror: {
    headline: (data: CompanyData) => string;
    closing: string;
    closingSub: string;
  };
  location: {
    label: string;
    closing: string;
    closingSub: string;
  };
  financials: {
    headline: string;
    headlineSub: string;
  };
  shift: {
    line1: (positions: number) => string;
    line2: string;
    line3: string;
  };
  endgame: {
    scenarioAClosing: (data: CompanyData) => string;
    scenarioBClosing: (data: CompanyData) => string;
  };
  countdown: {
    intro: string;
  };
}

const pitchCopy: Record<PitchType, PitchCopy> = {
  "cash-rich": {
    hero: { closing: "Sie wissen, dass sich etwas ändern muss." },
    mirror: {
      headline: (d) => `${d.market.totalProviders} Anbieter. Ihre Konkurrenz investiert. Sie nicht.`,
      closing: "Die Großen investieren Millionen in AI und Cloud. Sie haben die Mittel, aber keinen Plan.",
      closingSub: "Klein sein ist Ihr Vorteil — wenn Sie ihn jetzt nutzen.",
    },
    location: {
      label: "Dazu kommt: Das Standort-Problem",
      closing: "Sie haben Geld. Aber kein Geld der Welt löst das Talent-Problem in der Region.",
      closingSub: "Die Lösung liegt nicht im Recruiting.",
    },
    financials: {
      headline: "Sie haben die Mittel.",
      headlineSub: "Jetzt fehlt der Plan.",
    },
    shift: {
      line1: (n) => `Sie brauchen keine\n${n} neuen Mitarbeiter.`,
      line2: "Sie brauchen eine\nneue Art von Team.",
      line3: "Wir kommen aus der Software-Entwicklung.\nWir zeigen Ihrem Team den Weg.",
    },
    endgame: {
      scenarioAClosing: (d) =>
        d.ownership.parent
          ? `${d.ownership.parent.split(" ")[0]} stellt die Frage: Lohnt sich ${d.product.name} noch?`
          : `Der Markt fragt: Gibt es ${d.product.name} noch?`,
      scenarioBClosing: (d) =>
        d.ownership.parent
          ? `${d.ownership.parent.split(" ")[0]} skaliert Ihren Ansatz über das gesamte Portfolio.`
          : "Der Markt blickt auf Sie als Vorbild.",
    },
    countdown: {
      intro: "Die Branche bewegt sich. Schneller als je zuvor.",
    },
  },

  "profitable-small": {
    hero: { closing: "Klein, profitabel — und bereit für den nächsten Schritt." },
    mirror: {
      headline: (d) => `${d.market.totalProviders} Anbieter. David gegen Goliath — ohne Schleuder.`,
      closing: "Ihre Wettbewerber haben 10x so viele Entwickler. Mit klassischem Hiring holen Sie das nie auf.",
      closingSub: "Aber Sie müssen es auch nicht.",
    },
    location: {
      label: "Und dann: Der Standort",
      closing: "Sie konkurrieren nicht nur mit den Großen — Sie konkurrieren mit den Großstädten um jeden einzelnen Entwickler.",
      closingSub: "Mehr Gehalt bieten funktioniert nicht, wenn Stuttgart und München remote anbieten.",
    },
    financials: {
      headline: "Stabil profitabel.",
      headlineSub: "Bereit für den Hebel.",
    },
    shift: {
      line1: (n) => `${n} offene Stellen.\nAber der Markt liefert nicht.`,
      line2: "AI kann liefern —\nab morgen.",
      line3: "Wir kommen aus der Software-Entwicklung.\nWir zeigen Ihrem Team den Weg.",
    },
    endgame: {
      scenarioAClosing: (d) =>
        `${d.product.name} bleibt profitabel — aber irrelevant. Die Marge schrumpft jedes Jahr.`,
      scenarioBClosing: (d) =>
        `${d.employees.current} Menschen + AI schlagen Teams mit ${d.competitors[0]?.employees || "500"}+ Mitarbeitern. Jedes Jahr.`,
    },
    countdown: {
      intro: "Der Vorsprung der Großen wächst. Jeden Monat.",
    },
  },

  "talent-bleeding": {
    hero: { closing: "Sie wachsen — aber Ihr Team schrumpft." },
    mirror: {
      headline: (d) => `${d.market.totalProviders} Anbieter. Die anderen wachsen. Sie schrumpfen.`,
      closing: "Ihre Konkurrenz baut Teams auf. Sie verlieren Leute — und finden keinen Ersatz.",
      closingSub: "Das ist kein Recruiting-Problem. Das ist ein Strukturproblem.",
    },
    location: {
      label: "Verschärft durch: Den Standort",
      closing: "Jeder Abgang trifft doppelt: Sie verlieren Know-how und finden am Standort keinen Ersatz.",
      closingSub: "Die Talente gehen in die Großstadt. Die, die bleiben, haben die Wahl.",
    },
    financials: {
      headline: "Das Geld ist da.",
      headlineSub: "Die Menschen nicht.",
    },
    shift: {
      line1: (_n) => "Sie verlieren Leute\nschneller als Sie einstellen.",
      line2: "Hören Sie auf zu suchen.\nFangen Sie an zu automatisieren.",
      line3: "Wir kommen aus der Software-Entwicklung.\nWir zeigen Ihrem Team den Weg.",
    },
    endgame: {
      scenarioAClosing: (d) =>
        `Noch ${Math.max(d.employees.previous - d.employees.current, 2)} Abgänge — und ${d.product.name} ist nicht mehr lieferfähig.`,
      scenarioBClosing: (d) =>
        `Jeder Abgang wird durch AI aufgefangen. ${d.product.name} liefert schneller als je zuvor.`,
    },
    countdown: {
      intro: "Mit jedem Monat ohne AI wächst Ihr Rückstand.",
    },
  },

  declining: {
    hero: { closing: "Die Zahlen sprechen eine klare Sprache." },
    mirror: {
      headline: (d) => `${d.market.totalProviders} Anbieter. Der Markt zieht weiter.`,
      closing: "Ihre Konkurrenz investiert in AI und Cloud. Ihre Bilanzsumme schrumpft.",
      closingSub: "Der Abstand wird jedes Jahr größer.",
    },
    location: {
      label: "Und der Standort hilft nicht",
      closing: "Wer will in ein schrumpfendes Unternehmen in einer kleinen Stadt wechseln?",
      closingSub: "Top-Talente gehen dorthin, wo die Zukunft stattfindet. Sie müssen die Zukunft hierher bringen.",
    },
    financials: {
      headline: "Die Bilanz zeigt den Trend.",
      headlineSub: "Aber der Trend ist umkehrbar.",
    },
    shift: {
      line1: (_n) => "Weniger Umsatz.\nWeniger Mitarbeiter.",
      line2: "Mehr Output.\nMit weniger Aufwand.",
      line3: "Wir kommen aus der Software-Entwicklung.\nWir zeigen Ihrem Team den Weg.",
    },
    endgame: {
      scenarioAClosing: (d) =>
        d.ownership.parent
          ? `${d.ownership.parent.split(" ")[0]} zieht den Stecker.`
          : `${d.product.name} wird vom Markt verdrängt.`,
      scenarioBClosing: (_d) =>
        "Die Trendwende wird zum Branchenvorbild.",
    },
    countdown: {
      intro: "Jeder Monat ohne Veränderung kostet Marktanteile.",
    },
  },
};

export function getPitchCopy(type: PitchType): PitchCopy {
  return pitchCopy[type];
}
