'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export function Header() {
  const { t, currentLang, changeLanguage } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.experience'), href: '#experience' },
    { name: t('navigation.skills'), href: '#skills' },
    { name: t('navigation.projects'), href: '#projects' },
    { name: t('navigation.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold gradient-text cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            André Laudares
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </motion.button>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => changeLanguage(currentLang === 'pt-BR' ? 'en' : 'pt-BR')}
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {currentLang === 'pt-BR' ? 'PT' : 'EN'}
                </span>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-border mt-4">
            {navigation.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * index }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Mobile Language Selector */}
            <motion.button
              onClick={() => changeLanguage(currentLang === 'pt-BR' ? 'en' : 'pt-BR')}
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isMobileMenuOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.1 * navigation.length }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentLang === 'pt-BR' ? 'English' : 'Português'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
} 