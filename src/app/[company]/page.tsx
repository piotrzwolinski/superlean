import { notFound } from "next/navigation";
import { getCompanyData, getAllCompanySlugs } from "@/lib/utils";
import LandingPage from "@/components/LandingPage";

export async function generateStaticParams() {
  return getAllCompanySlugs().map((slug) => ({ company: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const data = getCompanyData(company);
  if (!data) return { title: "Not Found" };
  return {
    title: `${data.legalName} — AI-Native Transformation`,
    description: `Persönliche Analyse für ${data.legalName}. ${data.openPositions.length} offene Stellen. Eine bessere Lösung.`,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;
  const data = getCompanyData(company);
  if (!data) notFound();
  return <LandingPage data={data} />;
}
