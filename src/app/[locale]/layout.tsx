import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ErrorBoundary } from "@/components/monitoring/ErrorBoundary";
import "./globals.css";
import { getTranslations } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Layout.metadata" });

  return {
    title: {
      default: process.env.NEXT_PUBLIC_APP_NAME || t('titleDefault'),
      template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME || t('titleTemplate')}`,
    },
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || t('description'),
    keywords: ['saas', 'template', 'nextjs', 'stripe', 'supabase'],
    authors: [{ name: 'Your Name' }],
    creator: 'Your Name',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_APP_URL,
      title: process.env.NEXT_PUBLIC_APP_NAME || t('openGraphTitle'),
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || t('openGraphDescription'),
      siteName: process.env.NEXT_PUBLIC_APP_NAME || t('openGraphSiteName'),
    },
    twitter: {
      card: 'summary_large_image',
      title: process.env.NEXT_PUBLIC_APP_NAME || t('twitterTitle'),
      description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || t('twitterDescription'),
      creator: '@yourusername',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Vercel Analytics */}
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID && (
          <script
            defer
            src="https://unpkg.com/@vercel/analytics@1/dist/index.js"
            data-mode="auto"
          />
        )}
        
        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}