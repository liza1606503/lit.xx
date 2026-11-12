import Link from "next/link";
import { cn } from "@/lib/utils";
import { sections, demoSlots, placeholderSlots, type SectionInfo } from "@/lib/content";
import { ContentCard } from "@/components/site/content-card";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconArrowRight,
  IconQuiz,
} from "@/components/site/sharp-icons";

const sectionIcons = {
  context: IconContext,
  text: IconText,
  telegraph: IconTelegraph,
};

interface SectionPageProps {
  sectionId: SectionInfo["id"];
}

export function SectionPage({ sectionId }: SectionPageProps) {
  const section = sections.find((s) => s.id === sectionId)!;
  const Icon = sectionIcons[section.iconName];

  const demo = demoSlots.find((s) => s.section === sectionId);
  const placeholders = placeholderSlots.filter((s) => s.section === sectionId);

  return (
    <div>
      {/* Заголовок раздела */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2">
                <Icon size={20} className="text-primary" />
                <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  {section.tab} · {section.cadence}
                </span>
              </div>
              <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
                {section.tagline}
              </h1>
              <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-foreground/80">
                {section.description}
              </p>
              <div className="mt-6 flex items-center gap-2 border-l-2 border-primary pl-3">
                <IconQuiz size={16} className="text-primary" />
                <span className="font-serif text-sm text-foreground">
                  Каждый материал завершается микро-тестом на 3 вопроса.
                </span>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="border border-primary bg-card p-5">
                <div className="mb-3 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                  Что будет в разделе
                </div>
                <ul className="space-y-2">
                  {sectionId === "context" &&
                    [
                      "Короткие посты-факты о писателях и произведениях",
                      "Архивные аудио с чтением стихов автором",
                      "Фотографии, афиши, обложки первых изданий",
                      "QR-коды на дополнительные материалы",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-serif text-sm text-foreground"
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  {sectionId === "text" &&
                    [
                      "Подкасты 7–12 минут с анализом произведения",
                      "Пары «текст ↔ экранизация» — что меняется на экране",
                      "Контекст эпохи и история создания",
                      "Дискуссионный вопрос для самостоятельного размышления",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-serif text-sm text-foreground"
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  {sectionId === "telegraph" &&
                    [
                      "Развёрнутые статьи по ключевым текстам и авторам",
                      "Тезисы, цитаты, факты — телеграфный формат",
                      "Связи с другими материалами платформы",
                      "Продолжение разговора, начатого в постах и подкастах",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 font-serif text-sm text-foreground"
                      >
                        <span className="font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Демонстрационный материал */}
      {demo && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="tag-stamp tag-stamp-filled">Демонстрационный формат</span>
                <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                  Как выглядит материал
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-2">
                <ContentCard
                  slot={demo}
                  href={`/demo/${demo.id}`}
                  className="h-full"
                />
              </div>
              <div className="flex flex-col justify-center border border-dashed border-primary bg-primary/5 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <IconQuiz size={18} className="text-primary" />
                  <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                    Внутри материала
                  </span>
                </div>
                <p className="font-serif text-sm leading-relaxed text-foreground">
                  Полный текст публикации с архивными материалами и
                  разбором. В конце — микро-тест на{" "}
                  <span className="font-bold text-primary">3 вопроса</span>.
                  Зарегистрируйтесь, чтобы результат сохранился в профиль.
                </p>
                <Link
                  href={`/demo/${demo.id}`}
                  className="mt-4 flex items-center gap-1.5 self-start bg-primary px-4 py-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
                >
                  Открыть демо
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Слоты будущих публикаций */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6">
            <span className="tag-stamp">Ожидают публикации</span>
            <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
              Слоты будущих материалов
            </h2>
            <p className="mt-3 max-w-2xl font-serif text-base text-muted-foreground">
              Темы пока не утверждены. Карточки ниже — это слоты, в
              которых появятся публикации после утверждения темы. Частота
              выхода: {section.cadence}.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {placeholders.map((slot) => (
              <ContentCard key={slot.id} slot={slot} />
            ))}
          </div>

          <div className="mt-8 border border-dashed border-border bg-card p-5 text-center">
            <p className="font-serif text-sm italic text-muted-foreground">
              Хотите увидеть, как выглядит полный материал с микро-тестом?{" "}
              <Link
                href={demo ? `/demo/${demo.id}` : "/feed"}
                className="font-bold text-primary underline underline-offset-2"
              >
                Откройте демонстрационную публикацию
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
