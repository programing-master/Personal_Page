"use client";
import React from "react";
import {
  ExternalLink,
  Calendar,
  Building2,
  Award,
  Code,
  Trophy,
  Youtube,
  GraduationCap,
  MapPin,
  Clock,
  Book,
  Cpu,
  Users,
  ChevronRight,
  Play,
} from "lucide-react";

const experience = [
  {
    id: 2,
    title: "Ingeniería informática",
    enterprise: "Universidad de Pinar del Río",
    role: "Estudiante Universitario",
    period: "abr. 2022 - jul. 2025",
    location: "Pinar del Río, Cuba",
    description: `Formación académica en Ingeniería Informática con enfoque en desarrollo de software, algoritmos y arquitectura de sistemas. Proyecto de tesis: Sistema de análisis de datos para entrenamientos de voleibol. A lo largo de mi carrera Apliqué mis conocimientos como alumno ayudante de la asignatura de Programación y POO , además trabaje como desarrollador en el CRY de mi universidad `,
    image: "/assets/upr-logo.png",
    link: "https://www.upr.edu.cu",
    type: "education",
  },
  {
    id: 3,
    title: "Participante ICPC 2022",
    enterprise: "International Collegiate Programming Contest",
    role: "Competidor - Final Caribeña 2022",
    period: "2022",
    location: "Competencia Nacional",
    description: `Participación en la prestigiosa competencia International Collegiate Programming Contest (ICPC) como parte del equipo "Code:Breakers". Clasificación a la fase final caribeña del ICPC.`,
    image: "/assets/icpc-logo.png",
    link: "https://www.youtube.com/watch?v=Anl8TLXpODk",
    type: "competition",
    youtubeVideo: "https://www.youtube.com/embed/Anl8TLXpODk",
  },
];

export default function Experience() {
  return (
    <section
      id="education"
      className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-card/30 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 space-y-3 md:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
             Educación
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Mi trayectoria académica y competitiva
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-4 md:gap-6 relative bg-background border border-border rounded-lg overflow-hidden transition-all duration-500 shadow-sm hover:shadow-md"
            >
              {/* Image container - Responsivo */}
              <div className="relative w-full md:w-64 lg:w-80 h-48 md:h-auto flex items-center justify-center overflow-hidden bg-muted p-4">
                {item.type === "education" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <GraduationCap size={80} className="text-primary" />
                  </div>
                ) : item.type === "competition" ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Trophy size={80} className="text-amber-600" />
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain p-2 md:p-4"
                  />
                )}
              </div>

              {/* Content - Responsivo */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4 flex-1">
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-foreground/60" />
                    <span className="text-foreground/70 font-medium">
                      {item.enterprise}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code size={16} className="text-foreground/60" />
                    <span className="text-foreground/70">{item.role}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-foreground/60" />
                    <span className="text-sm text-foreground/70">
                      {item.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-foreground/60" />
                    <span className="text-sm text-foreground/70">
                      {item.period}
                    </span>
                  </div>
                </div>

                <p className="text-foreground/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>

                {/* YouTube video for ICPC - Versión compacta */}
                {item.type === "competition" && item.youtubeVideo && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Youtube size={20} className="text-red-600" />
                      <h4 className="font-semibold text-foreground">
                        Entrevista al equipo Code:Breakers - Final Caribeña 2022
                        del ICPC
                      </h4>
                    </div>
                    <div className="relative group">
                      <div className="aspect-video max-w-md rounded-lg overflow-hidden border border-border bg-black">
                        <iframe
                          src={item.youtubeVideo}
                          title="Entrevista ICPC 2022 - Code:Breakers"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="absolute inset-0 max-w-md bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <div className="flex items-center gap-2 text-white">
                          <Play size={20} />
                          <span className="text-sm font-medium">
                            Ver entrevista completa
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm"
                    >
                      <ExternalLink size={16} />
                      <span>Visitar sitio</span>
                    </a>
                  )}

                  {item.type === "education" && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm">
                      <GraduationCap size={16} />
                      <span>Formación académica</span>
                    </div>
                  )}

                  {item.type === "competition" && (
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-md text-sm">
                      <Award size={16} />
                      <span>Competencia de programación</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
