import Link from "next/link";
import { sections, demoSlots, type SectionInfo } from "@/lib/content";
import { ContentCard } from "@/components/site/content-card";
import {
  IconContext,
  IconText,
  IconTelegraph,
  IconArrowRight,
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

  return (
    <div>
      {/* Заголовок раздела */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
          <div className="flex items-center gap-2">
            <Icon size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              {section.tab}
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {section.tagline}
          </h1>
        </div>
      </section>

      {/* Демонстрационный материал */}
      {demo && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
            <div className="mb-6">
              <span className="tag-stamp tag-stamp-filled">
                Демонстрационный материал
              </span>
            </div>
            <div className="max-w-2xl">
              <ContentCard slot={demo} href={`/demo/${demo.id}`} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
