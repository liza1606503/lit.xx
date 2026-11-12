import Link from "next/link";
import { demoSlots, exhibitionReports, sections } from "@/lib/content";
import { ContentCard } from "@/components/site/content-card";
import {
  IconFeed,
  IconArrowRight,
  IconExhibitions,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "Лента — Слово и эпоха",
};

export default function FeedPage() {
  // Объединяем демо-слоты и пост-релизы выставок, сортируем по типу
  const allItems = [
    ...demoSlots.map((s) => ({
      type: s.type,
      title: s.title,
      excerpt: s.excerpt,
      badge: "Демо-формат",
      href: `/demo/${s.id}`,
      meta: s.cadence,
      kind: "content" as const,
      id: s.id,
    })),
    ...exhibitionReports.map((r) => ({
      type: r.type,
      title: r.title,
      excerpt: r.excerpt,
      badge: "Пост-релиз выставки",
      href: `/exhibitions#${r.exhibitionId}`,
      meta: r.place,
      kind: "report" as const,
      id: r.id,
    })),
  ];

  return (
    <div>
      {/* Заголовок страницы */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2">
            <IconFeed size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Лента
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Что выходит на платформе
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-foreground/80">
            Хронологический список всех публикаций — постов-фактов,
            подкастов и статей, — а также пост-релизов с проведённых
            поп-ап выставок. Когда появятся утверждённые темы, лента
            начнёт наполняться реальным контентом.
          </p>

          {/* Фильтр по разделам */}
          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/feed"
              className="border-2 border-primary bg-primary px-3 py-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Все материалы
            </Link>
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`/${s.id}`}
                className="border border-border bg-card px-3 py-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-foreground hover:border-primary"
              >
                {s.tab}
              </Link>
            ))}
            <Link
              href="/exhibitions"
              className="flex items-center gap-1 border border-border bg-card px-3 py-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-foreground hover:border-primary"
            >
              <IconExhibitions size={12} />
              Пост-релизы
            </Link>
          </div>
        </div>
      </section>

      {/* Список материалов */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {allItems.length} записей
            </span>
            <span className="font-sans-ui text-xs text-muted-foreground">
              Сортировка: по мере выхода
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {allItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col border border-border bg-card transition-all hover:border-primary hover:shadow-sharp-sm"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                  <span
                    className={
                      item.kind === "report"
                        ? "tag-stamp"
                        : "tag-stamp tag-stamp-filled"
                    }
                  >
                    {item.badge}
                  </span>
                  <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                    {item.meta}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-xl leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-serif text-sm leading-relaxed text-foreground/80">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                    Открыть
                    <IconArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 border border-dashed border-border bg-secondary/30 p-6 text-center">
            <p className="font-serif text-sm italic text-muted-foreground">
              Лента обновляется по мере публикации новых материалов.
              Темы утверждаются редакцией — после утверждения карточки
              станут активными, а в ленте появятся даты выхода.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
