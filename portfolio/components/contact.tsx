"use client";

import { useState, useEffect } from "react";
import { Mail, Send, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpiar estados de mensaje
    if (isSuccess) setIsSuccess(false);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setIsSuccess(false);

    try {
      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "javierprofesionalwork@gmail.com", // Tu email
          reply_to: formData.email, // Para que puedas responder directamente
          to_name: "Javier",
          date: new Date().toLocaleString('es-ES', {  // ← AÑADE ESTO
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      );

      if (result.status === 200) {
        setIsSuccess(true);
        // Resetear formulario
        setFormData({ name: "", email: "", message: "" });
        
        // Mostrar mensaje de éxito por 5 segundos
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error: any) {
      console.error("Error enviando email:", error);
      setError(
        error.text || 
        "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o usa el email directo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-card/30">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Ponte en Contacto</h2>
          <p className="text-foreground/60 text-lg">
            Estoy disponible para proyectos y oportunidades interesantes
          </p>
        </div>

        {/* Mensajes de estado */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fade-in">
            ¡Mensaje enviado exitosamente! Te responderé pronto.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
            {error}
          </div>
        )}

        {/* Contact form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Mensaje</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tu mensaje..."
              rows={5}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar mensaje
                <Send size={18} />
              </>
            )}
          </Button>
        </form>

        {/* Direct contact */}
        <div className="mt-12 pt-12 border-t border-border">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email */}
            <div className="text-center">
              <p className="text-foreground/60 mb-4">
                O envíame un email directamente:
              </p>
              <a
                href="mailto:javierprofesionalwork@gmail.com?subject=Contacto%20desde%20Portfolio&body=Hola%20Javier,"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
              >
                <Mail size={20} />
                javierprofesionalwork@gmail.com
              </a>
            </div>

            {/* WhatsApp */}
            <div className="text-center">
              <p className="text-foreground/60 mb-4">
                Escríbeme por WhatsApp:
              </p>
              <a
                href="https://wa.me/5356127644?text=Hola%20Javier,%20te%20contacto%20desde%20tu%20portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
              >
                <MessageCircle size={20} />
                (53) 56127644
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}