export type Status = "Draft" | "Published" | "Scheduled"

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaLink: string
  secondaryCtaLabel: string
  secondaryCtaLink: string
  backgroundImage: string
  highlights: string[]
  status: Status
  updatedAt: string
}

export type ProgramItem = {
  id: string
  title: string
  description: string
  icon: string
  imageUrl: string
  sortOrder: number
  visible: boolean
  status: Status
  updatedAt: string
}

export type FacilityItem = {
  id: string
  title: string
  description: string
  imageUrl: string
  capacity: string
  location: string
  features: string[]
  bookingAvailable: boolean
  status: Status
  updatedAt: string
}

export type EventItem = {
  id: string
  title: string
  type: "Workshop" | "Seminar" | "Competition" | "Showcase"
  date: string
  location: string
  description: string
  imageUrl: string
  featured: boolean
  published: boolean
  status: Status
  updatedAt: string
}

export type MediaItem = {
  id: string
  title: string
  category: "News" | "Article" | "Video" | "Press"
  metaDate: string
  description: string
  thumbnailUrl: string
  body: string
  url: string
  published: boolean
  status: Status
  updatedAt: string
}

export type FooterContent = {
  description: string
  email: string
  phone: string
  address: string
  socialLinks: { label: string; url: string }[]
  navLinks: { label: string; url: string }[]
  status: Status
  updatedAt: string
}

export const heroContent: HeroContent = {
  eyebrow: "Telkom AI Center of Excellence",
  title: "Accelerating responsible AI innovation across Indonesia",
  description:
    "A collaboration hub for AI talent development, enterprise pilots, applied research, and ecosystem programs.",
  primaryCtaLabel: "Explore Programs",
  primaryCtaLink: "/programs",
  secondaryCtaLabel: "Book Facility",
  secondaryCtaLink: "/facilities",
  backgroundImage:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
  highlights: ["AI Experience Lab", "Enterprise Sandbox", "Talent Academy"],
  status: "Published",
  updatedAt: "2026-05-18",
}

export const programs: ProgramItem[] = [
  {
    id: "prg-001",
    title: "AI Talent Accelerator",
    description: "Cohort-based learning for AI builders and product teams.",
    icon: "GraduationCap",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    sortOrder: 1,
    visible: true,
    status: "Published",
    updatedAt: "2026-05-17",
  },
  {
    id: "prg-002",
    title: "Enterprise AI Pilot Studio",
    description: "Structured discovery, prototype, and impact measurement.",
    icon: "RocketLaunch",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    sortOrder: 2,
    visible: true,
    status: "Published",
    updatedAt: "2026-05-12",
  },
  {
    id: "prg-003",
    title: "Responsible AI Clinic",
    description: "Governance reviews for policy, data, and model risk.",
    icon: "ShieldCheck",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    sortOrder: 3,
    visible: false,
    status: "Draft",
    updatedAt: "2026-05-09",
  },
]

export const facilities: FacilityItem[] = [
  {
    id: "fac-001",
    title: "AI Experience Lab",
    description: "Immersive demo space for executive showcases.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
    capacity: "40 pax",
    location: "Jakarta Digital Valley, 7F",
    features: ["Demo wall", "Hybrid meeting", "Prototype kiosks"],
    bookingAvailable: true,
    status: "Published",
    updatedAt: "2026-05-14",
  },
  {
    id: "fac-002",
    title: "Innovation Classroom",
    description: "Flexible room for workshops and certification sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    capacity: "64 pax",
    location: "Bandung AI Campus",
    features: ["Modular seating", "Recording kit", "Breakout pods"],
    bookingAvailable: true,
    status: "Published",
    updatedAt: "2026-05-11",
  },
]

export const events: EventItem[] = [
  {
    id: "evt-001",
    title: "AI Governance Roundtable",
    type: "Seminar",
    date: "2026-06-04",
    location: "Jakarta",
    description: "Policy and operating model discussion for enterprise AI.",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    published: true,
    status: "Scheduled",
    updatedAt: "2026-05-20",
  },
  {
    id: "evt-002",
    title: "Prompt Engineering Sprint",
    type: "Workshop",
    date: "2026-06-12",
    location: "Bandung",
    description: "Hands-on prompt and evaluation lab for business teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    published: true,
    status: "Published",
    updatedAt: "2026-05-16",
  },
]

export const media: MediaItem[] = [
  {
    id: "med-001",
    title: "Telkom AI CoE opens applied research program",
    category: "News",
    metaDate: "2026-05-18",
    description: "Program announcement for partners and universities.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    body: "The program connects research mentors, enterprise use cases, and shared infrastructure.",
    url: "https://example.com/news/ai-coe-research",
    published: true,
    status: "Published",
    updatedAt: "2026-05-18",
  },
  {
    id: "med-002",
    title: "Inside the AI Experience Lab",
    category: "Video",
    metaDate: "2026-05-10",
    description: "A walkthrough of demo zones and collaboration spaces.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    body: "A short video package prepared for landing page feature placement.",
    url: "https://example.com/videos/experience-lab",
    published: false,
    status: "Draft",
    updatedAt: "2026-05-10",
  },
]

export const footerContent: FooterContent = {
  description:
    "Telkom AI Center of Excellence brings together talent, facilities, and programs to accelerate trusted AI adoption.",
  email: "ai.coe@telkom.co.id",
  phone: "+62 21 8086 1234",
  address: "Telkom Landmark Tower, Jakarta, Indonesia",
  socialLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/company/telkom-indonesia" },
    { label: "Instagram", url: "https://instagram.com/telkomindonesia" },
  ],
  navLinks: [
    { label: "Programs", url: "/programs" },
    { label: "Facilities", url: "/facilities" },
    { label: "Events", url: "/events" },
    { label: "Media", url: "/media" },
  ],
  status: "Published",
  updatedAt: "2026-05-15",
}

export const landingSections = [
  { 
    title: "Hero", 
    status: heroContent.status, 
    updatedAt: heroContent.updatedAt, 
    href: "/content/hero", 
    editHref: "/content/hero", 
    previewLabel: "View Hero",
    description: "Main landing banner, primary CTA, and highlights.",
    meta: "1 main content"
  },
  { 
    title: "AI Center / Programs", 
    status: "Published" as Status, 
    updatedAt: "2026-05-17", 
    href: "/programs", 
    editHref: "/programs/section", 
    previewLabel: "View Programs",
    description: "Manage learning cohorts and enterprise studio tracks.",
    meta: `${programs.length} active programs`
  },
  { 
    title: "AI Connect / Facilities", 
    status: "Published" as Status, 
    updatedAt: "2026-05-14", 
    href: "/facilities", 
    editHref: "/facilities/section", 
    previewLabel: "View Facilities",
    description: "Showcase physical spaces, capacities, and booking info.",
    meta: `${facilities.length} available facilities`
  },
  { 
    title: "Events", 
    status: "Scheduled" as Status, 
    updatedAt: "2026-05-20", 
    href: "/events", 
    editHref: "/events/section", 
    previewLabel: "View Events",
    description: "Upcoming seminars, workshops, and ecosystem events.",
    meta: `${events.length} upcoming events`
  },
  { 
    title: "Media Library", 
    status: "Draft" as Status, 
    updatedAt: "2026-05-18", 
    href: "/media", 
    editHref: "/media/section", 
    previewLabel: "View Media",
    description: "Press releases, articles, and video features.",
    meta: `${media.length} media items`
  },
  { 
    title: "Footer / Contact", 
    status: footerContent.status, 
    updatedAt: footerContent.updatedAt, 
    href: "/footer", 
    editHref: "/footer", 
    previewLabel: "View Footer",
    description: "Global site footer, social links, and contact addresses.",
    meta: "Site-wide footer config"
  },
]

export const activity = [
  { item: "AI Governance Roundtable", area: "Events", action: "Published", user: "Dina P.", date: "2026-05-20" },
  { item: "Hero background", area: "Hero", action: "Updated draft", user: "Rafi A.", date: "2026-05-18" },
  { item: "AI Talent Accelerator", area: "Programs", action: "Edited", user: "Maya S.", date: "2026-05-17" },
  { item: "Experience Lab media", area: "Media", action: "Created", user: "Admin", date: "2026-05-10" },
]
