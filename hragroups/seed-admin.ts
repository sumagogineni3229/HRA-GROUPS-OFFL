import { prisma } from "./lib/prisma";

async function main() {
  const email = "Admin@Hragroups.com";
  const password = "Hragroups@7890@Admin";

  const admin = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: {
      password: password,
      role: "ADMIN",
      name: "Master Administrator",
    },
    create: {
      email: email.toLowerCase(),
      password: password,
      name: "Master Administrator",
      role: "ADMIN",
    },
  });

  console.log("Admin account successfully seeded in Supabase database:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
