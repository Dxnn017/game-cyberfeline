import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import yumiHero from "@/assets/yumi-hero.png";
import kuroCat from "@/assets/kuro-cat.png";

export default function Demo() {
  const navigate = useNavigate();
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    {
      title: "Infiltración",
      description: "Yumi y Kuro se infiltran en una corporación usando sigilo y hackeo",
      action: "Yumi hackea el sistema de seguridad mientras Kuro desactiva las alarmas",
      location: "Zona Cyberpunk - Torre NeoCore",
    },
    {
      title: "Combate",
      description: "Un encuentro inesperado con guardias de seguridad",
      action: "Kuro usa telequinesis para desarmar enemigos mientras Yumi ejecuta combos tácticos",
      location: "Zona Cyberpunk - Nivel 42",
    },
    {
      title: "Investigación",
      description: "Descubriendo evidencia crucial",
      action: "Yumi fotografía documentos secretos mientras Kuro hackea servidores",
      location: "Zona Solarpunk - Base de Datos",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [scenes.length]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-pulse"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

      {/* Particles Effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2" />
            Volver
          </Button>
          <h1 className="text-2xl font-black">
            <span className="neon-text-purple">DEMO INTERACTIVA</span>
          </h1>
          <div className="w-24" />
        </div>

        {/* Main Demo Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-6xl w-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Character Display */}
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Yumi */}
                  <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{
                      transform: `translateX(${currentScene === 0 ? '0' : currentScene === 1 ? '50px' : '-50px'}) scale(${currentScene === 2 ? '1.1' : '1'})`,
                    }}
                  >
                    <img
                      src={yumiHero}
                      alt="Yumi"
                      className="w-3/4 object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Kuro */}
                  <div
                    className="absolute bottom-0 right-0 transition-all duration-1000"
                    style={{
                      transform: `translateY(${currentScene === 0 ? '0' : currentScene === 1 ? '-30px' : '30px'}) scale(${currentScene === 1 ? '1.2' : '1'})`,
                      opacity: currentScene === 2 ? 0.7 : 1,
                    }}
                  >
                    <img
                      src={kuroCat}
                      alt="Kuro"
                      className="w-48 object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-full blur-3xl"></div>
                </div>
              </div>

              {/* Scene Info */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 rounded-full border border-primary/50 bg-primary/10">
                  <span className="text-sm font-medium neon-text-cyan">
                    {scenes[currentScene].location}
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-5xl font-black animate-in fade-in slide-in-from-right-4">
                    <span className="neon-text-pink">{scenes[currentScene].title}</span>
                  </h2>

                  <p className="text-xl text-muted-foreground animate-in fade-in slide-in-from-right-5">
                    {scenes[currentScene].description}
                  </p>

                  <div className="p-4 rounded-xl bg-card/50 backdrop-blur border border-border animate-in fade-in slide-in-from-right-6">
                    <p className="text-foreground font-medium">
                      {scenes[currentScene].action}
                    </p>
                  </div>
                </div>

                {/* Scene Indicators */}
                <div className="flex gap-3">
                  {scenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScene(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentScene
                          ? "w-12 bg-primary"
                          : "w-2 bg-border hover:bg-primary/50"
                      }`}
                    />
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="text-lg px-8 py-6 animate-glow-pulse"
                  >
                    Comenzar Aventura
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Demo automática • Las escenas cambian cada 5 segundos</p>
        </div>
      </div>
    </div>
  );
}
