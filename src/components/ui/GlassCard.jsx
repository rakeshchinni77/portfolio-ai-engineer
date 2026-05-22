import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const GlassCard = forwardRef(({ children, className, as: Component = 'div', ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn('glass-card', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
