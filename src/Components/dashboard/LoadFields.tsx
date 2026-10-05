import type { ReactNode } from "react";
import { MapPin, Package, Truck } from "lucide-react";
import { Input } from "../ui/input";
import { fieldInput, fieldLabel, fieldTextarea, panel } from "./styles";


export type LoadFormValues = {
  company_name: string;
  sender_address: string;
  pickup_date: string;
  delivery_address: string;
  delivery_date: string;
  cargo_type: string;
  cargo_weight: string;
  description: string;
};

type LoadFieldsProps = {
  value: LoadFormValues;
  onChange: (field: keyof LoadFormValues, value: string) => void;
};

export function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`${panel} p-5 sm:p-6`}>
      <h2 className="mb-5 flex items-center gap-2.5 font-semibold text-slate-900 dark:text-white">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
          {icon}
        </span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`flex flex-col ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      {children}
    </div>
  );
}

function LoadFields({ value, onChange }: LoadFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <Section icon={<MapPin className="h-4 w-4" />} title="Abholung">
        <Field id="company_name" label="Firmenname" wide>
          <Input
            id="company_name"
            className={fieldInput}
            value={value.company_name}
            onChange={(e) => onChange("company_name", e.target.value)}
          />
        </Field>
        <Field id="sender_address" label="Abholadresse">
          <Input
            id="sender_address"
            className={fieldInput}
            placeholder="Straße, PLZ Ort"
            value={value.sender_address}
            onChange={(e) => onChange("sender_address", e.target.value)}
          />
        </Field>
        <Field id="pickup_date" label="Abholdatum">
          <Input
            id="pickup_date"
            type="date"
            className={fieldInput}
            value={value.pickup_date}
            onChange={(e) => onChange("pickup_date", e.target.value)}
          />
        </Field>
      </Section>

      <Section icon={<Truck className="h-4 w-4" />} title="Lieferung">
        <Field id="delivery_address" label="Lieferadresse">
          <Input
            id="delivery_address"
            className={fieldInput}
            placeholder="Straße, PLZ Ort"
            value={value.delivery_address}
            onChange={(e) => onChange("delivery_address", e.target.value)}
          />
        </Field>
        <Field id="delivery_date" label="Lieferdatum">
          <Input
            id="delivery_date"
            type="date"
            className={fieldInput}
            value={value.delivery_date}
            onChange={(e) => onChange("delivery_date", e.target.value)}
          />
        </Field>
      </Section>

      <Section icon={<Package className="h-4 w-4" />} title="Ladung">
        <Field id="cargo_type" label="Ladungsart">
          <Input
            id="cargo_type"
            className={fieldInput}
            placeholder="z. B. Paletten, Stückgut"
            value={value.cargo_type}
            onChange={(e) => onChange("cargo_type", e.target.value)}
          />
        </Field>
        <Field id="cargo_weight" label="Gewicht (kg)">
          <Input
            id="cargo_weight"
            inputMode="numeric"
            className={fieldInput}
            value={value.cargo_weight}
            onChange={(e) => onChange("cargo_weight", e.target.value)}
          />
        </Field>
        <Field id="description" label="Besondere Hinweise" wide>
          <textarea
            id="description"
            className={fieldTextarea}
            value={value.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </Field>
      </Section>
    </div>
  );
}

export default LoadFields;
