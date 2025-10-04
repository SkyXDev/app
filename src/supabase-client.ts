import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uemrhhfhsztcbcrqvdjd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlbXJoaGZoc3p0Y2JjcnF2ZGpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMTIzMjYsImV4cCI6MjA3NDY4ODMyNn0.I63SWg2Jp2DcRWLo9yG7dSKEuee8SUfoEqHPcsSPEo8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)