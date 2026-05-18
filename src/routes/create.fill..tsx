import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, X, Plus } from "lucide-react";
import { findTemplate, type Field } from "@/lib/templates-mock";

export const Route = createFileRoute("/create/fill/")({
  head: ({ params }) => ({
    meta: [{ title: `Толтыру: ${findTemplate(params.slug)?.name ?? ""} — ShaqiruKZ` }],
  }),
  component: InvitationFillView,
});

interface EventItem { time: string; title: string; address: string }

function InvitationFillView() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const tpl = useMemo(() => findTemplate(slug), [slug]);

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      if (tpl?.default_invite_words) {
        setValues((v) => ({ invite_words: tpl.default_invite_words!, ...v }));
      }
    }, 500);
    return () => clearTimeout(t);
  }, [tpl]);

  if (!tpl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Link to="/create" className="text-[var(--brand)] underline">Назад</Link>
      </div>
    );
  }

  const visible = (tpl.fields ?? []).filter(
    (f) => f.type !== "image" && !(f.type === "json" && f.slug !== "event_items"),
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    // mock: just navigate back to home
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-[100dvh] bg-[oklch(0.97_0.01_60)]">
      {/* Topbar */}
      <header className="sticky top-0 z-30 grid h-14 grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border/60 bg-white/85 px-4 backdrop-blur-md">
        <button
          onClick={() => navigate({ to: "/create/preview/$slug", params: { slug } })}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h1 className="text-center font-display italic text-base md:text-lg">Шақыруды толтыру</h1>
        <span className="font-mono-tech text-[0.7rem] uppercase tracking-wider text-[var(--ink-soft)]">
          1 / 2
        </span>
      </header>

      {/* Progress */}
      <Steps />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[320px_1fr]">
        {/* Sidebar preview (desktop) / strip (mobile) */}
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="hidden md:block">
            <div className="phone-frame mx-auto w-[260px] overflow-hidden">
              <img src={tpl.preview_url} alt={tpl.name} className="w-full" />
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-display italic text-lg">{tpl.name}</h3>
              <Link
                to="/create"
                className="mt-1 inline-block text-xs text-[var(--brand)] hover:underline"
              >
                Сменить →
              </Link>
            </div>
          </div>

          {/* Mobile strip */}
          <div className="md:hidden glass flex items-center gap-3 rounded-2xl p-3">
            <img src={tpl.preview_url} alt="" className="h-[60px] w-[44px] rounded-lg object-cover" />
            <div className="flex-1">
              <div className="font-mono-tech text-[0.65rem] uppercase tracking-wider text-[var(--ink-soft)]">
                Таңдалған үлгі
              </div>
              <div className="font-display italic text-[0.95rem]">{tpl.name}</div>
            </div>
            <Link to="/create" className="text-xs text-[var(--brand)]">Сменить</Link>
          </div>
        </aside>

        {/* Form */}
        <main>
          {loading ? (
            <SkeletonForm />
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <Fieldset title="Основное">
                <FieldText
                  label="Шақыру атауы"
                  value={name}
                  onChange={setName}
                  required
                  hint="Например: Айдар & Айгерім"
                />
                {visible
                  .filter((f) => f.slug !== "event_items" && f.type !== "textarea")
                  .map((f) => (
                    <FieldText
                      key={f.slug}
                      label={f.name}
                      value={values[f.slug] ?? ""}
                      onChange={(v) => setValues((s) => ({ ...s, [f.slug]: v }))}
                      required={!!f.required}
                      hint={f.hint}
                    />
                  ))}
              </Fieldset>

              {visible.some((f) => f.type === "textarea") && (
                <Fieldset title="Дополнительно">
                  {visible
                    .filter((f) => f.type === "textarea")
                    .map((f) => (
                      <FieldTextarea
                        key={f.slug}
                        label={f.name}
                        value={values[f.slug] ?? ""}
                        onChange={(v) => setValues((s) => ({ ...s, [f.slug]: v }))}
                        required={!!f.required}
                      />
                    ))}
                </Fieldset>
              )}

              {visible.some((f) => f.slug === "event_items") && (
                <Fieldset title="Бағдарлама">
                  <div className="space-y-3">
                    {eventItems.map((it, i) => (
                      <EventCard
                        key={i}
                        index={i}
                        item={it}
                        onChange={(patch) =>
                          setEventItems((arr) => arr.map((x, j) => (j === i ? { ...x, ...patch } : x)))
                        }
                        onRemove={() => setEventItems((arr) => arr.filter((_, j) => j !== i))}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setEventItems((a) => [...a, { time: "", title: "", address: "" }])}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/50 px-4 py-3 text-sm text-[var(--ink-soft)] transition-all hover:border-[var(--brand)] hover:text-[var(--brand)]"
                    >
                      <Plus className="h-4 w-4" /> Қосу
                    </button>
                  </div>
                </Fieldset>
              )}

              <button
                type="submit"
                disabled={saving}
                className="cta-shimmer w-full rounded-xl px-6 py-3.5 font-display italic text-lg text-[var(--brand-fg)] disabled:opacity-50"
              >
                {saving ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Сақталуда…
                  </span>
                ) : (
                  "Әрі қарай →"
                )}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

function Steps() {
  const items = [
    { label: "Үлгі", state: "done" as const },
    { label: "Мәтін", state: "active" as const },
    { label: "Дайын", state: "pending" as const },
  ];
  return (
    <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 pt-6">
      {items.map((s, i) => (
        <div key={i} className="flex flex-1 items-center gap-3">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full border text-[0.65rem] font-mono-tech ${
              s.state === "done"
                ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                : s.state === "active"
                  ? "border-[var(--brand)] text-[var(--brand)]"
                  : "border-border text-[var(--ink-soft)]"
            }`}
          >
            {s.state === "done" ? "✓" : i + 1}
          </div>
          <span className={`font-mono-tech text-[0.65rem] uppercase tracking-wider ${s.state === "active" ? "text-foreground" : "text-[var(--ink-soft)]"}`}>
            {s.label}
          </span>
          {i < items.length - 1 && (
            <div className="h-px flex-1 bg-border">
              <div className={`h-full ${s.state === "done" ? "bg-[var(--brand)]" : ""}`} style={{ width: s.state === "done" ? "100%" : "0%" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <legend className="px-2 font-mono-tech text-[0.65rem] uppercase tracking-[0.18em] text-[var(--brand)]">
        {title}
      </legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function FieldText({
  label, value, onChange, required, hint,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-foreground">
        {label}
        {!required && (
          <span className="font-mono-tech text-[0.6rem] text-[var(--ink-soft)]">необязательно</span>
        )}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={hint}
        className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm transition-all focus:border-[var(--brand)] focus:outline-none focus:ring-[3px] focus:ring-[oklch(0.55_0.13_17/0.1)]"
      />
    </label>
  );
}

function FieldTextarea({
  label, value, onChange, required,
}: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-foreground">
        {label}
        {!required && (
          <span className="font-mono-tech text-[0.6rem] text-[var(--ink-soft)]">необязательно</span>
        )}
      </span>
      <div className="overflow-hidden rounded-xl border border-border bg-card transition-all focus-within:border-[var(--brand)] focus-within:ring-[3px] focus-within:ring-[oklch(0.55_0.13_17/0.1)]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="min-h-[120px] w-full resize-y bg-transparent px-4 py-3 text-sm outline-none"
        />
      </div>
    </label>
  );
}

function EventCard({
  index, item, onChange, onRemove,
}: { index: number; item: EventItem; onChange: (p: Partial<EventItem>) => void; onRemove: () => void }) {
  return (
    <div className="glass relative rounded-xl p-4 animate-[fade-in_0.25s_ease_both]">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono-tech text-[0.7rem] text-[var(--brand)]">№ {String(index + 1).padStart(2, "0")}</span>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--ink-soft)] hover:text-[var(--brand)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-2 sm:grid-cols-[110px_1fr_1fr]">
        <input
          value={item.time}
          onChange={(e) => onChange({ time: e.target.value })}
          placeholder="18:00"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
        <input
          value={item.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Қарсы алу"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
        <input
          value={item.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Мекен-жайы"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm focus:border-[var(--brand)] focus:outline-none"
        />
      </div>
    </div>
  );
}

function SkeletonForm() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="h-3 w-2/5 animate-pulse rounded bg-[oklch(0.93_0.01_40)]" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-[oklch(0.93_0.01_40)]" />
        </div>
      ))}
    </div>
  );
}
