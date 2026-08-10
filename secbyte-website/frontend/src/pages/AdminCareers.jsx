import { useEffect, useState } from "react";
import { Plus, X, ChevronDown, ExternalLink } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { apiGet } from "../lib/api";
import { adminPost, adminGet } from "../lib/adminApi";

const emptyForm = { title: "", slug: "", type: "Full-Time", department: "", location: "", description: "" };
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminCareers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [openSlug, setOpenSlug] = useState(null);
  const [applications, setApplications] = useState({});
  const [appsLoading, setAppsLoading] = useState(false);

  const loadCareers = () => {
    setLoading(true);
    apiGet("/careers")
      .then((res) => setCareers(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCareers();
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("/careers", form);
      setForm(emptyForm);
      setShowForm(false);
      loadCareers();
    } catch (err) {
      setError(err.message || "Failed to save job listing");
    } finally {
      setSaving(false);
    }
  };

  const toggleApplications = async (slug) => {
    if (openSlug === slug) {
      setOpenSlug(null);
      return;
    }
    setOpenSlug(slug);
    if (!applications[slug]) {
      setAppsLoading(true);
      try {
        const res = await adminGet(`/careers/${slug}/applications`);
        setApplications((a) => ({ ...a, [slug]: res.data || [] }));
      } catch {
        setApplications((a) => ({ ...a, [slug]: [] }));
      } finally {
        setAppsLoading(false);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Careers</h1>
          <p className="mt-1 text-sm text-muted">Manage job and internship listings.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Listing"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
            <Field label="Slug (e.g. security-analyst)" name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs text-muted">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>
            <Field label="Department" name="department" value={form.department} onChange={handleChange} />
            <Field label="Location" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Description</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-signal">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving..." : "Save Listing"}
          </button>
        </form>
      )}

      {loading && <p className="mt-8 text-sm text-muted">Loading...</p>}

      <div className="mt-8 space-y-4">
        {careers.map((c) => (
          <div key={c._id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs text-accent">{c.type}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.department} · {c.location}</p>
              </div>
              <button
                onClick={() => toggleApplications(c.slug)}
                className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
              >
                View Applications
                <ChevronDown className={`h-4 w-4 transition-transform ${openSlug === c.slug ? "rotate-180" : ""}`} />
              </button>
            </div>

            {openSlug === c.slug && (
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                {appsLoading && <p className="text-sm text-muted">Loading applications...</p>}
                {!appsLoading && (applications[c.slug] || []).length === 0 && (
                  <p className="text-sm text-muted">No applications yet for this role.</p>
                )}
                {!appsLoading && (applications[c.slug] || []).map((app) => (
                  <div key={app._id} className="rounded-md border border-border bg-surface2 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-ink">{app.fullName}</p>
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">{app.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{app.email} · {app.phone}</p>
                    {app.coverLetter && <p className="mt-2 text-sm text-ink">{app.coverLetter}</p>}
                    <ResumeLink app={app} />
                    <p className="mt-2 text-xs text-muted">Applied: {new Date(app.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

function ResumeLink({ app }) {
  const url = API_URL.replace("/api", "") + app.resumeUrl;
  return (
    <a href={url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline">
      <ExternalLink className="h-3.5 w-3.5" />
      Download resume
    </a>
  );
}

function Field({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />
    </div>
  );
}