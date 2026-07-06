import { createClient } from "@supabase/supabase-js";

/* Cliente de Supabase para el SERVIDOR (usa la Secret Key → omite RLS).
   Nunca se expone al navegador. */
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) return null;
  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const dbReady = () =>
  !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SECRET_KEY;
