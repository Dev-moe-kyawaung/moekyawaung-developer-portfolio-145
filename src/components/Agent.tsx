import { useEffect, useRef, useState } from "react";
import { FiSend, FiX } from "react-icons/fi";
import { agentKB, profile } from "../data";

type Msg = { from: "q" | "you"; text: string };

export default function Agent() {
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
    }, 540);
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} aria-label="Open QUBIT assistant"
        className="fixed bottom-6 right-6 z-[85] group">
        <span className="absolute -inset-3 rounded-full border border-[#00f0ff]/40 pulse-glow text-[#00f0ff]" />
        <span className="absolute -inset-6 rounded-full border border-[#8b5cf6]/25" style={{ animation: "spinSlow 12s linear infinite" }}>
          <span className="absolute top-0 left-1/2 w-1.5 h-1.5 -ml-[3px] rounded-full bg-[#ff2fb3]" style={{ boxShadow: "0 0 10px #ff2fb3" }} />
        </span>
        <span className="relative flex items-center gap-3 q-panel rounded-full pl-2 pr-5 py-2">
          <span className="w-10 h-10 rounded-full grid place-items-center text-sm font-bold text-white"
            style={{ background: "conic-gradient(from 0deg, #00f0ff, #8b5cf6, #ff2fb3, #00f0ff)" }}>
            Ψ
          </span>
          <span className="text-left">
            <span className="block f-hud font-bold text-[11px] text-white tracking-[0.18em]">QUBIT</span>
            <span className="block f-mono text-[9px] text-[#00f0ff] tracking-widest">ASK ANYTHING</span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[85] w-full sm:w-[430px] h-[100dvh] sm:h-[610px] sm:max-h-[84vh] q-panel flex flex-col overflow-hidden">
      <span className="q-corner q-tl" /><span className="q-corner q-tr" />
      <span className="q-corner q-bl" /><span className="q-corner q-br" />
      <div className="flex items-center justify-between p-3.5 border-b border-[#8b5cf6]/25 bg-[#0c0633]/80">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full grid place-items-center text-sm font-bold text-white"
            style={{ background: "conic-gradient(from 40deg, #00f0ff, #8b5cf6, #ff2fb3, #00f0ff)" }}>Ψ</span>
          <div>
            <p className="f-hud font-bold text-[11px] text-white tracking-[0.16em]">QUBIT v5.0</p>
            <p className="f-mono text-[9px] text-[#00f0ff] tracking-[0.16em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6ff2e] pulse-glow text-[#b6ff2e]" /> ENTANGLED · 43 REPOS INDEXED
            </p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-[#9aa3c7] hover:text-white transition" aria-label="Close"><FiX /></button>
      </div>

      <div className="flex-1 overflow-y-auto no-bar p-3.5 space-y-3 bg-[#030014]/60">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] p-3 text-[13px] leading-relaxed border ${
              m.from === "you"
                ? "border-[#ff2fb3]/45 bg-[#ff2fb3]/10 text-[#ffd9f4]"
                : "border-[#00f0ff]/25 bg-[#0c0633] text-[#dbe4ff]"
            }`}>
              <div className="f-mono text-[9px] mb-1" style={{ color: m.from === "you" ? "#ff2fb3" : "#00f0ff" }}>
                {m.from === "you" ? "▸ YOU" : "◂ QUBIT"}
              </div>
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-1.5 pl-1 items-center">
            <i className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <i className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse" style={{ animationDelay: ".15s" }} />
            <i className="w-1.5 h-1.5 rounded-full bg-[#ff2fb3] animate-pulse" style={{ animationDelay: ".3s" }} />
            <span className="f-mono text-[9px] text-[#9aa3c7] ml-1">collapsing wavefunction…</span>
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="px-3 py-2 border-t border-[#8b5cf6]/20 flex flex-wrap gap-1.5 bg-[#07022a]">
        {["POS impact?", "Offline-first?", "Modularization?", "CI pipeline?", "Security?", "Contact"].map((q) => (
          <button key={q} onClick={() => ask(q)}
            className="f-mono text-[10px] px-2 py-1 border border-[#8b5cf6]/30 text-[#9aa3c7] hover:text-[#00f0ff] hover:border-[#00f0ff] transition">
            +{q}
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(); }} className="p-3 flex gap-2 border-t border-[#8b5cf6]/20 bg-[#030014]">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Query the quantum field…"
          className="flex-1 bg-[#0c0633] border border-[#8b5cf6]/30 focus:border-[#00f0ff] outline-none px-3 py-2.5 f-mono text-xs text-white placeholder:text-[#5b5b8a]" />
        <button type="submit" className="w-11 grid place-items-center bg-[#00f0ff] text-[#030014] hover:bg-[#ff2fb3] hover:text-white transition" aria-label="Send">
          <FiSend />
        </button>
      </form>
      <p className="pb-2 text-center f-mono text-[9px] text-[#5b5b8a] tracking-wider bg-[#030014]">{profile.name} · GROUNDED IN 43 REPOS</p>
    </div>
  );
}
