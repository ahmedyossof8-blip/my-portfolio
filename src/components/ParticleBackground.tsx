import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(157, 78, 221, ',
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Technical Schematic Nodes
    const nodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 40 + 20,
    }));

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep dark gradient background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#0d1126');
      bgGrad.addColorStop(0.5, '#070913');
      bgGrad.addColorStop(1, '#030408');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle tech schematics / grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw glowing background schematic rings
      nodes.forEach((node, idx) => {
        const pulse = Math.sin(tick * 0.02 + idx) * 5;
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(0, 242, 254, 0.06)' : 'rgba(157, 78, 221, 0.06)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Small crosshair at node center
        ctx.beginPath();
        ctx.moveTo(node.x - 6, node.y);
        ctx.lineTo(node.x + 6, node.y);
        ctx.moveTo(node.x, node.y - 6);
        ctx.lineTo(node.x, node.y + 6);
        ctx.stroke();
      });

      // Connect particles with thin neon lines if close
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.alpha + Math.sin(tick * p.pulseSpeed) * 0.2;
        ctx.fillStyle = `${p.color}${Math.max(0.1, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowColor = p.color.includes('242') ? '#00f2fe' : '#9d4edd';
        ctx.shadowBlur = 8;
      });

      ctx.shadowBlur = 0; // reset shadow
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
};
