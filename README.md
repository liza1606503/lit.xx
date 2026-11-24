# Слово и эпоха

Образовательная платформа о литературном процессе 1940–1970-х годов:
посты-факты, подкасты, статьи и поп-ап выставки. После каждого материала —
микро-тест на 3 вопроса, баллы копятся в рейтинге активности.

Стек: Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui,
Prisma ORM (libSQL/Turso), NextAuth (email/пароль).

## Запуск локально

### 1. Установить зависимости

```bash
bun install
```

### 2. Переменные окружения

```bash
cp .env.example .env
```

Заполните `.env` (см. `.env.example`):

- `DATABASE_URL` — локально: абсолютный путь к SQLite-файлу
  (`file:/полный/путь/db/custom.db`); для продакшна — `libsql://<база>-<id>.turso.io`
  (см. раздел «Продакшн на Turso + Vercel»).
- `TURSO_AUTH_TOKEN` — токен доступа к Turso (только для `libsql://` URL).
- `NEXTAUTH_SECRET` — случайная строка для подписи JWT:
  ```bash
  openssl rand -base64 32
  ```
- `NEXTAUTH_URL` — базовый URL (локально `http://localhost:3000`).

### 3. Инициализировать базу данных

```bash
bun run db:generate   # сгенерировать Prisma-клиент
bun run db:push       # создать таблицы в локальном SQLite
```

> Для продакшн-базы на Turso используйте `bun run db:push:turso` (см. ниже).

### 4. Запустить дев-сервер

```bash
bun run dev
```

Откройте http://localhost:3000

## Продакшн на Turso + Vercel

База данных — на [Turso](https://turso.io) (libSQL), деплой — на Vercel. Prisma
подключается через driver-adapter `@prisma/adapter-libsql` (см. `src/lib/db.ts`),
что совместимо со serverless-окружением Vercel — бинарный query-engine не используется.

### 1. Создать базу на Turso

Через Turso CLI (или веб-интерфейс turso.io → New database):

```bash
turso group create default --location aws-eu-central-1
turso db create lit-xx --group default
turso db tokens create lit-xx     # → TURSO_AUTH_TOKEN
turso db show lit-xx --url        # → DATABASE_URL (libsql://...)
```

### 2. Применить схему к Turso

В `.env` укажите `DATABASE_URL` (`libsql://...`) и `TURSO_AUTH_TOKEN`, затем:

```bash
bun run db:push:turso
```

Скрипт `prisma/turso_apply_schema.mjs` генерирует DDL из `schema.prisma` через
`prisma migrate diff` и выполняет его через `@libsql/client` (идемпотентно, с
`IF NOT EXISTS`). Это необходимо, потому что `prisma db push` с `provider = "sqlite"`
в Prisma 6.x не принимает `libsql://`-URL: адаптер работает только в рантайме
приложения, а не в CLI.

### 3. Переменные окружения на Vercel

В настройках проекта на Vercel задайте:

- `DATABASE_URL` — `libsql://<база>-<id>.turso.io`
- `TURSO_AUTH_TOKEN` — токен доступа к базе
- `NEXTAUTH_SECRET` — `openssl rand -base64 32`
- `NEXTAUTH_URL` — адрес деплоя, например `https://lit-xx.vercel.app`

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
| `bun run db:push`         | применить схему к локальному SQLite |
| `bun run db:push:turso`   | применить схему к Turso (libSQL)    |
| `bun run db:generate`     | сгенерировать Prisma-клиент         |
