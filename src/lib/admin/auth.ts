import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,active")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin" || !profile.active) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not_authorized");
  }

  return { supabase, user, profile };
}
