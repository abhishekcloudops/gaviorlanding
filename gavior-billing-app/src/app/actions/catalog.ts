"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { DEFAULT_GAVIOR_PLANS } from "@/lib/default-catalog";
import { rupeesToPaise } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const catalogItemSchema = z.object({
  name: z.string().trim().min(1).max(180),
  category: z.string().trim().min(1).max(100).default("Services"),
  description: z.string().trim().max(1200).optional().or(z.literal("")),
  item_type: z.enum(["service", "product"]).default("service"),
  unit: z.string().trim().min(1).max(30).default("project"),
  sac_hsn: z.string().trim().max(20).optional().or(z.literal("")),
  unit_price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  tax_rate: z.coerce.number().min(0).max(100).default(18),
});

export async function createCatalogItemAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const raw = Object.fromEntries(formData);
  const parsed = catalogItemSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/catalog?error=invalid_item");
  }

  const { unit_price, tax_rate, ...values } = parsed.data;
  const unit_price_paise = rupeesToPaise(unit_price);
  const tax_rate_bps = Math.round(tax_rate * 100);

  const { error } = await supabase.from("ops_catalog_items").insert({
    ...values,
    unit_price_paise,
    tax_rate_bps,
    active: true,
  });

  if (error) {
    console.error("Failed to create catalog item:", error);
    redirect("/catalog?error=save_failed");
  }

  revalidatePath("/catalog");
  revalidatePath("/quotations/new");
  revalidatePath("/invoices/new");
  redirect("/catalog?saved=item_created");
}

export async function deleteCatalogItemAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") || "").trim();

  if (!id) redirect("/catalog?error=invalid_id");

  const { error } = await supabase.from("ops_catalog_items").delete().eq("id", id);
  if (error) {
    console.error("Failed to delete catalog item:", error);
    redirect("/catalog?error=delete_failed");
  }

  revalidatePath("/catalog");
  revalidatePath("/quotations/new");
  redirect("/catalog?saved=item_deleted");
}

export async function seedDefaultCatalogAction() {
  const supabase = await createSupabaseServerClient();

  for (const plan of DEFAULT_GAVIOR_PLANS) {
    const { data: existing } = await supabase
      .from("ops_catalog_items")
      .select("id")
      .ilike("name", plan.name.trim())
      .limit(1);

    if (!existing || existing.length === 0) {
      await supabase.from("ops_catalog_items").insert({
        name: plan.name,
        category: plan.category,
        description: plan.description,
        item_type: plan.item_type,
        unit: plan.unit,
        sac_hsn: plan.sac_hsn,
        unit_price_paise: plan.unit_price_paise,
        tax_rate_bps: plan.tax_rate_bps,
        active: true,
      });
    }
  }

  revalidatePath("/catalog");
  revalidatePath("/quotations/new");
  redirect("/catalog?saved=catalog_seeded");
}

export async function cleanupDuplicateCatalogAction() {
  const supabase = await createSupabaseServerClient();
  const { data: items } = await supabase
    .from("ops_catalog_items")
    .select("id,name,created_at")
    .order("created_at", { ascending: false });

  if (items && items.length > 0) {
    const seen = new Set<string>();
    const duplicateIds: string[] = [];

    for (const item of items) {
      const normalized = item.name.trim().toLowerCase();
      if (seen.has(normalized)) {
        duplicateIds.push(item.id);
      } else {
        seen.add(normalized);
      }
    }

    if (duplicateIds.length > 0) {
      await supabase.from("ops_catalog_items").delete().in("id", duplicateIds);
    }
  }

  revalidatePath("/catalog");
  revalidatePath("/quotations/new");
  redirect("/catalog?saved=catalog_cleaned");
}
