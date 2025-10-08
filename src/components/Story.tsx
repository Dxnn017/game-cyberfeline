export const Story = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="gradient-cyber">LA HISTORIA</span>
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-card/30 backdrop-blur-sm border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <h3 className="text-3xl font-black mb-4 neon-text-pink">
                Cyber Feline: La Rebelión de Kuro y Yumi
              </h3>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  En un mundo donde la tecnología y la magia se entrelazan, <span className="text-foreground font-semibold">Yumi</span>, 
                  una joven reportera con un pasado enigmático, descubre que su fiel compañero, <span className="text-foreground font-semibold">Kuro</span>, 
                  un gato aparentemente normal, es clave para desmantelar una megacorporación que controla cada aspecto de la vida en la ciudad.
                </p>

                <p>
                  Juntos, deben infiltrarse en las profundidades del poder corporativo, enfrentarse a enemigos cibernéticos, 
                  y descubrir secretos que cambiarán la ciudad para siempre.
                </p>

                <p>
                  Pero Yumi no está sola en su lucha. Kuro tiene habilidades únicas: <span className="neon-text-cyan">hackeo psíquico</span>, 
                  <span className="neon-text-cyan"> telequinesis limitada</span>, y puede incluso <span className="neon-text-cyan">manipular dispositivos electrónicos</span>. 
                  Con estos poderes y su ingenio, la joven y su gato se convierten en el equipo más temido de la ciudad.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Exploración", desc: "Ciudad viva y dinámica llena de secretos" },
                { title: "Sigilo", desc: "Infiltración estratégica en zonas corporativas" },
                { title: "Decisiones", desc: "Tus elecciones afectan el destino de la ciudad" }
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className="bg-card/50 backdrop-blur border border-border rounded-xl p-6 hover:border-secondary/50 transition-all hover:-translate-y-1"
                >
                  <h4 className="text-xl font-bold mb-2 neon-text-purple">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
