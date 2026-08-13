import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ArrowUpRight,
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Seo from "../components/Seo";
import Hero from "../components/Hero";
import IntroZoom from "../components/IntroZoom";
import ServiceCard from "../components/ServiceCard";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import AnimatedCounter from "../components/AnimatedCounter";
import TiltCard from "../components/TiltCard";
import SecurityScanWidget from "../components/SecurityScanWidget";
import useInView from "../hooks/useInView";
import { services, highlights, whyChooseUs, testimonials } from "../lib/data";
import { apiGet } from "../lib/api";
import whyChooseUsImage from "../assets/why.png";

function RevealSection({ children, className = "" }) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Blob({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-accent/10 blur-3xl ${className}`}
    />
  );
}

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    apiGet("/blog")
      .then((res) => setBlogPosts((res.data || []).slice(0, 3)))
      .catch(() => setBlogPosts([]));
  }, []);

  const [statsRef, statsInView] = useInView();

  const goToPrevTestimonial = () =>
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToNextTestimonial = () =>
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);

  return (
    <>
      {/* One-time zoom-in / zoom-out reveal, plays once on load */}
      <IntroZoom />

      <Seo
        title="Home"
        description="Cybersecurity-first web, software, mobile, cloud, and AI development for startups, SMBs, and enterprises."
      />

      {/* Everything below shares the same bg-bg background and has no
          hard border-y/border-b dividers between sections, so the page
          reads as one continuous surface instead of stacked boxes. */}
      <div className="bg-bg">
        <Hero />

        {/* Company highlights */}
        <section>
          <div
            ref={statsRef}
            className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4"
          >
            {highlights.map((h, i) => (
              <div
                key={h.label}
                className={`transition-all duration-700 ease-out ${
                  statsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <StatCard
                  label={h.label}
                  value={<AnimatedCounter value={h.value} isInView={statsInView} />}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Services overview */}
        <section className="relative overflow-hidden">
          <Blob className="-left-20 top-10 h-72 w-72" />
          <Blob className="-right-20 bottom-10 h-72 w-72" />
          <RevealSection className="relative mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              title="What we build"
              description="Eight practice areas, one team, so security and delivery never trade off against each other."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <div key={s.slug} style={{ transitionDelay: `${i * 50}ms` }}>
                  <TiltCard>
                    <ServiceCard service={s} />
                  </TiltCard>
                </div>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Live security scan demo */}
        <section>
          <RevealSection className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading
              title="See it in action"
              description="A simulated look at how our security scans identify and neutralize threats in real time."
            />
            <div className="mt-12">
              <SecurityScanWidget />
            </div>
          </RevealSection>
        </section>

        {/* Why choose us */}
        <section>
          <RevealSection className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading title="Why teams choose Secbyte" />
            <div className="mt-12 grid gap-12 lg:grid-cols-2 items-center">
              {/* Left: List */}
              <div className="grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map((item, i) => (
                  <div
                    key={item}
                    className="group flex items-center gap-3 rounded-md border border-border bg-surface px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-sm text-ink">{item}</span>
                  </div>
                ))}
              </div>

              {/* Right: Image */}
              <div className="group overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={whyChooseUsImage}
                  alt="Why teams choose Secbyte"
                  className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </RevealSection>
        </section>


        {/* Testimonials — single large featured card, auto-rotating,
            with a quote mark, star rating, avatar initials, and
            side arrow navigation instead of a plain 3-column grid. */}
        <section className="relative overflow-hidden">
          <Blob className="left-1/2 top-0 h-96 w-96 -translate-x-1/2" />
          <RevealSection className="relative mx-auto max-w-4xl px-6 py-24">
            <SectionHeading title="What clients say" />

            <div className="relative mt-12">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-10 shadow-xl md:p-14">
                <Quote className="h-10 w-10 text-accent/30" />

                {/* Star rating */}
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (testimonials[activeTestimonial].rating || 5)
                          ? "fill-accent text-accent"
                          : "fill-none text-border"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-6 text-lg leading-8 text-ink md:text-xl">
                  "{testimonials[activeTestimonial].message}"
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-semibold text-accent">
                    {getInitials(testimonials[activeTestimonial].clientName)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {testimonials[activeTestimonial].clientName}
                    </p>
                    <p className="text-xs text-muted">
                      {testimonials[activeTestimonial].clientTitle},{" "}
                      {testimonials[activeTestimonial].clientCompany}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow navigation */}
              <button
                type="button"
                onClick={goToPrevTestimonial}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-ink shadow-md transition-colors duration-300 hover:border-accent hover:text-accent md:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goToNextTestimonial}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-ink shadow-md transition-colors duration-300 hover:border-accent hover:text-accent md:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeTestimonial ? "w-6 bg-accent" : "w-2 bg-border"
                  }`}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Latest blogs — image-led cards instead of plain text blocks */}
        <section>
          <RevealSection className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading title="From the blog" />
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
                >
                  {/* Thumbnail — falls back to a neutral placeholder if
                      the post object doesn't provide an `image` field */}
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-xs font-medium tracking-wide text-accent">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{post.excerpt}</p>

                    <div className="mt-6 flex items-center gap-1 text-sm font-medium text-accent transition-all duration-300 group-hover:gap-2">
                      Read more <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* Contact CTA */}
        <section className="relative overflow-hidden">
          <Blob className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2" />
          <RevealSection className="relative mx-auto max-w-6xl px-6 py-24 text-center">
            <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
              Ready to talk about your project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Book a free consultation and we'll come back with a scoped plan within two business days.
            </p>
            <Link
              to="/contact"
              className="group relative mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold !text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-accent-dim hover:!text-white"
            >
              <span className="absolute inset-0 -z-10 rounded-md bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60" />
              Book a Free Consultation
            </Link>
          </RevealSection>
        </section>
      </div>
    </>
  );
}
