# SuperLean

Hyper-personalized AI-transformation outreach landing pages for German software companies.

Each company gets a unique `/{slug}` page with a 12-slide narrative built entirely from a single JSON data file.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — overview page with links to all companies.

## Adding a company

1. Research the target company (see data sources below)
2. Create `src/data/companies/{slug}.json` following the schema in `src/lib/types.ts`
3. The page appears automatically at `/{slug}`

No code changes needed — everything is data-driven.

## Project structure

```
src/
  app/
    page.tsx                    # Overview page (/)
    [company]/page.tsx          # Dynamic route (/{slug})
  components/
    LandingPage.tsx             # Slide orchestrator
    slides/                     # 12 slide components
    ui/                         # AnimateIn, Countdown, StickyNav
  data/
    companies/                  # One JSON per company
  lib/
    types.ts                    # CompanyData interface
    pitch.ts                    # Pitch archetype copy (4 types)
    utils.ts                    # Data loading helpers
```

## Slide sequence

1. **Hero** — Hook with product name, headcount, open positions, location
2. **Insight** — One devastating fact, full-screen
3. **Mirror** — Competitor table with AI/Cloud maturity, Google Trends
4. **Location** — Talent problem: rural location, Kununu, LinkedIn departures
5. **Financials** — Balance sheet from Unternehmensregister, narrative
6. **Shift** — Pivot: don't hire, use AI
7. **Team** — Alexander Grosse & Piotr Zwolinski
8. **Calculator** — Interactive: each open position vs AI alternative
9. **Process** — Company-specific 3-phase roadmap
10. **EndGame** — Two scenarios: did nothing vs went AI-native
11. **Countdown** — Timer to competitor milestone
12. **CTA** — Free AI-readiness call, pre-filled form

## Pitch archetypes

Each company is assigned one of 4 types that control tone across all slides:

- `cash-rich` — Has money but isn't investing in AI
- `profitable-small` — Steady profits, small team, needs leverage
- `talent-bleeding` — Growing business but losing/can't hire people
- `declining` — Shrinking assets, urgent transformation needed

## Tech stack

- Next.js 16 (App Router, static generation)
- React 19
- Tailwind CSS 4
- TypeScript 5

## Data sources

| Data | Source |
|------|--------|
| Financials (3+ years) | unternehmensregister.de (free, no login) |
| Employee count | Jahresabschluss Anhang |
| Open positions | LinkedIn Jobs, company career page |
| Salary estimates | Stepstone, Gehalt.de |
| Competitors | Industry research |
| Employee reviews | kununu.com |
| Search trends | Google Trends |
| Regional labor | Bundesagentur für Arbeit |
| Brand color | Company website CSS |
