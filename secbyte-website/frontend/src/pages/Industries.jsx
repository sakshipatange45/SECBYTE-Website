import SectionHeading from "../components/SectionHeading";

const industries = [
  "Startups", "Small & Medium Businesses", "Enterprise Clients", "Educational Institutions",
  "Healthcare Organizations", "E-commerce Businesses", "Government Organizations",
];

export default function Industries() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading eyebrow="industries --served" title="Industries we serve" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {industries.map((ind) => (
          <div key={ind} className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-ink">{ind}</h3>
            <p className="mt-2 text-sm text-muted">
              Tailored engagement models and compliance awareness specific to {ind.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}