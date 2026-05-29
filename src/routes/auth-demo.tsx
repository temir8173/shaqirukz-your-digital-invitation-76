import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AuthModal } from "@/components/AuthModal";

type Step = "username" | "code" | "deeplink";

export const Route = createFileRoute("/auth-demo")({
  component: AuthDemoPage,
  head: () => ({ meta: [{ title: "Auth Modal — ShaqyruAI" }] }),
});

function AuthDemoPage() {
  const [open, setOpen] = useState<Step | null>(null);

  const steps: { id: Step; label: string; desc: string }[] = [
    { id: "username", label: "1. Username", desc: "Telegram username енгізу" },
    { id: "code", label: "2a. Код", desc: "6 цифрлік OTP" },
    { id: "deeplink", label: "2b. Deeplink", desc: "Telegram бот арқылы" },
  ];

  return (
    <main className="min-h-screen bg-[#f5f3f0] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-brand mb-3">
          component preview
        </p>
        <h1 className="font-display text-4xl text-ink mb-2">Auth Modal</h1>
        <p className="text-ink-soft mb-10">Telegram арқылы кіру — үш күй</p>

        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setOpen(s.id)}
              className="text-left p-5 rounded-2xl bg-white border border-[#e8e0d8] hover:border-brand hover:-translate-y-0.5 transition-all shadow-[0_2px_8px_oklch(0.18_0.02_30/0.04)] hover:shadow-[0_12px_28px_-8px_oklch(0.18_0.02_30/0.12)] cursor-pointer"
            >
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-brand mb-2">
                {s.label}
              </p>
              <p className="font-display text-xl text-ink mb-1">{s.desc}</p>
              <p className="text-[12px] text-ink-soft mt-3">Көру →</p>
            </button>
          ))}
        </div>
      </div>

      <AuthModal open={open !== null} step={open ?? "username"} onClose={() => setOpen(null)} />
    </main>
  );
}