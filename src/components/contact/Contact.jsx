import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Clock, Briefcase, Send, CheckCircle, Globe } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeader from '@/components/common/SectionHeader';

const Contact = () => {
  const shouldReduce = useReducedMotion();

  // States
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please write a message (at least 10 characters)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Diagnostic Logging
      console.log('--- EmailJS Config Validation ---');
      console.log('VITE_EMAILJS_SERVICE_ID existence:', !!serviceId);
      console.log('VITE_EMAILJS_TEMPLATE_ID existence:', !!templateId);
      console.log('VITE_EMAILJS_PUBLIC_KEY existence:', !!publicKey);

      if (!serviceId || !templateId || !publicKey) {
        const errorMsg = `EmailJS configuration is missing: ` +
          `Service ID: ${serviceId ? 'OK' : 'MISSING'}, ` +
          `Template ID: ${templateId ? 'OK' : 'MISSING'}, ` +
          `Public Key: ${publicKey ? 'OK' : 'MISSING'}.`;
        console.error(errorMsg);
        throw new Error('Email configuration is incomplete. Check environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        email: formData.email, // Mapped to support template's Reply To field
        message: formData.message,
        title: `Portfolio Message from ${formData.name}`, // Mapped to support template's Subject field
        to_email: 'rakeshchinni0000@gmail.com'
      };

      console.log('EmailJS Payload:', templateParams);

      // Real email dispatch using official EmailJS SDK
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log('EmailJS API Response:', response);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS Error Object:', err);
      setStatus('error');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.1,
        delayChildren: shouldReduce ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-[-10%] left-[50%] -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeader 
          number="05." 
          title="Get In Touch" 
          subtitle="Currently open for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!" 
          align="center" 
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-10"
        >
          {/* Left Column: AI Status Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 flex flex-col h-full"
          >
            <div className="glass p-8 flex flex-col justify-between h-full relative overflow-hidden group hover:border-white/10 hover:shadow-glow-primary transition-all duration-500">
              <div>
                {/* Status Bar */}
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                  <span className="text-[10px] font-mono font-semibold text-gray-400 tracking-wider uppercase">
                    Status Overview
                  </span>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="relative flex h-2 w-2">
                      {!shouldReduce && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      )}
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wide">
                      OPEN FOR ROLES
                    </span>
                  </div>
                </div>

                {/* Professional focus paragraph */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-wide">
                      AI Systems & Interfaces
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Specialized in designing and deploying production-grade AI solutions, agentic workflows, and high-performance neural interfaces. Let's collaborate.
                    </p>
                  </div>

                  {/* Info Blocks */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Mail size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-gray-400 block tracking-wider uppercase">Email Address</span>
                        <a 
                          href="mailto:rakeshchinni0000@gmail.com"
                          className="text-sm font-medium text-white hover:text-primary transition-colors block"
                        >
                          rakeshchinni0000@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Latency */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shrink-0">
                        <Clock size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-gray-400 block tracking-wider uppercase">Response Rate</span>
                        <span className="text-sm font-medium text-white block">
                          Within 24 Hours
                        </span>
                      </div>
                    </div>

                    {/* Geolocation */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Globe size={15} />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-gray-400 block tracking-wider uppercase">Work Preferences</span>
                        <span className="text-sm font-medium text-white block">
                          Remote / Global Collaboration
                        </span>
                        <span className="text-xs text-gray-500 block">
                          Based in India (UTC+05:30)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer quote */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                <Briefcase size={14} className="text-gray-500" />
                <span className="text-xs font-mono text-gray-500">
                  ESTABLISHING SECURE CONNECTION LINK...
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Refined Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <div className="glass p-8 flex flex-col h-full min-h-[440px] hover:border-white/10 hover:shadow-glow-primary transition-all duration-500 justify-center">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: shouldReduce ? 0 : 0.4 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white">Transmission Sent</h3>
                    <p className="text-sm text-gray-400 max-w-sm">
                      Thank you for your message! It has been successfully routed to my primary inbox. I will review it and get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-semibold rounded-lg hover:shadow-glow-primary transition-all duration-300 uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ref-name" className="text-xs font-mono font-semibold tracking-wider text-gray-300 uppercase">
                        Name
                      </label>
                      <input
                        type="text"
                        id="ref-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all placeholder:text-gray-600"
                      />
                      {errors.name && (
                        <span className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                          • {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="ref-email" className="text-xs font-mono font-semibold tracking-wider text-gray-300 uppercase">
                        Email
                      </label>
                      <input
                        type="email"
                        id="ref-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Your email address"
                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all placeholder:text-gray-600"
                      />
                      {errors.email && (
                        <span className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                          • {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ref-message" className="text-xs font-mono font-semibold tracking-wider text-gray-300 uppercase">
                      Message
                    </label>
                    <textarea
                      id="ref-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all resize-none placeholder:text-gray-600"
                    />
                    {errors.message && (
                      <span className="text-[11px] font-mono text-rose-500 flex items-center gap-1 mt-0.5">
                        • {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full relative py-3.5 border border-primary/30 rounded-lg bg-primary/10 hover:bg-primary/20 text-white font-mono text-xs tracking-widest font-semibold hover:shadow-glow-primary active:scale-[0.99] transition-all duration-300 uppercase disabled:opacity-50 disabled:pointer-events-none overflow-hidden flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending message...
                        </>
                      ) : status === 'error' ? (
                        'Transmission Failed. Retry?'
                      ) : (
                        <>
                          Send Message
                          <Send size={12} className="text-white" />
                        </>
                      )}
                    </button>
                    {status === 'error' && (
                      <p className="text-xs text-rose-500 font-mono text-center mt-2.5">
                        Failed to deliver message. Please contact directly via email.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


