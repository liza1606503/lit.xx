"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { exhibitions } from "@/lib/content";
import {
  MapPin,
  CalendarDays,
  Users,
  LayoutGrid,
  ImageIcon,
  Mic,
  ListOrdered,
  ChevronRight,
} from "lucide-react";

export function ExhibitionsSection() {
  const [activeId, setActiveId] = useState<string>(exhibitions[0].id);
  const active = exhibitions.find((e) => e.id === activeId) ?? exhibitions[0];

  return (
    <section
      id="exhibitions"
      className="scroll-mt-16 border-b border-border/60 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Заголовок секции */}
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Badge variant="secondary" className="mb-3">
              Поп-ап выставки · лекция 20–30 минут
            </Badge>
            <h2 className="font-display text-4xl text-foreground md:text-5xl">
              Выставки
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Две передвижные выставки с короткой лекцией у стендов — для
              студентов-филологов, активистов вуза, студентов колледжа
              культуры и школьников. После каждой — пост-отчёт с
              фотографиями на сайте.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Ярославль · Рыбинск · ноябрь–декабрь
            </div>
          </div>
        </div>

        {/* Переключатель выставок */}
        <div className="mb-8 grid gap-3 md:grid-cols-2">
          {exhibitions.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveId(ex.id)}
              className={cn(
                "rounded-lg border p-5 text-left transition-all",
                activeId === ex.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-xs uppercase tracking-wider",
                    activeId === ex.id
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground",
                  )}
                >
                  {ex.status === "upcoming"
                    ? "Скоро"
                    : "В разработке"}
                </span>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    activeId === ex.id && "rotate-90",
                  )}
                />
              </div>
              <h3 className="mt-2 font-display text-xl leading-snug">
                {ex.title}
              </h3>
              <p
                className={cn(
                  "mt-1 text-sm",
                  activeId === ex.id
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {ex.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Карточка активной выставки */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Левая часть — концепция и формат */}
          <div className="lg:col-span-5">
            <Card className="h-full">
              <CardContent className="flex flex-col gap-6 p-6 md:p-8">
                <div>
                  <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Концепция
                  </div>
                  <p className="text-base leading-relaxed text-foreground/85">
                    {active.concept}
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <ImageIcon className="h-3.5 w-3.5" />
                    Визуальный ряд
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {active.visualRow}
                  </p>
                </div>

                <div className="rounded-md bg-secondary/60 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-secondary-foreground">
                    <LayoutGrid className="h-3.5 w-3.5" />
                    Формат
                  </div>
                  <p className="text-sm leading-relaxed text-secondary-foreground/90">
                    {active.format}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                  <ListOrdered className="h-3.5 w-3.5" />
                  {active.navigation}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Правая часть — расписание и листы */}
          <div className="lg:col-span-7">
            <div className="grid gap-6">
              {/* Расписание мероприятий */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Расписание
                  </div>
                  <div className="grid gap-3">
                    {active.events.map((ev, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-1 gap-2 rounded-md border border-border/60 p-4 sm:grid-cols-12 sm:items-center"
                      >
                        <div className="sm:col-span-3">
                          <div className="font-display text-base text-primary">
                            {ev.date}
                          </div>
                        </div>
                        <div className="sm:col-span-6">
                          <div className="text-sm font-medium text-foreground">
                            {ev.place}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {ev.city}
                          </div>
                        </div>
                        <div className="sm:col-span-3 sm:text-right">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground sm:justify-end">
                            <Users className="h-3 w-3" />
                            {ev.who}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Даты ориентировочные. Посты-отчёты выходят на сайте в
                    течение 2–3 дней после проведения.
                  </p>
                </CardContent>
              </Card>

              {/* Листы выставки */}
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      <LayoutGrid className="h-3.5 w-3.5" />
                      Листы выставки ({active.sheets.length})
                    </div>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      А3/А4 · QR на аудио
                    </Badge>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {active.sheets.map((sheet) => (
                      <div
                        key={sheet.id}
                        className="group rounded-md border border-border/60 p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
                      >
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs text-primary">
                            {String(sheet.id).padStart(2, "0")}
                          </span>
                          <h4 className="font-display text-sm leading-snug text-foreground">
                            {sheet.title}
                          </h4>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {sheet.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Продвижение выставки */}
        <div className="mt-8 rounded-lg border border-dashed border-primary/40 bg-primary/5 p-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <Mic className="h-3.5 w-3.5" />
            Продвижение на сайте
          </div>
          <p className="text-sm text-foreground/80">
            За неделю до выставки — анонсы в постах, рилс-приглашение, опрос
            «Кого из шестидесятников вы бы пришли слушать?». После —
            пост-отчёт с фотографиями.
          </p>
        </div>
      </div>
    </section>
  );
}
