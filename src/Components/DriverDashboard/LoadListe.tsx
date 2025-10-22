import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

type Load = {
  id: number;
  company_name: string | null;
  sender_address: string | null;
  pickup_date: string | null;
  delivery_date: string | null;
  delivery_address: string | null;
  delivered_at: string | null;
};

function LoadListe() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetschProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('loads')
        .select(
          'id, company_name, delivery_address, delivery_date, sender_address, pickup_date, delivered_at '
        )
        .eq('driver_id', user.id)
        .is('delivered_at', null);

      if (error) {
        toast.error('Etwas ist schief gelaufen!');
      } else {
        setLoads(data);
      }

      setLoading(false);
    }

    fetschProfile();
  }, []);

  if (loading)
    return (
      <div className="flex  items-center justify-center h-full w-full">
        <ClipLoader
          color="#3B82F6"
          size={70}
        />
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col gap-5">
      {loads.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className=" text-black/50 text-3xl  text-center">
            Aktuell sind keine Aufträge vorhanden.
          </p>
        </div>
      ) : (
        loads.map((load) => (
          <Card
            key={load.id}
            className="flex flex-col w-full max-w-5xl shadow-md p-4 pl-10 hover:shadow-lg transition"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-xl text-gray-800 font-semibold">
                {load.company_name}
              </h2>
              <p className="text-md text-gray-600">
                Abholadresse: {load.sender_address}
              </p>
              <p className="text-md text-gray-600">
                Lieferadresse: {load.delivery_address}
              </p>
              <p className="text-md text-gray-600">
                Lieferdatum: {load.delivery_date}
              </p>
            </div>
            <Button
              className="md:w-sm"
              onClick={() => navigate(`/fahrer-dashboard/auftrage/${load.id}`)}
            >
              Auftrag Starten
            </Button>
          </Card>
        ))
      )}
    </div>
  );
}

export default LoadListe;
