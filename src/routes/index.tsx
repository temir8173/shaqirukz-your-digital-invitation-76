import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowDown, MousePointerClick, Pencil, Share2,
  Zap, Sparkles, Wallet, Check, Star, Wand2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import heroBg from "@/assets/hero-bg.jpg";
import tplWedding from "@/assets/template-wedding.jpg";
import tplToi from "@/assets/template-toi.jpg";
import tplEvent from "@/assets/template-event.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShaqiruKZ — Веб-шақыру 5 минутта дайын" },
      { name: "description", content: "Онлайн веб-приглашения для свадеб, тоев и мероприятий на казахском и русском. Готово за 5 минут, легко редактировать, доступная цена." },
    ],
  }),
  component: LandingPage,
});

/* ---------- i18n ---------- */
type Lang = "kz" | "ru";
const COPY = {
  kz: {
    nav: { templates: "Үлгілер", how: "Қалай жұмыс істейді", pricing: "Бағалар", cta: "Бастау" },
    eyebrow: "онлайн-сервис",
    titleStart: "Шақыруды",
    titleEnd: "жасаңыз",
    rotate: ["жылдам", "оңай", "әдемі", "арзан"],
    sub: "Веб-парақша — заманауи шақыру билетіңіз. Дайын болу уақыты — 5 минут.",
    primaryCta: "Үлгі таңдау",
    secondaryCta: "Демо көру",
    scroll: "төмен қарай",
    templatesEyebrow: "галерея",
    templatesTitle: "Дайын үлгілер",
    templatesSub: "Үйлену тойы, қыз ұзату, мерейтой — барлығына өз стилі.",
    demoBtn: "Демо көру",
    howEyebrow: "процесс",
    howTitle: "Үш қадам, бес минут",
    steps: [
      { t: "Шаблон таңда", d: "Каталогтан ұнаған үлгіні таңда" },
      { t: "Мәтінді толтыр", d: "Аты, күні, мекенжайы — бәрін өзің енгізесің" },
      { t: "Сілтемемен бөліс", d: "Дайын парақшаны WhatsApp-қа жібер" },
    ],
    aiEyebrow: "✦ AI-powered",
    aiTitle: "Дизайнды AI-мен баптa",
    aiSub: "Тілмен жаз — бот орындайды. Түсті, шрифтті, фотоны сөзбен өзгертесің.",
    aiPromptLabel: "Сенің командаң",
    aiResultLabel: "Нәтиже",
    aiExamplesTitle: "Мысалдар:",
    aiExamples: [
      { cmd: "Фонды қою жасыл ет", res: "Фон қою-жасылға өзгерді" },
      { cmd: "Шрифтті үлкейт", res: "Тақырып шрифті ұлғайды" },
      { cmd: "Фотоны ауыстыр, жаңасы жарқын болсын", res: "Жаңа жарқын фото ұсынылды" },
    ],
    aiDemoPrompt: "Фонды қою жасыл ет, шрифтті үлкейт",
    aiDemoBefore: "Бұрын",
    aiDemoAfter: "Кейін",
    aiCta: "AI-редакторды сынау",
    benefitsEyebrow: "артықшылықтары",
    benefitsTitle: "Неге ShaqiruKZ?",
    benefits: [
      { t: "5 минутта дайын", d: "Дизайнерге күтудің керегі жоқ" },
      { t: "Өзгерту оңай", d: "Деректерді өзіңіз кез келген уақытта түзетесіз" },
      { t: "Қолжетімді баға", d: "Дизайнерден арзан, WhatsApp-тан әдемі" },
    ],
    pricingEyebrow: "бағалар",
    pricingTitle: "Қарапайым тариф",
    plans: [
      { name: "Базалық", price: "2 990", old: "4 990", unit: "₸", features: ["Бір шақыру", "Барлық үлгілер", "Шексіз өңдеу", "1 жыл хостинг"], cta: "Таңдау", featured: false },
      { name: "Премиум", price: "5 990", old: "8 990", unit: "₸", features: ["Бір шақыру", "Премиум үлгілер", "RSVP жинау", "Фотогалерея", "Музыка қосу", "2 жыл хостинг"], cta: "Таңдау", featured: true },
    ],
    socialEyebrow: "сенім",
    socialTitle: "Жүздеген той осында жасалды",
    stats: [
      { v: 500, suf: "+", l: "жасалған шақыру" },
      { v: 50, suf: "+", l: "дайын үлгі" },
      { v: 5, suf: " мин", l: "орташа уақыт" },
    ],
    reviews: [
      { n: "Айгерим Қ.", t: "Той алдында бір күн қалғанда жасадым. WhatsApp-та жібердім — қонақтардың бәрі мақтады." },
      { n: "Думан Е.", t: "Қарапайым, әдемі, тез. Дизайнерден үш есе арзан." },
      { n: "Назерке М.", t: "RSVP функциясы тамаша — кім келетінін бірден көріп тұрдым." },
    ],
    footer: { tag: "Веб-шақыру қызметі", contact: "Байланыс", rights: "Барлық құқықтар қорғалған" },
  },
  ru: {
    nav: { templates: "Шаблоны", how: "Как это работает", pricing: "Цены", cta: "Начать" },
    eyebrow: "онлайн-сервис",
    titleStart: "Создайте приглашение",
    titleEnd: "",
    rotate: ["быстро", "легко", "красиво", "недорого"],
    sub: "Веб-страница — современный пригласительный билет. Готовится за 5 минут.",
    primaryCta: "Выбрать шаблон",
    secondaryCta: "Посмотреть демо",
    scroll: "ниже",
    templatesEyebrow: "галерея",
    templatesTitle: "Готовые шаблоны",
    templatesSub: "Свадьба, узату, юбилей — для каждого события свой стиль.",
    demoBtn: "Смотреть демо",
    howEyebrow: "процесс",
    howTitle: "Три шага, пять минут",
    steps: [
      { t: "Выберите шаблон", d: "Подберите дизайн из каталога" },
      { t: "Заполните текст", d: "Имена, дата, адрес — всё под вашим контролем" },
      { t: "Поделитесь ссылкой", d: "Отправьте готовое приглашение в WhatsApp" },
    ],
    aiEyebrow: "✦ AI-powered",
    aiTitle: "Редактируй дизайн с AI",
    aiSub: "Пиши текстом — бот применит изменения. Цвет, шрифт, фото — словами.",
    aiPromptLabel: "Твоя команда",
    aiResultLabel: "Результат",
    aiExamplesTitle: "Примеры команд:",
    aiExamples: [
      { cmd: "Сделай фон тёмно-зелёным", res: "Фон изменился на тёмно-зелёный" },
      { cmd: "Увеличь шрифт заголовка", res: "Размер заголовка увеличен" },
      { cmd: "Замени фото на более светлое", res: "Подобрано новое светлое фото" },
    ],
    aiDemoPrompt: "Сделай фон тёмно-зелёным и шрифт крупнее",
    aiDemoBefore: "До",
    aiDemoAfter: "После",
    aiCta: "Попробовать AI-редактор",
    benefitsEyebrow: "преимущества",
    benefitsTitle: "Почему ShaqiruKZ?",
    benefits: [
      { t: "Готово за 5 минут", d: "Не нужно ждать дизайнера" },
      { t: "Легко редактировать", d: "Меняйте данные в любой момент" },
      { t: "Доступная цена", d: "Дешевле дизайнера, красивее WhatsApp" },
    ],
    pricingEyebrow: "цены",
    pricingTitle: "Простой тариф",
    plans: [
      { name: "Базовый", price: "2 990", old: "4 990", unit: "₸", features: ["Одно приглашение", "Все шаблоны", "Безлимит правок", "1 год хостинга"], cta: "Выбрать", featured: false },
      { name: "Премиум", price: "5 990", old: "8 990", unit: "₸", features: ["Одно приглашение", "Премиум шаблоны", "RSVP-сбор", "Фотогалерея", "Музыка", "2 года хостинга"], cta: "Выбрать", featured: true },
    ],
    socialEyebrow: "доверие",
    socialTitle: "Сотни тоев сделаны здесь",
    stats: [
      { v: 500, suf: "+", l: "созданных приглашений" },
      { v: 50, suf: "+", l: "готовых шаблонов" },
      { v: 5, suf: " мин", l: "среднее время" },
    ],
    reviews: [
      { n: "Айгерим К.", t: "Сделала за день до тоя. Отправила в WhatsApp — все гости в восторге." },
      { n: "Думан Е.", t: "Просто, красиво, быстро. В три раза дешевле дизайнера." },
      { n: "Назерке М.", t: "RSVP — топовая фича. Сразу видно, кто придёт." },
    ],
    footer: { tag: "Сервис веб-приглашений", contact: "Контакты", rights: "Все права защищены" },
  },
} as const;

/* ---------- hooks ---------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useParallax() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY * 0.4));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function useCounter(target: number, start: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, ms]);
  return v;
}

/* ---------- subcomponents ---------- */
function RotatingWord({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % words.length), 2500);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span className="relative inline-block align-baseline" style={{ minWidth: "8ch" }}>
      <span key={i} className="word-rotate inline-block text-[oklch(0.72_0.16_25)] glow-text">
        {words[i]}
      </span>
    </span>
  );
}

function LetterReveal({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className="letter-reveal" style={{ animationDelay: `${i * 35}ms` }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v = useCounter(value, start);
  return (
    <div ref={ref} className="text-center">
      <div className="font-mono-tech text-5xl md:text-6xl font-medium text-[var(--brand-deep)]">
        {v}<span className="text-primary">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

/* ---------- page ---------- */
function LandingPage() {
  const [lang, setLang] = useState<Lang>("kz");
  const t = COPY[lang];
  const parallaxY = useParallax();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mt-4">
          <div className="glass flex items-center justify-between rounded-full px-4 md:px-6 py-3">
            <a href="#top" className="font-display text-xl font-semibold tracking-tight">
              Shaqiru<span className="text-primary">KZ</span>
            </a>
            <nav className="hidden md:flex items-center gap-7 text-sm text-ink-soft">
              <a href="#templates" className="hover:text-foreground transition">{t.nav.templates}</a>
              <a href="#how" className="hover:text-foreground transition">{t.nav.how}</a>
              <a href="#ai-editor" className="hover:text-foreground transition">AI</a>
              <a href="#pricing" className="hover:text-foreground transition">{t.nav.pricing}</a>
            </nav>
            <div className="flex items-center gap-2">
              <div className="font-mono-tech text-xs flex rounded-full border border-border overflow-hidden">
                <button onClick={() => setLang("kz")} className={`px-2.5 py-1 ${lang==="kz"?"bg-foreground text-background":"text-ink-soft"}`}>KZ</button>
                <button onClick={() => setLang("ru")} className={`px-2.5 py-1 ${lang==="ru"?"bg-foreground text-background":"text-ink-soft"}`}>RU</button>
              </div>
              <Link to="/" className="hidden sm:inline-flex cta-shimmer text-primary-foreground text-sm font-medium px-4 py-2 rounded-full">
                {t.nav.cta}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden text-cream" style={{ background: "var(--hero-bg)" }}>
        {/* parallax bg image */}
        <div
          className="absolute inset-0 -z-0 ken-burns"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.55,
            transform: `translate3d(0, ${parallaxY}px, 0)`,
            willChange: "transform",
          }}
        />
        {/* grid overlay */}
        <div className="absolute inset-0 hero-grid opacity-60 pointer-events-none" />
        {/* glow */}
        <div className="hero-glow" style={{ top: "-12%", right: "-10%" }} />
        <div className="hero-glow" style={{ bottom: "-20%", left: "-15%", opacity: 0.5 }} />
        {/* vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, oklch(0.1 0.02 30 / 0.7) 100%)" }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-40 pb-28 md:pt-48 md:pb-40 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.2em] text-cream/80 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
            <span className="pulse-dot" />
            <span>● {t.eyebrow}</span>
          </div>

          {/* title */}
          <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] glow-text">
            <span key={lang + "-start"}><LetterReveal text={t.titleStart} /></span>
            <br />
            <RotatingWord words={t.rotate} />
            {t.titleEnd && <span className="ml-3">{t.titleEnd}</span>}
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-cream/75 leading-relaxed">
            {t.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#templates"
              className="cta-shimmer inline-flex items-center gap-2 text-primary-foreground font-medium px-7 py-4 rounded-full text-base"
            >
              {t.primaryCta} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#templates"
              className="inline-flex items-center gap-2 text-cream/90 font-medium px-6 py-4 rounded-full border border-white/20 hover:bg-white/5 transition"
            >
              {t.secondaryCta}
            </a>
          </div>

          {/* scroll cue */}
          <a href="#templates" className="bob absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 flex flex-col items-center gap-1 text-xs font-mono-tech">
            <span className="uppercase tracking-widest">{t.scroll}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* TEMPLATES */}
      <Section id="templates" eyebrow={t.templatesEyebrow} title={t.templatesTitle} sub={t.templatesSub}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            { img: tplWedding, name: "Aruana", tag: "Wedding" },
            { img: tplToi, name: "Raushan", tag: "Qyz uzatu" },
            { img: tplEvent, name: "Altyn", tag: "Premium" },
          ].map((tpl, i) => (
            <RevealItem key={tpl.name} delay={i * 120}>
              <div className="group">
                <div className="phone-frame mx-auto" style={{ maxWidth: 280 }}>
                  <img
                    src={tpl.img}
                    alt={tpl.name}
                    width={768}
                    height={1408}
                    loading="lazy"
                    className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between px-2">
                  <div>
                    <div className="font-display text-xl">{tpl.name}</div>
                    <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{tpl.tag}</div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
                    {t.demoBtn} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative py-24 md:py-32 bg-[oklch(0.97_0.01_60)]">
        <div className="mx-auto max-w-6xl px-6">
          <Header eyebrow={t.howEyebrow} title={t.howTitle} />
          <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {/* SVG progress line */}
            <svg className="hidden md:block absolute top-10 left-[16%] right-[16%] h-1 w-[68%] pointer-events-none" viewBox="0 0 100 1" preserveAspectRatio="none">
              <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="oklch(0.55 0.13 17 / 0.2)" strokeWidth="0.5" strokeDasharray="2 1.5" />
            </svg>
            {[MousePointerClick, Pencil, Share2].map((Icon, i) => (
              <RevealItem key={i} delay={i * 150}>
                <div className="relative text-center">
                  <div className="relative mx-auto w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-[var(--shadow-card)] border border-border">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-foreground text-background font-mono-tech text-xs flex items-center justify-center">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl">{t.steps[i].t}</h3>
                  <p className="mt-2 text-muted-foreground max-w-xs mx-auto">{t.steps[i].d}</p>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* AI EDITOR */}
      <section id="ai-editor" className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 hero-grid opacity-[0.04] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.25em] text-primary px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5">
              {t.aiEyebrow}
            </div>
            <h2 className="mt-5 font-display text-4xl md:text-5xl">{t.aiTitle}</h2>
            <p className="mt-4 text-muted-foreground text-lg">{t.aiSub}</p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Chat mockup */}
            <RevealItem className="lg:col-span-3">
              <div
                className="rounded-3xl p-6 md:p-8 h-full bg-background"
                style={{ border: "1px solid oklch(0.55 0.13 17 / 0.4)", boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.7_0.18_25)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.8_0.15_85)]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.72_0.18_145)]" />
                  </div>
                  <span className="ml-3 font-mono-tech text-xs text-muted-foreground uppercase tracking-wider">
                    shaqiru.kz / ai-editor
                  </span>
                </div>

                {/* User prompt bubble */}
                <div className="mt-6 flex justify-end">
                  <div className="max-w-[85%]">
                    <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground text-right mb-1.5">
                      {t.aiPromptLabel}
                    </div>
                    <div className="cta-shimmer text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm text-sm">
                      {t.aiDemoPrompt}
                      <span className="inline-block w-[2px] h-3.5 bg-primary-foreground/90 ml-1 align-middle animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* AI result bubble: before / after */}
                <div className="mt-6">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5 flex items-center gap-2">
                    <Wand2 className="w-3 h-3 text-primary" /> {t.aiResultLabel}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl overflow-hidden border border-border relative bg-[oklch(0.96_0.012_60)] aspect-[3/4] flex flex-col items-center justify-center p-4">
                      <div className="font-display text-base text-[oklch(0.38_0.03_30)]">Aselle &amp; Daulet</div>
                      <div className="font-mono-tech text-[9px] uppercase tracking-widest text-muted-foreground mt-1">12.07.2026</div>
                      <span className="absolute top-2 left-2 font-mono-tech text-[9px] uppercase tracking-widest text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded">
                        {t.aiDemoBefore}
                      </span>
                    </div>
                    <div
                      className="rounded-xl overflow-hidden border border-primary/30 relative aspect-[3/4] flex flex-col items-center justify-center p-4 text-cream"
                      style={{ background: "linear-gradient(160deg, oklch(0.28 0.06 155), oklch(0.18 0.05 160))" }}
                    >
                      <div className="font-display text-2xl">Aselle &amp; Daulet</div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-cream/70 mt-2">12.07.2026</div>
                      <span className="absolute top-2 left-2 font-mono-tech text-[9px] uppercase tracking-widest text-cream/90 bg-foreground/40 px-1.5 py-0.5 rounded">
                        {t.aiDemoAfter}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealItem>

            {/* Examples list */}
            <RevealItem delay={120} className="lg:col-span-2">
              <div className="h-full flex flex-col">
                <div className="font-mono-tech text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {t.aiExamplesTitle}
                </div>
                <div className="space-y-3 flex-1">
                  {t.aiExamples.map((ex, i) => (
                    <div key={i} className="glass rounded-2xl p-4">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-mono-tech text-primary mt-0.5 shrink-0">{">"}</span>
                        <span className="text-foreground/90">{ex.cmd}</span>
                      </div>
                      <div className="flex items-start gap-2 mt-2 text-xs text-muted-foreground pl-5">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{ex.res}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#templates"
                  className="cta-shimmer mt-6 inline-flex items-center justify-center gap-2 text-primary-foreground font-medium px-6 py-3.5 rounded-full text-sm"
                >
                  {t.aiCta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </RevealItem>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <Section eyebrow={t.benefitsEyebrow} title={t.benefitsTitle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[Zap, Sparkles, Wallet].map((Icon, i) => (
            <RevealItem key={i} delay={i * 100}>
              <div className="glass rounded-2xl p-8 h-full transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[oklch(0.94_0.04_20)] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-2xl">{t.benefits[i].t}</h3>
                <p className="mt-2 text-muted-foreground">{t.benefits[i].d}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <section id="pricing" className="py-24 md:py-32 bg-[oklch(0.97_0.01_60)]">
        <div className="mx-auto max-w-5xl px-6">
          <Header eyebrow={t.pricingEyebrow} title={t.pricingTitle} />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.plans.map((p, i) => (
              <RevealItem key={p.name} delay={i * 120}>
                <div
                  className={`relative rounded-3xl p-8 md:p-10 h-full border ${
                    p.featured
                      ? "border-primary/30 bg-background shadow-[var(--shadow-glow)]"
                      : "border-border bg-background"
                  }`}
                >
                  {p.featured && (
                    <span className="absolute -top-3 left-8 font-mono-tech text-[10px] uppercase tracking-widest bg-foreground text-background px-3 py-1 rounded-full">
                      {lang === "kz" ? "Танымал" : "Популярный"}
                    </span>
                  )}
                  <div className="font-display text-2xl">{p.name}</div>
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="font-display text-6xl font-medium text-[var(--brand-deep)]">{p.price}</span>
                    <span className="font-mono-tech text-lg text-muted-foreground">{p.unit}</span>
                    <span className="font-mono-tech text-base text-muted-foreground line-through">{p.old}</span>
                  </div>
                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-8 w-full py-3.5 rounded-full font-medium transition ${
                      p.featured
                        ? "cta-shimmer text-primary-foreground"
                        : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {p.cta}
                  </button>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <Section eyebrow={t.socialEyebrow} title={t.socialTitle}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {t.stats.map((s) => (
            <Stat key={s.l} value={s.v} suffix={s.suf} label={s.l} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.map((r, i) => (
            <RevealItem key={r.n} delay={i * 100}>
              <div className="glass rounded-2xl p-6 h-full">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/85 leading-relaxed">"{r.t}"</p>
                <div className="mt-4 font-mono-tech text-xs uppercase tracking-wider text-muted-foreground">— {r.n}</div>
              </div>
            </RevealItem>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-24 md:py-32 text-cream" style={{ background: "var(--hero-bg)" }}>
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className="hero-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.5 }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl glow-text">
            {lang === "kz" ? "Тойыңызды бүгін бастаңыз" : "Начните свой той сегодня"}
          </h2>
          <p className="mt-5 text-cream/75 text-lg">
            {lang === "kz" ? "Бес минут — және сілтемеңіз дайын." : "Пять минут — и ссылка готова."}
          </p>
          <a href="#templates" className="cta-shimmer mt-10 inline-flex items-center gap-2 text-primary-foreground font-medium px-8 py-4 rounded-full">
            {t.primaryCta} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display text-xl">Shaqiru<span className="text-primary">KZ</span></div>
            <div className="font-mono-tech text-xs uppercase tracking-wider text-muted-foreground mt-1">{t.footer.tag}</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#templates" className="hover:text-foreground">{t.nav.templates}</a>
            <a href="#pricing" className="hover:text-foreground">{t.nav.pricing}</a>
            <a href="mailto:hello@shaqiru.kz" className="hover:text-foreground">{t.footer.contact}</a>
          </div>
          <div className="font-mono-tech text-xs text-muted-foreground">© 2026 ShaqiruKZ</div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- helpers ---------- */
function Section({
  id, eyebrow, title, sub, children,
}: { id?: string; eyebrow: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Header eyebrow={eyebrow} title={title} sub={sub} />
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}

function Header({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="font-mono-tech text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-lg">{sub}</p>}
    </div>
  );
}

function RevealItem({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
