import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SlideUp from '../animations/SlideUp';
import StaggerContainer from '../animations/StaggerContainer';

const portfolioProjects = [
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

const Projects = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SlideUp>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">03.</span> Projects Showcase
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">Selected works bridging AI architecture with backend perfection.</p>
          </div>
        </SlideUp>

        <StaggerContainer staggerChildren={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, idx) => (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                className="glass-card flex flex-col h-full rounded-2xl overflow-hidden group"
              >
                {/* Abstract Visual Placeholder instead of plain image */}
                <div className="h-48 bg-surfaceBorder/30 relative overflow-hidden flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-10 animate-pulse" style={{ animationDuration: '4s' }}></div>
                  <div className="absolute inset-0 bg-grid opacity-20"></div>
                  <h3 className="text-2xl font-bold text-white z-20 text-glow opacity-80 group-hover:scale-105 transition-transform duration-500">{project.title}</h3>
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow z-20 bg-background/50">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-secondary mb-4">{project.subtitle}</p>
                  <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-xs font-mono text-gray-300 bg-surface px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <a href={project.github} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                      <FaGithub size={18} /> <span className="text-sm">Code</span>
                    </a>
                    {project.live !== "#" && (
                      <a href={project.live} className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-1">
                        <ExternalLink size={18} /> <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};

export default Projects;
