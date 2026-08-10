import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { portfolio as fallbackPortfolio } from "../lib/data";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/portfolio")
      .then((res) => {
        if (res.data && res.data.length > 0) setPortfolio(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Seo title="Portfolio" description="Selected work from Secbyte Technologies." />
      <SectionHeading eyebrow="portfolio --list" title="Selected work" />
      {loading && <p className="mt-8 text-center text-sm text-muted">Loading portfolio...</p>}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {portfolio.map((p) => (
          <Link
            key={p.slug}
            to={`/portfolio/${p.slug}`}
            className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <p className="mb-3 font-mono text-xs tracking-wide text-accent">{p.industry}</p>
            <h3 className="font-display text-lg font-semibold text-ink">{p.projectName}</h3>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.technologiesUsed.map((t) => (
                <span key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted font-mono">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-1 text-sm text-accent opacity-0 transition-opacity group-hover:opacity-100">
              View case study <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}