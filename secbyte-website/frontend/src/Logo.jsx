export default function Logo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      {/* Hexagonal shield outline */}
      <path
        d="M24 3L42 12V26C42 35 34 41 24 45C14 41 6 35 6 26V12L24 3Z"
        stroke="currentColor"
        strokeWidth="2"
        className="text-accent"
        strokeLinejoin="round"
      >
        <animate attributeName="stroke-dasharray" from="0 140" to="140 0" dur="1.2s" fill="freeze" />
      </path>

      {/* Circuit-node monogram inside */}
      <circle cx="24" cy="18" r="2.2" fill="currentColor" className="text-accent" />
      <circle cx="16" cy="28" r="2.2" fill="currentColor" className="text-accent" />
      <circle cx="32" cy="28" r="2.2" fill="currentColor" className="text-accent" />
      <path
        d="M24 20.2V24M24 24L16 26M24 24L32 26"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent/70"
      />
    </svg>
  );
}