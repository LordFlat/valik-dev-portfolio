import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const siteContent = {
  siteName: "Valentyn.dev",
  logoText: "Valentyn.dev",
  heroBadge: "Websites · Landing Pages · Simple Tools",
  heroTitle: "Beautiful websites for businesses that want to be chosen.",
  heroSubtitle:
    "I help local businesses, creators, and small teams turn a basic online presence into a clean, premium website that builds trust and brings more enquiries.",
  primaryButtonText: "View Work",
  secondaryButtonText: "Start a Project",
  aboutTitle: "Clear websites and simple tools for real business problems.",
  aboutText:
    "I'm Valentyn, based in the UK. I build clean landing pages, websites, and practical digital tools for small businesses and real workflows. My background in operations helps me understand messy processes and turn them into clearer digital experiences.",
  contactEmail: "",
  githubUrl: "",
  linkedinUrl: "",
  telegramUrl: "",
  instagramUrl: "",
  facebookUrl: "",
  whatsappUrl: "",
  seoTitle: "Valentyn.dev — Websites, Landing Pages and Digital Tools",
  seoDescription:
    "Premium websites, landing pages, and simple automation tools for small businesses, creators, and practical workflows.",
};

const projects = [
  {
    title: "Local Business Landing Page",
    slug: "local-business-landing-page",
    shortDescription:
      "A clean landing page designed to make a small business look more trustworthy and easier to contact.",
    fullDescription:
      "A premium one-page website concept for a local service business — built to communicate the offer clearly, build trust, and turn visitors into enquiries.",
    category: "Landing Page",
    tags: ["Landing Page", "Local Business", "Conversion"],
    techStack: ["Next.js", "Tailwind CSS", "Responsive design"],
    features: [
      "Clear hero and offer",
      "Trust-building sections",
      "Strong call to action",
      "Mobile-first layout",
    ],
    problem:
      "Many small businesses have an unclear online presence that doesn't explain what they offer or how to get in touch.",
    solution:
      "A focused single-page layout that leads visitors from the offer to a clear call to action.",
    impact: "A more professional first impression and an easier path to enquiries.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    title: "Restaurant / Café Website Concept",
    slug: "restaurant-cafe-website",
    shortDescription:
      "A visual website concept focused on menu, atmosphere, booking, and mobile-first browsing.",
    fullDescription:
      "A website concept for a café or restaurant that puts atmosphere, the menu, and booking front and centre, designed mobile-first for how people actually browse.",
    category: "Website",
    tags: ["Website", "Hospitality", "Mobile-first"],
    techStack: ["Next.js", "Tailwind CSS", "Image optimization"],
    features: [
      "Atmosphere-led hero",
      "Readable menu layout",
      "Booking / contact prompts",
      "Fast mobile experience",
    ],
    problem:
      "Hospitality sites are often cluttered and hard to use on a phone, where most customers look.",
    solution:
      "A calm, image-led layout that highlights the menu and makes booking or contact obvious.",
    impact: "A more inviting online presence that reflects the real experience.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    title: "Valentyn.dev Portfolio CMS",
    slug: "valentyn-portfolio-cms",
    shortDescription:
      "A live, editable portfolio with an admin panel, image uploads, project pages, and contact messages.",
    fullDescription:
      "This very site — a premium portfolio with a lightweight CMS so every project, page, and contact message can be managed without touching code.",
    category: "Website",
    tags: ["Website", "CMS", "Admin"],
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Cloudinary", "Vercel"],
    features: [
      "Editable site content",
      "Project CRUD with images",
      "Secure admin panel",
      "Contact message inbox",
    ],
    problem:
      "A portfolio needs to stay current, but editing code for every change is slow and risky.",
    solution:
      "A protected admin panel that manages projects, content, images, and messages from the browser.",
    impact: "Content can be updated anytime without a developer or a redeploy.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    title: "FlowStock Workflow Prototype",
    slug: "flowstock-workflow-prototype",
    shortDescription:
      "A simple workflow prototype for daily material operations, confirmations, issues, and returns.",
    fullDescription:
      "An internal-tool prototype that turns a messy manual material process into a clear daily workflow with confirmations, issue tracking, and returns.",
    category: "Internal Tool",
    tags: ["Internal Tool", "Workflow", "Operations"],
    techStack: ["FastAPI", "SQLAlchemy", "PostgreSQL"],
    features: [
      "Daily operations view",
      "Confirmations & issues",
      "Returns handling",
      "Clear movement history",
    ],
    problem:
      "Daily material operations were tracked manually, making confirmations and returns easy to lose.",
    solution:
      "A lightweight workflow tool that records each step clearly and keeps a simple history.",
    impact: "Less searching, fewer mistakes, and clearer day-to-day operations.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    title: "AI Office Bot",
    slug: "ai-office-bot",
    shortDescription:
      "A Telegram assistant for capturing notes, tasks, ideas, and research into a structured workspace.",
    fullDescription:
      "A simple automation that captures notes, tasks, ideas, and research requests from Telegram into a structured markdown workspace so nothing gets lost.",
    category: "Automation",
    tags: ["Automation", "Telegram", "Productivity"],
    techStack: ["Python", "Telegram Bot API", "Markdown"],
    features: [
      "Quick note capture",
      "Task capture",
      "Research requests",
      "Structured workspace",
    ],
    problem: "Ideas, tasks, and notes get lost when they aren't captured quickly.",
    solution:
      "A Telegram assistant that saves everything into a structured, searchable workspace.",
    impact: "Faster capture and better day-to-day organization.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 5,
  },
  {
    title: "Market Risk Oracle",
    slug: "market-risk-oracle",
    shortDescription:
      "A personal analytics experiment for chart-based crypto signal tracking and outcome review.",
    fullDescription:
      "A personal experiment that collects chart-based signals, tracks a watchlist, and reviews how signals performed over time.",
    category: "Experiment",
    tags: ["Experiment", "Analytics", "Charts"],
    techStack: ["Python", "SQLite", "Charts"],
    features: ["Signal tracking", "Watchlist", "Chart summaries", "Outcome review"],
    problem: "Manual market analysis is repetitive and hard to review later.",
    solution: "A small tool that stores signals and reviews their outcomes over time.",
    impact: "Faster review and a clearer way to improve the logic.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: false,
    published: true,
    sortOrder: 6,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Site content is a singleton — keep exactly one row.
  const existing = await prisma.siteContent.findFirst();
  if (existing) {
    await prisma.siteContent.update({ where: { id: existing.id }, data: siteContent });
  } else {
    await prisma.siteContent.create({ data: siteContent });
  }
  console.log("✅ Site content seeded.");

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ ${projects.length} projects seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
