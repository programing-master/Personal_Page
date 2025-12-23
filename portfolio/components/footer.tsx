"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/programing-master", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/javier-ernesto-valladares-alonso",
      label: "LinkedIn",
    },
    { icon: Mail, href: "mailto:javierprofesionalwork@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Javier.Dev
            </h3>
            <p className="text-foreground/60 text-sm">
              Desarrollador web apasionado por crear experiencias digitales
              extraordinarias.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-primary transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-primary transition-colors"
                >
                  Proyectos
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-primary transition-colors"
                >
                  Habilidades
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-primary transition-colors"
                >
                  Experiencia
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Sígueme</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-card border border-border rounded-lg flex items-center justify-center hover:bg-primary/20 hover:border-primary transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>© 2025 Javier.Dev. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
