import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import supabase from '../../../lib/supabaseClient';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import { Tables } from '../../../types/database.types';

type Load = Tables<'loads'> & { driver: Tables<'profiles'> | null };

function ActiveLoads() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetschDeliveredLoads() {
      const { data, error } = await supabase
        .from('loads')
        .select('*, driver:profiles!loads_driver_id_fkey( *)')
        .eq('done', false);
      console.log(data);

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

  async function finishLoads(id: number) {
    const { error } = await supabase
      .from('loads')
      .update({ done: true })
      .eq('id', id);

    if (error) {
      toast.error('Fehler beim Aktualisieren');
    } else {
      toast.success('Ladung wurde Erledigkt');
      setLoads((load) => load.filter((load) => load.id !== id));
    }
  }

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
    <div className="flex flex-col gap-5 md:pt-15 w-full h-full">
      {loads.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className=" text-black/50 text-3xl  text-center">
            Aktuell sind keine offenen Aufträge vorhanden.
          </p>
        </div>
      ) : (
        loads.map((index) => (
          <Card
            key={index.id}
            className=" md:w-[80%] flex flex-col  shadow-md p-4 pl-10 hover:shadow-lg transition "
          >
            <div className="flex flex-wrap justify-between gap-10">
              <div className="md:w-[80%] flex gap-20 ">
                <div className="flex lg:w-[35%]  flex-col gap-2">
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
              <div className="flex">
                <Button
                  onClick={() =>
                    navigate(
                      `/disponent-dashboard/offene-aufträge/bearbeiten/${index.id}`
                    )
                  }
                  className="cursor-pointer "
                >
                  <FaEdit />
                </Button>
              </div>
            </div>
            <div className="flex   gap-3">
              <p className="flex gap-2">
                <span className="text-black/50">Fahrer:</span>
                {index.driver!.firstName}
              </p>
              <p> {index.driver!.lastName}</p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-[80%]"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-md cursor-pointer ">
                  Status Ansehen
                </AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-5">
                  <p className="flex gap-2 ">
                    <span className="text-black/50">Beladen:</span>

                    {index.loaded_at
                      ? new Date(index.loaded_at).toLocaleString('de-De', {
                          timeZone: 'Europe/Berlin',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Noch nicht gesetzt'}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-black/50"> Unterwegs:</span>
                    {index.onroad_at
                      ? new Date(index.onroad_at).toLocaleString('de-De', {
                          timeZone: 'Europe/Berlin',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Noch nicht gesetzt'}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-black/50"> Entladen:</span>
                    {index.unloaded_at
                      ? new Date(index.unloaded_at).toLocaleString('de-De', {
                          timeZone: 'Europe/Berlin',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Noch nicht gesetzt'}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-black/50"> Zugestellt:</span>
                    {index.delivered_at
                      ? new Date(index.delivered_at).toLocaleString('de-De', {
                          timeZone: 'Europe/Berlin',
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Nocht nicht gesetzt'}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <Button
                onClick={() => finishLoads(index.id)}
                className="cursor-pointer"
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
export default ActiveLoads;
