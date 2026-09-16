import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = "", className = "" }: { children: ReactNode; delay?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${delay} ${className}`}>{children}</div>;
}

export function SectionHead({ dim, tag, title, sub, color = "#00f5ff" }: { dim: string; tag: string; title: ReactNode; sub?: string; color?: string }) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-5 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="f-mono text-[11px] px-2.5 py-1 border font-semibold" style={{ borderColor: color, color }}>{dim}</span>
            <span className="f-mono text-[10px] tracking-[0.26em] uppercase" style={{ color }}>{tag}</span>
            <span className="h-px w-20" style={{ background: `linear-gradient(90deg,${color},transparent)` }} />
          </div>
          <h2 className="f-display font-black uppercase leading-[0.95] text-[clamp(1.9rem,4.6vw,3.4rem)] text-white">{title}</h2>
        </div>
        {sub && <p className="max-w-sm text-sm leading-relaxed text-[#9aa3c7] pb-1">{sub}</p>}
      </div>
    </Reveal>
  );
}

export function Magnetic({ children, power = 0.3, className = "" }: { children: ReactNode; power?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ transition: "transform .3s cubic-bezier(.16,1,.3,1)", willChange: "transform" }}
      onMouseMove={(e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * power}px, ${(e.clientY - (r.top + r.height / 2)) * power}px)`;
      }}
      onMouseLeave={() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }}
    >
      {children}
    </div>
  );
}

export function Code({ code }: { code: string }) {
  const html = code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/(\/\/[^\n]*)/g, `<span class="tk-c">$1</span>`)
    .replace(/\b(class|object|fun|val|var|private|override|when|is|return|if|else|for|in|out|by|suspend|launch|const|abstract|data|sealed|interface|import|while|as)\b/g, `<span class="tk-k">$1</span>`)
    .replace(/(@\w+)/g, `<span class="tk-a">$1</span>`)
    .replace(/("[^"]*")/g, `<span class="tk-s">$1</span>`)
    .replace(/\b(\d[\d_]*)\b/g, `<span class="tk-n">$1</span>`);
  return <pre className="codeblock whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const d = document.documentElement;
      setP(d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight));
    };
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-[3px] z-[96]">
      <div className="h-full origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${p})`, background: "linear-gradient(90deg,#00f5ff,#a855f7,#ff2bd6,#ffb020)", boxShadow: "0 0 14px #a855f7" }} />
    </div>
  );
}

export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="border-y border-[#2a1655] py-3 overflow-hidden bg-[#07021c]/60">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={i} className={`f-hud font-bold uppercase text-xl sm:text-2xl px-5 whitespace-nowrap ${i % 2 ? "text-transparent" : "text-white"}`}
                style={i % 2 ? { WebkitTextStroke: "1px #a855f7" } : undefined}>
                {w}<span className="text-[#00f5ff] pl-5">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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
