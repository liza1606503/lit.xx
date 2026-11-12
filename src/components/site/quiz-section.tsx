"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Trophy,
  ListChecks,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { SectionId } from "./site-header";

export function QuizSection({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <section
      id="quiz"
      className="scroll-mt-16 border-b border-border/60"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-10 text-center">
          <Badge variant="secondary" className="mb-3">
            Итог месяца · квиз по всему материалу
          </Badge>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">
            Квиз
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-muted-foreground">
            В конце каждого месяца — квиз по выложенному материалу:
            постам, подкастам, статьям и выставкам. Разбор и результаты —
            отдельным постом.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="grid gap-0 p-0 md:grid-cols-2">
            {/* Левая плашка — превью */}
            <div className="relative flex flex-col justify-between bg-primary p-8 text-primary-foreground md:p-10">
              <div className="pointer-events-none absolute -right-4 -top-4 select-none font-display text-[140px] leading-none opacity-10">
                ?
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-primary-foreground/80">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Готовится к запуску
                </div>
                <h3 className="font-display text-3xl leading-tight md:text-4xl">
                  Что вы запомнили из слова и эпохи
                </h3>
                <p className="mt-3 text-sm text-primary-foreground/85">
                  Короткий итоговый тест по материалам проекта: 20–25
                  вопросов на пять–восемь минут. Никаких баллов за
                  скорость — только за внимание к текстам.
                </p>
              </div>

              <div className="relative mt-8 flex flex-wrap gap-2">
                <span className="rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs">
                  Окопная проза
                </span>
                <span className="rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs">
                  Эстрадная лирика
                </span>
                <span className="rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs">
                  Тихая лирика
                </span>
                <span className="rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs">
                  Авторская песня
                </span>
                <span className="rounded-md bg-primary-foreground/15 px-3 py-1.5 text-xs">
                  Андеграунд
                </span>
              </div>
            </div>

            {/* Правая плашка — что внутри */}
            <div className="flex flex-col gap-6 p-8 md:p-10">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <ListChecks className="h-3.5 w-3.5" />
                  Что внутри квиза
                </div>
                <ul className="space-y-3">
                  {[
                    {
                      title: "Узнавание авторов и произведений",
                      text: "Кто написал, кто снял, в каком году вышло.",
                    },
                    {
                      title: "Контекст и связи",
                      text: "Что общего у окопной прозы и тихой лирики, чем эстрадная поэзия отличается от авторской песни.",
                    },
                    {
                      title: "Анализ фрагмента",
                      text: "Несколько вопросов по конкретным строкам и сценам из подкастов.",
                    },
                    {
                      title: "Архивные материалы",
                      text: "Узнать запись по описанию, обложку книги по фрагменту.",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs text-primary">
                        {i + 1}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-foreground">
                          {item.title}
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {item.text}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto rounded-md bg-secondary/60 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                  <Trophy className="h-3.5 w-3.5" />
                  Награда
                </div>
                <p className="text-sm text-secondary-foreground/90">
                  Лучшие результаты попадут в пост-отчёт и получат
                  рекомендательный список для дальнейшего чтения.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button disabled className="flex-1">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Квиз скоро откроется
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("context")}
                >
                  Повторить материал
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
