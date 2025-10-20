import { useEffect, useState } from 'react';
import supabase from '../../lib/supabaseClient';
import { toast } from 'sonner';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { LuCheckCheck } from 'react-icons/lu';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { IoMdArrowRoundBack } from 'react-icons/io';
import CustomAlertDialog from '../ui/Dialog';

type Load = {
  id: number;
  company_name: string | null;
  sender_address: string | null;
  pickup_date: string | null;
  delivery_address: string | null;
  delivery_date: string | null;
  description: string | null;
  cargo_type: string | null;
  cargo_weight: string | null;
  loaded_at: string | null;
  onroad_at: string | null;
  unloaded_at: string | null;
  delivered_at: string | null;
};

function LoadDetails() {
  const [loads, setLoads] = useState<Load | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    async function fetchLoad() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('loads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.log(error);
        toast.error('Etwas ist schief gelaufen');
      } else {
        console.log(data);
        setLoads(data);
      }
    }

    fetchLoad();
  }, [id]);

  async function statusUpdate(field: keyof Load) {
    if (!loads) return;

    const localTime = new Date().toISOString();

    const { error } = await supabase
      .from('loads')
      .update({ [field]: localTime })
      .eq('id', loads.id);

    if (error) {
      console.log(error);
      toast.error('Fehler beim Aktualisieren');
      return;
    }

    setLoads({ ...loads, [field]: localTime });
    toast.success('Status aktualisiert!');

    if (field === 'delivered_at') {
      setLoads(null);
      navigate(-1);
    }
  }

  if (!loads)
    return (
      <div className="flex  items-center justify-center h-full w-full">
        <ClipLoader
          color="#3B82F6"
          size={70}
        />
      </div>
    );

  return (
    <div className="flex w-full  max-w-5xl  flex-col  ">
      <Card className="flex flex-col   shadow-md p-4 pl-10 hover:shadow-lg transition">
        <div className="flex flex-row gap-15">
          <div className="flex w-[30%] flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Firmen Name</span>
              <p>{loads.company_name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Abhol Andesse</span>
              <p>{loads.sender_address}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Abholtermin</span>
              <p>{loads.pickup_date}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-black/50 text-sm">Zusatzinformationen</span>
              <p>{loads.description}</p>
            </div>
          </div>
          <div className="flex  flex-col gap-2">
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Lieferadresse</span>
              <p>{loads.delivery_address}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Liefertermin</span>
              <p>{loads.delivery_date}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-black/50 text-sm">Frachtart</span>
              <p>{loads.cargo_type}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-black/50 text-sm">Gewicht</span>
              <p>{loads.cargo_weight}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-5  ">
          <Button
            variant="default"
            onClick={() => statusUpdate('loaded_at')}
          >
            Beladen
            {loads.loaded_at && (
              <LuCheckCheck className="inline ml-2 text-gray-300" />
            )}
          </Button>
          <Button
            variant="default"
            onClick={() => statusUpdate('onroad_at')}
          >
            Unterwegs
            {loads.onroad_at && (
              <LuCheckCheck className="inline ml-2 text-gray-300" />
            )}
          </Button>
          <Button
            variant="default"
            onClick={() => statusUpdate('unloaded_at')}
          >
            Entladen
            {loads.unloaded_at && (
              <LuCheckCheck className="inline ml-2 text-gray-300" />
            )}
          </Button>
          <CustomAlertDialog
            title="Zustellung bestätigen"
            description="Möchtest du wirklich bestätigen, dass die Ladung erfolgreich zugestellt wurde? Diese Aktion kann nicht rückgängig gemacht werden."
            buttonName="Zugestellt"
            icon={
              loads.delivered_at && (
                <LuCheckCheck className="inline ml-2 text-gray-300" />
              )
            }
            onConfirm={() => statusUpdate('delivered_at')}
          ></CustomAlertDialog>
        </div>

        <Button
          variant="default"
          className="md:w-sm"
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack />
          Züruck
        </Button>
      </Card>
    </div>
  );
}

export default LoadDetails;
