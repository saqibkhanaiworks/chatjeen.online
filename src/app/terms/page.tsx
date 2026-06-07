import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LAST_UPDATED = "June 1, 2025";

export default function TermsPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://chatjeen.online/terms" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-3xl mx-auto w-full flex-1">
        <div className="space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="text-4xl font-bold text-white tracking-tight">Terms of Service</h1>
          <p className="text-textMuted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-8 text-textMuted text-[15px] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Agreement to Terms</h2>
            <p>
              By accessing or using Chatjeen (&quot;the Service&quot;) at{" "}
              <Link href="/" className="text-primary underline">
                chatjeen.online
              </Link>
              , you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may
              not access the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Who Can Use Chatjeen</h2>
            <p>
              Chatjeen is intended for users who are <strong className="text-white">18 years of age or older</strong>.
              By using Chatjeen, you represent that you are at least 18 years old. Users between 13–17 may only use
              Chatjeen with parental consent and supervision. Users under 13 are not permitted to use Chatjeen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Acceptable Use Policy</h2>
            <p>You agree NOT to use Chatjeen to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              <li>Send, post, or share illegal content of any kind</li>
              <li>Share sexually explicit content involving minors (CSAM) — this is a criminal offense</li>
              <li>Harass, bully, threaten, or abuse other users</li>
              <li>Spam, send unsolicited commercial messages, or phishing links</li>
              <li>Impersonate other people or entities</li>
              <li>Attempt to circumvent our AI content moderation systems</li>
              <li>Use automated bots or scripts to interact with the platform</li>
              <li>Collect or harvest personal information from other users</li>
              <li>Conduct any activity that disrupts or interferes with the Service</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Content & Conduct</h2>
            <p>
              Chatjeen provides a platform for real-time anonymous communication. You are solely responsible for
              content you share during chats. While we use AI moderation, we cannot guarantee that all content shared
              by other users will comply with our guidelines. Use the Skip and Report buttons to protect yourself.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Intellectual Property</h2>
            <p>
              The Chatjeen name, logo, and all related branding are the property of Chatjeen. The software, design,
              and code that powers Chatjeen are proprietary. You may not copy, modify, distribute, or create derivative
              works without explicit written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Disclaimer of Warranties</h2>
            <p>
              Chatjeen is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not guarantee
              that the Service will be uninterrupted, secure, or free of errors. We are not responsible for the content
              or conduct of other users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Chatjeen shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to the Service immediately, without prior notice, for
              conduct that we determine violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will update the &quot;Last updated&quot; date at the
              top of this page. Continued use of Chatjeen after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Contact</h2>
            <p>
              Questions about these Terms? Visit our{" "}
              <Link href="/contact" className="text-primary underline">
                Contact page
              </Link>
              .
            </p>
          </section>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/privacy" className="text-primary text-sm underline hover:opacity-80">
              Privacy Policy →
            </Link>
            <Link href="/safety" className="text-primary text-sm underline hover:opacity-80">
              Safety Guide →
            </Link>
            <Link href="/faq" className="text-primary text-sm underline hover:opacity-80">
              FAQ →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
