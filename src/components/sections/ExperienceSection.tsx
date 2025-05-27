'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Star, Users, Code, Briefcase } from 'lucide-react'
import { experiences } from '@/data/experiences'
import { useTranslation } from '@/hooks/useTranslation'

export function ExperienceSection() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-20 px-6 bg-background/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t('navigation.experience')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Minha jornada profissional desde Customer Success até Technical Product Manager
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-1/2 z-10">
                {experience.isHighlight && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping" />
                )}
              </div>

              {/* Content card */}
              <div className={`ml-16 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border p-6 hover:border-primary/50 transition-all duration-300 group">
                  {/* Company header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {experience.company}
                        {experience.isHighlight && (
                          <Star className="inline w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </h3>
                      <p className="text-primary font-medium">{experience.position}</p>
                      
                      {/* Date and location */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.startDate} - {experience.endDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4">
                    {experience.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Principais Realizações
                    </h4>
                    <ul className="space-y-1">
                      {experience.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      Tecnologias
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Special highlight for Altivus AI */}
                  {experience.isHighlight && (
                    <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-xs text-primary font-medium flex items-center gap-2">
                        <Star className="w-3 h-3" />
                        Primeiro funcionário da empresa
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Empresas</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">2+</div>
            <div className="text-sm text-muted-foreground">Anos de Experiência</div>
          </div>
          
          <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-2xl font-bold text-primary mb-2">1°</div>
            <div className="text-sm text-muted-foreground">Funcionário Altivus AI</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 