// Применение prisma/schema.prisma к Turso (libSQL).
//
// Почему не `prisma db push`: в Prisma 6.x CLI с `provider = "sqlite"` требует,
// чтобы URL начинался с `file:`, и отвергает `libsql://` на этапе валидации схемы.
// Driver-adapter (`@prisma/adapter-libsql`) работает только в рантайме приложения,
// а не в CLI. Поэтому схему применяем так: генерируем DDL через `prisma migrate diff`
// (без подключения к БД) и выполняем его через `@libsql/client` напрямую в Turso.
//
// Идемпотентно: CREATE TABLE/INDEX переписываются в ...IF NOT EXISTS — безопасно
// запускать повторно. Внимание: НЕ применяет инкрементальные изменения (новые колонки
// к существующим таблицам) — для этого сгенерируйте diff вручную или правьте таблицы
// через `turso db shell`.
//
// Запуск: bun scripts/turso_apply_schema.mjs   (.env подгружается bun автоматически)
//         или: bun run db:push:turso
import { createClient } from "@libsql/client";
import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("DATABASE_URL и TURSO_AUTH_TOKEN должны быть заданы в .env");
  process.exit(1);
}
if (!url.startsWith("libsql://")) {
  console.error(`Ожидался libsql:// URL в DATABASE_URL, получено: ${url}\n(Для локального файла используйте bun run db:push)`);
  process.exit(1);
}

const projectRoot = new URL("..", import.meta.url).pathname;

// 1) Генерация DDL из schema.prisma. file:-URL нужен лишь для прохода валидации prisma;
//    `--from-empty --to-schema-datamodel` не подключается к БД.
console.log("→ Генерация DDL из prisma/schema.prisma…");
let sql;
try {
  sql = execSync(
    "bunx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script",
    {
      cwd: projectRoot,
      env: { ...process.env, DATABASE_URL: "file:./tmp_apply.db" },
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
} catch (e) {
  console.error("Не удалось сгенерировать DDL:", e.stderr?.toString() || e.message);
  process.exit(1);
}

// 2) Идемпотентность
const idempotent = sql
  .replace(/CREATE TABLE /g, "CREATE TABLE IF NOT EXISTS ")
  .replace(/CREATE UNIQUE INDEX /g, "CREATE UNIQUE INDEX IF NOT EXISTS ")
  .replace(/CREATE INDEX /g, "CREATE INDEX IF NOT EXISTS ");

const statements = idempotent
  .split(";")
  .map((s) =>
    s
      .split("\n")
      .filter((l) => !l.trim().startsWith("--"))
      .join("\n")
      .trim(),
  )
  .filter((s) => s.length > 0);

// 3) Выполнение против Turso
console.log(`→ Применение к ${url} (${statements.length} выражений)…`);
const client = createClient({ url, authToken });
let applied = 0;
for (const stmt of statements) {
  try {
    await client.execute(stmt);
    applied++;
  } catch (e) {
    console.error("Ошибка DDL:\n", stmt, "\n→", e.message);
    process.exit(1);
  }
}
console.log(`✓ Применено ${applied} DDL-выражений (IF NOT EXISTS — безопасно повторно).`);

// 4) Проверка
const tables = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
);
const indexes = await client.execute(
  "SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%' ORDER BY name",
);
console.log("✓ Таблицы:", tables.rows.map((r) => r.name).join(", "));
console.log("✓ Индексы:", indexes.rows.map((r) => r.name).join(", "));
console.log("\nГотово — база в Turso синхронизирована со schema.prisma.");
