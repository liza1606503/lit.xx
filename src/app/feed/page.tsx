import Link from "next/link";
import { demoSlots, exhibitionReports } from "@/lib/content";
import { IconFeed, IconArrowRight } from "@/components/site/sharp-icons";

export const metadata = {
  title: "Лента — Слово и эпоха",
};

const typeBadge: Record<string, string> = {
  post: "В контексте",
  podcast: "В тексте",
  article: "В телеграфе",
  "exhibition-report": "Новости",
};

export default function FeedPage() {
  // Общая лента — посты подряд, без деления по разделам.
  // У каждого поста тег раздела.
  const items = [
    ...demoSlots.map((s) => ({
      id: s.id,
      type: s.type,
      title: s.title,
      excerpt: s.excerpt,
      href: `/demo/${s.id}`,
    })),
    ...exhibitionReports.map((r) => ({
      id: r.id,
      type: r.type,
      title: r.title,
      excerpt: r.excerpt,
      href: `/exhibitions#${r.exhibitionId}`,
    })),
  ];

  return (
    <div>
      {/* Заголовок страницы */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-center gap-2">
            <IconFeed size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Лента
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Свежие материалы
          </h1>
        </div>
      </section>

      {/* Список материалов */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col border border-border bg-card transition-all hover:border-primary hover:shadow-sharp-sm"
              >
                <div className="border-b border-border px-4 py-2.5">
                  <span className="tag-stamp tag-stamp-filled">
                    {typeBadge[item.type]}
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
        </div>
      </section>
    </div>
  );
}
