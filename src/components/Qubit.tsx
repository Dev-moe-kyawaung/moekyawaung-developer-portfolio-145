import { useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { agentKB, profile } from "../data";

type Msg = { from: "q" | "you"; text: string };

export default function Qubit() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "q", text: agentKB.greeting }]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy, open]);

  const ask = (preset?: string) => {
    const q = (preset ?? input).trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { from: "you", text: q }]);
    setInput("");
    setBusy(true);
    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "q", text: agentKB.answer(q) }]);
      setBusy(false);
    }, 520);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} aria-label="Open QUBIT v10"
        className="fixed bottom-6 right-6 z-[88] group">
        <span className="absolute -inset-3 rounded-full border border-[#00f5ff]/45 pulse-glow text-[#00f5ff]" />
        <span className="absolute -inset-6 rounded-full border border-[#a855f7]/25 spin-slow">
          <span className="absolute top-0 left-1/2 w-1.5 h-1.5 -ml-[3px] rounded-full bg-[#ff2bd6]" style={{ boxShadow: "0 0 12px #ff2bd6" }} />
        </span>
        <span className="absolute -inset-9 rounded-full border border-[#ff2bd6]/15 spin-rev">
          <span className="absolute bottom-0 left-1/2 w-1 h-1 -ml-[2px] rounded-full bg-[#00f5ff]" style={{ boxShadow: "0 0 10px #00f5ff" }} />
        </span>
        <span className="relative flex items-center gap-3 q10-panel rounded-full pl-2 pr-5 py-2">
          <span className="w-11 h-11 rounded-full grid place-items-center text-lg font-bold text-white shrink-0"
            style={{ background: "conic-gradient(from 40deg,#00f5ff,#a855f7,#ff2bd6,#ffb020,#00f5ff)", boxShadow: "0 0 28px rgba(0,245,255,.55)" }}>
            Ψ
          </span>
          <span className="text-left">
            <span className="block f-hud font-bold text-[11px] text-white tracking-[0.18em]">QUBIT v10</span>
            <span className="block f-mono text-[9px] text-[#00f5ff] tracking-widest">10D · ENTANGLED</span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[88] w-full sm:w-[440px] h-[100dvh] sm:h-[620px] sm:max-h-[85vh] q10-panel flex flex-col overflow-hidden"
      style={{ borderColor: "rgba(0,245,255,.55)", boxShadow: "0 0 55px rgba(0,245,255,.2), 0 25px 80px -30px rgba(0,0,0,.95)" }}>
      <span className="q10-tick qt-tl" /><span className="q10-tick qt-tr" />
      <span className="q10-tick qt-bl" /><span className="q10-tick qt-br" />
      <div className="flex items-center justify-between p-3.5 border-b border-[#a855f7]/25 bg-[#0d0526]/80">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full grid place-items-center text-base font-bold text-white shrink-0"
            style={{ background: "conic-gradient(from 40deg,#00f5ff,#a855f7,#ff2bd6,#ffb020,#00f5ff)", boxShadow: "0 0 22px rgba(0,245,255,.5)" }}>Ψ</span>
          <div>
            <p className="f-hud font-bold text-[11px] text-white tracking-[0.18em]">QUBIT v10 · 10D</p>
            <p className="f-mono text-[9px] text-[#00f5ff] tracking-[0.18em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6ff2e] pulse-glow text-[#b6ff2e]" />
              ENTANGLED · 43 REPOS INDEXED
            </p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-[#9aa3c7] hover:text-white transition" aria-label="Close"><FiX /></button>
      </div>

      <div className="flex-1 overflow-y-auto no-bar p-3.5 space-y-3 bg-[#03000e]/60">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] p-3 text-[13px] leading-relaxed border ${
              m.from === "you"
                ? "border-[#ff2bd6]/45 bg-[#ff2bd6]/10 text-[#ffd9f4]"
                : "border-[#00f5ff]/25 bg-[#0d0526] text-[#dbe4ff]"
            }`}>
              <div className="f-mono text-[9px] mb-1.5 tracking-widest" style={{ color: m.from === "you" ? "#ff2bd6" : "#00f5ff" }}>
                {m.from === "you" ? "▸ YOU" : "◂ QUBIT v10"}
              </div>
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-1.5 pl-1 items-center">
            <i className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
            <i className="w-1.5 h-1.5 rounded-full bg-[#a855f7] animate-pulse" style={{ animationDelay: ".15s" }} />
            <i className="w-1.5 h-1.5 rounded-full bg-[#ff2bd6] animate-pulse" style={{ animationDelay: ".3s" }} />
            <span className="f-mono text-[9px] text-[#9aa3c7] ml-1">collapsing wavefunction…</span>
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="px-3 py-2 border-t border-[#a855f7]/20 flex flex-wrap gap-1.5 bg-[#07021c]">
        {agentKB.quick.map((q) => (
          <button key={q} onClick={() => ask(q)}
            className="f-mono text-[9px] px-2 py-1 border border-[#a855f7]/30 text-[#9aa3c7] hover:text-[#00f5ff] hover:border-[#00f5ff] transition">
            +{q}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="p-3 flex gap-2 border-t border-[#a855f7]/20 bg-[#03000e]">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Query the 10D quantum field…"
          className="flex-1 bg-[#0d0526] border border-[#a855f7]/30 focus:border-[#00f5ff] outline-none px-3 py-2.5 f-mono text-xs text-white placeholder:text-[#5b5b8a]" />
        <button type="submit" className="w-11 grid place-items-center bg-[#00f5ff] text-[#03000e] hover:bg-[#ff2bd6] hover:text-white transition" aria-label="Send"><FiSend /></button>
      </form>
      <p className="pb-2 text-center f-mono text-[9px] text-[#5b5b8a] tracking-wider bg-[#03000e]">
        {profile.name} · GROUNDED IN 10 DIMENSIONS · 43 REPOS
      </p>
    </div>
  );
}
