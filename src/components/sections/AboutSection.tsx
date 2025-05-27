'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Users, Coffee, Star } from 'lucide-react'
import { personalInfo } from '@/data/personal-info'
import { useTranslation } from '@/hooks/useTranslation'

export function AboutSection() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: Code,
      value: "160+",
      label: "Rotas FastAPI",
      description: "Projeto VeTech"
    },
    {
      icon: Users,
      value: "3",
      label: "Empresas",
      description: "Experiência"
    },
    {
      icon: Coffee,
      value: "2+",
      label: "Anos",
      description: "Desenvolvendo"
    },
    {
      icon: Star,
      value: "5+",
      label: "Certificados",
      description: "IA & Backend"
    }
  ]

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-8">
              <div className="w-80 h-80 mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl rotate-3" />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-2xl -rotate-3" />
                <div className="relative w-full h-full bg-card rounded-2xl border border-border overflow-hidden">
                  {/* Placeholder para foto */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                  {/* Quando tiver a foto, usar: */}
                  {/* <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                  /> */}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Desenvolvedor Full-Stack
              </h3>
              <p className="text-lg text-primary font-medium">
                Especialista em IA & Python Backend
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
              
              {/* Skills destacadas */}
              <div className="flex flex-wrap gap-2 pt-4">
                {['Python', 'FastAPI', 'React', 'IA/ML', 'PostgreSQL', 'N8N'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div>
                    <motion.div
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 1, delay: 1 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm font-medium text-primary">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Academic info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                🎓
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-foreground">
                  {personalInfo.course}
                </h4>
                <p className="text-primary">{personalInfo.university}</p>
                <p className="text-sm text-muted-foreground">
                  Último ano • Campinas, SP
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 