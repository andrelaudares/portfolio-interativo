'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart } from 'lucide-react'
import { personalInfo } from '@/data/personal-info'

export function Footer() {
  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.github,
      label: "GitHub"
    },
    {
      icon: Linkedin,
      href: personalInfo.linkedin,
      label: "LinkedIn"
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: "Email"
    }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Contact info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Entre em Contato
            </h3>
            <p className="text-muted-foreground text-sm">
              Vamos construir algo incrível juntos!
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors group-hover:border-primary border border-border">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Back to top */}
          <div className="text-center md:text-right">
            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Voltar ao topo</span>
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-2">
            <span>&copy; 2025 André Laudares Soares</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>e muito</span>
              <span>☕</span>
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Desenvolvedor especializado em IA, Python Backend e automação
          </p>
        </div>
      </div>
    </footer>
  )
} 