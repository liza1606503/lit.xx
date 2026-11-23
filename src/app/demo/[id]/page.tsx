import Link from "next/link";
import { notFound } from "next/navigation";
import { demoSlots } from "@/lib/content";
import { MicroQuiz } from "@/components/site/micro-quiz";
import { AudioPlayerBig } from "@/components/site/audio-player-big";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconArrowRight,
  IconChevronRight,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "Демонстрационный материал — Слово и эпоха",
};

export function generateStaticParams() {
  return demoSlots.map((s) => ({ id: s.id }));
}

export default function DemoPage({ params }: { params: Promise<{ id: string }> }) {
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

  const sectionLabel =
    slot.section === "context"
      ? "В контексте"
      : slot.section === "text"
        ? "В тексте"
        : "В телеграфе";

  const typeLabel =
    slot.type === "post" ? "Пост-факт" : slot.type === "podcast" ? "Подкаст" : "Статья";

  return (
    <article>
      {/* Хлебные крошки */}
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-3xl items-center gap-1 px-4 py-3 font-sans-ui text-xs text-muted-foreground md:px-6">
          <Link href="/" className="hover:text-primary">
            Главная
          </Link>
          <IconChevronRight size={12} />
          <Link href={`/${slot.section}`} className="hover:text-primary">
            {sectionLabel}
          </Link>
          <IconChevronRight size={12} />
          <span className="text-foreground">{typeLabel}</span>
        </div>
      </div>

      {/* Заголовок */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <span className="flex w-fit items-center gap-1.5 border border-primary px-2 py-1 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-primary">
            <Icon size={12} />
            {typeLabel}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            {slot.title}
          </h1>
        </div>
      </header>

      {/* Содержимое */}
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        {slot.type === "podcast" && (
          <div className="mb-10">
            <AudioPlayerBig />
          </div>
        )}

        {/* Микро-тест */}
        <MicroQuiz
          contentId={slot.id}
          contentType={slot.type === "podcast" ? "podcast" : slot.type === "article" ? "article" : "post"}
          contentTitle={slot.title}
        />

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
