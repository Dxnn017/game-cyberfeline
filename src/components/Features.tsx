import { Zap, Users, Gamepad2, Sparkles } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Combate Dinámico",
      description: "Alterna entre Yumi y Kuro en combates intensos que combinan acción, sigilo y trabajo en equipo.",
      color: "neon-pink"
    },
    {
      icon: Users,
      title: "Vínculo Emocional",
      description: "Desarrolla una relación profunda entre Yumi y Kuro a través de diálogos e interacciones significativas.",
      color: "neon-purple"
    },
    {
      icon: Gamepad2,
      title: "Exploración Libre",
      description: "Muévete libremente por el mundo cyberpunk, interactúa con el entorno y descubre secretos ocultos.",
      color: "neon-cyan"
    },
    {
      icon: Sparkles,
      title: "Personalización",
      description: "Mejora a tus personajes con equipo cibernético, habilidades nuevas y gadgets futuristas.",
      color: "cyber-orange"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="neon-text-purple">CARACTERÍSTICAS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una experiencia de juego única que combina acción, estrategia y narrativa emocional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-6 rounded-xl bg-card/50 backdrop-blur border-2 border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative space-y-4">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${feature.color}`} strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
