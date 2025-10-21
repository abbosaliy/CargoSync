import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import supabase from '../../lib/supabaseClient';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { Button } from '../ui/button';
import { Tables } from '../../types/database.types';

type Load = Tables<'loads'>;

// Diese Component aktuell nicht verfügbar, das ist nächste version eingeplant
function DeliveredLoads() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetschDeliveredLoads() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        toast.error('Etwas ist schief gelaufen');
        return;
      }

      const { data, error } = await supabase
        .from('loads')
        .select('*')
        .eq('driver_id', user.id)
        .not('delivered_at', 'is', null);

      if (error) {
        console.log(error);
        toast.error('Etwas ist schief gelaufen');
      } else if (data) {
        setLoads(data);
        console.log(data);
      }

      setLoading(false);
    }

    fetschDeliveredLoads();
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
    <div className="flex flex-col gap-5 pt-5 w-full h-full">
      {loads.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className=" text-black/50 text-3xl  text-center">
            Es gibt keinen Abgeschlossene Aufträge
          </p>
        </div>
      ) : (
        loads.map((index) => (
          <Card
            key={index.id}
            className=" md:w-[80%] flex flex-col  shadow-md p-4 pl-10 hover:shadow-lg transition"
          >
            <div className="flex flex-row gap-15">
              <div className="flex w-[30%] flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Firmen Name</span>
                  <p>{index.company_name}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Abhol Andesse</span>
                  <p>{index.sender_address}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Abholtermin</span>
                  <p>{index.pickup_date}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-black/50 text-sm">
                    Zusatzinformationen
                  </span>
                  <p>{index.delivery_date}</p>
                </div>
              </div>
              <div className="flex  flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Lieferadresse</span>
                  <p>{index.delivery_address}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Liefertermin</span>
                  <p>{index.delivery_date}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-black/50 text-sm">Frachtart</span>
                  <p>{index.cargo_type}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-black/50 text-sm">Gewicht</span>
                  <p>{index.cargo_weight}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-black/50 ">Status:</span>
              <p className="text-green-500 font-bold ">Zugestellt</p>
              <p>
                {index.delivered_at &&
                  new Date(index.delivered_at).toLocaleString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
              </p>
            </div>
            <div>
              <Button
                className="cursor-pointer"
                variant="destructive"
              >
                Auftrag Abschließen
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default DeliveredLoads;
