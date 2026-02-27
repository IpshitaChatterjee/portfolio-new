import { CASE_STUDIES } from "@/app/data/case-studies";
import { CaseStudyPage } from "./CaseStudyPage";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((cs) => cs.slug === slug);
  if (!study) notFound();
  return <CaseStudyPage study={study} />;
}
