import React from 'react';
import SlideUp from '@/components/animations/SlideUp';
import { cn } from '@/utils/cn';

const SectionHeader = ({ number, title, subtitle, align = 'left', className }) => {
  const isRight = align === 'right';
  const isCenter = align === 'center';
  
  return (
    <SlideUp>
      <div className={cn(
        "mb-16",
        isRight && "text-right",
        isCenter && "text-center",
        className
      )}>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          {isRight ? (
            <>
              {title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-secondary">
                {number}
              </span>
            </>
          ) : (
            <>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {number}
              </span>{' '}
              {title}
            </>
          )}
        </h2>
        <div className={cn(
          "w-20 h-1 bg-gradient-to-r from-primary to-transparent rounded-full",
          isRight && "bg-gradient-to-l ml-auto",
          isCenter && "mx-auto",
        )} />
        {subtitle && (
          <p className={cn("mt-4 text-gray-400 max-w-2xl leading-relaxed", isCenter && "mx-auto")}>
            {subtitle}
          </p>
        )}
      </div>
    </SlideUp>
  );
};

export default SectionHeader;
