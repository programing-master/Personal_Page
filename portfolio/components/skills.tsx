"use client";

import {
  Code2,
  Palette,
  Zap,
  Database,
  GitBranch,
  Lightbulb,
} from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML/CSS",
      "Angular",
      "Bootstrap",
      "Sass",
      "MUI",
      "Shadcn",
      "Acertinity UI",
      "Framer Motion",
    ],
  },
  {
    icon: Database,
    title: "Backend",
    skills: [
      "Node.js",
      "Nest.js",
      "PostgreSQL",
      "MongoDB",
      "REST API",
      "Django Rest",
      "Express.js",
      "MySql",
      "Sqlite",
    ],
  },
  {
    icon: Zap,
    title: "Performance",
    skills: ["Web Vitals", "Caching", "Optimization", "SEO", "PWA"],
  },
  {
    icon: Palette,
    title: "Design",
    skills: [
      "UI/UX",
      "Figma",
      "Responsive Design",
      "Animations",
      "Accessibility",
    ],
  },
  {
    icon: GitBranch,
    title: "DevOps",
    skills: ["Git", "Docker", "CI/CD", "AWS", "Vercel", "Netlify", "Codeberg"],
  },
  {
    icon: Lightbulb,
    title: "Herramientas",
    skills: [
      "Webpack",
      "VS Code",
      "Postman",
      "Cursor",
      "Insomnia",
      "TurboPack",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Habilidades Técnicas
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Tecnologías y herramientas que domino
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-foreground/70 text-sm flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
