'use client'

import { useState, useEffect } from 'react'

interface Translation {
  [key: string]: string | Translation
}

interface Translations {
  [lang: string]: Translation
}

const translations: Translations = {
  'pt-BR': {
    hero: {
      greeting: "Olá, eu sou",
      name: "André Laudares Soares",
      university: "Último ano - Engenharia de Software",
      location: "Campinas, SP",
      age: "anos",
      scroll: "Rolar"
    },
    about: {
      title: "Sobre Mim",
      description: "Desenvolvedor especializado em IA, Python Backend e automação. Primeiro funcionário da Altivus AI, com experiência em sistemas ERP, ETL e desenvolvimento de soluções inteligentes."
    },
    navigation: {
      about: "Sobre",
      experience: "Experiência", 
      skills: "Habilidades",
      projects: "Projetos",
      contact: "Contato"
    },
    contact: {
      title: "Contato",
      subtitle: "Vamos conversar sobre oportunidades, projetos ou apenas trocar uma ideia sobre tecnologia!"
    }
  },
  'en': {
    hero: {
      greeting: "Hello, I'm",
      name: "André Laudares Soares",
      university: "Final Year - Software Engineering",
      location: "Campinas, SP",
      age: "years old",
      scroll: "Scroll"
    },
    about: {
      title: "About Me",
      description: "Developer specialized in AI, Python Backend and automation. First employee at Altivus AI, with experience in ERP systems, ETL and intelligent solutions development."
    },
    navigation: {
      about: "About",
      experience: "Experience",
      skills: "Skills", 
      projects: "Projects",
      contact: "Contact"
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about opportunities, projects or just chat about technology!"
    }
  }
}

export function useTranslation() {
  const [currentLang, setCurrentLang] = useState<string>('pt-BR')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: Translation | string = translations[currentLang]
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k]
      }
    }
    
    return (typeof value === 'string' ? value : key)
  }

  const changeLanguage = (lang: string) => {
    setCurrentLang(lang)
    localStorage.setItem('language', lang)
  }

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang && translations[savedLang]) {
      setCurrentLang(savedLang)
    }
  }, [])

  return {
    t,
    currentLang,
    changeLanguage,
    availableLanguages: Object.keys(translations)
  }
} 