export interface PersonalInfo {
  name: string
  birthDate: string
  location: string
  university: string
  course: string
  email: string
  linkedin: string
  github: string
  profileImage: string
  languages: {
    primary: string
    secondary: string[]
  }
}

export interface Experience {
  id: number
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string
  highlights: string[]
  technologies: string[]
  isHighlight: boolean
}

export interface Project {
  id: number
  title: string
  category: string
  description: string
  technologies: string[]
  githubUrl: string
  demoUrl?: string
  videoUrl?: string
  features: string[]
  isInteractive: boolean
  interactiveType?: string
  isHighlight?: boolean
}

export interface Skill {
  name: string
  level: number
  color: string
  icon: string
  description: string
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Translation {
  [key: string]: string | Translation
}

export interface Translations {
  [lang: string]: Translation
} 