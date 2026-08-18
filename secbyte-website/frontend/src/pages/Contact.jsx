import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-[#F6F3EC] text-[#1B2430] min-h-screen">
      <Seo
        title="Contact Us"
        description="Get in touch with the Secbyte Technologies team — request a consultation or ask a question."
      />
      <style>{`
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        .signal-ring {
          position: absolute; border-radius: 50%; border: 1px solid #5EACA3;
          animation: pulseRing 3s ease-out infinite;
        }
        .signal-ring.r2 { animation-delay: 1s; }
        .signal-ring.r3 { animation-delay: 2s; }
        @keyframes pulseRing {
          0% { width: 12px; height: 12px; opacity: 0.8; }
          100% { width: 140px; height: 140px; opacity: 0; }
        }

        .info-row { transition: transform 0.2s ease, border-color 0.2s ease; }
        .info-row:hover { transform: translateX(4px); border-color: #5EACA3; }

        .input-focus:focus-within { box-shadow: 0 0 0 3px rgba(94,172,163,0.18); }

        @media (prefers-reduced-motion: reduce) {
          .signal-ring { animation: none; opacity: 0; }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          
          title="Let's talk about your project"
          description="Fill out the form and we'll get back to you within one business day."
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl border border-[#E4DDCB] shadow-sm md:grid-cols-5">
          {/* Left console panel */}
          <div className="relative overflow-hidden bg-[#1B2430] p-8 text-[#F6F3EC] md:col-span-2 md:p-10">
            {/* signal rings anchored top-right */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40">
              <span className="signal-ring r1 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2" />
              <span className="signal-ring r2 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2" />
              <span className="signal-ring r3 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2" />
              <span className="absolute right-1/2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#5EACA3]" />
            </div>

            <span className="font-body text-[11px] uppercase tracking-[0.2em] text-[#5EACA3]">
              We're listening
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-snug">
              Reach the team directly
            </h3>
            <p className="mt-3 font-body text-sm text-[#B7BFC9] leading-relaxed">
              Whether it's a project brief or a quick question, these lines are open.
            </p>

            <div className="mt-10 space-y-4">
              <div className="info-row flex items-start gap-4 rounded-xl border border-white/10 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B04B]" />
                <div>
                  <p className="font-body text-xs uppercase tracking-wide text-[#8892A0]">Email</p>
                  <p className="mt-1 font-body text-sm text-[#F6F3EC]">info@secbytetechnologies.com
                  </p>
                </div>
              </div>

              <div className="info-row flex items-start gap-4 rounded-xl border border-white/10 p-4">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B04B]" />
                <div>
                  <p className="font-body text-xs uppercase tracking-wide text-[#8892A0]">Phone</p>
                  <p className="mt-1 font-body text-sm text-[#F6F3EC]">+91 9373890640</p>
                </div>
              </div>

              <div className="info-row flex items-start gap-4 rounded-xl border border-white/10 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B04B]" />
                <div>
                  <p className="font-body text-xs uppercase tracking-wide text-[#8892A0]">Office</p>
                  <p className="mt-1 font-body text-sm text-[#F6F3EC]">Pune, Maharashtra, India</p>
                </div>
              </div>

              <div className="info-row flex items-start gap-4 rounded-xl border border-white/10 p-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#E8B04B]" />
                <div>
                  <p className="font-body text-xs uppercase tracking-wide text-[#8892A0]">Hours</p>
                  <p className="mt-1 font-body text-sm text-[#F6F3EC]">Mon–Fri, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="input-focus bg-[#FFFDF9] p-8 md:col-span-3 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
