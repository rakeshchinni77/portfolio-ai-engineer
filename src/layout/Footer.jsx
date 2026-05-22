import React from 'react';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { socials } from '@/constants/socials';

const Footer = () => {
  return (
    <footer className="border-t border-surfaceBorder bg-background py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <a href="#home" className="text-2xl font-bold font-mono tracking-tighter">
            <span className="text-white">CR</span>
            <span className="text-primary">.AI</span>
          </a>
          <p className="text-gray-400 mt-2 text-sm">{socials.footerTagline}</p>
        </div>
        
        <div className="flex space-x-6">
          <a href={socials.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <FaGithub size={24} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-secondary transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href={`mailto:${socials.email}`} className="text-gray-400 hover:text-primary transition-colors">
            <Mail size={24} />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {socials.copyrightName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
