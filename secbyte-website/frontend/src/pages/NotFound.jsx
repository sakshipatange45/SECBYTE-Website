import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-wide text-accent">error --code 404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-ink">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-semibold text-bg hover:bg-accent-dim">
        Back to Home
      </Link>
    </div>
  );
}