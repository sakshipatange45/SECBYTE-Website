import { Star, Quote } from "lucide-react";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const gradients = [
  "from-purple-500 to-pink-500",
  "from-blue-500 to-cyan-400",
  "from-orange-400 to-rose-500",
  "from-emerald-400 to-teal-500",
];

export default function TestimonialCard({ testimonial }) {
  const { clientName, clientTitle, clientCompany, rating, message } = testimonial;
  const gradient = gradients[clientName.length % gradients.length];

  return (
    <div className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Quote className="mb-3 h-6 w-6 text-accent/40 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent/70" />

      <div className="mb-3 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-accent text-accent" : "text-border"}`}
          />
        ))}
      </div>

      <p className="flex-grow text-sm leading-7 text-muted">"{message}"</p>

      <div className="mt-6 flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110`}
        >
          {getInitials(clientName)}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{clientName}</p>
          <p className="text-xs text-muted">{clientTitle}, {clientCompany}</p>
        </div>
      </div>
    </div>
  );
}