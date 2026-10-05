import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { panel } from "./styles";
import {
  formatDateTime,
  formatTime,
  getLoadStatus,
  statusSteps,
  type LoadStatus,
  type LoadTimes,
} from "./loadStatus";


export function PageHeader({
  title,
  description,
  action,
  backTo,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  backTo?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {backTo && (
          <Link
            to={backTo}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Link>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Ladeanzeige in der Mitte der Seite */
export function LoadingState() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <ClipLoader color="#2563eb" size={48} />
    </div>
  );
}

/** Hinweis, wenn eine Liste leer ist */
export function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={`${panel} flex flex-col items-center px-6 py-16 text-center`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
        {icon}
      </span>
      <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      {text && (
        <p className="mt-1.5 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          {text}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}


export function InfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm text-slate-900 dark:text-slate-100">
        {value || "–"}
      </dd>
    </div>
  );
}


export function RouteLine({
  from,
  to,
}: {
  from: string | null;
  to: string | null;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center pt-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        <span className="my-1 w-px flex-1 border-l-2 border-dashed border-slate-300 dark:border-slate-700" />
        <MapPin className="h-4 w-4 text-orange-500" />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Abholung</p>
          <p className="font-medium break-words text-slate-900 dark:text-white">
            {from || "–"}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lieferung
          </p>
          <p className="font-medium break-words text-slate-900 dark:text-white">
            {to || "–"}
          </p>
        </div>
      </div>
    </div>
  );
}

const badgeStyle: Record<LoadStatus, string> = {
  Offen: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  Beladen:
    "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Unterwegs:
    "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Entladen: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Zugestellt:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};


export function StatusBadge({ load }: { load: LoadTimes }) {
  const status = getLoadStatus(load);
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyle[status]}`}
    >
      {status}
    </span>
  );
}


export function StatusTimeline({ load }: { load: LoadTimes }) {
  return (
    <ol className="grid grid-cols-4 gap-2">
      {statusSteps.map((step, i) => {
        const time = load[step.field];
        return (
          <li
            key={step.field}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                time
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-400 dark:border-slate-600"
              }`}
            >
              {time ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span
              className={`text-xs ${
                time
                  ? "font-medium text-slate-900 dark:text-white"
                  : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
            <span
              className="text-[11px] text-slate-400 tabular-nums"
              title={time ? formatDateTime(time) : undefined}
            >
              {formatTime(time)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
