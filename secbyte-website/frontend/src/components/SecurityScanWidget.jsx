import { useEffect, useState, useRef } from "react";
import { Terminal, ShieldCheck } from "lucide-react";
import useInView from "../hooks/useInView";

const scanLines = [
  "$ secbyte scan --target production",
  "> Initializing security modules...",
  "> Scanning network endpoints...",
  "> Checking SSL/TLS configuration...    [OK]",
  "> Running dependency audit...          [OK]",
  "> Testing for SQL injection...         [SAFE]",
  "> Testing for XSS vulnerabilities...   [SAFE]",
  "> Checking authentication layers...    [OK]",
  "> Vulnerabilities patched: 247",
  "> Scan complete. System secured.",
];

export default function SecurityScanWidget() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const [visibleLines, setVisibleLines] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const hasRun = useRef(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;

    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < scanLines.length) {
        const nextLine = scanLines[i];
        i++;
        if (nextLine) {
          setVisibleLines((prev) => [...prev, nextLine]);
        }
      } else {
        clearInterval(intervalRef.current);
        setTimeout(() => setShowScore(true), 300);
      }
    }, 450);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView]);

  useEffect(() => {
    if (!showScore) return;
    const target = 98;
    const start = performance.now();
    const duration = 1200;
    let frameId;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setScore(Math.floor(progress * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [showScore]);

  return (
    <div ref={ref} className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500/70" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
        <div className="h-3 w-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex items-center gap-1.5 text-xs text-white/40">
          <Terminal className="h-3.5 w-3.5" />
          secbyte-scanner — bash
        </div>
      </div>

      {/* Terminal body */}
      <div className="min-h-[280px] p-6 font-mono text-sm">
        {visibleLines.filter(Boolean).map((line, i) => (
          <p
            key={i}
            className={`mb-1.5 ${
              line.includes("[OK]") || line.includes("[SAFE]")
                ? "text-emerald-400"
                : line.startsWith("$")
                ? "text-accent"
                : "text-white/70"
            }`}
          >
            {line}
          </p>
        ))}

        {visibleLines.length > 0 && visibleLines.length < scanLines.length && (
          <span className="inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
        )}

        {showScore && (
          <div className="mt-6 flex items-center gap-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-5 py-4">
            <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-400" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-white/50">Security Score</p>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-2xl font-bold text-emerald-400">{score}%</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-150"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}