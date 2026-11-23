import Link from "next/link";
import { platformInfo, homeFeedPreview } from "@/lib/content";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconFeed,
  IconNewspaper,
  IconTrophy,
  IconArrowRight,
  IconSparkle,
} from "@/components/site/sharp-icons";

const sectionLinks = [
  { href: "/feed", label: "Лента", Icon: IconFeed },
  { href: "/context", label: "В контексте", Icon: IconContext },
  { href: "/text", label: "В тексте", Icon: IconText },
  { href: "/telegraph", label: "В телеграфе", Icon: IconTelegraph },
  { href: "/exhibitions", label: "Новости", Icon: IconNewspaper },
];

const typeBadge: Record<string, string> = {
  post: "В контексте",
  podcast: "В тексте",
  article: "В телеграфе",
  "exhibition-report": "Новости",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero с правым сайдбаром — ссылки на разделы */}
      <section className="paper-texture relative overflow-hidden border-b-2 border-primary">
        <div className="pointer-events-none absolute -right-12 top-8 select-none font-display text-[220px] leading-[0.85] text-primary/[0.06] md:text-[320px]">
          1940
          <br />
          <span className="ml-16">— 70</span>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-12 md:px-6 md:py-20">
          {/* Левая колонка — заголовок */}
          <div className="md:col-span-7">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="tag-stamp tag-stamp-filled">
                Образовательная платформа
              </span>
              <span className="tag-stamp">Литература · XX век</span>
            </div>

            <h1 className="font-display text-6xl leading-[0.95] text-foreground md:text-8xl">
              Слово
              <br />
              <span className="text-primary">и эпоха</span>
            </h1>

            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-foreground/85 md:text-xl">
              {platformInfo.tagline}
            </p>
          </div>

          {/* Правая колонка — ссылки на разделы */}
          <div className="md:col-span-5">
            <div className="border-2 border-primary bg-card p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <IconSparkle size={16} className="text-primary" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  Разделы
                </span>
              </div>
              <nav className="grid gap-1">
                {sectionLinks.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group flex items-center justify-between border-l-2 border-primary pl-3 py-2.5 transition-colors hover:bg-secondary/40"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={16} className="text-primary" />
                      <span className="font-display text-lg text-foreground">
                        {label}
                      </span>
                    </span>
                    <IconArrowRight
                      size={14}
                      className="text-primary/60 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                ))}
              </nav>

              {/* Рейтинг — отдельно, без акцента */}
              <Link
                href="/leaderboard"
                className="group mt-3 flex items-center justify-between border-t border-border pl-3 pt-3 text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="flex items-center gap-2.5">
                  <IconTrophy size={14} />
                  <span className="font-sans-ui text-xs font-medium uppercase tracking-widest">
                    Рейтинг
                  </span>
                </span>
                <IconArrowRight
                  size={12}
                  className="opacity-50 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Превью ленты — общая, без деления по разделам */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
            <div>
              <span className="tag-stamp">Лента</span>
              <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
                Свежие материалы
              </h2>
            </div>
            <Link
              href="/feed"
              className="hidden items-center gap-1.5 border-b-2 border-primary font-sans-ui text-sm font-bold uppercase tracking-widest text-primary hover:opacity-70 sm:flex"
            >
              Вся лента
              <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {homeFeedPreview.map((post) => (
              <article
                key={post.id}
                className="flex flex-col border border-border bg-card transition-colors hover:border-primary"
              >
                <div className="border-b border-border px-4 py-2.5">
                  <span className="tag-stamp tag-stamp-filled">
                    {typeBadge[post.type]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-xl leading-snug text-foreground">
                    {post.title}
                  </h3>
                  <p className="font-serif text-sm leading-relaxed text-foreground/80">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
