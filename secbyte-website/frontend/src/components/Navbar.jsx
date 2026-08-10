import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo2.jpeg";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Secbyte Technologies Logo"
            style={{ mixBlendMode: "multiply" }}
            className="h-11 w-11 rounded-xl object-contain"
          />

          <div>
            <h2 className="text-ink text-xl font-bold">Secbyte</h2>
            <p className="text-secondary text-xs tracking-widest uppercase">Technologies</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-300 ${
                  isActive ? "text-accent" : "text-muted hover:text-accent"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary">
               Book a Consultation Call
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-border p-2 text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border bg-surface lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6">

            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "brand-gradient text-white"
                      : "text-muted hover:bg-surface2 hover:text-accent"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-4">
              Request Demo
              <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}