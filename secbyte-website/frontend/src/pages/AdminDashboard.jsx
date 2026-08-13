import { useEffect, useState } from "react";
import { Briefcase, Newspaper, UserPlus, Mail } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { apiGet } from "../lib/api";
import { adminGet, adminPost } from "../lib/adminApi";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, blog: 0, careers: 0, contacts: 0 });

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      apiGet("/services").catch(() => ({ data: [] })),
      apiGet("/blog").catch(() => ({ data: [] })),
      apiGet("/careers").catch(() => ({ data: [] })),
      adminGet("/contact").catch(() => ({ data: [] })),
    ]).then(([services, blog, careers, contacts]) => {
      setCounts({
        services: services.data?.length || 0,
        blog: blog.data?.length || 0,
        careers: careers.data?.length || 0,
        contacts: contacts.data?.length || 0,
      });
    });
  }, []);

  const cards = [
    { label: "Services", value: counts.services, icon: Briefcase },
    { label: "Blog Posts", value: counts.blog, icon: Newspaper },
    { label: "Open Careers", value: counts.careers, icon: UserPlus },
    { label: "Contact Leads", value: counts.contacts, icon: Mail },
  ];

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    setProfileError("");
    setSaving(true);
    try {
      const res = await adminPost("/auth/update-profile", {
        newEmail: newEmail || undefined,
        oldPassword,
        newPassword: newPassword || undefined,
      });
      setProfileMsg(res.message || "Profile updated successfully");
      setNewEmail("");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setProfileError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Overview of your site content.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="card">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted">{c.label}</p>
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <p className="mt-3 font-display text-3xl font-semibold text-ink">{c.value}</p>
            </div>
          );
        })}
      </div>

      <div className="card mt-8 max-w-md">
        <h2 className="font-display text-lg font-semibold text-ink">Update Login Details</h2>
        <p className="mt-1 text-sm text-muted">Change your admin email and/or password.</p>

        <form onSubmit={handleUpdateProfile} className="mt-4 space-y-3">
          <div>
            <label className="text-sm text-muted">New Email (optional)</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Leave blank to keep current email"
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-muted">Current Password (required)</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-muted">New Password (optional)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Leave blank to keep current password"
              minLength={6}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </div>

          {profileMsg && <p className="text-sm text-green-600">{profileMsg}</p>}
          {profileError && <p className="text-sm text-red-600">{profileError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
