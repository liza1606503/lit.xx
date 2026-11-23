import { platformInfo } from "@/lib/content";

export const metadata = {
  title: "О платформе — Слово и эпоха",
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6 md:py-20">
          <span className="tag-stamp">О платформе</span>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Слово и эпоха
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-foreground/80">
            {platformInfo.tagline}
          </p>
        </div>
      </section>
    </div>
  );
}
