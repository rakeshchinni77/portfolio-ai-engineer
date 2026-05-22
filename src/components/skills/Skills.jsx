import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideUp from '../animations/SlideUp';
import StaggerContainer from '../animations/StaggerContainer';

const skillsData = [
  {
    category: "Machine Learning & AI",
    skills: ["Machine Learning", "Neural Networks", "Deep Learning", "NLP", "TensorFlow", "PyTorch", "Scikit-learn", "Transfer Learning (VGG16, ResNet)", "LLMs", "Vector Databases (FAISS)", "Hugging Face APIs"]
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
    skills: ["Docker", "Git/GitHub", "MySQL", "Pytest", "VS Code", "Jupyter/Colab", "Data Structures & Algorithms"]
  }
];

const Skills = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <SlideUp>
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-right">
              Skills Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">.02</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-l from-primary to-transparent rounded-full ml-auto"></div>
          </div>
        </SlideUp>

        <StaggerContainer staggerChildren={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((category, idx) => (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                className="glass-card p-8 flex flex-col h-full border-t-4 border-t-primary/50"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-mono">{category.category}</h3>
                <StaggerContainer staggerChildren={0.05} className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span 
                      key={sIdx}
                      variants={badgeVariants}
                      className="px-4 py-2 rounded-full bg-surface border border-surfaceBorder text-gray-300 text-sm hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </StaggerContainer>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
        
      </div>
    </section>
  );
};

export default Skills;
