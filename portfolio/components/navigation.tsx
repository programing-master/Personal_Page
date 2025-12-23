"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";

interface NavigationProps {
  scrolled: boolean;
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", href: "#home" },
    { label: "Proyectos", href: "#projects" },
    { label: "Experiencia", href: "#experience" },
    { label: "Habilidades", href: "#skills" },
    { label: "Contacto", href: "#contact" },
  ];

  const downloadCV = () => {
    const cvPath = "/CV(Javier Valladares Alonso).pdf";

    const link = document.createElement("a");
    link.href = cvPath;

    link.download = "CV-Javier-Desarrollador.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="#home"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Javier.Dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={downloadCV}
            className="px-6 py-2 border-2 border-primary text-primary  rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download size={16} />
            Descargar CV
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={downloadCV}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Descargar CV
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
