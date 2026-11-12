import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Слово и эпоха — литературный процесс 1940–1970-х",
  description:
    "Образовательная платформа о литературном процессе 1940–1970-х годов: окопная проза, блокадная поэзия, эстрадная и тихая лирика, авторская песня, андеграунд. Подкасты, статьи, посты и поп-ап выставки.",
  keywords: [
    "литература XX века",
    "советская поэзия",
    "оттепель",
    "самиздат",
    "авторская песня",
    "эстрадная лирика",
    "тихая лирика",
    "окопная проза",
    "образовательная платформа",
  ],
  authors: [{ name: "Проект «Слово и эпоха»" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
