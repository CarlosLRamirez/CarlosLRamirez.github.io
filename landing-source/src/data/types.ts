export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  category: "production" | "personal";
  status?: string;
  href?: string; // link a repo o detalle
};

export type Content = {
  lang: "en" | "es";

  profile: {
    name: string;
    headline: string;
    subheadline: string;
    tagline: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    blogUrl: string;
    notesUrl: string;
    resumeUrl: string;
    photo: string | null;
  };

  meta: {
    title: string;
    description: string;
  };

  nav: {
    portfolio: string;
    about: string;
    delivery: string;
    experience: string;
    education: string;
    blog: string;
    notes: string;
    contact: string;
  };

  hero: {
    viewPortfolio: string;
    downloadResume: string;
    githubLabel: string;
    linkedinLabel: string;
  };

  aboutEyebrow: string;
  about: string;

  techStackEyebrow: string;
  techStack: { name: string; category: string }[];

  experienceEyebrow: string;
  experienceLinkedinCta: string;
  experience: {
    role: string;
    org: string;
    period: string;
    summary: string;
  }[];

  projects: {
    eyebrow: string;
    production: { heading: string; subheading: string };
    personal: { heading: string; subheading: string; emptyState: string };
    viewProjectLabel: string;
  };
  productionProjects: Project[];
  personalProjects: Project[];

  educationEyebrow: string;
  educationDegreesHeading: string;
  educationCertsHeading: string;
  education: { degree: string; school: string; period: string }[];
  certifications: { name: string; year: string }[];

  ctaClosing: { heading: string; body: string };
  ctaFooter: { emailMe: string; connectLinkedin: string };

  archDiagram: {
    ariaLabel: string;
    centerName: string;
    centerRole: string;
    nodes: {
      cloudFoundation: string;
      migration: string;
      modernization: string;
      drResilience: string;
      serverless: string;
      deliveryMgmt: string;
    };
  };
};
