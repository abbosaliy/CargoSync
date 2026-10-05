import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import { Button } from "../ui/button";
import CustomAlertDialog from "../ui/Dialog";
import {
  InfoItem,
  LoadingState,
  PageHeader,
  RouteLine,
  StatusBadge,
} from "../dashboard/ui";
import { panel, primaryButton } from "../dashboard/styles";
import {
  formatDate,
  formatDateTime,
  statusSteps,
  type StatusField,
} from "../dashboard/loadStatus";

type Load = {
  id: number;
  company_name: string | null;
  sender_address: string | null;
  pickup_date: string | null;
  delivery_address: string | null;
  delivery_date: string | null;
  description: string | null;
  cargo_type: string | null;
  cargo_weight: string | null;
  loaded_at: string | null;
  onroad_at: string | null;
  unloaded_at: string | null;
  delivered_at: string | null;
};

function LoadDetails() {
  const [load, setLoad] = useState<Load | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchLoad() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("loads")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        toast.error("Etwas ist schief gelaufen!");
      } else {
        setLoad(data);
      }
    }

    fetchLoad();
  }, [id]);

  async function statusUpdate(field: StatusField) {
    if (!load) return;

    const now = new Date().toISOString();

    const { error } = await supabase
      .from("loads")
      .update({ [field]: now })
      .eq("id", load.id);

    if (error) {
      toast.error("Fehler beim Aktualisieren");
      return;
    }

    setLoad({ ...load, [field]: now });
    toast.success("Status wurde aktualisiert!");

    if (field === "delivered_at") {
      navigate("/fahrer-dashboard/auftrage");
    }
  }

  if (!load) return <LoadingState />;

  // Der nächste Schritt ist der erste, der noch keinen Zeitstempel hat
  const nextStep = statusSteps.find((step) => !load[step.field]);

  return (
    <>
      <PageHeader
        title={load.company_name ?? "Auftrag"}
        description={`Auftrag #${load.id}`}
        backTo="/fahrer-dashboard/auftrage"
        action={<StatusBadge load={load} />}
      />

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Auftragsdetails */}
        <section className={`${panel} p-5 sm:p-6 lg:col-span-3`}>
          <h2 className="mb-5 font-semibold text-slate-900 dark:text-white">
            Route
          </h2>
          <RouteLine from={load.sender_address} to={load.delivery_address} />

          <dl className="mt-6 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-2 dark:border-slate-800">
            <InfoItem
              label="Abholtermin"
              value={formatDate(load.pickup_date)}
            />
            <InfoItem
              label="Liefertermin"
              value={formatDate(load.delivery_date)}
            />
            <InfoItem label="Ladungsart" value={load.cargo_type} />
            <InfoItem
              label="Gewicht"
              value={load.cargo_weight && `${load.cargo_weight} kg`}
            />
            <div className="sm:col-span-2">
              <InfoItem label="Besondere Hinweise" value={load.description} />
            </div>
          </dl>
        </section>

        {/* Status melden */}
        <section className={`${panel} p-5 sm:p-6 lg:col-span-2`}>
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Status melden
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Tippe auf den nächsten Schritt, sobald er erledigt ist.
          </p>

          <ol className="mt-5 flex flex-col gap-3">
            {statusSteps.map((step, i) => {
              const time = load[step.field];
              const isNext = nextStep?.field === step.field;

              // 1) Schritt erledigt
              if (time) {
                return (
                  <li
                    key={step.field}
                    className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 dark:bg-blue-950/40"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="flex-1 font-medium text-slate-900 dark:text-white">
                      {step.label}
                    </span>
                    <span className="text-xs text-slate-500 tabular-nums dark:text-slate-400">
                      {formatDateTime(time)}
                    </span>
                  </li>
                );
              }

              // 2) Nächster Schritt – als Button
              if (isNext) {
                return (
                  <li key={step.field}>
                    {step.field === "delivered_at" ? (
                      <CustomAlertDialog
                        title="Zustellung bestätigen"
                        description="Möchtest du wirklich bestätigen, dass die Ladung erfolgreich zugestellt wurde? Diese Aktion kann nicht rückgängig gemacht werden."
                        buttonName={`${i + 1}. ${step.label}`}
                        onConfirm={() => statusUpdate(step.field)}
                        className={`${primaryButton} w-full`}
                      />
                    ) : (
                      <Button
                        onClick={() => statusUpdate(step.field)}
                        className={`${primaryButton} w-full`}
                      >
                        {i + 1}. {step.label}
                      </Button>
                    )}
                  </li>
                );
              }

              // 3) Späterer Schritt – noch gesperrt
              return (
                <li
                  key={step.field}
                  className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 px-4 py-3 text-slate-400 dark:border-slate-700"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-300 text-xs font-semibold dark:border-slate-600">
                    {i + 1}
                  </span>
                  {step.label}
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    </>
  );
}

export default LoadDetails;
