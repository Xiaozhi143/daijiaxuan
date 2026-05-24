import { useEffect, useRef } from 'react';

interface Orbit {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
}

const BackgroundDecoration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const orbits: Orbit[] = [];
    for (let i = 0; i < 3; i++) {
      orbits.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 100 + Math.random() * 200,
        speed: 0.0003 + Math.random() * 0.0005,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbits.forEach((orbit) => {
        orbit.angle += orbit.speed;
        
        ctx.beginPath();
        ctx.arc(orbit.x, orbit.y, orbit.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(230, 213, 167, 0.03)';
        ctx.lineWidth = 1;
        ctx.stroke();

        const dotX = orbit.x + Math.cos(orbit.angle) * orbit.radius;
        const dotY = orbit.y + Math.sin(orbit.angle) * orbit.radius;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 213, 167, 0.3)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default BackgroundDecoration;
