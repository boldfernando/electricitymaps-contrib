import { forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export const RoundedCard = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(function RoundedCard({ children, className }, reference) {
  return (
    <section
      className={twMerge(
        'my-2 overflow-hidden rounded-sm border border-[#262528] bg-[#1f1f22]/90 p-4 backdrop-blur-xl transition-all duration-200 ease-[cubic-bezier(0.2,0,0.1,1)]',
        className
      )}
      ref={reference}
    >
      {children}
    </section>
  );
});
