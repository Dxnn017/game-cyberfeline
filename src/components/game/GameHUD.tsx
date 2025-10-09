import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { LogOut, Heart, Zap, Star, MapPin } from "lucide-react";

interface GameHUDProps {
  profile: any;
  characters: any[];
  onLogout: () => void;
}

export const GameHUD = ({ profile, characters, onLogout }: GameHUDProps) => {
  const yumi = characters.find((c) => c.character_type === "yumi");
  const kuro = characters.find((c) => c.character_type === "kuro");

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Player Info */}
          <Card className="bg-card/80 backdrop-blur-xl border-2 border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-2xl font-black text-primary-foreground">
                    {profile?.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{profile?.username}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Nivel {profile?.level || 1}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Experience Bar */}
            <div className="mt-4 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Experiencia</span>
                <span>{profile?.experience_points || 0} XP</span>
              </div>
              <Progress value={(profile?.experience_points || 0) % 100} className="h-2" />
            </div>

            {/* Credits */}
            <div className="mt-3 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Créditos</span>
                <span className="font-bold text-primary">{profile?.credits || 0}</span>
              </div>
            </div>
          </Card>

          {/* Center: Characters */}
          <div className="lg:col-span-1 grid grid-cols-2 gap-4">
            {/* Yumi */}
            {yumi && (
              <Card className="bg-card/80 backdrop-blur-xl border-2 border-neon-pink/50 p-3">
                <div className="space-y-2">
                  <h4 className="font-bold neon-text-pink text-sm">YUMI</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3 text-destructive" />
                      <Progress
                        value={(yumi.health_points / yumi.max_health_points) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium">
                        {yumi.health_points}/{yumi.max_health_points}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <Progress
                        value={(yumi.energy_points / yumi.max_energy_points) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium">
                        {yumi.energy_points}/{yumi.max_energy_points}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>ATK: {yumi.attack_power} • DEF: {yumi.defense_power}</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Kuro */}
            {kuro && (
              <Card className="bg-card/80 backdrop-blur-xl border-2 border-neon-cyan/50 p-3">
                <div className="space-y-2">
                  <h4 className="font-bold neon-text-cyan text-sm">KURO</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Heart className="w-3 h-3 text-destructive" />
                      <Progress
                        value={(kuro.health_points / kuro.max_health_points) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium">
                        {kuro.health_points}/{kuro.max_health_points}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <Progress
                        value={(kuro.energy_points / kuro.max_energy_points) * 100}
                        className="h-2 flex-1"
                      />
                      <span className="text-xs font-medium">
                        {kuro.energy_points}/{kuro.max_energy_points}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <div>ATK: {kuro.attack_power} • DEF: {kuro.defense_power}</div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Right: Mission */}
          <Card className="bg-card/80 backdrop-blur-xl border-2 border-border p-4">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-foreground mb-1">Misión Actual</h4>
                <p className="text-sm text-muted-foreground">
                  Infiltración en Torre NeoCore
                </p>
                <div className="mt-2">
                  <Progress value={30} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">Progreso: 30%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
