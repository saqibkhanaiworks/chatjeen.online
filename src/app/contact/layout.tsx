import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Chatjeen — Get in Touch With Our Team",
  description:
    "Have a question, bug report, or partnership inquiry? Contact the Chatjeen team. We're small, fast, and actually read our messages.",
  alternates: { canonical: "https://chatjeen.online/contact" },
  openGraph: {
    title: "Contact | Chatjeen",
    description: "Have a question or feedback? Get in touch with the Chatjeen team.",
    url: "https://chatjeen.online/contact",
    siteName: "Chatjeen",
    type: "website",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630, alt: "Contact Chatjeen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Chatjeen",
    description: "Have a question or feedback? Get in touch with the Chatjeen team.",
    images: ["/icons/og-image.png"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
