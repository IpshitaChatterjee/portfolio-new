type Project = {
  name: string
  description: string
  link: string
  blogLink: string
  video: string
  id: string
  requiresPassword?: boolean
}

type VibeProject = {
  name: string
  description: string
  link: string
  blogLink: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
  description: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: 'Broadband label -  Comcast Business',
    description:
      'Introducing FCC mandated broadband labels to existing customer experience',
    link: 'https://pro.motion-primitives.com/',
    blogLink: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    video: '/broadband-labels-hero.jpg',
    id: 'project1',
  },
  {
    name: 'Kitchen stories',
    description: 'A lightweight system to make weekly cooking easier.',
    link: '/blog/kitchen-stories',
    blogLink: 'https://www.behance.net/gallery/203789889/Kitchen-Stories-Redesign-gamified-cooking-experience',
    video: '/kitchen-stories-thumb.jpg',
    id: 'project3',
  },
  {
    name: 'Chase Investor Portal - Help requests',
    description: 'Helping Correspondents raise tickets.',
    link: 'https://motion-primitives.com/',
    blogLink: '/blog/chase-correspondent',
    video: '/hero.jpg',
    id: 'project2',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'JP Morgan Chase & Co.',
    title: 'Sr. UX Associate',
    start: '2025',
    end: 'Present',
    link: 'https://www.chase.com/',
    id: 'work1',
    description: 'Design initiatives across Sales and Originations verticals within home lending',
  },
  {
    company: 'EY Studio +',
    title: 'Sr. UX Design Consultant',
    start: '2021',
    end: '2025',
    link: 'https://www.studio.ey.com/en_gl',
    id: 'work2',
    description: 'Product design and consulting for Comcast Business, a large B2B telco',
  },
  {
    company: 'UXReactor',
    title: 'Sr. Visual Designer',
    start: '2020',
    end: '2021',
    link: 'https://uxreactor.com/',
    id: 'work3',
    description: 'Fast paced design innovation for several clients.',
  },
  {
    company: 'Infosys',
    title: 'Systems Engineer',
    start: '2018',
    end: '2020',
    link: 'https://www.infosys.com/',
    id: 'work4',
    description: 'iOS development for LEX, a cross-platform ed-tech application.',
  },
]

export const VIBE_PROJECTS: VibeProject[] = [
  {
    name: 'An AI digest to catch me up on everything',
    description: '',
    link: 'https://ninth-meta-62220112.figma.site/',
    blogLink: 'https://ninth-meta-62220112.figma.site/',
    video: '',
    id: 'vibe-1',
  },
  {
    name: 'An obisidian like personalised note-taking system',
    description: '',
    link: 'https://v0-digital-garden-psi.vercel.app/',
    blogLink: 'https://v0-digital-garden-psi.vercel.app/',
    video: '',
    id: 'vibe-2',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Kitchen stories - simplifying meal planning',
    description: 'Designing a lightweight system to make weekly cooking easier.',
    link: 'https://www.behance.net/gallery/203789889/Kitchen-Stories-Redesign-gamified-cooking-experience',
    uid: 'blog-5',
  },
  {
    title: 'Exploring the Intersection of Design, AI, and Design Engineering',
    description: 'How AI is changing the way we design',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Why I left my job to start my own company',
    description:
      'A deep dive into my decision to leave my job and start my own company',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'What I learned from my first year of freelancing',
    description:
      'A look back at my first year of freelancing and what I learned',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'How to Export Metadata from MDX for Next.js SEO',
    description: 'A guide on exporting metadata from MDX files to leverage Next.js SEO features.',
    link: '/blog/example-mdx-metadata',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/IpshitaChatterjee',
  },
  {
    label: 'Twitter',
    link: 'https://x.com/IpshitaChatter2',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ipshita-ch/',
  },
  {
    label: 'CV',
    link: 'https://drive.google.com/file/d/1-pgA94O5KoaCJZAI54jCSLZswO32zggs/view?usp=sharing',
  },
]

export const EMAIL = 'ipshita.chatterjee02@gmail.com'
