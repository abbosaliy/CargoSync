import { useState } from "react";
import { UserRound } from "lucide-react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import { Button } from "../ui/button";
import CustomSelct from "../ui/customSelect";
import LoadFields, {
  Section,
  type LoadFormValues,
} from "../dashboard/LoadFields";
import { PageHeader } from "../dashboard/ui";
import {
  fieldLabel,
  primaryButton,
  secondaryButton,
} from "../dashboard/styles";

const emptyOrder: LoadFormValues & { driver_id: string } = {
  company_name: "",
  sender_address: "",
  pickup_date: "",
  delivery_address: "",
  delivery_date: "",
  cargo_type: "",
  description: "",
  cargo_weight: "",
  driver_id: "",
};

function CreateOrder() {
  const [value, setValue] = useState(emptyOrder);

  async function handleSend() {
    if (
      !value.company_name ||
      !value.sender_address ||
      !value.pickup_date ||
      !value.delivery_address ||
      !value.delivery_date ||
      !value.cargo_type ||
      !value.description ||
      !value.cargo_weight ||
      !value.driver_id
    ) {
      toast.error("Bitte alle Pflichtfelder ausfüllen!");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("Etwas ist schief gelaufen!");
      return;
    }

    const { error } = await supabase
      .from("loads")
      .insert([{ ...value, disponent_id: user.id }]);

    if (error) {
      toast.error("Etwas ist schief gelaufen!");
    } else {
      toast.success("Die Ladung wurde erfolgreich erstellt");
      setValue(emptyOrder);
    }
  }

  return (
    <>
      <PageHeader
        title="Auftrag erstellen"
        description="Erfasse die Daten der Ladung und weise sie einem Fahrer zu."
      />

      <div className="flex flex-col gap-5">
        <LoadFields
          value={value}
          onChange={(field, fieldValue) =>
            setValue({ ...value, [field]: fieldValue })
          }
        />

        <Section icon={<UserRound className="h-4 w-4" />} title="Fahrer">
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="driver" className={fieldLabel}>
              Fahrer zuweisen
            </label>
            <CustomSelct
              id="driver"
              value={value.driver_id}
              onSelect={(id) => setValue({ ...value, driver_id: id })}
            />
          </div>
        </Section>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={() => setValue(emptyOrder)}
            className={secondaryButton}
          >
            Zurücksetzen
          </Button>
          <Button type="button" onClick={handleSend} className={primaryButton}>
            Auftrag erstellen
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateOrder;
