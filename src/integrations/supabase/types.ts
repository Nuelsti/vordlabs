export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_settings: {
        Row: {
          user_id: string;
          default_brand_id: string | null;
          theme: string;
          timezone: string;
          email_notifications: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          default_brand_id?: string | null;
          theme?: string;
          timezone?: string;
          email_notifications?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          default_brand_id?: string | null;
          theme?: string;
          timezone?: string;
          email_notifications?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "fk_user_settings_default_brand";
            columns: ["default_brand_id"];
            isOneToOne: false;
            referencedRelation: "brand_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_tier: string;
          status: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          max_brands: number;
          max_team_members: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_tier?: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          max_brands?: number;
          max_team_members?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_tier?: string;
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          max_brands?: number;
          max_team_members?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_profiles: {
        Row: {
          id: string;
          name: string;
          slug: string;
          industry: string | null;
          website: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          industry?: string | null;
          website?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          industry?: string | null;
          website?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_members: {
        Row: {
          id: string;
          brand_id: string;
          profile_id: string;
          role: Database["public"]["Enums"]["app_role"];
          invited_by: string | null;
          joined_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          profile_id: string;
          role?: Database["public"]["Enums"]["app_role"];
          invited_by?: string | null;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          profile_id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          invited_by?: string | null;
          joined_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "brand_members_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: false;
            referencedRelation: "brand_profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "brand_members_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      brand_invitations: {
        Row: {
          id: string;
          brand_id: string;
          email: string;
          role: Database["public"]["Enums"]["app_role"];
          invitation_token: string;
          invited_by: string;
          status: Database["public"]["Enums"]["invitation_status"];
          expires_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          email: string;
          role?: Database["public"]["Enums"]["app_role"];
          invitation_token: string;
          invited_by: string;
          status?: Database["public"]["Enums"]["invitation_status"];
          expires_at: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          email?: string;
          role?: Database["public"]["Enums"]["app_role"];
          invitation_token?: string;
          invited_by?: string;
          status?: Database["public"]["Enums"]["invitation_status"];
          expires_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_guidelines: {
        Row: {
          brand_id: string;
          primary_color: string | null;
          secondary_color: string | null;
          accent_color: string | null;
          background_color: string | null;
          font_primary: string | null;
          font_secondary: string | null;
          photography_style: string | null;
          design_guidance: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          brand_id: string;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          background_color?: string | null;
          font_primary?: string | null;
          font_secondary?: string | null;
          photography_style?: string | null;
          design_guidance?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          brand_id?: string;
          primary_color?: string | null;
          secondary_color?: string | null;
          accent_color?: string | null;
          background_color?: string | null;
          font_primary?: string | null;
          font_secondary?: string | null;
          photography_style?: string | null;
          design_guidance?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "brand_guidelines_brand_id_fkey";
            columns: ["brand_id"];
            isOneToOne: true;
            referencedRelation: "brand_profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      brand_ai_context: {
        Row: {
          brand_id: string;
          brand_brief: string | null;
          target_audience: string | null;
          tone_of_voice: string | null;
          writing_style: string | null;
          competitors: string[] | null;
          preferred_ctas: string[] | null;
          keywords: string[] | null;
          do_rules: string[] | null;
          dont_rules: string[] | null;
          system_prompt_override: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          brand_id: string;
          brand_brief?: string | null;
          target_audience?: string | null;
          tone_of_voice?: string | null;
          writing_style?: string | null;
          competitors?: string[] | null;
          preferred_ctas?: string[] | null;
          keywords?: string[] | null;
          do_rules?: string[] | null;
          dont_rules?: string[] | null;
          system_prompt_override?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          brand_id?: string;
          brand_brief?: string | null;
          target_audience?: string | null;
          tone_of_voice?: string | null;
          writing_style?: string | null;
          competitors?: string[] | null;
          preferred_ctas?: string[] | null;
          keywords?: string[] | null;
          do_rules?: string[] | null;
          dont_rules?: string[] | null;
          system_prompt_override?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_assets: {
        Row: {
          id: string;
          brand_id: string;
          file_name: string;
          storage_path: string;
          file_size_bytes: number;
          mime_type: string;
          category: Database["public"]["Enums"]["asset_category"];
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          file_name: string;
          storage_path: string;
          file_size_bytes: number;
          mime_type: string;
          category?: Database["public"]["Enums"]["asset_category"];
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          file_name?: string;
          storage_path?: string;
          file_size_bytes?: number;
          mime_type?: string;
          category?: Database["public"]["Enums"]["asset_category"];
          uploaded_by?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          brand_id: string;
          title: string | null;
          storage_path: string;
          public_url: string;
          alt_text: string | null;
          tags: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          title?: string | null;
          storage_path: string;
          public_url: string;
          alt_text?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          title?: string | null;
          storage_path?: string;
          public_url?: string;
          alt_text?: string | null;
          tags?: string[] | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          business: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          business?: string | null;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          business?: string | null;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      content_calendar: {
        Row: {
          id: string;
          brand_id: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          title: string;
          description?: string | null;
          start_date: string;
          end_date: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      scheduled_posts: {
        Row: {
          id: string;
          calendar_id: string | null;
          brand_id: string;
          caption: string;
          media_urls: string[] | null;
          platforms: Database["public"]["Enums"]["social_platform"][];
          scheduled_time: string;
          status: Database["public"]["Enums"]["post_status"];
          buffer_post_id: string | null;
          error_message: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          calendar_id?: string | null;
          brand_id: string;
          caption: string;
          media_urls?: string[] | null;
          platforms: Database["public"]["Enums"]["social_platform"][];
          scheduled_time: string;
          status?: Database["public"]["Enums"]["post_status"];
          buffer_post_id?: string | null;
          error_message?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          calendar_id?: string | null;
          brand_id?: string;
          caption?: string;
          media_urls?: string[] | null;
          platforms?: Database["public"]["Enums"]["social_platform"][];
          scheduled_time?: string;
          status?: Database["public"]["Enums"]["post_status"];
          buffer_post_id?: string | null;
          error_message?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      social_accounts: {
        Row: {
          id: string;
          brand_id: string;
          platform: Database["public"]["Enums"]["social_platform"];
          account_name: string;
          account_id_external: string;
          access_token_encrypted: string | null;
          refresh_token_encrypted: string | null;
          avatar_url: string | null;
          is_connected: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          platform: Database["public"]["Enums"]["social_platform"];
          account_name: string;
          account_id_external: string;
          access_token_encrypted?: string | null;
          refresh_token_encrypted?: string | null;
          avatar_url?: string | null;
          is_connected?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          platform?: Database["public"]["Enums"]["social_platform"];
          account_name?: string;
          account_id_external?: string;
          access_token_encrypted?: string | null;
          refresh_token_encrypted?: string | null;
          avatar_url?: string | null;
          is_connected?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      templates: {
        Row: {
          id: string;
          brand_id: string | null;
          name: string;
          category: string;
          layout_data: Json;
          preview_url: string | null;
          is_global: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand_id?: string | null;
          name: string;
          category: string;
          layout_data: Json;
          preview_url?: string | null;
          is_global?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string | null;
          name?: string;
          category?: string;
          layout_data?: Json;
          preview_url?: string | null;
          is_global?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      analytics: {
        Row: {
          id: string;
          brand_id: string;
          post_id: string | null;
          platform: Database["public"]["Enums"]["social_platform"];
          impressions: number;
          likes: number;
          shares: number;
          comments: number;
          clicks: number;
          recorded_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          post_id?: string | null;
          platform: Database["public"]["Enums"]["social_platform"];
          impressions?: number;
          likes?: number;
          shares?: number;
          comments?: number;
          clicks?: number;
          recorded_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          post_id?: string | null;
          platform?: Database["public"]["Enums"]["social_platform"];
          impressions?: number;
          likes?: number;
          shares?: number;
          comments?: number;
          clicks?: number;
          recorded_at?: string;
        };
        Relationships: [];
      };
      ai_generations: {
        Row: {
          id: string;
          brand_id: string;
          user_id: string | null;
          prompt_type: string;
          input_prompt: string;
          output_content: Json;
          tokens_used: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand_id: string;
          user_id?: string | null;
          prompt_type: string;
          input_prompt: string;
          output_content: Json;
          tokens_used?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string;
          user_id?: string | null;
          prompt_type?: string;
          input_prompt?: string;
          output_content?: Json;
          tokens_used?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message: string;
          type?: string;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string;
          type?: string;
          read_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      audit_logs: {
        Row: {
          id: string;
          brand_id: string | null;
          user_id: string | null;
          action: string;
          target_type: string;
          target_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          brand_id?: string | null;
          user_id?: string | null;
          action: string;
          target_type: string;
          target_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          brand_id?: string | null;
          user_id?: string | null;
          action?: string;
          target_type?: string;
          target_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      app_role: "owner" | "admin" | "editor" | "content_creator" | "designer" | "analyst" | "viewer" | "member";
      invitation_status: "pending" | "accepted" | "declined" | "expired";
      post_status: "draft" | "scheduled" | "publishing" | "published" | "failed";
      social_platform: "instagram" | "facebook" | "twitter" | "linkedin" | "tiktok" | "pinterest";
      asset_category: "logo" | "brand_book" | "font" | "graphic" | "template" | "other";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;
