// Смоук-тест рантайма приложения: PrismaClient + PrismaLibSQL-адаптер против Turso.
// Воспроизводит то, что делает src/lib/db.ts, и проверяет CRUD + отношение User↔TestResult.
// Запуск: bun scripts/turso_prisma_smoke.mjs
import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("DATABASE_URL/TURSO_AUTH_TOKEN не заданы");
  process.exit(1);
}

const adapter = new PrismaLibSQL({ url, authToken });
const prisma = new PrismaClient({ adapter, log: ["error", "warn"] });

const email = `prisma-smoke-${Date.now()}@test.local`;
try {
  const u = await prisma.user.create({
    data: { email, name: "Prisma Smoke", passwordHash: "$2a$placeholder", totalPoints: 12, testsPassed: 1 },
  });
  console.log("✓ user.create →", u.id, u.email, "cuid-длина", u.id.length);

  const got = await prisma.user.findUnique({ where: { email } });
  console.log("✓ user.findUnique →", got.name, "points=" + got.totalPoints, "tests=" + got.testsPassed);

  const tr = await prisma.testResult.create({
    data: { userId: u.id, contentType: "post", contentId: "post-001", contentTitle: "Тестовый пост", score: 2, totalQuestions: 3 },
  });
  console.log("✓ testResult.create →", tr.id);

  const withResults = await prisma.user.findUnique({ where: { email }, include: { testResults: true } });
  console.log("✓ user.include.testResults →", withResults.testResults.length, "запись(ей), score=" + withResults.testResults[0].score);

  await prisma.testResult.deleteMany({ where: { userId: u.id } });
  await prisma.user.delete({ where: { email } });
  const cnt = await prisma.user.count();
  console.log("✓ после очистки user.count =", cnt);
  console.log("\nPRISMA SMOKE OK — адаптер PrismaLibSQL + отношения работают с Turso.");
} catch (e) {
  console.error("PRISMA SMOKE FAIL:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
