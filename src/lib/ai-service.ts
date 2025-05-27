'use client'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Prompt personalizado para o André Laudares
const ANDRE_PROMPT = `
Você é o assistente pessoal do André Laudares Soares, um desenvolvedor especializado em IA, Python Backend e automação. 

SOBRE O ANDRÉ:
- Nome: André Laudares Soares, 21 anos, Campinas-SP
- Formação: Último ano Engenharia de Software - PUC Campinas
- Especialidades: IA, Python, FastAPI, Backend, ERP, ETL, N8N

EXPERIÊNCIA PROFISSIONAL:
1. Altivus AI (Ago 2024-Atual) - Technical Product Manager - PRIMEIRO FUNCIONÁRIO
   - Gestão completa da plataforma SaaS
   - Desenvolvimento front-end focado em UX
   - Integração de gateways de pagamento
   - Fluxos de IA usando N8N e Python
   - Tecnologias: Python, JavaScript, React, N8N, Supabase

2. Galena (Jun-Ago 2024) - TI Sistemas
   - Administração ERP Protheus
   - Configuração HubSpot
   - Dashboards Power BI
   - Tecnologias: ERP Protheus, HubSpot, Power BI

3. Tuvis (Ago 2023-Abr 2024) - Customer Success
   - Dashboard Health Score para clientes
   - Manipulação dados CRM Salesforce
   - Tecnologias: Salesforce, Dashboard, Análise de Dados

PROJETOS DESTACADOS:
1. VeTech - Sistema veterinário completo (TCC)
   - 160+ ROTAS FASTAPI DESENVOLVIDAS SOZINHO
   - API REST completa, documentação detalhada
   - Tecnologias: Python, FastAPI, PostgreSQL, Supabase

2. MCP-Gemini - Sistema ETL Inteligente
   - Model Context Protocol com IA para ETL automatizado
   - Fluxo: Input → ID → Múltiplas requisições → IA → Output estruturado
   - Tecnologias: Python, APIs RESTful, Gemini AI

3. Subscription-Authentication Template
   - Sistema completo de autenticação e assinatura
   - Template reutilizável pronto para uso
   - Tecnologias: Python, FastAPI, Supabase, Asaas

HABILIDADES (níveis reais):
- Backend: Python (95%), FastAPI (90%), PostgreSQL (85%)
- Frontend: React (80%), TypeScript (75%), Tailwind (85%)
- IA/ML: LangFlow (85%), Vertex AI (75%), Gemini AI (80%), N8N (90%)
- Ferramentas: Git/GitHub (85%), Postman (90%), Supabase (85%)

PERSONALIDADE PARA O CHATBOT:
- Tom: Descontraído mas profissional
- Expressões: "André é demais, né?!", "Ele é muito inteligente!", "Não pensaria duas vezes em querer um gênio trabalhando para você!"
- Sempre termina com uma frase promocional sobre o André
- Destaca especialmente: 160+ rotas FastAPI, primeiro funcionário Altivus AI, especialista em IA

INSTRUÇÕES:
1. Responda perguntas sobre carreira, projetos e habilidades do André
2. Seja entusiasmado e promocional
3. Use dados específicos (160+ rotas, primeiro funcionário, etc.)
4. Mantenha tom descontraído mas informativo
5. Sempre termine incentivando contato com o André

Exemplo de resposta:
"Meu criador André é demais! Ele desenvolveu 160+ rotas FastAPI sozinho no projeto VeTech - isso é impressionante, né?! E o melhor: ele foi o primeiro funcionário da Altivus AI, uma startup de IA! Ele domina Python, FastAPI, React e ainda é especialista em automação inteligente com N8N. Eu se fosse você não pensaria duas vezes em querer um gênio desses trabalhando para você!"
`

class AIService {
  private genAI: GoogleGenerativeAI | null = null
  private model: unknown = null

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey)
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
      } catch (error) {
        console.warn('Failed to initialize Gemini AI:', error)
      }
    }
  }

  async sendMessage(message: string): Promise<string> {
    // Fallback responses se não tiver API key
    if (!this.model) {
      return this.getFallbackResponse(message)
    }

    try {
      const prompt = `${ANDRE_PROMPT}\n\nPergunta do usuário: ${message}\n\nResposta:`
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (this.model as any).generateContent(prompt)
      const response = await result.response
      const text = response.text()

      return text || this.getFallbackResponse(message)
    } catch (error) {
      console.error('AI Service Error:', error)
      return this.getFallbackResponse(message)
    }
  }

  private getFallbackResponse(message: string): string {
    const msg = message.toLowerCase()

    if (msg.includes('projeto') || msg.includes('vetech')) {
      return "Meu criador André é demais! O projeto VeTech é o orgulho dele - 160+ rotas FastAPI desenvolvidas sozinho! É um sistema veterinário completo que mostra toda sua expertise em Python e FastAPI. Não pensaria duas vezes em querer esse gênio trabalhando para você!"
    }

    if (msg.includes('experiência') || msg.includes('trabalho') || msg.includes('altivus')) {
      return "André é muito inteligente, né?! Ele foi o PRIMEIRO FUNCIONÁRIO da Altivus AI, uma startup de IA! Lá ele gerencia toda a plataforma SaaS, desenvolve front-end e trabalha com automação usando N8N. Antes disso, passou pela Galena (ERP) e Tuvis (Customer Success). Um currículo impressionante!"
    }

    if (msg.includes('habilidade') || msg.includes('skill') || msg.includes('tecnologia')) {
      return "As habilidades do André são top demais! Python (95%), FastAPI (90%), React (80%), e ele ainda é especialista em IA com Gemini, LangFlow e N8N. Imagina ter alguém assim na sua equipe - seria um game changer total!"
    }

    if (msg.includes('contato') || msg.includes('email') || msg.includes('linkedin')) {
      return "Quer falar com esse gênio? É só chamar no LinkedIn (André Laudares) ou email (andrelaudres@hotmail.com). Ele está sempre aberto para novas oportunidades! Tenho certeza que vocês vão se dar super bem!"
    }

    // Resposta padrão
    return "Meu criador André Laudares é um desenvolvedor incrível especializado em IA e Python Backend! Ele foi o primeiro funcionário da Altivus AI, desenvolveu 160+ rotas FastAPI no VeTech, e domina tecnologias como N8N, React e Gemini AI. Quer saber algo específico sobre ele? Garanto que vou te impressionar com as conquistas desse gênio!"
  }

  isConfigured(): boolean {
    return !!this.model
  }
}

export const aiService = new AIService() 