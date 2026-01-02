"use client";

import { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  Lock,
  Building2,
  Info,
  FileText,
  Calendar,
  Code,
  Layers,
  Database,
  Globe,
  Tag,
  Users,
  BarChart3,
  Download,
  Shield,
} from "lucide-react";
import Image from "next/image";
import { allProjects } from "@/constants/projects";



export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [loadedProjects, setLoadedProjects] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Observador para animaciones de entrada
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = Number(entry.target.getAttribute("data-project-id"));
          setVisibleProjects((prev) => [...new Set([...prev, id])]);
        }
      });
    }, observerOptions);

    document.querySelectorAll("[data-project-id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loadedProjects]);

  const loadMoreProjects = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLoadedProjects((prev) => Math.min(prev + 3, allProjects.length));
      setIsLoadingMore(false);
    }, 600);
  };

  const openImageGallery = (project: any, imageIndex: number = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    setImageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openInfoModal = (project: any) => {
    setSelectedProject(project);
    setInfoModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setImageModalOpen(false);
    setInfoModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((!imageModalOpen && !infoModalOpen) || !selectedProject) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" && imageModalOpen) nextImage();
    if (e.key === "ArrowLeft" && imageModalOpen) prevImage();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageModalOpen, infoModalOpen, selectedProject]);

  const projectsToShow = allProjects.slice(0, loadedProjects);
  const hasMoreProjects = loadedProjects < allProjects.length;

  // Función para validar si un enlace es válido
  const isValidLink = (link: string | null) => {
    return link && link !== "#" && link !== "";
  };

  return (
    <>
      <section
        id="projects"
        className="py-20 md:py-32 px-4 bg-card/30 relative"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Proyectos Destacados
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Algunos de mis proyectos más recientes y desafiantes
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projectsToShow.map((project, index) => (
              <div
                key={project.id}
                data-project-id={project.id}
                className={`
                  group relative bg-background border border-border rounded-xl overflow-hidden 
                  transition-all duration-500 hover:shadow-xl hover:border-primary/30
                  ${
                    visibleProjects.includes(project.id)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                  flex flex-col h-[520px] md:h-[540px] // Altura fija para todas
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image gallery container */}
                <div className="relative h-48 md:h-52 overflow-hidden bg-muted cursor-pointer flex-shrink-0">
                  {project.images.length > 1 ? (
                    <div className="grid grid-cols-2 gap-1 h-full">
                      {project.images.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className={`
                            relative overflow-hidden
                            ${idx === 0 ? "col-span-2 row-span-2" : ""}
                          `}
                          onClick={() => openImageGallery(project, idx)}
                        >
                          <Image
                            src={img}
                            alt={`${project.title} - Imagen ${idx + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {idx === 3 && project.images.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white font-bold text-lg">
                                +{project.images.length - 4}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="relative w-full h-full"
                      onClick={() => openImageGallery(project, 0)}
                    >
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Gallery indicator */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Images size={12} />
                    <span>{project.images.length}</span>
                  </div>

                  {/* Company badge */}
                  <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Building2 size={12} />
                    <span className="max-w-[120px] truncate">
                      {project.company}
                    </span>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="p-5 md:p-6 flex-grow flex flex-col">
                  {/* Título */}
                  <div className="mb-3">
                    <h3 className="text-lg md:text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  {/* Descripción corta (vista previa) */}
                  <div className="mb-4 flex-grow">
                    <div className="relative">
                      <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sección inferior con botón de info */}
                  <div className="mt-auto pt-4 border-t border-border/50 space-y-3">
                    {/* Botón para ver información completa */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => openInfoModal(project)}
                        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 
                          bg-primary/10 text-primary hover:bg-primary/20 
                          text-sm font-medium rounded-lg transition-all duration-200"
                      >
                        <Info size={16} />
                        <span>Ver información completa</span>
                      </button>
                    </div>

                    {/* Links and Software Type */}
                    {project.isOpenSource ? (
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          {isValidLink(project.link) && (
                            <a
                              href={project.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors hover:underline"
                            >
                              Ver proyecto <ExternalLink size={16} />
                            </a>
                          )}
                          {isValidLink(project.github) && (
                            <a
                              href={project.github || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors"
                            >
                              <Github size={16} />
                              Código
                            </a>
                          )}
                          {!isValidLink(project.link) &&
                            !isValidLink(project.github) && (
                              <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded-full">
                                Open Source
                              </span>
                            )}
                        </div>
                        {(isValidLink(project.link) ||
                          isValidLink(project.github)) && (
                          <span className="text-xs text-green-600 font-medium px-2 py-1 bg-green-100 rounded-full">
                            Open Source
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-amber-600">
                          <Lock size={16} />
                          <span className="text-sm font-medium">
                            Software Propietario
                          </span>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                          <p className="text-xs text-amber-800 line-clamp-2">
                            <span className="font-semibold">
                              Propiedad de {project.company}
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-12">
              <button
                onClick={loadMoreProjects}
                disabled={isLoadingMore}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-medium rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative">
                  {isLoadingMore ? "Cargando..." : "Ver más proyectos"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 group-hover:translate-y-1 ${
                    isLoadingMore ? "animate-bounce" : ""
                  }`}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              <p className="text-foreground/50 text-sm mt-4">
                Mostrando {loadedProjects} de {allProjects.length} proyectos
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Gallery Modal */}
      {imageModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-red-400 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-6xl mx-4 max-h-[90vh] bg-background rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                <p className="text-sm text-foreground/60">
                  Imagen {currentImageIndex + 1} de{" "}
                  {selectedProject.images.length}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative h-[60vh] bg-black">
              <Image
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Imagen ${
                  currentImageIndex + 1
                }`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2 overflow-x-auto py-2">
                {selectedProject.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-primary"
                        : "border-transparent hover:border-foreground/30"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Modal */}
      {infoModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-4xl mx-4 min-h-[90vh] bg-background rounded-xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <div>
                <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={16} className="text-foreground/60" />
                    <span className="text-sm text-foreground/70">
                      {selectedProject.company || "Personal"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {selectedProject.isOpenSource ? (
                      <>
                        <Globe size={16} className="text-green-600" />
                        <span className="text-sm text-green-600 font-medium">
                          Open Source
                        </span>
                      </>
                    ) : (
                      <>
                        <Shield size={16} className="text-amber-600" />
                        <span className="text-sm text-amber-600 font-medium">
                          Propietario
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[70vh]">
              <div className="p-6 space-y-6">
                {/* Description Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    <h4 className="text-lg font-semibold">
                      Descripción Completa
                    </h4>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                      {selectedProject.longDescription ||
                        selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Technologies Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Code size={20} className="text-primary" />
                    <h4 className="text-lg font-semibold">
                      Tecnologías Utilizadas
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full font-medium flex items-center gap-1.5"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company & Type */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-foreground/60" />
                      <div>
                        <p className="text-sm font-medium">
                          Empresa/Institución
                        </p>
                        <p className="text-foreground/80">
                          {selectedProject.company || "Proyecto Personal"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedProject.isOpenSource ? (
                        <>
                          <Globe size={18} className="text-green-600" />
                          <div>
                            <p className="text-sm font-medium">
                              Tipo de Software
                            </p>
                            <p className="text-green-600">Open Source</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Shield size={18} className="text-amber-600" />
                          <div>
                            <p className="text-sm font-medium">
                              Tipo de Software
                            </p>
                            <p className="text-amber-600">Propietario</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Build Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-foreground/60" />
                      <div>
                        <p className="text-sm font-medium">Desarrollado para</p>
                        <p className="text-foreground/80">
                          {selectedProject.build}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <BarChart3 size={18} className="text-foreground/60" />
                      <div>
                        <p className="text-sm font-medium">
                          Rol en el proyecto
                        </p>
                        <p className="text-foreground/80">
                          {selectedProject.rol}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info for Proprietary Software */}
                {!selectedProject.isOpenSource && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock size={18} className="text-amber-600" />
                      <h5 className="font-semibold text-amber-800">
                        Información sobre Propiedad
                      </h5>
                    </div>
                    <p className="text-sm text-amber-700">
                      {selectedProject.closeSourceInfo}
                    </p>
                  </div>
                )}

                {/* Images Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Images size={20} className="text-primary" />
                    <h4 className="text-lg font-semibold">
                      Capturas del Proyecto
                    </h4>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {selectedProject.images
                      .slice(0, 4)
                      .map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => {
                            closeModal();
                            setTimeout(
                              () => openImageGallery(selectedProject, idx),
                              100
                            );
                          }}
                          className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-border hover:border-primary transition-all"
                        >
                          <Image
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    {selectedProject.images.length > 4 && (
                      <button
                        onClick={() => {
                          closeModal();
                          setTimeout(
                            () => openImageGallery(selectedProject, 0),
                            100
                          );
                        }}
                        className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-dashed border-border hover:border-primary transition-all flex items-center justify-center"
                      >
                        <div className="text-center">
                          <span className="text-2xl">
                            +{selectedProject.images.length - 4}
                          </span>
                          <p className="text-xs mt-1">Ver más</p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ExternalLink size={20} className="text-primary" />
                    <h4 className="text-lg font-semibold">
                      Enlaces Relacionados
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.isOpenSource &&
                      isValidLink(selectedProject.github) && (
                        <a
                          href={selectedProject.github || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <Github size={18} />
                          <span>Ver código en GitHub</span>
                        </a>
                      )}
                    {isValidLink(selectedProject.link) && (
                      <a
                        href={selectedProject.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span>Visitar Proyecto</span>
                      </a>
                    )}
                    {!selectedProject.isOpenSource &&
                      !isValidLink(selectedProject.link) &&
                      !isValidLink(selectedProject.github) && (
                        <div className="text-foreground/70 text-sm">
                          Este proyecto es de uso interno/propietario y no está
                          disponible públicamente.
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-muted/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar size={14} />
                  <span>
                    Proyecto desarrollado en{" "}
                    {selectedProject.company ? "empresa" : "tiempo personal"}
                  </span>
                </div>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
