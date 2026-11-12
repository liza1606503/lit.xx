"use client";

import { useState, useCallback, useEffect } from "react";
import { SiteHeader, type SectionId } from "@/components/site/site-header";
import { Hero } from "@/components/site/hero";
import { PostsSection } from "@/components/site/posts-section";
import { PodcastsSection } from "@/components/site/podcasts-section";
import { ArticlesSection } from "@/components/site/articles-section";
import { ExhibitionsSection } from "@/components/site/exhibitions-section";
import { QuizSection } from "@/components/site/quiz-section";
import { AboutSection } from "@/components/site/about-section";
import { SiteFooter } from "@/components/site/site-footer";

export default function Home() {
  const [active, setActive] = useState<SectionId>("hero");

  const handleNavigate = useCallback((id: SectionId) => {
    setActive(id);
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64; // высота шапки
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Подсветка активного раздела при прокрутке
  useEffect(() => {
    const sections: SectionId[] = [
      "hero",
      "context",
      "text",
      "telegraph",
      "exhibitions",
      "quiz",
      "about",
    ];

    const onScroll = () => {
      const scrollY = window.scrollY + 100; // отступ, чтобы переключалось в середине секции
      let current: SectionId = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          current = id;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader active={active} onNavigate={handleNavigate} />
      <main className="flex-1">
        <Hero onNavigate={handleNavigate} />
        <PostsSection />
        <PodcastsSection />
        <ArticlesSection />
        <ExhibitionsSection />
        <QuizSection onNavigate={handleNavigate} />
        <AboutSection />
      </main>
      <SiteFooter onNavigate={handleNavigate} />
    </div>
  );
}
