"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/components/site/use-current-user";
import { getQuizForContent, type MicroQuiz } from "@/lib/quizzes";
import {
  IconQuiz,
  IconCheck,
  IconArrowRight,
  IconLogin,
  IconSparkle,
} from "@/components/site/sharp-icons";
import { toast } from "sonner";

interface MicroQuizProps {
  contentId: string;
  contentType: "post" | "podcast" | "article";
  contentTitle: string;
}

type Phase = "intro" | "in-progress" | "result";

interface SavedResult {
  score: number;
  totalQuestions: number;
}

export function MicroQuiz({
  contentId,
  contentType,
  contentTitle,
}: MicroQuizProps) {
  const { user, loading } = useCurrentUser();
  const quiz: MicroQuiz = getQuizForContent(contentId, contentType);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  // Загрузить существующий результат, если пользователь залогинен
  useEffect(() => {
    if (!user) {
      setSavedResult(null);
      return;
    }
    let cancelled = false;
    fetch(`/api/quiz?contentType=${contentType}&contentId=${contentId}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.result) {
          setSavedResult({
            score: data.result.score,
            totalQuestions: data.result.totalQuestions,
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user, contentType, contentId]);

  const start = () => {
    setPhase("in-progress");
    setCurrentIdx(0);
    setAnswers([]);
    setSavedMessage(null);
  };

  const answer = (optionIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIdx] = optionIdx;
      return next;
    });
  };

  const score = quiz.questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0,
  );

  const finish = async () => {
    setPhase("result");

    if (!user) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          contentId,
          contentTitle,
          score,
          totalQuestions: quiz.questions.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (data.updated) {
        toast.success("Результат улучшен и сохранён в профиль");
      } else if (data.noChange) {
        toast.info("Предыдущий результат был лучше — он и остаётся");
      } else {
        toast.success("Результат сохранён в профиль");
      }
      setSavedResult({
        score: data.result.score,
        totalQuestions: data.result.totalQuestions,
      });
      setSavedMessage(
        `Сохранено в профиль · всего баллов: ${user.totalPoints + score}`,
      );
    } catch {
      toast.error("Не удалось сохранить результат");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (currentIdx + 1 >= quiz.questions.length) {
      finish();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const restart = () => {
    setPhase("intro");
    setAnswers([]);
    setCurrentIdx(0);
    setSavedMessage(null);
  };

  const currentQuestion = quiz.questions[currentIdx];

  return (
    <section
      className="mt-8 border border-primary bg-card"
      aria-labelledby="micro-quiz-title"
    >
      {/* Шапка */}
      <div className="flex items-center justify-between border-b border-primary bg-primary/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <IconQuiz size={18} className="text-primary" />
          <h3
            id="micro-quiz-title"
            className="font-sans-ui text-sm font-bold uppercase tracking-widest text-primary"
          >
            Микро-тест
          </h3>
        </div>
        <span className="font-sans-ui text-[10px] uppercase tracking-widest text-muted-foreground">
          {quiz.questions.length} вопроса · {quiz.questions.length} балл
          {quiz.questions.length > 1 ? "а" : ""}
        </span>
      </div>

      <div className="p-5">
        {/* INTRO */}
        {phase === "intro" && (
          <div className="flex flex-col gap-4">
            <p className="font-serif text-base leading-relaxed text-foreground">
              Короткий тест по материалу — на {quiz.questions.length}{" "}
              вопроса. За каждый правильный ответ — один балл в рейтинг
              активности.
            </p>

            {savedResult && (
              <div className="border border-border bg-secondary p-3">
                <div className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
                  Ваш прошлый результат
                </div>
                <div className="mt-1 font-display text-xl text-primary">
                  {savedResult.score} из {savedResult.totalQuestions}
                </div>
              </div>
            )}

            {loading ? (
              <div className="h-10 w-40 animate-pulse bg-muted" />
            ) : !user ? (
              <div className="border border-dashed border-primary/40 bg-primary/5 p-4">
                <p className="font-serif text-sm text-foreground">
                  Чтобы результат попал в рейтинг,{" "}
                  <Link
                    href="/auth/register"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    зарегистрируйтесь
                  </Link>{" "}
                  или{" "}
                  <Link
                    href="/auth/login"
                    className="font-bold text-primary underline underline-offset-2"
                  >
                    войдите
                  </Link>
                  . Без аккаунта тоже можно пройти — просто баллы не
                  сохранятся.
                </p>
              </div>
            ) : null}

            <Button
              onClick={start}
              className="w-fit bg-primary font-sans-ui font-bold uppercase tracking-widest text-primary-foreground"
            >
              Начать тест
              <IconArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        )}

        {/* IN PROGRESS */}
        {phase === "in-progress" && currentQuestion && (
          <div className="flex flex-col gap-5">
            <div className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
              Вопрос {currentIdx + 1} из {quiz.questions.length}
            </div>
            <h4 className="font-display text-xl leading-snug text-foreground">
              {currentQuestion.question}
            </h4>
            <div className="grid gap-2">
              {currentQuestion.options.map((opt, i) => {
                const selected = answers[currentIdx] === i;
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    className={cn(
                      "flex items-start gap-3 border p-3 text-left font-serif text-sm transition-colors",
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center border font-sans-ui text-xs font-bold",
                        selected
                          ? "border-primary-foreground text-primary-foreground"
                          : "border-primary text-primary",
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-foreground">{opt}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-sans-ui text-xs text-muted-foreground">
                {answers[currentIdx] === undefined
                  ? "Выберите вариант ответа"
                  : "Ответ принят"}
              </span>
              <Button
                onClick={next}
                disabled={answers[currentIdx] === undefined}
                className="bg-primary font-sans-ui font-bold uppercase tracking-widest text-primary-foreground"
              >
                {currentIdx + 1 >= quiz.questions.length ? "Завершить" : "Далее"}
                <IconArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && (
          <div className="flex flex-col gap-4">
            <div className="border-2 border-primary bg-primary/5 p-5 text-center">
              <div className="font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
                Ваш результат
              </div>
              <div className="mt-1 font-display text-4xl text-primary">
                {score} / {quiz.questions.length}
              </div>
              <div className="mt-1 font-serif text-sm text-foreground/80">
                {score === quiz.questions.length
                  ? "Все ответы верны"
                  : score >= quiz.questions.length / 2
                    ? "Хороший результат"
                    : "Можно лучше — попробуйте ещё раз"}
              </div>
            </div>

            {/* Разбор ответов */}
            <div className="grid gap-3">
              {quiz.questions.map((q, qi) => {
                const userAnswer = answers[qi];
                const isCorrect = userAnswer === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "border p-3",
                      isCorrect
                        ? "border-primary/40 bg-primary/5"
                        : "border-destructive/40 bg-destructive/5",
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center",
                          isCorrect
                            ? "bg-primary text-primary-foreground"
                            : "bg-destructive text-white",
                        )}
                      >
                        {isCorrect ? (
                          <IconCheck size={12} />
                        ) : (
                          <span className="text-xs">×</span>
                        )}
                      </span>
                      <div className="flex-1">
                        <div className="font-serif text-sm font-bold text-foreground">
                          {q.question}
                        </div>
                        <div className="mt-1 font-serif text-xs text-muted-foreground">
                          Правильный ответ:{" "}
                          <span className="font-bold text-primary">
                            {q.options[q.correctIndex]}
                          </span>
                        </div>
                        {userAnswer !== undefined &&
                          userAnswer !== q.correctIndex && (
                            <div className="mt-0.5 font-serif text-xs text-muted-foreground">
                              Ваш ответ:{" "}
                              <span className="text-destructive">
                                {q.options[userAnswer]}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Сохранение / CTA */}
            {!user ? (
              <div className="border border-dashed border-primary bg-primary/5 p-4">
                <div className="flex items-center gap-2 font-sans-ui text-xs uppercase tracking-widest text-primary">
                  <IconSparkle size={14} />
                  Хотите в рейтинг?
                </div>
                <p className="mt-1 font-serif text-sm text-foreground">
                  Зарегистрируйтесь — и баллы за этот и следующие тесты
                  будут сохраняться в вашем профиле.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/auth/register"
                    className="flex items-center gap-1.5 bg-primary px-3 py-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary-foreground"
                  >
                    <IconLogin size={14} />
                    Зарегистрироваться
                  </Link>
                  <Link
                    href="/auth/login"
                    className="border border-primary px-3 py-1.5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary"
                  >
                    Войти
                  </Link>
                </div>
              </div>
            ) : submitting ? (
              <div className="font-sans-ui text-sm text-muted-foreground">
                Сохраняем результат…
              </div>
            ) : savedMessage ? (
              <div className="flex items-center gap-2 border border-primary/40 bg-secondary p-3 font-sans-ui text-xs uppercase tracking-widest text-primary">
                <IconCheck size={14} />
                {savedMessage}
              </div>
            ) : null}

            <Button
              onClick={restart}
              variant="outline"
              className="w-fit border-primary font-sans-ui font-bold uppercase tracking-widest text-primary"
            >
              Пройти заново
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
