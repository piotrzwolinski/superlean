export type PitchType = "cash-rich" | "profitable-small" | "talent-bleeding" | "declining";

export interface CompanyData {
  slug: string;
  name: string;
  legalName: string;
  location: {
    city: string;
    region: string;
    state: string;
    address: string;
    population: number;
    nearestCities: { name: string; distanceKm: number }[];
  };
  founded: number;
  employees: {
    current: number;
    previous: number;
    previousYear: number;
  };
  product: {
    name: string;
    description: string;
    techStack: string[];
    weaknesses: string[];
    customerQuotes: { text: string; source: string }[];
    rating: { score: number; outOf: number; reviewCount: number; platform: string };
  };
  management: {
    ceo: string;
    team: string[];
  };
  ownership: {
    parent: string | null;
    parentDescription: string | null;
    since: number | null;
  };
  financials: {
    year: number;
    totalAssets: number;
    cash: number;
    retainedEarnings: number;
    liabilities: number;
    shareholderDebt: number;
  };
  financialsHistory?: {
    year: number;
    totalAssets: number;
    cash: number;
    retainedEarnings: number;
    liabilities: number;
    shareholderDebt: number;
    employees?: number;
  }[];
  openPositions: {
    title: string;
    location: string;
    type: string;
    postedAgo: string;
    estimatedSalary: number;
    aiAlternative: string;
    aiReplaceability: number; // 0-100
    savingsNote: string;
  }[];
  competitors: {
    name: string;
    customers: string;
    employees: string;
    owner: string;
    aiMaturity: number; // 0-3
    cloudReady: number; // 0-3
    highlight: string;
  }[];
  market: {
    name: string;
    totalProviders: number;
    trends: string[];
    stats: { label: string; value: string }[];
  };
  talentMarket: {
    nationalOpenITRoles: string;
    talentShortageRate: string;
    specificChallenges: string[];
  };
  kununu?: {
    score: number;                // e.g., 2.8
    outOf: number;                // e.g., 5
    reviewCount: number;
    highlights: {
      label: string;              // e.g., "Karriere/Weiterbildung"
      score: number;              // e.g., 2.1
    }[];
    quotes: {
      text: string;
      sentiment: "positive" | "negative";
    }[];
  };
  linkedinPresence?: {
    employeeCount: number;
    employeeGrowth: string;       // e.g., "-8% in 12 Monaten"
    ceoLastPost?: string;         // e.g., "März 2022" or null
    ceoPostTopic?: string;        // e.g., "Digitalisierung" — ironic if nothing happened
    departures: {
      name: string;
      previousRole: string;
      newCompany: string;
      when: string;               // e.g., "Jan 2025"
    }[];
  };
  googleTrends?: {
    product: string;              // search term for the company's product
    competitor: string;           // search term for the top competitor
    productScore: number;         // Google Trends relative index (0-100)
    competitorScore: number;      // Google Trends relative index (0-100)
    summary: string;              // e.g., "aposoft -15%, PHARMATECHNIK +40% (5 Jahre)"
    period: string;               // e.g., "2021–2026"
  };
  regionalLabor?: {
    landkreis: string;            // e.g., "Landkreis Leer"
    openITRoles: number;
    averageVacancyDays: number;   // from Bundesagentur Vakanzzeit-Statistik
    source: string;               // e.g., "Bundesagentur für Arbeit, März 2026"
  };
  plan: {
    title: string;              // e.g., "APOSOFT SUPPORT"
    timeline: string;           // e.g., "Monat 1-3"
    tagline: string;            // e.g., "Keine Woche Wartezeit mehr."
    items: string[];            // 3-4 specific actions
    result: string;             // e.g., "Wartezeit von 1 Woche auf unter 5 Minuten"
  }[];
  killerInsight: {
    text: string;               // The one fact that makes the CEO think "they know everything about us"
    source: string;             // Attribution (e.g., "Apotheke ADHOC, März 2025")
  };
  pitchType: PitchType;
  accent: string; // hex color from company brand
  financialsStory: string[]; // 2-3 interpretive sentences connecting the numbers to the company's situation
  countdown: string; // ISO date for countdown target
  countdownReason: string; // Why this date matters (e.g., "PHARMATECHNIK plant bis dahin 80+ AI-Module")
  endgameScenarioA: string[]; // 3 paragraphs for "did nothing" scenario, company-specific
  ctaEmail: string;
  ctaPhone: string;
}
