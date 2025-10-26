import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import supabase from '../../lib/supabaseClient';

type Driver = {
  id: string;
  firstName: string;
  lastName: string;
};

function CustomSelct({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (id: string) => void;
}) {
  const [driver, setDriver] = useState<Driver[]>([]);

  useEffect(() => {
    async function fetschDriver() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, firstName, lastName, role')
        .eq('role', 'fahrer');

      if (error) {
        console.log(error);
      } else if (data) {
        setDriver(data as Driver[]);
        console.log(data);
      }
    }

    fetschDriver();
  }, []);

  return (
    <Select
      value={value}
      onValueChange={(value) => onSelect(value)}
    >
      <SelectTrigger className="w-full cursor-pointer">
        <SelectValue placeholder="Fahrer auswählen"></SelectValue>
      </SelectTrigger>
      <SelectContent>
        {driver.map((index) => (
          <SelectItem
            className="cursor-pointer"
            key={index.id}
            value={index.id}
          >
            {index.firstName} {index.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default CustomSelct;
