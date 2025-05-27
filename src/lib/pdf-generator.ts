'use client'

import jsPDF from 'jspdf'
import { personalInfo } from '@/data/personal-info'
import { experiences } from '@/data/experiences'
import { projects } from '@/data/projects'

export interface PDFConfig {
  filename: string
  template: 'modern' | 'classic' | 'minimal'
  includePhoto: boolean
  maxExperiences: number
  maxProjects: number
  maxSkills: number
}

const defaultConfig: PDFConfig = {
  filename: 'curriculo-andre-laudares.pdf',
  template: 'modern',
  includePhoto: false, // Será true quando tiver a foto
  maxExperiences: 3,
  maxProjects: 3,
  maxSkills: 12
}

// Skills principais com níveis
const topSkills = [
  { name: "Python", level: "95%" },
  { name: "FastAPI", level: "90%" },
  { name: "PostgreSQL", level: "85%" },
  { name: "React", level: "80%" },
  { name: "TypeScript", level: "75%" },
  { name: "N8N", level: "90%" },
  { name: "Gemini AI", level: "80%" },
  { name: "Git/GitHub", level: "85%" },
  { name: "Postman", level: "90%" },
  { name: "Supabase", level: "85%" },
  { name: "Power BI", level: "70%" },
  { name: "ERP Protheus", level: "75%" }
]

export class PDFGenerator {
  private doc: jsPDF
  private config: PDFConfig
  private pageWidth: number
  private pageHeight: number
  private currentY: number
  private margin: number

  constructor(config: Partial<PDFConfig> = {}) {
    this.config = { ...defaultConfig, ...config }
    this.doc = new jsPDF('portrait', 'mm', 'a4')
    this.pageWidth = this.doc.internal.pageSize.getWidth()
    this.pageHeight = this.doc.internal.pageSize.getHeight()
    this.margin = 20
    this.currentY = this.margin
  }

  private addText(text: string, fontSize: number = 10, style: 'normal' | 'bold' = 'normal', color: number[] = [0, 0, 0]) {
    this.doc.setFontSize(fontSize)
    this.doc.setFont('helvetica', style)
    this.doc.setTextColor(color[0], color[1], color[2])
    
    const lines = this.doc.splitTextToSize(text, this.pageWidth - (this.margin * 2))
    this.doc.text(lines, this.margin, this.currentY)
    this.currentY += (lines.length * fontSize * 0.4) + 2
  }

  private addTitle(text: string, fontSize: number = 16, color: number[] = [59, 130, 246]) {
    this.currentY += 5
    this.addText(text, fontSize, 'bold', color)
    this.currentY += 2
  }

  private addSectionDivider() {
    this.currentY += 3
    this.doc.setLineWidth(0.5)
    this.doc.setDrawColor(200, 200, 200)
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY)
    this.currentY += 6
  }

  private addSkillBar(skillName: string, level: string, x: number, y: number, width: number = 60) {
    // Nome da skill
    this.doc.setFontSize(9)
    this.doc.setFont('helvetica', 'normal')
    this.doc.setTextColor(0, 0, 0)
    this.doc.text(skillName, x, y)
    
    // Nível percentual
    this.doc.setFontSize(8)
    this.doc.setTextColor(100, 100, 100)
    this.doc.text(level, x + width - 15, y)
    
    // Barra de progresso
    const barY = y + 2
    const barWidth = width - 20
    const levelPercent = parseInt(level.replace('%', '')) / 100
    
    // Background da barra
    this.doc.setFillColor(240, 240, 240)
    this.doc.rect(x, barY, barWidth, 2, 'F')
    
    // Preenchimento da barra
    this.doc.setFillColor(59, 130, 246)
    this.doc.rect(x, barY, barWidth * levelPercent, 2, 'F')
  }

  public async generatePDF(): Promise<void> {
    // HEADER COM INFORMAÇÕES PRINCIPAIS
    this.addTitle(`${personalInfo.name}`, 20, [0, 0, 0])
    this.currentY -= 3
    
    this.addText('Desenvolvedor Python + IA | Technical Product Manager', 12, 'normal', [59, 130, 246])
    this.currentY += 2
    
    // Informações de contato em uma linha
    const contactInfo = `📧 ${personalInfo.email} | 💼 ${personalInfo.linkedin} | 🐙 ${personalInfo.github} | 📍 ${personalInfo.location}`
    this.addText(contactInfo, 9, 'normal', [100, 100, 100])
    
    this.addSectionDivider()

    // RESUMO PROFISSIONAL
    this.addTitle('Resumo Profissional', 14)
    const summary = `Desenvolvedor especializado em IA e Python Backend com 2+ anos de experiência. Primeiro funcionário da Altivus AI (startup de IA), com expertise em automação inteligente, sistemas ERP e desenvolvimento de APIs. Destaque para o projeto VeTech com 160+ rotas FastAPI desenvolvidas sozinho. Formando em Engenharia de Software pela PUC Campinas.`
    this.addText(summary, 10, 'normal')
    
    this.addSectionDivider()

    // EXPERIÊNCIAS PROFISSIONAIS
    this.addTitle('Experiência Profissional', 14)
    
    experiences.slice(0, this.config.maxExperiences).forEach((exp, index) => {
      // Nome da empresa e cargo
      this.addText(`${exp.company} | ${exp.position}`, 11, 'bold', [0, 0, 0])
      this.currentY -= 2
      
      // Período e localização
      this.addText(`${exp.startDate} - ${exp.endDate} | ${exp.location}`, 9, 'normal', [100, 100, 100])
      this.currentY += 1
      
      // Principais realizações (máximo 3)
      exp.highlights.slice(0, 3).forEach(highlight => {
        this.addText(`• ${highlight}`, 9, 'normal')
        this.currentY -= 1
      })
      
      // Tecnologias
      const techText = `Tecnologias: ${exp.technologies.slice(0, 6).join(', ')}`
      this.addText(techText, 8, 'normal', [100, 100, 100])
      
      if (index < experiences.length - 1) this.currentY += 3
    })

    this.addSectionDivider()

    // HABILIDADES TÉCNICAS
    this.addTitle('Habilidades Técnicas', 14)
    
    const skillsPerRow = 2
    const skillWidth = (this.pageWidth - (this.margin * 2) - 10) / skillsPerRow
    let currentRow = 0
    let currentCol = 0
    
    topSkills.slice(0, this.config.maxSkills).forEach((skill) => {
      const x = this.margin + (currentCol * (skillWidth + 5))
      const y = this.currentY + (currentRow * 10)
      
      this.addSkillBar(skill.name, skill.level, x, y, skillWidth)
      
      currentCol++
      if (currentCol >= skillsPerRow) {
        currentCol = 0
        currentRow++
      }
    })
    
    // Ajustar currentY baseado no número de linhas de skills
    const totalRows = Math.ceil(topSkills.slice(0, this.config.maxSkills).length / skillsPerRow)
    this.currentY += (totalRows * 10) + 5

    this.addSectionDivider()

    // PROJETOS DESTACADOS
    this.addTitle('Projetos Destacados', 14)
    
    projects.slice(0, this.config.maxProjects).forEach((project, index) => {
      // Título do projeto
      this.addText(project.title, 11, 'bold', [0, 0, 0])
      this.currentY -= 2
      
      // Descrição
      this.addText(project.description, 9, 'normal')
      
      // Destaque especial para VeTech
      if (project.title === 'VeTech') {
        this.addText('🎯 Destaque: 160+ rotas FastAPI desenvolvidas sozinho', 9, 'bold', [34, 197, 94])
        this.currentY += 1
      }
      
      // Tecnologias
      const projectTech = `Tecnologias: ${project.technologies.slice(0, 6).join(', ')}`
      this.addText(projectTech, 8, 'normal', [100, 100, 100])
      
      if (index < projects.length - 1) this.currentY += 3
    })

    this.addSectionDivider()

    // FORMAÇÃO
    this.addTitle('Formação Acadêmica', 14)
    this.addText(`${personalInfo.course}`, 11, 'bold')
    this.currentY -= 2
    this.addText(`${personalInfo.university} | ${personalInfo.location}`, 9, 'normal', [100, 100, 100])
    this.addText('Último ano - Previsão de formatura: 2025', 9, 'normal')

    // FOOTER
    this.currentY = this.pageHeight - 20
    this.doc.setFontSize(8)
    this.doc.setTextColor(150, 150, 150)
    this.doc.text('Currículo gerado automaticamente pelo portfólio interativo', this.margin, this.currentY)
    this.doc.text(`Acesse: ${personalInfo.github}`, this.pageWidth - this.margin - 50, this.currentY)
  }

  public async downloadPDF(): Promise<void> {
    try {
      await this.generatePDF()
      this.doc.save(this.config.filename)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      throw new Error('Falha ao gerar o currículo em PDF')
    }
  }
}

// Função utilitária para download rápido
export const downloadResumePDF = async (config?: Partial<PDFConfig>) => {
  const generator = new PDFGenerator(config)
  await generator.downloadPDF()
} 