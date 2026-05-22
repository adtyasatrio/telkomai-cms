export type Status = "Draft" | "Published" | "Scheduled" | "Hidden"

export type Highlight = {
  icon: string
  label: string
}

export type HeroContent = {
  eyebrow: string
  title: string
  description: string
  primaryCtaLabel: string
  primaryCtaLink: string
  secondaryCtaLabel: string
  secondaryCtaLink: string
  backgroundImage: string
  highlights: Highlight[]
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
  createdBy: string
  updatedAt: string
}

export type FacilityItem = {
  id: string
  title: string
  tab: string
  description: string
  imageUrl: string
  capacity: string
  location: string
  features: string[]
  bookingAvailable: boolean
  status: Status
  createdBy: string
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
  showBannerPopup: boolean
  bannerPopupId?: string
  bannerCtaLabel?: string
  bannerCtaUrl?: string
  bannerStartAt?: string
  bannerEndAt?: string
  bannerStatus?: "Draft" | "Published" | "Scheduled" | "Hidden"
  status: Status
  createdBy: string
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
  status: Status
  createdBy: string
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
  eyebrow: "AI Center of Excellence",
  title: "Pioneering the Future of AI Innovation",
  description:
    "As Artificial Intelligence becomes increasingly accessible and adopted worldwide, Telkom AI Center of Excellence stands at the forefront—driving rapid collaboration, research, and innovation to shape the future of digital transformation.",
  primaryCtaLabel: "Explore Programs",
  primaryCtaLink: "/programs",
  secondaryCtaLabel: "Book AI Connect",
  secondaryCtaLink: "/booking",
  backgroundImage:
    "/images/hero-bg3.png",
  highlights: [
    { icon: "UsersThree", label: "Collaboration Space" },
    { icon: "Desktop", label: "Workshop Area" },
    { icon: "GraduationCap", label: "Innovation Showcase" },
    { icon: "Buildings", label: "Meeting Rooms" },
  ],
  status: "Published",
  updatedAt: "2026-05-22",
}

export const programsHeader = {
  eyebrow: "AI Center of Excellence",
  title: "Telkom AI Center of Excellence Innovation Hub",
  description: "Telkom presents the AI Center of Excellence (AI CoE) as a strategic research and innovation center to design, test, and ensure AI technology is ready for real-world implementation.",
}

export const programs: ProgramItem[] = [
  {
    id: "prg-001",
    title: "Accelerating AI Programs & Innovation Campaigns",
    description: "Managing AI innovation programs, strategic initiatives, workshops, and collaborative campaigns to accelerate AI adoption across industries and communities.",
    icon: "RocketLaunch",
    imageUrl:
      "/images/innovation-1.jpg",
    sortOrder: 1,
    visible: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "prg-002",
    title: "AI Connect Collaborative Workspace & Facilities",
    description: "Providing collaborative AI spaces, facility reservations, innovation showcases, and integrated environments for meetings, experimentation, and learning activities.",
    icon: "Buildings",
    imageUrl:
      "/images/innovation-2.jpg",
    sortOrder: 2,
    visible: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "prg-003",
    title: "Media Publications & AI Knowledge Resources",
    description: "Delivering AI articles, webinars, publications and multimedia content to support education, awareness, and AI ecosystem development.",
    icon: "NewspaperClipping",
    imageUrl:
      "/images/innovation-3.jpg",
    sortOrder: 3,
    visible: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
]

export const facilitiesHeader = {
  eyebrow: "AI Connect Facilities",
  title: "Everything You Need to Innovate",
  description: "Modern and flexible facilities designed to support collaboration, innovation, workshops, community engagement, and AI-driven activities in a productive and inspiring environment.",
}

export const facilities: FacilityItem[] = [
  {
    id: "fac-001",
    title: "Smart Collaboration Space",
    tab: "Space",
    description: "Collaboration space for ideation, research, and cross-team work sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    capacity: "40 pax",
    location: "Telkom AI Connect Space",
    features: ["Whiteboards", "Flexible seating", "High-speed Wi-Fi"],
    bookingAvailable: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "fac-002",
    title: "Workshop & Event Area",
    tab: "Workshop",
    description: "Activity area for workshops, sharing sessions, and AI community events.",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    capacity: "100 pax",
    location: "Telkom AI Connect Space",
    features: ["Projector", "Sound system", "Modular seating"],
    bookingAvailable: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "fac-003",
    title: "Innovation Showcase",
    tab: "Showcase",
    description: "Innovation showcase and AI use case demos ready for stakeholder introductions.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    capacity: "50 pax",
    location: "Telkom AI Connect Space",
    features: ["Interactive displays", "Demo pods", "Lounge"],
    bookingAvailable: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "fac-004",
    title: "Meeting & Presentation Rooms",
    tab: "Meeting",
    description: "Meeting and presentation rooms for program reviews, solution pitching, and coordination.",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    capacity: "15 pax",
    location: "Telkom AI Connect Space",
    features: ["Video conferencing", "Whiteboards", "TV Screen"],
    bookingAvailable: true,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "fac-005",
    title: "Community Activities",
    tab: "Community",
    description: "Community activities to bring together talent, academia, industry, and the AI ecosystem.",
    imageUrl: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=80",
    capacity: "100 pax",
    location: "Telkom AI Connect Space",
    features: ["Open seating", "Cafeteria", "Lounge"],
    bookingAvailable: false,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
]

export const eventsHeader = {
  eyebrow: "Upcoming Events",
  title: "Meet, build, and test AI ideas with the ecosystem.",
  description: "",
}

export const events: EventItem[] = [
  {
    id: "evt-001",
    title: "AI Connect Future Lab",
    type: "Seminar",
    date: "2026-06-18",
    location: "Telkom AI Connect Space",
    description: "A collaboration session for campuses, industry, and communities to shape AI use cases ready for testing.",
    imageUrl:
      "/images/innovation-1.jpg",
    featured: true,
    showBannerPopup: true,
    bannerPopupId: "ai-connect-future-lab",
    bannerCtaLabel: "View Details",
    bannerCtaUrl: "/events/detail",
    bannerStartAt: "2026-06-01",
    bannerEndAt: "2026-06-18",
    bannerStatus: "Published",
    status: "Scheduled",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "evt-002",
    title: "Build with Generative AI",
    type: "Workshop",
    date: "2026-06-26",
    location: "Telkom AI Connect Space",
    description: "A hands-on lab exploring prompts, workflow automation, and AI-powered product prototyping.",
    imageUrl:
      "/images/innovation-2.jpg",
    featured: false,
    showBannerPopup: false,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "evt-003",
    title: "Predictive Maintenance Demo Day",
    type: "Showcase",
    date: "2026-07-04",
    location: "Innovation Showcase",
    description: "Industrial AI solution demos with discussions on business impact, data readiness, and implementation opportunities.",
    imageUrl: "/images/innovation-3.jpg",
    featured: false,
    showBannerPopup: false,
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
]

export const mediaHeader = {
  eyebrow: "Media & Publications",
  title: "AI knowledge, research signals, and practical resources.",
  description: "",
}

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
    status: "Published",
    createdBy: "Admin",
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
    status: "Published",
    createdBy: "Rafi A.",
    updatedAt: "2026-05-10",
  },
  {
    id: "med-003",
    title: "Enterprise AI Readiness Playbook",
    category: "Article",
    metaDate: "2026-05-22",
    description: "A concise framework for assessing data, process, and governance readiness before scaling enterprise AI.",
    thumbnailUrl: "/images/innovation-3.jpg",
    body: "Full playbook content goes here...",
    url: "https://example.com/resources/playbook",
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-22",
  },
  {
    id: "med-004",
    title: "From Use Case to Production",
    category: "Press",
    metaDate: "2026-05-20",
    description: "A practical discussion on use case validation, business impact measurement, and AI solution deployment.",
    thumbnailUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    body: "Webinar recording details...",
    url: "https://example.com/webinars/use-case",
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-20",
  },
  {
    id: "med-005",
    title: "AI CoE Innovation Showcase",
    category: "Video",
    metaDate: "2026-05-15",
    description: "Short-form videos featuring experiments, solution demos, and collaboration stories from the AI CoE ecosystem.",
    thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    body: "Video playlist...",
    url: "https://example.com/videos/innovation-showcase",
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-15",
  },
  {
    id: "med-006",
    title: "AI Governance Starter Kit",
    category: "Article",
    metaDate: "2026-05-12",
    description: "Templates and checklists to help teams define safe, responsible, and operational AI practices.",
    thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    body: "Starter kit details...",
    url: "https://example.com/resources/starter-kit",
    status: "Published",
    createdBy: "Admin",
    updatedAt: "2026-05-12",
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
    { label: "Facebook", url: "https://facebook.com/telkomindonesia" },
    { label: "X", url: "https://x.com/telkomindonesia" },
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
    editHref: "/programs", 
    previewLabel: "View Programs",
    description: "Manage learning cohorts and enterprise studio tracks.",
    meta: `${programs.length} active programs`
  },
  { 
    title: "AI Connect / Facilities", 
    status: "Published" as Status, 
    updatedAt: "2026-05-14", 
    href: "/facilities", 
    editHref: "/facilities", 
    previewLabel: "View Facilities",
    description: "Showcase physical spaces, capacities, and booking info.",
    meta: `${facilities.length} available facilities`
  },
  { 
    title: "Events", 
    status: "Scheduled" as Status, 
    updatedAt: "2026-05-20", 
    href: "/events", 
    editHref: "/events", 
    previewLabel: "View Events",
    description: "Upcoming seminars, workshops, and ecosystem events.",
    meta: `${events.length} upcoming events`
  },
  { 
    title: "Media Library", 
    status: "Draft" as Status, 
    updatedAt: "2026-05-18", 
    href: "/media", 
    editHref: "/media", 
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
