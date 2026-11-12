"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast({
          title: "Ошибка входа",
          description: "Проверьте email и пароль",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Вы вошли в аккаунт",
        });
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (e) {
      toast({
        title: "Ошибка входа",
        description: "Попробуйте ещё раз",
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
              Вход в аккаунт
            </span>
          </div>
          <h1 className="mt-2 font-display text-3xl text-foreground">
            С возвращением
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-sans-ui text-xs font-bold uppercase tracking-widest">
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-border font-serif"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 bg-primary font-sans-ui font-bold uppercase tracking-widest text-primary-foreground"
          >
            {loading ? "Входим…" : "Войти"}
            {!loading && <IconArrowRight size={16} className="ml-2" />}
          </Button>

          <div className="mt-2 flex items-center justify-center gap-2 font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
            <IconArrowDown size={12} />
            или
            <IconArrowDown size={12} className="rotate-180" />
          </div>

          <Link
            href="/auth/register"
            className="border-2 border-primary px-4 py-2.5 text-center font-sans-ui text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Зарегистрироваться
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
