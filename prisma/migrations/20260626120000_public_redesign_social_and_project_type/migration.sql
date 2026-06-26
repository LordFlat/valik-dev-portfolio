-- Public redesign: add social/contact channels to SiteContent and projectType to ContactMessage.
-- All columns are nullable and additive — no data is dropped or rewritten.

-- AlterTable
ALTER TABLE "SiteContent" ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "whatsappUrl" TEXT;

-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "projectType" TEXT;
