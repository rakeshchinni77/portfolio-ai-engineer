import { cn } from '@/utils/cn';

const Button = ({
  children,
  className,
  variant = 'primary', // 'primary' | 'outline' | 'glass' | 'ghost' | 'surface' | 'navGlow'
  size = 'md', // 'sm' | 'md' | 'lg'
  as: Component = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/80 shadow-glow-primary rounded-lg',
    outline: 'bg-transparent border border-primary/50 text-primary hover:bg-primary/10 hover:shadow-glow-primary rounded-lg',
    glass: 'glass text-white hover:bg-white/10 rounded-lg border-surfaceBorder',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/5 rounded-lg',
    surface: 'bg-white/5 hover:bg-primary border border-surfaceBorder hover:border-primary text-white rounded-lg hover:shadow-glow-primary',
    navGlow: 'bg-primary/20 text-primary border border-primary/50 hover:bg-primary/30 hover:shadow-glow-primary rounded-full'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  return (
    <Component
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
