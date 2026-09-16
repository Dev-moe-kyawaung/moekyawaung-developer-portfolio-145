import { useCallback, useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FiArrowUpRight, FiCheck, FiCopy, FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import {
  profile, dims, stats, projects, skills, doctrine, systems,
  securityLayers, velocity, neuralWork, timeline, testimonials,
  socials, githubPages, certs, pipeline, type Project,
} from "./data";
import { Reveal, Magnetic, SectionHead, Code, ProgressBar, WaveStrip } from "./components/ui";
import { QuantumField, Singularity, Nebula, ConstellationWeb, BootSequence } from "./components/universe";
import Qubit from "./components/Qubit";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [menu, setMenu] = useState(false);
  const [openApp, setOpenApp] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeDim, setActiveDim] = useState("d1");

  const go = useCallback((id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1700);
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActiveDim(e.target.id)),
      { rootMargin: "-36% 0px -54% 0px" }
    );
    dims.forEach((d) => {
      const el = document.getElementById(d.target);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = openApp ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openApp]);

  if (booting) return <BootSequence onDone={() => setBooting(false)} />;

  return (
    <div className="relative min-h-screen bg-[#03000e] text-[#e8e2ff]">
      <QuantumField density={1} />
      <Nebula />
      <div className="fixed inset-0 z-[3] pointer-events-none q10-grid" />
      <div className="fixed inset-0 z-[90] pointer-events-none q10-vignette" />
      <div className="fixed inset-0 z-[91] pointer-events-none q10-noise" />
      <div className="fixed inset-0 z-[92] pointer-events-none q10-scan" />
      <ProgressBar />
      <Qubit />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-[60] border-b border-[#a855f7]/25 bg-[#03000e]/88 backdrop-blur-xl">
        <div className="max-w-[1420px] mx-auto px-5 h-16 flex items-center justify-between gap-4">
          <button onClick={() => go("d1")} className="flex items-center gap-3 group">
            <span className="relative w-9 h-9 grid place-items-center border border-[#00f5ff] text-[#00f5ff] f-hud text-[10px] font-bold">
              Ψ<span className="absolute inset-0 border border-[#ff2bd6]/50 spin-slow" />
            </span>
            <span className="text-left leading-none">
              <span className="block f-hud font-bold text-[11px] tracking-[0.2em] text-white">MKA<span className="text-[#00f5ff]">.Q10</span></span>
              <span className="block f-mono text-[8px] text-[#9aa3c7] tracking-[0.22em] mt-1">QUANTUM MATRIX 10D</span>
            </span>
          </button>
          <nav className="hidden xl:flex items-center gap-1">
            {dims.map((d) => (
              <button key={d.d} onClick={() => go(d.target)}
                className={`px-2.5 py-2 f-mono text-[9px] tracking-[0.18em] transition flex items-center gap-1 ${activeDim === d.target ? "text-white" : "text-[#9aa3c7] hover:text-white"}`}>
                <span className="w-1 h-1 rounded-full" style={{ background: d.color, boxShadow: `0 0 7px ${d.color}` }} />{d.d}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-2 f-mono text-[10px] text-[#b6ff2e] border border-[#b6ff2e]/40 px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6ff2e] pulse-glow text-[#b6ff2e]" /> OPEN
            </span>
            <Magnetic><button onClick={() => go("d10")} className="hidden sm:block q10-btn !py-2 !px-4 !text-[10px]">HIRE</button></Magnetic>
            <button onClick={() => setMenu(!menu)} className="xl:hidden w-10 h-10 grid place-items-center border border-[#a855f7]/50 text-[#c4a6ff]" aria-label="Menu">{menu ? <FiX /> : <FiMenu />}</button>
          </div>
        </div>
        {menu && (
          <div className="xl:hidden border-t border-[#a855f7]/25 bg-[#03000e] p-4 grid grid-cols-2 gap-2 max-h-[70vh] overflow-y-auto no-bar">
            {dims.map((d) => (
              <button key={d.d} onClick={() => go(d.target)} className="text-left p-3 border border-[#a855f7]/25 bg-[#0d0526] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="f-hud text-[12px] text-white">{d.d} · {d.name}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* DIMENSION RAIL */}
      <aside className="hidden 2xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-[55] flex-col gap-2.5">
        {dims.map((d) => (
          <button key={d.d} onClick={() => go(d.target)} className={`dim-dot group flex items-center gap-2.5 ${activeDim === d.target ? "on" : ""}`}>
            <span className="dim-ring w-3 h-3 rounded-full border border-[#a855f7]/50 block transition-all"
              style={activeDim === d.target ? { background: d.color } : undefined} />
            <span className="dim-txt f-mono text-[8px] tracking-[0.2em] text-[#9aa3c7] opacity-0 group-hover:opacity-100 transition-opacity">{d.d} {d.name}</span>
          </button>
        ))}
      </aside>

      <main className="relative z-10">
        {/* ═══ D1 · GENESIS ═══ */}
        <section id="d1" className="relative min-h-screen px-5 pt-28 pb-16 flex items-center scroll-mt-16 overflow-hidden">
          <div className="max-w-[1420px] mx-auto w-full">
            <div className="flex items-center gap-3 f-mono text-[10px] tracking-[0.3em] text-[#00f5ff] mb-7">
              <span className="w-2 h-2 rounded-full bg-[#00f5ff] pulse-glow text-[#00f5ff]" /> D1 · GENESIS — ALL 10 DIMENSIONS ONLINE
            </div>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h1 className="f-display font-black uppercase leading-[0.86] select-none" style={{ fontSize: "clamp(2.5rem,6.8vw,5.8rem)" }}>
                  <span className="kin-line"><span style={{ animationDelay: ".05s" }} className="text-white">Moe Kyaw</span></span>
                  <span className="kin-line"><span style={{ animationDelay: ".18s" }} className="q10-grad">Aung · 10D</span></span>
                </h1>
                <p className="mt-5 f-mono text-[12px] text-[#c4a6ff] tracking-[0.18em]">{profile.nameMM} — {profile.role.toUpperCase()}</p>
                <div className="mt-4 h-7 f-mono text-sm text-[#00f5ff]">
                  <TypeAnimation sequence={[
                    "> mounting 10 spatial dimensions…", 1500,
                    "> 42 module graph entangled ✓", 1600,
                    "> 43 repositories indexed ✓", 1600,
                    "> 10M+ users observed ✓", 1600,
                    "> crash-free 99.98% ✓", 1600,
                    "> select a dimension ↓", 2200,
                  ]} speed={58} repeat={Infinity} wrapper="span" />
                  <span className="blink text-[#ff2bd6]">▊</span>
                </div>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#9aa3c7]">
                  <span className="text-white">Ten dimensions, one engineer.</span> Craft, systems, products,
                  impact, neural AI, security, velocity, constellation — all superposed until you observe them.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Magnetic><button onClick={() => go("d4")} className="q10-btn flex items-center gap-2">◈ D4 · PRODUCTS</button></Magnetic>
                  <Magnetic><button onClick={() => go("d10")} className="q10-btn q10-btn-mg flex items-center gap-2">✦ CONTACT</button></Magnetic>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative">
                  <Singularity size={420} className="max-w-full h-auto" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full overflow-hidden border-2 border-[#00f5ff] floaty"
                    style={{ boxShadow: "0 0 34px rgba(0,245,255,.65)" }}>
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="q10-panel p-5 mt-2 w-full max-w-sm text-center">
                  <span className="q10-tick qt-tl" /><span className="q10-tick qt-br" />
                  <p className="f-mono text-[9px] tracking-[0.24em] text-[#b6ff2e]">NOW COMPILING</p>
                  <p className="f-hud text-sm text-white mt-2">{profile.building}</p>
                  <p className="f-mono text-[10px] text-[#9aa3c7] mt-2 italic">“{profile.mantra}”</p>
                </div>
              </div>
            </div>

            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-[#a855f7]/30 divide-x divide-y lg:divide-y-0 divide-[#a855f7]/20 bg-[#07021c]/70 backdrop-blur mt-14">
                {stats.map((s) => (
                  <div key={s.l} className="p-5 hover:bg-[#a855f7]/10 transition-colors group">
                    <p className="f-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#00f5ff] transition-colors">{s.v}</p>
                    <p className="f-mono text-[9px] tracking-[0.2em] text-[#c4a6ff] mt-2">{s.l}</p>
                    <p className="f-mono text-[9px] text-[#5b5b8a] mt-0.5">{s.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
              {dims.map((d, i) => (
                <Reveal key={d.d} delay={i % 5 === 1 ? "rv-d1" : i % 5 === 2 ? "rv-d2" : i % 5 >= 3 ? "rv-d3" : ""}>
                  <button onClick={() => go(d.target)} className="q10-panel w-full text-left p-4 group">
                    <span className="f-hud font-bold text-lg" style={{ color: d.color }}>{d.d}</span>
                    <span className="block f-hud text-[12px] text-white mt-1">{d.name}</span>
                    <span className="block f-mono text-[10px] text-[#9aa3c7] mt-0.5">{d.sub}</span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ D2 · CRAFT ═══ */}
        <section id="d2" className="px-5 py-24 border-t border-[#a855f7]/20 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D2" tag="Craft" color="#c4a6ff" title={<>Probability <span className="g-vi">amplitudes.</span></>}
              sub="Skill certainty measured across 43 production deployments." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <div className="q10-panel p-6 h-full">
                    <span className="q10-tick qt-tl" />
                    <div className="flex items-center justify-between">
                      <span className="f-hud text-2xl text-[#c4a6ff]">{s.icon}</span>
                      <span className="f-display font-extrabold text-3xl g-vi">{s.pct}<span className="text-sm">%</span></span>
                    </div>
                    <h3 className="f-hud text-[12px] text-white mt-3 tracking-wider">{s.group}</h3>
                    <div className="mt-3 h-1.5 bg-[#a855f7]/15 overflow-hidden">
                      <div className="h-full" style={{ width: `${s.pct}%`, background: "linear-gradient(90deg,#a855f7,#00f5ff)", boxShadow: "0 0 12px #00f5ff" }} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.items.map((it) => <span key={it} className="f-mono text-[10px] border border-[#a855f7]/30 px-2 py-1 text-[#9aa3c7]">{it}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-4 q10-panel p-5 flex flex-wrap items-center gap-2">
                <span className="f-mono text-[10px] tracking-[0.2em] text-[#b6ff2e] mr-2">13+ CREDS //</span>
                {certs.map((c) => <span key={c} className="f-mono text-[10px] px-2.5 py-1 border border-[#b6ff2e]/25 text-[#9aa3c7] hover:text-[#b6ff2e] hover:border-[#b6ff2e]/60 transition">{c}</span>)}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ D3 · SYSTEMS ═══ */}
        <section id="d3" className="px-5 py-24 border-t border-[#a855f7]/20 bg-[#07021c]/50 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D3" tag="Systems" color="#a855f7" title={<>Entangled <span className="g-vi">by design.</span></>}
              sub="The module graph behind every flagship. Dependencies flow one way — cycles forbidden." />
            <div className="grid lg:grid-cols-2 gap-4">
              <Reveal>
                <div className="q10-panel p-6 sm:p-8">
                  <span className="q10-tick qt-tl" /><span className="q10-tick qt-tr" />
                  <p className="f-mono text-[10px] tracking-[0.24em] text-[#00f5ff] mb-5">MODULE TOPOLOGY // 42 NODES</p>
                  <div className="space-y-2">
                    {[
                      [":app", "Entry · nav graph · DI root", "#00f5ff"],
                      [":feature-*", "home · profile · chat · pos · settings", "#a855f7"],
                      [":domain", "Use-cases · entities · repo contracts", "#b6ff2e"],
                      [":data", "Retrofit · Room · Firebase · mappers", "#ff2bd6"],
                      [":core", "Design system · networking · utils", "#ffb020"],
                    ].map(([n, d, c], i) => (
                      <div key={n} className="flex items-center gap-3">
                        <span className="f-mono text-[10px] text-[#5b5b8a] w-7 text-right">L{i + 1}</span>
                        <div className="flex-1 border px-4 py-3 flex items-center justify-between gap-3"
                          style={{ borderColor: `${c}55`, background: `linear-gradient(90deg,${c}14,transparent)` }}>
                          <span className="f-mono text-sm font-bold shrink-0" style={{ color: c }}>{n}</span>
                          <span className="text-[12px] text-[#9aa3c7] hidden sm:inline">{d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="f-mono text-[10px] text-[#5b5b8a] mt-4">↓ deps flow downward only · Konsist enforced in CI</p>
                </div>
              </Reveal>
              <div className="grid sm:grid-cols-2 gap-4">
                {systems.map((s, i) => (
                  <Reveal key={s.t} delay={i % 2 ? "rv-d1" : ""}>
                    <div className="q10-panel p-5 h-full">
                      <p className="f-mono text-[9px] tracking-[0.22em]" style={{ color: s.c }}>{s.t}</p>
                      <p className="f-hud font-bold text-lg text-white mt-2">{s.v}</p>
                      <p className="text-[13px] text-[#9aa3c7] mt-2 leading-relaxed">{s.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ D4 · PRODUCTS ═══ */}
        <section id="d4" className="px-5 py-24 border-t border-[#a855f7]/20 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D4" tag="Products" color="#ff2bd6" title={<>Quantum <span className="g-mg">nodes.</span></>}
              sub="9 featured nodes. Hover to inspect core code — click to collapse the full case study." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p, i) => (
                <Reveal key={p.n} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <ProjectNode project={p} onOpen={() => setOpenApp(p)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ D5 · IMPACT ═══ */}
        <section id="d5" className="px-5 py-24 border-t border-[#a855f7]/20 bg-[#07021c]/50 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D5" tag="Impact" color="#b6ff2e" title={<>Observations, <span className="g-lm">not promises.</span></>}
              sub="What collapsed into reality: users, merchants and the teams who shipped alongside." />
            <div className="grid lg:grid-cols-3 gap-4 mb-4">
              <Reveal className="lg:col-span-2">
                <div className="q10-panel p-6 sm:p-8 h-full">
                  <span className="q10-tick qt-tl" /><span className="q10-tick qt-br" />
                  <p className="f-mono text-[10px] tracking-[0.24em] text-[#b6ff2e] mb-4">USER WAVEFUNCTION // 2019→2026</p>
                  <WaveStrip color="#b6ff2e" className="w-full h-[120px]" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {[["10M+", "TOTAL REACH"], ["1.2M", "PULSESYNC"], ["5.2M", "LEGEND SUITE"], ["4.8★", "PLAY RATING"]].map(([v, l]) => (
                      <div key={l}>
                        <p className="f-display font-extrabold text-xl sm:text-2xl text-white">{v}</p>
                        <p className="f-mono text-[9px] text-[#9aa3c7] tracking-widest mt-1">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay="rv-d1">
                <div className="q10-panel q10-panel-lm p-6 h-full flex flex-col">
                  <p className="f-mono text-[10px] tracking-[0.24em] text-[#ffb020]">MERCHANT ENTANGLEMENT</p>
                  <p className="f-display font-extrabold text-5xl mt-3 text-white">1,200</p>
                  <p className="f-mono text-[10px] text-[#9aa3c7] mt-1 tracking-widest">STORES LIVE · POS ULTIMATE</p>
                  <div className="mt-auto pt-6 space-y-2 f-mono text-[11px]">
                    {[["crash-free", "99.98%"], ["cold start P90", "620ms"], ["build time", "−68%"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-[#a855f7]/20 pb-2">
                        <span className="text-[#9aa3c7]">{k}</span><span className="text-[#b6ff2e] font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <Reveal key={t.n} delay={i === 1 ? "rv-d1" : i === 2 ? "rv-d2" : ""}>
                  <figure className="q10-panel p-6 h-full flex flex-col">
                    <span className="f-display text-4xl text-[#a855f7] leading-none">“</span>
                    <blockquote className="text-[14px] text-[#dbe4ff] leading-relaxed mt-2 flex-1">{t.q}</blockquote>
                    <figcaption className="mt-5 pt-4 border-t border-[#a855f7]/20">
                      <p className="f-hud text-[12px] text-white">{t.n}</p>
                      <p className="f-mono text-[10px] text-[#00f5ff] mt-0.5">{t.r}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ D6 · NEURAL ═══ */}
        <section id="d6" className="px-5 py-24 border-t border-[#a855f7]/20 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D6" tag="Neural Edge" color="#00f5ff" title={<>Intelligence <span className="g-cy">at the edge.</span></>}
              sub="Private-by-default AI. On-device inference, agentic workflows, zero cloud cost." />
            <div className="grid lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-5"><Reveal><div className="q10-panel p-6 grid place-items-center"><ConstellationWeb size={340} /></div></Reveal></div>
              <div className="lg:col-span-7 space-y-4">
                {neuralWork.map((n, i) => (
                  <Reveal key={n.t} delay={i % 2 ? "rv-d1" : ""}>
                    <div className="q10-panel p-5 flex items-start gap-4">
                      <span className="f-mono text-[9px] tracking-widest px-2 py-1 border shrink-0 mt-1" style={{ color: n.c, borderColor: `${n.c}66` }}>{n.s}</span>
                      <div className="min-w-0">
                        <h3 className="f-hud text-base text-white">{n.t}</h3>
                        <p className="text-[13px] text-[#9aa3c7] mt-1 leading-relaxed">{n.d}</p>
                        <p className="f-mono text-[10px] mt-2" style={{ color: n.c }}>{n.m}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DOCTRINE ═══ */}
        <section className="px-5 py-24 border-t border-[#a855f7]/20 bg-[#07021c]/50">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D6+" tag="Doctrine" color="#ffb020" title={<>Six rules I<br />won't negotiate.</>}
              sub="A studio is a set of refusals. All enforced in CI, not on slides." />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctrine.map((d, i) => (
                <Reveal key={d.t} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <div className="q10-panel p-6 h-full" style={{ borderStyle: "dashed" }}>
                    <span className="f-display font-black text-3xl text-[#ffb020]">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="f-display font-bold text-base text-white mt-3">{d.t}</h3>
                    <p className="text-sm text-[#9aa3c7] leading-relaxed mt-2">{d.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ D7 · FORTRESS ═══ */}
        <section id="d7" className="px-5 py-24 border-t border-[#ff4d6d]/20 bg-[#07021c]/50 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D7" tag="Fortress" color="#ff4d6d" title={<>Six-layer <span className="text-[#ff4d6d]">defense.</span></>}
              sub="OWASP MASVS L2. Defense in depth — every layer holds independently." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityLayers.map((s, i) => (
                <Reveal key={s.l} delay={i % 3 === 1 ? "rv-d1" : i % 3 === 2 ? "rv-d2" : ""}>
                  <div className="q10-panel p-6 h-full">
                    <span className="q10-tick qt-tl" />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.i}</span>
                      <span className="f-hud text-lg font-bold" style={{ color: "#ff4d6d" }}>{s.l}</span>
                    </div>
                    <h3 className="f-hud text-[12px] text-white mt-3 tracking-wider">{s.t}</h3>
                    <p className="f-mono text-[11px] text-[#9aa3c7] mt-1.5 leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TIMELINE ═══ */}
        <section className="px-5 py-24 border-t border-[#a855f7]/20 bg-[#07021c]/50">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D9+" tag="Flight Record" color="#b6ff2e" title={<>Seven ages<br />of shipping.</>}
              sub="From first Play Store release to the current founder-engineer orbit." />
            <div className="relative space-y-0 max-w-3xl">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#00f5ff] via-[#a855f7] to-transparent" />
              {timeline.map((t, i) => (
                <Reveal key={t.y} delay={i % 2 === 1 ? "rv-d1" : ""}>
                  <div className="relative pl-10 pb-8 last:pb-0">
                    <span className="absolute left-[6px] top-4 w-2 h-2 rounded-full bg-[#ffb020]" style={{ boxShadow: "0 0 10px #ffb020" }} />
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="f-display font-bold text-xl text-white">{t.y}</p>
                      <span className="f-mono text-[10px] text-[#3dd6bd] uppercase tracking-widest">{t.t}</span>
                    </div>
                    <p className="text-sm text-[#a7b3c4] mt-1.5 leading-relaxed">{t.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ D8 · VELOCITY ═══ */}
        <section id="d8" className="px-5 py-24 border-t border-[#ffb020]/20 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D8" tag="Velocity" color="#ffb020" title={<>Speed is <span className="g-am">measured.</span></>}
              sub="Performance budgets enforced in CI. Shipping fast without breaking is the admission ticket." />
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                {velocity.map((v, i) => (
                  <Reveal key={v.k} delay={i % 2 ? "rv-d1" : ""}>
                    <div className="q10-panel p-4 h-full">
                      <p className="f-mono text-[9px] tracking-[0.18em] text-[#ffb020]">{v.k}</p>
                      <p className="f-display font-extrabold text-2xl text-white mt-2">{v.v}</p>
                      <p className="f-mono text-[9px] text-[#5b5b8a] mt-1">{v.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="lg:col-span-7 space-y-4">
                <Reveal>
                  <div className="q10-panel p-6">
                    <span className="q10-tick qt-tl" /><span className="q10-tick qt-br" />
                    <p className="f-mono text-[10px] tracking-[0.24em] text-[#ffb020] mb-4">CI/CD PIPELINE // 7 STAGES</p>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {pipeline.map((p) => (
                        <div key={p.n} className="border px-3.5 py-3 flex items-center gap-3" style={{ borderColor: `${p.c}44`, background: `${p.c}0a` }}>
                          <span className="f-hud font-bold text-sm" style={{ color: p.c }}>{p.n}</span>
                          <div className="min-w-0">
                            <p className="f-hud text-[11px] text-white">{p.t}</p>
                            <p className="f-mono text-[9px] text-[#5b5b8a]">{p.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#a855f7]/20 flex items-center justify-between f-mono text-[10px]">
                      <span className="text-[#9aa3c7]">TOTAL PIPELINE</span>
                      <span className="text-[#b6ff2e] font-bold">~11 MIN · ZERO ROLLBACKS</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ D9 · CONSTELLATION ═══ */}
        <section id="d9" className="px-5 py-24 border-t border-[#a855f7]/20 bg-[#07021c]/50 scroll-mt-16">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D9" tag="Constellation" color="#7dd7ff" title={<>Entangled <span className="glow-cy">nodes.</span></>}
              sub="Social surfaces, GitHub mesh and verified credentials." />
            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5"><Reveal><div className="q10-panel p-6 grid place-items-center"><ConstellationWeb size={340} count={16} /></div></Reveal></div>
              <div className="lg:col-span-7 space-y-4">
                <Reveal>
                  <div className="q10-panel p-6">
                    <p className="f-mono text-[10px] tracking-[0.24em] text-[#00f5ff] mb-4">SOCIAL SURFACES</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {socials.map((s) => (
                        <a key={s.n} href={s.u} target="_blank" rel="noreferrer" className="flex items-center justify-between border border-[#a855f7]/25 px-3 py-2.5 hover:border-[#00f5ff] transition group">
                          <span><span className="block f-hud text-[11px] text-white">{s.n}</span><span className="block f-mono text-[9px] text-[#9aa3c7] truncate">{s.h}</span></span>
                          <FiArrowUpRight className="text-[#a855f7] group-hover:text-[#00f5ff] shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay="rv-d1">
                  <div className="q10-panel p-6">
                    <p className="f-mono text-[10px] tracking-[0.24em] text-[#b6ff2e] mb-3 flex items-center gap-2"><FaGithub /> 43 GITHUB PAGES MESH</p>
                    <div className="flex flex-wrap gap-1.5">
                      {githubPages.map((g) => (
                        <a key={g} href={`https://${g}.github.io/`} target="_blank" rel="noreferrer" className="f-mono text-[10px] text-[#9aa3c7] hover:text-[#b6ff2e] transition">{g}</a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ D10 · SINGULARITY ═══ */}
        <section id="d10" className="px-5 py-24 border-t border-[#ff2bd6]/20 scroll-mt-16 relative overflow-hidden">
          <div className="max-w-[1420px] mx-auto">
            <SectionHead dim="D10" tag="Singularity" color="#ff2bd6" title={<>Next <span className="g-mg">superposition.</span></>}
              sub="On-device AI, regional language models — and an open channel to you." />
            <div className="grid lg:grid-cols-2 gap-4">
              <Reveal>
                <div className="q10-panel p-6 sm:p-8 h-full">
                  <span className="q10-tick qt-tl" /><span className="q10-tick qt-br" />
                  <p className="f-mono text-[10px] tracking-[0.24em] text-[#ffb020]">NOW COMPILING // 2026</p>
                  <h3 className="f-display font-extrabold text-2xl sm:text-3xl text-white mt-3">MoekyawTranslator</h3>
                  <p className="text-[14px] text-[#9aa3c7] mt-3 leading-relaxed max-w-md">
                    Burmese ↔ English translation with a Claude-powered cloud path and a quantized TFLite
                    fallback that works fully offline. 12K on the waitlist.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {["Claude API", "TFLite", "Kotlin", "Compose", "On-device"].map((s) => (
                      <span key={s} className="f-mono text-[10px] border border-[#ffb020]/35 px-2.5 py-1 text-[#ffb020]">{s}</span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between f-mono text-[10px] text-[#9aa3c7] mb-2">
                      <span>COMPLETION PROBABILITY</span><span className="text-[#b6ff2e]">67%</span>
                    </div>
                    <div className="h-2 bg-[#a855f7]/15 overflow-hidden">
                      <div className="h-full w-[67%]" style={{ background: "linear-gradient(90deg,#a855f7,#00f5ff)", boxShadow: "0 0 14px #00f5ff" }} />
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay="rv-d1">
                <div className="q10-panel p-6 sm:p-8 h-full" style={{ borderColor: "rgba(182,255,46,.35)" }}>
                  <p className="f-mono text-[10px] tracking-[0.24em] text-[#b6ff2e]">COLLAPSE THE WAVEFUNCTION ↓</p>
                  <h3 className="f-display font-extrabold text-2xl sm:text-3xl text-white mt-3 leading-tight">Open a channel.</h3>
                  <p className="text-[14px] text-[#9aa3c7] mt-3">Senior / Staff / founding-engineer roles · audits · focused MVPs. Replies within 24h.</p>
                  <div className="mt-6 space-y-3">
                    <button onClick={copyEmail} className="w-full flex items-center justify-between border border-[#b6ff2e]/40 bg-[#b6ff2e]/5 px-4 py-3 hover:bg-[#b6ff2e] hover:text-[#03000e] transition group">
                      <span className="f-mono text-[12px] break-all group-hover:text-[#03000e]">{profile.email}</span>
                      <span className="f-mono text-[10px] shrink-0 ml-2 flex items-center gap-1">
                        {copied ? <><FiCheck /> COPIED</> : <><FiCopy /> COPY</>}
                      </span>
                    </button>
                    {profile.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center justify-between border border-[#a855f7]/30 px-4 py-3 hover:border-[#00f5ff] transition group">
                        <span className="f-hud text-sm text-white">{p}</span>
                        <span className="f-mono text-[10px] text-[#9aa3c7] group-hover:text-[#00f5ff]">VOICE →</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#a855f7]/25 px-5 py-10 relative z-10 bg-[#03000e]/85">
        <div className="max-w-[1420px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#00f5ff]/60" />
            <div>
              <p className="f-hud text-[12px] text-white">{profile.name} · {profile.nameMM}</p>
              <p className="f-mono text-[9px] text-[#9aa3c7] tracking-[0.2em] mt-0.5">{profile.mantra.toUpperCase()}</p>
            </div>
          </div>
          <p className="f-mono text-[10px] text-[#5b5b8a] tracking-wider">© 2026 · {profile.code} · {profile.location.toUpperCase()}</p>
        </div>
      </footer>

      {openApp && <Decode app={openApp} onClose={() => setOpenApp(null)} />}
    </div>
  );
}

function ProjectNode({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} onClick={onOpen} className={`qnode p-5 cursor-pointer group ${on ? "in" : ""}`}>
      <span className="q10-tick qt-tl" /><span className="q10-tick qt-tr" />
      <span className="q10-tick qt-bl" /><span className="q10-tick qt-br" />
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <span className="text-3xl drop-shadow-[0_0_10px_rgba(0,245,255,.6)]">{project.icon}</span>
          <span className={`f-mono text-[9px] tracking-widest px-2 py-0.5 border ${
            project.status === "FLAGSHIP" ? "text-[#ffb020] border-[#ffb020]/50"
            : project.status === "BETA" ? "text-[#ff2bd6] border-[#ff2bd6]/50"
            : "text-[#00f5ff] border-[#00f5ff]/50"}`}>{project.status}</span>
        </div>
        <p className="f-mono text-[9px] tracking-widest text-[#5b5b8a] mt-4">NODE_{String(project.n).padStart(2, "0")}</p>
        <h3 className="f-hud text-base text-white mt-1 group-hover:text-[#00f5ff] transition">{project.name}</h3>
        <p className="f-mono text-[10px] text-[#c4a6ff] mt-0.5 tracking-wider">{project.cat}</p>
        <p className="text-sm text-[#9aa3c7] mt-3 leading-snug lc2">{project.desc}</p>
        <div className="mt-4 pt-3 border-t border-[#a855f7]/20 flex items-center justify-between">
          <span className="f-display font-extrabold text-sm glow-cy">{project.users}</span>
          <span className="f-mono text-[9px] text-[#ff2bd6]">COLLAPSE ▸</span>
        </div>
      </div>
    </div>
  );
}

function Decode({ app, onClose }: { app: Project; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-[#03000e]/94 backdrop-blur-lg" onClick={onClose}>
      <div className="q10-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto no-bar modal-in"
        style={{ borderColor: "rgba(0,245,255,.55)" }} onClick={(e) => e.stopPropagation()}>
        <span className="q10-tick qt-tl" /><span className="q10-tick qt-tr" />
        <span className="q10-tick qt-bl" /><span className="q10-tick qt-br" />
        <div className="p-6 sm:p-8 relative z-10">
          <div className="flex justify-between gap-4">
            <div className="flex gap-4">
              <span className="text-4xl">{app.icon}</span>
              <div>
                <p className="f-mono text-[10px] text-[#00f5ff] tracking-widest">NODE_{String(app.n).padStart(2, "0")} · {app.cat}</p>
                <h2 className="f-display font-extrabold text-2xl text-white mt-1">{app.name}</h2>
                <p className="f-mono text-xs text-[#ff2bd6] mt-1">{app.status} · {app.users}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 grid place-items-center border border-[#ff2bd6] text-[#ff2bd6] hover:bg-[#ff2bd6] hover:text-[#03000e] transition shrink-0" aria-label="Close"><FiX /></button>
          </div>
          <p className="mt-6 text-[#dbe4ff] leading-relaxed">{app.desc}</p>
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            {[["PROBLEM", app.problem, "#ff2bd6"], ["BUILD", app.build, "#00f5ff"], ["RESULT", app.result, "#b6ff2e"]].map(([t, d, c]) => (
              <div key={t} className="border p-3.5" style={{ borderColor: `${c}55`, background: `${c}09` }}>
                <p className="f-mono text-[9px] tracking-[0.2em]" style={{ color: c }}>{t}</p>
                <p className="text-xs text-[#dbe4ff] mt-1.5 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 border border-[#00f5ff]/20 bg-[#03000e]">
            <div className="px-3 py-2 border-b border-[#00f5ff]/15 f-mono text-[10px] text-[#00f5ff]">{app.name.replace(/\s/g, "_")}.kt</div>
            <div className="p-4 overflow-auto"><Code code={app.code} /></div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {app.stack.map((s) => <span key={s} className="f-mono text-[10px] border border-[#a855f7]/30 px-2 py-1 text-[#9aa3c7]">{s}</span>)}
          </div>
          <a href={app.repo} target="_blank" rel="noreferrer" className="q10-btn mt-6 inline-flex items-center gap-2 !text-[10px]">
            <FaGithub /> OPEN REPOSITORY
          </a>
        </div>
      </div>
    </div>
  );
}
