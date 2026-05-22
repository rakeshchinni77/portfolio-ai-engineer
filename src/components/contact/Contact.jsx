import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { socials } from '@/constants/socials';
import SlideUp from '@/components/animations/SlideUp';
import StaggerContainer from '@/components/animations/StaggerContainer';
import SectionHeader from '@/components/common/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

const themeMaps = {
  primary: {
    bg: "bg-primary/20",
    text: "text-primary",
    linkHover: "hover:text-primary"
  },
  secondary: {
    bg: "bg-secondary/20",
    text: "text-secondary",
    linkHover: "hover:text-secondary"
  }
};

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

  const contactDetails = [
    {
      title: "Email",
      value: socials.email,
      href: `mailto:${socials.email}`,
      icon: Mail,
      theme: "primary"
    },
    {
      title: "Location",
      value: socials.location,
      icon: MapPin,
      theme: "secondary"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-[50%] -translate-x-1/2 w-[60%] h-[50%] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <SectionHeader 
          number="05." 
          title="Get In Touch" 
          subtitle="Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!" 
          align="center" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Contact Info */}
          <StaggerContainer className="lg:col-span-2 space-y-8" staggerChildren={0.15}>
            {contactDetails.map((detail, idx) => {
              const IconComponent = detail.icon;
              const activeTheme = themeMaps[detail.theme] || themeMaps.primary;

              return (
                <GlassCard key={idx} as={motion.div} variants={cardVariants} className="p-6 flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${activeTheme.bg} flex items-center justify-center ${activeTheme.text} shrink-0`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{detail.title}</h3>
                    {detail.href ? (
                      <a href={detail.href} className={`text-gray-400 ${activeTheme.linkHover} transition-colors text-sm`}>
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-gray-400 text-sm">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </GlassCard>
              );
            })}
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
                <Input 
                  label="Name" 
                  id="name" 
                  placeholder="John Doe" 
                />
                <Input 
                  label="Email" 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                />
              </div>
              
              <TextArea 
                label="Message" 
                id="message" 
                placeholder="Your message here..." 
              />
              
              <Button 
                type="submit" 
                variant="surface" 
                size="lg" 
                className="group mt-2 flex items-center justify-center gap-2"
              >
                Send Message 
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
