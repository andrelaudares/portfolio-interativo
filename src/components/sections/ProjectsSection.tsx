'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Play, Star, Code, Database } from 'lucide-react'
import { projects } from '@/data/projects'
import { useTranslation } from '@/hooks/useTranslation'

export function ProjectsSection() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const getProjectIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'vetech':
        return '🐾'
      case 'mcp-gemini':
        return '🧠'
      case 'subscription-authentication':
        return '🔐'
      default:
        return '🚀'
    }
  }

  const getProjectColor = (index: number) => {
    const colors = [
      'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
      'from-purple-500/10 to-pink-500/10 border-purple-500/20', 
      'from-green-500/10 to-emerald-500/10 border-green-500/20'
    ]
    return colors[index % colors.length]
  }

  return (
    <section id="projects" className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t('navigation.projects')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Projetos que demonstram minha expertise em desenvolvimento e solução de problemas
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className={`bg-gradient-to-br ${getProjectColor(index)} rounded-xl border p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Project highlight */}
              {project.isHighlight && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs border border-yellow-500/30">
                    <Star className="w-3 h-3" />
                    <span>Destaque</span>
                  </div>
                </div>
              )}

              {/* Project icon and title */}
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{getProjectIcon(project.title)}</div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">{project.category}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Key features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Características Principais
                  </h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-muted/50 text-muted-foreground rounded text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Special highlight for VeTech */}
              {project.title === 'VeTech' && (
                <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs text-primary font-medium flex items-center gap-2">
                    <Database className="w-3 h-3" />
                    160+ rotas FastAPI desenvolvidas
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg text-sm font-medium transition-colors flex-1 justify-center"
                  >
                    <Github className="w-4 h-4" />
                    <span>Código</span>
                  </a>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors flex-1 justify-center"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ver Demo</span>
                  </a>
                )}

                {project.videoUrl && (
                  <button className="flex items-center gap-2 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg text-sm font-medium transition-colors flex-1 justify-center">
                    <Play className="w-4 h-4" />
                    <span>Vídeo</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">160+</div>
            <div className="text-sm text-muted-foreground">Rotas FastAPI</div>
            <div className="text-xs text-muted-foreground mt-1">Projeto VeTech</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Projetos Principais</div>
            <div className="text-xs text-muted-foreground mt-1">Open Source</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Código Próprio</div>
            <div className="text-xs text-muted-foreground mt-1">Desenvolvido do zero</div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-full border border-primary/20 transition-colors cursor-pointer">
            <Github className="w-4 h-4" />
            <span className="font-medium">Ver todos no GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </section>
  )
} 