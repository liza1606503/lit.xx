"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  IconLogin,
  IconArrowRight,
  IconArrowDown,
} from "@/components/site/sharp-icons";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Слишком короткий пароль",
        description: "Минимум 6 символов",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirm) {
      toast({
        title: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Ошибка регистрации");
      }

      // Автоматический вход
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        toast({
          title: "Аккаунт создан",
          description: "Войдите, используя свои данные",
        });
        router.push("/auth/login");
      } else {
        toast({
          title: "Добро пожаловать!",
          description: "Аккаунт создан, вы вошли в систему",
        });
        router.push("/profile");
        router.refresh();
      }
    } catch (e) {
      toast({
        title: "Ошибка регистрации",
        description: e instanceof Error ? e.message : "Попробуйте ещё раз",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="border-2 border-primary bg-card">
        <div className="border-b border-primary bg-primary/5 px-6 py-4">
          <div className="flex items-center gap-2">
            <IconLogin size={18} className="text-primary" />
            <span className="font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
              Регистрация
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            Создать аккаунт
          </h1>
          <p className="mt-1 font-serif text-sm text-muted-foreground">
            Нужна, чтобы сохранять результаты микро-тестов и попадать в
            рейтинг активности.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="grid gap-2">
            <Label
              htmlFor="name"
              className="font-sans-ui text-xs font-bold uppercase tracking-widest"
            >
              Имя
            </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-border font-serif"
              placeholder="Как вас зовут"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="font-sans-ui text-xs font-bold uppercase tracking-widest"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-border font-serif"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="password"
              className="font-sans-ui text-xs font-bold uppercase tracking-widest"
            >
              Пароль
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border font-serif"
              placeholder="Минимум 6 символов"
            />
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="confirm"
              className="font-sans-ui text-xs font-bold uppercase tracking-widest"
            >
              Повторите пароль
            </Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border-border font-serif"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary font-sans-ui font-bold uppercase tracking-widest text-primary-foreground"
          >
            {loading ? "Создаём аккаунт…" : "Зарегистрироваться"}
            {!loading && <IconArrowRight size={16} className="ml-2" />}
          </Button>

          <div className="mt-2 flex items-center justify-center gap-2 font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
            <IconArrowDown size={12} />
            уже есть аккаунт?
            <IconArrowDown size={12} className="rotate-180" />
          </div>

          <Link
            href="/auth/login"
            className="border-2 border-primary px-4 py-2.5 text-center font-sans-ui text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Войти
          </Link>
        </form>
      </div>

      <Link
        href="/"
        className="mt-4 text-center font-sans-ui text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
      >
        ← Вернуться на главную
      </Link>
    </div>
  );
}
