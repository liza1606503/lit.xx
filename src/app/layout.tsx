import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SessionProvider } from "@/components/site/session-provider";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

// Единый строгий нейтральный гротеск — без засечек, без декоративности.
// Весовая иерархия вместо разных семейств: 700 — заголовки, 400 — текст, 500 — UI.
const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
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
        className={`${ibmSans.variable} ${ibmMono.variable} antialiased bg-background text-foreground`}
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
