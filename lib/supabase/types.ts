export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      chat_messages: {
        Row: {
          author_id: string;
          content: string;
          created_at: string;
          event_id: string | null;
          id: string;
          room_id: string;
        };
        Insert: {
          author_id: string;
          content: string;
          created_at?: string;
          event_id?: string | null;
          id?: string;
          room_id: string;
        };
        Update: {
          author_id?: string;
          content?: string;
          created_at?: string;
          event_id?: string | null;
          id?: string;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "chat_messages_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "watch_events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "chat_messages_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      movie_suggestions: {
        Row: {
          created_at: string;
          genres: Json | null;
          id: string;
          overview: string | null;
          poster_path: string | null;
          release_date: string | null;
          room_id: string;
          runtime: number | null;
          suggested_by_id: string;
          title: string;
          tmdb_id: number;
        };
        Insert: {
          created_at?: string;
          genres?: Json | null;
          id?: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          room_id: string;
          runtime?: number | null;
          suggested_by_id: string;
          title: string;
          tmdb_id: number;
        };
        Update: {
          created_at?: string;
          genres?: Json | null;
          id?: string;
          overview?: string | null;
          poster_path?: string | null;
          release_date?: string | null;
          room_id?: string;
          runtime?: number | null;
          suggested_by_id?: string;
          title?: string;
          tmdb_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "movie_suggestions_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "movie_suggestions_suggested_by_id_fkey";
            columns: ["suggested_by_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          id: string;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id: string;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      reactions: {
        Row: {
          created_at: string;
          event_id: string | null;
          id: string;
          room_id: string;
          timestamp: number | null;
          type: Database["public"]["Enums"]["reaction_type"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_id?: string | null;
          id?: string;
          room_id: string;
          timestamp?: number | null;
          type: Database["public"]["Enums"]["reaction_type"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          event_id?: string | null;
          id?: string;
          room_id?: string;
          timestamp?: number | null;
          type?: Database["public"]["Enums"]["reaction_type"];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reactions_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "watch_events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reactions_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reactions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      room_memberships: {
        Row: {
          id: string;
          joined_at: string;
          role: Database["public"]["Enums"]["room_member_role"] | null;
          room_id: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          joined_at?: string;
          role?: Database["public"]["Enums"]["room_member_role"] | null;
          room_id: string;
          user_id: string;
        };
        Update: {
          id?: string;
          joined_at?: string;
          role?: Database["public"]["Enums"]["room_member_role"] | null;
          room_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "room_memberships_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "room_memberships_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          image_url: string | null;
          invite_code: string | null;
          is_public: boolean | null;
          name: string;
          owner_id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          invite_code?: string | null;
          is_public?: boolean | null;
          name: string;
          owner_id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          invite_code?: string | null;
          is_public?: boolean | null;
          name?: string;
          owner_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rooms_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      votes: {
        Row: {
          created_at: string;
          id: string;
          movie_id: string;
          room_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          movie_id: string;
          room_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          movie_id?: string;
          room_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "votes_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movie_suggestions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "votes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      watch_event_participants: {
        Row: {
          event_id: string;
          id: string;
          joined_at: string;
          user_id: string;
        };
        Insert: {
          event_id: string;
          id?: string;
          joined_at?: string;
          user_id: string;
        };
        Update: {
          event_id?: string;
          id?: string;
          joined_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "watch_event_participants_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "watch_events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "watch_event_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      watch_events: {
        Row: {
          created_at: string;
          external_url: string | null;
          host_id: string;
          id: string;
          is_playing: boolean | null;
          movie_id: string;
          room_id: string;
          scheduled_for: string;
          status: Database["public"]["Enums"]["watch_event_status"] | null;
          streaming_url: string | null;
          sync_timestamp: number | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          external_url?: string | null;
          host_id: string;
          id?: string;
          is_playing?: boolean | null;
          movie_id: string;
          room_id: string;
          scheduled_for: string;
          status?: Database["public"]["Enums"]["watch_event_status"] | null;
          streaming_url?: string | null;
          sync_timestamp?: number | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          external_url?: string | null;
          host_id?: string;
          id?: string;
          is_playing?: boolean | null;
          movie_id?: string;
          room_id?: string;
          scheduled_for?: string;
          status?: Database["public"]["Enums"]["watch_event_status"] | null;
          streaming_url?: string | null;
          sync_timestamp?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "watch_events_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "watch_events_movie_id_fkey";
            columns: ["movie_id"];
            isOneToOne: false;
            referencedRelation: "movie_suggestions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "watch_events_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      reaction_type: "LIKE" | "LOVE" | "LAUGH" | "SURPRISED" | "SAD" | "ANGRY";
      room_member_role: "OWNER" | "MODERATOR" | "MEMBER";
      watch_event_status: "SCHEDULED" | "LIVE" | "COMPLETED" | "CANCELLED";
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
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      reaction_type: ["LIKE", "LOVE", "LAUGH", "SURPRISED", "SAD", "ANGRY"],
      room_member_role: ["OWNER", "MODERATOR", "MEMBER"],
      watch_event_status: ["SCHEDULED", "LIVE", "COMPLETED", "CANCELLED"],
    },
  },
} as const;
