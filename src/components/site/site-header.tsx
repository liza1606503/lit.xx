"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/components/site/use-current-user";
import {
  IconFeed,
  IconContext,
  IconText,
  IconTelegraph,
  IconExhibitions,
  IconAbout,
  IconUser,
  IconLogout,
  IconLogin,
  IconMenu,
  IconClose,
  IconTrophy,
} from "@/components/site/sharp-icons";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/feed", label: "Лента", Icon: IconFeed },
  { href: "/context", label: "В контексте", Icon: IconContext },
  { href: "/text", label: "В тексте", Icon: IconText },
  { href: "/telegraph", label: "В телеграфе", Icon: IconTelegraph },
  { href: "/exhibitions", label: "Выставки", Icon: IconExhibitions },
  { href: "/about", label: "О платформе", Icon: IconAbout },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, loading } = useCurrentUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-3" aria-label="На главную">
          <span className="flex h-9 w-9 items-center justify-center bg-primary font-display text-xl text-primary-foreground">
            С
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg leading-none text-foreground">
              Слово и эпоха
            </span>
            <span className="mt-0.5 font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
              1940 — 1970-е
            </span>
          </span>
        </Link>

        {/* Десктоп-навигация */}
        <nav
          className="hidden items-stretch md:flex"
          aria-label="Главное меню"
        >
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 border-r border-border px-3 py-2 font-sans-ui text-sm font-medium transition-colors first:border-l",
                isActive(href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              <Icon size={14} className="shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Правая часть — пользователь */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/leaderboard"
            className={cn(
              "flex items-center gap-1.5 border border-border px-2.5 py-1.5 font-sans-ui text-xs font-medium transition-colors hover:border-primary",
              isActive("/leaderboard") && "border-primary bg-secondary",
            )}
          >
            <IconTrophy size={14} />
            Рейтинг
          </Link>
          {!loading && user ? (
            <>
              <Link
                href="/profile"
                className={cn(
                  "flex items-center gap-2 border border-border px-2.5 py-1.5 font-sans-ui text-xs font-medium transition-colors hover:border-primary",
                  isActive("/profile") && "border-primary bg-secondary",
                )}
              >
                <IconUser size={14} />
                <span className="max-w-[120px] truncate">{user.name}</span>
                <span className="tag-stamp tag-stamp-filled !px-1.5 !py-0 !text-[10px]">
                  {user.totalPoints}
                </span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Выйти"
              >
                <IconLogout size={16} />
              </Button>
            </>
          ) : !loading ? (
            <Link
              href="/auth/login"
              className="flex items-center gap-1.5 bg-primary px-3 py-1.5 font-sans-ui text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <IconLogin size={14} />
              Войти
            </Link>
          ) : null}
        </div>

        {/* Мобильное меню */}
        <button
          className="flex h-9 w-9 items-center justify-center border border-primary bg-primary text-primary-foreground md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <IconClose size={18} /> : <IconMenu size={18} />}
        </button>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <nav
          className="border-t border-border bg-background md:hidden"
          aria-label="Мобильное меню"
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="grid grid-cols-1">
              {navItems.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 border border-b-0 border-border px-3 py-2.5 font-sans-ui text-sm font-medium first:border-t",
                    isActive(href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground",
                  )}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
              <Link
                href="/leaderboard"
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 border border-b-0 border-border px-3 py-2.5 font-sans-ui text-sm font-medium",
                  isActive("/leaderboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground",
                )}
              >
                <IconTrophy size={16} />
                Рейтинг активности
              </Link>
              <div className="border border-border">
                {!loading && user ? (
                  <div className="grid grid-cols-2">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 border-r border-border px-3 py-2.5 font-sans-ui text-sm font-medium"
                    >
                      <IconUser size={16} />
                      <span className="truncate">{user.name}</span>
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex items-center gap-2 px-3 py-2.5 font-sans-ui text-sm font-medium"
                    >
                      <IconLogout size={16} />
                      Выйти
                    </button>
                  </div>
                ) : (
                  !loading && (
                    <Link
                      href="/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 font-sans-ui text-sm font-medium"
                    >
                      <IconLogin size={16} />
                      Войти / Зарегистрироваться
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
