// =============================================
// English content (default locale, served at /).
// Edit this file to update copy without touching components.
// Keep content.es.ts structurally in sync — both satisfy `Content`.
// =============================================

import type { Content } from "./types";

export const en: Content = {
  lang: "en",

  profile: {
    name: "Carlos Ramírez",
    headline: "Cloud Delivery Lead",
    subheadline: "AWS Solutions Architect Professional",
    tagline:
      "Leading technology infrastructure projects — architecture and delivery alike — turning business needs into solutions that hold up in production.",
    location: "Guatemala",
    email: "carloslrm@gmail.com",
    linkedin: "https://www.linkedin.com/in/carloslrm",
    github: "https://github.com/CarlosLRamirez",
    blogUrl: "/blog/",
    notesUrl: "/notes/",
    resumeUrl: "/resume.pdf", // coloca tu CV en /public/resume.pdf
    photo: null, // ej: "/profile.jpg" en /public — null usa placeholder
  },

  meta: {
    title: "Carlos Ramírez | Cloud Delivery Lead",
    description:
      "Cloud Delivery Lead leading technology infrastructure projects — architecture and delivery alike — turning business needs into solutions that hold up in production. AWS Solutions Architect Professional, PMP.",
  },

  nav: {
    portfolio: "Portfolio",
    about: "About",
    delivery: "Delivery",
    experience: "Experience",
    education: "Education",
    blog: "Blog",
    notes: "Notes",
    contact: "Contact",
  },

  hero: {
    viewPortfolio: "View Portfolio",
    downloadResume: "Download Resume",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
  },

  aboutEyebrow: "§ 01 — About",
  about: `I lead technology infrastructure projects that span both the management and the technical execution — planning delivery, coordinating stakeholders, and directing architecture decisions through to production.

My focus is designing and implementing technology solutions that solve concrete business needs: modernizing legacy systems, executing large-scale migrations, and building resilient, secure infrastructure that scales with the organization.

I hold AWS Solutions Architect Professional and PMP certifications, with a background that runs from network engineering through enterprise IT to cloud architecture — the range that lets me own a project from business case to deployed system.`,

  techStackEyebrow: "§ 02 — Stack",
  techStack: [
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
  ],

  experienceEyebrow: "§ 04 — Experience",
  experienceLinkedinCta: "Full history on LinkedIn →",
  experience: [
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
  ],

  projects: {
    eyebrow: "§ 03 — Delivery & Portfolio",
    production: {
      heading: "Project Management Experience",
      subheading: "Project delivery experience in real enterprise environments.",
    },
    personal: {
      heading: "Technical Portfolio",
      subheading:
        "Self-designed architecture — full ownership of design decisions, tradeoffs, and implementation.",
      emptyState: "— New personal projects in progress. Coming soon.",
    },
    viewProjectLabel: "View project →",
  },
  productionProjects: [
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
  ],
  personalProjects: [
    {
      slug: "aws-multi-account-landing-zone",
      title: "Multi-Account Landing Zone (Personal Lab)",
      description:
        "Self-designed AWS Landing Zone with Control Tower, custom OU structure, and SCPs — fully defined in Terraform. Includes architecture decisions and tradeoffs.",
      tech: ["AWS Control Tower", "Terraform", "SCPs"],
      category: "personal",
      href: "https://github.com/CarlosLRamirez/aws-multi-account-landing-zone",
    },
  ],

  educationEyebrow: "§ 05 — Education",
  educationDegreesHeading: "Degrees",
  educationCertsHeading: "Certifications",
  education: [
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
    heading: "Let's talk cloud architecture and delivery.",
    body: "Open to Technical Program Manager, Cloud Delivery Lead, or Solutions Architect roles with US-based cloud consultancies — remote from Guatemala.",
  },
  ctaFooter: {
    emailMe: "Email Me",
    connectLinkedin: "Connect on LinkedIn",
  },

  archDiagram: {
    ariaLabel:
      "Diagram showing Carlos at the center, connected to Cloud Foundation, Migration, Modernization, and Delivery domains",
    centerName: "Carlos",
    centerRole: "AWS SA-P / PMP",
    nodes: {
      cloudFoundation: "Cloud Foundation",
      migration: "Migration",
      modernization: "Modernization",
      drResilience: "DR & Resilience",
      serverless: "Serverless",
      deliveryMgmt: "Delivery Mgmt",
    },
  },
};
