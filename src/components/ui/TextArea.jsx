import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const TextArea = forwardRef(({
  label,
  id,
  className,
  containerClassName,
  rows = 5,
  ...props
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={cn(
          "bg-surface border border-surfaceBorder rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:shadow-glow-primary transition-all resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
