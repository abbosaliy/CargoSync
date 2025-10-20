import {
  FaBox,
  FaCheckCircle,
  FaUser,
  FaSignOutAlt,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import { Button } from '../ui/button';
import { FaTruckFast } from 'react-icons/fa6';
import { toast } from 'sonner';
import CustomAlertDialog from '../ui/Dialog';

type Profile = {
  firstName: string | null;
  lastName: string | null;
  role: string | null;
};

function SidebarDiponenten() {
  const [isOpen, setIsOpen] = useState(false);
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
        .select('firstName , lastName, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setProfile(data);
      }
    }
    fetschProfile();
  }, []);

  async function Logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      toast.error('Fehler beim Ausloggen');
      return;
    }
    navigate('/');
  }

  if (!profile) return;

  return (
    <div>
      <Button
        className="md:hidden  cursor-pointer "
        onClick={() => setIsOpen(true)}
      >
        <FaBars size={24} />
      </Button>
      <aside
        className={`w-64 lg:w-75 h-full p-4 justify-between  border-r bg-white  border-black/20 flex flex-col duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 md:static md:translate-x-0 `}
      >
        <div className="self-end">
          <Button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </Button>
        </div>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/Logistik-App/profile.jpg"
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover"
          />
          <h2 className="mt-4 text-lg font-semibold flex gap-1">
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </h2>
          <p className="text-gray-500 text-sm capitalize">{profile.role}</p>
        </div>

        <nav className="flex flex-col   gap-8">
          <Link
            to={'auftrag-erstellen'}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <FaBox />
            Aufträge Erstellen
          </Link>
          <Link
            to={'offene-aufträge'}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <FaTruckFast />
            Offene Aufträge
          </Link>
          <Link
            to={'erledigkte-aufträge'}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            <FaCheckCircle />
            Erledigkte Aufträge
          </Link>
          <Link
            to={'personliche-data'}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaUser />
            Persönliche Info
          </Link>
          <Link
            to={'uber-app'}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <FaInfoCircle />
            Über App
          </Link>
          <CustomAlertDialog
            title="Ausloggen bestätigen"
            description="Willst du wirklich raus gehen?"
            buttonName="Ausloggen"
            onConfirm={Logout}
            className="bg-red-500 hover:bg-red-600 cursor-pointer flex gap-5 "
          />
        </nav>
      </aside>
    </div>
  );
}

export default SidebarDiponenten;
