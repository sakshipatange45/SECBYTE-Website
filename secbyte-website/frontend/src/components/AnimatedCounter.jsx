import { useEffect, useState } from "react";

export default function AnimatedCounter({ value, isInView, duration = 1500 }) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value.replace(/\D/g, ""), 10) || 0;
    const suffix = value.replace(/[0-9]/g, "");
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * numericPart);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, value, duration]);

  return <span>{display}</span>;
}