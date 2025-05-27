'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart, Download, MessageCircle, Code, Sparkles } from 'lucide-react'
import { personalInfo } from '@/data/personal-info'
import { downloadResumePDF } from '@/lib/pdf-generator'

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

  const handleDownloadPDF = async () => {
    try {
      await downloadResumePDF()
    } catch (error) {
      console.error('Erro ao baixar PDF:', error)
    }
  }

  const quickActions = [
    {
      label: 'Baixar Currículo',
      icon: Download,
      action: handleDownloadPDF,
      color: 'text-blue-500 hover:text-blue-600'
    },
    {
      label: 'Chat com IA',
      icon: MessageCircle,
      action: () => {
        // O chatbot já está disponível no canto da tela
        const event = new CustomEvent('open-chat')
        window.dispatchEvent(event)
      },
      color: 'text-purple-500 hover:text-purple-600'
    }
  ]

  const stats = [
    { label: 'Projetos', value: '3+' },
    { label: 'Rotas API', value: '160+' },
    { label: 'Tecnologias', value: '16+' },
    { label: 'Experiência', value: '2+ anos' }
  ]

  return (
    <footer className="py-12 px-6 border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, statIndex) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: statIndex * 0.1 }}
              className="text-center p-4 bg-primary/5 rounded-lg border border-primary/10"
            >
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
          {/* About section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
              <Code className="w-5 h-5 text-primary" />
              André Laudares
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Desenvolvedor especializado em IA, Python Backend e automação. 
              Primeiro funcionário da Altivus AI.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
              {quickActions.map((action) => (
                <motion.button
                  key={action.label}
                  onClick={action.action}
                  className={`flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm transition-colors ${action.color}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-primary text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Especialista em IA + Python</span>
            </div>
          </div>

          {/* Social links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Vamos nos conectar!
            </h4>
            <div className="flex justify-center space-x-6 mb-4">
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
                  <div className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors group-hover:border-primary border border-border">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              {personalInfo.location}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Disponível para oportunidades</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2 mb-6">
              {[
                { label: 'Sobre', href: '#about' },
                { label: 'Experiência', href: '#experience' },
                { label: 'Habilidades', href: '#skills' },
                { label: 'Projetos', href: '#projects' },
                { label: 'Contato', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm block py-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm px-3 py-2 bg-primary/10 rounded-lg"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <ArrowUp className="w-4 h-4" />
              Voltar ao topo
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-2 mb-2">
            <span>&copy; 2025 André Laudares Soares</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>e muito</span>
              <span>☕</span>
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Portfólio interativo desenvolvido em React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
} 