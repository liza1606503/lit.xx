"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ContentSlot } from "@/lib/content";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconCalendar,
  IconChevronRight,
} from "@/components/site/sharp-icons";

interface ContentCardProps {
  slot: ContentSlot;
  href?: string;
  className?: string;
}

const typeConfig: Record<
  ContentSlot["type"],
  { label: string; Icon: typeof IconContext; color: string }
> = {
  post: {
    label: "Пост-факт",
    Icon: IconContext,
    color: "border-primary text-primary",
  },
  podcast: {
    label: "Подкаст",
    Icon: IconText,
    color: "border-accent text-accent",
  },
  article: {
    label: "Статья",
    Icon: IconTelegraph,
    color: "border-primary text-primary",
  },
  "exhibition-report": {
    label: "Пост-релиз выставки",
    Icon: IconContext,
    color: "border-accent text-accent",
  },
};

export function ContentCard({ slot, href, className }: ContentCardProps) {
  const config = typeConfig[slot.type];
  const Icon = config.Icon;
  const isPlaceholder = slot.status === "scheduled";

  const inner = (
    <article
      className={cn(
        "group flex h-full flex-col border border-border bg-card transition-all",
        !isPlaceholder && !href && "hover:border-primary",
        !isPlaceholder && href && "hover:border-primary hover:shadow-sharp-sm",
        isPlaceholder && "border-dashed opacity-70",
        className,
      )}
    >
      {/* Верхняя плашка */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 border px-2 py-0.5 font-sans-ui text-[10px] font-bold uppercase tracking-widest",
            config.color,
          )}
        >
          <Icon size={12} />
          {config.label}
        </span>
        {isPlaceholder ? (
          <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
            Тема анонсируется
          </span>
        ) : (
          <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
            {slot.cadence}
          </span>
        )}
      </div>

      {/* Основное содержимое */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl leading-snug text-foreground">
          {slot.title}
        </h3>
        <p
          className={cn(
            "font-serif text-sm leading-relaxed text-foreground/85",
            isPlaceholder && "italic",
          )}
        >
          {slot.excerpt}
        </p>

        {/* Низ карточки */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          {slot.publishedAt ? (
            <span className="flex items-center gap-1.5 font-sans-ui text-xs text-muted-foreground">
              <IconCalendar size={12} />
              {new Date(slot.publishedAt).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          ) : (
            <span className="font-sans-ui text-xs text-muted-foreground">
              {isPlaceholder ? "Ожидается публикация" : "Демо-формат"}
            </span>
          )}

          {href && (
            <span className="flex items-center gap-1 font-sans-ui text-xs font-medium text-primary">
              Открыть
              <IconChevronRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  );
}
