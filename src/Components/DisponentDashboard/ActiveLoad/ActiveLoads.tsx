import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Truck } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../../lib/supabaseClient";
import CustomAlertDialog from "../../ui/Dialog";
import LoadCard, { type LoadWithDriver } from "../../dashboard/LoadCard";
import { EmptyState, LoadingState, PageHeader } from "../../dashboard/ui";
import { panel, primaryButton, secondaryButton } from "../../dashboard/styles";
import { getLoadStatus } from "../../dashboard/loadStatus";

function ActiveLoads() {
  const [loads, setLoads] = useState<LoadWithDriver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveLoads() {
      const { data, error } = await supabase
        .from("loads")
        .select("*, driver:profiles!loads_driver_id_fkey( *)")
        .eq("done", false);

      if (error) {
        toast.error("Etwas ist schief gelaufen!");
      } else if (data) {
        setLoads(data);
      }

      setLoading(false);
    }

    fetchActiveLoads();
  }, []);

  async function finishLoad(id: number) {
    const { error } = await supabase
      .from("loads")
      .update({ done: true })
      .eq("id", id);

    if (error) {
      toast.error("Fehler beim Aktualisieren");
    } else {
      toast.success("Ladung wurde abgeschlossen");
      setLoads((prev) => prev.filter((load) => load.id !== id));
    }
  }

  if (loading) return <LoadingState />;

  // Kleine Übersicht oben auf der Seite
  const summary = [
    { label: "Offene Aufträge", value: loads.length },
    {
      label: "Unterwegs",
      value: loads.filter((l) =>
        ["Beladen", "Unterwegs", "Entladen"].includes(getLoadStatus(l)),
      ).length,
    },
    {
      label: "Zugestellt",
      value: loads.filter((l) => getLoadStatus(l) === "Zugestellt").length,
    },
  ];

  const newOrderButton = (
    <Link
      to="/disponent-dashboard/auftrag-erstellen"
      className={`${primaryButton} inline-flex items-center justify-center gap-2`}
    >
      <Plus className="h-4 w-4" />
      Neuer Auftrag
    </Link>
  );

  return (
    <>
      <PageHeader
        title="Offene Aufträge"
        description="Alle Aufträge, die noch nicht abgeschlossen sind."
        action={newOrderButton}
      />

      {loads.length === 0 ? (
        <EmptyState
          icon={<Truck className="h-7 w-7" />}
          title="Keine offenen Aufträge"
          text="Erstelle einen neuen Auftrag und weise ihn einem Fahrer zu."
          action={newOrderButton}
        />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
            {summary.map((item) => (
              <div key={item.label} className={`${panel} p-4`}>
                <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            {loads.map((load) => (
              <LoadCard
                key={load.id}
                load={load}
                actions={
                  <>
                    <Link
                      to={`/disponent-dashboard/offene-aufträge/bearbeiten/${load.id}`}
                      className={`${secondaryButton} inline-flex items-center justify-center gap-2`}
                    >
                      <Pencil className="h-4 w-4" />
                      Bearbeiten
                    </Link>
                    <CustomAlertDialog
                      title="Ladung abschließen"
                      description="Möchtest du diese Ladung wirklich abschließen? Dieser Vorgang kann nicht rückgängig gemacht werden."
                      buttonName="Abschließen"
                      onConfirm={() => finishLoad(load.id)}
                      className={primaryButton}
                    />
                  </>
                }
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ActiveLoads;
