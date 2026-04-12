import { Suspense } from "react";
import type { Metadata } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { AnalyticsPageTracker } from "@/components/consent/AnalyticsPageTracker";
import { buildDefaultMetadata } from "@/lib/seo/metadata";
import { ConsentScriptGate } from "@/components/consent/ConsentScriptGate";

const displayFont = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  ...buildDefaultMetadata(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <Providers>
          {children}
          <ConsentScriptGate />
          <Suspense fallback={null}>
            <AnalyticsPageTracker />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
