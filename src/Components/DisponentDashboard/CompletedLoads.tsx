import { FaRegCheckCircle } from 'react-icons/fa';
import { Card } from '../ui/card';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { toast } from 'sonner';
import { ClipLoader } from 'react-spinners';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Tables } from '../../types/database.types';

type Load = Tables<'loads'> & { driver: Tables<'profiles'> | null };

function CompletedLoads() {
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetschFinishedLoads() {
      const { data, error } = await supabase
        .from('loads')
        .select('*, driver:profiles!loads_driver_id_fkey( *)')
        .eq('done', true);

      if (error) {
        toast.error('Etwas ist schief gelaufen');
      } else {
        setLoads(data);
      }

      setLoading(false);
    }

    fetschFinishedLoads();
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
    <div className="flex flex-col gap-5 md:pt-15 w-full h-full">
      {loads.length === 0 ? (
        <div className="flex items-center justify-center h-full w-full">
          <p className=" text-black/50 text-3xl  text-center">
            Aktuell sind keine erledigkte Aufträge vorhanden.
          </p>
        </div>
      ) : (
        loads.map((index) => (
          <Card
            key={index.id}
            className=" md:w-[80%] flex flex-col  shadow-md p-4 pl-10 hover:shadow-lg transition"
          >
            <div className="flex gap-15 flex-wrap ">
              <div className="flex lg:w-[35%] flex-col gap-2">
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
                  <p>{index.description}</p>
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

            <div className="flex  flex-wrap gap-5">
              <div className="flex gap-2">
                <span className="text-black/50 ">Status:</span>
                <p className="text-green-500 font-bold ">Zugestellt</p>
              </div>
              <div className="flex gap-2">
                <p className="flex gap-2">
                  <span className="text-black/50">Fahrer:</span>
                  {index.driver!.firstName}
                </p>
                <p> {index.driver!.lastName}</p>
              </div>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-[80%]"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Status Ansehen</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-5">
                  <p className="flex gap-2 ">
                    <span className="text-black/50">Beladen:</span>
                    {index.loaded_at
                      ? new Date(index?.loaded_at ?? '').toLocaleString(
                          'de-De',
                          {
                            timeZone: 'Europe/Berlin',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )
                      : 'Die Zeit des Fahrers ist nicht gesetzt!'}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-black/50"> Unterwegs:</span>
                    {index.onroad_at
                      ? new Date(index?.onroad_at ?? '').toLocaleString(
                          'de-De',
                          {
                            timeZone: 'Europe/Berlin',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )
                      : 'Die Zeit des Fahrers ist nicht gesetzt!'}
                  </p>
                  <p className="flex gap-2">
                    <span className="text-black/50"> Entladen:</span>
                    {index.unloaded_at
                      ? new Date(index?.unloaded_at ?? '').toLocaleString(
                          'de-De',
                          {
                            timeZone: 'Europe/Berlin',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )
                      : 'Die Zeit des Fahrers ist nicht gesetzt!'}
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
                      : 'Die Zeit des Fahrers ist nicht gesetzt!'}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex items-center gap-5">
              <p> Auftrag Abgeschlossen</p>
              <FaRegCheckCircle />
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

export default CompletedLoads;
