"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-4 animate-slide-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-sm">
          <Sparkles size={16} className="text-primary" />
          <span className="text-primary font-medium">
            Bienvenido a mi portafolio
          </span>
        </div>

        {/* Main heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Javier Valladares Alonso
            <br />
            <span className="bg-gradient-to-r text-5xl from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift">
              Full Stack Developer
            </span>
          </h1>

          <p className="text-lg  text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Desarrollador full stack con más de 4 años de experiencia en la
            creación de software innovador y soluciones tecnológicas eficientes.
            Experiencia demostrada en el desarrollo, optimización y depuración
            de aplicaciones de alto rendimiento y escalables. Competente en
            desarrollo web. Me destaco por mi capacidad para resolver problemas
            complejos.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            className="px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver mis proyectos
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="pt-12 animate-bounce">
          <ChevronDown size={32} className="mx-auto text-primary" />
        </div>
      </div>
    </section>
  );
}
