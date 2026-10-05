import type { ReactNode } from "react";
import type { Tables } from "../../types/database.types";
import { InfoItem, RouteLine, StatusBadge, StatusTimeline } from "./ui";
import { panel } from "./styles";
import { formatDate } from "./loadStatus";


export type LoadWithDriver = Tables<"loads"> & {
  driver: Tables<"profiles"> | null;
};

type LoadCardProps = {
  load: LoadWithDriver;

  actions?: ReactNode;
};

function LoadCard({ load, actions }: LoadCardProps) {
  const driverName = load.driver
    ? `${load.driver.firstName ?? ""} ${load.driver.lastName ?? ""}`.trim()
    : "Nicht zugewiesen";

  return (
    <article className={`${panel} overflow-hidden`}>
  
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6 dark:border-slate-800">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Auftrag #{load.id}
          </p>
          <h2 className="truncate text-lg font-semibold text-slate-900 dark:text-white">
            {load.company_name}
          </h2>
        </div>
        <StatusBadge load={load} />
      </div>

      <div className="grid items-start gap-6 p-5 sm:p-6 md:grid-cols-2">
        <RouteLine from={load.sender_address} to={load.delivery_address} />

        <dl className="grid grid-cols-2 gap-4">
          <InfoItem label="Abholtermin" value={formatDate(load.pickup_date)} />
          <InfoItem
            label="Liefertermin"
            value={formatDate(load.delivery_date)}
          />
          <InfoItem label="Ladungsart" value={load.cargo_type} />
          <InfoItem
            label="Gewicht"
            value={load.cargo_weight && `${load.cargo_weight} kg`}
          />
          <InfoItem label="Fahrer" value={driverName} />
          <InfoItem label="Hinweise" value={load.description} />
        </dl>
      </div>

      <div className="flex flex-col gap-5 border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-950/30">
        <div className="w-full max-w-md">
          <StatusTimeline load={load} />
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
        )}
      </div>
    </article>
  );
}

export default LoadCard;
