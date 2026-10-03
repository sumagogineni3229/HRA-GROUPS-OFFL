"use client";

import React, { useEffect, useRef } from "react";

interface IBasePolygonProps {
  nodeCount?: number;
  maxDistance?: number;
  lineAlphaMultiplier?: number;
  lineWidth?: number;
  opacityClass?: string;
}

export default function IBasePolygonBackground({
  nodeCount = 28,
  maxDistance = 340,
  lineAlphaMultiplier = 0.22,
  lineWidth = 0.9,
  opacityClass = "opacity-80",
}: IBasePolygonProps) {
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

    // Structural polygon constellation vertices
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() > 0.85 ? 2.5 : 1.5,
      });
    }

    const maxLineDist = maxDistance;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;
      }

      // Draw structural connecting polygon lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLineDist) {
            const opacity = Math.pow(1 - dist / maxLineDist, 1.2) * lineAlphaMultiplier;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(180, 215, 255, ${opacity})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        }

        // Draw node dot
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 240, 255, ${Math.min(lineAlphaMultiplier * 2.2, 0.8)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeCount, maxDistance, lineAlphaMultiplier, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${opacityClass}`}
    />
  );
}
