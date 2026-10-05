import { Info, Package, UserRound } from "lucide-react";
import DashboardLayout, { type NavItem } from "../dashboard/DashboardLayout";

const navItems: NavItem[] = [
  { to: "auftrage", label: "Meine Aufträge", icon: Package },
  { to: "personliche-info", label: "Persönliche Info", icon: UserRound },
  { to: "uber-app", label: "Über die App", icon: Info },
];

function Driver() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleLabel="Fahrer"
      homePath="/fahrer-dashboard"
    />
  );
}

export default Driver;
