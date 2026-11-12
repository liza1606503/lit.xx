"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SectionId =
  | "hero"
  | "context"
  | "text"
  | "telegraph"
  | "exhibitions"
  | "quiz"
  | "about";

interface NavItem {
  id: SectionId;
  label: string;
  cadence?: string;
}

const navItems: NavItem[] = [
  { id: "context", label: "В контексте", cadence: "3–5 / нед." },
  { id: "text", label: "В тексте", cadence: "1 / нед." },
  { id: "telegraph", label: "В телеграфе", cadence: "1 / нед." },
  { id: "exhibitions", label: "Выставки" },
  { id: "quiz", label: "Квиз" },
  { id: "about", label: "О проекте" },
];

export function SiteHeader({
  active,
  onNavigate,
}: {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (id: SectionId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-shadow",
        scrolled && "shadow-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Логотип / название */}
        <button
          onClick={() => handleClick("hero")}
          className="group flex items-center gap-3"
          aria-label="На главную"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-primary font-display text-lg text-primary-foreground">
            С
          </span>
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="font-display text-base text-foreground">
              Слово и эпоха
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              1940–1970-е
            </span>
          </span>
        </button>

        {/* Десктоп-навигация */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Главное меню">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-secondary hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Мобильное меню — кнопка */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Открыть меню"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "Закрыть" : "Разделы"}
        </Button>
      </div>

      {/* Мобильное меню — разворачивающаяся панель */}
      {mobileOpen && (
        <nav
          className="border-t border-border/60 bg-background px-4 py-3 md:hidden"
          aria-label="Мобильное меню"
        >
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                  active === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-secondary",
                )}
              >
                <span>{item.label}</span>
                {item.cadence && (
                  <span className="text-[10px] uppercase tracking-wide opacity-70">
                    {item.cadence}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
