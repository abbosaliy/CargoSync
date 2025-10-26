import { useState } from 'react';
import { Button } from '../ui/button';
import CustomSelct from '../ui/customSelect';
import { Input } from '../ui/input';
import supabase from '../../lib/supabaseClient';
import { toast } from 'sonner';

function CreateOrder() {
  const [value, setValue] = useState({
    company_name: '',
    sender_address: '',
    pickup_date: '',
    delivery_address: '',
    delivery_date: '',
    cargo_type: '',
    description: '',
    cargo_weight: '',
    driver_id: '',
  });

  async function handleSend() {
    if (
      !value.company_name ||
      !value.sender_address ||
      !value.pickup_date ||
      !value.delivery_address ||
      !value.delivery_date ||
      !value.cargo_type ||
      !value.description ||
      !value.cargo_weight ||
      !value.driver_id
    ) {
      toast.error('Bitte alle Pflichtfelder ausfüllen!');
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error('Etwas ist schief gelaufen!');
      return;
    }

    const { error } = await supabase.from('loads').insert([
      {
        company_name: value.company_name,
        sender_address: value.sender_address,
        pickup_date: value.pickup_date,
        delivery_address: value.delivery_address,
        delivery_date: value.delivery_date,
        cargo_type: value.cargo_type,
        description: value.description,
        cargo_weight: value.cargo_weight,
        driver_id: value.driver_id,
        disponent_id: user.id,
      },
    ]);

    if (error) {
      console.log(error);
      toast.error('Etwas ist schief gelaufen!');
    } else {
      toast.success('Die Ladung wurde erfolgreich erstellt');
      setValue({
        company_name: '',
        sender_address: '',
        pickup_date: '',
        delivery_address: '',
        delivery_date: '',
        cargo_type: '',
        description: '',
        cargo_weight: '',
        driver_id: '',
      });
    }
  }

  return (
    <div className="flex flex-col gap-10 md:pt-15 pb-10 xl:w-4xl bg-gray-50 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <p>Firmenname</p>
          <Input
            type="text"
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
            value={value.cargo_type}
            onChange={(e) => setValue({ ...value, cargo_type: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Besondere Hinweise</p>
          <Input
            type="text"
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </div>
      </div>
      <div className="md:w-50 ">
        <CustomSelct
          value={value.driver_id}
          onSelect={(id) =>
            setValue({
              ...value,
              driver_id: id,
            })
          }
        ></CustomSelct>
      </div>
      <Button
        onClick={handleSend}
        className="w-full md:w-50  cursor-pointer"
      >
        Senden
      </Button>
    </div>
  );
}

export default CreateOrder;
