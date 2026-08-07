import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { AppInfo, StatusKind } from "./data";
import { apps } from "./data";
import { useMotionSystem } from "./motion/useMotionSystem";
import { HeroScene } from "./visuals/HeroScene";

type Language = "en" | "de" | "fr" | "bg" | "ru";
type ThemeMode = "dark" | "light";
type ContactStatusKind = "" | "success" | "error";

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT ?? "https://formsubmit.co/ajax/ikanev@icloud.com";

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
      signals: "10 App Store signals",
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
      showing: "Showing",
      emptyTitle: "No apps in this view yet.",
      emptyBody: "Try another category or return to all apps.",
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
      eyebrow: "Ivan's Signature",
      title: "Every UDesign app should feel unmistakably made by Ivan Kanev.",
      cards: [
        ["Product naming", "The U prefix belongs to the flagship family. Specialist names like AvoCue, SwitchAir, and CircuitLab Designer still sit inside the same Ivan Kanev product world."],
        ["Launch language", "Each app leads with its own purpose, then connects back to the studio signature: built with the UDesign standard by Ivan Kanev."],
        ["Visual behavior", "Icons, cards, panels, and motion should feel crisp, useful, modern, and personal enough that the portfolio is recognizable at a glance."],
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
      title: "Send a professional inquiry to Ivan.",
      body: "Share your email, topic, and message. The form sends directly to Ivan without opening your mail app, and your email is included as the reply-to address.",
      portfolio: "App portfolio status",
      direct: "Direct email",
      promoTitle: "Need an app shaped around your workflow?",
      promoBody: "If you have a specific idea, internal process, or everyday problem that deserves a focused iOS app, start the conversation here. Ivan can help turn that need into a clean, useful product direction.",
      formTitle: "Project inquiry",
      formNote: "Your email is required so Ivan can reply directly.",
      name: "Name",
      email: "Email",
      topic: "Topic",
      message: "Message",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your.email@example.com",
      messagePlaceholder: "Tell Ivan what you want to build, improve, launch, or discuss.",
      topics: ["New app idea", "App support", "Brand or website", "Partnership"],
      submit: "Send directly",
      sending: "Sending...",
      sent: "Message sent directly to Ivan. Thank you.",
      failed: "The direct form could not send right now. Please try again in a moment.",
      subject: "UDesign inquiry from",
      visitor: "website visitor",
      replyTo: "Reply-to email",
      bodyLabel: "Message",
      footer: "No mail app will open. The message is delivered through the secure contact form endpoint.",
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
      signals: "10 App Store сигнала",
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
      showing: "Показани",
      emptyTitle: "Все още няма приложения в този изглед.",
      emptyBody: "Избери друга категория или се върни към всички приложения.",
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
      eyebrow: "Подписът на Иван",
      title: "Всяко UDesign приложение трябва ясно да носи почерка на Иван Канев.",
      cards: [
        ["Именуване", "U префиксът принадлежи на основното семейство. Имена като AvoCue, SwitchAir и CircuitLab Designer пак стоят в същия продуктов свят на Иван Канев."],
        ["Launch език", "Всяко приложение започва със своята конкретна цел, а след това се свързва със студийния подпис: изградено с UDesign стандарта от Иван Канев."],
        ["Визуално поведение", "Иконите, картите, панелите и motion системата трябва да са чисти, полезни, модерни и достатъчно лични, за да се разпознава портфолиото веднага."],
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
      title: "Изпрати професионално запитване до Иван.",
      body: "Добави своя имейл, тема и съобщение. Формата изпраща директно до Иван, без да отваря mail приложение, а твоят имейл се добавя като адрес за отговор.",
      portfolio: "Статус на приложенията",
      direct: "Директен имейл",
      promoTitle: "Имаш нужда от приложение, създадено около твоя процес?",
      promoBody: "Ако имаш конкретна идея, вътрешен workflow или ежедневен проблем, който заслужава фокусирано iOS приложение, започни разговора тук. Иван може да помогне тази нужда да се превърне в чиста и полезна продуктова посока.",
      formTitle: "Project inquiry",
      formNote: "Имейлът е задължителен, за да може Иван да отговори директно.",
      name: "Име",
      email: "Имейл",
      topic: "Тема",
      message: "Съобщение",
      namePlaceholder: "Твоето пълно име",
      emailPlaceholder: "your.email@example.com",
      messagePlaceholder: "Опиши какво искаш да изградиш, подобриш, пуснеш или обсъдим.",
      topics: ["Нова идея за приложение", "Поддръжка", "Бранд или уебсайт", "Партньорство"],
      submit: "Изпрати директно",
      sending: "Изпращане...",
      sent: "Съобщението е изпратено директно до Иван. Благодаря.",
      failed: "Директната форма не успя да изпрати в момента. Моля, опитай отново след малко.",
      subject: "UDesign запитване от",
      visitor: "посетител на сайта",
      replyTo: "Имейл за отговор",
      bodyLabel: "Съобщение",
      footer: "Няма да се отваря mail приложение. Съобщението се доставя през защитен contact form endpoint.",
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

const languageOptions: Array<{ value: Language; label: string; flag: string }> = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "fr", label: "Francais", flag: "🇫🇷" },
  { value: "bg", label: "Bulgarian", flag: "🇧🇬" },
  { value: "ru", label: "Russian", flag: "🇷🇺" },
];

type WidenCopy<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? ReadonlyArray<WidenCopy<Item>>
    : T extends object
      ? { [Key in keyof T]: WidenCopy<T[Key]> }
      : T;

type CopyBundle = WidenCopy<typeof copy.en>;

const localizedCopy: Record<Language, CopyBundle> = {
  en: copy.en,
  bg: copy.bg,
  de: {
    ...copy.en,
    nav: { ecosystem: "Okosystem", status: "Status", apps: "Apps", identity: "Identitat", about: "Uber Ivan", contact: "Kontakt", live: "Live-Status" },
    controls: { language: "Sprache", theme: "Design", dark: "Dunkel", light: "Hell" },
    hero: {
      eyebrow: "UDesign von Ivan Kanev",
      title: "Ein lebendiges Software-Universum rund um ein ikonisches U.",
      body: "UDesign ist die Premium-Studio-Identitat fur Ivan Kanevs Apps: nutzliche, visuelle und privacy-conscious iOS-Produkte mit einer klar wiedererkennbaren Signatur.",
      explore: "Apps ansehen",
      surprise: "Uberrasch mich",
      signals: "10 App Store Signale",
    },
    ecosystem: {
      eyebrow: "Brand Architecture",
      title: "UDesign ist das Studio. Jede App ist ein Signal aus demselben System.",
      cards: [
        ["01", "Umbrella Identity", "UDesign by Ivan Kanev lasst die Arbeit wie ein Premium-Softwarestudio wirken, nicht wie eine lose App-Liste."],
        ["02", "Signature Letter", "Das U wird zum zentralen Zeichen: nutzbar fur Icons, Launch Screens, Produkt-Badges, Support-Seiten und zukunftige App-Familien."],
        ["03", "Lebendiges Portfolio", "Die Website funktioniert als Produkt-Hub mit klickbaren App-Details, Kategorie-Filtern und direkten Links zu den offentlichen Seiten."],
      ],
    },
    status: {
      eyebrow: "App Store Connect Snapshot",
      title: "Dein Portfolio-Status als Premium-Command-Center.",
      ready: "bereit",
      review: "in Prufung",
      all: "Alle Status",
      readyFilter: "Ready for Distribution",
      reviewFilter: "Waiting for Review",
      readyLabel: "Ready for Distribution",
      reviewLabel: "Waiting for Review",
    },
    apps: {
      ...copy.en.apps,
      eyebrow: "App-Okosystem",
      title: "Echte Produkte. Echte Icons. Ein Premium-Zuhause.",
      count: "Apps",
      active: "aktiv",
      showing: "Angezeigt",
      emptyTitle: "In dieser Ansicht gibt es noch keine Apps.",
      emptyBody: "Wahle eine andere Kategorie oder kehre zu allen Apps zuruck.",
      filters: { ...copy.en.apps.filters, all: "Alle", learning: "Lernen", utility: "Utilities", finance: "Finanzen", lifestyle: "Lifestyle" },
    },
    identity: {
      eyebrow: "Ivans Signatur",
      title: "Jede UDesign-App soll unverkennbar nach Ivan Kanev fuhlen.",
      cards: [
        ["Product Naming", "Das U-Prafix gehort zur Flaggschiff-Familie. Namen wie AvoCue, SwitchAir und CircuitLab Designer bleiben trotzdem Teil derselben Ivan-Kanev-Produktwelt."],
        ["Launch-Sprache", "Jede App beginnt mit ihrem eigenen Zweck und verbindet sich danach mit der Studio-Signatur: gebaut mit dem UDesign-Standard von Ivan Kanev."],
        ["Visuelles Verhalten", "Icons, Karten, Panels und Motion sollen klar, nutzlich, modern und personlich genug sein, damit das Portfolio sofort wiedererkennbar ist."],
      ],
    },
    about: {
      eyebrow: "Uber Ivan",
      title: "Unabhangiger iOS Product Builder mit Studio-Anspruch.",
      bodyOne: "Ich entwerfe und entwickle fokussierte iOS-Apps, die konkrete Alltagsprobleme mit klaren Interfaces, privacy-conscious Architektur und wiedererkennbarer Produktidentitat losen. UDesign ist der Rahmen fur diese Arbeit.",
      bodyTwo: "Das Ziel ist nicht nur, Apps zu veroffentlichen. Das Ziel ist ein konsistentes Software-Okosystem, in dem jedes Produkt fur sich nutzlich ist und zugleich zu einer grosseren Premium-Familie gehort.",
      capabilities: [
        ["Product Design", "Interface-Systeme, App-Positionierung, Launch-Seiten und visuelle Hierarchie."],
        ["iOS Apps", "Native Produktkonzepte fur Utilities, Lernen, Finanzen, Reisen und Lifestyle."],
        ["Brand Systems", "Wiederverwendbare Naming-, Icon-, Motion- und Marketing-Muster fur jede UDesign-App."],
        ["GitHub Pages", "Schnelle statische Support-Seiten, Privacy-Seiten, Portfolio-Hubs und offentliche App-Dashboards."],
      ],
    },
    contact: {
      ...copy.en.contact,
      eyebrow: "Kontakt",
      title: "Sende eine professionelle Anfrage an Ivan.",
      body: "Teile deine E-Mail, ein Thema und deine Nachricht. Das Formular sendet direkt an Ivan, ohne deine Mail-App zu offnen, und deine E-Mail wird als Reply-to-Adresse mitgesendet.",
      portfolio: "App-Portfolio-Status",
      direct: "Direkte E-Mail",
      promoTitle: "Brauchst du eine App, die zu deinem Workflow passt?",
      promoBody: "Wenn du eine konkrete Idee, einen internen Prozess oder ein Alltagsproblem hast, das eine fokussierte iOS-App verdient, starte hier das Gesprach.",
      formNote: "Deine E-Mail ist erforderlich, damit Ivan direkt antworten kann.",
      name: "Name",
      email: "E-Mail",
      topic: "Thema",
      message: "Nachricht",
      namePlaceholder: "Dein vollstandiger Name",
      messagePlaceholder: "Erzahle Ivan, was du bauen, verbessern, starten oder besprechen mochtest.",
      topics: ["Neue App-Idee", "App-Support", "Brand oder Website", "Partnerschaft"],
      submit: "Direkt senden",
      sending: "Wird gesendet...",
      sent: "Nachricht direkt an Ivan gesendet. Vielen Dank.",
      failed: "Das Formular konnte gerade nicht senden. Bitte versuche es gleich erneut.",
      subject: "UDesign Anfrage von",
      visitor: "Website-Besucher",
      footer: "Keine Mail-App wird geoffnet. Die Nachricht wird uber den sicheren Contact-Form-Endpunkt zugestellt.",
    },
    studio: { eyebrow: "Studio-Richtung", title: "UDesign von Ivan Kanev", body: "Das ist die starkste langfristige Markenrichtung: klar genug fur eine personliche Founder-Story, breit genug fur ein Software-Okosystem und einpragsam genug fur zukunftige Apps.", open: "App Hub offnen", contact: "Ivan kontaktieren" },
    modal: { close: "Schliessen", does: "Was es macht", highlights: "Highlights", marketing: "Marketing", support: "Support", privacy: "Privacy" },
  },
  fr: {
    ...copy.en,
    nav: { ecosystem: "Ecosysteme", status: "Statut", apps: "Apps", identity: "Identite", about: "A propos", contact: "Contact", live: "Statut live" },
    controls: { language: "Langue", theme: "Theme", dark: "Sombre", light: "Clair" },
    hero: {
      eyebrow: "UDesign par Ivan Kanev",
      title: "Un univers logiciel vivant construit autour d'un U iconique.",
      body: "UDesign est l'identite premium du studio pour les apps d'Ivan Kanev: des produits iOS utiles, visuels et privacy-conscious avec une signature reconnaissable.",
      explore: "Explorer les apps",
      surprise: "Surprends-moi",
      signals: "10 signaux App Store",
    },
    ecosystem: {
      eyebrow: "Architecture de marque",
      title: "UDesign est le studio. Chaque app est un signal du meme systeme.",
      cards: [
        ["01", "Identite ombrelle", "UDesign by Ivan Kanev donne a ce travail la presence d'un studio logiciel premium, pas d'une simple liste d'apps."],
        ["02", "Lettre signature", "Le U devient le signe central: icons, launch screens, badges produit, pages support et futures familles d'apps."],
        ["03", "Portfolio vivant", "Le site agit comme un hub produit, avec details cliquables, filtres par categorie et liens directs vers les pages publiques."],
      ],
    },
    status: { ...copy.en.status, eyebrow: "Snapshot App Store Connect", title: "Le statut de ton portfolio transforme en command center premium.", ready: "pretes", review: "en revue", all: "Tous les statuts" },
    apps: {
      ...copy.en.apps,
      eyebrow: "Ecosysteme d'apps",
      title: "De vrais produits. De vraies icones. Une maison premium.",
      count: "apps",
      active: "actif",
      showing: "Affichage",
      emptyTitle: "Aucune app dans cette vue pour le moment.",
      emptyBody: "Essaie une autre categorie ou reviens a toutes les apps.",
      filters: { ...copy.en.apps.filters, all: "Toutes", learning: "Apprentissage", utility: "Utilitaires", finance: "Finance", lifestyle: "Lifestyle" },
    },
    identity: {
      eyebrow: "La signature d'Ivan",
      title: "Chaque app UDesign doit sembler clairement creee par Ivan Kanev.",
      cards: [
        ["Nom des produits", "Le prefixe U appartient a la famille principale. Des noms comme AvoCue, SwitchAir et CircuitLab Designer restent dans le meme monde produit d'Ivan Kanev."],
        ["Langage de lancement", "Chaque app commence par son objectif propre, puis revient a la signature studio: construite selon le standard UDesign par Ivan Kanev."],
        ["Comportement visuel", "Icônes, cartes, panneaux et animations doivent etre nets, utiles, modernes et assez personnels pour rendre le portfolio reconnaissable."],
      ],
    },
    about: {
      eyebrow: "A propos d'Ivan",
      title: "Createur independant de produits iOS avec un niveau de studio.",
      bodyOne: "Je conçois et construis des apps iOS ciblees qui resolvent des problemes du quotidien avec des interfaces claires, une architecture privacy-conscious et une identite produit reconnaissable. UDesign organise ce travail.",
      bodyTwo: "Le but n'est pas seulement de publier des apps. Le but est de construire un ecosysteme logiciel coherent ou chaque produit est utile seul et appartient a une famille premium plus large.",
      capabilities: [
        ["Product Design", "Systemes d'interface, positionnement d'apps, pages de lancement et hierarchie visuelle."],
        ["iOS Apps", "Concepts natifs pour utilitaires, apprentissage, finance, voyage et lifestyle."],
        ["Brand Systems", "Modeles reutilisables de naming, icons, motion et marketing pour chaque app UDesign."],
        ["GitHub Pages", "Pages support, privacy, hubs portfolio et dashboards publics rapides et statiques."],
      ],
    },
    contact: {
      ...copy.en.contact,
      eyebrow: "Contact",
      title: "Envoyer une demande professionnelle a Ivan.",
      body: "Ajoute ton e-mail, un sujet et ton message. Le formulaire envoie directement a Ivan sans ouvrir ton app mail, avec ton e-mail comme adresse de reponse.",
      portfolio: "Statut du portfolio",
      direct: "E-mail direct",
      promoTitle: "Besoin d'une app adaptee a ton workflow?",
      promoBody: "Si tu as une idee precise, un processus interne ou un probleme quotidien qui merite une app iOS ciblee, commence la conversation ici.",
      formNote: "Ton e-mail est requis pour qu'Ivan puisse repondre directement.",
      name: "Nom",
      email: "E-mail",
      topic: "Sujet",
      message: "Message",
      namePlaceholder: "Ton nom complet",
      messagePlaceholder: "Dis a Ivan ce que tu veux construire, ameliorer, lancer ou discuter.",
      topics: ["Nouvelle idee d'app", "Support app", "Marque ou site web", "Partenariat"],
      submit: "Envoyer directement",
      sending: "Envoi...",
      sent: "Message envoye directement a Ivan. Merci.",
      failed: "Le formulaire n'a pas pu envoyer maintenant. Reessaie dans un instant.",
      subject: "Demande UDesign de",
      visitor: "visiteur du site",
      footer: "Aucune app mail ne s'ouvrira. Le message est livre via le contact form endpoint securise.",
    },
    studio: { eyebrow: "Direction du studio", title: "UDesign par Ivan Kanev", body: "C'est la direction de marque la plus forte a long terme: claire pour une histoire de fondateur, assez large pour un ecosysteme logiciel et memorable pour les futures apps.", open: "Ouvrir le hub apps", contact: "Contacter Ivan" },
    modal: { close: "Fermer", does: "Ce que fait l'app", highlights: "Points forts", marketing: "Marketing", support: "Support", privacy: "Privacy" },
  },
  ru: {
    ...copy.en,
    nav: { ecosystem: "Экосистема", status: "Статус", apps: "Приложения", identity: "Айдентика", about: "Об Иване", contact: "Контакт", live: "Live статус" },
    controls: { language: "Язык", theme: "Тема", dark: "Темная", light: "Светлая" },
    hero: {
      eyebrow: "UDesign от Ивана Канева",
      title: "Живая программная вселенная вокруг узнаваемой буквы U.",
      body: "UDesign — это премиальная студийная идентичность для приложений Ивана Канева: полезных, визуальных и privacy-conscious iOS-продуктов с общей подписью.",
      explore: "Смотреть приложения",
      surprise: "Удиви меня",
      signals: "10 сигналов App Store",
    },
    ecosystem: {
      eyebrow: "Архитектура бренда",
      title: "UDesign — это студия. Каждое приложение — сигнал из одной системы.",
      cards: [
        ["01", "Единая идентичность", "UDesign by Ivan Kanev превращает портфолио в премиальную software-студию, а не в разрозненный список приложений."],
        ["02", "Фирменная буква", "U становится главным знаком: для иконок, launch screens, продуктовых badges, support-страниц и будущих app-семейств."],
        ["03", "Живое портфолио", "Сайт работает как продуктовый hub с кликабельными деталями приложений, фильтрами и прямыми ссылками на публичные страницы."],
      ],
    },
    status: { ...copy.en.status, eyebrow: "App Store Connect snapshot", title: "Статус портфолио в формате премиального command center.", ready: "готовы", review: "на проверке", all: "Все статусы" },
    apps: {
      ...copy.en.apps,
      eyebrow: "Экосистема приложений",
      title: "Реальные продукты. Реальные иконки. Один премиальный дом.",
      count: "приложений",
      active: "активно",
      showing: "Показано",
      emptyTitle: "В этом виде пока нет приложений.",
      emptyBody: "Выбери другую категорию или вернись ко всем приложениям.",
      filters: { ...copy.en.apps.filters, all: "Все", learning: "Обучение", utility: "Утилиты", finance: "Финансы", lifestyle: "Lifestyle", "appstore-ready": "Готовы", "appstore-review": "На проверке" },
    },
    identity: {
      eyebrow: "Подпись Ивана",
      title: "Каждое приложение UDesign должно ясно ощущаться как работа Ивана Канева.",
      cards: [
        ["Имена продуктов", "Префикс U принадлежит основной семье. AvoCue, SwitchAir и CircuitLab Designer при этом остаются частью того же продуктового мира Ивана Канева."],
        ["Язык запуска", "Каждое приложение начинает с собственной цели, а затем связывается со студийной подписью: создано по стандарту UDesign Иваном Каневым."],
        ["Визуальное поведение", "Иконки, карточки, панели и motion должны быть чистыми, полезными, современными и достаточно личными, чтобы портфолио узнавалось сразу."],
      ],
    },
    about: {
      eyebrow: "Об Иване",
      title: "Независимый iOS product builder со студийным стандартом.",
      bodyOne: "Я проектирую и создаю сфокусированные iOS-приложения, которые решают конкретные повседневные задачи через чистый интерфейс, privacy-conscious архитектуру и узнаваемую продуктовую идентичность. UDesign объединяет эту работу.",
      bodyTwo: "Цель не только в публикации приложений. Цель — построить последовательную software-экосистему, где каждый продукт полезен сам по себе и принадлежит к большей премиальной семье.",
      capabilities: [
        ["Product Design", "Interface systems, позиционирование приложений, launch-страницы и визуальная иерархия."],
        ["iOS Apps", "Native product concepts для utilities, learning, finance, travel и lifestyle."],
        ["Brand Systems", "Повторяемые модели naming, icon, motion и marketing для каждого приложения UDesign."],
        ["GitHub Pages", "Быстрые static support sites, privacy pages, portfolio hubs и public dashboards."],
      ],
    },
    contact: {
      ...copy.en.contact,
      eyebrow: "Контакт",
      title: "Отправь профессиональный запрос Ивану.",
      body: "Добавь свой e-mail, тему и сообщение. Форма отправляет напрямую Ивану, не открывая почтовое приложение, а твой e-mail добавляется как адрес для ответа.",
      portfolio: "Статус портфолио",
      direct: "Прямой e-mail",
      promoTitle: "Нужно приложение под твой workflow?",
      promoBody: "Если у тебя есть конкретная идея, внутренний процесс или ежедневная проблема, которая заслуживает сфокусированного iOS-приложения, начни разговор здесь.",
      formNote: "Твой e-mail обязателен, чтобы Иван мог ответить напрямую.",
      name: "Имя",
      email: "E-mail",
      topic: "Тема",
      message: "Сообщение",
      namePlaceholder: "Твое полное имя",
      messagePlaceholder: "Расскажи Ивану, что ты хочешь построить, улучшить, запустить или обсудить.",
      topics: ["Новая идея приложения", "Поддержка приложения", "Бренд или сайт", "Партнерство"],
      submit: "Отправить напрямую",
      sending: "Отправка...",
      sent: "Сообщение отправлено напрямую Ивану. Спасибо.",
      failed: "Форма сейчас не смогла отправить сообщение. Попробуй еще раз чуть позже.",
      subject: "UDesign запрос от",
      visitor: "посетитель сайта",
      footer: "Почтовое приложение не откроется. Сообщение доставляется через защищенный contact form endpoint.",
    },
    studio: { eyebrow: "Направление студии", title: "UDesign от Ивана Канева", body: "Это самое сильное долгосрочное направление бренда: ясное для founder story, достаточно широкое для software ecosystem и запоминающееся для будущих приложений.", open: "Открыть app hub", contact: "Связаться с Иваном" },
    modal: { close: "Закрыть", does: "Что делает", highlights: "Highlights", marketing: "Marketing", support: "Support", privacy: "Privacy" },
  },
};

const statusCopyKey: Record<StatusKind, "readyLabel" | "reviewLabel"> = {
  ready: "readyLabel",
  review: "reviewLabel",
};

type AppFilterId = "all" | "u-family" | "learning" | "utility" | "finance" | "lifestyle" | "appstore-ready" | "appstore-review";

const appFilters: Array<{ id: AppFilterId; matches: (app: AppInfo) => boolean }> = [
  { id: "all", matches: () => true },
  { id: "u-family", matches: (app) => app.tags.includes("u-family") },
  { id: "learning", matches: (app) => app.category === "Learning" },
  { id: "utility", matches: (app) => app.category === "Utility" || app.tags.includes("utility") },
  { id: "finance", matches: (app) => app.category === "Finance" },
  { id: "lifestyle", matches: (app) => app.category === "Lifestyle" },
  { id: "appstore-ready", matches: (app) => app.statusKind === "ready" },
  { id: "appstore-review", matches: (app) => app.statusKind === "review" },
];

const statusFilters = [
  "all",
  "ready",
  "review",
] as const;

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const storedLanguage = window.localStorage.getItem("udesign-language");
  return languageOptions.some((option) => option.value === storedLanguage) ? (storedLanguage as Language) : "en";
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
        </defs>
        <circle className="mark-orbit" cx="80" cy="80" r="68" />
        <path className="mark-u-shadow" d="M45 28v52c0 27 13 45 35 45s35-18 35-45V28" />
        <path className="mark-u" d="M45 28v52c0 27 13 45 35 45s35-18 35-45V28" />
        <path className="mark-cut" d="M62 30v50c0 14 6 23 18 23s18-9 18-23V30" />
        <text className="mark-ik" x="80" y="88" textAnchor="middle">
          IK
        </text>
      </svg>
    </span>
  );
}

function AppModal({ app, onClose, language }: { app: AppInfo | null; onClose: () => void; language: Language }) {
  const t = localizedCopy[language];

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
  const [appFilter, setAppFilter] = useState<AppFilterId>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | StatusKind>("all");
  const [contactStatus, setContactStatus] = useState("");
  const [contactStatusKind, setContactStatusKind] = useState<ContactStatusKind>("");
  const [contactSending, setContactSending] = useState(false);
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const t = localizedCopy[language];

  useMotionSystem();

  const readyCount = apps.filter((app) => app.statusKind === "ready").length;
  const reviewCount = apps.filter((app) => app.statusKind === "review").length;
  const activeAppFilter = appFilters.find((filter) => filter.id === appFilter) ?? appFilters[0];
  const filteredApps = apps.filter(activeAppFilter.matches);
  const appFilterCounts = Object.fromEntries(appFilters.map((filter) => [filter.id, apps.filter(filter.matches).length])) as Record<AppFilterId, number>;
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

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const honey = String(formData.get("_honey") ?? "").trim();

    if (honey) return;

    setContactSending(true);
    setContactStatus("");
    setContactStatusKind("");

    const payload = new FormData();
    payload.append("name", name);
    payload.append("email", email);
    payload.append("reply_to", email);
    payload.append("_replyto", email);
    payload.append("topic", topic);
    payload.append("message", message);
    payload.append("_subject", `${t.contact.subject} ${name || t.contact.visitor}`);
    payload.append("_template", "table");
    payload.append("_captcha", "false");
    payload.append("source", "UDesign website contact form");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Contact form failed with ${response.status}`);
      }

      form.reset();
      setContactStatus(t.contact.sent);
      setContactStatusKind("success");
    } catch {
      setContactStatus(t.contact.failed);
      setContactStatusKind("error");
    } finally {
      setContactSending(false);
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {language === "bg" ? "Към съдържанието" : language === "ru" ? "К содержанию" : "Skip to content"}
      </a>
      <div className="cursor-aura" aria-hidden="true" />

      <header className="site-header">
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
          <span className="sr-only">{language === "bg" ? "Отвори меню" : language === "ru" ? "Открыть меню" : "Open menu"}</span>
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
          <label className="language-control">
            <span className="sr-only">{t.controls.language}</span>
            <span className="language-flag" aria-hidden="true">
              {languageOptions.find((option) => option.value === language)?.flag}
            </span>
            <select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label={t.controls.language}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
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
            {appFilters.map(({ id }) => (
              <button
                aria-pressed={appFilter === id}
                className={`filter ${appFilter === id ? "active" : ""}`}
                data-filter={id}
                type="button"
                key={id}
                onClick={() => setAppFilter(id)}
              >
                <span>{t.apps.filters[id]}</span>
                <strong>{appFilterCounts[id]}</strong>
              </button>
            ))}
          </div>

          <p className="filter-result reveal" aria-live="polite">
            {t.apps.showing} {filteredApps.length} / {apps.length}
          </p>

          <div className="app-grid" aria-live="polite">
            {filteredApps.length > 0 ? filteredApps.map((app) => (
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
            )) : (
              <div className="empty-state">
                <h3>{t.apps.emptyTitle}</h3>
                <p>{t.apps.emptyBody}</p>
                <button className="button secondary" type="button" onClick={() => setAppFilter("all")}>
                  {t.apps.filters.all}
                </button>
              </div>
            )}
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
              <div className="contact-promo">
                <span>Custom iOS product</span>
                <strong>{t.contact.promoTitle}</strong>
                <p>{t.contact.promoBody}</p>
              </div>
              <div className="contact-proof">
                <span>{t.contact.direct}</span>
                <strong>ikanev@icloud.com</strong>
              </div>
              <div className="contact-methods">
                <a href="https://ivan-kanev.github.io/IvanKanev-iOS-Apps-Status/#appsGrid" target="_blank" rel="noreferrer">
                  {t.contact.portfolio}
                </a>
              </div>
            </div>

            <form className="contact-form reveal" onSubmit={handleContactSubmit}>
              <input className="honeypot" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="form-head">
                <div>
                  <span>{t.contact.formTitle}</span>
                  <strong>UDesign / Ivan Kanev</strong>
                </div>
                <p>{t.contact.formNote}</p>
              </div>
              <div className="form-grid">
                <label>
                  <span>{t.contact.name}</span>
                  <input name="name" type="text" autoComplete="name" required placeholder={t.contact.namePlaceholder} />
                </label>
                <label>
                  <span>{t.contact.email}</span>
                  <input name="email" type="email" autoComplete="email" required placeholder={t.contact.emailPlaceholder} />
                </label>
              </div>
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
                <textarea name="message" rows={6} required minLength={12} placeholder={t.contact.messagePlaceholder} />
              </label>
              <p className="form-disclaimer">{t.contact.footer}</p>
              <button className="button primary" type="submit" disabled={contactSending}>
                {contactSending ? t.contact.sending : t.contact.submit}
              </button>
              {contactStatus && <p className={`form-status ${contactStatusKind}`}>{contactStatus}</p>}
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
              <a className="button secondary magnetic" href="#contact">
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
