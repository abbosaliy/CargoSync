import {
  FaBox,
  FaCheckCircle,
  FaUser,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import supabase from '../../lib/supabaseClient';
import { Button } from '../ui/button';
import { FaTruckFast } from 'react-icons/fa6';
import { VscAccount } from 'react-icons/vsc';
import { toast } from 'sonner';
import CustomAlertDialog from '../ui/Dialog';
import ThemaToggle from '../ThemaToggle';

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
        toast.error('Etwas ist schief gelaufen!');
      } else {
        setProfile(data);
      }
    }
    fetschProfile();
  }, []);

  async function Logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error('Abmeldung fehlgeschlagen');
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
        className={`dark:bg-slate-900  w-64 lg:w-75 h-full p-4 justify-between  bg-white border-r border-black/20 dark:border-white/30 flex flex-col duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 md:static md:translate-x-0 `}
      >
        <div className=" absolute left-2 flex justify-center items-center gap-5">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              alt="CargoSync Logo"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide dark:text-gray-100">
              CargoSync
            </h1>
          </div>
          <ThemaToggle></ThemaToggle>
        </div>
        <div className="self-end pt-20">
          <Button
            className="md:hidden cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={24} />
          </Button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <VscAccount
            size={80}
            color="gray"
          />
          <h2 className="mt-4 text-lg font-semibold flex gap-1">
            <span>{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </h2>
          <p className="text-gray-500 text-sm capitalize">{profile.role}</p>
        </div>

        <nav className="flex flex-col   gap-8">
          <NavLink
            to={'auftrag-erstellen'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaBox />
            Aufträge Erstellen
          </NavLink>
          <NavLink
            to={'offene-aufträge'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 '
              }`
            }
          >
            <FaTruckFast />
            Offene Aufträge
          </NavLink>
          <NavLink
            to={'erledigkte-aufträge'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 '
              }`
            }
          >
            <FaCheckCircle />
            Erledigkte Aufträge
          </NavLink>
          <NavLink
            to={'personliche-data'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaUser />
            Persönliche Info
          </NavLink>
          <NavLink
            to={'uber-app'}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaInfoCircle />
            Über App
          </NavLink>
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
