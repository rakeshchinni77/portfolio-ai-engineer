import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Badge = forwardRef(({
  children,
  className,
  variant = 'default', // 'default' | 'tech'
  as: Component = 'span',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-300';
  
  const variants = {
    default: 'px-4 py-2 rounded-full bg-surface border border-surfaceBorder text-gray-300 text-sm hover:text-white hover:border-primary/50 hover:bg-primary/10 cursor-default',
    tech: 'text-xs font-mono text-gray-300 bg-surface px-2 py-1 rounded'
  };

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Badge.displayName = 'Badge';

export default Badge;
