import type { Tables } from "../../types/database.types";

/* ----------------------------------------------------------------------------
 * Hilfsfunktionen rund um den Status eines Auftrags.
 * Der Status ergibt sich aus den Zeitstempeln, die der Fahrer setzt.
 * ------------------------------------------------------------------------- */

export type LoadTimes = Pick<
  Tables<"loads">,
  "loaded_at" | "onroad_at" | "unloaded_at" | "delivered_at"
>;

export type StatusField = keyof LoadTimes;

/** Die vier Schritte einer Lieferung – in dieser Reihenfolge */
export const statusSteps: { field: StatusField; label: string }[] = [
  { field: "loaded_at", label: "Beladen" },
  { field: "onroad_at", label: "Unterwegs" },
  { field: "unloaded_at", label: "Entladen" },
  { field: "delivered_at", label: "Zugestellt" },
];

export type LoadStatus =
  | "Offen"
  | "Beladen"
  | "Unterwegs"
  | "Entladen"
  | "Zugestellt";

/** Liefert den aktuellen Status: der letzte gesetzte Zeitstempel gewinnt */
export function getLoadStatus(load: LoadTimes): LoadStatus {
  if (load.delivered_at) return "Zugestellt";
  if (load.unloaded_at) return "Entladen";
  if (load.onroad_at) return "Unterwegs";
  if (load.loaded_at) return "Beladen";
  return "Offen";
}

/** Anzahl erledigter Schritte (0–4) */
export function countDoneSteps(load: LoadTimes): number {
  return statusSteps.filter((step) => Boolean(load[step.field])).length;
}

/** "2026-10-05" → "05.10.2026" */
export function formatDate(value: string | null): string {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/** ISO-Zeitstempel → "05.10.2026, 08:14" (deutsche Zeit) */
export function formatDateTime(value: string | null): string {
  if (!value) return "–";
  return new Date(value).toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** ISO-Zeitstempel → "08:14" */
export function formatTime(value: string | null): string {
  if (!value) return "–";
  return new Date(value).toLocaleTimeString("de-DE", {
    timeZone: "Europe/Berlin",
    hour: "2-digit",
    minute: "2-digit",
  });
}
