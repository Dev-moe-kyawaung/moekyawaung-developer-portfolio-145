import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  r: number; hue: number; phase: number;
};

/* ── Quantum field: drifting particles + entanglement lines + wave rings ── */
export function QuantumField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0, t = 0;
    let mx = -9999, my = -9999;
    let parts: Particle[] = [];

    const seed = () => {
      const n = Math.round(((w * h) / 16000) * density);
      parts = Array.from({ length: Math.min(n, 220) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: 0.7 + Math.random() * 1.7,
        hue: [190, 265, 320, 95][Math.floor(Math.random() * 4)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onLeave = () => { mx = -9999; my = -9999; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      // entanglement lines
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            const alpha = (1 - d / 150) * 0.28;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${a.hue},100%,65%,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // particles (repelled gently by cursor)
      for (const p of parts) {
        const dx = p.x - mx, dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 32400 && d2 > 1) {
          const f = (180 - Math.sqrt(d2)) / 180;
          const d = Math.sqrt(d2);
          p.x += (dx / d) * f * 2.2;
          p.y += (dy / d) * f * 2.2;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const flick = 0.6 + Math.sin(t * 3 + p.phase) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,72%,${0.75 * flick})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${p.hue},100%,60%)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return <canvas ref={ref} className="fixed inset-0 z-[1] pointer-events-none" aria-hidden />;
}

/* ── 5D hypercube: rotating tesseract projection ── */
export function Hypercube({ size = 380, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * dpr;
    cv.height = size * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0, t = 0;
    const R = size * 0.32;
    const c = size / 2;

    // 16 tesseract vertices
    const verts: number[][] = [];
    for (let i = 0; i < 16; i++) {
      verts.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++)
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) if (verts[i][k] !== verts[j][k]) diff++;
        if (diff === 1) edges.push([i, j]);
      }

    const rot = (v: number[], a: number, b: number, th: number) => {
      const r = [...v];
      const ca = Math.cos(th), sa = Math.sin(th);
      r[a] = v[a] * ca - v[b] * sa;
      r[b] = v[a] * sa + v[b] * ca;
      return r;
    };

    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, size, size);

      // halo
      const g = ctx.createRadialGradient(c, c, 0, c, c, R * 2.1);
      g.addColorStop(0, "rgba(139,92,246,0.14)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);

      const pts = verts.map((v) => {
        let p = [...v];
        p = rot(p, 0, 1, t * 0.8);
        p = rot(p, 2, 3, t * 1.1);
        p = rot(p, 0, 3, t * 0.42);
        const s = 3.2 / (3.2 - p[3] * 0.9);
        return { x: c + p[0] * R * s * 0.62, y: c + p[1] * R * s * 0.62, d: p[2] };
      });

      // orbital ring
      ctx.beginPath();
      ctx.ellipse(c, c, R * 1.55, R * 0.5, t * 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,240,255,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(c, c, R * 1.55, R * 0.5, t * 0.2, 0, Math.PI * 2);
      ctx.save();
      ctx.restore();

      edges.forEach(([a, b]) => {
        const depth = (pts[a].d + pts[b].d) / 4 + 0.5;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y);
        ctx.lineTo(pts[b].x, pts[b].y);
        ctx.strokeStyle = `rgba(0,240,255,${0.18 + depth * 0.5})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      });

      pts.forEach((p, i) => {
        const hot = i % 5 === 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, hot ? 3.4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = hot ? "#ff2fb3" : "#00f0ff";
        ctx.shadowColor = hot ? "#ff2fb3" : "#00f0ff";
        ctx.shadowBlur = hot ? 14 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Qubit core
      ctx.beginPath();
      ctx.arc(c, c, 7 + Math.sin(t * 2.4) * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "#e8f6ff";
      ctx.shadowColor = "#8b5cf6";
      ctx.shadowBlur = 26;
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return <canvas ref={ref} style={{ width: size, height: size }} className={className} aria-hidden />;
}

/* ── Wavefunction: animated probability wave strip ── */
export function WaveStrip({ color = "#00f0ff", className = "" }: { color?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0, t = 0;
    const draw = () => {
      t += 0.025;
      const w = (cv.width = cv.clientWidth);
      const h = (cv.height = cv.clientHeight);
      ctx.clearRect(0, 0, w, h);
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y =
            h / 2 +
            Math.sin(x * 0.02 + t * (1 + k * 0.4) + k) * h * 0.28 +
            Math.sin(x * 0.055 - t * 1.7) * h * 0.09;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = k === 0 ? 0.9 : 0.28;
        ctx.lineWidth = k === 0 ? 1.6 : 1;
        ctx.shadowColor = color;
        ctx.shadowBlur = k === 0 ? 10 : 0;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [color]);
  return <canvas ref={ref} className={className} aria-hidden />;
}
