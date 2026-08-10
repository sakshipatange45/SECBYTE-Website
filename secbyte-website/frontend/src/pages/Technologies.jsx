import SectionHeading from "../components/SectionHeading";

const stack = {
  Frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Express.js"],
  Database: ["MongoDB"],
  "Auth & Security": ["JWT", "Role-Based Access Control"],
  "Cloud & Storage": ["AWS", "Azure", "Cloudinary"],
  Deployment: ["Vercel", "Render", "AWS EC2"],
};

export default function Technologies() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <SectionHeading eyebrow="stack --print" title="Our technology stack" />
      <div className="mt-12 space-y-8">
        {Object.entries(stack).map(([category, items]) => (
          <div key={category} className="rounded-lg border border-border bg-surface p-6">
            <p className="mb-3 font-mono text-xs tracking-wide text-accent">{category}</p>
            <div className="flex flex-wrap gap-2">
              {items.map((t) => (
                <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-ink font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}