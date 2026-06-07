import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const siteContent = {
  siteName: "WorkFlow.dev",
  logoText: "WorkFlow.dev",
  heroBadge: "BUILD • AUTOMATE • SCALE",
  heroTitle: "Automation that makes work easier",
  heroSubtitle:
    "I build Python automation, analytics, and AI-powered tools that solve real workflow problems.",
  primaryButtonText: "View Work",
  secondaryButtonText: "Contact Me",
  aboutTitle: "Practical tools for real workflows.",
  aboutText:
    "I'm Valentyn Varych, a beginner developer focused on Python, automation, analytics, and AI-powered tools. My background in real operational work helps me notice messy processes and turn them into simple digital systems.",
  contactEmail: "",
  githubUrl: "",
  linkedinUrl: "",
  telegramUrl: "",
  seoTitle: "WorkFlow.dev — Python Automation Portfolio",
  seoDescription:
    "Portfolio of Python automation, analytics, and AI workflow projects by Valentyn Varych.",
};

const projects = [
  {
    title: "Market Risk Oracle",
    slug: "market-risk-oracle",
    shortDescription: "Crypto signals made readable.",
    fullDescription:
      "A crypto analytics tool that collects market analysis results, generates chart summaries, tracks watchlists, and reviews how signals performed over time.",
    category: "Analytics",
    tags: ["Python", "Charts", "Signals"],
    techStack: ["Python", "SQLite", "Technical Analysis", "Telegram Bot"],
    features: ["Signal tracking", "Watchlist", "Chart generation", "Outcome stats"],
    problem: "Manual market analysis is repetitive and difficult to review later.",
    solution:
      "A tool that generates chart summaries, stores signals, tracks watchlists, and reviews outcomes.",
    impact:
      "Faster market review and better structure for improving signal logic over time.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    title: "Warehouse Pallet Tracker",
    slug: "warehouse-pallet-tracker",
    shortDescription: "Track. Move. Organize.",
    fullDescription:
      "A workflow tool for tracking pallets across zones and locations, recording every movement, and keeping warehouse stock operations clear.",
    category: "Internal Tools",
    tags: ["FastAPI", "SQL", "Workflow"],
    techStack: ["FastAPI", "SQLAlchemy", "SQLite", "PostgreSQL", "Jinja2"],
    features: ["Pallet tracking", "Location management", "Move history", "Stock operations"],
    problem:
      "Warehouse stock movement can become messy when locations and updates are tracked manually.",
    solution:
      "A workflow tool for tracking pallets, zones, locations, and movement history.",
    impact: "Less searching, fewer errors, and clearer warehouse operations.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    title: "AI Office Bot",
    slug: "ai-office-bot",
    shortDescription: "Capture ideas. Automate tasks.",
    fullDescription:
      "A Telegram assistant that saves notes, ideas, tasks, and research requests into a structured markdown workspace so nothing gets lost.",
    category: "AI Tools",
    tags: ["Telegram", "AI", "Automation"],
    techStack: ["Python", "Telegram Bot API", "Markdown", "AI API Integration"],
    features: ["Notes capture", "Task capture", "Research requests", "Markdown workspace"],
    problem:
      "Ideas, tasks, and research notes get lost when they are not captured quickly.",
    solution:
      "A Telegram assistant that saves notes, ideas, tasks, and research into a structured workspace.",
    impact: "Faster capture and better personal workflow organization.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    title: "Job Sheets Automation",
    slug: "job-sheets-automation",
    shortDescription: "From job to done. Faster.",
    fullDescription:
      "Automation scripts that generate structured job sheets from templates while handling business rules and edge cases, backed by regression tests.",
    category: "Automation",
    tags: ["Python", "Excel", "Templates"],
    techStack: ["Python", "OpenPyXL", "Templates", "Testing"],
    features: ["Template processing", "Job sheet generation", "Business rules", "Regression tests"],
    problem:
      "Creating job sheets manually is repetitive and prone to formatting issues.",
    solution:
      "Automation scripts generate structured job sheets from templates while handling business rules and edge cases.",
    impact: "Faster document creation and fewer manual mistakes.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    title: "Signal Chart Generator",
    slug: "signal-chart-generator",
    shortDescription: "Charts for cleaner market signals.",
    fullDescription:
      "A chart module that turns raw market data into compact visual summaries for signals and indicators, making market conditions easier to read.",
    category: "Data Visualization",
    tags: ["Python", "Data Viz", "Charts"],
    techStack: ["Python", "Pandas", "Matplotlib", "Technical Analysis"],
    features: ["Chart generation", "Indicator labels", "Risk score visuals", "Compact signal cards"],
    problem: "Market data is harder to understand when it is only shown as raw numbers.",
    solution:
      "A chart module creates compact visual summaries for signals and indicators.",
    impact: "Faster visual review and cleaner communication of market conditions.",
    coverImage: "",
    galleryImages: [],
    githubUrl: "",
    liveDemoUrl: "",
    featured: true,
    published: true,
    sortOrder: 5,
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
