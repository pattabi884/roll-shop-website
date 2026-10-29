"use client";

import { useEffect, useRef } from "react";

type Ember = { x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; hue: number };

// Sparks rising off a hot tawa, drawn on a canvas behind the hero.
// They drift away from the pointer. Pauses off screen; off for reduced motion.
export default function Embers() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const count = w < 640 ? 45 : 90;
    const spawn = (anywhere: boolean): Ember => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.3 + Math.random() * 0.9),
      r: 0.6 + Math.random() * 2.2,
      life: 0,
      max: 200 + Math.random() * 300,
      hue: 15 + Math.random() * 25,
    });
    const embers = Array.from({ length: count }, () => spawn(true));

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    window.addEventListener("pointermove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        const dx = e.x - pointer.x;
        const dy = e.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const f = (1 - Math.sqrt(d2) / 120) * 0.6;
          e.vx += (dx / 120) * f;
          e.vy += (dy / 120) * f;
        }
        e.vx = e.vx * 0.96 + Math.sin((e.life + i * 13) * 0.03) * 0.02;
        e.vy = e.vy * 0.98 - 0.02;
        e.x += e.vx;
        e.y += e.vy;
        e.life++;
        const t = e.life / e.max;
        const alpha = Math.sin(Math.PI * Math.min(t, 1)) * (0.6 + Math.random() * 0.4);
        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
        g.addColorStop(0, `hsla(${e.hue + 20}, 100%, 70%, ${alpha})`);
        g.addColorStop(0.4, `hsla(${e.hue}, 95%, 55%, ${alpha * 0.5})`);
        g.addColorStop(1, `hsla(${e.hue}, 90%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2);
        ctx.fill();
        if (t >= 1 || e.y < -20) embers[i] = spawn(false);
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
