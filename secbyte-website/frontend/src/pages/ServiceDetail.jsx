import { useParams, Link } from "react-router-dom";
import { services } from "../lib/data";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-ink">Service not found.</p>
        <Link to="/services" className="mt-4 inline-block text-accent">Back to services</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">services/{service.slug}</p>
      <h1 className="font-display text-4xl font-semibold text-ink">{service.title}</h1>
      <p className="mt-4 text-lg text-muted">{service.shortDescription}</p>

      <section className="mt-12">
        <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
        <p className="mt-3 text-muted">
          {service.overview}
        </p>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Process</h2>
          <ul className="mt-3 space-y-4">
            {service.process?.map((step, i) => (
              <li key={i}>
                <p className="text-sm font-semibold text-ink">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">Deliverables</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {service.deliverables?.map((item, i) => (
              <li key={i} className="text-sm text-muted">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-14 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-semibold text-ink">Interested in {service.title}?</p>
        <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold !text-white hover:bg-accent-dim hover:!text-white">
          Request a consultation
        </Link>
      </div>
    </div>
  );
}