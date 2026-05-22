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
          {socials.links.map((link) => {
            const Icon = link.icon;
            const isExternal = !link.url.startsWith('mailto:');
            
            // Color-specific hover classes for subtle glow & brand color
            let hoverStyle = '';
            let ariaLabel = '';
            
            if (link.name.toLowerCase() === 'github') {
              hoverStyle = 'hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]';
              ariaLabel = "Visit Chinni Rakesh's GitHub Profile";
            } else if (link.name.toLowerCase() === 'linkedin') {
              hoverStyle = 'hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]';
              ariaLabel = "Visit Chinni Rakesh's LinkedIn Profile";
            } else if (link.name.toLowerCase() === 'email') {
              hoverStyle = 'hover:text-primary hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]';
              ariaLabel = "Send an email to Chinni Rakesh";
            }

            return (
              <a
                key={link.name}
                href={link.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={ariaLabel}
                className={`text-gray-400 opacity-80 hover:opacity-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md p-1 ${hoverStyle}`}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {socials.copyrightName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
