import Link from "next/link";
import { Mail, MessageCircle, Shield, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="bg-background text-textPrimary min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://chatjeen.online" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://chatjeen.online/contact" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-3xl mx-auto w-full flex-1">
        <div className="space-y-3 mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            We&apos;re small.
            <span className="text-pop-gradient block">And we actually respond.</span>
          </h1>
          <p className="text-textMuted text-base max-w-lg mx-auto">
            Bug? Feature idea? Partnership? Safety concern? We read every message.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
          <a
            href="mailto:hello@chatjeen.online"
            className="bg-surface border border-border hover:border-primary rounded-[16px] p-6 flex items-start gap-4 transition-all group"
          >
            <div className="p-3 bg-primary/10 border border-primary rounded-[10px] shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="text-white font-semibold group-hover:text-primary transition-colors">Email Us</div>
              <div className="text-textMuted text-sm">hello@chatjeen.online</div>
              <div className="text-xs text-textMuted/60">General inquiries, partnerships</div>
            </div>
          </a>

          <a
            href="mailto:safety@chatjeen.online"
            className="bg-surface border border-border hover:border-primary rounded-[16px] p-6 flex items-start gap-4 transition-all group"
          >
            <div className="p-3 bg-primary/10 border border-primary rounded-[10px] shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="text-white font-semibold group-hover:text-primary transition-colors">Safety Reports</div>
              <div className="text-textMuted text-sm">safety@chatjeen.online</div>
              <div className="text-xs text-textMuted/60">Report abuse or safety concerns</div>
            </div>
          </a>
        </div>

        <div className="bg-surface border border-border rounded-[20px] p-8 space-y-5">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-white">Before you contact us</h2>
          </div>
          <div className="space-y-3 text-sm text-textMuted">
            <p>
              Check our{" "}
              <Link href="/faq" className="text-primary underline">FAQ</Link>{" "}
              — most common questions are answered there.
            </p>
            <p>
              For in-chat issues (inappropriate users, connection problems), use the Skip and Report buttons built into the chat. This is the fastest way to handle it.
            </p>
            <p>
              For urgent safety matters involving illegal content, contact us at{" "}
              <strong className="text-textPrimary">safety@chatjeen.online</strong> and we will respond as quickly as possible.
            </p>
          </div>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-[0_0_16px_rgba(124,58,237,0.3)] transition-all"
          >
            Try Chatjeen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
