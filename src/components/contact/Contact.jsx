import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Send, Mail, MapPin } from 'lucide-react';
import SlideUp from '../animations/SlideUp';
import StaggerContainer from '../animations/StaggerContainer';

const Contact = () => {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-[60%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <SlideUp>
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">05.</span> Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Currently open for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>
          </div>
        </SlideUp>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <StaggerContainer className="lg:col-span-2 space-y-8" staggerChildren={0.15}>
            <motion.div variants={cardVariants} className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Email</h3>
                <a href="mailto:contact@example.com" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  contact@example.com
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={cardVariants} className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Location</h3>
                <p className="text-gray-400 text-sm">
                  Available for Remote Work
                </p>
              </div>
            </motion.div>
          </StaggerContainer>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form className="glass p-8 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                  <input type="text" id="name" placeholder="John Doe" className="bg-surface border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                  <input type="email" id="email" placeholder="john@example.com" className="bg-surface border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea id="message" rows="5" placeholder="Your message here..." className="bg-surface border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all resize-none"></textarea>
              </div>
              
              <button type="submit" className="group mt-2 px-8 py-4 bg-white/5 hover:bg-primary border border-surfaceBorder hover:border-primary text-white font-medium rounded-lg transition-all hover:shadow-glow-primary flex items-center justify-center gap-2">
                Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
