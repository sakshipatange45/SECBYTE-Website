import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export default function ServiceCard({ service }) {
  const Icon = service.icon || ShieldCheck;
  const imageUrl = service.coverImage || service.image;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl"
    >
      {/* Top Image */}
      {imageUrl && (
        <div className="relative h-36 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        </div>
      )}

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:bg-accent/20" />

      <div className="relative z-10 flex h-full flex-col p-6">
        {/* Icon */}
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white">
          <Icon size={28} />
        </div>

        {/* Category */}
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {service.slug}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-ink transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-3 flex-grow text-sm leading-7 text-muted line-clamp-3">
          {service.shortDescription}
        </p>

        {/* Button */}
        <div className="mt-6 inline-flex items-center gap-2 font-medium text-accent transition-all duration-300 group-hover:gap-3">
          Learn More
          <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}