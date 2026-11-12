import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { IconTrophy, IconArrowRight } from "@/components/site/sharp-icons";

export const metadata = {
  title: "Рейтинг активности — Слово и эпоха",
};

function getRankBadge(rank: number) {
  if (rank === 1) return { label: "1 место", class: "bg-primary text-primary-foreground" };
  if (rank === 2) return { label: "2 место", class: "bg-accent text-accent-foreground" };
  if (rank === 3) return { label: "3 место", class: "bg-secondary text-secondary-foreground border border-primary" };
  return null;
}

export default async function LeaderboardPage() {
  const currentUser = await getCurrentUser();

  // Топ-50 по баллам
  const top = await db.user.findMany({
    orderBy: [{ totalPoints: "desc" }, { testsPassed: "desc" }],
    take: 50,
    select: {
      id: true,
      name: true,
      totalPoints: true,
      testsPassed: true,
    },
  });

  const totalUsers = await db.user.count();

  return (
    <div>
      {/* Заголовок */}
      <section className="border-b-2 border-primary bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex items-center gap-2">
            <IconTrophy size={20} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Рейтинг активности
            </span>
          </div>
          <h1 className="mt-3 font-display text-5xl text-foreground md:text-6xl">
            Самые активные
          </h1>
          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-foreground/80">
            За каждый правильный ответ в микро-тесте — один балл. Топ-50
            участников по сумме баллов. Места обновляются в реальном
            времени по мере прохождения тестов.
          </p>
        </div>
      </section>

      {/* Топ-3 — крупные карточки */}
      {top.length > 0 && (
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid gap-4 md:grid-cols-3">
              {top.slice(0, 3).map((user, idx) => {
                const rank = idx + 1;
                const isCurrentUser = currentUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    className={
                      rank === 1
                        ? "border-2 border-primary bg-primary p-6 text-primary-foreground"
                        : rank === 2
                          ? "border-2 border-accent bg-accent p-6 text-accent-foreground"
                          : "border-2 border-primary bg-card p-6"
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-4xl">
                        #{rank}
                      </span>
                      <IconTrophy
                        size={24}
                        className={
                          rank === 1
                            ? "text-primary-foreground"
                            : rank === 2
                              ? "text-accent-foreground"
                              : "text-primary"
                        }
                      />
                    </div>
                    <div className="mt-3 font-display text-2xl">
                      {user.name}
                      {isCurrentUser && (
                        <span className="ml-2 font-sans-ui text-[10px] uppercase tracking-widest opacity-70">
                          это вы
                        </span>
                      )}
                    </div>
                    <div className="mt-2 font-display text-3xl">
                      {user.totalPoints}
                      <span className="font-sans-ui text-sm font-normal opacity-70">
                        {" "}
                        баллов
                      </span>
                    </div>
                    <div className="mt-1 font-sans-ui text-xs uppercase tracking-widest opacity-70">
                      {user.testsPassed} тестов пройдено
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Полная таблица */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="tag-stamp">Топ-{Math.min(50, totalUsers)}</span>
              <h2 className="mt-3 font-display text-3xl text-foreground md:text-4xl">
                Полный рейтинг
              </h2>
            </div>
            <span className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
              {totalUsers} участников
            </span>
          </div>

          {top.length === 0 ? (
            <div className="border border-dashed border-border bg-card p-8 text-center">
              <p className="font-serif text-base text-muted-foreground">
                В рейтинге пока никого нет. Будьте первым — пройдите
                микро-тест после любого материала.
              </p>
              {!currentUser && (
                <Link
                  href="/auth/register"
                  className="mt-4 inline-flex items-center gap-1.5 bg-primary px-4 py-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
                >
                  Зарегистрироваться
                  <IconArrowRight size={14} />
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-hidden border border-border bg-card">
              <table className="w-full text-left">
                <thead className="border-b border-border bg-secondary/60">
                  <tr>
                    <th className="w-12 px-4 py-3 text-center font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      №
                    </th>
                    <th className="px-4 py-3 font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Участник
                    </th>
                    <th className="hidden px-4 py-3 text-right font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:table-cell">
                      Тестов
                    </th>
                    <th className="px-4 py-3 text-right font-sans-ui text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Баллов
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {top.map((user, idx) => {
                    const rank = idx + 1;
                    const isCurrentUser = currentUser?.id === user.id;
                    return (
                      <tr
                        key={user.id}
                        className={
                          isCurrentUser
                            ? "border-b border-border last:border-b-0 bg-primary/10"
                            : "border-b border-border last:border-b-0"
                        }
                      >
                        <td className="px-4 py-3 text-center">
                          <span className="font-display text-lg text-primary">
                            {rank}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-serif text-sm text-foreground">
                            {user.name}
                          </span>
                          {isCurrentUser && (
                            <span className="ml-2 font-sans-ui text-[10px] uppercase tracking-widest text-primary">
                              это вы
                            </span>
                          )}
                        </td>
                        <td className="hidden px-4 py-3 text-right font-sans-ui text-sm text-muted-foreground sm:table-cell">
                          {user.testsPassed}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="font-display text-lg text-primary">
                            {user.totalPoints}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!currentUser && top.length > 0 && (
            <div className="mt-6 border-2 border-dashed border-primary/40 bg-primary/5 p-5 text-center">
              <p className="font-serif text-base text-foreground">
                Хотите попасть в рейтинг? Зарегистрируйтесь — и баллы за
                микро-тесты будут сохраняться в вашем профиле.
              </p>
              <Link
                href="/auth/register"
                className="mt-3 inline-flex items-center gap-1.5 bg-primary px-4 py-2 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
              >
                Создать аккаунт
                <IconArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
