import { useEffect, useRef, useState, ReactNode, HTMLAttributes } from 'react';

interface ScrollRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  className?: string;
  type?: 'left' | 'right' | 'bottom' | 'scale' | 'fade';
}

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  className = '', 
  type = 'left',
  ...props
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (type) {
        case 'left':
          return 'opacity-0 -translate-x-20';
        case 'right':
          return 'opacity-0 translate-x-20';
        case 'bottom':
          return 'opacity-0 translate-y-20';
        case 'scale':
          return 'opacity-0 scale-90';
        case 'fade':
          return 'opacity-0';
        default:
          return 'opacity-0 -translate-x-20';
      }
    }
    return 'opacity-100 translate-x-0 translate-y-0 scale-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getAnimationClass()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
