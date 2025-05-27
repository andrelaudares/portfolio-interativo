'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react'
import { personalInfo, typingTexts } from '@/data/personal-info'
import { calculateAge } from '@/lib/utils'
import { useTranslation } from '@/hooks/useTranslation'

export function HeroSection() {
  const { t } = useTranslation()
  const [age, setAge] = useState<number>(0)
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(true)

  useEffect(() => {
    setAge(calculateAge(personalInfo.birthDate))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* Typing animation */}
          <motion.div 
            className="text-xl md:text-2xl lg:text-3xl text-foreground mb-8 h-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypeAnimation
              sequence={typingTexts.flatMap(text => [text, 2000])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-primary font-medium"
            />
          </motion.div>

          {/* Info cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{age} {t('hero.age')}</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">{t('hero.location')}</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border">
              <div className="w-5 h-5 text-primary mx-auto mb-2 flex items-center justify-center">
                🎓
              </div>
              <p className="text-sm text-muted-foreground">{t('hero.university')}</p>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
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
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors group-hover:border-primary border border-border">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
              </motion.a>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator - movido para fora do container principal */}
      {showScrollIndicator && (
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
        >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
                  <p className="text-xs text-muted-foreground mt-2">{t('hero.scroll')}</p>
        </motion.div>
      )}
    </section>
  )
} 