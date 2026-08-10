import { useEffect, useState } from "react";
import { Plus, X, Trash2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { apiGet } from "../lib/api";
import { adminPost, adminDelete } from "../lib/adminApi";

const emptyForm = { title: "", slug: "", excerpt: "", content: "", coverImage: "", category: "" };

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadPosts = () => {
    setLoading(true);
    apiGet("/blog")
      .then((res) => setPosts(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await adminPost("/blog", form);
      setForm(emptyForm);
      setShowForm(false);
      loadPosts();
    } catch (err) {
      setError(err.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await adminDelete(`/blog/${id}`);
      setPosts((p) => p.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Blog</h1>
          <p className="mt-1 text-sm text-muted">Manage blog posts shown on the public site.</p>
        </div>
        <button onClick={() => setShowForm((v) => !v)} className="btn-primary">
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancel" : "Add Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-border bg-surface p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title" name="title" value={form.title} onChange={handleChange} required />
            <Field label="Slug (e.g. my-first-post)" name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <Field label="Excerpt (short summary)" name="excerpt" value={form.excerpt} onChange={handleChange} />
          <div>
            <label className="mb-1 block text-xs text-muted">
              Image URL (paste a link — right-click any image online → "Copy image address")
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
          <div>
            <label className="mb-1 block text-xs text-muted">Content</label>
            <textarea
              name="content"
              rows={6}
              value={form.content}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-border bg-surface2 px-3 py-2 text-sm text-ink outline-none focus:border-accent"
            />
          </div>
          <Field label="Category" name="category" value={form.category} onChange={handleChange} />

          {error && <p className="text-sm text-signal">{error}</p>}

          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving..." : "Save Post"}
          </button>
        </form>
      )}

      {loading && <p className="mt-8 text-sm text-muted">Loading...</p>}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <div key={p._id} className="overflow-hidden rounded-lg border border-border bg-surface">
            {p.coverImage && <img src={p.coverImage} alt={p.title} className="h-32 w-full object-cover" />}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-accent">{p.category || "General"}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">{p.title}</h3>
                </div>
                <button
                  onClick={() => handleDelete(p._id, p.title)}
                  disabled={deletingId === p._id}
                  className="rounded-md p-2 text-muted hover:bg-signal/10 hover:text-signal disabled:opacity-50"
                  title="Delete post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
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