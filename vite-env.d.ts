/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_SUPABASE_URL: string;
  readonly NEXT_PUBLIC_SUPABASE_KEY: string;
}

interface ImportMetaEnv {
  readonly env: ImportMetaEnv;
}
