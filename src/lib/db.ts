import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Подключение через libSQL driver adapter (работает и с локальным файлом, и с Turso).
// - Локальная разработка: DATABASE_URL="file:./db/custom.db" (authToken не нужен).
// - Продакшн (Turso): DATABASE_URL="libsql://<база>.turso.io", TURSO_AUTH_TOKEN="<токен>".
// Через adapter Prisma не использует бинарный query-engine — подходит для serverless (Vercel).
function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url || url === "undefined") {
    throw new Error(
      "DATABASE_URL не задана. Скопируйте .env.example в .env и заполните значение.",
    );
  }
  const authToken = process.env.TURSO_AUTH_TOKEN; // undefined для локального файла — допустимо
  // PrismaLibSQL принимает config { url, authToken } и сам создаёт libsql-клиент внутри.
  const adapter = new PrismaLibSQL({ url, authToken });
  return new PrismaClient({ adapter, log: ["error", "warn"] });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
