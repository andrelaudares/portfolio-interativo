import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Altivus AI",
    position: "Technical Product Manager",
    startDate: "2024-08",
    endDate: "Atual",
    location: "Remoto",
    description: "Gestão completa da plataforma SaaS da empresa como primeiro funcionário",
    highlights: [
      "Gestão completa da plataforma SaaS da empresa",
      "Desenvolvimento front-end focado em UX intuitiva",
      "Criação de fluxos de login e sistema de permissões",
      "Integração de gateways de pagamento",
      "Manutenção de fluxos de IA usando N8N e Python",
      "Implementação e gerenciamento de bancos de dados (Supabase)",
      "Coordenação de sprints estratégicos"
    ],
    technologies: ["Python", "JavaScript", "React", "N8N", "Supabase", "IA/LLM"],
    isHighlight: true
  },
  {
    id: 2,
    company: "Galena",
    position: "TI - Sistemas",
    startDate: "2024-06",
    endDate: "2024-08",
    location: "Campinas-SP",
    description: "Administração de sistemas ERP e desenvolvimento de soluções de BI",
    highlights: [
      "Administração e customização do ERP Protheus",
      "Configuração e otimização do HubSpot",
      "Desenvolvimento de sistemas de automação",
      "Gestão de sistemas internos de TI",
      "Criação de dashboards em Power BI",
      "Projetos de Business Intelligence"
    ],
    technologies: ["ERP Protheus", "HubSpot", "Power BI", "Automação", "BI"],
    isHighlight: false
  },
  {
    id: 3,
    company: "Tuvis",
    position: "Customer Success",
    startDate: "2023-08",
    endDate: "2024-04",
    location: "Remoto",
    description: "Construção de sistemas de análise de saúde de clientes e manipulação de dados CRM",
    highlights: [
      "Construção de Dashboard Health Score para análise de saúde de clientes",
      "Manipulação avançada de dados dentro do CRM Salesforce",
      "Atendimento direto ao cliente",
      "Comunicação estratégica com clientes",
      "Treinamento de usuários em plataformas",
      "Análise de métricas de sucesso do cliente"
    ],
    technologies: ["Salesforce", "Dashboard", "Análise de Dados", "CRM"],
    isHighlight: false
  }
] 