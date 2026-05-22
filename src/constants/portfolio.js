export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const keywords = [
  "Autonomous Agents",
  "Large Language Models",
  "Semantic Search",
  "MLOps Pipelines",
  "Neural Networks",
  "Intelligent Systems"
];

export const skillsData = [
  {
    category: "Machine Learning & AI",
    skills: [
      "Machine Learning", 
      "Neural Networks", 
      "Deep Learning", 
      "NLP", 
      "TensorFlow", 
      "PyTorch", 
      "Scikit-learn", 
      "Transfer Learning (VGG16, ResNet)", 
      "LLMs", 
      "Vector Databases (FAISS)", 
      "Hugging Face APIs"
    ]
  },
  {
    category: "Programming Languages",
    skills: ["Python", "C", "C++", "Java", "SQL", "JavaScript"]
  },
  {
    category: "Web & Deployment",
    skills: ["Django", "React", "HTML/CSS", "Flask", "FastAPI", "Model Deployment"]
  },
  {
    category: "Tools, DBs & Core Concepts",
    skills: [
      "Docker", 
      "Git/GitHub", 
      "MySQL", 
      "Pytest", 
      "VS Code", 
      "Jupyter/Colab", 
      "Data Structures & Algorithms"
    ]
  }
];

export const portfolioProjects = [
  {
    title: "Autonomous Research Agent",
    subtitle: "(LangChain + FastAPI) | Jan 2026 – Feb 2026",
    description: "Architected a containerized AI research agent implementing the ReAct reasoning framework. Enables multistep problem solving through dynamic tool invocation across calculator, web search, SQL queries, and Python execution. Features a session-aware conversational memory system using Redis.",
    tech: ["Python", "FastAPI", "LangChain", "OpenAI API", "Redis", "Docker", "Pytest"],
    github: "#",
    live: "#",
  },
  {
    title: "Scalable Semantic Search API",
    subtitle: "(FAISS + FastAPI) | May 2025 - June 2025",
    description: "Engineered a containerized semantic search API with FAISS vector indexing, delivering top-K results in <200 ms across 1K+ documents. Reduced manual keyword search effort by ≥80% using transformer-based embeddings for context-aware retrieval.",
    tech: ["Python", "FastAPI", "FAISS", "SentenceTransformers", "Docker Compose", "Pytest"],
    github: "#",
    live: "#",
  },
  {
    title: "Production-Grade LLM Eval Framework",
    subtitle: "Individual Project | Dec 2025 - Jan 2026",
    description: "Architected a modular LLM evaluation CLI with plugin-based metrics for RAG-based systems. Assesses faithfulness, context relevancy, and answer correctness using LLM-as-a-Judge. Automated end-to-end evaluation workflows using Docker Compose and GitHub Actions CI.",
    tech: ["Python", "Poetry", "PyTorch", "Transformers", "GitHub Actions", "Docker"],
    github: "#",
    live: "#",
  }
];

export const experienceData = [
  {
    role: "AI/ML Student",
    company: "University / Self-Taught",
    date: "2023 - Present",
    description: "Specializing in machine learning models, natural language processing, and bridging AI with full-stack web applications."
  },
  {
    role: "Full Stack Developer (Learning)",
    company: "Personal Projects",
    date: "2022 - 2023",
    description: "Built scalable web applications using React, Node.js, and modern CSS frameworks. Focused on component-driven architecture."
  }
];
