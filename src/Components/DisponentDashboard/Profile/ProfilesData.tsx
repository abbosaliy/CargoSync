import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import { Link, Outlet } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'sonner';

type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: string;
};

function ProfileData() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetschProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('firstName , lastName, role, email, phoneNumber')
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
    <div className="md:pt-15 flex flex-col gap-10 md:w-[50%]">
      <div className="flex gap-10 justify-between items-center">
        <h1 className="text-xl mb-4">Persönlichen Daten</h1>
        <Link
          to={'bearbeiten'}
          className=" md:w-40 bg-blue-500 px-4 py-1.5 text-center hover:bg-blue-600 rounded-md text-white"
        >
          Bearbeiten
        </Link>
      </div>
      <div className="flex items-start gap-20 border-b border-black/20  dark:border-white/50 pb-3">
        <p>Vorname:</p>
        <p>{profile.lastName}</p>
      </div>
      <div className="flex  items-center gap-20 border-b border-black/20 dark:border-white/50 pb-3">
        <p>Nachname:</p>
        <p>{profile.firstName}</p>
      </div>
      <div className="flex  items-center gap-20 border-b border-black/20  dark:border-white/30 pb-3">
        <p>Position:</p>
        <p className="capitalize">{profile.role}</p>
      </div>
      <div className="flex  items-center gap-20 border-b border-black/20  dark:border-white/30 pb-3">
        <p>Tel:</p>
        <p>{profile.phoneNumber}</p>
      </div>
      <div className="flex  items-center gap-20 border-b border-black/20  dark:border-white/30 pb-3">
        <p>Email-Adresse:</p>
        <p>{profile.email}</p>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default ProfileData;
