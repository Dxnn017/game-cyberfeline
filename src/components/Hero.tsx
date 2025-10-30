import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import yumiHero from "@/assets/yumi-hero.png";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full border border-primary/50 text-sm font-medium neon-text-pink animate-glow-pulse">
                Próximamente 2026
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="gradient-cyber">CYBER</span>
              <br />
              <span className="neon-text-purple">FELINE</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl">
              Únete a <span className="neon-text-cyan font-semibold">Yumi</span> y su compañero{" "}
              <span className="neon-text-cyan font-semibold">Kuro</span> en una aventura cyberpunk 
              para desmantelar una megacorporación corrupta.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/demo")}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all hover:scale-105 animate-glow-pulse"
              >
                Ver Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 py-6 border-2 border-secondary hover:bg-secondary/20 glow-border-purple transition-all hover:scale-105"
              >
                Comenzar Aventura
              </Button>
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              {["Pixel Art", "Aventura", "Cyberpunk", "Sigilo"].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Character Image */}
          <div className="relative lg:block hidden">
            <div className="relative animate-float">
              <img 
                src={yumiHero} 
                alt="Yumi - Protagonista" 
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
