import { createClient } from "@supabase/supabase-js";

const Url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(Url, supabaseAnonKey);