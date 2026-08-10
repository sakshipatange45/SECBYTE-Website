import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  Sparkles,
  GraduationCap,
  Clock,
  Rocket,
  TrendingUp,
  FileText,
  MessagesSquare,
  Handshake,
  PartyPopper,
  Code2,
  ShieldCheck,
  GraduationCap as InternIcon,
  LayoutGrid,
} from "lucide-react";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { careers as fallbackCareers } from "../lib/data";

import learningImg from "../assets/careers/learning.jpg";
import flexibleImg from "../assets/careers/flexible.jpg";
import cultureImg from "../assets/careers/culture.jpg";
import ownershipImg from "../assets/careers/ownership.jpg";
import teamImg from "../assets/careers/team.jpg";

// Hero section background image — add this file to src/assets/careers/
import heroBgImg from "../assets/careers/careers_hero.jpg";

// Category block background images — add these files to src/assets/careers/
import categoryAllImg from "../assets/careers/team.jpg";
import categoryEngImg from "../assets/careers/culture.jpg";
import categoryCyberImg from "../assets/careers/flexible.jpg";
import categoryInternImg from "../assets/careers/ownership.jpg";

// Hero slideshow — cycles through these images automatically.
// Add/remove entries here to control what rotates through the hero.
const HERO_IMAGES = [heroBgImg, teamImg, cultureImg];

// "Why work with us" photo — cycles through these automatically.
const WHY_IMAGES = [teamImg, learningImg, flexibleImg, ownershipImg];

const DEPT_STYLES = {
  Engineering: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" },
  Cybersecurity: { bg: "bg-accent/10", text: "text-accent", border: "border-accent/30" },
  Design: { bg: "bg-secondary/10", text: "text-secondary", border: "border-secondary/30" },
  Sales: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
};
const DEFAULT_DEPT_STYLE = { bg: "bg-primary/10", text: "text-primary", border: "border-primary/30" };

const CATEGORY_BLOCKS = [
  {
    key: "All",
    label: "All Roles",
    icon: LayoutGrid,
    image: categoryAllImg,
  },
  {
    key: "Engineering",
    label: "Engineering",
    icon: Code2,
    image: categoryEngImg,
  },
  {
    key: "Cybersecurity",
    label: "Cybersecurity",
    icon: ShieldCheck,
    image: categoryCyberImg,
  },
  {
    key: "Internship",
    label: "Internships",
    icon: InternIcon,
    image: categoryInternImg,
  },
];

const HIRING_STEPS = [
  {
    icon: FileText,
    title: "Apply",
    description: "Send your resume and a short note on why you'd be a fit.",
  },
  {
    icon: MessagesSquare,
    title: "Interview",
    description: "A couple of conversations with the team — no trick questions.",
  },
  {
    icon: Handshake,
    title: "Offer",
    description: "We move fast. Most offers go out within a week of the final round.",
  },
  {
    icon: PartyPopper,
    title: "Onboard",
    description: "Get set up and start shipping real work in your first week.",
  },
];

const PERKS = [
  {
    icon: GraduationCap,
    title: "Learning & Growth",
    description: "Certifications, courses, and conference budget to keep leveling up.",
    image: learningImg,
  },
  {
    icon: Clock,
    title: "Flexible Work",
    description: "Remote-friendly with flexible hours built around real life.",
    image: flexibleImg,
  },
  {
    icon: Rocket,
    title: "Startup Culture",
    description: "Small team, flat hierarchy, and direct access to leadership from day one.",
    image: cultureImg,
  },
  {
    icon: TrendingUp,
    title: "Real Ownership",
    description: "Work directly on client projects that ship — not busywork.",
    image: ownershipImg,
  },
];

export default function Careers() {
  const [careers, setCareers] = useState(fallbackCareers);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [heroIndex, setHeroIndex] = useState(0);
  const [whyIndex, setWhyIndex] = useState(0);

  useEffect(() => {
    apiGet("/careers")
      .then((res) => {
        if (res.data && res.data.length > 0) setCareers(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Auto-rotate hero background image every 5s, with crossfade
  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate the "Why work with us" photo every 4s
  useEffect(() => {
    if (WHY_IMAGES.length <= 1) return;
    const timer = setInterval(() => {
      setWhyIndex((i) => (i + 1) % WHY_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredCareers = careers.filter((job) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Internship") return job.type === "Internship";
    return job.department === activeFilter;
  });

  const handleCategoryClick = (key) => {
    setActiveFilter(key);
    document.getElementById("open-positions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-bg min-h-screen">
      <Seo title="Careers" description="Open roles and internships at Secbyte Technologies." />

      <style>{`
        html { scroll-behavior: smooth; }

        .job-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .job-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 30px -12px rgba(0,0,0,0.14);
        }
        .arrow-btn { transition: background 0.2s ease, transform 0.2s ease; }
        .job-card:hover .arrow-btn { transform: translateX(2px); }

        .perk-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .perk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 28px -14px rgba(0,0,0,0.14);
        }
        .step-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 28px -14px rgba(0,0,0,0.14);
        }
        .step-card:hover .step-icon { transform: scale(1.1); }
        .step-icon { transition: transform 0.25s ease; }

        .category-block {
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
        }
        .category-block:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 30px -14px rgba(0,0,0,0.28);
        }
        .category-block.is-active {
          outline: 3px solid rgba(0,0,0,0.15);
          outline-offset: 2px;
        }
        .category-img {
          transition: transform 0.5s ease;
        }
        .category-block:hover .category-img {
          transform: scale(1.08);
        }

        .hero-slide {
          transition: opacity 1.2s ease-in-out;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none; }
          .hero-slide { transition: none; }
        }
      `}</style>

      {/* ================= HERO (light-overlay, boxed-content style — matches About page hero) ================= */}
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden lg:min-h-[480px]">
        {/* Rotating background images with crossfade */}
        {HERO_IMAGES.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="Secbyte Technologies"
            className="hero-slide absolute inset-0 -z-10 h-full w-full object-cover"
            style={{ opacity: idx === heroIndex ? 1 : 0 }}
          />
        ))}

        {/* Light overlay — fades from solid white on the left into the photo,
            so dark text stays readable while the image shows through on the right */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 28%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.08) 68%, rgba(255,255,255,0) 82%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10 sm:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 42%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 92%)",
          }}
        />

        {/* Slide indicator dots */}
        {HERO_IMAGES.length > 1 && (
          <div className="absolute bottom-6 left-6 z-10 flex gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show slide ${idx + 1}`}
                onClick={() => setHeroIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === heroIndex ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
                }`}
              />
            ))}
          </div>
        )}

        <div className="relative mx-auto w-full max-w-6xl px-6 py-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-ink shadow-sm">
              <Sparkles size={14} />
              We're hiring
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-ink lg:text-5xl">
              Work that means impact
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-muted">
              Open roles and internships across the team. Don't see a fit?
              Send your resume through the Contact page anyway.
            </p>

            <div className="mt-8 flex">
              <a href="#open-positions" className="btn-primary inline-flex items-center gap-2">
                View open roles
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Mobile-only card — stacks below the CTA instead of floating */}
            <div className="mt-8 max-w-sm rounded-2xl bg-bg p-5 shadow-xl sm:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
                <Rocket size={12} />
                Now Hiring
              </span>
              <h3 className="mt-3 text-sm font-bold leading-snug text-ink">
                Join a team that ships real work from day one
              </h3>
              <a
                href="#open-positions"
                className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
              >
                See open roles ↗
              </a>
            </div>
          </div>
        </div>

        {/* Floating info card — desktop/tablet only, matches the About page hero card */}
        <div className="absolute bottom-6 right-6 z-10 hidden w-64 rounded-2xl bg-bg p-5 shadow-xl sm:block">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">
            <Rocket size={12} />
            Now Hiring
          </span>
          <h3 className="mt-3 text-sm font-bold leading-snug text-ink">
            Join a team that ships real work from day one
          </h3>
          <a
            href="#open-positions"
            className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
          >
            See open roles ↗
          </a>
        </div>
      </section>

      {/* ================= CATEGORY BLOCKS (Infosys style) ================= */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_BLOCKS.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`category-block fade-up relative flex h-36 flex-col items-start justify-between overflow-hidden rounded-2xl p-5 text-left ${isActive ? "is-active" : ""}`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {/* Background image */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="category-img absolute inset-0 h-full w-full object-cover"
                />
                {/* Branded overlay — matches hero treatment for a cohesive feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-primary/25" />

                {/* Content on top */}
                <Icon className="relative z-10 text-white" size={24} />
                <span className="relative z-10 text-base font-bold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ================= HIRING PROCESS ================= */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-shaded text-3xl font-bold lg:text-4xl">
            How hiring works
          </h2>
          <p className="mt-3 text-muted">
            Simple, fast, and no unnecessary rounds.
          </p>
        </div>

        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-border lg:block" />

          {HIRING_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="step-card fade-up relative rounded-2xl border border-border bg-surface2 p-6"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="step-icon relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Icon size={20} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY WORK WITH US ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-shaded text-3xl font-bold lg:text-4xl">
              Why work with us
            </h2>
            <p className="mt-3 text-muted">
              A small team, real projects, and room to grow fast.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {PERKS.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <div
                    key={perk.title}
                    className="perk-card fade-up rounded-2xl border border-border bg-surface2 p-5"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="mt-3 text-sm font-bold text-ink">{perk.title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-muted">{perk.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Single rotating photo — cycles through the team/culture shots automatically */}
          <div className="relative h-64 overflow-hidden rounded-3xl lg:h-[360px]">
            {WHY_IMAGES.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt="Secbyte team"
                className="hero-slide absolute inset-0 h-full w-full object-cover"
                style={{ opacity: idx === whyIndex ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />

            {/* Slide indicator dots */}
            {WHY_IMAGES.length > 1 && (
              <div className="absolute right-6 top-6 z-10 flex gap-1.5">
                {WHY_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Show photo ${idx + 1}`}
                    onClick={() => setWhyIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === whyIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}

            <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles size={14} />
              Life at Secbyte
            </span>

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm leading-6 text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
                "We ship real client work from week one — no busywork, no
                bureaucracy."
              </p>
              <p className="mt-3 text-xs font-medium text-white/80">— Secbyte team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LISTINGS ================= */}
      <section id="open-positions" className="mx-auto max-w-4xl px-6 pb-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-ink">
            Open Positions
            {activeFilter !== "All" && (
              <span className="ml-2 text-base font-normal text-muted">
                — {CATEGORY_BLOCKS.find((c) => c.key === activeFilter)?.label}
              </span>
            )}
          </h2>
          {loading && <span className="text-xs text-muted">Loading openings…</span>}
        </div>

        {activeFilter !== "All" && (
          <button
            onClick={() => setActiveFilter("All")}
            className="mb-6 text-sm font-medium text-primary hover:underline"
          >
            Clear filter
          </button>
        )}

        <div className="space-y-4">
          {filteredCareers.map((job, i) => {
            const style = DEPT_STYLES[job.department] || DEFAULT_DEPT_STYLE;
            return (
              <Link
                key={job.slug}
                to={`/careers/${job.slug}`}
                className="job-card fade-up group flex flex-col gap-4 rounded-2xl border border-border bg-surface2 p-6 hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${style.bg} ${style.text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-ink">{job.title}</h3>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${style.bg} ${style.text} ${style.border}`}>
                        {job.department}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5" /> {job.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" /> {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`arrow-btn flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full sm:self-center ${style.bg} ${style.text} group-hover:bg-primary group-hover:text-white`}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {!loading && filteredCareers.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-ink">No open positions right now</h2>
            <p className="mt-2 text-sm text-muted">
              Check back soon, or send your resume via the Contact page.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}