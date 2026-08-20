"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const clientSchema = z.object({
  company_name: z.string().trim().min(1, "Company name is required").max(180),
  contact_name: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  billing_address: z.string().trim().max(1500).optional().or(z.literal("")),
  shipping_address: z.string().trim().max(1500).optional().or(z.literal("")),
  state: z.string().trim().max(100).default("Karnataka"),
  state_code: z.string().trim().max(4).default("29"),
  gstin: z.string().trim().max(20).optional().or(z.literal("")),
  pan: z.string().trim().max(20).optional().or(z.literal("")),
  currency: z.string().trim().default("INR"),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function createClientAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const raw = Object.fromEntries(formData);
  const parsed = clientSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/clients?error=invalid_client");
  }

  const { error } = await supabase.from("ops_clients").insert({
    ...parsed.data,
    active: true,
  });

  if (error) {
    console.error("Failed to create client:", error);
    redirect("/clients?error=save_failed");
  }

  revalidatePath("/clients");
  revalidatePath("/quotations/new");
  revalidatePath("/invoices/new");
  redirect("/clients?saved=client_created");
}

export async function deleteClientAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();

  if (!id) redirect("/clients?error=invalid_id");

  const { error } = await supabase.from("ops_clients").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete client:", error);
    redirect("/clients?error=delete_failed");
  }

  revalidatePath("/clients");
  redirect("/clients?saved=client_deleted");
}
