export default function StatCard({ label, value }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-semibold text-accent md:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}