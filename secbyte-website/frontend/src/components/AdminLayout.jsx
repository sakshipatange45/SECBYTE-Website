import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, FolderKanban, Newspaper, UserPlus, Mail, LogOut, ShieldCheck } from "lucide-react";
import { clearToken } from "../lib/adminApi";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/portfolio", label: "Portfolio", icon: FolderKanban },
  { to: "/admin/blog", label: "Blog", icon: Newspaper },
  { to: "/admin/careers", label: "Careers", icon: UserPlus },
  { to: "/admin/contacts", label: "Contacts", icon: Mail },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-64 shrink-0 border-r border-border bg-surface p-4">
        <div className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-semibold text-ink">
          <ShieldCheck className="h-5 w-5 text-accent" />
          Secbyte Admin
        </div>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-accent text-bg" : "text-muted hover:bg-surface2 hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted hover:bg-surface2 hover:text-signal"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}