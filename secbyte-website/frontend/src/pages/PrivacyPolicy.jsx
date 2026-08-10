export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">legal --privacy</p>
      <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted">Last updated: January 2026</p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Information we collect</h2>
          <p className="mt-2">
            We collect information you provide directly — such as your name, email, phone number, and company
            details — when you submit a contact form, apply for a job, or chat with our assistant.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">How we use your information</h2>
          <p className="mt-2">
            We use your information to respond to enquiries, evaluate job applications, improve our services, and
            send relevant updates. We do not sell your personal data to third parties.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Cookies</h2>
          <p className="mt-2">
            We use cookies and similar technologies to understand site usage via tools like Google Analytics.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal data at any time by contacting
            us through the Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}