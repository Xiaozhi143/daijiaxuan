import { useEffect, useRef, useState } from 'react';

interface ScrollAnimateProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const ScrollAnimate: React.FC<ScrollAnimateProps> = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 如果浏览器不支持 IntersectionObserver，直接显示内容
    if (typeof IntersectionObserver === 'undefined') {
      setHasError(true);
      return;
    }

    try {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -100px 0px'
        }
      );

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      // 安全机制：3秒后强制显示内容，防止永远看不见
      const timeout = setTimeout(() => {
        if (!isVisible) {
          setHasError(true);
        }
      }, 3000);

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
        clearTimeout(timeout);
      };
    } catch (error) {
      setHasError(true);
    }
  }, []);

  const delayClass = delay > 0 ? `delay-${delay}` : '';

  // 如果有错误，直接显示内容，不带任何动画
  if (hasError) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`scroll-animate ${isVisible ? 'visible' : ''} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimate;
