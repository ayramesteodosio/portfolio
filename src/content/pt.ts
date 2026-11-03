import type { Dictionary } from "./types";

export const pt: Dictionary = {
  htmlLang: "pt-BR",
  meta: {
    title: "Ayrames Teodósio · Desenvolvedor Full Stack",
    description:
      "Ayrames Teodósio, desenvolvedor full stack em Maceió, Alagoas. Do pixel ao banco de dados.",
  },
  skipLink: "Pular para o conteúdo",
  brandLabel: "Ayrames Teodósio, início",
  navLabel: "Seções",
  languageLabel: "Idioma",
  team: { label: "Cor de destaque", ver: "Azul, amarelo e vermelho", lec: "Rosso corsa" },
  sections: {
    top: { id: "inicio", title: "Início" },
    about: { id: "sobre", title: "Sobre" },
    experience: { id: "experiencia", title: "Experiência" },
    projects: { id: "projetos", title: "Projetos" },
    stack: { id: "stack", title: "Stack" },
    contact: { id: "contato", title: "Contato" },
  },
  hero: {
    status: "Aberto a projetos e oportunidades",
    location: "Maceió, Alagoas",
    role: "Desenvolvedor Full Stack",
    tagline: "Do pixel ao banco de dados.",
    ctaProjects: "Ver projetos",
    ctaContact: "Falar comigo",
    portraitAlt:
      "Retrato de Ayrames Teodósio, de camisa preta e crachá, em um evento de tecnologia",
  },
  about: {
    lead: "Sou desenvolvedor full stack e passei 1 ano e 7 meses na Inovaxio, construindo produtos de crédito, pagamentos e entregas para clientes. Me formei em Sistemas para Internet pela UNCISAL. Trabalho da interface que a pessoa usa até a API e o banco de dados por trás dela, e a cada dia vou mais fundo no back-end.",
    facts: [
      { term: "Agora", value: "Disponível para começar já" },
      { term: "Formação", value: "Sistemas para Internet, UNCISAL" },
      { term: "Rumo", value: "Mais fundo no back-end" },
    ],
    offTrackLabel: "Fora do código:",
    offTrack:
      "domingo de corrida, torcendo pelo Max e pelo Charles, e uma fila de jogos que nunca acaba.",
  },
  experience: {
    company: "Inovaxio",
    role: "Desenvolvedor Full Stack Júnior",
    period: "04/2025 a 11/2026",
    lead: "Empresa de software sob medida para clientes. Comecei no front-end, fui o principal desenvolvedor dos painéis de dois produtos e, em 2026, passei a trabalhar também no back-end em Rails, nas plataformas de pagamento e de renegociação de dívidas.",
    facts: [
      { term: "Produtos", value: "10" },
      { term: "Commits", value: "1.100+" },
      { term: "Arquivos de teste", value: "650+" },
      { term: "Tempo", value: "1 ano e 7 meses" },
    ],
    items: {
      credito: {
        name: "Plataforma de crédito",
        text: "Principal desenvolvedor do painel administrativo, com 86% dos commits: dashboard, pré-análise de clientes, empréstimos e trilha de auditoria.",
        period: "11/2025 a 04/2026",
      },
      entregas: {
        name: "Gestão de entregas",
        text: "Principal desenvolvedor do portal das empresas, com 77% dos commits: login por OTP, assinatura digital, gravação de áudio e notificações push.",
        period: "06/2025 a 11/2025",
      },
      pagamentos: {
        name: "Plataformas de pagamento",
        text: "Três produtos. No front-end, conta digital com cobranças, assinaturas, links de pagamento, splits e devolução de Pix. No back-end em Rails, filtros e relatórios de cobranças, assinaturas e recebíveis, cartões pré-pagos e aprovação antifraude.",
        period: "04/2026 a 11/2026",
      },
      renegociacao: {
        name: "Renegociação de dívidas",
        text: "Endpoints e regras de acordos, refinanciamento e aprovação em massa em Rails, com testes em RSpec, e o painel em React com login em dois fatores.",
        period: "04/2025 a 09/2026",
      },
      crm: {
        name: "CRM interno",
        text: "Em um monorepo TypeScript, o módulo de e-mails com SendGrid e partes do motor de orçamentos e da captação de leads via n8n.",
        period: "06/2026 a 08/2026",
      },
      site: {
        name: "Site institucional e landing pages",
        text: "O site da própria Inovaxio, em duas versões, e landing pages, com formulário protegido contra spam (honeypot e limite por IP), integração contínua e deploy.",
        period: "07/2025 a 10/2026",
      },
      transmissoes: {
        name: "Transmissões ao vivo",
        text: "Página de transmissões ao vivo no app web, com banners e espaços de anúncio.",
        period: "06/2025 a 08/2025",
      },
    },
    practicesLabel: "No dia a dia:",
    practices: "testes junto com cada entrega, revisão de código e integração contínua antes do deploy.",
  },
  projects: {
    legend: { public: "Público", running: "Rodando ou em testes", design: "Em design" },
    columns: { pos: "Pos", project: "Projeto", stack: "Stack", status: "Status" },
    items: {
      prumo: {
        name: "Prumo",
        summary:
          "SaaS de estoque, vendas e entregas para lojas de colchões, com filiais, PDV e app do entregador.",
        status: "Em design",
        statusDetail: "protótipo, 32 telas",
        statusShort: "Em design, 32 telas",
        lead: {
          strong: "Protótipo navegável",
          rest: " com os mesmos dados de exemplo em todas as telas: estoque por filial, PDV, conciliação, roteirização e o app do entregador.",
        },
        note: "Próximo passo: levar o design para Next.js com a API em Rails.",
        detailsLabel: "Detalhes do Prumo",
        mediaLabel:
          "Tela de saídas do Prumo no tema escuro, com transferências entre lojas, vendas e brindes em uma tabela",
      },
      "mouse-bridge": {
        name: "Mouse Bridge",
        summary:
          "Um teclado e um mouse para dois computadores, Windows e Linux, pela rede com TLS.",
        status: "Em testes",
        statusDetail: "Windows e Linux",
        statusShort: "Em testes",
        lead: {
          strong: "Pareamento com TLS 1.3",
          rest: " e conferência da impressão digital do certificado nos dois lados.",
        },
        note: "O controle passa pela borda da tela, e um atalho de emergência devolve tudo ao computador local.",
        detailsLabel: "Detalhes do Mouse Bridge",
        mediaLabel:
          "Painel do Mouse Bridge mostrando este computador, os computadores conectados com latência e o atalho de emergência",
      },
      dualsense: {
        name: "Painel do DualSense",
        summary:
          "Controla luz, gatilhos adaptativos e modo carregar do controle do PS5 no Linux, Windows e macOS.",
        status: "Público no GitHub",
        statusDetail: "v0.2.1",
        statusShort: "Público, v0.2.1",
        lead: {
          strong: "Modo carregar:",
          rest: " no cabo USB, o controle some para a Steam e para os jogos enquanto a barra pulsa em laranja até encher.",
        },
        note: "Interface em GTK 4 no Linux e em Qt no Windows e no macOS, com as mesmas funções.",
        detailsLabel: "Detalhes do Painel do DualSense",
        mediaLabel:
          "Aba Controle do Painel do DualSense com a bateria em 55 por cento e o botão para entrar no modo carregar",
        repoLabel: "Ver no GitHub",
      },
      "bot-passagens": {
        name: "Bot de passagens",
        summary:
          "Bot de Telegram que vigia preços de voos saindo de Maceió e avisa quando aparece promoção.",
        status: "Rodando no PC",
        statusDetail: "como serviço",
        statusShort: "Rodando no PC",
        lead: {
          strong: "Vigia Santiago em dezembro de 2026",
          rest: ", de 5 a 10 noites, e avisa quando a ida e volta fica abaixo de R$ 1.800.",
        },
        note: "Aviasales para escolher as datas, Google Flights para confirmar o preço.",
        detailsLabel: "Detalhes do bot de passagens",
        mediaLabel: "Exemplo de comando do bot",
      },
    },
  },
  stack: { daily: "Dia a dia", also: "Também" },
  contact: {
    lead: "Para projetos, vagas ou uma boa conversa sobre código, o caminho mais curto é o e-mail.",
    copy: "Copiar",
    copied: "Copiado",
    toast: "E-mail copiado",
    copyFailed: "Não deu para copiar. Selecione o e-mail acima.",
  },
  footer: { backToTop: "Voltar ao topo" },
};
