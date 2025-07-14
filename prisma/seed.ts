import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  console.log("Seeding database...");
  
  // Add any initial data here (activities, achievements, etc.)
  // Users will be created automatically through NextAuth OAuth
  
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
