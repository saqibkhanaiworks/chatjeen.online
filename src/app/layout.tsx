import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const BASE_URL = "https://chatjeen.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Chatjeen — Free Anonymous Chat With Strangers | AI-Powered",
    template: "%s | Chatjeen",
  },
  description:
    "Chat anonymously with strangers worldwide — no signup, no email, no tracking. AI matches you by interests in seconds. 100% free. The Omegle alternative built for Gen-Z.",
  keywords: [
    "anonymous chat",
    "chat with strangers",
    "random chat",
    "omegle alternative",
    "free anonymous chat",
    "talk to strangers",
    "online chat rooms",
    "chatjeen",
    "ai chat",
    "no signup chat",
  ],
  authors: [{ name: "Chatjeen", url: BASE_URL }],
  creator: "Chatjeen",
  publisher: "Chatjeen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Chatjeen — Free Anonymous Chat With Strangers | AI-Powered",
    description:
      "Chat anonymously with strangers worldwide. No signup, no email, no tracking. AI-matched by interests. 100% free. Start in one click.",
    url: BASE_URL,
    siteName: "Chatjeen",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chatjeen — Talk to Strangers. The Good Kind.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatjeen — Free Anonymous AI Chat",
    description:
      "No signup. No email. No tracking. AI matches you with compatible strangers worldwide. 100% free.",
    images: ["/icons/og-image.png"],
    creator: "@chatjeen",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#7C3AED",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="font-sans antialiased text-textPrimary bg-background">
        {children}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q4YNSNC58F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q4YNSNC58F');
          `}
        </Script>

        {/* Service Worker registration */}
        <Script id="service-worker" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(reg) {
                  console.log('SW registered:', reg.scope);
                }).catch(function(err) {
                  console.log('SW failed:', err);
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
