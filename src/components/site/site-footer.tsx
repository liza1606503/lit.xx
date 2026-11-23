import Link from "next/link";

const footerSections = [
  {
    title: "Разделы",
    links: [
      { href: "/feed", label: "Лента" },
      { href: "/context", label: "В контексте" },
      { href: "/text", label: "В тексте" },
      { href: "/telegraph", label: "В телеграфе" },
    ],
  },
  {
    title: "Платформа",
    links: [
      { href: "/exhibitions", label: "Новости" },
      { href: "/leaderboard", label: "Рейтинг" },
      { href: "/about", label: "О платформе" },
    ],
  },
  {
    title: "Аккаунт",
    links: [
      { href: "/auth/login", label: "Войти" },
      { href: "/auth/register", label: "Зарегистрироваться" },
      { href: "/profile", label: "Профиль" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-primary bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Левая колонка — название */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center bg-primary font-display text-xl text-primary-foreground">
                С
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl leading-none text-foreground">
                  Слово и эпоха
                </span>
                <span className="mt-1 font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                  1940 — 1970-е
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-md font-serif text-sm leading-relaxed text-muted-foreground">
              Образовательная платформа о литературном процессе 1940–1970-х
              годов. Посты-факты, подкасты, статьи и поп-ап выставки —
              одна эпоха, несколько голосов.
            </p>
          </div>

          {/* Ссылки */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footerSections.map((section) => (
              <div key={section.title}>
                <div className="mb-3 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-primary">
                  {section.title}
                </div>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-serif text-sm text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 font-sans-ui text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© Слово и эпоха. Образовательная платформа.</span>
          <span className="font-serif italic">
            Сделано для тех, кто читает внимательно.
          </span>
        </div>
      </div>
    </footer>
  );
}
