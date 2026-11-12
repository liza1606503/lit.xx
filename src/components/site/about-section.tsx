"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projectInfo, archiveSearch } from "@/lib/content";
import {
  Target,
  Users,
  Gauge,
  LayoutGrid,
  Mic2,
  Search,
  BookText,
  Headphones,
  Newspaper,
  CircleHelp,
  Image as ImageIcon,
} from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-border/60 bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        {/* Заголовок секции */}
        <div className="mb-10">
          <Badge variant="secondary" className="mb-3">
            О проекте
          </Badge>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">
            Слово и эпоха
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            {projectInfo.subtitle}. Проект на полтора месяца, в котором
            короткие посты, подкасты, статьи и передвижные выставки
            складываются в одну карту литературного процесса.
          </p>
        </div>

        {/* Цель и аудитория */}
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Target className="h-4 w-4" />
                Цель
              </div>
              <p className="text-base leading-relaxed text-foreground/85">
                {projectInfo.goal}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
                <Users className="h-4 w-4" />
                Целевая аудитория
              </div>
              <p className="text-base leading-relaxed text-foreground/85">
                {projectInfo.audience}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Gauge className="h-3.5 w-3.5" />
                Частота публикаций: {projectInfo.frequency}.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Форматы — три карточки */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <LayoutGrid className="h-4 w-4" />
            Форматы и вкладки сайта
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {projectInfo.formats.map((f) => {
              const Icon =
                f.tab === "В контексте"
                  ? BookText
                  : f.tab === "В тексте"
                    ? Headphones
                    : f.tab === "В телеграфе"
                      ? Newspaper
                      : Mic2;
              return (
                <Card key={f.tab} className="h-full">
                  <CardContent className="flex h-full flex-col gap-3 p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {f.cadence}
                      </Badge>
                    </div>
                    <h3 className="font-display text-lg text-foreground">
                      {f.tab}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Квиз и выставки — две плашки */}
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-6">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
              <CircleHelp className="h-4 w-4" />
              Квиз в конце месяца
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {projectInfo.quizNote}
            </p>
          </div>
          <div className="rounded-lg border border-accent/40 bg-accent/10 p-6">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent-foreground">
              <Mic2 className="h-4 w-4" />
              Поп-ап выставки
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {projectInfo.exhibitionsNote}
            </p>
          </div>
        </div>

        {/* Команда */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Users className="h-4 w-4" />
            Команда
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {projectInfo.team.map((member, i) => (
              <div
                key={i}
                className="rounded-md border border-border/60 bg-card p-4"
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {member.role}
                </div>
                <div className="mt-1 font-display text-base text-foreground">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Что ищем в архивах */}
        <div>
          <div className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Search className="h-4 w-4" />
            Что ищем в архивах
          </div>
          <Card>
            <CardContent className="p-6 md:p-8">
              <div className="grid gap-3 sm:grid-cols-2">
                {archiveSearch.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-md bg-secondary/40 p-3"
                  >
                    <ImageIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground/85">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
