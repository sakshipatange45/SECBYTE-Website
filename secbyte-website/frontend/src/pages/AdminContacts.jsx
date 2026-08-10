import { useEffect, useState } from "react";
import { Mail, Phone, Building2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { adminGet } from "../lib/adminApi";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGet("/contact")
      .then((res) => setContacts(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-semibold text-ink">Contact Leads</h1>
      <p className="mt-1 text-sm text-muted">Submissions from the public Contact form and chatbot.</p>

      {loading && <p className="mt-8 text-sm text-muted">Loading...</p>}

      {!loading && contacts.length === 0 && (
        <p className="mt-8 text-sm text-muted">No contact submissions yet.</p>
      )}

      <div className="mt-8 space-y-4">
        {contacts.map((c) => (
          <div key={c._id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-ink">{c.fullName}</h3>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted font-mono">
                {c.status || "New"}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {c.email}</span>
              {c.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {c.phone}</span>}
              {c.company && <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {c.company}</span>}
            </div>

            {c.serviceInterested && (
              <p className="mt-2 text-xs text-muted">
                Interested in: <span className="text-ink">{c.serviceInterested}</span>
                {c.budget && <> · Budget: <span className="text-ink">{c.budget}</span></>}
              </p>
            )}

            <p className="mt-3 text-sm text-ink">{c.message}</p>

            <p className="mt-3 text-xs text-muted">
              Source: {c.source || "contact-form"} · {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}