'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Database, Brain, Zap, Globe, Settings } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface Skill {
  name: string
  level: number
  category: string
  icon: string
}

const skillsData: Skill[] = [
  // Backend
  { name: "Python", level: 95, category: "Backend", icon: "🐍" },
  { name: "FastAPI", level: 90, category: "Backend", icon: "⚡" },
  { name: "PostgreSQL", level: 85, category: "Backend", icon: "🐘" },
  { name: "APIs REST", level: 90, category: "Backend", icon: "🔗" },
  
  // Frontend
  { name: "React", level: 80, category: "Frontend", icon: "⚛️" },
  { name: "TypeScript", level: 75, category: "Frontend", icon: "📘" },
  { name: "Tailwind CSS", level: 85, category: "Frontend", icon: "🎨" },
  { name: "Next.js", level: 70, category: "Frontend", icon: "▲" },
  
  // IA/ML
  { name: "LangFlow", level: 85, category: "IA/ML", icon: "🤖" },
  { name: "Vertex AI", level: 75, category: "IA/ML", icon: "🧠" },
  { name: "Gemini AI", level: 80, category: "IA/ML", icon: "💎" },
  { name: "N8N", level: 90, category: "IA/ML", icon: "🔧" },
  
  // Ferramentas
  { name: "Git/GitHub", level: 85, category: "Ferramentas", icon: "🐙" },
  { name: "Postman", level: 90, category: "Ferramentas", icon: "📮" },
  { name: "Supabase", level: 85, category: "Ferramentas", icon: "🔥" },
  { name: "Power BI", level: 70, category: "Ferramentas", icon: "📊" },
]

const categories = [
  { name: "Backend", icon: Database, color: "text-blue-500" },
  { name: "Frontend", icon: Globe, color: "text-green-500" },
  { name: "IA/ML", icon: Brain, color: "text-purple-500" },
  { name: "Ferramentas", icon: Settings, color: "text-orange-500" },
]

export function SkillsSection() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t('navigation.skills')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Minhas principais habilidades técnicas desenvolvidas ao longo da carreira
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Categories overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-primary/50 transition-colors text-center"
            >
              <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color}`} />
              <h3 className="font-semibold text-foreground">{category.name}</h3>
              <p className="text-xs text-muted-foreground">
                {skillsData.filter(skill => skill.category === category.name).length} skills
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills grid by category */}
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + categoryIndex * 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <category.icon className={`w-6 h-6 ${category.color}`} />
                <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData
                  .filter(skill => skill.category === category.name)
                  .map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0.5 + categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                      className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.7 + categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-8 border border-primary/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">16+</div>
              <div className="text-sm text-muted-foreground">Tecnologias Dominadas</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-primary mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Proficiência Backend</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Certificações IA</div>
            </div>
          </div>
        </motion.div>

        {/* Special highlight for expertise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">
              Especialista em Python + IA + FastAPI
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 