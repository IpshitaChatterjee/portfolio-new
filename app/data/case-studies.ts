export interface CaseStudy {
  slug: string;
  title: string;
  date: string;
  role: string;
  client: string;
  problem: string;
  outcome: string;
  imageUrl: string;
  label: string;
  description: string;
  images: { span: 1 | 2; aspect: "landscape" | "portrait" | "square" | "wide" }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "onboarding-at-scale",
    title: "Redesigning Onboarding at Scale",
    date: "2024",
    role: "UX Design Associate",
    client: "JP Morgan Chase",
    problem:
      "New users were abandoning a 23-step loan application at a rate of 67%, with the steepest drop-off occurring at step 8. Years of compliance requirements had been layered onto the flow without user-centred refinement — creating cognitive overload and eroding trust at the moments that mattered most.",
    outcome:
      "Reduced drop-off by 34% through progressive disclosure, contextual guidance, and behavioural nudges. Average completion time fell from 18 minutes to 11 minutes. The redesigned flow is now the standard onboarding template across three JP Morgan Chase product lines.",
    imageUrl: "/chase.png",
    label: "Case Study",
    description:
      "Reduced drop-off by 34% through progressive disclosure and behavioural nudges.",
    images: [
      { span: 2, aspect: "landscape" },
      { span: 1, aspect: "portrait" },
      { span: 1, aspect: "square" },
      { span: 1, aspect: "square" },
      { span: 1, aspect: "square" },
      { span: 2, aspect: "wide" },
      { span: 1, aspect: "portrait" },
      { span: 1, aspect: "landscape" },
      { span: 1, aspect: "landscape" },
    ],
  },
  {
    slug: "design-system-fintech",
    title: "Design System for Fintech",
    date: "2023",
    role: "Senior UX Consultant",
    client: "EY Studio+",
    problem:
      "Twelve product teams were independently building UI components, resulting in a fragmented experience across four EY Studio+ products. Engineers spent 40% of their time on UI work that should have been standardised, and design reviews were consumed by inconsistency issues instead of product decisions.",
    outcome:
      "Delivered a component library adopted by 12 teams and 200+ engineers across 4 products. UI-related development time fell by 60%, design review cycles shortened by half, and a shared token system enabled consistent theming across all EY Studio+ surfaces.",
    imageUrl: "/cbm.png",
    label: "Case Study",
    description:
      "Built a component library serving 12 teams and 200+ engineers across 4 products.",
    images: [
      { span: 1, aspect: "portrait" },
      { span: 2, aspect: "landscape" },
      { span: 1, aspect: "square" },
      { span: 1, aspect: "landscape" },
      { span: 1, aspect: "landscape" },
      { span: 1, aspect: "portrait" },
      { span: 2, aspect: "wide" },
      { span: 1, aspect: "square" },
      { span: 1, aspect: "landscape" },
    ],
  },
];
