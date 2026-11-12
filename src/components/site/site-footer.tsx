"use client";

import type { SectionId } from "./site-header";

export function SiteFooter({
  onNavigate,
}: {
  onNavigate: (id: SectionId) => void;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Левая колонка — название и описание */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-foreground">
                С
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base text-foreground">
                  Слово и эпоха
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  1940–1970-е
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Образовательная платформа о литературном процессе
              1940–1970-х годов. Посты, подкасты, статьи и поп-ап
              выставки — одна эпоха, несколько голосов.
            </p>
          </div>

          {/* Средняя колонка — разделы */}
          <div className="md:col-span-4">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Разделы
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(
                [
                  ["context", "В контексте"],
                  ["text", "В тексте"],
                  ["telegraph", "В телеграфе"],
                  ["exhibitions", "Выставки"],
                  ["quiz", "Квиз"],
                  ["about", "О проекте"],
                ] as Array<[SectionId, string]>
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  className="text-left text-muted-foreground transition-colors hover:text-primary"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Правая колонка — сроки */}
          <div className="md:col-span-3">
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Сроки проекта
            </div>
            <div className="text-sm text-foreground/80">
              ноябрь — декабрь 2026
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              5–8 единиц контента в неделю
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} Проект «Слово и эпоха». Образовательная платформа о
            литературе 1940–1970-х.
          </span>
          <span>Сделано для тех, кто читает внимательно.</span>
        </div>
      </div>
    </footer>
  );
}
