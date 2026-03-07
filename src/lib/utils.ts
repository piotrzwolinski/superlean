import fs from "fs";
import path from "path";
import { CompanyData } from "./types";

const companiesDir = path.join(process.cwd(), "src/data/companies");

export function getCompanyData(slug: string): CompanyData | null {
  const filePath = path.join(companiesDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as CompanyData;
}

export function getAllCompanySlugs(): string[] {
  if (!fs.existsSync(companiesDir)) return [];
  return fs
    .readdirSync(companiesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("de-DE").format(n);
}
