import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GameHUD } from "@/components/game/GameHUD";
import { GameWorld } from "@/components/game/GameWorld";
import { Loader2 } from "lucide-react";

export default function Game() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    await loadGameData(session.user.id);
    setLoading(false);
  };

  const loadGameData = async (userId: string) => {
    // Load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileData) {
      setProfile(profileData);
    }

    // Load characters
    const { data: charactersData } = await supabase
      .from("characters")
      .select("*")
      .eq("user_id", userId);

    if (charactersData) {
      setCharacters(charactersData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando tu aventura...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD
        profile={profile}
        characters={characters}
        onLogout={async () => {
          await supabase.auth.signOut();
          navigate("/");
        }}
      />

      {/* Game World */}
      <GameWorld characters={characters} />
    </div>
  );
}
