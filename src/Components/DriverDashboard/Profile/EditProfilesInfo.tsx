import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
};

function EditProfilesInfo() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetschProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('firstName, lastName, email, phoneNumber, role')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error('Etwas ist schief gelaufen!');
      } else if (data) {
        setProfile({
          id: user.id,
          firstName: data.firstName ?? '',
          lastName: data.lastName ?? '',
          email: data.email ?? '',
          phoneNumber: data.phoneNumber ?? '',
          role: data.role ?? '',
        });
      }
    }

    fetschProfile();
  }, []);

  async function hanleUpdate() {
    if (
      !profile?.firstName ||
      !profile?.lastName ||
      !profile?.email ||
      !profile?.phoneNumber ||
      !profile?.role
    ) {
      toast.error('Bitte alle Pflichtfelder ausfüllen!');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        role: profile.role,
      })
      .eq('id', profile.id);

    if (error) {
      toast.error('Etwas ist schif gelaufen!');
    } else {
      toast.success('Daten wurden erfolgreich gändert');
      navigate('..');
    }
  }

  if (!profile)
    return (
      <div className="flex  items-center justify-center h-full w-full">
        <ClipLoader
          color="#3B82F6"
          size={70}
        />
      </div>
    );

  return (
    <div className="flex flex-col md:pt-15 md:w-[50%] gap-5">
      <h1 className="text-xl">Profile daten bearbeiten</h1>
      <div className="flex flex-col gap-4">
        <p>Vorname</p>
        <Input
          type="text"
          value={profile.lastName}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>Nachname</p>
        <Input
          type="text"
          value={profile.firstName}
          onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>Position</p>
        <Input
          type="text"
          value={profile.role}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>Telefon nummer</p>
        <Input
          type="text"
          value={profile.phoneNumber}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>Email - Adresse</p>
        <Input
          type="text"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
      </div>
      <Button
        onClick={hanleUpdate}
        className="w-full  md:w-40 px-6 py-2 rounded-md cursor-pointer"
      >
        Speichern
      </Button>
    </div>
  );
}

export default EditProfilesInfo;
