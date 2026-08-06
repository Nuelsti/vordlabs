import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type BrandProfile = Database["public"]["Tables"]["brand_profiles"]["Row"];
export type BrandGuidelines = Database["public"]["Tables"]["brand_guidelines"]["Row"];
export type BrandAiContext = Database["public"]["Tables"]["brand_ai_context"]["Row"];

export class BrandService {
  /**
   * Fetch all brands that the authenticated user belongs to.
   */
  static async getUserBrands(): Promise<BrandProfile[]> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) return [];

    const { data, error } = await supabase
      .from("brand_members")
      .select("brand_id, brand_profiles (*)")
      .eq("profile_id", userData.user.id);

    if (error) throw error;
    
    // Extract brand_profiles array safely
    return (data
      ?.map((item: { brand_profiles: BrandProfile | null }) => item.brand_profiles)
      .filter(Boolean) as BrandProfile[]) || [];
  }

  /**
   * Fetch a single brand by ID along with guidelines and AI context.
   */
  static async getBrandDetails(brandId: string) {
    const [brandRes, guidelinesRes, aiContextRes] = await Promise.all([
      supabase.from("brand_profiles").select("*").eq("id", brandId).single(),
      supabase.from("brand_guidelines").select("*").eq("brand_id", brandId).maybeSingle(),
      supabase.from("brand_ai_context").select("*").eq("brand_id", brandId).maybeSingle(),
    ]);

    if (brandRes.error) throw brandRes.error;

    return {
      brand: brandRes.data,
      guidelines: guidelinesRes.data,
      aiContext: aiContextRes.data,
    };
  }

  /**
   * Create a brand profile and automatically assign the creator as 'owner'.
   */
  static async createBrand(payload: {
    name: string;
    industry?: string;
    website?: string;
    logoFile?: File | null;
  }): Promise<BrandProfile> {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) throw new Error("Unauthorized: Please sign in.");

    const slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

    // 1. Create brand_profile record
    const { data: brand, error: brandError } = await supabase
      .from("brand_profiles")
      .insert({
        name: payload.name,
        slug,
        industry: payload.industry || null,
        website: payload.website || null,
      })
      .select()
      .single();

    if (brandError) throw brandError;

    // 2. Add creator as 'owner' in brand_members table
    const { error: memberError } = await supabase.from("brand_members").insert({
      brand_id: brand.id,
      profile_id: userData.user.id,
      role: "owner",
    });

    if (memberError) throw memberError;

    // 3. Upload Logo image to Supabase Storage if provided
    if (payload.logoFile) {
      const fileExt = payload.logoFile.name.split(".").pop();
      const filePath = `${brand.id}/logo_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("brand-assets")
        .upload(filePath, payload.logoFile, { upsert: true });

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage.from("brand-assets").getPublicUrl(filePath);
        await supabase
          .from("brand_profiles")
          .update({ logo_url: publicUrlData.publicUrl })
          .eq("id", brand.id);

        brand.logo_url = publicUrlData.publicUrl;
      }
    }

    return brand;
  }

  /**
   * Save or update brand guidelines and AI context.
   */
  static async updateBrandSystem(
    brandId: string,
    guidelines: {
      primary_color?: string;
      secondary_color?: string;
      accent_color?: string;
      background_color?: string;
      font_primary?: string;
      font_secondary?: string;
      photography_style?: string;
      design_guidance?: string;
    },
    aiContext: {
      brand_brief?: string;
      target_audience?: string;
      tone_of_voice?: string;
      writing_style?: string;
    }
  ) {
    const [guidelinesErr, aiContextErr] = await Promise.all([
      supabase.from("brand_guidelines").upsert({
        brand_id: brandId,
        ...guidelines,
        updated_at: new Date().toISOString(),
      }),
      supabase.from("brand_ai_context").upsert({
        brand_id: brandId,
        ...aiContext,
        updated_at: new Date().toISOString(),
      }),
    ]);

    if (guidelinesErr.error) throw guidelinesErr.error;
    if (aiContextErr.error) throw aiContextErr.error;
  }
}
