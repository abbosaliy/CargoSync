import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { InfoItem, LoadingState, PageHeader } from "./ui";
import { panel, primaryButton } from "./styles";
import { useOwnProfile } from "./useOwnProfile";


function ProfileOverview() {
  const [profile] = useOwnProfile();

  if (!profile) return <LoadingState />;

  const initials =
    `${profile.firstName[0] ?? ""}${profile.lastName[0] ?? ""}`.toUpperCase();

  return (
    <>
      <PageHeader
        title="Persönliche Daten"
        description="Deine Kontaktdaten und deine Rolle in CargoSync."
        action={
          <Link
            to="bearbeiten"
            className={`${primaryButton} inline-flex items-center justify-center gap-2`}
          >
            <Pencil className="h-4 w-4" />
            Bearbeiten
          </Link>
        }
      />

      <div className={`${panel} max-w-2xl overflow-hidden`}>
        <div className="flex items-center gap-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-transparent p-6 dark:border-slate-800 dark:from-blue-950/40">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {initials || "?"}
          </span>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-sm text-slate-500 capitalize dark:text-slate-400">
              {profile.role}
            </p>
          </div>
        </div>

        <dl className="grid gap-6 p-6 sm:grid-cols-2">
          <InfoItem label="Vorname" value={profile.firstName} />
          <InfoItem label="Nachname" value={profile.lastName} />
          <InfoItem
            label="Position"
            value={<span className="capitalize">{profile.role}</span>}
          />
          <InfoItem label="Telefon" value={profile.phoneNumber} />
          <InfoItem label="E-Mail-Adresse" value={profile.email} />
        </dl>
      </div>
    </>
  );
}

export default ProfileOverview;
