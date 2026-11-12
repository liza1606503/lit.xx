import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const quizSchema = z.object({
  contentType: z.enum(["post", "podcast", "article"]),
  contentId: z.string().min(1),
  contentTitle: z.string().min(1),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
});

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Необходимо войти в аккаунт" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parsed = quizSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные теста" },
        { status: 400 },
      );
    }

    const { contentType, contentId, contentTitle, score, totalQuestions } =
      parsed.data;

    // Проверяем — не проходил ли уже этот тест по этому материалу
    const existing = await db.testResult.findFirst({
      where: {
        userId: user.id,
        contentType,
        contentId,
      },
    });

    if (existing) {
      // Если уже есть результат — обновляем только если новый лучше
      if (score > existing.score) {
        const updated = await db.testResult.update({
          where: { id: existing.id },
          data: { score, totalQuestions, completedAt: new Date() },
        });
        // Пересчитываем totalPoints: разница в баллах
        const delta = score - existing.score;
        if (delta > 0) {
          await db.user.update({
            where: { id: user.id },
            data: {
              totalPoints: { increment: delta },
            },
          });
        }
        return NextResponse.json({ ok: true, result: updated, updated: true });
      }
      return NextResponse.json({ ok: true, result: existing, noChange: true });
    }

    // Новый результат
    const result = await db.testResult.create({
      data: {
        userId: user.id,
        contentType,
        contentId,
        contentTitle,
        score,
        totalQuestions,
      },
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        totalPoints: { increment: score },
        testsPassed: { increment: 1 },
      },
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Quiz submit error:", error);
    return NextResponse.json(
      { error: "Не удалось сохранить результат" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ results: [] });
    }

    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get("contentType");
    const contentId = searchParams.get("contentId");

    if (contentType && contentId) {
      const result = await db.testResult.findFirst({
        where: {
          userId: user.id,
          contentType,
          contentId,
        },
      });
      return NextResponse.json({ result });
    }

    const results = await db.testResult.findMany({
      where: { userId: user.id },
      orderBy: { completedAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Quiz get error:", error);
    return NextResponse.json(
      { error: "Не удалось получить результаты" },
      { status: 500 },
    );
  }
}
