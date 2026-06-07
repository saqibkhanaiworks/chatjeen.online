import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LAST_UPDATED = "June 1, 2025";

export default function PrivacyPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://chatjeen.online/privacy" },
            ],
          }),
        }}
      />
      <Header />

      <main className="pt-32 pb-20 px-4 max-w-3xl mx-auto w-full flex-1">
        <div className="space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Legal</p>
          <h1 className="text-4xl font-bold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-textMuted text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-textMuted text-[15px] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Our Privacy Commitment</h2>
            <p>
              Chatjeen is built on a core principle: <strong className="text-white">anonymity by design</strong>. We collect
              the absolute minimum data necessary to operate the service and keep your conversations private. We do not
              sell your data, build advertising profiles, or share personal information with third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Information We Collect</h2>
            <h3 className="text-base font-semibold text-textPrimary">What we do NOT collect:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Your real name, email address, or phone number</li>
              <li>Your IP address (we do not log or store it)</li>
              <li>Chat message content (conversations are ephemeral)</li>
              <li>Device identifiers or persistent cookies tied to identity</li>
              <li>Location data beyond what you voluntarily share in chat</li>
            </ul>
            <h3 className="text-base font-semibold text-textPrimary mt-4">What we DO collect:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><strong className="text-textPrimary">Nicknames</strong>: Optional, stored only in your browser&apos;s localStorage</li>
              <li><strong className="text-textPrimary">Session data</strong>: Temporary matchmaking data deleted when you disconnect</li>
              <li><strong className="text-textPrimary">Analytics</strong>: Anonymized page view and traffic data via Vercel Analytics (no personal identifiers)</li>
              <li><strong className="text-textPrimary">Error logs</strong>: Technical error reports used to fix bugs (no user content)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Chat Data & Message Content</h2>
            <p>
              Your chat messages are <strong className="text-white">not stored</strong> on our servers. Conversations pass
              through our WebSocket infrastructure in real time and are permanently deleted when either party disconnects.
              We use AI to moderate content in real time, but this moderation happens transiently — the content is not logged
              or retained.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">AI & Content Moderation</h2>
            <p>
              Chatjeen uses Google&apos;s Gemini AI API to generate icebreakers and perform content moderation. Content sent
              for moderation is processed transiently and is subject to{" "}
              <a
                href="https://ai.google.dev/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google&apos;s AI API Terms
              </a>
              . We do not send identifying information with moderation requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Cookies & Local Storage</h2>
            <p>
              We use your browser&apos;s <code className="text-primary">localStorage</code> to save your optional nickname between
              sessions. This data never leaves your device. We do not use persistent tracking cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Third-Party Services</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><strong className="text-textPrimary">Vercel</strong>: Hosting and analytics (anonymized)</li>
              <li><strong className="text-textPrimary">Google Analytics</strong>: Anonymized traffic analytics</li>
              <li><strong className="text-textPrimary">Google Gemini API</strong>: AI features (transient processing)</li>
              <li><strong className="text-textPrimary">Socket.io</strong>: Real-time chat infrastructure (ephemeral)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Your Rights</h2>
            <p>
              Since we don&apos;t store personal data tied to your identity, there is nothing to access, correct, or delete.
              Your anonymity is our default, not an option you have to request.
            </p>
            <p>
              If you believe we have inadvertently collected your personal data, or if you have any privacy concerns,
              please contact us through the{" "}
              <Link href="/contact" className="text-primary underline">
                Contact page
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Children&apos;s Privacy</h2>
            <p>
              Chatjeen is not directed at children under 13. We do not knowingly collect information from children. If
              you are a parent or guardian and believe your child has used Chatjeen, please contact us immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
              &quot;Last updated&quot; date. We encourage you to review this page periodically.
            </p>
          </section>

          <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/terms" className="text-primary text-sm underline hover:opacity-80">
              Terms of Service →
            </Link>
            <Link href="/contact" className="text-primary text-sm underline hover:opacity-80">
              Contact Us →
            </Link>
            <Link href="/safety" className="text-primary text-sm underline hover:opacity-80">
              Safety Guide →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
