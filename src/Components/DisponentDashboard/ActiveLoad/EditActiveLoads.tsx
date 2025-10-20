import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../../lib/supabaseClient';
import { toast } from 'sonner';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { ClipLoader } from 'react-spinners';

type Load = {
  id: number;
  company_name: string;
  sender_address: string;
  pickup_date: string;
  delivery_date: string;
  delivery_address: string;
  description: string;
  cargo_type: string;
  cargo_weight: string;
};

function EditLoads() {
  const [value, setValue] = useState<Load>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    async function fetschActiveLoads() {
      const { data, error } = await supabase
        .from('loads')
        .select(
          'id, company_name, sender_address, delivery_address, pickup_date, delivery_date, cargo_type, description, cargo_weight'
        )
        .eq('id', id)
        .single();

      if (error) {
        console.log(error);
        toast.error('Etwas ist schief gelaufen');
      } else {
        setValue(data);
        console.log(data);
      }
    }

    fetschActiveLoads();
  }, [id]);

  async function hanleUpdate() {
    if (
      !value?.company_name ||
      !value?.sender_address ||
      !value?.pickup_date ||
      !value?.delivery_address ||
      !value?.delivery_date ||
      !value?.cargo_weight ||
      !value?.cargo_type ||
      !value?.description
    ) {
      toast.error('Bitte alle Pflichtfeldern ausfüllen !');
      return;
    }

    const { error } = await supabase
      .from('loads')
      .update(value)
      .eq('id', value.id);

    if (error) {
      toast.error('Etwas ist schief gelaufen !');
    } else {
      toast.success('Daten wurde erfolgreich gändert');
      navigate(-1);
    }
  }

  if (!value)
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader
          color="#3B82F6"
          size={70}
        />
      </div>
    );

  return (
    <div className="flex flex-col gap-10 md:pt-15 pb-10 xl:w-4xl ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p>Firmenname</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.company_name}
            onChange={(e) =>
              setValue({ ...value, company_name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Abhol Adresse</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.sender_address}
            onChange={(e) =>
              setValue({ ...value, sender_address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p>Abholdatum</p>
          <Input
            type="date"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.pickup_date}
            onChange={(e) =>
              setValue({ ...value, pickup_date: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Lieferung Adresse</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.delivery_address}
            onChange={(e) =>
              setValue({ ...value, delivery_address: e.target.value })
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p>Lieferdatum</p>
          <Input
            type="date"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.delivery_date}
            onChange={(e) =>
              setValue({ ...value, delivery_date: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Ladung Gewicht (kg)</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.cargo_weight}
            onChange={(e) =>
              setValue({ ...value, cargo_weight: e.target.value })
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p>Ladungsart</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.cargo_type}
            onChange={(e) => setValue({ ...value, cargo_type: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Besondere Hinweise</p>
          <Input
            type="text"
            className="border border-black/20 rounded-md p-2 w-full"
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="md:w-50 "></div>
      <Button
        className="w-full md:w-50  "
        onClick={hanleUpdate}
      >
        Speichern
      </Button>
    </div>
  );
}

export default EditLoads;
