import weddingImg from "@/assets/template-wedding.jpg";
import toiImg from "@/assets/template-toi.jpg";
import eventImg from "@/assets/template-event.jpg";

export interface Field {
  slug: string;
  name: string;
  name_rus?: string;
  type: "text" | "textarea" | "json" | "image" | "link" | "youtube" | "map";
  required?: boolean;
  hint?: string;
}

export interface Template {
  id: number;
  slug: string;
  name: string;
  category: "marriage" | "girlMarriage" | "anniversary" | "event";
  style: "kazakh" | "european" | "modern" | "caucasus" | "uzbek" | null;
  price: number;
  actual_price: number;
  preview_url: string;
  demo_url: string | null;
  fields?: Field[];
  default_invite_words?: string;
}

const baseFields: Field[] = [
  { slug: "groom_name", name: "Күйеу жігіт аты", name_rus: "Имя жениха", type: "text", required: true },
  { slug: "bride_name", name: "Қалыңдық аты", name_rus: "Имя невесты", type: "text", required: true },
  { slug: "event_date", name: "Той күні", name_rus: "Дата торжества", type: "text", required: true, hint: "12.09.2026" },
  { slug: "invite_words", name: "Шақыру сөздері", name_rus: "Слова приглашения", type: "textarea", required: false },
  { slug: "event_items", name: "Іс-шаралар", name_rus: "Программа", type: "json", required: false },
  { slug: "map_link", name: "Карта сілтемесі", name_rus: "Ссылка на карту", type: "map", required: false, hint: "2gis / Google Maps" },
];

export const mockTemplates: Template[] = [
  { id: 1, slug: "altyn-shanyraq", name: "Altyn Shańyraq", category: "marriage", style: "kazakh", price: 4900, actual_price: 4900, preview_url: weddingImg, demo_url: "https://example.com/demo/1", fields: baseFields, default_invite_words: "Қадірлі қонақтар, бізді той-думанымызға шақырамыз!" },
  { id: 2, slug: "aq-niet", name: "Aq Niet", category: "marriage", style: "european", price: 0, actual_price: 0, preview_url: toiImg, demo_url: "https://example.com/demo/2", fields: baseFields },
  { id: 3, slug: "kyz-uzatu-gold", name: "Qyz Uzatu Gold", category: "girlMarriage", style: "kazakh", price: 5900, actual_price: 5900, preview_url: eventImg, demo_url: null, fields: baseFields },
  { id: 4, slug: "modern-minimal", name: "Modern Minimal", category: "marriage", style: "modern", price: 3900, actual_price: 3900, preview_url: weddingImg, demo_url: "https://example.com/demo/4", fields: baseFields },
  { id: 5, slug: "tusau-keser", name: "Tusau Keser", category: "event", style: "kazakh", price: 2900, actual_price: 2900, preview_url: toiImg, demo_url: "https://example.com/demo/5", fields: baseFields },
  { id: 6, slug: "anniversary-50", name: "Anniversary 50", category: "anniversary", style: "european", price: 0, actual_price: 0, preview_url: eventImg, demo_url: null, fields: baseFields },
  { id: 7, slug: "qudaiy-tamaq", name: "Qudaiy Tamaq", category: "event", style: "caucasus", price: 3500, actual_price: 3500, preview_url: weddingImg, demo_url: "https://example.com/demo/7", fields: baseFields },
  { id: 8, slug: "uzbek-classic", name: "Uzbek Classic", category: "marriage", style: "uzbek", price: 4200, actual_price: 4200, preview_url: toiImg, demo_url: "https://example.com/demo/8", fields: baseFields },
];

export const categories = [
  { key: "", label: "Барлығы" },
  { key: "marriage", label: "Үйлену тойы" },
  { key: "girlMarriage", label: "Қыз ұзату" },
  { key: "anniversary", label: "Мерейтой" },
  { key: "event", label: "Іс-шара" },
] as const;

export const stylesList = [
  { key: "", label: "Барлық стиль" },
  { key: "kazakh", label: "Қазақи" },
  { key: "european", label: "Еуропалық" },
  { key: "modern", label: "Модерн" },
  { key: "caucasus", label: "Кавказ" },
  { key: "uzbek", label: "Өзбек" },
] as const;

export function findTemplate(slug: string) {
  return mockTemplates.find((t) => t.slug === slug) ?? null;
}

export function categoryLabel(key: string) {
  return categories.find((c) => c.key === key)?.label ?? key;
}
