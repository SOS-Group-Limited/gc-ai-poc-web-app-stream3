"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BellRing,
  CheckSquare,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Bell,
} from "lucide-react";
import { AUTH_STORAGE_KEY } from "@/lib/auth";

type AppShellProps = {
  children: React.ReactNode;
};

const navItems = [
  { key: "dashboard", href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "documents", href: "/documents", label: "Documents", icon: FolderOpen },
  { key: "monitoring", href: "/monitoring", label: "Monitoring", icon: Bell },
  { key: "intelligence", href: "/intelligence", label: "Intelligence", icon: Sparkles },
  { key: "tasks", href: "/tasks", label: "Tasks", icon: CheckSquare },
] as const;

function topbarSuffix(pathname: string): string {
  if (pathname === "/documents") return " - Documents";
  if (pathname === "/monitoring") return " - Monitoring";
  if (pathname === "/intelligence") return " - Intelligence";
  if (pathname === "/tasks") return " - Tasks";
  return "";
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="shield">G</div>
          <div className="text">
            GAW CAPITAL<span>Asset Intelligence</span>
          </div>
        </div>
        <nav className="nav-section">
          <div className="nav-label">Portfolio</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                className={`nav-item ${isActive ? "active" : ""}`}
                href={item.href}
              >
                <span className="nav-icon">
                  <Icon size={18} />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <nav className="nav-section bottom">
          <button
            className="nav-item"
            id="logout-btn"
            onClick={() => {
              localStorage.removeItem(AUTH_STORAGE_KEY);
              router.push("/login");
            }}
            type="button"
          >
            <span className="nav-icon">
              <LogOut size={18} />
            </span>
            Sign Out
          </button>
        </nav>
      </aside>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <strong>Project Arts</strong> - Ballet{topbarSuffix(pathname)}
          </div>
          <div className="topbar-right">
            <div className="notif-dot">
              <BellRing size={16} />
              <div className="badge">3</div>
            </div>
            <div className="avatar">JB</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
