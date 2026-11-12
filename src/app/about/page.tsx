import Link from "next/link";
import { platformInfo, sections } from "@/lib/content";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconFeed,
  IconQuiz,
  IconTrophy,
  IconExhibitions,
  IconArrowRight,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "О платформе — Слово и эпоха",
};

const sectionIcons = {
  context: IconContext,
  text: IconText,
  telegraph: IconTelegraph,
};

export default function AboutPage() {
  return (
    <div>
      {/* Заголовок */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <span className="tag-stamp">О платформе</span>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Слово и эпоха
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-foreground/80">
            {platformInfo.subtitle}. {platformInfo.tagline}
          </p>
        </div>
      </section>

      {/* Что на платформе */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <span className="tag-stamp tag-stamp-filled">Что есть на платформе</span>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            Из чего она состоит
          </h2>
          <p className="mt-4 max-w-3xl font-serif text-base leading-relaxed text-foreground/80">
            {platformInfo.formatNote}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {platformInfo.whatYouGet.map((item) => (
              <div
                key={item.title}
                className="border border-border bg-card p-5"
              >
                <h3 className="font-display text-xl text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Три формата публикаций */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <span className="tag-stamp">Форматы</span>
          <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">
            Три раздела — три формата
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {sections.map((section) => {
              const Icon = sectionIcons[section.iconName];
              return (
                <Link
                  key={section.id}
                  href={`/${section.id}`}
                  className="group flex flex-col border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-sharp-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <Icon size={18} className="text-primary" />
                    <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                      {section.cadence}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-foreground">
                    {section.tab}
                  </h3>
                  <p className="mt-1 font-serif text-sm italic text-muted-foreground">
                    {section.tagline}
                  </p>
                  <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/80">
                    {section.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                    Открыть раздел
                    <IconArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Лента и пост-релизы */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/feed"
              className="group flex flex-col border-2 border-primary bg-card p-6 transition-all hover:shadow-sharp"
            >
              <div className="mb-3 flex items-center gap-2">
                <IconFeed size={20} className="text-primary" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  Лента
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground">
                Все публикации в одном месте
              </h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                Хронологический список постов-фактов, подкастов и статей —
                плюс пост-релизы с проведённых поп-ап выставок с
                пересказом их содержания.
              </p>
            </Link>

            <Link
              href="/exhibitions"
              className="group flex flex-col border-2 border-accent bg-card p-6 transition-all hover:shadow-sharp-accent"
            >
              <div className="mb-3 flex items-center gap-2">
                <IconExhibitions size={20} className="text-accent" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-accent">
                  Поп-ап выставки
                </span>
              </div>
              <h3 className="font-display text-2xl text-foreground">
                Передвижные выставки с лекцией
              </h3>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                Две выставки с лекцией у стендов: «Громкие и тихие» и
                «Андеграунд». Листы А3/А4, QR-коды на архивные аудио и
                видео. После — пост-релиз в ленте.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Микро-тесты и рейтинг */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <IconQuiz size={20} />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground/85">
                  Микро-тесты
                </span>
              </div>
              <h2 className="font-display text-3xl leading-tight text-primary-foreground md:text-4xl">
                Тест после каждого материала
              </h2>
              <p className="mt-3 font-serif text-base leading-relaxed text-primary-foreground/85">
                После каждого поста, подкаста и статьи — короткий тест на
                3 вопроса. Это не экзамен, а способ закрепить прочитанное
                и услышанное. Зарегистрированные пользователи накапливают
                баллы за правильные ответы.
              </p>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <IconTrophy size={20} />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground/85">
                  Рейтинг активности
                </span>
              </div>
              <h2 className="font-display text-3xl leading-tight text-primary-foreground md:text-4xl">
                Кто разбирается лучше всех
              </h2>
              <p className="mt-3 font-serif text-base leading-relaxed text-primary-foreground/85">
                За каждый правильный ответ — один балл. Самые активные
                попадают в таблицу лидеров. Зарегистрируйтесь, чтобы
                участвовать и видеть свой прогресс в профиле.
              </p>
              <Link
                href="/leaderboard"
                className="mt-4 inline-flex items-center gap-1.5 bg-primary-foreground px-4 py-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary"
              >
                Смотреть рейтинг
                <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
