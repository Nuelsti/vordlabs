import { supabase } from "@/integrations/supabase/client";

const PROFILE_TABLE_CANDIDATES = [
  "profiles",
  "Brand Profiles",
  "brand_profiles",
  "brand profiles",
] as const;

let cachedProfileTableName: string | null = null;

async function resolveProfileTableName() {
  if (cachedProfileTableName) return cachedProfileTableName;

  for (const tableName of PROFILE_TABLE_CANDIDATES) {
    const { data, error } = await (supabase as any)
      .from(tableName)
      .select("id")
      .limit(1)
      .maybeSingle();

    if (!error) {
      cachedProfileTableName = tableName;
      return tableName;
    }

    const message = (error.message || "").toString();
    if (error.code === "PGRST205" || message.includes("Could not find the table")) {
      continue;
    }

    // If we hit any other error, stop trying because the table exists but isn't accessible.
    throw error;
  }

  throw new Error(
    "Unable to resolve Supabase profile table name. Make sure the project has a `profiles` or `Brand Profiles` table."
  );
}

export async function createBrand(data: any): Promise<any> {
  const table = await resolveProfileTableName();
  const { data: brand, error } = await (supabase as any)
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) throw error;

  return brand;
}

export async function updateBrand(id: string, data: any): Promise<any> {
  const table = await resolveProfileTableName();
  const { data: brand, error } = await (supabase as any)
    .from(table)
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return brand;
}

export async function getBrand(userId: string): Promise<any> {
  const table = await resolveProfileTableName();
  const { data, error } = await (supabase as any)
    .from(table)
    .select("*")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw error;

  return data;
}

/* ----------------------------- */
/* Upload any file to Storage */
/* ----------------------------- */

export async function uploadFile(
  bucket: string,
  folder: string,
  file: File,
  userId: string
) {
  const extension = file.name.split(".").pop();

  const path = `${userId}/${folder}/${Date.now()}.${extension}`;

  const normalizedFolder = (folder || "").toLowerCase();

  const knownBuckets = ["logos", "brand-books", "Product Images"];

  const candidates: string[] = [];
  // Candidate priority: explicit bucket, folder-mapped buckets, variations
  if (bucket) candidates.push(bucket);
  if (normalizedFolder.includes("logo")) candidates.unshift("logos");
  if (normalizedFolder.includes("brand")) candidates.unshift("brand-books");
  if (normalizedFolder.includes("product")) candidates.unshift("Product Images");

  // Add some sane fallbacks
  candidates.push(bucket?.toLowerCase() ?? "");
  candidates.push(bucket?.replace(/[-_]/g, " ") ?? "");
  candidates.push(bucket?.replace(/ /g, "-") ?? "");
  candidates.push(...knownBuckets);

  // Try each candidate until upload succeeds
  for (const b of candidates) {
    if (!b) continue;
    try {
      // eslint-disable-next-line no-await-in-loop
      const { error } = await (supabase as any).storage.from(b).upload(path, file, { upsert: true });
      if (error) {
        // If bucket not found, try next candidate
        const msg = (error.message || "").toString();
        if (msg.includes("No bucket") || msg.includes("not found") || error.code === "PGRST205") {
          // eslint-disable-next-line no-console
          console.warn(`upload: bucket '${b}' not found, trying next candidate`);
          continue;
        }
        throw error;
      }

      const { data } = (supabase as any).storage.from(b).getPublicUrl(path);
      return data?.publicUrl ?? null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(`upload attempt to bucket '${b}' failed:`, err);
      // try next
    }
  }

  throw new Error(`Upload failed — no valid bucket found (tried: ${[...new Set(candidates)].join(", ")})`);
}

/* ----------------------------- */
/* Save Product Images */
/* ----------------------------- */

export async function saveBrandAssets(
  brandId: string,
  imageUrls: string[]
) {
  const rows = imageUrls.map((url) => ({
    profile_id: brandId,
    image_url: url,
  }));

  const { error } = await (supabase as any)
    .from("brand_assets")
    .insert(rows);

  if (error) throw error;
}

/* ----------------------------- */
/* Get Product Images */
/* ----------------------------- */

export async function getBrandAssets(
  brandId: string
) {
  const { data, error } = await (supabase as any)
    .from("brand_assets")
    .select("*")
    .eq("profile_id", brandId);

  if (error) throw error;

  return data;
}