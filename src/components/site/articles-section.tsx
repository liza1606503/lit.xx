"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles } from "@/lib/content";
import { Newspaper, Users, ChevronRight } from "lucide-react";

function formatArticleDate(iso: string): string {
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

export function ArticlesSection() {
  return (
    <section id="telegraph" className="scroll-mt-16 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Заголовок секции */}
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Badge variant="secondary" className="mb-3">
              Статья · 1 раз в неделю
            </Badge>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              В телеграфе
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Развёрнутая статья по ключевому тексту или автору —
              продолжение разговора, начатого в постах и подкастах.
              Короткий телеграфный формат: тезисы, цитаты, факты.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Newspaper className="h-4 w-4" />
              {articles.length} статьи · по воскресеньям
            </div>
          </div>
        </div>

        {/* Список статей */}
        <div className="grid gap-5">
          {articles.map((article) => (
            <Card
              key={article.number}
              className="group transition-all hover:border-primary/40 hover:shadow-md"
            >
              <CardContent className="grid gap-6 p-6 md:grid-cols-12 md:p-8">
                {/* Левая колонка — дата и номер */}
                <div className="md:col-span-3">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Статья {String(article.number).padStart(2, "0")}
                    </div>
                    <div className="font-display text-2xl text-primary">
                      {formatArticleDate(article.date)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {weekday(article.date)}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {article.author}
                    </div>
                  </div>
                </div>

                {/* Средняя колонка — заголовок и анонс */}
                <div className="md:col-span-6">
                  <h3 className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-foreground/80">
                    {article.excerpt}
                  </p>
                </div>

                {/* Правая колонка — темы тезисами */}
                <div className="md:col-span-3">
                  <div className="rounded-md bg-secondary/60 p-4">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                      О чём статья
                    </div>
                    <ul className="space-y-1.5">
                      {article.themes.map((theme, i) => (
                        <li
                          key={i}
                          className="flex gap-1.5 text-xs leading-snug text-secondary-foreground/90"
                        >
                          <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                          <span>{theme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    className="mt-3 w-full text-xs opacity-70"
                  >
                    Скоро на сайте
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
