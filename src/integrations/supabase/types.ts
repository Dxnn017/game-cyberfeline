export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      abilities: {
        Row: {
          category: Database["public"]["Enums"]["ability_category"]
          character_type: Database["public"]["Enums"]["character_type"] | null
          cooldown_seconds: number | null
          created_at: string | null
          damage: number | null
          description: string | null
          energy_cost: number | null
          icon_url: string | null
          id: string
          level_required: number | null
          name: string
        }
        Insert: {
          category: Database["public"]["Enums"]["ability_category"]
          character_type?: Database["public"]["Enums"]["character_type"] | null
          cooldown_seconds?: number | null
          created_at?: string | null
          damage?: number | null
          description?: string | null
          energy_cost?: number | null
          icon_url?: string | null
          id?: string
          level_required?: number | null
          name: string
        }
        Update: {
          category?: Database["public"]["Enums"]["ability_category"]
          character_type?: Database["public"]["Enums"]["character_type"] | null
          cooldown_seconds?: number | null
          created_at?: string | null
          damage?: number | null
          description?: string | null
          energy_cost?: number | null
          icon_url?: string | null
          id?: string
          level_required?: number | null
          name?: string
        }
        Relationships: []
      }
      character_abilities: {
        Row: {
          ability_id: string
          character_id: string
          id: string
          level: number | null
          unlocked_at: string | null
        }
        Insert: {
          ability_id: string
          character_id: string
          id?: string
          level?: number | null
          unlocked_at?: string | null
        }
        Update: {
          ability_id?: string
          character_id?: string
          id?: string
          level?: number | null
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_abilities_ability_id_fkey"
            columns: ["ability_id"]
            isOneToOne: false
            referencedRelation: "abilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_abilities_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          attack_power: number | null
          avatar_url: string | null
          character_type: Database["public"]["Enums"]["character_type"]
          created_at: string | null
          defense_power: number | null
          energy_points: number | null
          experience_points: number | null
          hacking_skill: number | null
          health_points: number | null
          id: string
          level: number | null
          max_energy_points: number | null
          max_health_points: number | null
          name: string
          stealth_skill: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attack_power?: number | null
          avatar_url?: string | null
          character_type: Database["public"]["Enums"]["character_type"]
          created_at?: string | null
          defense_power?: number | null
          energy_points?: number | null
          experience_points?: number | null
          hacking_skill?: number | null
          health_points?: number | null
          id?: string
          level?: number | null
          max_energy_points?: number | null
          max_health_points?: number | null
          name: string
          stealth_skill?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attack_power?: number | null
          avatar_url?: string | null
          character_type?: Database["public"]["Enums"]["character_type"]
          created_at?: string | null
          defense_power?: number | null
          energy_points?: number | null
          experience_points?: number | null
          hacking_skill?: number | null
          health_points?: number | null
          id?: string
          level?: number | null
          max_energy_points?: number | null
          max_health_points?: number | null
          name?: string
          stealth_skill?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      equipment: {
        Row: {
          character_id: string
          equipped_at: string | null
          id: string
          item_id: string
          slot: string
        }
        Insert: {
          character_id: string
          equipped_at?: string | null
          id?: string
          item_id: string
          slot: string
        }
        Update: {
          character_id?: string
          equipped_at?: string | null
          id?: string
          item_id?: string
          slot?: string
        }
        Relationships: [
          {
            foreignKeyName: "equipment_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipment_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          id: string
          item_id: string
          obtained_at: string | null
          quantity: number | null
          user_id: string
        }
        Insert: {
          id?: string
          item_id: string
          obtained_at?: string | null
          quantity?: number | null
          user_id: string
        }
        Update: {
          id?: string
          item_id?: string
          obtained_at?: string | null
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          item_type: Database["public"]["Enums"]["item_type"]
          max_stack: number | null
          name: string
          price: number | null
          rarity: string | null
          stackable: boolean | null
          stat_bonuses: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          item_type: Database["public"]["Enums"]["item_type"]
          max_stack?: number | null
          name: string
          price?: number | null
          rarity?: string | null
          stackable?: boolean | null
          stat_bonuses?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          item_type?: Database["public"]["Enums"]["item_type"]
          max_stack?: number | null
          name?: string
          price?: number | null
          rarity?: string | null
          stackable?: boolean | null
          stat_bonuses?: Json | null
        }
        Relationships: []
      }
      mission_dependencies: {
        Row: {
          id: string
          mission_id: string
          required_mission_id: string
        }
        Insert: {
          id?: string
          mission_id: string
          required_mission_id: string
        }
        Update: {
          id?: string
          mission_id?: string
          required_mission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_dependencies_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_dependencies_required_mission_id_fkey"
            columns: ["required_mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          mission_id: string
          progress_data: Json | null
          started_at: string | null
          status: Database["public"]["Enums"]["mission_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_id: string
          progress_data?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          mission_id?: string
          progress_data?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["mission_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_progress_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          chapter: number | null
          created_at: string | null
          credits_reward: number | null
          description: string | null
          duration_minutes: number | null
          experience_reward: number | null
          id: string
          item_rewards: Json | null
          level_required: number | null
          objectives: Json | null
          order_index: number | null
          story_text: string | null
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          chapter?: number | null
          created_at?: string | null
          credits_reward?: number | null
          description?: string | null
          duration_minutes?: number | null
          experience_reward?: number | null
          id?: string
          item_rewards?: Json | null
          level_required?: number | null
          objectives?: Json | null
          order_index?: number | null
          story_text?: string | null
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          chapter?: number | null
          created_at?: string | null
          credits_reward?: number | null
          description?: string | null
          duration_minutes?: number | null
          experience_reward?: number | null
          id?: string
          item_rewards?: Json | null
          level_required?: number | null
          objectives?: Json | null
          order_index?: number | null
          story_text?: string | null
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          credits: number | null
          display_name: string | null
          experience_points: number | null
          id: string
          level: number | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          display_name?: string | null
          experience_points?: number | null
          id: string
          level?: number | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          credits?: number | null
          display_name?: string | null
          experience_points?: number | null
          id?: string
          level?: number | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          claimed: boolean | null
          created_at: string | null
          id: string
          mission_id: string | null
          reward_data: Json | null
          reward_type: string
          user_id: string
        }
        Insert: {
          claimed?: boolean | null
          created_at?: string | null
          id?: string
          mission_id?: string | null
          reward_data?: Json | null
          reward_type: string
          user_id: string
        }
        Update: {
          claimed?: boolean | null
          created_at?: string | null
          id?: string
          mission_id?: string | null
          reward_data?: Json | null
          reward_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rewards_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      ability_category:
        | "combat"
        | "hacking"
        | "stealth"
        | "parkour"
        | "magic"
        | "tech"
      app_role: "admin" | "player"
      character_type: "yumi" | "kuro"
      item_type: "weapon" | "armor" | "accessory" | "consumable" | "upgrade"
      mission_status:
        | "locked"
        | "available"
        | "in_progress"
        | "completed"
        | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ability_category: [
        "combat",
        "hacking",
        "stealth",
        "parkour",
        "magic",
        "tech",
      ],
      app_role: ["admin", "player"],
      character_type: ["yumi", "kuro"],
      item_type: ["weapon", "armor", "accessory", "consumable", "upgrade"],
      mission_status: [
        "locked",
        "available",
        "in_progress",
        "completed",
        "failed",
      ],
    },
  },
} as const
