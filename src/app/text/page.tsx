import { sections, demoSlots } from "@/lib/content";
import { AudioPlayerBig } from "@/components/site/audio-player-big";
import { MicroQuiz } from "@/components/site/micro-quiz";
import { IconText } from "@/components/site/sharp-icons";

export const metadata = {
  title: "В тексте — Слово и эпоха",
};

export default function TextPage() {
  const section = sections.find((s) => s.id === "text")!;
  const demo = demoSlots.find((s) => s.id === "podcast-demo-1")!;

  return (
    <div>
      {/* Заголовок раздела */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-center gap-2">
            <IconText size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              {section.tab}
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {section.tagline}
          </h1>
        </div>
      </section>

      {/* Аудио + тест */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <AudioPlayerBig label={demo.title} />
          <div className="mt-10">
            <MicroQuiz
              contentId={demo.id}
              contentType="podcast"
              contentTitle={demo.title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
