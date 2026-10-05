import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import supabase from "../../../lib/supabaseClient";
import { Button } from "../../ui/button";
import LoadFields, { type LoadFormValues } from "../../dashboard/LoadFields";
import { LoadingState, PageHeader } from "../../dashboard/ui";
import { primaryButton, secondaryButton } from "../../dashboard/styles";

function EditLoads() {
  const [value, setValue] = useState<LoadFormValues | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function fetchLoad() {
      const { data, error } = await supabase
        .from("loads")
        .select(
          "company_name, sender_address, delivery_address, pickup_date, delivery_date, cargo_type, description, cargo_weight",
        )
        .eq("id", Number(id))
        .single();

      if (error) {
        toast.error("Etwas ist schief gelaufen");
      } else {
        // null-Werte aus der Datenbank werden zu leeren Strings für die Eingabefelder
        setValue({
          company_name: data.company_name ?? "",
          sender_address: data.sender_address ?? "",
          pickup_date: data.pickup_date ?? "",
          delivery_address: data.delivery_address ?? "",
          delivery_date: data.delivery_date ?? "",
          cargo_type: data.cargo_type ?? "",
          cargo_weight: data.cargo_weight ?? "",
          description: data.description ?? "",
        });
      }
    }

    fetchLoad();
  }, [id]);

  async function handleUpdate() {
    if (!value || Object.values(value).some((field) => !field)) {
      toast.error("Bitte alle Pflichtfelder ausfüllen!");
      return;
    }

    const { error } = await supabase
      .from("loads")
      .update(value)
      .eq("id", Number(id));

    if (error) {
      toast.error("Etwas ist schief gelaufen!");
    } else {
      toast.success("Daten wurden erfolgreich geändert");
      navigate("/disponent-dashboard/offene-aufträge");
    }
  }

  if (!value) return <LoadingState />;

  return (
    <>
      <PageHeader
        title="Auftrag bearbeiten"
        description={`Auftrag #${id}`}
        backTo="/disponent-dashboard/offene-aufträge"
      />

      <div className="flex flex-col gap-5">
        <LoadFields
          value={value}
          onChange={(field, fieldValue) =>
            setValue({ ...value, [field]: fieldValue })
          }
        />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={() => navigate("/disponent-dashboard/offene-aufträge")}
            className={secondaryButton}
          >
            Abbrechen
          </Button>
          <Button
            type="button"
            onClick={handleUpdate}
            className={primaryButton}
          >
            Speichern
          </Button>
        </div>
      </div>
    </>
  );
}

export default EditLoads;
