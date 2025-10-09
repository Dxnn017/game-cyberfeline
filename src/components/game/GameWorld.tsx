import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import yumiHero from "@/assets/yumi-hero.png";
import kuroCat from "@/assets/kuro-cat.png";

interface GameWorldProps {
  characters: any[];
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  life: number;
}

export const GameWorld = ({ characters }: GameWorldProps) => {
  const [yumiPos, setYumiPos] = useState({ x: 200, y: 300 });
  const [kuroPos, setKuroPos] = useState({ x: 150, y: 320 });
  const [activeCharacter, setActiveCharacter] = useState<"yumi" | "kuro">("yumi");
  const [dialogue, setDialogue] = useState<string | null>(
    "Bienvenido a Neo Tokyo. Usa las teclas WASD para mover a Yumi y las flechas para Kuro. Presiona ESPACIO para habilidades especiales."
  );
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isUsingAbility, setIsUsingAbility] = useState(false);
  const [abilityEffect, setAbilityEffect] = useState<{ character: string; type: string } | null>(null);
  const [yumiDirection, setYumiDirection] = useState<"left" | "right">("right");
  const [kuroDirection, setKuroDirection] = useState<"left" | "right">("right");
  const particleIdRef = useRef(0);

  // Particle system animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocity.x,
            y: p.y + p.velocity.y,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, []);

  const createParticles = (x: number, y: number, color: string, count: number = 20) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        color,
        size: Math.random() * 4 + 2,
        velocity: {
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.5) * 4,
        },
        life: Math.random() * 30 + 30,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  const useAbility = () => {
    if (isUsingAbility) return;
    
    setIsUsingAbility(true);
    
    if (activeCharacter === "yumi") {
      // Yumi hackeo
      setAbilityEffect({ character: "yumi", type: "hack" });
      createParticles(yumiPos.x, yumiPos.y, "#ec4899", 30);
      setDialogue("Yumi: Iniciando protocolo de hackeo... Sistema infiltrado.");
    } else {
      // Kuro telequinesis
      setAbilityEffect({ character: "kuro", type: "telekinesis" });
      createParticles(kuroPos.x, kuroPos.y, "#06b6d4", 30);
      setDialogue("Kuro: Activando poderes psíquicos...");
    }

    setTimeout(() => {
      setIsUsingAbility(false);
      setAbilityEffect(null);
    }, 2000);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const speed = 8;

      // Yumi controls (WASD)
      if (activeCharacter === "yumi") {
        if (e.key === "w" || e.key === "W") {
          setYumiPos((p) => ({ ...p, y: Math.max(150, p.y - speed) }));
        }
        if (e.key === "s" || e.key === "S") {
          setYumiPos((p) => ({ ...p, y: Math.min(600, p.y + speed) }));
        }
        if (e.key === "a" || e.key === "A") {
          setYumiPos((p) => ({ ...p, x: Math.max(50, p.x - speed) }));
          setYumiDirection("left");
        }
        if (e.key === "d" || e.key === "D") {
          setYumiPos((p) => ({ ...p, x: Math.min(800, p.x + speed) }));
          setYumiDirection("right");
        }
      }

      // Kuro controls (Arrow keys)
      if (activeCharacter === "kuro") {
        if (e.key === "ArrowUp") {
          setKuroPos((p) => ({ ...p, y: Math.max(150, p.y - speed) }));
        }
        if (e.key === "ArrowDown") {
          setKuroPos((p) => ({ ...p, y: Math.min(600, p.y + speed) }));
        }
        if (e.key === "ArrowLeft") {
          setKuroPos((p) => ({ ...p, x: Math.max(50, p.x - speed) }));
          setKuroDirection("left");
        }
        if (e.key === "ArrowRight") {
          setKuroPos((p) => ({ ...p, x: Math.min(800, p.x + speed) }));
          setKuroDirection("right");
        }
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

      // Special Ability (Space)
      if (e.key === " ") {
        e.preventDefault();
        useAbility();
      }

      // Interaction (E)
      if (e.key === "e" || e.key === "E") {
        const distance = Math.sqrt(
          Math.pow(yumiPos.x - kuroPos.x, 2) + Math.pow(yumiPos.y - kuroPos.y, 2)
        );
        if (distance < 100) {
          createParticles((yumiPos.x + kuroPos.x) / 2, (yumiPos.y + kuroPos.y) / 2, "#a855f7", 20);
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
  }, [activeCharacter, yumiPos, kuroPos, isUsingAbility]);

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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

          {/* Cyberpunk Zone */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-neon-pink/10 to-transparent border-r border-neon-pink/20 transition-all duration-500">
            <div className="p-4">
              <span className="text-xs font-bold neon-text-pink animate-pulse">ZONA CYBERPUNK</span>
            </div>
            {/* Cyberpunk ambient effects */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-pink rounded-full animate-ping"></div>
            <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-neon-pink rounded-full animate-ping delay-75"></div>
          </div>

          {/* Solarpunk Zone */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-neon-cyan/10 to-transparent border-l border-neon-cyan/20 transition-all duration-500">
            <div className="p-4 text-right">
              <span className="text-xs font-bold neon-text-cyan animate-pulse">ZONA SOLARPUNK</span>
            </div>
            {/* Solarpunk ambient effects */}
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
            <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-neon-cyan rounded-full animate-ping delay-100"></div>
          </div>

          {/* Interactive Objects */}
          <div className="absolute left-1/4 top-1/3 w-16 h-16 rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center hover:scale-110 transition-transform hover:bg-primary/30 cursor-pointer animate-pulse">
            <span className="text-2xl">🖥️</span>
          </div>
          <div className="absolute right-1/4 top-1/2 w-16 h-16 rounded-lg bg-secondary/20 border-2 border-secondary/50 flex items-center justify-center hover:scale-110 transition-transform hover:bg-secondary/30 cursor-pointer animate-pulse">
            <span className="text-2xl">🌿</span>
          </div>
          <div className="absolute left-1/3 bottom-1/4 w-16 h-16 rounded-lg bg-accent/20 border-2 border-accent/50 flex items-center justify-center hover:scale-110 transition-transform hover:bg-accent/30 cursor-pointer animate-pulse">
            <span className="text-2xl">⚡</span>
          </div>
          <div className="absolute right-1/3 top-1/4 w-16 h-16 rounded-lg bg-muted/20 border-2 border-muted-foreground/50 flex items-center justify-center hover:scale-110 transition-transform hover:bg-muted/30 cursor-pointer animate-pulse">
            <span className="text-2xl">🔒</span>
          </div>

          {/* Particle System */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full pointer-events-none transition-opacity"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.life / 60,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              }}
            />
          ))}

          {/* Yumi */}
          <div
            className="absolute transition-all duration-75 ease-out"
            style={{
              left: `${yumiPos.x}px`,
              top: `${yumiPos.y}px`,
              transform: `translate(-50%, -50%) scaleX(${yumiDirection === "left" ? -1 : 1})`,
            }}
          >
            <div
              className={`relative ${
                activeCharacter === "yumi" ? "ring-4 ring-neon-pink/70 rounded-full animate-pulse" : ""
              }`}
            >
              <img 
                src={yumiHero} 
                alt="Yumi" 
                className={`w-24 h-24 object-contain drop-shadow-2xl transition-all ${
                  abilityEffect?.character === "yumi" ? "brightness-150 scale-110" : ""
                }`}
              />
              {abilityEffect?.character === "yumi" && (
                <div className="absolute inset-0 rounded-full bg-neon-pink/30 animate-ping"></div>
              )}
              {activeCharacter === "yumi" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold neon-text-pink whitespace-nowrap animate-pulse">
                  YUMI (WASD)
                </div>
              )}
            </div>
          </div>

          {/* Kuro */}
          <div
            className="absolute transition-all duration-75 ease-out"
            style={{
              left: `${kuroPos.x}px`,
              top: `${kuroPos.y}px`,
              transform: `translate(-50%, -50%) scaleX(${kuroDirection === "left" ? -1 : 1})`,
            }}
          >
            <div
              className={`relative ${
                activeCharacter === "kuro" ? "ring-4 ring-neon-cyan/70 rounded-full animate-pulse" : ""
              }`}
            >
              <img 
                src={kuroCat} 
                alt="Kuro" 
                className={`w-16 h-16 object-contain drop-shadow-2xl transition-all ${
                  abilityEffect?.character === "kuro" ? "brightness-150 scale-110" : ""
                }`}
              />
              {abilityEffect?.character === "kuro" && (
                <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping"></div>
              )}
              {activeCharacter === "kuro" && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold neon-text-cyan whitespace-nowrap animate-pulse">
                  KURO (←↑→↓)
                </div>
              )}
            </div>
          </div>

          {/* Dialogue Box */}
          {dialogue && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-2xl w-full mx-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <Card className="bg-card/95 backdrop-blur-xl border-2 border-primary/50 p-4 shadow-2xl shadow-primary/20">
                <p className="text-sm text-foreground text-center font-medium">{dialogue}</p>
              </Card>
            </div>
          )}

          {/* Ability Effect Overlay */}
          {abilityEffect && (
            <div className="absolute inset-0 pointer-events-none animate-in fade-in duration-200">
              {abilityEffect.type === "hack" && (
                <div className="absolute inset-0 bg-neon-pink/10 animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-pink text-4xl font-bold animate-ping">
                    &lt;HACKING/&gt;
                  </div>
                </div>
              )}
              {abilityEffect.type === "telekinesis" && (
                <div className="absolute inset-0 bg-neon-cyan/10 animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neon-cyan text-4xl font-bold animate-ping">
                    ✧ PSI ✧
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Controls Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card/50 backdrop-blur-xl border border-neon-pink/30 p-3 hover:border-neon-pink/50 transition-colors">
            <h4 className="text-sm font-bold mb-2 neon-text-pink">Controles de Yumi</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">W</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">A</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">S</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">D</kbd> - Movimiento
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border border-neon-cyan/30 p-3 hover:border-neon-cyan/50 transition-colors">
            <h4 className="text-sm font-bold mb-2 neon-text-cyan">Controles de Kuro</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">↑</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">←</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">↓</kbd>
              <kbd className="px-2 py-1 bg-background rounded text-foreground">→</kbd> - Movimiento
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border border-border p-3 hover:border-primary/50 transition-colors">
            <h4 className="text-sm font-bold mb-2 text-foreground">Acciones</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">Tab</kbd> - Cambiar<br />
              <kbd className="px-2 py-1 bg-background rounded text-foreground">E</kbd> - Interactuar
            </p>
          </Card>

          <Card className="bg-card/50 backdrop-blur-xl border border-accent/30 p-3 hover:border-accent/50 transition-colors">
            <h4 className="text-sm font-bold mb-2 text-accent">Habilidades</h4>
            <p className="text-xs text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-foreground">Espacio</kbd> - Habilidad especial
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
