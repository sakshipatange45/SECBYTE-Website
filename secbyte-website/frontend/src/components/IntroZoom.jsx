/* IntroZoom.jsx
   A one-time, full-screen intro animation shown when the homepage first
   loads: a background image zooms IN, holds briefly, then zooms OUT
   while fading away to reveal the real page underneath — the effect you
   see on Infosys-style corporate homepages.

   HOW TO USE YOUR OWN IMAGE:
   Replace `introImage` with your own imported asset, e.g.:
     import introImage from "../assets/intro.jpg";

   HOW TO ADD YOUR LOGO:
   Import the same logo file your Navbar uses and set `logoSrc` below.
   Example, if your Navbar does:
     import logo from "../assets/logo.png";
   then here do the same:
     import logo from "../assets/logo.png";
     const logoSrc = logo;
   If you don't have a logo file, leave logoSrc as null — the component
   will just show the styled wordmark on its own, no broken image.

   HOW TO USE IN Home.jsx:
     import IntroZoom from "../components/IntroZoom";
     ...
     return (
       <>
         <IntroZoom />
         <Seo ... />
         <Hero />
         ...
       </>
     );

   Notes:
   - Runs once per page load (not once-ever via localStorage — kept simple
     and dependency-free per project rules). Remove/adjust if you want it
     to show only on the very first visit using sessionStorage.
   - Unmounts itself after the animation finishes so it never blocks
     clicks/scroll on the real page.
*/
import { useEffect, useState } from "react";
import heroImage from "../assets/hero.jpeg";
// import logo from "../assets/logo.png"; // <-- uncomment and point to your logo file

const introImage = heroImage; // swap for a dedicated intro image if you have one
const logoSrc = null; // set to `logo` once you've uncommented the import above

export default function IntroZoom() {
  const [phase, setPhase] = useState("in"); // "in" -> "out" -> "done"

  useEffect(() => {
    // prevent scroll while the intro plays
    document.body.style.overflow = "hidden";

    const toOut = setTimeout(() => setPhase("out"), 1100);
    const toDone = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(toOut);
      clearTimeout(toDone);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
      style={{
        opacity: phase === "out" ? 0 : 1,
        transition: "opacity 900ms ease",
        pointerEvents: "none",
      }}
    >
      <img
        src={introImage}
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        style={{
          transform: phase === "in" ? "scale(1.25)" : "scale(1.5)",
          transition: "transform 2000ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div className="absolute inset-0 bg-bg/30" />
      <div className="absolute inset-0 bg-black/25" />

      {/* Logo + company name — fades/rises in shortly after the zoom
          starts, then fades out along with the rest of the overlay when
          phase becomes "out". */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="flex flex-col items-center gap-4"
          style={{
            opacity: phase === "in" ? 1 : 0,
            transform: phase === "in" ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 700ms ease 350ms, transform 700ms ease 350ms",
          }}
        >
          {logoSrc && (
            <img
              src={logoSrc}
              alt="Secbyte Technologies"
              className="h-14 w-14 object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.35)] md:h-20 md:w-20"
            />
          )}

          <div className="flex flex-col items-center">
            <span className="font-display text-3xl font-bold tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] md:text-5xl">
              Secbyte Technologies
            </span>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.3em] text-white/70 md:text-sm">
              Smart Cybersecurity
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}