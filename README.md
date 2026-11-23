# Слово и эпоха

Образовательная платформа о литературном процессе 1940–1970-х годов:
посты-факты, подкасты, статьи и поп-ап выставки. После каждого материала —
микро-тест на 3 вопроса, баллы копятся в рейтинге активности.

Стек: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui,
Prisma ORM (SQLite), NextAuth (email/пароль).

## Запуск локально

### 1. Установить зависимости

```bash
bun install
```

### 2. Переменные окружения

```bash
cp .env.example .env
```

Заполните `.env`:

- `DATABASE_URL` — путь к SQLite-файлу (по умолчанию `file:./db/custom.db`).
- `NEXTAUTH_SECRET` — случайная строка для подписи JWT:
  ```bash
  openssl rand -base64 32
  ```
- `NEXTAUTH_URL` — базовый URL (локально `http://localhost:3000`).

### 3. Инициализировать базу данных

```bash
bun run db:generate   # сгенерировать Prisma-клиент
bun run db:push       # создать таблицы в SQLite
```

### 4. Запустить дев-сервер

```bash
bun run dev
```

Откройте http://localhost:3000

## Сборка

```bash
bun run build
bun run start
```

## Структура

```
src/
  app/            — страницы (главная, разделы, лента, демо, рейтинг, профиль, auth)
  components/     — UI-компоненты и блоки сайта
  lib/            — Prisma-клиент, auth, данные разделов, утилиты
prisma/
  schema.prisma   — схема БД (User, TestResult)
public/           — статика (logo, robots)
```

## Скрипты

| Команда         | Назначение                          |
| --------------- | ----------------------------------- |
| `bun run dev`   | дев-сервер на :3000                 |
| `bun run build` | production-сборка (standalone)      |
| `bun run start` | запуск production-сервера           |
| `bun run lint`  | ESLint                              |
| `bun run db:push`     | применить схему к БД          |
| `bun run db:generate` | regenerate Prisma-клиент      |
