import { createFileRoute } from "@tanstack/react-router";
import { InvitationCard, type InvitationCardData } from "@/components/InvitationCard";
import weddingImg from "@/assets/template-wedding.jpg";
import toiImg from "@/assets/template-toi.jpg";
import eventImg from "@/assets/template-event.jpg";

export const Route = createFileRoute("/invitations")({
  head: () => ({
    meta: [{ title: "Менің шақыруларым — ShaqiruKZ" }],
  }),
  component: InvitationsPage,
});

const items: InvitationCardData[] = [
  {
    id: 1,
    title: "Айгерім & Асхат",
    templateName: "Классика",
    paid: true,
    date: "15 июня 2025",
    url: "shaqyru.ai/aigerim-askhat",
    bgImage: weddingImg,
  },
  {
    id: 2,
    title: "Динара & Ержан",
    templateName: "Altyn Shańyraq",
    paid: false,
    date: "22 августа 2025",
    url: "shaqyru.ai/dinara-erzhan",
    bgImage: toiImg,
  },
  {
    id: 3,
    title: "Әсел & Нұрлан",
    templateName: "Modern Minimal",
    paid: true,
    date: "3 мая 2025",
    url: "shaqyru.ai/asel-nurlan",
    bgImage: eventImg,
  },
  {
    id: 4,
    title: "Қыз ұзату — Мадина",
    templateName: "Qyz Uzatu Gold",
    paid: false,
    date: "10 сентября 2025",
    url: "shaqyru.ai/madina-uzatu",
    bgImage: weddingImg,
  },
];

function InvitationsPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-8">
          <div className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[var(--brand)]">
            Менің шақыруларым
          </div>
          <h1 className="mt-2 font-display italic text-[2rem] text-foreground">
            Мои приглашения
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Демонстрация карточек инвайтов — два статуса, hover, действия.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <InvitationCard key={it.id} data={it} />
          ))}
        </div>
      </div>
    </div>
  );
}