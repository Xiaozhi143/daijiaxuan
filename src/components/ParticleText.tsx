import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  delay: number;
  color: string;
}

const ParticleText = ({ text = 'JIAXUAN.DAI' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animationRef = useRef<number>();
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const getTextParticles = () => {
      const fontSize = Math.min(width * 0.14, 170);
      ctx.font = `bold ${fontSize}px Georgia, serif`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textWidth = ctx.measureText(text).width;
      const startX = (width - textWidth) / 2;
      const startY = height / 2;
      
      ctx.clearRect(0, 0, width, height);
      ctx.fillText(text, width / 2, height / 2);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      const particles: Particle[] = [];
      const gap = 3;
      
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];
          
          if (alpha > 128) {
            const jitter = (Math.random() - 0.5) * 2;
            const color = Math.random() < 0.85 ? 'rgba(230, 213, 167,' : 'rgba(147, 197, 253,';
            particles.push({
              x: x + jitter,
              y: y + jitter,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.5,
              delay: Math.random() * 0.5,
              color: color
            });
          }
        }
      }
      
      return particles;
    };

    particlesRef.current = getTextParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p, i) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * 3;
        const directionY = forceDirectionY * force * 3;

        if (distance < maxDistance && mouse.active) {
          p.x -= directionX;
          p.y -= directionY;
        } else {
          p.x += (p.targetX - p.x) * 0.05;
          p.y += (p.targetY - p.y) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = getTextParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <div ref={containerRef} className="w-full h-48 md:h-64 lg:h-80 relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'none' }}
      />
    </div>
  );
};

export default ParticleText;
