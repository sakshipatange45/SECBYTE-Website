export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">legal --terms</p>
      <h1 className="font-display text-4xl font-semibold text-ink">Terms & Conditions</h1>
      <p className="mt-4 text-sm text-muted">Last updated: January 2026</p>

      <div className="mt-10 space-y-8 text-muted">
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Use of this website</h2>
          <p className="mt-2">
            By using this website you agree to use it lawfully and not to attempt to disrupt, reverse-engineer, or
            misuse its content or systems, including the AI chatbot.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Service engagements</h2>
          <p className="mt-2">
            Any project undertaken with Secbyte Technologies is governed by a separate signed agreement or
            statement of work, which takes precedence over the general terms on this website.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Intellectual property</h2>
          <p className="mt-2">
            All content on this site — text, graphics, logos — is the property of Secbyte Technologies unless
            otherwise noted, and may not be reproduced without permission.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-ink">Limitation of liability</h2>
          <p className="mt-2">
            Secbyte Technologies is not liable for indirect or consequential damages arising from use of this
            website or its content.
          </p>
        </section>
      </div>
    </div>
  );
}