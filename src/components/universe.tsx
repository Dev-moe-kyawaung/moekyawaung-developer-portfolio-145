import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; ph: number };

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const HUES = [190, 265, 320, 95, 40];

/* ═══ QUANTUM FIELD — particles + entanglement + cursor gravity ═══ */
export function QuantumField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, raf = 0, t = 0, mx = -9e3, my = -9e3;
    let pts: P[] = [];
    const seed = () => {
      const n = Math.min(240, Math.round((w * h) / 15000) * density);
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: rnd(-0.34, 0.34), vy: rnd(-0.34, 0.34),
        r: rnd(0.7, 2.4), hue: HUES[(Math.random() * HUES.length) | 0], ph: rnd(0, 6.3),
      }));
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    const mv = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const lv = () => { mx = -9e3; my = -9e3; };
    resize();
    addEventListener("resize", resize);
    addEventListener("mousemove", mv);
    addEventListener("mouseleave", lv);

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 155) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2},100%,66%,${(1 - d / 155) * 0.3})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 36100 && d2 > 1) {
          const d = Math.sqrt(d2), f = (190 - d) / 190;
          p.x += (dx / d) * f * 2.4; p.y += (dy / d) * f * 2.4;
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
        const fl = 0.6 + Math.sin(t * 3 + p.ph) * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = `hsla(${p.hue},100%,72%,${0.78 * fl})`;
        ctx.shadowBlur = 11; ctx.shadowColor = `hsl(${p.hue},100%,60%)`;
        ctx.fill(); ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", mv);
      removeEventListener("mouseleave", lv);
    };
  }, [density]);
  return <canvas ref={ref} className="fixed inset-0 z-[1] pointer-events-none" aria-hidden />;
}

/* ═══ SINGULARITY CORE — event horizon + accretion + jets ═══ */
export function Singularity({ size = 420, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = size * dpr; cv.height = size * dpr; ctx.scale(dpr, dpr);
    let raf = 0, t = 0;
    const c = size / 2, R = size * 0.2;

    const accretion = Array.from({ length: 220 }, (_, i) => ({
      a: rnd(0, 6.2832), r: R * rnd(1.15, 2.4),
      sp: 0.004 + (i % 7) * 0.0012, sz: rnd(0.5, 2.1),
      hue: [190, 265, 320, 40][i % 4],
    }));

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, size, size);
      const halo = ctx.createRadialGradient(c, c, R, c, c, R * 3.4);
      halo.addColorStop(0, "rgba(124,58,237,.2)");
      halo.addColorStop(0.4, "rgba(0,245,255,.07)");
      halo.addColorStop(1, "transparent");
      ctx.fillStyle = halo; ctx.fillRect(0, 0, size, size);

      // jets
      [1, -1].forEach((dir) => {
        const jg = ctx.createLinearGradient(c, c, c, c + dir * R * 2.6);
        jg.addColorStop(0, "rgba(0,245,255,.35)");
        jg.addColorStop(1, "transparent");
        ctx.fillStyle = jg;
        ctx.beginPath();
        ctx.moveTo(c - R * 0.13, c);
        ctx.lineTo(c + R * 0.13, c);
        ctx.lineTo(c + R * 0.42 * dir, c + dir * R * 2.6);
        ctx.lineTo(c - R * 0.42 * dir, c + dir * R * 2.6);
        ctx.closePath(); ctx.fill();
      });

      // accretion disk particles
      accretion.forEach((p) => {
        p.a += p.sp;
        const x = c + Math.cos(p.a) * p.r;
        const y = c + Math.sin(p.a) * p.r * 0.42;
        const depth = 0.55 + Math.sin(p.a) * 0.45;
        ctx.beginPath();
        ctx.arc(x, y, p.sz * depth, 0, 6.2832);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${0.85 * depth})`;
        ctx.shadowBlur = 9 * depth; ctx.shadowColor = `hsl(${p.hue},100%,60%)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      // photon ring
      ctx.beginPath();
      ctx.ellipse(c, c, R * 1.05, R * 1.05, 0, 0, 6.2832);
      ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1.6;
      ctx.shadowBlur = 24; ctx.shadowColor = "#00f5ff";
      ctx.stroke(); ctx.shadowBlur = 0;

      // event horizon
      const eg = ctx.createRadialGradient(c - R * 0.3, c - R * 0.3, R * 0.05, c, c, R);
      eg.addColorStop(0, "#dbe8ff");
      eg.addColorStop(0.14, "#5b6bd6");
      eg.addColorStop(0.5, "#130f36");
      eg.addColorStop(1, "#01010a");
      ctx.beginPath(); ctx.arc(c, c, R, 0, 6.2832);
      ctx.fillStyle = eg; ctx.fill();
      ctx.strokeStyle = "rgba(168,85,247,.9)"; ctx.lineWidth = 1.4; ctx.stroke();

      // pulse ring
      const pl = (Math.sin(t * 2.4) + 1) / 2;
      ctx.beginPath();
      ctx.arc(c, c, R * (1.25 + pl * 0.9), 0, 6.2832);
      ctx.strokeStyle = `rgba(0,245,255,${0.3 * (1 - pl)})`; ctx.lineWidth = 1.2; ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);
  return <canvas ref={ref} style={{ width: size, height: size }} className={className} aria-hidden />;
}

/* ═══ VOLUMETRIC NEBULA — drifting additive clouds ═══ */
export function Nebula({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let w = 0, h = 0, raf = 0, t = 0;
    const blobs = Array.from({ length: 7 }, (_, i) => ({
      bx: rnd(0.1, 0.9), by: rnd(0.15, 0.85),
      rr: rnd(0.16, 0.34), sp: rnd(0.0003, 0.001),
      hue: [265, 190, 320, 40, 95][i % 5], ph: rnd(0, 6.3),
    }));
    const resize = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const draw = () => {
      t += 0.001;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b, i) => {
        const x = b.bx * w + Math.sin(t * b.sp * 30 + b.ph) * w * 0.05;
        const y = b.by * h + Math.cos(t * b.sp * 24 + b.ph) * h * 0.05;
        const r = Math.min(w, h) * b.rr * (1 + Math.sin(t * b.sp * 50 + i) * 0.09);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `hsla(${b.hue},95%,58%,0.075)`);
        g.addColorStop(0.55, `hsla(${b.hue},95%,50%,0.03)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className={`fixed inset-0 z-[2] pointer-events-none ${className}`} aria-hidden />;
}

/* ═══ CONSTELLATION WEB — pulsing hub network ═══ */
export function ConstellationWeb({ size = 340, count = 14 }: { size?: number; count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = size * dpr; cv.height = size * dpr; ctx.scale(dpr, dpr);
    let raf = 0, t = 0;
    const nodes = Array.from({ length: count }, (_, i) => {
      const a = (i / count) * 6.2832;
      const rr = size * (0.2 + (i % 4) * 0.09);
      return { a, rr, cx: size / 2, cy: size / 2, sp: 0.002 + (i % 5) * 0.0008, sz: rnd(1.5, 3.5), hue: HUES[i % 5] };
    });
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, size, size);
      const pos = nodes.map((n) => ({
        x: n.cx + Math.cos(n.a + t * n.sp) * n.rr,
        y: n.cy + Math.sin(n.a + t * n.sp) * n.rr,
      }));
      for (let i = 0; i < pos.length; i++)
        for (let j = i + 1; j < pos.length; j++) {
          const d = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y);
          if (d < size * 0.42) {
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y); ctx.lineTo(pos[j].x, pos[j].y);
            ctx.strokeStyle = `rgba(0,245,255,${(1 - d / (size * 0.42)) * 0.32})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      pos.forEach((p, i) => {
        const pulse = 1 + Math.sin(t * 3 + i) * 0.35;
        ctx.beginPath(); ctx.arc(p.x, p.y, nodes[i].sz * pulse, 0, 6.2832);
        ctx.fillStyle = `hsla(${nodes[i].hue},100%,70%,.95)`;
        ctx.shadowBlur = 13; ctx.shadowColor = `hsl(${nodes[i].hue},100%,60%)`;
        ctx.fill(); ctx.shadowBlur = 0;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, count]);
  return <canvas ref={ref} style={{ width: size, height: size }} aria-hidden />;
}

/* ═══ HYPERCUBE — rotating 4D tesseract ═══ */
export function Hypercube({ size = 400, className = "" }: { size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = size * dpr; cv.height = size * dpr; ctx.scale(dpr, dpr);
    let raf = 0, t = 0;
    const c = size / 2, R = size * 0.3;
    const verts: number[][] = [];
    for (let i = 0; i < 16; i++) verts.push([(i & 1) ? 1 : -1, (i & 2) ? 1 : -1, (i & 4) ? 1 : -1, (i & 8) ? 1 : -1]);
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++)
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) if (verts[i][k] !== verts[j][k]) diff++;
        if (diff === 1) edges.push([i, j]);
      }
    const rot = (v: number[], a: number, b: number, th: number) => {
      const r = [...v], ca = Math.cos(th), sa = Math.sin(th);
      r[a] = v[a] * ca - v[b] * sa; r[b] = v[a] * sa + v[b] * ca;
      return r;
    };
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, size, size);
      const g = ctx.createRadialGradient(c, c, 0, c, c, R * 2.2);
      g.addColorStop(0, "rgba(168,85,247,.13)"); g.addColorStop(1, "transparent");
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      const pts = verts.map((v) => {
        let p = [...v];
        p = rot(p, 0, 1, t * 0.8);
        p = rot(p, 2, 3, t * 1.1);
        p = rot(p, 0, 3, t * 0.4);
        const s = 3.2 / (3.2 - p[3] * 0.9);
        return { x: c + p[0] * R * s * 0.62, y: c + p[1] * R * s * 0.62, d: p[2] };
      });
      ctx.beginPath();
      ctx.ellipse(c, c, R * 1.55, R * 0.48, t * 0.22, 0, 6.2832);
      ctx.strokeStyle = "rgba(0,245,255,.3)"; ctx.lineWidth = 1; ctx.stroke();
      edges.forEach(([a, b]) => {
        const depth = (pts[a].d + pts[b].d) / 4 + 0.5;
        ctx.beginPath();
        ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y);
        ctx.strokeStyle = `rgba(0,245,255,${0.16 + depth * 0.52})`;
        ctx.lineWidth = 1.1; ctx.stroke();
      });
      pts.forEach((p, i) => {
        const hot = i % 5 === 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, hot ? 3.6 : 2.1, 0, 6.2832);
        ctx.fillStyle = hot ? "#ff2bd6" : "#00f5ff";
        ctx.shadowColor = hot ? "#ff2bd6" : "#00f5ff"; ctx.shadowBlur = hot ? 15 : 8;
        ctx.fill(); ctx.shadowBlur = 0;
      });
      ctx.beginPath(); ctx.arc(c, c, 7 + Math.sin(t * 2.4) * 1.8, 0, 6.2832);
      ctx.fillStyle = "#e8f6ff"; ctx.shadowColor = "#a855f7"; ctx.shadowBlur = 26; ctx.fill(); ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);
  return <canvas ref={ref} style={{ width: size, height: size }} className={className} aria-hidden />;
}

/* ═══ WAVE STRIP — probability waves ═══ */
export function WaveStrip({ color = "#00f5ff", className = "" }: { color?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d"); if (!ctx) return;
    let raf = 0, t = 0;
    const draw = () => {
      t += 0.025;
      const w = cv.clientWidth, h = cv.clientHeight;
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      ctx.clearRect(0, 0, w, h);
      for (let k = 0; k < 3; k++) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y = h / 2 + Math.sin(x * 0.02 + t * (1 + k * 0.4) + k) * h * 0.28 + Math.sin(x * 0.055 - t * 1.7) * h * 0.09;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color; ctx.globalAlpha = k === 0 ? 0.9 : 0.26;
        ctx.lineWidth = k === 0 ? 1.7 : 1;
        ctx.shadowColor = color; ctx.shadowBlur = k === 0 ? 11 : 0;
        ctx.stroke(); ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [color]);
  return <canvas ref={ref} className={className} aria-hidden />;
}

/* ═══ BOOT SEQUENCE ═══ */
export function BootSequence({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [onDone]);
  const lines = [
    "Q10 KERNEL — QUANTUM MATRIX BOOT",
    "> mounting 10 spatial dimensions .... OK",
    "> loading 42 module graph .......... OK",
    "> entangling 43 repositories ....... OK",
    "> spawning hologram engine ......... OK",
    "> calibrating gravitational field .. OK",
    "> waking QUBIT agent ............... OK",
    "> ALL DIMENSIONS ONLINE",
  ];
  return (
    <div ref={ref} className="fixed inset-0 z-[200] bg-[#03000e] grid place-items-center p-6 q10-scan overflow-hidden">
      <div className="absolute inset-0 q10-grid opacity-60" />
      <div className="relative w-full max-w-xl text-center">
        <Singularity size={230} className="mx-auto mb-8" />
        <div className="gs-panel ax-panel q10-panel p-6 text-left min-h-[190px]">
          {lines.map((l, i) => (
            <p key={i} className={`f-mono text-[12px] leading-relaxed ${i === 0 ? "g-cy font-semibold" : i === lines.length - 1 ? "g-am font-semibold mt-2" : "text-[#6b6b9e]"}`}>{l}</p>
          ))}
        </div>
        <div className="mt-5 h-[3px] bg-[#140a33] overflow-hidden">
          <div className="h-full animate-[bootFill_2.2s_ease-out_forwards]" style={{ background: "linear-gradient(90deg,#00f5ff,#a855f7,#ff2bd6)" }} />
        </div>
        <style>{`@keyframes bootFill{from{width:0}to{width:100%}}`}</style>
        <button onClick={onDone} className="q10-btn mt-6">SKIP BOOT ▸</button>
      </div>
    </div>
  );
}
