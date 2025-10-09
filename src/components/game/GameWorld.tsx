import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import yumiHero from "@/assets/yumi-hero.png";
import kuroCat from "@/assets/kuro-cat.png";

interface GameWorldProps {
  characters: any[];
}

export const GameWorld = ({ characters }: GameWorldProps) => {
  const [yumiPos, setYumiPos] = useState({ x: 200, y: 300 });
  const [kuroPos, setKuroPos] = useState({ x: 150, y: 320 });
  const [activeCharacter, setActiveCharacter] = useState<"yumi" | "kuro">("yumi");
  const [dialogue, setDialogue] = useState<string | null>(
    "Bienvenido a Neo Tokyo. Usa las teclas WASD para mover a Yumi y las flechas para Kuro."
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const speed = 10;

      // Yumi controls (WASD)
      if (activeCharacter === "yumi") {
        if (e.key === "w") setYumiPos((p) => ({ ...p, y: Math.max(150, p.y - speed) }));
        if (e.key === "s") setYumiPos((p) => ({ ...p, y: Math.min(600, p.y + speed) }));
        if (e.key === "a") setYumiPos((p) => ({ ...p, x: Math.max(50, p.x - speed) }));
        if (e.key === "d") setYumiPos((p) => ({ ...p, x: Math.min(800, p.x + speed) }));
      }

      // Kuro controls (Arrow keys)
      if (activeCharacter === "kuro") {
        if (e.key === "ArrowUp") setKuroPos((p) => ({ ...p, y: Math.max(150, p.y - speed) }));
        if (e.key === "ArrowDown") setKuroPos((p) => ({ ...p, y: Math.min(600, p.y + speed) }));
        if (e.key === "ArrowLeft") setKuroPos((p) => ({ ...p, x: Math.max(50, p.x - speed) }));
        if (e.key === "ArrowRight") setKuroPos((p) => ({ ...p, x: Math.min(800, p.x + speed) }));
      }

      // Switch character (Tab)
      if (e.key === "Tab") {
        e.preventDefault();
        setActiveCharacter((prev) => (prev === "yumi" ? "kuro" : "yumi"));
        setDialogue(
          activeCharacter === "yumi"
            ? "Control cambiado a Kuro. Usa las flechas para moverte."
            : "Control cambiado a Yumi. Usa WASD para moverte."
        );
      }

      // Interaction (E)
      if (e.key === "e" || e.key === "E") {
        const distance = Math.sqrt(
          Math.pow(yumiPos.x - kuroPos.x, 2) + Math.pow(yumiPos.y - kuroPos.y, 2)
        );
        if (distance < 100) {
          setDialogue(
            activeCharacter === "yumi"
              ? "Yumi: Kuro, necesito que hackees ese panel de control."
              : "Kuro: Entendido. Sistema hackeado con éxito."
          );
        } else {
          setDialogue(
            "Los personajes están muy lejos para interactuar. Acércalos."
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeCharacter, yumiPos, kuroPos]);

  // Auto-hide dialogue after 4 seconds
  useEffect(() => {
    if (dialogue) {
      const timer = setTimeout(() => setDialogue(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [dialogue]);

  return (
    <div className="pt-32 pb-8 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Game World Container */}
        <Card className="relative bg-gradient-to-br from-card/30 to-background/50 backdrop-blur-xl border-2 border-border overflow-hidden aspect-video">
          {/* Background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

          {/* Cyberpunk Zone */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-neon-pink/10 to-transparent border-r border-neon-pink/20">
            <div className="p-4">
              <span className="text-xs font-bold neon-text-pink">ZONA CYBERPUNK</span>
            </div>
          </div>

          {/* Solarpunk Zone */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-neon-cyan/10 to-transparent border-l border-neon-cyan/20">
            <div className="p-4 text-right">
              <span className="text-xs font-bold neon-text-cyan">ZONA SOLARPUNK</span>
            </div>
          </div>

          {/* Interactive Objects */}
          <div className="absolute left-1/4 top-1/3 w-12 h-12 rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center">
            <span className="text-xs">🖥️</span>
          </div>
          <div className="absolute right-1/4 top-1/2 w-12 h-12 rounded-lg bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center">
            <span className="text-xs">🌿</span>
          </div>

          {/* Yumi */}
          <div
            className="absolute transition-all duration-100"
            style={{
              left: `${yumiPos.x}px`,
              top: `${yumiPos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`relative ${
                activeCharacter === "yumi" ? "ring-4 ring-neon-pink/50 rounded-full" : ""
              }`}
            >
              <img src={yumiHero} alt="Yumi" className="w-24 h-24 object-contain drop-shadow-2xl" />
              {activeCharacter === "yumi" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold neon-text-pink whitespace-nowrap">
                  YUMI (WASD)
                </div>
              )}
            </div>
          </div>

          {/* Kuro */}
          <div
            className="absolute transition-all duration-100"
            style={{
              left: `${kuroPos.x}px`,
              top: `${kuroPos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={`relative ${
                activeCharacter === "kuro" ? "ring-4 ring-neon-cyan/50 rounded-full" : ""
              }`}
            >
              <img src={kuroCat} alt="Kuro" className="w-16 h-16 object-contain drop-shadow-2xl" />
              {activeCharacter === "kuro" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold neon-text-cyan whitespace-nowrap">
                  KURO (←↑→↓)
                </div>
              )}
            </div>
          </div>

          {/* Dialogue Box */}
          {dialogue && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-2xl w-full mx-4 animate-in fade-in slide-in-from-bottom-2">
              <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/50 p-4">
                <p className="text-sm text-foreground text-center">{dialogue}</p>
              </Card>
            </div>
          )}
        </Card>

        {/* Controls Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur-xl border border-border p-3">
            <h4 className="text-sm font-bold mb-2 neon-text-pink">Controles de Yumi</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">W</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">A</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">S</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">D</kbd> - Movimiento
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border border-border p-3">
            <h4 className="text-sm font-bold mb-2 neon-text-cyan">Controles de Kuro</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">↑</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">←</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">↓</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">→</kbd> - Movimiento
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border border-border p-3">
            <h4 className="text-sm font-bold mb-2 text-foreground">Acciones</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">Tab</kbd> - Cambiar personaje<br />
              <kbd className="px-2 py-1 bg-background rounded text-foreground">E</kbd> - Interactuar
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
