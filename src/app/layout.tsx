import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { Cursor } from "@/components/Cursor";
import { PageLoader } from "@/components/PageLoader";
import { SectionIndicator } from "@/components/SectionIndicator";

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Whitespace Solutions | Turn Whitespaces into Winning Spaces",
  description: "Whitespace Solutions is a management consulting and strategic advisory firm combining elite strategy with custom AI software execution.",
  keywords: ["Consulting", "Management Consulting", "Jakarta", "Indonesia", "AI Software", "Strategic Advisory", "M&A", "Turnaround", "Operator Execution"],
  authors: [{ name: "Whitespace Solutions" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="id"
      className={`${libreBaskerville.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <LanguageProvider>
          <PageLoader />
          <SectionIndicator />
          <div className="noise-overlay" />
          <Cursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
