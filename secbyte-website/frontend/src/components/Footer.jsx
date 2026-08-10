import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

// lucide-react removed brand/logo icons (LinkedIn, Twitter, etc.) from
// recent versions, so we draw LinkedIn as a plain inline SVG instead of
// depending on the library for it — this can never break on version bumps.
function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
];

const serviceLinks = [
  { href: "/services/cybersecurity", label: "Cybersecurity" },
  { href: "/services/web-development", label: "Web Development" },
  { href: "/services/software-development", label: "Software Development" },
  { href: "/services/mobile-app-development", label: "Mobile App Development" },
  { href: "/services/cloud-solutions", label: "Cloud Solutions" },
];

const resourceLinks = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

// Social + website links shown as an icon row in the footer.
// Replace the `#` hrefs with your real profile URLs once you have them.
const socialLinks = [
  { href: "https://secbyte.in", label: "Website", icon: Globe },
  { href: "https://www.linkedin.com/company/secbyte-technologies/?originalSubdomain=in", label: "LinkedIn", icon: LinkedinIcon },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Company */}
          <div className="lg:col-span-2">

            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink">
                  Secbyte
                </h2>

                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  Technologies
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md leading-7 text-muted">
              Secbyte Technologies delivers secure software,
              cybersecurity, AI solutions, cloud infrastructure,
              websites, mobile applications and enterprise software
              for startups and businesses.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-muted">
                <Mail className="h-5 w-5 text-accent" />
                info@secbyte.in
              </div>

              <div className="flex items-center gap-3 text-muted">
                <Phone className="h-5 w-5 text-accent" />
                +91 98225 40654
              </div>

              <div className="flex items-center gap-3 text-muted">
                <MapPin className="h-5 w-5 text-accent" />
                Pune, Maharashtra, India
              </div>

            </div>

            {/* Social + website icon row — was just the lone Globe icon
                before, now a complete, evenly balanced row. */}
            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition hover:border-accent hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-ink">
              Company
            </h3>

            <div className="space-y-3">

              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-sm text-muted transition hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-ink">
              Services
            </h3>

            <div className="space-y-3">

              {serviceLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-sm text-muted transition hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-ink">
              Resources
            </h3>

            <div className="space-y-3">

              {resourceLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-sm text-muted transition hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Secbyte Technologies. All Rights Reserved.
          </p>

          <p className="font-mono text-accent">
            Secure • Scalable • Innovative
          </p>

        </div>

      </div>
    </footer>
  );
}