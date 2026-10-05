import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import ThemaToggle from "../ThemaToggle";
import CustomAlertDialog from "../ui/Dialog";


export type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

type Profile = {
  firstName: string | null;
  lastName: string | null;
  role: string | null;
};

type DashboardLayoutProps = {
  navItems: NavItem[];
  roleLabel: string;
  homePath: string;
};

function DashboardLayout({
  navItems,
  roleLabel,
  homePath,
}: DashboardLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("firstName, lastName, role")
        .eq("id", user.id)
        .single();

      if (error) {
        toast.error("Etwas ist schief gelaufen!");
      } else {
        setProfile(data);
      }
    }

    fetchProfile();
  }, []);

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Abmeldung fehlgeschlagen");
      return;
    }

    navigate("/");
  }

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ");
  const initials =
    `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "?";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link to={homePath} className="flex items-center gap-2.5">
          <img
            src="/images/logo.png"
            alt=""
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            CargoSync
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Menü schließen"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-5 pb-4">
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
          {roleLabel}
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            {initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {fullName || "Lädt …"}
            </p>
            <p className="text-xs text-slate-500 capitalize dark:text-slate-400">
              {profile?.role ?? ""}
            </p>
          </div>
          <ThemaToggle />
        </div>
        <CustomAlertDialog
          title="Ausloggen bestätigen"
          description="Willst du dich wirklich abmelden?"
          buttonName="Abmelden"
          icon={<LogOut className="h-4 w-4" />}
          onConfirm={logout}
          className="mt-3 h-10 w-full cursor-pointer rounded-xl bg-transparent text-sm font-semibold text-red-600 shadow-none hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
     
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block dark:border-slate-800 dark:bg-slate-900">
        {sidebar}
      </aside>

    
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/70 bg-slate-50/80 px-4 backdrop-blur lg:hidden dark:border-slate-800/70 dark:bg-slate-950/80">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl text-slate-700 hover:bg-slate-200/60 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to={homePath} className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt=""
            className="h-8 w-8 object-contain"
          />
          <span className="text-lg font-bold tracking-tight">CargoSync</span>
        </Link>
        <ThemaToggle />
      </header>

     
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Menü schließen"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
          />
          <aside className="relative h-full w-72 max-w-[85%] bg-white shadow-xl dark:bg-slate-900">
            {sidebar}
          </aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
