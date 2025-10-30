import { Github, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-card/30 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-black gradient-cyber mb-3">CYBER FELINE</h3>
            <p className="text-muted-foreground">
              La aventura cyberpunk definitiva con Yumi y Kuro.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-3 text-foreground">Enlaces</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Sobre el Juego</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Prensa</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Soporte</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-3 text-foreground">Síguenos</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 Cyber Feline. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
