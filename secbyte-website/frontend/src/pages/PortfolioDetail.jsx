import { useParams, Link } from "react-router-dom";
import { portfolio } from "../lib/data";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = portfolio.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-ink">Project not found.</p>
        <Link to="/portfolio" className="mt-4 inline-block text-accent">Back to portfolio</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <p className="mb-4 font-mono text-xs tracking-wide text-accent">portfolio/{project.slug}</p>
      <h1 className="font-display text-4xl font-semibold text-ink">{project.projectName}</h1>
      <p className="mt-4 text-muted">{project.description}</p>

      <div className="mt-8 grid gap-6 rounded-lg border border-border bg-surface p-6 md:grid-cols-3">
        <div>
          <p className="text-xs text-muted">Client</p>
          <p className="mt-1 text-ink">{project.client}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Industry</p>
          <p className="mt-1 text-ink">{project.industry}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Technologies</p>
          <p className="mt-1 text-ink">{project.technologiesUsed.join(", ")}</p>
        </div>
      </div>

      <div className="mt-14 rounded-lg border border-border bg-surface p-8 text-center">
        <p className="font-display text-xl font-semibold text-ink">Have a similar project in mind?</p>
        <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-bg hover:bg-accent-dim">
          Talk to us
        </Link>
      </div>
    </div>
  );
}