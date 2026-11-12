import Link from "next/link";
import { exhibitions } from "@/lib/content";
import {
  IconExhibitions,
  IconLayoutGrid,
  IconImage,
  IconListOrdered,
  IconArrowRight,
  IconMapPin,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "Поп-ап выставки — Слово и эпоха",
};

export default function ExhibitionsPage() {
  return (
    <div>
      {/* Заголовок */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2">
            <IconExhibitions size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Поп-ап выставки
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Передвижные выставки с лекцией
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-foreground/80">
            Две поп-ап выставки с короткой лекцией у стендов — для
            студентов-филологов, активистов вуза, студентов колледжа
            культуры и школьников. Каждая выставка — 8 листов А3/А4 на
            стойках, с QR-кодами на архивные аудио и видео. После
            проведения — пост-релиз с пересказом в{" "}
            <Link
              href="/feed"
              className="font-bold text-primary underline underline-offset-2"
            >
              ленте
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Список выставок */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8">
            {exhibitions.map((ex, idx) => (
              <article
                key={ex.id}
                id={ex.id}
                className="border border-border bg-card"
              >
                {/* Заголовок выставки */}
                <div className="border-b-2 border-primary bg-primary/5 px-6 py-5 md:px-8 md:py-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="tag-stamp">
                      Выставка {idx + 1} из {exhibitions.length}
                    </span>
                    <span
                      className={
                        ex.status === "upcoming"
                          ? "tag-stamp tag-stamp-filled"
                          : "tag-stamp"
                      }
                    >
                      {ex.status === "upcoming"
                        ? "Скоро"
                        : "В разработке"}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl">
                    {ex.title}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-muted-foreground">
                    {ex.subtitle}
                  </p>
                </div>

                {/* Содержимое выставки */}
                <div className="grid gap-6 p-6 md:grid-cols-12 md:p-8">
                  {/* Левая колонка — концепция и формат */}
                  <div className="md:col-span-5">
                    <div className="mb-4">
                      <div className="mb-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                        Концепция
                      </div>
                      <p className="font-serif text-base leading-relaxed text-foreground/85">
                        {ex.concept}
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="mb-2 flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                        <IconImage size={14} />
                        Визуальный ряд
                      </div>
                      <p className="font-serif text-sm leading-relaxed text-foreground/80">
                        {ex.visualRow}
                      </p>
                    </div>

                    <div className="border border-border bg-secondary/60 p-4">
                      <div className="mb-2 flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                        <IconLayoutGrid size={14} />
                        Формат
                      </div>
                      <p className="font-serif text-sm leading-relaxed text-foreground/85">
                        {ex.format}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-2 font-sans-ui text-xs text-muted-foreground">
                      <IconListOrdered size={14} />
                      {ex.navigation}
                    </div>
                  </div>

                  {/* Правая колонка — листы */}
                  <div className="md:col-span-7">
                    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                      <div className="flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                        <IconLayoutGrid size={14} />
                        Листы выставки
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {ex.sheets.length} листов
                      </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {ex.sheets.map((sheet) => (
                        <div
                          key={sheet.id}
                          className="border border-border bg-card p-4 transition-colors hover:border-primary"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-xs text-primary">
                              {String(sheet.id).padStart(2, "0")}
                            </span>
                            <h3 className="font-display text-base leading-snug text-foreground">
                              {sheet.title}
                            </h3>
                          </div>
                          <p className="mt-1.5 font-serif text-xs leading-relaxed text-muted-foreground">
                            {sheet.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Пост-релиз */}
                    <div className="mt-6 border border-dashed border-primary/40 bg-primary/5 p-4">
                      <div className="mb-1 flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                        <IconMapPin size={14} />
                        Площадки анонсируются
                      </div>
                      <p className="font-serif text-sm text-foreground/80">
                        После проведения выставки —{" "}
                        <Link
                          href="/feed"
                          className="font-bold text-primary underline underline-offset-2"
                        >
                          пост-релиз в ленте
                        </Link>{" "}
                        с фотографиями, кратким пересказом лекции у
                        стендов и цитатами из обсуждения.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Нижняя плашка — продвижение */}
          <div className="mt-8 border-2 border-accent bg-accent/10 p-5">
            <div className="mb-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-accent-foreground">
              Как продвигаются выставки
            </div>
            <p className="font-serif text-sm leading-relaxed text-foreground/85">
              За неделю до выставки — анонсы в постах, рилс-приглашение,
              опрос в соцсетях. После — пост-отчёт с фотографиями в ленте
              платформы. Каждая выставка сопровождается короткой лекцией
              у стендов — 20–30 минут.
            </p>
            <Link
              href="/feed"
              className="mt-3 flex items-center gap-1.5 self-start font-sans-ui text-xs font-bold uppercase tracking-widest text-accent"
            >
              Все пост-релизы в ленте
              <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
