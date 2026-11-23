import { exhibitions } from "@/lib/content";
import { IconNewspaper } from "@/components/site/sharp-icons";

export const metadata = {
  title: "Новости — Слово и эпоха",
};

export default function NewsPage() {
  return (
    <div>
      {/* Заголовок */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-center gap-2">
            <IconNewspaper size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Новости
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Анонсы и пост-релизы
          </h1>
        </div>
      </section>

      {/* Список */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-8">
            {exhibitions.map((ex, idx) => (
              <article
                key={ex.id}
                id={ex.id}
                className="border border-border bg-card"
              >
                <div className="border-b-2 border-primary bg-primary/5 px-6 py-5 md:px-8 md:py-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="tag-stamp">
                      {idx + 1} из {exhibitions.length}
                    </span>
                    <span
                      className={
                        ex.status === "upcoming"
                          ? "tag-stamp tag-stamp-filled"
                          : "tag-stamp"
                      }
                    >
                      {ex.status === "upcoming" ? "Скоро" : "В разработке"}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-foreground md:text-4xl">
                    {ex.title}
                  </h2>
                  <p className="mt-2 font-serif text-lg italic text-muted-foreground">
                    {ex.subtitle}
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <p className="font-serif text-base leading-relaxed text-foreground/85">
                    {ex.concept}
                  </p>

                  <div className="mt-6 mb-4 flex items-center justify-between border-b border-border pb-2">
                    <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                      Листы выставки
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {ex.sheets.length}
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
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
