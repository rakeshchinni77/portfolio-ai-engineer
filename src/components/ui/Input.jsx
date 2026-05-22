import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({
  label,
  id,
  className,
  containerClassName,
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        className={cn(
          "bg-surface border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all",
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
