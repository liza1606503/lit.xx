"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, CalendarRange, Headphones, Newspaper } from "lucide-react";
import { projectInfo } from "@/lib/content";
import type { SectionId } from "./site-header";

export function Hero({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <section
      id="hero"
      className="paper-texture relative overflow-hidden border-b border-border/60"
    >
      {/* Декоративные элементы эпохи — крупная дата-плашка */}
      <div className="pointer-events-none absolute -right-8 top-8 select-none font-display text-[180px] leading-none text-primary/[0.04] md:text-[280px]">
        1940
        <br />
        70
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          {/* Левая колонка — заголовок */}
          <div className="md:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                Образовательная платформа
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarRange className="h-3.5 w-3.5" />
                {projectInfo.duration}
              </span>
            </div>

            <h1 className="font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
              Слово
              <br />
              <span className="text-primary">и эпоха</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {projectInfo.subtitle}. Окопная проза и блокадная поэзия,
              эстрадная и тихая лирика, авторская песня и андеграунд —
              тридцать лет советской литературы в одном проекте.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("context")} size="lg">
                Начать читать
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => onNavigate("about")}
                size="lg"
                variant="outline"
              >
                О проекте
              </Button>
            </div>
          </div>

          {/* Правая колонка — три формата */}
          <div className="md:col-span-5">
            <div className="grid gap-4">
              {projectInfo.formats.map((format) => {
                const Icon =
                  format.tab === "В тексте"
                    ? Headphones
                    : format.tab === "В телеграфе"
                      ? Newspaper
                      : ArrowDown;
                return (
                  <button
                    key={format.tab}
                    onClick={() =>
                      onNavigate(
                        format.tab === "В контексте"
                          ? "context"
                          : format.tab === "В тексте"
                            ? "text"
                            : "telegraph",
                      )
                    }
                    className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 text-left transition-all hover:border-primary hover:shadow-md"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg text-foreground">
                          {format.tab}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          {format.cadence}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {format.description}
                      </p>
                    </div>
                  </button>
                );
              })}

              <div className="mt-2 rounded-lg bg-secondary/60 p-4 text-sm text-secondary-foreground">
                <span className="font-medium">В конце месяца —</span>{" "}
                <button
                  onClick={() => onNavigate("quiz")}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  квиз по всему материалу
                </button>
                . И параллельно проходят{" "}
                <button
                  onClick={() => onNavigate("exhibitions")}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  поп-ап выставки
                </button>{" "}
                в Ярославле и Рыбинске.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
