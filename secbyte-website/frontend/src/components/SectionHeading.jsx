export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="mb-4 justify-center font-mono text-xs tracking-wide text-accent">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  );
}