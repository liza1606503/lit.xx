import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import {
  IconTrophy,
  IconQuiz,
  IconArrowRight,
  IconContext,
  IconText,
  IconTelegraph,
} from "@/components/site/sharp-icons";

export const metadata = {
  title: "Профиль — Слово и эпоха",
};

const contentTypeConfig = {
  post: { label: "Пост-факт", Icon: IconContext },
  podcast: { label: "Подкаст", Icon: IconText },
  article: { label: "Статья", Icon: IconTelegraph },
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login?callbackUrl=/profile");
  }

  // Загружаем полные данные пользователя и его результаты
  const dbUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      testResults: {
        orderBy: { completedAt: "desc" },
        take: 50,
      },
    },
  });

  if (!dbUser) {
    redirect("/auth/login");
  }

  // Позиция в рейтинге
  const higherCount = await db.user.count({
    where: { totalPoints: { gt: dbUser.totalPoints } },
  });
  const totalUsers = await db.user.count();
  const rank = higherCount + 1;

  return (
    <div>
      {/* Заголовок */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <span className="tag-stamp">Профиль</span>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            {dbUser.name}
          </h1>
          <p className="mt-2 font-serif text-base text-muted-foreground">
            {dbUser.email}
          </p>
        </div>
      </section>

      {/* Статистика */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Баллы */}
            <div className="border-2 border-primary bg-card p-6">
              <div className="mb-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
                Всего баллов
              </div>
              <div className="font-display text-5xl text-primary">
                {dbUser.totalPoints}
              </div>
            </div>

            {/* Пройдено тестов */}
            <div className="border-2 border-accent bg-card p-6">
              <div className="mb-2 flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-accent">
                <IconQuiz size={14} />
                Пройдено тестов
              </div>
              <div className="font-display text-5xl text-accent">
                {dbUser.testsPassed}
              </div>
            </div>

            {/* Место в рейтинге */}
            <div className="border-2 border-primary bg-primary p-6 text-primary-foreground">
              <div className="mb-2 flex items-center gap-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground/85">
                <IconTrophy size={14} />
                Место в рейтинге
              </div>
              <div className="font-display text-5xl text-primary-foreground">
                #{rank}
              </div>
              <div className="mt-1 font-serif text-sm text-primary-foreground/85">
                Из {totalUsers} участников платформы
              </div>
              <Link
                href="/leaderboard"
                className="mt-3 inline-flex items-center gap-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground underline underline-offset-2"
              >
                Смотреть рейтинг
                <IconArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* История тестов */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="tag-stamp">История</span>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                Пройденные тесты
              </h2>
            </div>
            <span className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
              {dbUser.testResults.length} записей
            </span>
          </div>

          {dbUser.testResults.length === 0 ? (
            <div className="border border-dashed border-border bg-card p-8 text-center">
              <p className="font-serif text-base text-muted-foreground">
                Вы ещё не проходили микро-тесты. Откройте любой материал —
                в конце будет тест на 3 вопроса.
              </p>
              <Link
                href="/feed"
                className="mt-4 inline-flex items-center gap-1.5 bg-primary px-4 py-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
              >
                Открыть ленту
                <IconArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden border border-border bg-card">
              <table className="w-full text-left">
                <thead className="border-b border-border bg-secondary/60">
                  <tr>
                    <th className="px-4 py-3 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Материал
                    </th>
                    <th className="hidden px-4 py-3 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:table-cell">
                      Тип
                    </th>
                    <th className="px-4 py-3 text-right font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Результат
                    </th>
                    <th className="hidden px-4 py-3 text-right font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:table-cell">
                      Дата
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dbUser.testResults.map((result) => {
                    const config =
                      contentTypeConfig[result.contentType as keyof typeof contentTypeConfig] ??
                      contentTypeConfig.post;
                    const Icon = config.Icon;
                    const percent = Math.round(
                      (result.score / result.totalQuestions) * 100,
                    );
                    return (
                      <tr
                        key={result.id}
                        className="border-b border-border last:border-b-0"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Icon
                              size={14}
                              className="shrink-0 text-primary"
                            />
                            <span className="font-serif text-sm text-foreground">
                              {result.contentTitle}
                            </span>
                          </div>
                        </td>
                        <td className="hidden px-4 py-3 sm:table-cell">
                          <span className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-display text-base text-primary">
                            {result.score}
                            <span className="text-muted-foreground">
                              /{result.totalQuestions}
                            </span>
                          </span>
                          <span className="ml-2 font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
                            {percent}%
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-right font-sans-ui text-xs text-muted-foreground sm:table-cell">
                          {new Date(result.completedAt).toLocaleDateString(
                            "ru-RU",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
