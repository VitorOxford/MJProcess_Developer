// src/api/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// As variáveis de ambiente são strings
const supabaseUrl: string = 'https://rgjhovnhwejwzlpruryh.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnamhvdm5od2Vqd3pscHJ1cnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MDgyMDcsImV4cCI6MjA3MTE4NDIwN30.De5vemzo0iQcGYOLO7LLFukCu4kRLUjGJP4Yd0HB3eo';

// Exportamos o cliente Supabase, garantindo que ele tenha o tipo SupabaseClient
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
