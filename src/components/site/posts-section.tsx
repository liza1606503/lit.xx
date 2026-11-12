"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { posts } from "@/lib/content";
import { CalendarDays, ImageIcon, Volume2, ChevronRight } from "lucide-react";

const weekLabels: Record<number, string> = {
  1: "Неделя 1",
  2: "Неделя 2",
  3: "Неделя 3",
  4: "Неделя 4",
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });
}

export function PostsSection() {
  const weeks = useMemo(() => {
    const map = new Map<number, typeof posts>();
    for (const p of posts) {
      if (!map.has(p.week)) map.set(p.week, []);
      map.get(p.week)!.push(p);
    }
    return Array.from(map.entries()).sort((a, b) => a[0] - b[0]);
  }, []);

  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [openId, setOpenId] = useState<number | null>(null);

  const currentPosts = weeks.find(([w]) => w === activeWeek)?.[1] ?? [];

  return (
    <section id="context" className="scroll-mt-16 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Заголовок секции */}
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Badge variant="secondary" className="mb-3">
              Лента · 3–5 раз в неделю
            </Badge>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              В контексте
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Короткий пост-факт о писателе, произведении или событии.
              Архивные записи с чтением автором стихотворений — там, где
              они есть, по QR-коду на карточке.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              {posts.length} постов · 4 тематические недели
            </div>
          </div>
        </div>

        {/* Переключатель недель */}
        <div className="mb-8 flex flex-wrap gap-2">
          {weeks.map(([week, list]) => (
            <button
              key={week}
              onClick={() => {
                setActiveWeek(week);
                setOpenId(null);
              }}
              className={cn(
                "group rounded-lg border px-4 py-3 text-left transition-all",
                activeWeek === week
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <div className="text-xs uppercase tracking-wider opacity-80">
                {weekLabels[week]}
              </div>
              <div className="mt-1 text-sm font-medium leading-snug">
                {list[0]?.weekTheme}
              </div>
              <div
                className={cn(
                  "mt-1 text-xs",
                  activeWeek === week
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {list.length} постов
              </div>
            </button>
          ))}
        </div>

        {/* Список постов текущей недели */}
        <div className="grid gap-5 md:grid-cols-2">
          {currentPosts.map((post) => {
            const isOpen = openId === post.id;
            return (
              <Card
                key={post.id}
                className={cn(
                  "group flex flex-col transition-all",
                  isOpen
                    ? "border-primary shadow-md md:col-span-2"
                    : "hover:border-primary/40 hover:shadow-sm",
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">
                        №{String(post.id).padStart(2, "0")}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{formatDate(post.publishedDate)}</span>
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {post.author}
                    </Badge>
                  </div>
                  <h3 className="mt-2 font-display text-xl leading-snug text-foreground">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col gap-3">
                  <p
                    className={cn(
                      "text-sm leading-relaxed text-foreground/85",
                      !isOpen && "line-clamp-3",
                    )}
                  >
                    {isOpen ? post.content : post.excerpt}
                  </p>

                  {isOpen && (
                    <div className="mt-2 rounded-md bg-secondary/60 p-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                        <ImageIcon className="h-3.5 w-3.5" />
                        Визуальное сопровождение
                      </div>
                      <p className="text-sm text-secondary-foreground/90">
                        {post.visuals}
                      </p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <Volume2 className="h-3.5 w-3.5" />
                        Архивные аудио- и видеозаписи — по QR-коду на карточке.
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setOpenId(isOpen ? null : post.id)}
                      className="text-primary hover:bg-primary/10"
                    >
                      {isOpen ? "Свернуть" : "Читать полностью"}
                      <ChevronRight
                        className={cn(
                          "ml-1 h-4 w-4 transition-transform",
                          isOpen && "rotate-90",
                        )}
                      />
                    </Button>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {isOpen ? "Развёрнутый пост" : "Анонс"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
