// =============================================
// Toda la información del sitio vive aquí.
// Edita este archivo para actualizar contenido
// sin tocar los componentes.
// =============================================

export const profile = {
  name: "Carlos Ramírez",
  headline: "Cloud Technical Program Manager",
  subheadline: "AWS Solutions Architect Professional",
  tagline:
    "Bringing cloud architecture — Landing Zones, migrations, and cloud-native modernization — from design into production for banking and fintech.",
  location: "Guatemala",
  email: "carloslrm@gmail.com",
  linkedin: "https://www.linkedin.com/in/carloslrm",
  github: "https://github.com/CarlosLRamirez",
  blogUrl: "/blog/",
  notesUrl: "/notes/",
  resumeUrl: "/resume.pdf", // coloca tu CV en /public/resume.pdf
  photo: null, // ej: "/profile.jpg" en /public — null usa placeholder
};

export const about = `I bridge cloud architecture and delivery for enterprise programs — bringing Landing Zone deployments, large-scale migrations, and cloud-native modernization from design into production for banking and fintech clients.

At Escala24x7, an AWS Premier Tier Partner, I've directed Cloud Foundation builds (Control Tower, SCPs, multi-account networking), a 100+ server lift-and-shift migration, disaster recovery implementations under Pilot Light architecture, and cloud-native application delivery — both event-driven serverless (Lambda, DynamoDB, Step Functions) and containerized (Fargate, ECR) — including modernization of legacy monoliths into microservices, deployed through Terraform-managed IaC and CI/CD pipelines.

I hold the AWS Solutions Architect Professional certification, which shapes how I approach delivery: I evaluate architectural tradeoffs alongside engineering teams and turn them into plans that hold up under real constraints — strict change windows, multi-country stakeholders, hard compliance requirements.

My background started in cellular network engineering at Ericsson before moving through enterprise IT infrastructure and cloud consulting — so I read a system end to end, not just the project plan.`;

export const ctaClosing = {
  heading: "Let's talk cloud architecture and delivery.",
  body: "Open to Technical Program Manager, Cloud Delivery Lead, or Solutions Architect roles with US-based cloud consultancies — remote from Guatemala.",
};

// Categorías de tech stack — agrupa lo que ya usas a diario
export const techStack = [
  { name: "AWS", category: "Cloud Platform" },
  { name: "Terraform", category: "Infrastructure as Code" },
  { name: "Control Tower", category: "Cloud Governance" },
  { name: "Lambda", category: "Serverless" },
  { name: "Step Functions", category: "Serverless Orchestration" },
  { name: "Fargate / ECR", category: "Containers" },
  { name: "DynamoDB", category: "NoSQL" },
  { name: "CI/CD Pipelines", category: "DevOps" },
  { name: "Aurora PostgreSQL", category: "Databases" },
  { name: "AWS DRS / MGN", category: "Migration & DR" },
  { name: "CloudFront / S3", category: "Content Delivery" },
  { name: "Direct Connect / VPN", category: "Networking" },
];

// Timeline de experiencia — resumido, con link a LinkedIn para detalle
export const experience = [
  {
    role: "Technical Program Manager",
    org: "Escala24x7 Inc. (AWS Premier Tier Partner)",
    period: "2022 — Present",
    summary:
      "Leading cloud architecture delivery — Landing Zones, migrations, DR, and cloud-native modernization — for banking and fintech clients on AWS.",
  },
  {
    role: "IT Infrastructure Project Manager",
    org: "Conduent",
    period: "2021 — 2022",
    summary:
      "Managed infrastructure delivery for globally distributed teams, fully remote, English-speaking environment.",
  },
  {
    role: "Network & Security Consultant",
    org: "IGSS (Instituto Guatemalteco de Seguridad Social)",
    period: "2020 — 2021",
    summary:
      "Redesigned national network architecture — OSPF, VLAN segmentation, RADIUS, monitoring, and documentation standards.",
  },
  {
    role: "IT Consultant / Founder",
    org: "SyProTec",
    period: "2017 — 2020",
    summary:
      "Independent consulting in networking, IoT, and security — designed and deployed a solar-powered, cellular-connected surveillance system.",
  },
  {
    role: "Network Engineer → Support Engineer → Implementation Manager",
    org: "Ericsson",
    period: "2008 — 2016",
    summary:
      "8+ years across RAN engineering, implementation coordination, and technical support for 2G/3G mobile networks.",
  },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  category: "production" | "personal";
  status?: string;
  href?: string; // link a repo o detalle
};

// Proyectos de delivery en producción — sin nombres de cliente/país
export const productionProjects: Project[] = [
  {
    slug: "cloud-foundation",
    title: "Cloud Foundation / Landing Zone Rollout",
    description:
      "Directed deployment of a multi-account AWS Landing Zone — Control Tower, SCPs, org structure, and networking — migrating standalone accounts into a governed architecture.",
    tech: ["AWS Control Tower", "SCPs", "Terraform", "VPN"],
    category: "production",
  },
  {
    slug: "large-scale-migration",
    title: "Large-Scale Server Migration",
    description:
      "Led a 100+ server lift-and-shift migration across environments and waves — MGN agent deployment, DataSync replication, cutover, and post-migration troubleshooting.",
    tech: ["AWS MGN", "AWS DataSync", "EC2", "DNS"],
    category: "production",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster Recovery — Pilot Light Architecture",
    description:
      "Structured implementation of a Pilot Light DR architecture — cross-region RDS Oracle replication, Auto Scaling Groups, and Drill test execution.",
    tech: ["AWS DRS", "RDS Oracle", "ASG", "Multi-Region"],
    category: "production",
  },
  {
    slug: "database-modernization",
    title: "Database Modernization at Scale",
    description:
      "Leading migration of 3,700+ databases from EC2 SQL Server to Aurora PostgreSQL/Babelfish, targeting ~40% licensing cost reduction across phased waves.",
    tech: ["Aurora PostgreSQL", "Babelfish", "SQL Server"],
    category: "production",
  },
  {
    slug: "cloud-native-delivery",
    title: "Cloud-Native & Serverless Delivery",
    description:
      "Coordinated delivery of event-driven serverless solutions and containerized applications, integrating with legacy systems.",
    tech: ["Lambda", "Step Functions", "Fargate", "ECR", "DynamoDB"],
    category: "production",
  },
  {
    slug: "app-modernization",
    title: "Legacy Monolith → Microservices Modernization",
    description:
      "Led delivery of monolith-to-microservices modernization, coordinating containerization strategy and deployment via Terraform-managed IaC and CI/CD.",
    tech: ["Docker", "Fargate", "Terraform", "CI/CD"],
    category: "production",
  },
];

// Proyectos personales — diseño propio, evidencia técnica directa.
// Añade aquí conforme los construyas.
export const personalProjects: Project[] = [
  // Ejemplo de estructura a seguir cuando publiques el primero:
  // {
  //   slug: "landing-zone-lab",
  //   title: "Multi-Account Landing Zone (Personal Lab)",
  //   description:
  //     "Self-designed AWS Landing Zone with Control Tower, custom OU structure, and SCPs — fully defined in Terraform. Includes architecture decisions and tradeoffs.",
  //   tech: ["AWS Control Tower", "Terraform", "SCPs"],
  //   category: "personal",
  //   status: "In progress",
  //   href: "https://github.com/CarlosLRamirez/landing-zone-lab",
  // },
];

export const education = [
  {
    degree: "Master's, Project Management",
    school: "Universidad Galileo",
    period: "2014 — 2021",
  },
  {
    degree: "B.Sc. Electronic Engineering",
    school: "Universidad de San Carlos de Guatemala",
    period: "2001 — 2010",
  },
];

export const certifications = [
  { name: "AWS Solutions Architect – Professional", year: "2023" },
  { name: "AWS Solutions Architect – Associate", year: "2022" },
  { name: "AWS Cloud Practitioner", year: "2022" },
  { name: "AWS Certified AI Practitioner", year: "2026" },
  { name: "PMP", year: "2021" },
  { name: "Professional Scrum Master I", year: "2023" },
  { name: "JNCIA – Junos", year: "2021" },
];
