import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, PackageOpen } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import {
  EmptyState,
  LoadingState,
  PageHeader,
  RouteLine,
  StatusBadge,
} from "../dashboard/ui";
import { panel, primaryButton } from "../dashboard/styles";
import { formatDate } from "../dashboard/loadStatus";

type Load = {
  id: number;
  company_name: string | null;
  sender_address: string | null;
  pickup_date: string | null;
  delivery_date: string | null;
  delivery_address: string | null;
  loaded_at: string | null;
  onroad_at: string | null;
  unloaded_at: string | null;
  delivered_at: string | null;
};

function LoadListe() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLoads() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("loads")
        .select(
          "id, company_name, sender_address, pickup_date, delivery_address, delivery_date, loaded_at, onroad_at, unloaded_at, delivered_at",
        )
        .eq("driver_id", user.id)
        .is("delivered_at", null);

      if (error) {
        toast.error("Etwas ist schief gelaufen!");
      } else {
        setLoads(data);
      }

      setLoading(false);
    }

    fetchLoads();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <PageHeader
        title="Meine Aufträge"
        description={
          loads.length === 1
            ? "1 offener Auftrag wartet auf dich."
            : `${loads.length} offene Aufträge warten auf dich.`
        }
      />

      {loads.length === 0 ? (
        <EmptyState
          icon={<PackageOpen className="h-7 w-7" />}
          title="Keine offenen Aufträge"
          text="Sobald dein Disponent dir einen Auftrag zuweist, erscheint er hier."
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {loads.map((load) => (
            <article
              key={load.id}
              className={`${panel} flex flex-col p-5 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-3">
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

              <div className="mt-5">
                <RouteLine
                  from={load.sender_address}
                  to={load.delivery_address}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Abholung {formatDate(load.pickup_date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" />
                  Lieferung {formatDate(load.delivery_date)}
                </span>
              </div>

              <Link
                to={`/fahrer-dashboard/auftrage/${load.id}`}
                className={`${primaryButton} mt-5 inline-flex items-center justify-center gap-2`}
              >
                {load.loaded_at ? "Auftrag fortsetzen" : "Auftrag starten"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default LoadListe;
