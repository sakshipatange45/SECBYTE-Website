import { useEffect, useState } from "react";
import { Briefcase, Newspaper, UserPlus, Mail } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { apiGet } from "../lib/api";
import { adminGet } from "../lib/adminApi";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, blog: 0, careers: 0, contacts: 0 });

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
    </AdminLayout>
  );
}