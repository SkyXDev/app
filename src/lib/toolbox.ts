import { supabase } from "@/supabase-client"

export async function handleSignOut() {
  const { error } = await supabase.auth.signOut()
  if (error) console.error("Error signing out:", error.message)
  window.location.href = "/auth"
}