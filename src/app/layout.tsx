import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Chatjeen — AI-Powered Anonymous Chat with Strangers",
    template: "%s | Chatjeen",
  },
  description: "Chatjeen matches you with real people globally using AI. 100% free anonymous chat for Gen-Z. No signup, no email, no awkward silence.",
  metadataBase: new URL("https://chatjeen.online"),
  alternates: {
    canonical: "https://chatjeen.online",
  },
  openGraph: {
    title: "Chatjeen — AI-Powered Anonymous Chat with Strangers",
    description: "Chatjeen matches you with real people globally using AI. 100% free anonymous chat for Gen-Z. No signup, no email, no awkward silence.",
    url: "https://chatjeen.online",
    siteName: "Chatjeen",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatjeen — AI-Powered Anonymous Chat",
    description: "Chatjeen is a 100% free, AI-powered anonymous text chat for Gen-Z.",
  },
  manifest: "/manifest.json",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased text-textPrimary bg-background">
        {children}

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
