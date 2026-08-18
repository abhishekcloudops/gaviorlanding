"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData) {
  const parsed = z.object({
    email: z.string().trim().email().max(254),
    password: z.string().min(8).max(200),
  }).safeParse(Object.fromEntries(formData));

  if (!parsed.success) redirect("/admin/login?error=invalid_input");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) redirect("/admin/login?error=invalid_credentials");
  redirect("/admin");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
