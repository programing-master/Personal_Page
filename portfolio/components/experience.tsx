"use client";
import React from "react";

const experience = [
  {
    id: 1,
    title: "Full Stack Developer | NOVAXAAS",
    enterprise: "NOVAXAAS",
    description: `Desarrollador Full-Stack,

ago. 2025 - actualidad 
Pinar del Río, Cuba · Presencial

Como Desarrollador Full Stack en NOVAXAAS, soy responsable del diseño, desarrollo y mantenimiento de soluciones tecnológicas integrales que impulsan la innovación y la evolución digital de la empresa. Trabajo tanto en el front-end como en el back-end, asegurando que las aplicaciones sean robustas, eficientes y escalables.`,
    image:
      "https://www.novaxaas.cu/wp-content/uploads/2025/08/xlogo-footer-min.png.pagespeed.ic.exNBigLBZP.webp",
    link: "novaxaas.cu",
    github: "#",
  },

  
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-card/30 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Experiencia
          </h2>
        </div>

        <div className="flex flex-col  gap-6 md:gap-8">
          {experience.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 md:gap-6 relative bg-background border border-border rounded-lg overflow-hidden transition-all duration-500 shadow-sm hover:shadow-md"
            >
              {/* Image container - Responsivo */}
              <div className="relative w-full md:w-64 lg:w-80 h-48 md:h-auto flex items-center justify-center overflow-hidden bg-muted p-4">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain p-2 md:p-4"
                />
              </div>

              {/* Content - Responsivo */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>

                {/* Opcional: Botones para móvil */}
                <div className="flex gap-3 pt-2 md:hidden">
                  {item.link && (
                    <a
                      href={`https://${item.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Visitar sitio
                    </a>
                  )}
                </div>
              </div>

              {/* Opcional: Botones para desktop */}
              {item.link && (
                <div className="hidden md:flex items-center p-6">
                  <a
                    href={`https://${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Visitar sitio
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
