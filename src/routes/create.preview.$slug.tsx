import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { mockTemplates, findTemplate } from "@/lib/templates-mock";

export const Route = createFileRoute("/create/preview/")({
  head: ({ params }) => ({
    meta: [{ title: `${findTemplate(params.slug)?.name ?? "Превью"} — ShaqiruKZ` }],
  }),
  component: TemplatePreviewView,
});

function TemplatePreviewView() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const tpl = useMemo(() => findTemplate(slug), [slug]);
  const idx = useMemo(() => mockTemplates.findIndex((t) => t.slug === slug), [slug]);
  const prev = mockTemplates[idx - 1] ?? null;
  const next = mockTemplates[idx + 1] ?? null;

  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [fadeKey, setFadeKey] = useState(slug);

  useEffect(() => {
    setIframeLoaded(false);
    setFadeKey(slug);
  }, [slug]);

  if (!tpl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link to="/create" className="text-[var(--brand)] underline">Назад к каталогу</Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--bg-off,var(--background))]">
      {/* Topbar */}
      <header className="sticky top-0 z-30 grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-border/60 bg-white/85 px-4 backdrop-blur-md">
        <Link
          to="/create"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Артқа
        </Link>
        <h1 className="truncate text-center font-display italic text-base md:text-lg text-foreground">
          {tpl.name}
        </h1>
        <div className="justify-self-end">
          <button
            onClick={() => navigate({ to: "/create/fill/$slug", params: { slug } })}
            className="cta-shimmer rounded-full px-5 py-2 text-sm font-medium text-[var(--brand-fg)]"
          >
            Таңдау →
          </button>
        </div>
      </header>

      {/* Iframe area */}
      <main className="relative flex-1 overflow-hidden bg-[oklch(0.97_0.01_60)]">
        {tpl.demo_url ? (
          <>
            <iframe
              key={fadeKey}
              src={tpl.demo_url}
              title={tpl.name}
              onLoad={() => setIframeLoaded(true)}
              className={`h-full w-full border-0 transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
            />
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.97_0.01_60/0.8)]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-[var(--brand)]" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <div className="phone-frame mx-auto w-[280px] overflow-hidden">
              <img src={tpl.preview_url} alt={tpl.name} className="w-full" />
            </div>
          </div>
        )}

        {/* Floating nav pill */}
        <div className="glass fixed bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full px-5 py-2.5 flex items-center gap-4">
          <button
            disabled={!prev}
            onClick={() => prev && navigate({ to: "/create/preview/$slug", params: { slug: prev.slug } })}
            className="text-xs text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)] disabled:opacity-25 disabled:hover:text-[var(--ink-soft)]"
          >
            ← Алдыңғы
          </button>
          <span className="font-mono-tech text-[0.7rem] tracking-[0.1em] text-[var(--ink-soft)]">
            {idx + 1} / {mockTemplates.length}
          </span>
          <button
            disabled={!next}
            onClick={() => next && navigate({ to: "/create/preview/$slug", params: { slug: next.slug } })}
            className="text-xs text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)] disabled:opacity-25 disabled:hover:text-[var(--ink-soft)]"
          >
            Келесі →
          </button>
        </div>
      </main>
    </div>
  );
}
