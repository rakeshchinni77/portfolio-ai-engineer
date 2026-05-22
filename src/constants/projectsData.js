export const projectsData = [
  {
    title: "Autonomous Research Agent",
    subtitle: "(LangChain + FastAPI) | Jan 2026 – Feb 2026",
    description: "Designed and architected a production-ready containerized AI research agent implementing the ReAct reasoning framework. The system enables autonomous multi-step problem solving via dynamic tool execution (web search, math engine, SQL databases, and sandboxed Python environments). Integrates a resilient session-aware conversational memory store powered by Redis.",
    techStack: ["Python", "FastAPI", "LangChain", "OpenAI API", "Redis", "Docker", "Pytest"],
    github: "https://github.com/rakeshchinni77/research-agent",
    live: "#",
    image: "/images/research_agent.webp",
    featured: true,
    theme: "primary"
  },
  {
    title: "Scalable Semantic Search API",
    subtitle: "(FAISS + FastAPI) | May 2025 - June 2025",
    description: "Engineered a high-performance semantic search API utilizing FAISS vector indexing to deliver high-accuracy top-K context retrieval in <200 ms. Dramatically boosted context-aware match precision by leveraging pre-trained transformer embeddings, resulting in an 80% reduction in manual query-refinement workflows.",
    techStack: ["Python", "FastAPI", "FAISS", "SentenceTransformers", "Docker Compose", "Pytest"],
    github: "https://github.com/rakeshchinni77/semantic-search-api",
    live: "#",
    image: "/images/semantic_search.webp",
    featured: true,
    theme: "secondary"
  },
  {
    title: "Production-Grade LLM Eval Framework",
    subtitle: "Individual Project | Dec 2025 - Jan 2026",
    description: "Created a modular command-line LLM evaluation framework featuring plugin-based metric architectures for RAG systems. The framework systematically assesses LLM responses for faithfulness, context relevancy, and answer correctness using LLM-as-a-Judge paradigms. Fully automated the CI/CD pipeline via GitHub Actions and Docker Compose.",
    techStack: ["Python", "Poetry", "PyTorch", "Transformers", "GitHub Actions", "Docker"],
    github: "https://github.com/rakeshchinni77/llm-eval-framework",
    live: "#",
    image: "/images/llm_eval.webp",
    featured: false,
    theme: "primary"
  }
];
