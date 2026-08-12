import { useEffect, useRef, useState } from "react";
import Seo from "../components/Seo";
import aboutHero from "../assets/about-hero.jpg";
import { useNavigate } from "react-router-dom";

/* ==========================================================================
   LOGO — hexagonal shield + circuit-node monogram, draws itself on mount
   ========================================================================== */
function SecbyteLogo({ size = 56 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className="logo-draw"
    >
      <path
        d="M50 4 L90 24 L90 56 C90 78 72 92 50 98 C28 92 10 78 10 56 L10 24 Z"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        className="logo-path logo-path-1"
      />
      <path
        d="M50 24 V42 M50 42 H32 M50 42 H68 M32 42 V58 M68 42 V58 M32 58 H44 M68 58 H56 M44 58 V72 M56 58 V72"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        className="logo-path logo-path-2"
      />
      <circle cx="50" cy="24" r="3" fill="var(--color-accent)" className="logo-node n1" />
      <circle cx="32" cy="42" r="3" fill="var(--color-accent)" className="logo-node n2" />
      <circle cx="68" cy="42" r="3" fill="var(--color-accent)" className="logo-node n3" />
      <circle cx="44" cy="72" r="3" fill="var(--color-signal)" className="logo-node n4" />
      <circle cx="56" cy="72" r="3" fill="var(--color-signal)" className="logo-node n5" />
    </svg>
  );
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const icons = {
  shield: (
    <path d="M12 3 L20 6.5 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6.5 Z M9 11.5 L11 13.5 L15.5 9" />
  ),
  code: <path d="M8 5 L2 12 L8 19 M16 5 L22 12 L16 19" />,
  handshake: (
    <path d="M2 10 L7 6 L11 9 L13 9 L17 6 L22 10 M7 6 L7 15 M17 6 L17 15 M11 9 L9 13 L13 15 L15 13" />
  ),
  check: <path d="M4 12 L9 17 L20 6" />,
  lock: <path d="M6 11 V7 a6 6 0 0 1 12 0 v4 M4 11 h16 v10 H4 Z" />,
  radar: <path d="M12 12 L12 3 M12 12 L19 8 M12 12 L19 16 M12 12 L12 21 M12 12 L5 16 M12 12 L5 8" />,
  bolt: <path d="M13 2 L4 14 h6 l-1 8 9-12 h-6 z" />,
};

function Icon({ name, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

const stats = [
  { value: "2+", label: "Years of Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "90+", label: "Happy Clients" },
  { value: "12+", label: "Industries Served" },
];

const values = [
  {
    icon: "shield",
    title: "Security First",
    text: "Every build starts with a threat model, not an afterthought bolted on before launch.",
  },
  {
    icon: "code",
    title: "Engineering Excellence",
    text: "Clean, documented, maintainable code — built to outlast whoever wrote it.",
  },
  {
    icon: "handshake",
    title: "Transparent Partnership",
    text: "You see the roadmap, the risks, and the reasoning, not just the invoice.",
  },
];

const process = [
  "Certified security & engineering professionals",
  "Secure development practices from day one",
  "Clear communication at every milestone",
  "Post-launch support, not a one-time handoff",
];

/* ==========================================================================
   HERO VISUAL — fully animated, no image. A "live network under watch"
   scene: orbiting nodes, connecting pulses, scanning sweep, glitch-y HUD
   ticks. Fills its grid cell completely (no background image anywhere).
   ========================================================================== */
const heroNodes = [
  { x: 150, y: 90, r: 5, delay: 0 },
  { x: 70, y: 150, r: 4, delay: 0.4 },
  { x: 230, y: 150, r: 4, delay: 0.8 },
  { x: 100, y: 230, r: 3.5, delay: 1.2 },
  { x: 200, y: 230, r: 3.5, delay: 1.6 },
  { x: 150, y: 280, r: 5, delay: 2 },
  { x: 40, y: 210, r: 3, delay: 0.6 },
  { x: 260, y: 210, r: 3, delay: 1.0 },
];

const heroLinks = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 6], [2, 7], [6, 3], [7, 4],
];

function HeroVisual() {
  return (
    <div className="hero-visual">
      <svg viewBox="0 0 300 320" className="hero-visual-svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="300" height="320" fill="url(#heroGlow)" />

        {/* rotating scan rings */}
        <g className="hero-rings" transform="translate(150,160)">
          <circle r="60" fill="none" stroke="var(--color-accent)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 6" />
          <circle r="100" fill="none" stroke="var(--color-accent)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="2 8" />
        </g>
        <g className="hero-rings-rev" transform="translate(150,160)">
          <circle r="130" fill="none" stroke="var(--color-signal)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="1 10" />
        </g>

        {/* radar sweep */}
        <g transform="translate(150,160)" className="hero-sweep">
          <path d="M0 0 L0 -130 A130 130 0 0 1 40 -124 Z" fill="var(--color-accent)" opacity="0.14" />
        </g>

        {/* connecting lines */}
        {heroLinks.map(([a, b], i) => {
          const A = heroNodes[a];
          const B = heroNodes[b];
          return (
            <line
              key={i}
              x1={A.x} y1={A.y} x2={B.x} y2={B.y}
              stroke="var(--color-accent)"
              strokeOpacity="0.35"
              strokeWidth="1"
              className="hero-link"
              style={{ animationDelay: `${(i % 6) * 0.3}s` }}
            />
          );
        })}

        {/* traveling pulses along a few links */}
        {heroLinks.slice(0, 5).map(([a, b], i) => {
          const A = heroNodes[a];
          const B = heroNodes[b];
          return (
            <circle key={`p-${i}`} r="2.2" fill="var(--color-signal)" className="hero-pulse">
              <animateMotion
                dur={`${3 + i * 0.6}s`}
                repeatCount="indefinite"
                path={`M${A.x} ${A.y} L${B.x} ${B.y}`}
                begin={`${i * 0.5}s`}
              />
            </circle>
          );
        })}

        {/* nodes */}
        {heroNodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x} cy={n.y} r={n.r + 6}
              fill="var(--color-accent)"
              opacity="0.12"
              className="hero-node-halo"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeWidth="1.6"
              className="hero-node"
              style={{ animationDelay: `${n.delay}s` }}
            />
          </g>
        ))}

        {/* central shield glyph */}
        <g transform="translate(150,160)" className="hero-shield">
          <path
            d="M0 -34 L26 -22 V4 C26 24 12 36 0 42 C-12 36 -26 24 -26 4 V-22 Z"
            fill="var(--color-bg)"
            stroke="var(--color-signal)"
            strokeWidth="2"
          />
          <path d="M-9 2 L-2 10 L11 -8" stroke="var(--color-signal)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      {/* HUD corner ticks + scanline overlay, pure CSS, fills the box */}
      <div className="hero-hud">
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />
        <div className="hud-tag hud-tag-1">STATUS: SECURE</div>
        <div className="hud-tag hud-tag-2">MONITORING…</div>
        <div className="hero-scanline" />
      </div>
    </div>
  );
}

/* ==========================================================================
   DEFENSE LAYERS — concentric rings, hover/click to inspect each layer
   ========================================================================== */
const defenseLayers = [
  { id: 0, name: "Perimeter Security", desc: "Firewalls, DDoS protection, and network-edge filtering stop threats before they reach your infrastructure.", radius: 130 },
  { id: 1, name: "Application Security", desc: "Secure coding practices, input validation, and dependency audits close the gaps attackers look for.", radius: 100 },
  { id: 2, name: "Data Encryption", desc: "End-to-end encryption in transit and at rest, so intercepted data stays unreadable.", radius: 70 },
  { id: 3, name: "Access Control", desc: "Zero-trust identity checks and least-privilege access limit what any single credential can touch.", radius: 40 },
];

function DefenseLayersDiagram() {
  const [active, setActive] = useState(0);
  const activeLayer = defenseLayers.find((l) => l.id === active);

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <svg viewBox="0 0 300 300" className="w-full max-w-[320px]">
            <circle cx="150" cy="150" r="145" fill="none" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="2 4" />

            {defenseLayers.map((layer) => (
              <g key={layer.id}>
                <circle
                  cx="150"
                  cy="150"
                  r={layer.radius}
                  fill={active === layer.id ? "color-mix(in srgb, var(--color-accent) 14%, transparent)" : "transparent"}
                  stroke="var(--color-accent)"
                  strokeWidth={active === layer.id ? 3 : 1.2}
                  opacity={active === layer.id ? 1 : 0.35}
                  className="defense-ring"
                  onMouseEnter={() => setActive(layer.id)}
                  onClick={() => setActive(layer.id)}
                  style={{ cursor: "pointer" }}
                />
                <circle
                  cx="150"
                  cy={150 - layer.radius}
                  r="10"
                  fill={active === layer.id ? "var(--color-accent)" : "var(--color-bg)"}
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  className="ring-badge"
                  onMouseEnter={() => setActive(layer.id)}
                  onClick={() => setActive(layer.id)}
                  style={{ cursor: "pointer" }}
                />
                <text
                  x="150"
                  y={150 - layer.radius}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={active === layer.id ? "white" : "var(--color-accent)"}
                  style={{ pointerEvents: "none" }}
                >
                  {layer.id + 1}
                </text>
              </g>
            ))}

            <circle cx="150" cy="150" r="8" fill="var(--color-accent)" className="defense-core" />
          </svg>
        </div>

        <div className="min-h-[140px]">
          {activeLayer && (
            <div key={activeLayer.id} className="fade-in-layer">
              <p className="text-xs font-mono text-accent mb-2">Layer 0{activeLayer.id + 1}</p>
              <h3 className="text-xl font-semibold text-ink mb-3">{activeLayer.name}</h3>
              <p className="text-muted leading-relaxed">{activeLayer.desc}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {defenseLayers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setActive(layer.id)}
            onMouseEnter={() => setActive(layer.id)}
            className={`layer-tab flex items-center gap-2 rounded-md border px-3 py-2.5 text-left transition-all duration-300 ${
              active === layer.id
                ? "border-accent bg-accent/10"
                : "border-border bg-bg hover:border-accent/50"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-mono font-bold transition-colors duration-300 ${
                active === layer.id ? "bg-accent text-white" : "bg-surface text-accent border border-accent/40"
              }`}
            >
              {layer.id + 1}
            </span>
            <span className={`text-xs font-medium transition-colors duration-300 ${active === layer.id ? "text-accent" : "text-muted"}`}>
              {layer.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   LIVE THREAT INTELLIGENCE — animated counters, slowly ticking
   ========================================================================== */
function useLiveCounter(base, incrementRange, intervalMs) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * incrementRange) + 1);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [incrementRange, intervalMs]);
  return value;
}

function ThreatIntelPanel() {
  const [ref, visible] = useReveal();
  const blocked = useLiveCounter(482910, 3, 2200);
  const scans = useLiveCounter(15720, 1, 3500);

  return (
    <div ref={ref} className={`panel reveal ${visible ? "reveal-in" : ""} overflow-hidden`}>
      <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
        <div className="p-6 text-center">
          <Icon name="bolt" className="w-6 h-6 text-signal mx-auto mb-3" />
          <div className="text-2xl md:text-3xl font-bold text-accent font-mono tabular-nums">
            {blocked.toLocaleString()}
          </div>
          <div className="text-muted text-xs mt-2 uppercase tracking-wide">Threats blocked to date</div>
        </div>
        <div className="p-6 text-center">
          <Icon name="radar" className="w-6 h-6 text-signal mx-auto mb-3" />
          <div className="text-2xl md:text-3xl font-bold text-accent font-mono tabular-nums">
            {scans.toLocaleString()}
          </div>
          <div className="text-muted text-xs mt-2 uppercase tracking-wide">Vulnerability scans run</div>
        </div>
        <div className="p-6 text-center">
          <Icon name="lock" className="w-6 h-6 text-signal mx-auto mb-3" />
          <div className="text-2xl md:text-3xl font-bold text-accent font-mono">99.98%</div>
          <div className="text-muted text-xs mt-2 uppercase tracking-wide">Client uptime average</div>
        </div>
      </div>
      <div className="border-t border-border px-6 py-3 flex items-center gap-2 bg-surface">
        <span className="live-dot" />
        <span className="text-xs text-muted font-mono">Live security metrics, updated continuously</span>
      </div>
    </div>
  );
}

export default function About() {
  const heroRef = useRef(null);
   const navigate = useNavigate();

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12;
      const y = (e.clientY / innerHeight - 0.5) * 12;
      el.style.setProperty("--px", `${x}px`);
      el.style.setProperty("--py", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <Seo title="About Us" description="Learn about Secbyte Technologies — our values, process, and team." />

      <div className="grid-bg min-h-screen" ref={heroRef}>
        <div className="content mx-auto max-w-6xl px-6 pb-24">

          {/* Hero Section — full-bleed background image, content overlaid on top */}
          
  

                
            

      <Reveal>
  <section className="blog-style-hero">

    {/* Background */}
    <div className="blog-hero-bg">
      <img
        src={aboutHero}
        alt="Secbyte Technologies team"
      />
    </div>

    {/* Light overlay for text contrast, fading into the photo */}
    <div className="blog-hero-overlay" />

    {/* Content */}
    <div className="blog-hero-content">
      <span className="blog-hero-badge">About Us</span>

      <h1>
        Sharp solutions for
        <br />
        modern businesses
      </h1>

      <p>
        We're your strategic partner in navigating the complex world of
        technology — cybersecurity, web development, software development,
        and digital marketing.
      </p>

<button className="hero-primary-btn" onClick={() => navigate("/contact")}>
   Discover Our Story
        <span>→</span>
      </button>
    </div>

    {/* Floating info card */}
    <div className="blog-hero-card">
      <span className="blog-hero-card-tag">
        <Icon name="shield" className="w-3.5 h-3.5" />
        Security First
      </span>
      <h3>150+ projects delivered securely</h3>
      <a href="#" className="blog-hero-card-link">
        Know more ↗
      </a>
    </div>

  </section>
</Reveal>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-20">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="card text-center py-8">
                  <div className="text-3xl md:text-4xl font-bold text-accent font-mono">
                    {s.value}
                  </div>
                  <div className="text-muted text-sm mt-2">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          

          {/* Live Threat Intelligence */}
          <Reveal>
            <span className="eyebrow" data-index="02">
              Live Metrics
            </span>
            <h2 className="text-ink text-3xl font-bold mt-3 mb-10">
              Security isn't a claim, it's a number
            </h2>
          </Reveal>
          <div className="mb-20">
            <ThreatIntelPanel />
          </div>

          {/* Defense Layers */}
          <Reveal>
            <span className="eyebrow" data-index="03">
              Our Approach
            </span>
            <h2 className="text-ink text-3xl font-bold mt-3 mb-10">
              Defense in depth, not a single wall
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="card mb-20">
              <DefenseLayersDiagram />
            </div>
          </Reveal>

          {/* Values */}
          <Reveal>
            <span className="eyebrow" data-index="04">
              Values
            </span>
            <h2 className="text-ink text-3xl font-bold mt-3 mb-10">
              What guides how we build
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="card h-full group">
                  <Icon name={v.icon} className="w-8 h-8 text-signal mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-ink">{v.title}</h3>
                  <p className="text-muted text-sm leading-relaxed transition-colors duration-300 group-hover:text-ink">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Process */}
          <Reveal>
            <span className="eyebrow" data-index="05">
              Process
            </span>
            <h2 className="text-ink text-3xl font-bold mt-3 mb-10">How we work</h2>
          </Reveal>
          <div className="panel divide-y divide-border">
            {process.map((item, i) => (
              <Reveal key={item} delay={i * 70} className="!transform-none">
                <div className="flex items-center gap-4 py-4 group">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full border border-accent-dim shrink-0 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/10">
                    <Icon name="check" className="w-4 h-4 text-accent" />
                  </span>
                  <span className="text-ink transition-colors duration-300 group-hover:text-accent">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-24">
            <h2 className="text-ink text-2xl font-bold mb-4">
              Ready to build something secure?
            </h2>
<button className="btn-primary" onClick={() => navigate("/contact")}>Get Free Consultation</button>
          </Reveal>
        </div>

        <style>{`
          .grid-bg {
            background-position: calc(50% + var(--px, 0px)) calc(50% + var(--py, 0px));
            transition: background-position 0.2s ease-out;
          }

          .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          .reveal-in {
            opacity: 1;
            transform: translateY(0);
          }

          .logo-draw .logo-path {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: draw 1.4s ease forwards;
          }
          .logo-draw .logo-path-2 {
            animation-delay: 0.3s;
          }
          .logo-draw .logo-node {
            opacity: 0;
            transform-origin: center;
            animation: pop 0.4s ease forwards;
            animation-delay: 1.2s;
          }
          .logo-draw .n2 { animation-delay: 1.3s; }
          .logo-draw .n3 { animation-delay: 1.3s; }
          .logo-draw .n4 { animation-delay: 1.5s; }
          .logo-draw .n5 { animation-delay: 1.5s; }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes pop {
            from { opacity: 0; transform: scale(0); }
            to { opacity: 1; transform: scale(1); }
          }

          /* ---------------- Hero section (blog-style, boxed image with light overlay) ---------------- */
          /* ==============================
   BLOG-STYLE HERO
================================ */

.blog-style-hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  min-height: 420px;
  border-radius: 0;
  overflow: hidden;
  isolation: isolate;
}

/* IMAGE */

.blog-hero-bg {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.blog-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* LIGHT OVERLAY — fades from solid white on the left into the photo */

.blog-hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;

  background:
    linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(255, 255, 255, 0.88) 28%,
      rgba(255, 255, 255, 0.45) 50%,
      rgba(255, 255, 255, 0.08) 68%,
      rgba(255, 255, 255, 0) 82%
    );
}

/* CONTENT */

.blog-hero-content {
  position: relative;
  max-width: 560px;
  padding: 48px 40px 48px max(40px, calc((100vw - 1200px) / 2 + 24px));
}

.blog-hero-badge {
  display: inline-block;

  padding: 6px 16px;
  margin-bottom: 18px;

  background: rgba(255, 255, 255, 0.9);
  color: var(--color-ink);

  border-radius: 999px;

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;

  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

/* HEADING */

.blog-hero-content h1 {
  margin: 0 0 16px;

  color: var(--color-ink);

  font-size: clamp(28px, 3.6vw, 44px);
  line-height: 1.15;
  font-weight: 800;

  letter-spacing: -0.03em;
}

/* DESCRIPTION */

.blog-hero-content p {
  max-width: 460px;

  margin-bottom: 24px;

  color: var(--color-muted);

  font-size: 15px;
  line-height: 1.65;
}

/* BUTTON */

.blog-hero-content .hero-primary-btn {
  display: inline-flex;
  align-items: center;
  gap: 14px;

  padding: 13px 22px;

  background: var(--color-accent);
  color: white;

  border: none;
  border-radius: 8px;

  font-weight: 700;
  font-size: 14px;

  cursor: pointer;

  transition: 0.3s ease;
}

.blog-hero-content .hero-primary-btn:hover {
  transform: translateY(-3px);
}

/* FLOATING INFO CARD */

.blog-hero-card {
  position: absolute;
  right: max(28px, calc((100vw - 1200px) / 2 + 24px));
  bottom: 28px;
  z-index: 2;

  width: 250px;

  background: var(--color-bg);
  border-radius: 14px;
  padding: 18px 20px;

  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
}

.blog-hero-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 12px;
  padding: 4px 10px;

  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  color: var(--color-accent);

  border-radius: 999px;

  font-size: 11px;
  font-weight: 700;
}

.blog-hero-card h3 {
  margin: 0 0 10px;

  color: var(--color-ink);

  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
}

.blog-hero-card-link {
  color: var(--color-accent);

  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
}

.blog-hero-card-link:hover {
  text-decoration: underline;
}

/* ==============================
   RESPONSIVE
================================ */

@media (max-width: 768px) {

  .blog-style-hero {
    min-height: 560px;
    border-radius: 0;
  }

  .blog-hero-content {
    max-width: 100%;
    padding: 32px 24px;
  }

  .blog-hero-content h1 {
    font-size: 28px;
  }

  .blog-hero-content p {
    font-size: 14px;
    max-width: 100%;
  }

  .blog-hero-overlay {
    background:
      linear-gradient(
        180deg,
        rgba(255,255,255,0.96) 0%,
        rgba(255,255,255,0.9) 40%,
        rgba(255,255,255,0.55) 60%,
        rgba(255,255,255,0.15) 78%,
        rgba(255,255,255,0) 90%
      );
  }

  .blog-hero-card {
    left: 24px;
    right: 24px;
    bottom: 24px;
    width: auto;
  }

}

          /* ---------------- Hero animated visual ---------------- */
          .hero-visual {
            position: relative;
            width: 100%;
            height: 100%;
            background:
              radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--color-accent) 8%, var(--color-bg)) 0%, var(--color-bg) 70%);
            overflow: hidden;
          }
          .hero-visual-svg {
            width: 100%;
            height: 100%;
            display: block;
          }
          .hero-rings {
            animation: spin-slow 40s linear infinite;
            transform-origin: 150px 160px;
          }
          .hero-rings-rev {
            animation: spin-slow-rev 60s linear infinite;
            transform-origin: 150px 160px;
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-rev {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .hero-sweep {
            transform-origin: 0 0;
            animation: sweep-rotate 4.5s linear infinite;
          }
          @keyframes sweep-rotate {
            from { transform: translate(150px,160px) rotate(0deg); }
            to { transform: translate(150px,160px) rotate(360deg); }
          }
          .hero-link {
            animation: link-pulse 3.2s ease-in-out infinite;
          }
          @keyframes link-pulse {
            0%, 100% { stroke-opacity: 0.18; }
            50% { stroke-opacity: 0.5; }
          }
          .hero-node {
            animation: node-pulse 2.6s ease-in-out infinite;
          }
          .hero-node-halo {
            animation: halo-pulse 2.6s ease-in-out infinite;
          }
          @keyframes node-pulse {
            0%, 100% { r: var(--r, 4); }
          }
          @keyframes halo-pulse {
            0%, 100% { opacity: 0.06; transform: scale(1); }
            50% { opacity: 0.22; transform: scale(1.3); }
          }
          .hero-shield {
            animation: shield-breathe 3.4s ease-in-out infinite;
            transform-origin: 150px 160px;
          }
          @keyframes shield-breathe {
            0%, 100% { transform: translate(150px,160px) scale(1); }
            50% { transform: translate(150px,160px) scale(1.05); }
          }

          .hero-hud {
            position: absolute;
            inset: 0;
            pointer-events: none;
          }
          .hud-corner {
            position: absolute;
            width: 26px;
            height: 26px;
            border: 1.5px solid var(--color-accent);
            opacity: 0.6;
          }
          .hud-tl { top: 18px; left: 18px; border-right: none; border-bottom: none; }
          .hud-tr { top: 18px; right: 18px; border-left: none; border-bottom: none; }
          .hud-bl { bottom: 18px; left: 18px; border-right: none; border-top: none; }
          .hud-br { bottom: 18px; right: 18px; border-left: none; border-top: none; }

          .hud-tag {
            position: absolute;
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.08em;
            color: var(--color-accent);
            opacity: 0.75;
          }
          .hud-tag-1 {
            top: 26px;
            left: 52px;
            animation: hud-flicker 3s steps(1) infinite;
          }
          .hud-tag-2 {
            bottom: 26px;
            right: 52px;
            animation: hud-flicker 3s steps(1) infinite 1.5s;
          }
          @keyframes hud-flicker {
            0%, 92%, 100% { opacity: 0.75; }
            94% { opacity: 0.1; }
            96% { opacity: 0.75; }
          }

          .hero-scanline {
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--color-signal), transparent);
            opacity: 0.35;
            animation: scanline-move 5s linear infinite;
          }
          @keyframes scanline-move {
            0% { top: 0%; }
            100% { top: 100%; }
          }

          .defense-ring {
            transition: all 0.3s ease;
          }
          .ring-badge {
            transition: all 0.3s ease;
          }
          .layer-tab {
            cursor: pointer;
          }
          .defense-core {
            animation: pulse-core 2s ease-in-out infinite;
          }
          @keyframes pulse-core {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }

          .fade-in-layer {
            animation: fadeInLayer 0.35s ease;
          }
          @keyframes fadeInLayer {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .live-dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: #34d399;
            display: inline-block;
            animation: live-pulse 1.6s ease-in-out infinite;
          }
          @keyframes live-pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
            50% { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .reveal { opacity: 1; transform: none; transition: none; }
            .logo-draw .logo-path { stroke-dashoffset: 0; animation: none; }
            .logo-draw .logo-node { opacity: 1; animation: none; }
            .grid-bg { transition: none; }
            .defense-core, .live-dot { animation: none; }
            .hero-rings, .hero-rings-rev, .hero-sweep, .hero-link, .hero-node,
            .hero-node-halo, .hero-shield, .hud-tag, .hero-scanline { animation: none; }
          }
        `}</style>
      </div>
    </>
  );
}
