import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, BrainCircuit, Lock } from "lucide-react";
import heroImage from "../assets/why2.png";

/* ---------------------------------------------
   Small custom hook: animates a number from 0 -> target
   once the element scrolls into view. No external lib needed.
---------------------------------------------- */
function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

export default function Hero() {
  const [threats, threatsRef] = useCountUp(500, 1600);
  const [uptime, uptimeRef] = useCountUp(999, 1600);

  return (
    <section className="relative overflow-hidden">
      {/* Background image with corporate-style overlay (solid, not flashy) */}
      <div className="absolute inset-0 bg-slate-950">
        <img
          src={heroImage}
          alt="Cybersecurity"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/90 to-bg/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            AI Powered Cybersecurity Solutions
          </span>

          <h1 className="text-shaded mt-6 text-5xl font-bold leading-tight lg:text-6xl">
            <span className="block">Protect Your Business With</span>
            <span className="block">Smart Cybersecurity</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            We help startups, enterprises and organizations build secure
            websites, cloud applications, AI solutions and enterprise software
            with security built into every layer.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary group">
              Get Started
              <ArrowRight
                size={18}
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link to="/services" className="btn-secondary">
              Explore Services
            </Link>
          </div>

          {/* Feature cards */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/90 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <ShieldCheck className="text-primary" />
              <span className="text-ink">Cyber Security</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/90 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10">
              <BrainCircuit className="text-accent" />
              <span className="text-ink">AI Development</span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/90 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-warning/50 hover:shadow-lg hover:shadow-warning/10">
              <Lock className="text-warning" />
              <span className="text-ink">Data Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate-style stats bar — full width, sits at the bottom of the
          hero like Infosys/TCS/Accenture homepages: clean numbers,
          vertical dividers, no extra motion or gimmicks. */}
      <div className="relative mt-16 border-t border-border bg-surface/60 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border px-6 py-10 sm:grid-cols-4">
          <div ref={threatsRef} className="px-4 text-center sm:text-left">
            <p className="text-3xl font-bold text-primary">{threats}+</p>
            <p className="mt-1 text-sm text-muted">Threats Blocked Daily</p>
          </div>
          <div ref={uptimeRef} className="px-4 text-center sm:text-left">
            <p className="text-3xl font-bold text-primary">
              {(uptime / 10).toFixed(1)}%
            </p>
            <p className="mt-1 text-sm text-muted">Uptime SLA</p>
          </div>
          <div className="px-4 text-center sm:text-left">
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="mt-1 text-sm text-muted">SOC Monitoring</p>
          </div>
          <div className="px-4 text-center sm:text-left">
            <p className="text-3xl font-bold text-primary">ISO 27001</p>
            <p className="mt-1 text-sm text-muted">Certified &amp; Compliant</p>
          </div>
        </div>
      </div>
    </section>
  );
}