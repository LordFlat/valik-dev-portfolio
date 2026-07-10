import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * One-off maintenance script: set the public contact email + phone on the
 * SiteContent singleton without touching any other field. Run with:
 *   npx tsx scripts/set-contact.ts
 */
const contact = {
  contactEmail: "contact@valentyn.studio",
  phone: "+44 7836 633485",
};

async function main() {
  const existing = await prisma.siteContent.findFirst();
  if (existing) {
    await prisma.siteContent.update({ where: { id: existing.id }, data: contact });
    console.log("✅ Updated contact info on existing SiteContent row.");
  } else {
    await prisma.siteContent.create({ data: contact });
    console.log("✅ Created SiteContent row with contact info.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
