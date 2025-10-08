import { Card } from "@/components/ui/card";
import kuroCat from "@/assets/kuro-cat.png";
import yumiRef from "@/assets/yumi-reference.png";

export const Characters = () => {
  const characters = [
    {
      name: "Yumi",
      role: "Reportera Investigativa",
      image: yumiRef,
      description: "Una joven intrépida con habilidades de hackeo avanzado, parkour y estrategia táctica. Su determinación por descubrir la verdad la convierte en una amenaza para las corporaciones.",
      skills: ["Hackeo Avanzado", "Parkour", "Sigilo", "Combate Táctico"]
    },
    {
      name: "Kuro",
      role: "Compañero Cibernético",
      image: kuroCat,
      description: "Un gato con poderes mágicos y tecnológicos. Puede hackear sistemas, desactivar alarmas, comunicarse con animales mecánicos y teletransportarse a cortas distancias.",
      skills: ["Hackeo Psíquico", "Teletransportación", "Invisibilidad", "Manipulación Tech"]
    }
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-cyber">PROTAGONISTAS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce al equipo más temido de la ciudad cyberpunk
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {characters.map((character, index) => (
            <Card 
              key={character.name}
              className="group relative overflow-hidden bg-card/50 backdrop-blur border-2 border-border hover:border-primary transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-6">
                {/* Character Image */}
                <div className="mb-6 relative">
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Character Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-3xl font-black mb-2 ${index === 0 ? 'neon-text-pink' : 'neon-text-cyan'}`}>
                      {character.name}
                    </h3>
                    <p className="text-sm text-secondary font-semibold uppercase tracking-wider">
                      {character.role}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {character.description}
                  </p>

                  {/* Skills */}
                  <div className="pt-4">
                    <h4 className="text-sm font-bold mb-3 text-foreground">Habilidades:</h4>
                    <div className="flex flex-wrap gap-2">
                      {character.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="px-3 py-1 rounded-full bg-background/50 border border-primary/30 text-xs font-medium hover:border-primary transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
