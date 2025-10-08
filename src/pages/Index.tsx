import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Characters } from "@/components/Characters";
import { Story } from "@/components/Story";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Characters />
      <Story />
      <Footer />
    </div>
  );
};

export default Index;
