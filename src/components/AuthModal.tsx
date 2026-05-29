import { useEffect, useRef, useState } from "react";
import { X, Send, Loader2 } from "lucide-react";

type Step = "username" | "code" | "deeplink";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  step?: Step;
}

export function AuthModal({ open, onClose, step = "username" }: AuthModalProps) {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (step === "code") inputsRef.current[0]?.focus();
  }, [step, open]);

  if (!open) return null;

  const handleCodeChange = (idx: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[oklch(0.18_0.02_30/0.45)] backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-[420px] bg-white rounded-t-[20px] sm:rounded-2xl shadow-[0_24px_60px_-12px_oklch(0.18_0.02_30/0.25)] p-7 sm:p-9 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-ink-soft hover:bg-[oklch(0.96_0.012_60)] hover:text-ink transition-colors cursor-pointer"
        >
          <X size={18} strokeWidth={1.8} />
        </button>

        {/* Header */}
        <div className="mb-7">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-brand mb-2">
            shaqyru.ai
          </p>
          <h2 className="font-display text-[32px] leading-tight text-ink">Кіру</h2>
          <p className="text-[13px] text-ink-soft mt-1.5">Telegram арқылы кіріңіз</p>
        </div>

        {step === "username" && <UsernameStep />}
        {step === "code" && (
          <CodeStep
            code={code}
            inputsRef={inputsRef}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
          />
        )}
        {step === "deeplink" && <DeeplinkStep />}

        {/* Footer */}
        <p className="text-[11px] text-ink-soft/80 text-center mt-6 leading-relaxed">
          Жалғастыру арқылы сіз{" "}
          <a className="text-brand hover:underline" href="#">
            шарттарды
          </a>{" "}
          қабылдайсыз
        </p>
      </div>
    </div>
  );
}

function UsernameStep() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="tg-username" className="block text-[12px] font-medium text-ink">
          Telegram username
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand pointer-events-none">
            <Send size={16} strokeWidth={1.8} />
          </div>
          <input
            id="tg-username"
            type="text"
            placeholder="@username"
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-[#e0d8d2] text-[14px] text-ink placeholder:text-[oklch(0.65_0.02_30)] outline-none transition-all focus:border-brand focus:ring-4 focus:ring-[oklch(0.55_0.13_17/0.1)]"
          />
        </div>
      </div>

      <button className="w-full h-12 rounded-xl cta-shimmer text-white font-medium text-[14px] tracking-wide cursor-pointer">
        Жалғастыру
      </button>
    </div>
  );
}

function CodeStep({
  code,
  inputsRef,
  onChange,
  onKeyDown,
}: {
  code: string[];
  inputsRef: React.MutableRefObject<Array<HTMLInputElement | null>>;
  onChange: (i: number, v: string) => void;
  onKeyDown: (i: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-5">
      <p className="text-[13px] text-ink leading-relaxed">
        Telegram-да жіберілген кодты енгізіңіз
      </p>

      <div className="flex gap-2 justify-between">
        {code.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            value={d}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-14 rounded-xl bg-white border border-[#e0d8d2] text-center text-[20px] font-mono-tech text-ink outline-none transition-all focus:border-brand focus:ring-4 focus:ring-[oklch(0.55_0.13_17/0.1)]"
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-[12px] text-ink-soft pt-1">
        <Loader2 size={14} className="animate-spin text-brand" />
        <span>Тексерілуде…</span>
      </div>

      <button className="w-full text-[12px] text-ink-soft hover:text-brand transition-colors cursor-pointer">
        Кодты қайта жіберу
      </button>
    </div>
  );
}

function DeeplinkStep() {
  return (
    <div className="space-y-5">
      <p className="text-[13px] text-ink leading-relaxed">
        Telegram ботын ашып, авторизацияны растаңыз
      </p>

      <a
        href="https://t.me/shaqyru_bot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 w-full h-14 rounded-xl bg-[#229ED9] hover:bg-[#1e8bc0] text-white font-medium text-[15px] transition-colors cursor-pointer shadow-[0_8px_20px_-6px_rgba(34,158,217,0.5)]"
      >
        <Send size={18} strokeWidth={2} />
        Telegram арқылы кіру
      </a>

      <div className="flex items-center justify-center gap-2 text-[12px] text-ink-soft">
        <Loader2 size={14} className="animate-spin text-brand" />
        <span>Растауды күтуде…</span>
      </div>
    </div>
  );
}