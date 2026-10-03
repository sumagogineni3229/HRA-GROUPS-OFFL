"use client";

import React, { useEffect, useRef } from "react";

interface BigPolygonBackgroundProps {
  opacityClass?: string;
}

export default function BigPolygonBackground({
  opacityClass = "opacity-75",
}: BigPolygonBackgroundProps) {
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
      initPolygons();
    };

    window.addEventListener("resize", handleResize);

    // Large geometric polygon definition
    interface PolygonMesh {
      x: number;
      y: number;
      size: number;
      sides: number;
      rotation: number;
      rotSpeed: number;
      vx: number;
      vy: number;
      strokeColor: string;
      fillColor: string;
      lineWidth: number;
      glow: boolean;
      innerRings?: boolean;
    }

    let polygons: PolygonMesh[] = [];

    const initPolygons = () => {
      polygons = [
        // Huge geometric hexagon (top right)
        {
          x: width * 0.82,
          y: height * 0.22,
          size: Math.min(width, height) * 0.38,
          sides: 6,
          rotation: 0.2,
          rotSpeed: 0.0006,
          vx: 0.05,
          vy: 0.04,
          strokeColor: "rgba(0, 201, 255, 0.22)",
          fillColor: "rgba(0, 201, 255, 0.015)",
          lineWidth: 1.2,
          glow: true,
          innerRings: true,
        },
        // Massive geometric octagon (middle-left)
        {
          x: width * 0.15,
          y: height * 0.52,
          size: Math.min(width, height) * 0.44,
          sides: 8,
          rotation: 0.4,
          rotSpeed: -0.0005,
          vx: -0.04,
          vy: 0.03,
          strokeColor: "rgba(120, 180, 255, 0.2)",
          fillColor: "rgba(30, 28, 176, 0.02)",
          lineWidth: 1.3,
          glow: true,
          innerRings: true,
        },
        // Large pentagon / diamond (bottom right)
        {
          x: width * 0.78,
          y: height * 0.82,
          size: Math.min(width, height) * 0.35,
          sides: 5,
          rotation: 0.8,
          rotSpeed: 0.0007,
          vx: 0.04,
          vy: -0.04,
          strokeColor: "rgba(0, 201, 255, 0.18)",
          fillColor: "rgba(0, 201, 255, 0.012)",
          lineWidth: 1.1,
          glow: false,
          innerRings: true,
        },
        // Floating mid-sized hexagon (center upper)
        {
          x: width * 0.48,
          y: height * 0.18,
          size: Math.min(width, height) * 0.22,
          sides: 6,
          rotation: 1.1,
          rotSpeed: -0.0009,
          vx: -0.03,
          vy: 0.05,
          strokeColor: "rgba(180, 220, 255, 0.18)",
          fillColor: "rgba(255, 255, 255, 0.01)",
          lineWidth: 1.0,
          glow: false,
          innerRings: false,
        },
        // Floating cyber polygon (bottom left)
        {
          x: width * 0.32,
          y: height * 0.88,
          size: Math.min(width, height) * 0.28,
          sides: 6,
          rotation: 0.6,
          rotSpeed: 0.0008,
          vx: 0.03,
          vy: -0.03,
          strokeColor: "rgba(0, 201, 255, 0.16)",
          fillColor: "rgba(0, 201, 255, 0.01)",
          lineWidth: 1.0,
          glow: false,
          innerRings: true,
        },
      ];
    };

    initPolygons();

    // Helper to draw a regular polygon with vertices and cross diagonals
    const drawPolygon = (p: PolygonMesh) => {
      const vertices: { x: number; y: number }[] = [];
      const angleStep = (Math.PI * 2) / p.sides;

      for (let i = 0; i < p.sides; i++) {
        const angle = p.rotation + i * angleStep;
        vertices.push({
          x: p.x + Math.cos(angle) * p.size,
          y: p.y + Math.sin(angle) * p.size,
        });
      }

      // 1. Draw main polygon boundary
      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();

      if (p.fillColor) {
        ctx.fillStyle = p.fillColor;
        ctx.fill();
      }

      ctx.strokeStyle = p.strokeColor;
      ctx.lineWidth = p.lineWidth;
      ctx.stroke();

      // 2. Draw interior geometric structure / radial lines to center & cross diagonals
      ctx.beginPath();
      for (let i = 0; i < vertices.length; i++) {
        // Spokes to center
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(vertices[i].x, vertices[i].y);

        // Cross-chord to opposite vertex for cyber-lattice look
        const oppIndex = (i + Math.floor(p.sides / 2)) % p.sides;
        ctx.moveTo(vertices[i].x, vertices[i].y);
        ctx.lineTo(vertices[oppIndex].x, vertices[oppIndex].y);
      }
      ctx.strokeStyle = p.strokeColor.replace(/[\d.]+\)$/, "0.08)");
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // 3. Optional concentric inner polygon
      if (p.innerRings) {
        const innerRatio = 0.55;
        ctx.beginPath();
        for (let i = 0; i < p.sides; i++) {
          const angle = p.rotation + i * angleStep;
          const ix = p.x + Math.cos(angle) * (p.size * innerRatio);
          const iy = p.y + Math.sin(angle) * (p.size * innerRatio);
          if (i === 0) ctx.moveTo(ix, iy);
          else ctx.lineTo(ix, iy);
        }
        ctx.closePath();
        ctx.strokeStyle = p.strokeColor.replace(/[\d.]+\)$/, "0.14)");
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 4. Subtle glowing vertex nodes
      for (let i = 0; i < vertices.length; i++) {
        ctx.beginPath();
        ctx.arc(vertices[i].x, vertices[i].y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.strokeColor.replace(/[\d.]+\)$/, "0.65)");
        ctx.fill();
      }

      // Center node
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.0, 0, Math.PI * 2);
      ctx.fillStyle = p.strokeColor.replace(/[\d.]+\)$/, "0.5)");
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect inter-polygon centroids with light dashed architectural lines
      ctx.beginPath();
      ctx.setLineDash([4, 10]);
      for (let i = 0; i < polygons.length; i++) {
        for (let j = i + 1; j < polygons.length; j++) {
          ctx.moveTo(polygons[i].x, polygons[i].y);
          ctx.lineTo(polygons[j].x, polygons[j].y);
        }
      }
      ctx.strokeStyle = "rgba(0, 201, 255, 0.05)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // Update & render each big polygon
      for (let i = 0; i < polygons.length; i++) {
        const p = polygons[i];
        p.rotation += p.rotSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Soft bounce / drift boundaries
        if (p.x < width * 0.05 || p.x > width * 0.95) p.vx *= -1;
        if (p.y < height * 0.05 || p.y > height * 0.95) p.vy *= -1;

        drawPolygon(p);
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
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${opacityClass}`}
    />
  );
}
