import Link from "next/link";
import { platformInfo, sections, demoSlots, exhibitionReports } from "@/lib/content";
import { ContentCard } from "@/components/site/content-card";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconFeed,
  IconQuiz,
  IconTrophy,
  IconArrowRight,
  IconExhibitions,
  IconSparkle,
} from "@/components/site/sharp-icons";

const sectionIcons = {
  context: IconContext,
  text: IconText,
  telegraph: IconTelegraph,
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="paper-texture relative overflow-hidden border-b-2 border-primary">
        <div className="pointer-events-none absolute -right-12 top-8 select-none font-display text-[220px] leading-[0.85] text-primary/[0.06] md:text-[320px]">
          1940
          <br />
          <span className="ml-16">— 70</span>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-12 md:px-6 md:py-20">
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

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/feed"
                className="flex items-center gap-2 bg-primary px-5 py-3 font-sans-ui text-sm font-bold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
              >
                Открыть ленту
                <IconArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="border-2 border-primary px-5 py-3 font-sans-ui text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                О платформе
              </Link>
            </div>
          </div>

          {/* Правая колонка — что внутри */}
          <div className="md:col-span-5">
            <div className="border-2 border-primary bg-card p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <IconSparkle size={16} className="text-primary" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  Что внутри платформы
                </span>
              </div>
              <div className="grid gap-3">
                {platformInfo.whatYouGet.map((item) => (
                  <div key={item.title} className="border-l-2 border-primary pl-3">
                    <div className="font-display text-lg text-foreground">
                      {item.title}
                    </div>
                    <div className="mt-0.5 font-serif text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Три формата */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="tag-stamp">Три раздела · три формата</span>
              <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
                Как устроены публикации
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

          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((section) => {
              const Icon = sectionIcons[section.iconName];
              return (
                <Link
                  key={section.id}
                  href={`/${section.id}`}
                  className="group flex flex-col border border-border bg-card transition-all hover:border-primary hover:shadow-sharp-sm"
                >
                  <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <span className="flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                      <Icon size={16} />
                      {section.tab}
                    </span>
                    <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                      {section.cadence}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="font-display text-2xl leading-snug text-foreground">
                      {section.tagline}
                    </h3>
                    <p className="font-serif text-sm leading-relaxed text-foreground/80">
                      {section.description}
                    </p>
                    <div className="mt-auto flex items-center gap-1.5 border-t border-border pt-3 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                      Открыть раздел
                      <IconArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Демо-публикации */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-8">
            <span className="tag-stamp">Демонстрационный формат</span>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
              Как выглядит материал
            </h2>
            <p className="mt-3 max-w-2xl font-serif text-base text-muted-foreground">
              Темы пока не утверждены. Ниже — по одной демо-карточке на
              каждый формат: пост-факт, подкаст и статья. Полные версии
              открываются на отдельной странице с микро-тестом в конце.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {demoSlots.map((slot) => (
              <ContentCard
                key={slot.id}
                slot={slot}
                href={`/demo/${slot.id}`}
              />
            ))}
          </div>

          <p className="mt-6 font-serif text-sm italic text-muted-foreground">
            Слоты без тем — это будущие публикации. Когда тема утвердится,
            карточка станет активной.
          </p>
        </div>
      </section>

      {/* Поп-ап выставки + рейтинг */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Выставки */}
            <Link
              href="/exhibitions"
              className="group flex flex-col border-2 border-primary bg-card p-6 transition-all hover:shadow-sharp"
            >
              <div className="mb-3 flex items-center gap-2">
                <IconExhibitions size={20} className="text-primary" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  Поп-ап выставки
                </span>
              </div>
              <h3 className="font-display text-2xl leading-snug text-foreground">
                Громкие и тихие. Андеграунд.
              </h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                Две передвижные выставки с короткой лекцией у стендов —
                8 листов А3/А4, QR-коды на архивные аудио и видео. После
                каждой — пост-релиз с пересказом в ленте.
              </p>
              <div className="mt-4 flex items-center gap-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                Открыть выставки
                <IconArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>

            {/* Рейтинг */}
            <Link
              href="/leaderboard"
              className="group flex flex-col border-2 border-accent bg-card p-6 transition-all hover:shadow-sharp-accent"
            >
              <div className="mb-3 flex items-center gap-2">
                <IconTrophy size={20} className="text-accent" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-accent">
                  Рейтинг активности
                </span>
              </div>
              <h3 className="font-display text-2xl leading-snug text-foreground">
                Кто разбирается лучше всех
              </h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                За каждый правильный ответ в микро-тесте — один балл.
                Самые активные попадают в таблицу лидеров. Зарегистрируйтесь,
                чтобы участвовать.
              </p>
              <div className="mt-4 flex items-center gap-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-accent">
                Смотреть рейтинг
                <IconArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — регистрация */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
                Зарегистрируйтесь
              </span>
              <h2 className="mt-3 font-display text-4xl leading-tight text-primary-foreground md:text-5xl">
                Сохраняйте прогресс и попадайте в рейтинг
              </h2>
              <p className="mt-4 max-w-xl font-serif text-base leading-relaxed text-primary-foreground/85">
                После регистрации каждый пройденный микро-тест сохраняется
                в профиле. Видите свою историю, набор баллов и место в
                рейтинге активности.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/auth/register"
                className="flex items-center gap-2 bg-primary-foreground px-5 py-3 font-sans-ui text-sm font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-90"
              >
                Создать аккаунт
                <IconArrowRight size={16} />
              </Link>
              <Link
                href="/auth/login"
                className="border-2 border-primary-foreground px-5 py-3 font-sans-ui text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
