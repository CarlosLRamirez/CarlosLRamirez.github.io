// =============================================
// Contenido en español (locale /es/).
// Debe mantenerse estructuralmente sincronizado con content.en.ts
// — ambos cumplen el tipo `Content`.
// =============================================

import type { Content } from "./types";

export const es: Content = {
  lang: "es",

  profile: {
    name: "Carlos Ramírez",
    headline: "Líder de Entrega Cloud",
    subheadline: "AWS Solutions Architect Professional",
    tagline:
      "Liderando proyectos de infraestructura tecnológica — tanto en arquitectura como en entrega — convirtiendo necesidades del negocio en soluciones que funcionan en producción.",
    location: "Guatemala",
    email: "carloslrm@gmail.com",
    linkedin: "https://www.linkedin.com/in/carloslrm",
    github: "https://github.com/CarlosLRamirez",
    blogUrl: "/blog/",
    notesUrl: "/notes/",
    resumeUrl: "/resume.pdf",
    photo: null,
  },

  meta: {
    title: "Carlos Ramírez | Líder de Entrega Cloud",
    description:
      "Líder de Entrega Cloud liderando proyectos de infraestructura tecnológica — arquitectura y entrega por igual — convirtiendo necesidades del negocio en soluciones que funcionan en producción. AWS Solutions Architect Professional, PMP.",
  },

  nav: {
    portfolio: "Portafolio",
    about: "Acerca",
    delivery: "Entrega",
    experience: "Experiencia",
    education: "Educación",
    blog: "Blog",
    notes: "Notas",
    contact: "Contacto",
  },

  hero: {
    viewPortfolio: "Ver Portafolio",
    downloadResume: "Descargar CV",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },

  aboutEyebrow: "§ 01 — Sobre mí",
  about: `Lidero proyectos de infraestructura tecnológica que abarcan tanto la gestión como la ejecución técnica — planificando la entrega, coordinando stakeholders y dirigiendo las decisiones de arquitectura hasta llegar a producción.

Mi enfoque es diseñar e implementar soluciones tecnológicas que resuelven necesidades concretas del negocio: modernizar sistemas legados, ejecutar migraciones a gran escala y construir infraestructura resiliente y segura que escala con la organización.

Tengo las certificaciones AWS Solutions Architect Professional y PMP, con una trayectoria que va desde ingeniería de redes hasta infraestructura empresarial y arquitectura en la nube — el rango que me permite ser dueño de un proyecto desde el caso de negocio hasta el sistema desplegado.`,

  techStackEyebrow: "§ 02 — Stack",
  techStack: [
    { name: "AWS", category: "Plataforma Cloud" },
    { name: "Terraform", category: "Infraestructura como Código" },
    { name: "Control Tower", category: "Gobernanza Cloud" },
    { name: "Lambda", category: "Serverless" },
    { name: "Step Functions", category: "Orquestación Serverless" },
    { name: "Fargate / ECR", category: "Contenedores" },
    { name: "DynamoDB", category: "NoSQL" },
    { name: "CI/CD Pipelines", category: "DevOps" },
    { name: "Aurora PostgreSQL", category: "Bases de Datos" },
    { name: "AWS DRS / MGN", category: "Migración y DR" },
    { name: "CloudFront / S3", category: "Entrega de Contenido" },
    { name: "Direct Connect / VPN", category: "Redes" },
  ],

  experienceEyebrow: "§ 04 — Experiencia",
  experienceLinkedinCta: "Historial completo en LinkedIn →",
  experience: [
    {
      role: "Technical Program Manager",
      org: "Escala24x7 Inc. (AWS Premier Tier Partner)",
      period: "2022 — Presente",
      summary:
        "Liderando la entrega de arquitectura en la nube — Landing Zones, migraciones, DR y modernización cloud-native — para clientes de banca y fintech en AWS.",
    },
    {
      role: "IT Infrastructure Project Manager",
      org: "Conduent",
      period: "2021 — 2022",
      summary:
        "Gestioné la entrega de infraestructura para equipos distribuidos globalmente, en un entorno 100% remoto y de habla inglesa.",
    },
    {
      role: "Network & Security Consultant",
      org: "IGSS (Instituto Guatemalteco de Seguridad Social)",
      period: "2020 — 2021",
      summary:
        "Rediseñé la arquitectura de red nacional — OSPF, segmentación VLAN, RADIUS, monitoreo y estándares de documentación.",
    },
    {
      role: "IT Consultant / Founder",
      org: "SyProTec",
      period: "2017 — 2020",
      summary:
        "Consultoría independiente en redes, IoT y seguridad — diseñé e implementé un sistema de vigilancia solar con conectividad celular.",
    },
    {
      role: "Network Engineer → Support Engineer → Implementation Manager",
      org: "Ericsson",
      period: "2008 — 2016",
      summary:
        "Más de 8 años en ingeniería RAN, coordinación de implementación y soporte técnico para redes móviles 2G/3G.",
    },
  ],

  projects: {
    eyebrow: "§ 03 — Entrega y Portafolio",
    production: {
      heading: "Experiencia en Gestión de Proyectos",
      subheading: "Experiencia de entrega de proyectos en entornos empresariales reales.",
    },
    personal: {
      heading: "Portafolio Técnico",
      subheading:
        "Arquitectura de diseño propio — control total de decisiones de diseño, tradeoffs e implementación.",
      emptyState: "— Nuevos proyectos personales en progreso. Próximamente.",
    },
    viewProjectLabel: "Ver proyecto →",
  },
  productionProjects: [
    {
      slug: "cloud-foundation",
      title: "Despliegue de Cloud Foundation / Landing Zone",
      description:
        "Dirigí el despliegue de un AWS Landing Zone multi-cuenta — Control Tower, SCPs, estructura organizacional y networking — migrando cuentas independientes hacia una arquitectura gobernada.",
      tech: ["AWS Control Tower", "SCPs", "Terraform", "VPN"],
      category: "production",
    },
    {
      slug: "large-scale-migration",
      title: "Migración de Servidores a Gran Escala",
      description:
        "Lideré una migración lift-and-shift de más de 100 servidores entre ambientes y oleadas — despliegue de agentes MGN, replicación con DataSync, cutover y troubleshooting post-migración.",
      tech: ["AWS MGN", "AWS DataSync", "EC2", "DNS"],
      category: "production",
    },
    {
      slug: "disaster-recovery",
      title: "Recuperación de Desastres — Arquitectura Pilot Light",
      description:
        "Estructuré la implementación de una arquitectura DR Pilot Light — replicación cross-region de RDS Oracle, Auto Scaling Groups y ejecución de pruebas de Drill.",
      tech: ["AWS DRS", "RDS Oracle", "ASG", "Multi-Region"],
      category: "production",
    },
    {
      slug: "database-modernization",
      title: "Modernización de Bases de Datos a Escala",
      description:
        "Liderando la migración de más de 3,700 bases de datos de EC2 SQL Server a Aurora PostgreSQL/Babelfish, con una meta de ~40% de reducción en costos de licenciamiento en oleadas escalonadas.",
      tech: ["Aurora PostgreSQL", "Babelfish", "SQL Server"],
      category: "production",
    },
    {
      slug: "cloud-native-delivery",
      title: "Entrega Cloud-Native y Serverless",
      description:
        "Coordiné la entrega de soluciones serverless orientadas a eventos y aplicaciones en contenedores, integrando con sistemas legados.",
      tech: ["Lambda", "Step Functions", "Fargate", "ECR", "DynamoDB"],
      category: "production",
    },
    {
      slug: "app-modernization",
      title: "Modernización de Monolito Legado a Microservicios",
      description:
        "Lideré la entrega de la modernización de monolito a microservicios, coordinando la estrategia de containerización y el despliegue vía IaC con Terraform y CI/CD.",
      tech: ["Docker", "Fargate", "Terraform", "CI/CD"],
      category: "production",
    },
  ],
  personalProjects: [
    {
      slug: "aws-multi-account-landing-zone",
      title: "Landing Zone Multi-Cuenta (Laboratorio Personal)",
      description:
        "AWS Landing Zone de diseño propio con Control Tower, estructura de OUs personalizada y SCPs — completamente definida en Terraform. Incluye decisiones de arquitectura y tradeoffs.",
      tech: ["AWS Control Tower", "Terraform", "SCPs"],
      category: "personal",
      status: "En progreso",
      href: "https://github.com/CarlosLRamirez/aws-multi-account-landing-zone",
    },
  ],

  educationEyebrow: "§ 05 — Educación",
  educationDegreesHeading: "Títulos",
  educationCertsHeading: "Certificaciones",
  education: [
    {
      degree: "Maestría en Gestión de Proyectos",
      school: "Universidad Galileo",
      period: "2014 — 2021",
    },
    {
      degree: "Ing. Electrónico",
      school: "Universidad de San Carlos de Guatemala",
      period: "2001 — 2010",
    },
  ],
  certifications: [
    { name: "AWS Solutions Architect – Professional", year: "2023" },
    { name: "AWS Solutions Architect – Associate", year: "2022" },
    { name: "AWS Cloud Practitioner", year: "2022" },
    { name: "AWS Certified AI Practitioner", year: "2026" },
    { name: "PMP", year: "2021" },
    { name: "Professional Scrum Master I", year: "2023" },
    { name: "JNCIA – Junos", year: "2021" },
  ],

  ctaClosing: {
    heading: "Hablemos de arquitectura y entrega en la nube.",
    body: "Abierto a roles de Technical Program Manager, Cloud Delivery Lead o Solutions Architect con consultoras cloud de EE. UU. — remoto desde Guatemala.",
  },
  ctaFooter: {
    emailMe: "Envíame un Email",
    connectLinkedin: "Conectar en LinkedIn",
  },

  archDiagram: {
    ariaLabel:
      "Diagrama que muestra a Carlos en el centro, conectado a los dominios de Cloud Foundation, Migración, Modernización y Entrega",
    centerName: "Carlos",
    centerRole: "AWS SA-P / PMP",
    nodes: {
      cloudFoundation: "Cloud Foundation",
      migration: "Migración",
      modernization: "Modernización",
      drResilience: "DR y Resiliencia",
      serverless: "Serverless",
      deliveryMgmt: "Gestión de Entrega",
    },
  },
};
