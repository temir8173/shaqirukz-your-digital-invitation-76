import { Calendar, Copy, Edit3, Trash2, Heart, Check } from "lucide-react";
import { useState } from "react";

export interface InvitationCardData {
  id: string | number;
  title: string;
  templateName: string;
  paid: boolean;
  date: string;
  url: string;
  bgImage: string;
}

export function InvitationCard({ data }: { data: InvitationCardData }) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`https://${data.url}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Bottom UI sits on a light wash, so use dark ink for contrast.
  const inkBorder = "border-[oklch(0.12_0.02_30/0.45)]";
  const inkText = "text-[oklch(0.12_0.02_30)]";
  const btnBase = `inline-flex items-center justify-center gap-1.5 rounded-md border ${inkBorder} bg-transparent ${inkText} backdrop-blur-[12px] transition-all hover:bg-[oklch(1_0_0/0.35)] hover:border-[oklch(0.12_0.02_30/0.7)]`;

  return (
    <article
      className="group relative aspect-[3/4] overflow-hidden rounded-[12px] bg-cover bg-center shadow-[0_8px_24px_-8px_oklch(0.18_0.02_30/0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_oklch(0.18_0.02_30/0.55)]"
      style={{ backgroundImage: `url(${data.bgImage})` }}
    >
      {/* Top dark overlay — gives white title contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0 0 0 / 0.45) 0%, oklch(0 0 0 / 0) 35%)",
        }}
      />
      {/* Bottom light wash — lets dark-ink controls read clearly */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(1 0 0 / 0) 55%, oklch(0.98 0.01 80 / 0.62) 78%, oklch(0.98 0.01 80 / 0.85) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col p-3.5">
        {/* Top */}
        <div className="text-white" style={{ textShadow: "0 1px 8px oklch(0 0 0 / 0.45)" }}>
          <div className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-white/70">
            {data.templateName}
          </div>
          <div className="mt-1.5 flex items-start justify-between gap-2">
            <h3 className="font-display italic text-[18px] leading-tight text-white line-clamp-2">
              {data.title}
            </h3>
            <span
              style={{ textShadow: "none" }}
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono-tech text-[9.5px] uppercase tracking-wider backdrop-blur-[12px] bg-[oklch(0_0_0/0.45)] ${
                data.paid
                  ? "border-[oklch(0.78_0.18_145/0.55)] text-[oklch(0.9_0.16_145)]"
                  : "border-[oklch(0.82_0.16_85/0.55)] text-[oklch(0.92_0.16_90)]"
              }`}
            >
              {data.paid ? "Оплачено" : "Не оплачено"}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className={`mt-auto space-y-2 ${inkText}`}>
          <div className="flex items-center gap-1.5 text-[11px]">
            <Calendar className="h-3 w-3" />
            <span>{data.date}</span>
          </div>

          {/* URL */}
          <div className={`flex items-center gap-1 rounded-md border ${inkBorder} bg-transparent px-2 py-1 backdrop-blur-[12px]`}>
            <span className="font-mono-tech truncate text-[10.5px]">
              {data.url}
            </span>
            <button
              onClick={copy}
              aria-label="Копировать ссылку"
              className="ml-auto inline-flex h-5 w-5 shrink-0 items-center justify-center rounded transition-colors hover:bg-[oklch(0_0_0/0.08)]"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>

          {!data.paid && (
            <button
              className="w-full rounded-md border border-[oklch(0.5_0.16_30/0.6)] bg-[oklch(0.55_0.13_17/0.92)] py-1.5 font-mono-tech text-[10.5px] uppercase tracking-wider text-white transition-all hover:bg-[oklch(0.5_0.14_20)] backdrop-blur-[12px]"
            >
              Оплатить
            </button>
          )}

          {/* Action row */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <button className={`${btnBase} px-2.5 py-1 text-[10.5px]`}>
              <Heart className="h-3 w-3" />
              <span>Тілектер</span>
            </button>
            <div className="flex gap-1.5">
              <button
                aria-label="Редактировать"
                className={`${btnBase} h-7 w-7`}
              >
                <Edit3 className="h-3 w-3" />
              </button>
              <button
                aria-label="Удалить"
                className={`${btnBase} h-7 w-7 hover:!border-[oklch(0.7_0.2_25)] hover:!bg-[oklch(0.55_0.2_25/0.3)]`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}