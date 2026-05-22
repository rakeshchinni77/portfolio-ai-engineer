import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ExternalLink, X, Cpu, Layers, Database, Settings, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

import { projectsData } from '@/constants/projectsData';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

// Floating sparkle animation variants for GitHub link
const sparkle1Variants = {
  hover: {
    opacity: [0, 1, 0],
    y: [-2, -22],
    x: [-4, -12],
    scale: [0.6, 1.2, 0.6],
    transition: { duration: 0.8, ease: "easeOut", repeat: Infinity, repeatDelay: 0.1 }
  }
};

const sparkle2Variants = {
  hover: {
    opacity: [0, 1, 0],
    y: [-2, -25],
    x: [4, 14],
    scale: [0.5, 1.1, 0.5],
    transition: { duration: 0.9, ease: "easeOut", delay: 0.15, repeat: Infinity, repeatDelay: 0.15 }
  }
};

const sparkle3Variants = {
  hover: {
    opacity: [0, 1, 0],
    y: [-2, -18],
    x: [-6, 6],
    scale: [0.7, 1.3, 0.7],
    transition: { duration: 0.7, ease: "easeOut", delay: 0.3, repeat: Infinity, repeatDelay: 0.2 }
  }
};

// Custom System Diagrams for each project inside the modal
const AgentDiagram = () => {
  const shouldReduce = useReducedMotion();
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 py-6 font-mono text-[11px]">
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <Cpu className="text-secondary w-6 h-6 mb-2" />
        <span className="text-white font-bold">User Query</span>
        <span className="text-gray-400 mt-1 text-center">Natural language intent</span>
        <span className="text-xs text-secondary-light mt-2 bg-secondary/15 px-2 py-0.5 rounded-full border border-secondary/20">Input</span>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1.2 flex flex-col justify-center items-center p-4 bg-primary/10 border border-primary/30 rounded-xl relative group shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-50 blur-sm transition-opacity" />
        <Layers className="text-primary w-6 h-6 mb-2 animate-pulse" />
        <span className="text-white font-bold">Agent Core (ReAct)</span>
        <span className="text-gray-300 mt-1 text-center font-semibold">FastAPI Orchestration</span>
        
        <div className="mt-3 flex gap-2 w-full">
          <div className="flex-1 bg-black/40 p-1.5 rounded border border-white/5 text-center">
            <span className="text-gray-400 block text-[9px]">Memory</span>
            <span className="text-secondary-light font-bold text-[10px]">Redis Cache</span>
          </div>
          <div className="flex-1 bg-black/40 p-1.5 rounded border border-white/5 text-center">
            <span className="text-gray-400 block text-[9px]">Tools</span>
            <span className="text-primary-light font-bold text-[10px]">Registry</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <Database className="text-purple-400 w-6 h-6 mb-2" />
        <span className="text-white font-bold">Tool Sandbox</span>
        <span className="text-gray-400 mt-1 text-center">Dockerized environments</span>
        <div className="flex flex-wrap gap-1 mt-2 justify-center">
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] text-gray-400 border border-white/5">Search</span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] text-gray-400 border border-white/5">SQL</span>
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-[9px] text-gray-400 border border-white/5">Python</span>
        </div>
      </div>
    </div>
  );
};

const SearchDiagram = () => {
  const shouldReduce = useReducedMotion();
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 py-6 font-mono text-[11px]">
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <Cpu className="text-cyan-400 w-6 h-6 mb-2" />
        <span className="text-white font-bold">Search Query</span>
        <span className="text-gray-400 mt-1 text-center">Unstructured search text</span>
        <span className="text-xs text-cyan-400 mt-2 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">Query</span>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <Settings className="text-purple-400 w-6 h-6 mb-2 animate-spin" style={{ animationDuration: '10s' }} />
        <span className="text-white font-bold">Transformer Model</span>
        <span className="text-gray-400 mt-1 text-center">all-mpnet-base-v2</span>
        <span className="text-[10px] text-purple-300 mt-1 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">768-Dim Dense Vector</span>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1.2 flex flex-col justify-center items-center p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl relative group shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-50 blur-sm transition-opacity" />
        <Database className="text-cyan-400 w-6 h-6 mb-2" />
        <span className="text-white font-bold">FAISS Index</span>
        <span className="text-gray-300 mt-1 text-center font-semibold">IVF-PQ Quantized DB</span>
        <span className="text-cyan-300 mt-1 text-[10px] bg-cyan-950/60 border border-cyan-500/20 px-2 py-0.5 rounded">Retrieval: &lt;20ms</span>
        <span className="text-gray-400 mt-2 text-[9px] text-center leading-normal">Cos-Sim Top-K Matching</span>
      </div>
    </div>
  );
};

const EvalDiagram = () => {
  const shouldReduce = useReducedMotion();
  return (
    <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 py-6 font-mono text-[11px]">
      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <Database className="text-secondary w-6 h-6 mb-2" />
        <span className="text-white font-bold">RAG Data Logs</span>
        <span className="text-gray-400 mt-1 text-center">Contexts + answers</span>
        <span className="text-xs text-secondary-light mt-2 bg-secondary/15 px-2 py-0.5 rounded-full border border-secondary/20">Input</span>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1.2 flex flex-col justify-center items-center p-4 bg-primary/10 border border-primary/30 rounded-xl relative group shadow-[0_0_15px_rgba(139,92,246,0.1)]">
        <div className="absolute -inset-[1px] bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-50 blur-sm transition-opacity" />
        <Cpu className="text-primary w-6 h-6 mb-2 animate-pulse" />
        <span className="text-white font-bold">Metric Runner</span>
        <span className="text-gray-300 mt-1 text-center font-semibold">Plugin Orchestrator</span>
        <div className="mt-3 flex flex-col gap-1 w-full text-[10px] text-gray-300">
          <div className="flex justify-between bg-black/40 px-2 py-1 rounded">
            <span>Faithfulness:</span>
            <span className="text-emerald-400 font-bold">NLI</span>
          </div>
          <div className="flex justify-between bg-black/40 px-2 py-1 rounded">
            <span>Relevancy:</span>
            <span className="text-emerald-400 font-bold">LLM-Judge</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-gray-500 font-bold md:rotate-0 rotate-90 self-center">
        <motion.span animate={shouldReduce ? {} : { x: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="hidden md:block">➔</motion.span>
        <motion.span animate={shouldReduce ? {} : { y: [0, 8, 0] }} transition={shouldReduce ? {} : { repeat: Infinity, duration: 1.5, delay: 0.5 }} className="md:hidden block">⬇</motion.span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 bg-white/5 border border-white/10 rounded-xl relative group">
        <CheckCircle className="text-emerald-400 w-6 h-6 mb-2" />
        <span className="text-white font-bold">CI/CD Gate</span>
        <span className="text-gray-400 mt-1 text-center">GitHub Actions / Docker</span>
        <span className="text-[10px] text-emerald-400 mt-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">Verify & Deploy</span>
      </div>
    </div>
  );
};

const specSheets = {
  "Autonomous Research Agent": `
# Autonomous Research Agent Config
api:
  version: v1.0.0
  framework: FastAPI
  endpoints:
    - POST /api/v1/agent/run (async stream)
    - GET /api/v1/sessions/{id}/history

agent:
  reasoning: ReAct (Reasoning and Acting)
  underlying_model: gpt-4o / claude-3-5-sonnet
  max_iterations: 15
  concurrency_limit: 4

memory:
  backend: Redis Stack (v7.2)
  serializer: JSON
  session_ttl: 86400 # 24 hours

tools:
  - web_search: Brave Search API
  - math_engine: SymPy Solver
  - code_sandbox: Safe Docker Python Executor
  - database_reader: Postgres Read-Only

verification:
  test_suite: pytest
  coverage: 94%
`,
  "Scalable Semantic Search API": `
# Scalable Semantic Search API Config
api:
  version: v2.1.0
  framework: FastAPI
  average_latency: 142ms

retrieval:
  embedding_model: sentence-transformers/all-mpnet-base-v2
  vector_dimension: 768
  metric: METRIC_INNER_PRODUCT (Cosine Similarity)

indexing:
  engine: FAISS (Facebook AI Similarity Search)
  index_type: IndexIVFFlat (Inverted File Index)
  nlist: 100
  nprobe: 10
  vector_count: 4200000

deployment:
  container: Docker Compose
  orchestration: FastAPI + Gunicorn workers
`,
  "Production-Grade LLM Eval Framework": `
# LLM Eval Framework Config
framework:
  language: Python (managed via Poetry)
  architecture: Plugin-based metric framework
  integration: CI/CD Pipeline (GitHub Actions)

metrics:
  faithfulness:
    description: Groundedness in context
    scorer: NLI-based-similarity
  context_relevancy:
    description: Semantic density of context vs query
    scorer: Cross-encoder (sentence-transformers)
  correctness:
    description: Alignment with ground truth
    scorer: LLM-as-a-Judge (gpt-4o-mini)

automation:
  ci_cd:
    runner: ubuntu-latest
    steps:
      - poetry run pytest
      - poetry run python -m eval_runner --check-thresholds
`
};

const mockLogs = {
  "Autonomous Research Agent": [
    "rakesh@portfolio:~$ python -m pytest tests/",
    "============================= test session starts ==============================",
    "platform win32 -- Python 3.10.11, pytest-7.4.3, pluggy-1.3.0",
    "rootdir: C:\\Users\\rakes\\portfolio-ai-engineer",
    "plugins: asyncio-0.21.1, cov-4.1.0",
    "collected 18 items",
    "",
    "tests/test_agent.py .................                             [100%]",
    "============================== 18 passed in 3.42s ==============================",
    "",
    "rakesh@portfolio:~$ docker-compose up -d",
    "[+] Running 2/2",
    " ✔ Container redis-memory-store  Started",
    " ✔ Container research-agent-api  Started",
    "",
    "rakesh@portfolio:~$ curl -X POST \"http://localhost:8000/api/v1/agent/run\"",
    "{\"query\": \"Find recent AI papers on LLM distillation and evaluate them\"}",
    "--- AGENT SESSION CREATED: session_id = 9b1deb4d-3b7d ---",
    "[Thought]: User wants recent AI papers on LLM distillation. I should search arXiv.",
    "[Action]: web_search(\"LLM distillation arXiv papers 2026\")",
    "[Observation]: Found 3 relevant papers: (1) 'Deep Distill v2' ...",
    "[Thought]: Let's analyze and run the evaluation script inside sandbox.",
    "[Action]: sandboxed_python(\"print(eval_scores([0.85, 0.92, 0.88]))\")",
    "[Observation]: Mean score: 0.883",
    "[Thought]: Memory updated in Redis. Generating final response.",
    "--- RESPONSE RECEIVED (1.82s) ---"
  ],
  "Scalable Semantic Search API": [
    "rakesh@portfolio:~$ python -m pytest tests/",
    "============================= test session starts ==============================",
    "collected 12 items",
    "tests/test_index.py ......                                        [ 50%]",
    "tests/test_search.py ......                                       [100%]",
    "============================== 12 passed in 1.84s ==============================",
    "",
    "rakesh@portfolio:~$ python index_builder.py",
    "Loading SentenceTransformers embedding model: all-mpnet-base-v2...",
    "Embedding model loaded successfully. Dimensions: 768",
    "Indexing 4,200,000 document chunks...",
    "Building FAISS IndexIVFFlat index...",
    "Index constructed. Total vectors: 4,200,000. Index size: 1.62 GB",
    "Writing index to disk: /app/data/faiss_index.bin... Done.",
    "",
    "rakesh@portfolio:~$ curl \"http://localhost:8000/search?q=retrieval-augmented-generation&k=3\"",
    "--- QUERY RECEIVED: 'retrieval-augmented-generation' ---",
    "[FAISS]: Vector search completed. Found 3 items.",
    "[Latency]: 18.2 ms (Retrieval) + 12.4 ms (API serialization)",
    "[Results]:",
    "  - Chunk 8421: Cosine Similarity = 0.9142",
    "  - Chunk 1205: Cosine Similarity = 0.8841",
    "  - Chunk 9422: Cosine Similarity = 0.8529"
  ],
  "Production-Grade LLM Eval Framework": [
    "rakesh@portfolio:~$ poetry run pytest",
    "============================= test session starts ==============================",
    "collected 24 items",
    "tests/metrics/test_faithfulness.py ........                       [ 33%]",
    "tests/metrics/test_relevancy.py ........                          [ 66%]",
    "tests/metrics/test_correctness.py ........                         [100%]",
    "============================== 24 passed in 5.12s ==============================",
    "",
    "rakesh@portfolio:~$ poetry run python -m eval_runner --check-thresholds",
    "Loading configuration from eval_config.yaml...",
    "Validating RAG data pipelines...",
    "Evaluating 150 test samples...",
    "Calculating Metrics via LLM-as-a-Judge (gpt-4o-mini):",
    "  - Faithfulness: 0.892 (Target: >=0.85) [PASS]",
    "  - Context Relevancy: 0.841 (Target: >=0.80) [PASS]",
    "  - Answer Correctness: 0.865 (Target: >=0.80) [PASS]",
    "",
    "Verification complete. All evaluation targets MET.",
    "CI/CD Pipeline gate check: PASS. Code is ready for deployment."
  ]
};

const Projects = () => {
  const shouldReduce = useReducedMotion();
  const [activeArchProject, setActiveArchProject] = useState(null);
  const [activeTab, setActiveTab] = useState('diagram'); // 'diagram' | 'spec' | 'logs'

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveArchProject(null);
      }
    };
    if (activeArchProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeArchProject]);

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const renderDiagram = (title) => {
    switch (title) {
      case "Autonomous Research Agent":
        return <AgentDiagram />;
      case "Scalable Semantic Search API":
        return <SearchDiagram />;
      case "Production-Grade LLM Eval Framework":
        return <EvalDiagram />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SectionHeader 
          number="03." 
          title="Projects Showcase" 
          subtitle="Selected works bridging AI architecture with backend perfection." 
          align="center" 
        />

        <StaggerContainer staggerChildren={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => {
            const isPrimary = project.theme === "primary";

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={shouldReduce ? {} : {
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className={cn(
                  "premium-card flex flex-col h-full rounded-2xl overflow-hidden group cursor-default",
                  isPrimary ? "premium-card-primary" : "premium-card-secondary"
                )}
              >
                {/* Visual Wrapper */}
                <div className="h-48 bg-surfaceBorder/30 relative overflow-hidden flex items-center justify-center text-center">
                  {project.image ? (
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* Depth overlay that deepens on card hover */}
                      <div className="absolute inset-0 bg-background/45 group-hover:bg-background/60 transition-colors duration-500 z-10" />
                      
                      {/* Glowing category pill badge */}
                      <div className="absolute top-3 right-3 z-20">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-background/80 backdrop-blur-md border border-white/10 text-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            isPrimary ? "bg-primary" : "bg-secondary"
                          )} />
                          {project.featured ? "FEATURED" : "STABLE"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br z-10 animate-pulse",
                        isPrimary ? "from-primary/10 to-secondary/10" : "from-secondary/10 to-primary/10"
                      )} style={{ animationDuration: '4s' }} />
                      <div className="absolute inset-0 bg-grid opacity-20" />
                      <h3 className={cn(
                        "text-2xl font-bold text-white z-20 opacity-80 group-hover:scale-105 transition-transform duration-500",
                        isPrimary ? "text-glow" : "text-glow-cyan"
                      )}>{project.title}</h3>
                      <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0",
                        isPrimary ? "bg-primary/20" : "bg-secondary/20"
                      )} />
                    </>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow z-20 bg-background/50">
                  <h3 className={cn(
                    "text-xl font-bold text-white mb-1 transition-colors duration-300",
                    isPrimary ? "group-hover:text-primary" : "group-hover:text-secondary"
                  )}>
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-secondary mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                  
                  {/* Glassmorphic Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((t, tIdx) => (
                      <Badge key={tIdx} variant="tech">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Buttons Footer */}
                  <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-white/5">
                    {/* GitHub Code Link with Star particles microinteraction */}
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-visible flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-300 bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all duration-300 group/btn"
                      whileHover="hover"
                    >
                      <FaGithub size={14} className="group-hover/btn:scale-110 transition-transform" />
                      <span>Code</span>
                      {/* Floating Micro-stars */}
                      {!shouldReduce && (
                        <>
                          <motion.span className="absolute -top-1 right-2 text-cyan-400 pointer-events-none opacity-0 select-none text-[8px]" variants={sparkle1Variants}>✦</motion.span>
                          <motion.span className="absolute -top-2 left-3 text-cyan-400 pointer-events-none opacity-0 select-none text-[6px]" variants={sparkle2Variants}>✦</motion.span>
                          <motion.span className="absolute -top-1.5 left-1/2 text-cyan-300 pointer-events-none opacity-0 select-none text-[7px]" variants={sparkle3Variants}>✦</motion.span>
                        </>
                      )}
                    </motion.a>



                    {/* Live Demo Link (If Present) */}
                    {project.live && project.live !== "#" && (
                      <a 
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-gray-300 bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-all duration-300"
                      >
                        <ExternalLink size={14} />
                        <span>Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
        
      </div>

      {/* Cinematic System Architecture Modal Overlay */}
      <AnimatePresence>
        {activeArchProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArchProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.95, y: shouldReduce ? 0 : 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.95, y: shouldReduce ? 0 : 15 }}
              transition={{ duration: shouldReduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0b081e] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
            >
              {/* Top Window Chrome (Mac Terminal Style) */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#070514] border-b border-white/5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button onClick={() => setActiveArchProject(null)} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors" title="Close" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-gray-500 ml-2">●</span>
                  <span className="text-gray-400 font-semibold truncate max-w-[200px] md:max-w-none">
                    system_architecture -- {activeArchProject.title}
                  </span>
                </div>
                
                <button 
                  onClick={() => setActiveArchProject(null)}
                  className="text-gray-500 hover:text-white p-1 rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Tabs Header */}
              <div className="flex border-b border-white/5 bg-[#09071a]/80 px-4 py-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => setActiveTab('diagram')}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all duration-200 border",
                    activeTab === 'diagram' 
                      ? "bg-primary/10 border-primary/30 text-white" 
                      : "bg-transparent border-transparent text-gray-400 hover:text-white"
                  )}
                >
                  [1] Topology Diagram
                </button>
                
                <button
                  onClick={() => setActiveTab('spec')}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all duration-200 border",
                    activeTab === 'spec' 
                      ? "bg-primary/10 border-primary/30 text-white" 
                      : "bg-transparent border-transparent text-gray-400 hover:text-white"
                  )}
                >
                  [2] config.yaml
                </button>

                <button
                  onClick={() => setActiveTab('logs')}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-all duration-200 border",
                    activeTab === 'logs' 
                      ? "bg-primary/10 border-primary/30 text-white" 
                      : "bg-transparent border-transparent text-gray-400 hover:text-white"
                  )}
                >
                  [3] CLI Test Logs
                </button>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="flex-grow p-6 overflow-y-auto min-h-[300px]">
                {activeTab === 'diagram' && (
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-white text-base font-bold mb-1">{activeArchProject.title} Architecture</h4>
                      <p className="text-gray-400 text-xs leading-relaxed mb-6 font-mono">
                        Visualizing how raw inputs route through server contexts, embeddings, vector tables, and session caches to output validated context.
                      </p>
                    </div>
                    
                    <div className="bg-black/35 rounded-xl border border-white/5 p-4 flex-grow flex items-center justify-center">
                      {renderDiagram(activeArchProject.title)}
                    </div>
                  </div>
                )}

                {activeTab === 'spec' && (
                  <div className="font-mono text-xs text-gray-300 bg-black/40 p-4 rounded-xl border border-white/5 overflow-x-auto select-text leading-relaxed">
                    <pre className="text-cyan-400/90 whitespace-pre">{specSheets[activeArchProject.title]?.trim()}</pre>
                  </div>
                )}

                {activeTab === 'logs' && (
                  <div className="font-mono text-xs text-emerald-400/90 bg-[#02000c] p-4 rounded-xl border border-white/5 overflow-x-auto select-text max-h-[450px] leading-relaxed">
                    {mockLogs[activeArchProject.title]?.map((log, lIdx) => (
                      <div key={lIdx} className={cn(
                        "py-0.5",
                        log.startsWith("rakesh@portfolio:") ? "text-cyan-400 font-bold mt-2" : "",
                        log.includes("passed") ? "text-emerald-400 font-bold" : "",
                        log.includes("ERROR") || log.includes("FAILED") ? "text-red-400" : ""
                      )}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer specs summary */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#070514] border-t border-white/5 text-[10px] font-mono text-gray-500">
                <span>STATUS: LOCALHOST:8000 // READY</span>
                <span>ESC to Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

