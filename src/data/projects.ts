import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    title: "VeTech",
    category: "FastAPI Mastery",
    description: "Sistema veterinário completo com 160+ rotas FastAPI desenvolvidas sozinho",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Postman", "Supabase"],
    githubUrl: "https://github.com/andrelaudares/VeTech",
    videoUrl: "/videos/vetech-demo.mp4",
    features: [
      "API REST completa em FastAPI",
      "Documentação detalhada de todas as rotas", 
      "Sistema de autenticação e autorização",
      "Integração com banco de dados",
      "Testes automatizados via Postman"
    ],
    isInteractive: true,
    interactiveType: "video"
  },
  {
    id: 2,
    title: "MCP-Gemini",
    category: "ETL Intelligence",
    description: "Model Context Protocol com IA para ETL automatizado",
    technologies: ["Python", "APIs RESTful", "Gemini AI", "ERP", "MCP"],
    githubUrl: "https://github.com/andrelaudares/mcp-gemini",
    features: [
      "Input do usuário → Sistema recebe solicitação",
      "Primeira requisição → Busca ID do objeto no ERP",
      "Múltiplas requisições → Coleta dados relacionados",
      "Processamento IA → Estrutura e analisa dados",
      "Output estruturado → Retorna informações organizadas"
    ],
    isInteractive: true,
    interactiveType: "flowchart"
  },
  {
    id: 3,
    title: "Subscription-Authentication",
    category: "Database & Payment Gateway",
    description: "Template completo para sistemas de assinatura",
    technologies: ["Python", "FastAPI", "Supabase", "Asaas", "JWT"],
    githubUrl: "https://github.com/andrelaudares/subscription-authentication",
    features: [
      "Sistema completo de autenticação",
      "Integração com Supabase (banco de dados)",
      "Gateway de pagamento Asaas",
      "Rotas prontas para CRUD de usuários",
      "Gerenciamento de assinaturas"
    ],
    isInteractive: false
  }
] 