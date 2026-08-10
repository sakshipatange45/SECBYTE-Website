import { useEffect, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { apiGet } from "../lib/api";
import { adminPost, adminDelete } from "../lib/adminApi";

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  overview: "",
  coverImage: "",
  benefits: "",
  technologiesUsed: "",
  order: 0,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadServices = () => {
    setLoading(true);
    apiGet("/services")
      .then((res) => setServices(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("/services", {
        ...form,
        order: Number(form.order) || 0,
        benefits: form.benefits.split(",").map((b) => b.trim()).filter(Boolean),
        technologiesUsed: form.technologiesUsed.split(",").map((t) => t.trim()).filter(Boolean),
      });
      setForm(emptyForm);
      setShowForm(false);
      loadServices();
    } catch (err) {
      setError(err.message || "Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await adminDelete(`/services/${id}`);
      setServices((s) => s.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete service");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Services</h1>
          <p className="mt-1 text-sm text-muted">Manage the services shown on the public site.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Service"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
            <Field label="Slug (e.g. web-development)" name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <Field label="Short description" name="shortDescription" value={form.shortDescription} onChange={handleChange} required />
          <div>
            <label className="mb-1 block text-xs text-muted">Overview</label>
            <textarea
              name="overview"
              rows={3}
              value={form.overview}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">
              Image URL (paste a link — e.g. from Unsplash, or your own hosted image)
            </label>
            <input
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt="Preview"
                className="mt-2 h-32 w-full rounded-md border border-border object-cover"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Benefits (comma separated)" name="benefits" value={form.benefits} onChange={handleChange} />
            <Field label="Technologies (comma separated)" name="technologiesUsed" value={form.technologiesUsed} onChange={handleChange} />
          </div>
          <Field label="Order (number)" name="order" type="number" value={form.order} onChange={handleChange} />

          {error && <p className="text-sm text-signal">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving..." : "Save Service"}
          </button>
        </form>
      )}

      {loading && <p className="mt-8 text-sm text-muted">Loading...</p>}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <div key={s._id} className="overflow-hidden rounded-lg border border-border bg-surface">
            {s.coverImage && (
              <img src={s.coverImage} alt={s.title} className="h-32 w-full object-cover" />
            )}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-accent">{s.slug}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">{s.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(s._id, s.title)}
                  disabled={deletingId === s._id}
                  className="rounded-md p-2 text-muted hover:bg-signal/10 hover:text-signal disabled:opacity-50"
                  title="Delete service"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted">{s.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
      />
    </div>
  );
}