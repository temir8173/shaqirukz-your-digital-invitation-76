import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { mockTemplates, categories, stylesList, categoryLabel, type Template } from "@/lib/templates-mock";

export const Route = createFileRoute("/create/")({
  head: () => ({
    meta: [
      { title: "Дайын үлгілер — ShaqiruKZ" },
      { name: "description", content: "Свадебные и тойные шаблоны веб-приглашений: казахские, европейские, модерн." },
    ],
  }),
  component: TemplateListView,
});

function TemplateListView() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [style, setStyle] = useState("");
  const [loading, setLoading] = useState(true);
  const [refiltering, setRefiltering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;
    setRefiltering(true);
    const t = setTimeout(() => setRefiltering(false), 280);
    return () => clearTimeout(t);
  }, [cat, style, query, loading]);

  const filtered = useMemo(() => {
    return mockTemplates.filter((t) => {
      if (cat && t.category !== cat) return false;
      if (style && t.style !== style) return false;
      if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [cat, style, query]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero strip */}
      <section className="relative overflow-hidden bg-[var(--brand-deep)] hero-grid">
        <div className="hero-glow absolute -top-32 -left-20 opacity-30" />
        <div className="relative mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 py-12 md:py-16">
          <div>
            <Link to="/" className="font-mono-tech text-[0.65rem] uppercase tracking-[0.18em] text-[color:oklch(0.98_0.01_80/0.55)] hover:text-[var(--brand-fg)] transition-colors">
              ← ShaqiruKZ
            </Link>
            <h1 className="font-display italic text-[2rem] md:text-[2.6rem] leading-tight text-[var(--brand-fg)] glow-text mt-2">
              Дайын үлгілер
            </h1>
            <p className="mt-2 text-sm text-[color:oklch(0.98_0.01_80/0.6)] max-w-md">
              Выбери шаблон, заполни поля — и получи свою страницу-приглашение за минуты.
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[oklch(1_0_0/0.15)] bg-[oklch(1_0_0/0.06)] px-3 py-1.5 font-mono-tech text-xs text-[var(--brand-fg)] backdrop-blur">
            <span className="pulse-dot" />
            {mockTemplates.length}+ үлгі
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-[var(--shadow-soft)] transition-shadow focus-within:shadow-[0_0_0_3px_oklch(0.55_0.13_17/0.12)]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Шаблонды іздеу..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button className="cta-shimmer inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--brand-fg)]" aria-label="Search">
            <Search className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 -mx-2 flex gap-2 overflow-x-auto px-2 pb-2 scrollbar-none">
          {categories.map((c) => {
            const active = cat === c.key;
            return (
              <button
                key={c.key || "all"}
                onClick={() => setCat(c.key)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 font-mono-tech text-xs uppercase tracking-wide transition-all ${
                  active
                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "bg-card text-[var(--ink-soft)] border-border hover:border-[var(--brand)]"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {stylesList.map((s) => {
            const active = style === s.key;
            return (
              <button
                key={s.key || "any"}
                onClick={() => setStyle(s.key)}
                className={`rounded-md border px-2.5 py-1 text-xs transition-all ${
                  active
                    ? "border-[var(--brand)] bg-[oklch(0.55_0.13_17/0.08)] text-[var(--brand)]"
                    : "border-border bg-card text-[var(--ink-soft)] hover:border-[var(--brand)]/60"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-2xl bg-[oklch(0.93_0.01_40)]"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState onReset={() => { setCat(""); setStyle(""); setQuery(""); }} />
        ) : (
          <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 transition-opacity duration-200 ${refiltering ? "opacity-45" : "opacity-100"}`}>
            {filtered.map((tpl, i) => (
              <TemplateCard key={tpl.id} tpl={tpl} delay={i * 50} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TemplateCard({ tpl, delay }: { tpl: Template; delay: number }) {
  const free = tpl.actual_price === 0;
  return (
    <Link
      to="/create/preview/$slug"
      params={{ slug: tpl.slug }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] animate-[fade-in_0.5s_ease_both]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={tpl.preview_url}
          alt={tpl.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute bottom-2 left-2 rounded-full border border-white/40 bg-white/65 backdrop-blur px-2.5 py-0.5 font-mono-tech text-[0.65rem] tracking-wide ${
            free ? "text-[oklch(0.45_0.16_145)]" : "text-[var(--brand)]"
          }`}
        >
          {free ? "Тегін" : `${tpl.actual_price.toLocaleString("ru-RU")} ₸`}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="font-display text-[1.05rem] leading-tight text-foreground line-clamp-1">{tpl.name}</h3>
        <span className="font-mono-tech text-[0.65rem] uppercase tracking-wider text-[var(--brand)]">
          {categoryLabel(tpl.category)}
        </span>
        <div className="mt-auto pt-1">
          <span className="block w-full rounded-md border border-border bg-card px-3 py-1.5 text-center text-xs font-medium text-[var(--ink-soft)] transition-colors group-hover:border-[var(--brand)] group-hover:text-[var(--brand)]">
            Демо →
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="text-[var(--brand)]/30 text-5xl font-display italic">✿</div>
      <h3 className="font-display italic text-2xl text-foreground">Шаблон табылмады</h3>
      <button
        onClick={onReset}
        className="rounded-full border border-[var(--brand)] px-4 py-1.5 text-sm text-[var(--brand)] transition-colors hover:bg-[var(--brand)] hover:text-white"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
