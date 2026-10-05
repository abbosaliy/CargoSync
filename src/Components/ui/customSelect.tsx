import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import supabase from "../../lib/supabaseClient";

type Driver = {
  id: string;
  firstName: string;
  lastName: string;
};

function CustomSelct({
  id,
  value,
  onSelect,
}: {
  id?: string;
  value: string;
  onSelect: (id: string) => void;
}) {
  const [driver, setDriver] = useState<Driver[]>([]);

  useEffect(() => {
    async function fetschDriver() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, firstName, lastName, role")
        .eq("role", "fahrer");

      if (error) {
        console.log(error);
      } else if (data) {
        setDriver(data as Driver[]);
      }
    }

    fetschDriver();
  }, []);

  return (
    <Select value={value} onValueChange={(value) => onSelect(value)}>
      <SelectTrigger
        id={id}
        className="h-11 w-full cursor-pointer rounded-xl border-slate-200 bg-white px-4 shadow-none data-[size=default]:h-11 dark:border-slate-700 dark:bg-slate-950/40"
      >
        <SelectValue placeholder="Fahrer auswählen"></SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-xl dark:bg-slate-900">
        {driver.map((index) => (
          <SelectItem
            className="cursor-pointer rounded-lg"
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
