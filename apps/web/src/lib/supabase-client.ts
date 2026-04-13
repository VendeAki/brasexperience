/**
 * Cliente Supabase placeholder para conexão futura no app React/Next.
 * Neste momento o protótipo é visual (HTML estático via Live Server).
 */
export interface SupabaseRuntimeConfig {
  url: string;
  anonKey: string;
}

export function getSupabaseConfig(): SupabaseRuntimeConfig {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

  return { url, anonKey };
}
