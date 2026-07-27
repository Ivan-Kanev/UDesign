import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { AppInfo, StatusKind } from "./data";
import { apps } from "./data";
import { useMotionSystem } from "./motion/useMotionSystem";
import { HeroScene } from "./visuals/HeroScene";

type Language = "en" | "bg";
type ThemeMode = "dark" | "light";

const navItems = [
  ["ecosystem", "ecosystem"],
  ["status", "status"],
  ["apps", "apps"],
  ["identity", "identity"],
  ["about", "about"],
  ["contact", "contact"],
] as const;

const copy = {
  en: {
    nav: {
      ecosystem: "Ecosystem",
      status: "Status",
      apps: "Apps",
      identity: "Identity",
      about: "About",
      contact: "Contact",
      live: "Live Status",
    },
    controls: {
      language: "Language",
      theme: "Theme",
      dark: "Dark",
      light: "Light",
    },
    hero: {
      eyebrow: "UDesign by Ivan Kanev",
      title: "A living software universe built around one iconic U.",
      body: "UDesign is the premium studio identity for Ivan Kanev's apps: useful, visual, privacy-conscious iOS products that share one recognizable signature.",
      explore: "Explore apps",
      surprise: "Surprise me",
      signals: "11 App Store signals",
    },
    ecosystem: {
      eyebrow: "Brand Architecture",
      title: "UDesign is the studio. Every app is a signal from the same system.",
      cards: [
        ["01", "Umbrella Identity", "UDesign by Ivan Kanev makes the work feel like a premium software company, not a scattered app list."],
        ["02", "Signature Letter", "The U becomes the master mark: flexible for icons, launch screens, product badges, support pages, and future app families."],
        ["03", "Living Portfolio", "The site behaves like a product hub, with clickable app details, category filters, and direct paths into each app's public pages."],
      ],
    },
    status: {
      eyebrow: "App Store Connect Snapshot",
      title: "Your portfolio status, translated into a premium command center.",
      ready: "ready",
      review: "in review",
      all: "All statuses",
      readyFilter: "Ready for Distribution",
      reviewFilter: "Waiting for Review",
      readyLabel: "Ready for Distribution",
      reviewLabel: "Waiting for Review",
    },
    apps: {
      eyebrow: "App Ecosystem",
      title: "Real products. Real icons. One premium home.",
      count: "apps",
      native: "native",
      active: "active",
      filters: {
        all: "All",
        "u-family": "U Family",
        learning: "Learning",
        utility: "Utilities",
        finance: "Finance",
        lifestyle: "Lifestyle",
        "appstore-ready": "Ready",
        "appstore-review": "In Review",
      },
    },
    identity: {
      eyebrow: "Identity System",
      title: "The U is not decoration. It is the operating system of the brand.",
      cards: [
        ["Product naming", "Use the U prefix when the app belongs to the flagship family. Let specialist names like VideoY or AvoCue still carry the UDesign endorsement."],
        ["Launch language", "Lead with the specific app purpose, then anchor it back to the studio: A UDesign app by Ivan Kanev."],
        ["Visual behavior", "Icons, cards, panels, and motion should feel precise, illuminated, direct, and touchable across every product surface."],
      ],
    },
    about: {
      eyebrow: "About Ivan",
      title: "Independent iOS product builder with a studio-level standard.",
      bodyOne: "I design and build focused iOS apps that solve specific everyday problems with clean interfaces, privacy-conscious architecture, and a recognizable product identity. UDesign is the umbrella for that work: a studio system for launching, organizing, and evolving every app in the portfolio.",
      bodyTwo: "The goal is not only to publish apps. The goal is to build a coherent software ecosystem where each product feels useful on its own and clearly belongs to a larger, premium family.",
      capabilities: [
        ["Product Design", "Interface systems, app positioning, launch pages, and visual hierarchy."],
        ["iOS Apps", "Native product concepts across utilities, learning, finance, travel, and lifestyle."],
        ["Brand Systems", "Reusable naming, icon, motion, and marketing patterns for every UDesign app."],
        ["GitHub Pages", "Fast static support sites, privacy pages, portfolio hubs, and public app dashboards."],
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about the next UDesign product.",
      body: "Use the form to start a conversation about an app, support page, brand system, or future product idea. The form works on GitHub Pages by opening a prepared email draft.",
      portfolio: "App portfolio status",
      name: "Name",
      email: "Email",
      topic: "Topic",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "Tell me what you want to build or discuss.",
      topics: ["New app idea", "App support", "Brand or website", "Partnership"],
      submit: "Prepare email",
      prepared: "Your email app is opening with the message prepared.",
      subject: "UDesign inquiry from",
      visitor: "website visitor",
    },
    studio: {
      eyebrow: "Studio Direction",
      title: "UDesign by Ivan Kanev",
      body: "This is the strongest long-term brand direction: clear enough for a personal founder story, broad enough for a software ecosystem, and memorable enough to make future apps feel connected from day one.",
      open: "Open app hub",
      contact: "Contact Ivan",
    },
    modal: {
      close: "Close",
      does: "What it does",
      highlights: "Highlights",
      marketing: "Marketing",
      support: "Support",
      privacy: "Privacy",
    },
  },
  bg: {
    nav: {
      ecosystem: "Екосистема",
      status: "Статус",
      apps: "Приложения",
      identity: "Идентичност",
      about: "За мен",
      contact: "Контакт",
      live: "Live статус",
    },
    controls: {
      language: "Език",
      theme: "Тема",
      dark: "Тъмна",
      light: "Светла",
    },
    hero: {
      eyebrow: "UDesign от Иван Канев",
      title: "Жива софтуерна вселена, изградена около едно разпознаваемо U.",
      body: "UDesign е премиум студио идентичността за приложенията на Иван Канев: полезни, визуални и privacy-conscious iOS продукти с един общ подпис.",
      explore: "Разгледай приложенията",
      surprise: "Изненадай ме",
      signals: "11 App Store сигнала",
    },
    ecosystem: {
      eyebrow: "Бранд архитектура",
      title: "UDesign е студиото. Всяко приложение е сигнал от една система.",
      cards: [
        ["01", "Обща идентичност", "UDesign by Ivan Kanev превръща работата в премиум софтуерна компания, а не в разпилян списък с приложения."],
        ["02", "Разпознаваем подпис", "U става основният знак: подходящ за икони, launch екрани, продуктови badge-ове, support страници и бъдещи приложения."],
        ["03", "Живо портфолио", "Сайтът работи като продуктов хъб с детайли за приложенията, филтри и директни връзки към публичните им страници."],
      ],
    },
    status: {
      eyebrow: "App Store Connect snapshot",
      title: "Статусът на портфолиото, превърнат в премиум команден център.",
      ready: "готови",
      review: "в преглед",
      all: "Всички статуси",
      readyFilter: "Ready for Distribution",
      reviewFilter: "Waiting for Review",
      readyLabel: "Ready for Distribution",
      reviewLabel: "Waiting for Review",
    },
    apps: {
      eyebrow: "Екосистема от приложения",
      title: "Реални продукти. Реални икони. Един премиум дом.",
      count: "приложения",
      native: "native",
      active: "активни",
      filters: {
        all: "Всички",
        "u-family": "U Family",
        learning: "Learning",
        utility: "Utilities",
        finance: "Finance",
        lifestyle: "Lifestyle",
        "appstore-ready": "Ready",
        "appstore-review": "In Review",
      },
    },
    identity: {
      eyebrow: "Система за идентичност",
      title: "U не е декорация. То е операционната система на бранда.",
      cards: [
        ["Именуване", "Използвай U префикса, когато приложението принадлежи към основното семейство. Специални имена като VideoY или AvoCue могат да носят UDesign endorsement."],
        ["Launch език", "Започни с конкретната стойност на приложението, после го закотви към студиото: A UDesign app by Ivan Kanev."],
        ["Визуално поведение", "Иконите, картите, панелите и motion системата трябва да изглеждат прецизно, осветено, директно и докосваемо."],
      ],
    },
    about: {
      eyebrow: "За Иван",
      title: "Независим iOS product builder със стандарт на продуктово студио.",
      bodyOne: "Дизайнирам и изграждам фокусирани iOS приложения, които решават конкретни ежедневни проблеми чрез чист интерфейс, privacy-conscious архитектура и разпознаваема продуктова идентичност. UDesign е общата система за тази работа.",
      bodyTwo: "Целта не е само да се публикуват приложения. Целта е да се изгради последователна софтуерна екосистема, в която всеки продукт е полезен самостоятелно и принадлежи към по-голямо премиум семейство.",
      capabilities: [
        ["Product Design", "Интерфейс системи, позициониране, launch страници и визуална йерархия."],
        ["iOS Apps", "Native продуктови концепции за utilities, learning, finance, travel и lifestyle."],
        ["Brand Systems", "Повтаряеми naming, icon, motion и marketing модели за всяко UDesign приложение."],
        ["GitHub Pages", "Бързи статични support сайтове, privacy страници, портфолио хъбове и dashboards."],
      ],
    },
    contact: {
      eyebrow: "Контакт",
      title: "Нека поговорим за следващия UDesign продукт.",
      body: "Използвай формата за приложение, support страница, brand system или бъдеща продуктова идея. Тя работи в GitHub Pages чрез подготвен email draft.",
      portfolio: "Статус на приложенията",
      name: "Име",
      email: "Имейл",
      topic: "Тема",
      message: "Съобщение",
      namePlaceholder: "Твоето име",
      emailPlaceholder: "you@example.com",
      messagePlaceholder: "Опиши какво искаш да обсъдим или изградим.",
      topics: ["Нова идея за приложение", "Поддръжка", "Бранд или уебсайт", "Партньорство"],
      submit: "Подготви имейл",
      prepared: "Email приложението се отваря с подготвено съобщение.",
      subject: "UDesign запитване от",
      visitor: "посетител на сайта",
    },
    studio: {
      eyebrow: "Посока на студиото",
      title: "UDesign от Иван Канев",
      body: "Това е най-силната дългосрочна посока: ясна за founder история, достатъчно широка за софтуерна екосистема и достатъчно запомняща се за бъдещи приложения.",
      open: "Отвори app hub",
      contact: "Контакт с Иван",
    },
    modal: {
      close: "Затвори",
      does: "Какво прави",
      highlights: "Акценти",
      marketing: "Marketing",
      support: "Support",
      privacy: "Privacy",
    },
  },
} as const;

const statusCopyKey: Record<StatusKind, "readyLabel" | "reviewLabel"> = {
  ready: "readyLabel",
  review: "reviewLabel",
};

const appFilters = [
  "all",
  "u-family",
  "learning",
  "utility",
  "finance",
  "lifestyle",
  "appstore-ready",
  "appstore-review",
] as const;

const statusFilters = [
  "all",
  "ready",
  "review",
] as const;

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("udesign-language") === "bg" ? "bg" : "en";
}

function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem("udesign-theme") === "light" ? "light" : "dark";
}

function StatusPill({ kind, label }: { kind: StatusKind; label: string }) {
  return (
    <span className={`status-pill ${kind}`}>
      <span className="status-dot" />
      {label}
    </span>
  );
}

function FounderMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`founder-mark ${compact ? "compact" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 160 160" role="img">
        <defs>
          <linearGradient id="markGlow" x1="20" x2="140" y1="20" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#66e9ff" />
            <stop offset="0.52" stopColor="#f6f8fb" />
            <stop offset="1" stopColor="#86ffb6" />
          </linearGradient>
          <linearGradient id="markStroke" x1="28" x2="132" y1="132" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86ffb6" />
            <stop offset="1" stopColor="#66e9ff" />
          </linearGradient>
        </defs>
        <circle className="mark-orbit" cx="80" cy="80" r="68" />
        <path className="mark-u-shadow" d="M45 28v52c0 27 13 45 35 45s35-18 35-45V28" />
        <path className="mark-u" d="M45 28v52c0 27 13 45 35 45s35-18 35-45V28" />
        <path className="mark-cut" d="M62 30v50c0 14 6 23 18 23s18-9 18-23V30" />
        <text className="mark-ik" x="80" y="88" textAnchor="middle">
          IK
        </text>
        <path className="mark-signature-line" d="M38 136c18-10 30-10 42 0s28 9 44-2" />
      </svg>
    </span>
  );
}

function AppModal({ app, onClose, language }: { app: AppInfo | null; onClose: () => void; language: Language }) {
  const t = copy[language];

  useEffect(() => {
    document.body.classList.toggle("modal-open", Boolean(app));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [app, onClose]);

  if (!app) return null;

  return (
    <div className="app-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <button className="modal-backdrop" type="button" aria-label={t.modal.close} onClick={onClose} />
      <section className="modal-sheet" tabIndex={-1}>
        <button className="modal-close" type="button" onClick={onClose}>
          {t.modal.close}
        </button>
        <div className="modal-head">
          <img src={app.icon} alt={`${app.name} icon`} />
          <div>
            <p className="eyebrow">{app.category} / App Store Connect</p>
            <h2 id="modalTitle">{app.name}</h2>
            <p>
              {app.version} / {t.status[statusCopyKey[app.statusKind]]} / {app.subtitle}
            </p>
          </div>
        </div>
        <div className="modal-body">
          <article>
            <h3>{t.modal.does}</h3>
            <p>{app.description}</p>
          </article>
          <article>
            <h3>{t.modal.highlights}</h3>
            <div className="feature-list">
              {app.features.map((feature) => (
                <div key={feature}>{feature}</div>
              ))}
            </div>
          </article>
        </div>
        <div className="modal-actions">
          {app.marketing && (
            <a className="button primary" href={app.marketing} target="_blank" rel="noreferrer">
              {t.modal.marketing}
            </a>
          )}
          {app.support && (
            <a className="button secondary" href={app.support} target="_blank" rel="noreferrer">
              {t.modal.support}
            </a>
          )}
          {app.privacy && (
            <a className="button secondary" href={app.privacy} target="_blank" rel="noreferrer">
              {t.modal.privacy}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppInfo | null>(null);
  const [appFilter, setAppFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusKind>("all");
  const [contactStatus, setContactStatus] = useState("");
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const t = copy[language];

  useMotionSystem();

  const readyCount = apps.filter((app) => app.statusKind === "ready").length;
  const reviewCount = apps.filter((app) => app.statusKind === "review").length;
  const filteredApps = appFilter === "all" ? apps : apps.filter((app) => app.tags.includes(appFilter));
  const filteredStatusApps = statusFilter === "all" ? apps : apps.filter((app) => app.statusKind === statusFilter);
  const orbitApps = apps.slice(0, 9);

  const randomApp = useMemo(() => () => apps[Math.floor(Math.random() * apps.length)], []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("udesign-language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("udesign-theme", theme);
  }, [theme]);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`${t.contact.subject} ${name || t.contact.visitor}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:ikanev@icloud.com?subject=${subject}&body=${body}`;
    setContactStatus(t.contact.prepared);
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {language === "bg" ? "Към съдържанието" : "Skip to content"}
      </a>
      <div className="cursor-aura" aria-hidden="true" />

      <header className="site-header reveal">
        <a className="brand-lockup magnetic" href="#top" aria-label="UDesign home">
          <FounderMark compact />
          <span>
            <strong>UDesign</strong>
            <small>by Ivan Kanev</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-controls="primary-nav"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">{language === "bg" ? "Отвори меню" : "Open menu"}</span>
        </button>

        <nav className="site-nav" id="primary-nav" aria-label="Primary navigation">
          {navItems.map(([id, labelKey]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {t.nav[labelKey]}
            </a>
          ))}
          <a className="nav-pill" href="https://ivan-kanev.github.io/IvanKanev-iOS-Apps-Status/#appsGrid" target="_blank" rel="noreferrer">
            {t.nav.live}
          </a>
        </nav>

        <div className="site-controls" aria-label="Site preferences">
          <div className="segmented-control" aria-label={t.controls.language}>
            <button className={language === "en" ? "active" : ""} type="button" onClick={() => setLanguage("en")}>
              EN
            </button>
            <button className={language === "bg" ? "active" : ""} type="button" onClick={() => setLanguage("bg")}>
              BG
            </button>
          </div>
          <div className="segmented-control" aria-label={t.controls.theme}>
            <button className={theme === "dark" ? "active" : ""} type="button" onClick={() => setTheme("dark")}>
              {t.controls.dark}
            </button>
            <button className={theme === "light" ? "active" : ""} type="button" onClick={() => setTheme("light")}>
              {t.controls.light}
            </button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero section" id="top">
          <HeroScene />
          <div className="hero-content">
            <p className="eyebrow reveal">{t.hero.eyebrow}</p>
            <h1 className="reveal">{t.hero.title}</h1>
            <p className="hero-copy reveal">{t.hero.body}</p>
            <div className="hero-actions reveal">
              <a className="button primary magnetic" href="#apps">
                {t.hero.explore}
              </a>
              <button className="button secondary magnetic" type="button" onClick={() => setSelectedApp(randomApp())}>
                {t.hero.surprise}
              </button>
            </div>
          </div>

          <aside className="command-deck reveal" aria-label="UDesign app command deck">
            <div className="deck-head">
              <span>U / OS</span>
              <strong>{t.hero.signals}</strong>
            </div>
            <div className="icon-orbit" aria-hidden="true">
              {orbitApps.map((app) => (
                <img className="orbit-icon" src={app.icon} alt="" key={app.name} />
              ))}
            </div>
            <div className="deck-actions">
              {["UFood", "UPlugPay", "UPerifery"].map((name) => (
                <button key={name} type="button" onClick={() => setSelectedApp(apps.find((app) => app.name === name) ?? null)}>
                  {name}
                </button>
              ))}
            </div>
          </aside>
        </section>

        <section className="section ecosystem" id="ecosystem">
          <div className="section-heading reveal">
            <p className="eyebrow">{t.ecosystem.eyebrow}</p>
            <h2>{t.ecosystem.title}</h2>
          </div>
          <div className="brand-system">
            {t.ecosystem.cards.map(([number, title, copy]) => (
              <article className="reveal" key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section status-section" id="status">
          <div className="section-heading split reveal">
            <div>
              <p className="eyebrow">{t.status.eyebrow}</p>
              <h2>{t.status.title}</h2>
            </div>
            <div className="status-summary" aria-label="App Store Connect summary">
              <span className="summary-ready">
                <strong>{readyCount}</strong> {t.status.ready}
              </span>
              <span className="summary-review">
                <strong>{reviewCount}</strong> {t.status.review}
              </span>
            </div>
          </div>

          <div className="status-toolbar reveal" aria-label="Filter App Store Connect status">
            {statusFilters.map((value) => (
              <button className={`status-filter ${statusFilter === value ? "active" : ""}`} type="button" key={value} onClick={() => setStatusFilter(value)}>
                {value === "all" ? t.status.all : t.status[statusCopyKey[value]]}
              </button>
            ))}
          </div>

          <div className="status-board" aria-live="polite">
            {filteredStatusApps.map((app) => (
              <button className="status-card reveal" type="button" key={app.name} onClick={() => setSelectedApp(app)}>
                <img src={app.icon} alt={`${app.name} icon`} />
                <div>
                  <h3>{app.name}</h3>
                  <p>{app.version}</p>
                  <StatusPill kind={app.statusKind} label={t.status[statusCopyKey[app.statusKind]]} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section apps-section" id="apps">
          <div className="section-heading split reveal">
            <div>
              <p className="eyebrow">{t.apps.eyebrow}</p>
              <h2>{t.apps.title}</h2>
            </div>
            <div className="metrics" aria-label="Portfolio metrics">
              <span>
                <strong>{apps.length}</strong> {t.apps.count}
              </span>
              <span>
                <strong>iOS</strong> {t.apps.native}
              </span>
              <span>
                <strong>2026</strong> {t.apps.active}
              </span>
            </div>
          </div>

          <div className="filter-bar reveal" aria-label="Filter apps by category">
            {appFilters.map((value) => (
              <button className={`filter ${appFilter === value ? "active" : ""}`} type="button" key={value} onClick={() => setAppFilter(value)}>
                {t.apps.filters[value]}
              </button>
            ))}
          </div>

          <div className="app-grid" aria-live="polite">
            {filteredApps.map((app) => (
              <button className="app-card reveal" type="button" key={app.name} onClick={() => setSelectedApp(app)}>
                <img className="app-icon" src={app.icon} alt={`${app.name} icon`} />
                <div className="app-card-top">
                  <StatusPill kind={app.statusKind} label={t.status[statusCopyKey[app.statusKind]]} />
                </div>
                <h3>{app.name}</h3>
                <div className="app-meta">
                  {app.version} / {app.category}
                </div>
                <p>{app.subtitle}</p>
                <div className="app-tags">
                  {app.tags
                    .filter((tag) => !tag.startsWith("appstore"))
                    .map((tag) => (
                      <span key={tag}>{tag.replace("-", " ")}</span>
                    ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section identity" id="identity">
          <div className="section-heading reveal">
            <p className="eyebrow">{t.identity.eyebrow}</p>
            <h2>{t.identity.title}</h2>
          </div>
          <div className="identity-layout">
            <div className="identity-stage reveal">
              <div className="stage-card">
                <div className="stage-mark">
                  <FounderMark />
                </div>
                <div className="stage-caption">
                  <span>UDesign</span>
                  <strong>by Ivan Kanev</strong>
                </div>
              </div>
            </div>
            <div className="system-list">
              {t.identity.cards.map(([title, copy]) => (
                <article className="reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-heading split reveal">
            <div>
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2>{t.about.title}</h2>
            </div>
            <div className="about-signature" aria-label="Founder signature">
              <span>UDesign</span>
              <strong>Ivan Kanev</strong>
            </div>
          </div>

          <div className="about-layout">
            <article className="about-panel reveal">
              <p>
                {t.about.bodyOne}
              </p>
              <p>
                {t.about.bodyTwo}
              </p>
            </article>

            <div className="capability-grid">
              {t.about.capabilities.map(([title, copy]) => (
                <article className="capability-card reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-layout">
            <div className="contact-copy reveal">
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2>{t.contact.title}</h2>
              <p>{t.contact.body}</p>
              <div className="contact-methods">
                <a href="mailto:ikanev@icloud.com">ikanev@icloud.com</a>
                <a href="https://ivan-kanev.github.io/IvanKanev-iOS-Apps-Status/#appsGrid" target="_blank" rel="noreferrer">
                  {t.contact.portfolio}
                </a>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <label>
                <span>{t.contact.name}</span>
                <input name="name" type="text" autoComplete="name" required placeholder={t.contact.namePlaceholder} />
              </label>
              <label>
                <span>{t.contact.email}</span>
                <input name="email" type="email" autoComplete="email" required placeholder={t.contact.emailPlaceholder} />
              </label>
              <label>
                <span>{t.contact.topic}</span>
                <select name="topic" defaultValue={t.contact.topics[0]}>
                  {t.contact.topics.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t.contact.message}</span>
                <textarea name="message" rows={5} required placeholder={t.contact.messagePlaceholder} />
              </label>
              <button className="button primary" type="submit">
                {t.contact.submit}
              </button>
              {contactStatus && <p className="form-status">{contactStatus}</p>}
            </form>
          </div>
        </section>

        <section className="section studio" id="studio">
          <div className="studio-panel reveal">
            <FounderMark compact />
            <p className="eyebrow">{t.studio.eyebrow}</p>
            <h2>{t.studio.title}</h2>
            <p>{t.studio.body}</p>
            <div className="studio-actions">
              <a className="button primary magnetic" href="#apps">
                {t.studio.open}
              </a>
              <a className="button secondary magnetic" href="mailto:ikanev@icloud.com">
                {t.studio.contact}
              </a>
            </div>
          </div>
        </section>
      </main>

      <AppModal app={selectedApp} language={language} onClose={() => setSelectedApp(null)} />
    </>
  );
}
