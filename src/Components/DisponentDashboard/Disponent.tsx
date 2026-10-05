import {
  CircleCheckBig,
  ClipboardPlus,
  Info,
  Truck,
  UserRound,
} from "lucide-react";
import DashboardLayout, { type NavItem } from "../dashboard/DashboardLayout";

const navItems: NavItem[] = [
  { to: "auftrag-erstellen", label: "Auftrag erstellen", icon: ClipboardPlus },
  { to: "offene-aufträge", label: "Offene Aufträge", icon: Truck },
  {
    to: "erledigkte-aufträge",
    label: "Erledigte Aufträge",
    icon: CircleCheckBig,
  },
  { to: "personliche-data", label: "Persönliche Info", icon: UserRound },
  { to: "uber-app", label: "Über die App", icon: Info },
];

function Disponent() {
  return (
    <DashboardLayout
      navItems={navItems}
      roleLabel="Disponent"
      homePath="/disponent-dashboard"
    />
  );
}

export default Disponent;
