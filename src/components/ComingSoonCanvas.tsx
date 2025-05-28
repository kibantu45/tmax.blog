
import React, { useEffect, useRef } from 'react';

const ComingSoonCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Animation variables
    let animationId: number;
    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      angle: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      time += 0.02;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated particles
      particles.forEach((particle, index) => {
        ctx.save();
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Update particle position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        // Update angle for wave motion
        particle.angle += 0.01;
      });

      // Draw pulsing "COMING SOON" text
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Main text
      const fontSize = Math.min(canvas.width / 8, 48);
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      const pulse = Math.sin(time * 3) * 0.1 + 1;
      ctx.save();
      ctx.scale(pulse, pulse);
      ctx.fillText('COMING SOON', canvas.width / 2 / pulse, canvas.height / 2 / pulse - 20);
      ctx.restore();

      // Subtitle
      ctx.font = `${fontSize * 0.4}px Arial`;
      ctx.fillStyle = '#e2e8f0';
      ctx.shadowBlur = 5;
      ctx.fillText('Tmax Ads Platform', canvas.width / 2, canvas.height / 2 + 30);
      
      ctx.restore();

      // Draw animated border
      ctx.save();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      ctx.setLineDash([10, 5]);
      ctx.lineDashOffset = time * 50;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
        Interactive Ad Space
      </div>
    </div>
  );
};

export default ComingSoonCanvas;
