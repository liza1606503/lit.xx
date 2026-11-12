"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { podcasts } from "@/lib/content";
import {
  Headphones,
  PlayCircle,
  Clock,
  Film,
  BookOpenText,
  MessageSquareQuote,
  Users,
} from "lucide-react";

function formatPodcastDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function weekday(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", { weekday: "long" });
}

export function PodcastsSection() {
  return (
    <section
      id="text"
      className="scroll-mt-16 border-b border-border/60 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Заголовок секции */}
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Badge variant="secondary" className="mb-3">
              Подкаст · 1 раз в неделю · 7–12 минут
            </Badge>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              В тексте
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Короткий подкаст с анализом одного произведения или темы.
              Каждый выпуск — пара «текст и его экранизация», разговор о
              том, что меняется при переносе слова на экран.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Headphones className="h-4 w-4" />
              {podcasts.length} выпусков · с 14 ноября по 19 декабря
            </div>
          </div>
        </div>

        {/* Лента подкастов */}
        <div className="grid gap-5 lg:grid-cols-2">
          {podcasts.map((ep) => (
            <Card
              key={ep.number}
              className="group flex flex-col overflow-hidden transition-all hover:border-primary/40 hover:shadow-md"
            >
              {/* Плашка с номером и датой */}
              <div className="flex items-center justify-between border-b border-border/60 bg-primary/5 px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary font-display text-sm text-primary-foreground">
                    {String(ep.number).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">
                      Выпуск {ep.number}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {formatPodcastDate(ep.date)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {ep.duration}
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {weekday(ep.date)}
                </div>
                <h3 className="font-display text-xl leading-snug text-foreground">
                  {ep.title}
                </h3>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                {/* Что смотрим и читаем */}
                <div className="grid gap-2">
                  <div className="flex items-start gap-2 text-sm">
                    <BookOpenText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/85">{ep.work}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Film className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-foreground/85">{ep.film}</span>
                  </div>
                </div>

                {/* Анализ */}
                <div className="rounded-md bg-secondary/60 p-3">
                  <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                    <PlayCircle className="h-3.5 w-3.5" />
                    О чём разговор
                  </div>
                  <p className="text-sm leading-relaxed text-secondary-foreground/90">
                    {ep.analysis}
                  </p>
                </div>

                {/* Дискуссия */}
                <div className="flex items-start gap-2 text-sm">
                  <MessageSquareQuote className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Дискуссия
                    </div>
                    <p className="mt-0.5 text-foreground/80">{ep.discussion}</p>
                  </div>
                </div>

                {/* Метаданные */}
                <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {ep.authors}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className={cn(
                      "text-xs",
                      "opacity-70",
                    )}
                  >
                    <PlayCircle className="mr-1.5 h-4 w-4" />
                    Скоро
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Подсказка */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Все выпуски выходят по субботам. После публикации под каждым
          подкастом появляется плеер и расшифровка.
        </p>
      </div>
    </section>
  );
}
