import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import LoadCard, { type LoadWithDriver } from "../dashboard/LoadCard";
import { EmptyState, LoadingState, PageHeader } from "../dashboard/ui";

function CompletedLoads() {
  const [loads, setLoads] = useState<LoadWithDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFinishedLoads() {
      const { data, error } = await supabase
        .from("loads")
        .select("*, driver:profiles!loads_driver_id_fkey( *)")
        .eq("done", true);

      if (error) {
        toast.error("Etwas ist schief gelaufen");
      } else {
        setLoads(data);
      }

      setLoading(false);
    }

    fetchFinishedLoads();
  }, []);

  if (loading) return <LoadingState />;

  return (
    <>
      <PageHeader
        title="Erledigte Aufträge"
        description={`${loads.length} abgeschlossene ${loads.length === 1 ? "Lieferung" : "Lieferungen"}.`}
      />

      {loads.length === 0 ? (
        <EmptyState
          icon={<CircleCheckBig className="h-7 w-7" />}
          title="Noch keine erledigten Aufträge"
          text="Abgeschlossene Aufträge erscheinen hier als Verlauf."
        />
      ) : (
        <div className="flex flex-col gap-5">
          {loads.map((load) => (
            <LoadCard
              key={load.id}
              load={load}
              actions={
                <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <CircleCheckBig className="h-4 w-4" />
                  Abgeschlossen
                </span>
              }
            />
          ))}
        </div>
      )}
    </>
  );
}

export default CompletedLoads;
