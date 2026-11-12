import type { Metadata } from "next";
import { PT_Serif, PT_Sans, Ruslan_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/site/session-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const ruslanDisplay = Ruslan_Display({
  variable: "--font-ruslan",
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Слово и эпоха — литературный процесс 1940–1970-х",
  description:
    "Образовательная платформа о литературном процессе 1940–1970-х годов: посты-факты, подкасты, статьи и поп-ап выставки. Микро-тесты после каждого материала, рейтинг активности.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${ptSerif.variable} ${ptSans.variable} ${ruslanDisplay.variable} antialiased bg-background text-foreground`}
      >
        <SessionProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </SessionProvider>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
