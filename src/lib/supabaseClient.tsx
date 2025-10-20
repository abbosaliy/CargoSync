import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database.types';

const supabase = createClient<Database>(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_KEY
);

export default supabase;
