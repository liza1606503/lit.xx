import Link from "next/link";
import { notFound } from "next/navigation";
import { demoSlots } from "@/lib/content";
import { MicroQuiz } from "@/components/site/micro-quiz";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconArrowRight,
  IconArrowDown,
  IconCalendar,
  IconImage,
  IconHeadphones,
  IconClock,
  IconChevronRight,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "Демонстрационный материал — Слово и эпоха",
};

export function generateStaticParams() {
  return demoSlots.map((s) => ({ id: s.id }));
}

export default function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  // params в Next.js 16 — Promise; но мы обработаем синхронно через деструктуризацию
  // (для статической генерации достаточно простого доступа)
  return <DemoContent params={params} />;
}

async function DemoContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slot = demoSlots.find((s) => s.id === id);
  if (!slot) notFound();

  const Icon =
    slot.type === "post"
      ? IconContext
      : slot.type === "podcast"
        ? IconText
        : IconTelegraph;

  // Полный демо-контент по типу
  const fullText = getDemoFullText(slot.type);
  const sidebar = getDemoSidebar(slot.type);

  return (
    <article>
      {/* Хлебные крошки */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3 font-sans-ui text-xs text-muted-foreground md:px-6">
          <Link href="/" className="hover:text-primary">
            Главная
          </Link>
          <IconChevronRight size={12} />
          <Link href={`/${slot.section}`} className="hover:text-primary">
            {slot.section === "context"
              ? "В контексте"
              : slot.section === "text"
                ? "В тексте"
                : "В телеграфе"}
          </Link>
          <IconChevronRight size={12} />
          <span className="text-foreground">Демонстрационный материал</span>
        </div>
      </div>

      {/* Заголовок */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 border border-primary px-2 py-1 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-primary">
              <Icon size={12} />
              {slot.type === "post"
                ? "Пост-факт"
                : slot.type === "podcast"
                  ? "Подкаст"
                  : "Статья"}
            </span>
            <span className="tag-stamp">Демонстрационный формат</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {slot.title}
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-foreground/80">
            {slot.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 font-sans-ui text-xs text-muted-foreground">
            {slot.type === "podcast" && (
              <span className="flex items-center gap-1.5">
                <IconClock size={12} />
                7–12 минут
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <IconCalendar size={12} />
              Дата публикации: тема анонсируется
            </span>
            <span className="flex items-center gap-1.5">
              <IconImage size={12} />
              Сопровождение: архивные фото и аудио
            </span>
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Текст */}
          <div className="md:col-span-8">
            <div className="prose-content font-serif text-base leading-relaxed text-foreground/90">
              {fullText}
            </div>

            {/* Подсказка про микро-тест */}
            <div className="mt-8 flex items-center justify-center border-t-2 border-dashed border-border py-4">
              <span className="flex items-center gap-2 font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
                <IconArrowDown size={14} />
                Ниже — микро-тест по материалу
                <IconArrowDown size={14} />
              </span>
            </div>
          </div>

          {/* Боковая панель */}
          <aside className="md:col-span-4">
            <div className="sticky top-20 border border-border bg-card p-5">
              <div className="mb-3 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                Что будет здесь
              </div>
              <ul className="space-y-3">
                {sidebar.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-serif text-sm text-foreground"
                  >
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center bg-primary/10 font-mono text-[10px] text-primary">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {slot.type === "podcast" && (
                <div className="mt-4 border border-border bg-secondary/60 p-3">
                  <div className="mb-2 flex items-center gap-2 font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
                    <IconHeadphones size={12} />
                    Плеер
                  </div>
                  <div className="h-16 border border-dashed border-border bg-card" />
                  <div className="mt-2 font-sans-ui text-[10px] text-muted-foreground">
                    Аудио появится после публикации выпуска
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Микро-тест */}
        <div className="mt-6 md:mt-10">
          <MicroQuiz
            contentId={slot.id}
            contentType={slot.type === "podcast" ? "podcast" : slot.type === "article" ? "article" : "post"}
            contentTitle={slot.title}
          />
        </div>

        {/* Навигация назад */}
        <div className="mt-12 border-t border-border pt-6">
          <Link
            href={`/${slot.section}`}
            className="flex items-center gap-2 font-sans-ui text-sm font-bold uppercase tracking-widest text-primary hover:opacity-70"
          >
            <IconArrowRight size={14} className="rotate-180" />
            Вернуться в раздел
          </Link>
        </div>
      </div>
    </article>
  );
}

function getDemoFullText(type: "post" | "podcast" | "article") {
  if (type === "post") {
    return (
      <>
        <p>
          Это демонстрационный пост-факт. Когда тема утвердится, на этом
          месте появится короткий текст о конкретном писателе, произведении
          или событии 1940–1970-х годов: биографическая деталь,
          обстоятельства публикации, история одного стихотворения или
          выступления.
        </p>
        <p>
          Пост-факт — это не энциклопедическая справка и не рецензия. Это
          короткая заметка, которая ставит один конкретный факт в контекст
          эпохи и показывает, почему он важен для понимания литературного
          процесса. Объём — до 500 знаков, чтобы можно было прочесть за
          минуту.
        </p>
        <p>
          К посту обычно прилагается архивное сопровождение: фотография,
          обложка первого издания, фрагмент рукописи или афиша. Если есть
          аудиозапись, где автор читает собственное стихотворение, — на
          карточке появляется QR-код, по которому можно прослушать
          оригинальное чтение.
        </p>
        <p>
          Каждый пост завершается микро-тестом на 3 вопроса — это способ
          быстро проверить, что именно вы запомнили. Зарегистрированные
          пользователи накапливают баллы за правильные ответы и попадают в{" "}
          <Link
            href="/leaderboard"
            className="font-bold text-primary underline underline-offset-2"
          >
            рейтинг активности
          </Link>
          .
        </p>
      </>
    );
  }

  if (type === "podcast") {
    return (
      <>
        <p>
          Это демонстрационный подкаст. После утверждения темы здесь
          появится встроенный плеер с аудиозаписью на 7–12 минут — анализ
          одного произведения или темы.
        </p>
        <p>
          Каждый выпуск построен по одной схеме: пара «текст и его
          экранизация». Сначала — короткий разбор литературного
          произведения: жанр, контекст эпохи, ключевые образы. Затем — что
          изменилось при переносе на экран: какие акценты сместились, какие
          сцены добавлены или убраны, как визуальный ряд работает со
          смыслом текста.
        </p>
        <p>
          В конце — дискуссионный вопрос, на который нет однозначного
          ответа. Это приглашение подумать самостоятельно, а не итоговый
          вердикт ведущих. После прослушивания — микро-тест на 3 вопроса
          по содержанию выпуска.
        </p>
        <p>
          Подкасты выходят раз в неделю. Расшифровка каждого выпуска
          публикуется под плеером — на случай, если удобнее читать, чем
          слушать.
        </p>
      </>
    );
  }

  return (
    <>
      <p>
        Это демонстрационная статья. После утверждения темы здесь появится
        развёрнутый материал по ключевому тексту или автору — в
        телеграфном формате: тезисы, цитаты, факты.
      </p>
      <p>
        Статья — это продолжение разговора, начатого в постах и подкастах,
        но на материале, который требует большего внимания. Если пост-факт
        ставит один факт в контекст, то статья разбирает несколько фактов
        сразу и показывает их связи.
      </p>
      <p>
        Текст строится по принципу телеграммы: короткие абзацы, выделенные
        тезисы, минимум риторики. Цитаты из произведений и критики
        вынесены в отдельные блоки, чтобы с ними было удобно работать.
        Ссылки на связанные материалы платформы — в боковой панели.
      </p>
      <p>
        В конце статьи — микро-тест на 3 вопроса. Он проверяет не память
        на детали, а понимание логики материала: почему именно так, а не
        иначе.
      </p>
    </>
  );
}

function getDemoSidebar(type: "post" | "podcast" | "article") {
  if (type === "post") {
    return [
      "Короткий текст до 500 знаков",
      "Один конкретный факт в контексте эпохи",
      "Архивное фото или обложка первого издания",
      "QR-код на аудио с чтением автора",
      "Микро-тест на 3 вопроса",
    ];
  }
  if (type === "podcast") {
    return [
      "Аудио 7–12 минут со встроенным плеером",
      "Пара «текст ↔ экранизация»",
      "Контекст эпохи и история создания",
      "Дискуссионный вопрос в финале",
      "Расшифровка под плеером",
    ];
  }
  return [
    "Развёрнутый материал в телеграфном формате",
    "Тезисы, цитаты, факты в отдельных блоках",
    "Связи с постами и подкастами по теме",
    "Минимум риторики — максимум конкретики",
    "Микро-тест на 3 вопроса по логике материала",
  ];
}
