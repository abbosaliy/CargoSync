import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingState, PageHeader } from "./ui";
import {
  fieldInput,
  fieldLabel,
  panel,
  primaryButton,
  secondaryButton,
} from "./styles";
import { useOwnProfile, type OwnProfile } from "./useOwnProfile";

type EditableField = "firstName" | "lastName" | "phoneNumber" | "email";

const fields: { key: EditableField; label: string; type: string }[] = [
  { key: "firstName", label: "Vorname", type: "text" },
  { key: "lastName", label: "Nachname", type: "text" },
  { key: "phoneNumber", label: "Telefon", type: "tel" },
  { key: "email", label: "E-Mail-Adresse", type: "email" },
];

function ProfileEditor() {
  const [profile, setProfile] = useOwnProfile();
  const navigate = useNavigate();

  async function handleUpdate() {
    if (
      !profile?.firstName ||
      !profile.lastName ||
      !profile.email ||
      !profile.phoneNumber
    ) {
      toast.error("Bitte alle Pflichtfelder ausfüllen!");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("Etwas ist schief gelaufen!");
    } else {
      toast.success("Daten wurden erfolgreich geändert");
      navigate("..");
    }
  }

  if (!profile) return <LoadingState />;

  function update(key: keyof OwnProfile, value: string) {
    setProfile((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <>
      <PageHeader
        title="Profil bearbeiten"
        description="Änderungen werden sofort gespeichert."
        backTo=".."
      />

      <div className={`${panel} max-w-2xl p-6`}>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map(({ key, label, type }) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className={fieldLabel}>
                {label}
              </label>
              <Input
                id={key}
                type={type}
                className={fieldInput}
                value={profile[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label htmlFor="role" className={fieldLabel}>
              Position
            </label>
            <Input
              id="role"
              className={`${fieldInput} capitalize`}
              value={profile.role}
              disabled
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Die Rolle kann nicht geändert werden.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            onClick={() => navigate("..")}
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

export default ProfileEditor;
