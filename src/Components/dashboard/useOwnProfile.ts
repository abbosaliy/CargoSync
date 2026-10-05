import { useEffect, useState } from "react";
import { toast } from "sonner";
import supabase from "../../lib/supabaseClient";


export type OwnProfile = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
};

export function useOwnProfile() {
  const [profile, setProfile] = useState<OwnProfile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("firstName, lastName, role, email, phoneNumber")
        .eq("id", user.id)
        .single();

      if (error) {
        toast.error("Etwas ist schief gelaufen!");
      } else if (data) {
        setProfile({
          id: user.id,
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          email: data.email ?? "",
          phoneNumber: data.phoneNumber ?? "",
          role: data.role ?? "",
        });
      }
    }

    fetchProfile();
  }, []);

  return [profile, setProfile] as const;
}
