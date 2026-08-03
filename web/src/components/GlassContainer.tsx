import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function GlassBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        `absolute inset-0 -z-10 h-full w-full backdrop-blur-xl `,
        className
      )}
    />
  );
}

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  backdropClassName?: string;
  children: React.ReactNode;
}

const GlassContainer = forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ className, children, backdropClassName, ...props }, reference) => (
    <div
      ref={reference}
      className={twMerge(
        `absolute z-30 w-full overflow-hidden border-0 bg-[#0e0e10] dark:bg-[#0e0e10] sm:rounded-sm sm:border sm:border-[#262528] sm:bg-[#131315]/85 sm:dark:bg-[#131315]/85 shadow-[0_24px_60px_rgba(0,0,0,0.34)] transition-all duration-200 ease-[cubic-bezier(0.2,0,0.1,1)]`,
        className
      )}
      {...props}
    >
      <GlassBackdrop className={backdropClassName} />
      {children}
    </div>
  )
);

GlassContainer.displayName = 'GlassContainer';

export default GlassContainer;
