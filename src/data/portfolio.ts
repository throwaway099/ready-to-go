/**
 * Portfolio content — single source of truth.
 * Replace the placeholder values below with your real details.
 */

export const profile = {
  name: "Your Name",
  tagline: "AI Engineer | Full Stack Developer | ML Enthusiast",
  email: "you@example.com",
  phone: "+91 00000 00000",
  location: "City, India",
  quote: "The best way to predict the future is to build it.",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://x.com/",
    instagram: "",
    youtube: "",
    medium: "",
    devto: "",
  },
};

export const heroTitles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];

export const about = {
  quote: profile.quote,
  bio: [
    "I'm an engineer who loves building intelligent systems — from training machine-learning models to shipping polished full-stack products.",
    "I care about the details: clean architecture, smooth interactions, and software that feels alive. When I'm not coding, I'm exploring new research, contributing to open source, or sketching ideas for the next thing to build.",
  ],
  stats: [
    { label: "Projects Built", value: 20, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Hackathons", value: 8, suffix: "+" },
    { label: "Coffee Consumed", value: 999, suffix: "+" },
  ],
  achievements: [
    "Winner — National Level Hackathon 2025",
    "Published ML research paper at a student conference",
    "Top 5% in competitive programming contests",
    "Open-source contributor to AI tooling projects",
  ],
  education: {
    college: "Your College Name",
    degree: "B.Tech — Computer Science & Engineering",
    year: "2022 — 2026",
    cgpa: "8.5 / 10",
  },
};

export type Skill = {
  name: string;
  description: string;
  experience: string;
  projects: string;
  stack: string[];
  size: number; // planet diameter in px
  hue: number; // oklch hue
  orbitRadius: number; // px from center of skill system
  orbitDuration: number; // seconds per revolution
};

export const skills: Skill[] = [
  {
    name: "Python",
    description: "Primary language for AI/ML, scripting and backend services.",
    experience: "4+ years",
    projects: "15+ projects",
    stack: ["FastAPI", "Pandas", "NumPy"],
    size: 96,
    hue: 230,
    orbitRadius: 150,
    orbitDuration: 24,
  },
  {
    name: "TypeScript",
    description: "Type-safe full-stack development across web platforms.",
    experience: "3+ years",
    projects: "12+ projects",
    stack: ["React", "Node.js", "Next.js"],
    size: 88,
    hue: 210,
    orbitRadius: 230,
    orbitDuration: 36,
  },
  {
    name: "Machine Learning",
    description: "Model training, fine-tuning and deployment of ML systems.",
    experience: "3+ years",
    projects: "10+ projects",
    stack: ["PyTorch", "TensorFlow", "scikit-learn"],
    size: 104,
    hue: 300,
    orbitRadius: 310,
    orbitDuration: 48,
  },
  {
    name: "React",
    description: "Building rich, interactive user interfaces and design systems.",
    experience: "3+ years",
    projects: "14+ projects",
    stack: ["Vite", "Tailwind", "Framer Motion"],
    size: 84,
    hue: 190,
    orbitRadius: 190,
    orbitDuration: 30,
  },
  {
    name: "Databases",
    description: "Designing schemas and queries for relational & vector stores.",
    experience: "3+ years",
    projects: "10+ projects",
    stack: ["PostgreSQL", "MongoDB", "Redis"],
    size: 72,
    hue: 160,
    orbitRadius: 270,
    orbitDuration: 42,
  },
  {
    name: "DevOps",
    description: "Shipping and operating services with modern cloud tooling.",
    experience: "2+ years",
    projects: "8+ projects",
    stack: ["Docker", "AWS", "CI/CD"],
    size: 64,
    hue: 30,
    orbitRadius: 350,
    orbitDuration: 56,
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "NeuralForge",
    description:
      "An end-to-end platform for training, evaluating and deploying custom LLM pipelines with a visual workflow builder and real-time metrics.",
    tech: ["Python", "PyTorch", "React", "FastAPI", "PostgreSQL"],
    github: "https://github.com/",
    demo: "#",
    featured: true,
  },
  {
    name: "OrbitCommerce",
    description:
      "A full-stack e-commerce experience with AI-powered recommendations, real-time inventory and a headless architecture.",
    tech: ["TypeScript", "Next.js", "Stripe", "Redis"],
    github: "https://github.com/",
    demo: "#",
  },
  {
    name: "VisionDesk",
    description:
      "Real-time computer-vision dashboard for object detection and analytics streaming from edge devices to the cloud.",
    tech: ["Python", "OpenCV", "WebSockets", "Docker"],
    github: "https://github.com/",
    demo: "#",
  },
];

export const experience = [
  {
    company: "Tech Company",
    role: "AI Engineering Intern",
    duration: "Jun 2025 — Present",
    description:
      "Building and deploying ML pipelines for production workloads; improved inference latency by 40% through optimization and caching.",
  },
  {
    company: "Startup Labs",
    role: "Full Stack Developer Intern",
    duration: "Jan 2025 — May 2025",
    description:
      "Shipped customer-facing features across the stack, from React interfaces to API design and database modeling.",
  },
  {
    company: "Open Source",
    role: "Contributor",
    duration: "2024 — Present",
    description:
      "Regular contributor to AI tooling and developer-experience projects; multiple merged PRs across popular repositories.",
  },
];

export const certifications = [
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2025",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2025",
  },
  {
    name: "Full Stack Web Development",
    issuer: "Meta / Coursera",
    year: "2024",
  },
  {
    name: "Machine Learning",
    issuer: "Stanford Online",
    year: "2024",
  },
];

export const navSections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
