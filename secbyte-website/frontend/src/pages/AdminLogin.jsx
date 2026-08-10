import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { loginAdmin } from "../lib/adminApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginAdmin(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8">
        <div className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <ShieldCheck className="h-5 w-5 text-accent" />
          Secbyte Admin
        </div>
        <p className="mt-1 text-sm text-muted">Sign in to manage your site content.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-signal">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-accent px-5 py-3 font-semibold text-bg hover:bg-accent-dim disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}