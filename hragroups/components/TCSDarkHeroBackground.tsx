"use client";

import React, { useEffect, useRef } from "react";

export default function TCSDarkHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Node & Neural Constellation configuration
    const particleCount = Math.min(Math.floor((width * height) / 14000), 90);
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = [
      "rgba(101, 126, 248, ", // Blue / Indigo
      "rgba(0, 188, 212, ",   // Cyan
      "rgba(147, 197, 253, ", // Sky Blue
      "rgba(99, 102, 241, ",  // Violet
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // 1. Cybernetic Deep Wave Grid / Mesh (TCS Digital Transformation style)
      ctx.save();
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const yOffset = height * 0.55 + w * 40;
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 25) {
          const sin1 = Math.sin(x * 0.003 + time * 0.8 + w) * 45;
          const sin2 = Math.cos(x * 0.0015 - time * 0.5 + w * 2) * 35;
          const y = yOffset + sin1 + sin2;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, yOffset - 50, width, height);
        if (w === 0) {
          grad.addColorStop(0, "rgba(59, 130, 246, 0.07)");
          grad.addColorStop(0.5, "rgba(0, 188, 212, 0.05)");
          grad.addColorStop(1, "rgba(7, 12, 24, 0)");
        } else if (w === 1) {
          grad.addColorStop(0, "rgba(99, 102, 241, 0.06)");
          grad.addColorStop(0.5, "rgba(147, 197, 253, 0.04)");
          grad.addColorStop(1, "rgba(7, 12, 24, 0)");
        } else {
          grad.addColorStop(0, "rgba(0, 188, 212, 0.04)");
          grad.addColorStop(1, "rgba(7, 12, 24, 0)");
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // Stroke line on top of each flow wave
        ctx.beginPath();
        for (let x = 0; x <= width; x += 25) {
          const sin1 = Math.sin(x * 0.003 + time * 0.8 + w) * 45;
          const sin2 = Math.cos(x * 0.0015 - time * 0.5 + w * 2) * 35;
          const y = yOffset + sin1 + sin2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - w * 0.03})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
      ctx.restore();

      // 2. Connecting Neural Particle Graph
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around boundaries
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw particle node
        const currentAlpha = p1.alpha * (0.7 + 0.3 * Math.sin(time * 3 + i));
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color}${currentAlpha})`;
        ctx.shadowColor = p1.color.replace(", ", ", 1)");
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect with nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // 3. Floating Digital Beams / Data Shimmer
      const beamCount = 4;
      for (let b = 0; b < beamCount; b++) {
        const bx = ((time * 40 * (b + 1) * 0.7 + b * (width / beamCount)) % (width + 300)) - 150;
        const by = height * 0.3 + Math.sin(time + b) * 80;
        const beamGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 160);
        beamGrad.addColorStop(0, "rgba(56, 189, 248, 0.12)");
        beamGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.05)");
        beamGrad.addColorStop(1, "rgba(7, 12, 24, 0)");

        ctx.fillStyle = beamGrad;
        ctx.fillRect(bx - 160, by - 160, 320, 320);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Background dynamic canvas (TCS digital glow & neural wave network) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Cybernetic Tech Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            radial-gradient(rgba(0, 201, 255, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px, 60px 60px, 30px 30px",
        }}
      />

      {/* Ambient gradient lighting covering full edges */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] max-w-full h-[600px] bg-[#00c9ff]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[500px] bg-[#1e1cb0]/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-[600px] h-[500px] bg-[#00c9ff]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle depth vignette overlay (ensures crisp text readability) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06070b]/40 via-transparent to-[#06070b] pointer-events-none" />
    </div>
  );
}
