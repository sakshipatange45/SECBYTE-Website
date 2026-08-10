import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Globe,
  Laptop,
  Smartphone,
  Cloud,
  BrainCircuit,
  Megaphone,
  Palette,
  Sparkles,
  Layers,
  ArrowUpRight,
} from "lucide-react";

import ServiceCard from "../components/ServiceCard";
import Seo from "../components/Seo";
import { apiGet } from "../lib/api";
import { services as fallbackServices } from "../lib/data";
import servicesBanner from "../assets/services/services.png";

export default function Services() {
  const [services, setServices] = useState(fallbackServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/services")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const iconMap = {
            cybersecurity: ShieldCheck,
            "web-development": Globe,
            "software-development": Laptop,
            "mobile-app-development": Smartphone,
            "cloud-solutions": Cloud,
            "ai-generative-ai": BrainCircuit,
            "digital-marketing": Megaphone,
            "ui-ux-design": Palette,
          };

          const updatedServices = res.data.map((service) => {
            const fallbackMatch = fallbackServices.find((f) => f.slug === service.slug);
            return {
              ...service,
              icon: iconMap[service.slug] || ShieldCheck,
              coverImage: service.coverImage || fallbackMatch?.image || null,
            };
          });

          setServices(updatedServices);
        }
      })
      .catch((err) => {
        console.log("Using fallback services", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <Seo
        title="Services"
        description="Cybersecurity, Web Development, AI, Cloud, Mobile Apps and Digital Marketing Services."
      />

      {/* ================= HERO (light-overlay, full-bleed style — matches Careers/About hero) ================= */}
      <section className="relative isolate flex min-h-[440px] items-center overflow-hidden lg:min-h-[480px]">
        {/* Background image */}
        <img
          src={servicesBanner}
          alt="Secbyte Services"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />

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

        <div className="relative mx-auto w-full max-w-7xl px-6 py-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
              <Sparkles size={14} className="text-cyan-600" />
              Our Services
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
              Solutions We Deliver
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              We provide secure, scalable and innovative technology solutions
              tailored to your business — from cybersecurity and cloud
              infrastructure to AI, mobile applications and digital
              transformation.
            </p>

            {/* Mobile-only card — stacks below the text instead of floating */}
            <div className="mt-8 max-w-sm rounded-2xl bg-white p-5 shadow-xl sm:hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
                <Layers size={12} />
                8+ Service Areas
              </span>
              <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900">
                One team, end-to-end delivery — from strategy to launch
              </h3>
              <a
                href="#services-grid"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:underline"
              >
                Explore services <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Floating info card — desktop/tablet only, matches the Careers/About hero card */}
        <div className="absolute bottom-6 right-6 z-10 hidden w-64 rounded-2xl bg-white p-5 shadow-xl sm:block">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700">
            <Layers size={12} />
            8+ Service Areas
          </span>
          <h3 className="mt-3 text-sm font-bold leading-snug text-slate-900">
            One team, end-to-end delivery — from strategy to launch
          </h3>
          <a
            href="#services-grid"
            className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-600 hover:underline"
          >
            Explore services <ArrowUpRight size={12} />
          </a>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <div id="services-grid" className="mx-auto max-w-7xl px-6 py-16">
        {loading && services.length === 0 && (
          <p className="mb-8 text-center text-slate-400">
            Loading Services...
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}