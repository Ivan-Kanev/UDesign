import { useEffect, useMemo, useState } from "react";
import type { AppInfo, StatusKind } from "./data";
import { apps, statusLabels } from "./data";
import { useMotionSystem } from "./motion/useMotionSystem";
import { HeroScene } from "./visuals/HeroScene";

const navItems = ["Ecosystem", "Status", "Apps", "Identity", "Studio"];
const appFilters = [
  ["all", "All"],
  ["u-family", "U Family"],
  ["learning", "Learning"],
  ["utility", "Utilities"],
  ["finance", "Finance"],
  ["lifestyle", "Lifestyle"],
  ["appstore-ready", "Ready"],
  ["appstore-review", "In Review"],
] as const;

const statusFilters = [
  ["all", "All statuses"],
  ["ready", "Ready for Distribution"],
  ["review", "Waiting for Review"],
] as const;

function StatusPill({ kind }: { kind: StatusKind }) {
  return (
    <span className={`status-pill ${kind}`}>
      <span className="status-dot" />
      {statusLabels[kind]}
    </span>
  );
}

function AppModal({ app, onClose }: { app: AppInfo | null; onClose: () => void }) {
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
      <button className="modal-backdrop" type="button" aria-label="Close app details" onClick={onClose} />
      <section className="modal-sheet" tabIndex={-1}>
        <button className="modal-close" type="button" onClick={onClose}>
          Close
        </button>
        <div className="modal-head">
          <img src={app.icon} alt={`${app.name} icon`} />
          <div>
            <p className="eyebrow">{app.category} / App Store Connect</p>
            <h2 id="modalTitle">{app.name}</h2>
            <p>
              {app.version} / {statusLabels[app.statusKind]} / {app.subtitle}
            </p>
          </div>
        </div>
        <div className="modal-body">
          <article>
            <h3>What it does</h3>
            <p>{app.description}</p>
          </article>
          <article>
            <h3>Highlights</h3>
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
              Marketing
            </a>
          )}
          {app.support && (
            <a className="button secondary" href={app.support} target="_blank" rel="noreferrer">
              Support
            </a>
          )}
          {app.privacy && (
            <a className="button secondary" href={app.privacy} target="_blank" rel="noreferrer">
              Privacy
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

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="cursor-aura" aria-hidden="true" />

      <header className="site-header reveal">
        <a className="brand-lockup magnetic" href="#top" aria-label="UDesign home">
          <span className="u-mark" aria-hidden="true">
            U
          </span>
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
          <span className="sr-only">Open menu</span>
        </button>

        <nav className="site-nav" id="primary-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
          <a className="nav-pill" href="https://ivan-kanev.github.io/IvanKanev-iOS-Apps-Status/#appsGrid" target="_blank" rel="noreferrer">
            Live Status
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section" id="top">
          <HeroScene />
          <div className="hero-content">
            <p className="eyebrow reveal">UDesign by Ivan Kanev</p>
            <h1 className="reveal">A living software universe built around one iconic U.</h1>
            <p className="hero-copy reveal">
              UDesign is the premium studio identity for Ivan Kanev&apos;s apps: useful, visual, privacy-conscious iOS products that share one recognizable signature.
            </p>
            <div className="hero-actions reveal">
              <a className="button primary magnetic" href="#apps">
                Explore apps
              </a>
              <button className="button secondary magnetic" type="button" onClick={() => setSelectedApp(randomApp())}>
                Surprise me
              </button>
            </div>
          </div>

          <aside className="command-deck reveal" aria-label="UDesign app command deck">
            <div className="deck-head">
              <span>U / OS</span>
              <strong>11 App Store signals</strong>
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
            <p className="eyebrow">Brand Architecture</p>
            <h2>UDesign is the studio. Every app is a signal from the same system.</h2>
          </div>
          <div className="brand-system">
            {[
              ["01", "Umbrella Identity", "UDesign by Ivan Kanev makes the work feel like a premium software company, not a scattered app list."],
              ["02", "Signature Letter", "The U becomes the master mark: flexible for icons, launch screens, product badges, support pages, and future app families."],
              ["03", "Living Portfolio", "The site behaves like a product hub, with clickable app details, category filters, and direct paths into each app's public pages."],
            ].map(([number, title, copy]) => (
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
              <p className="eyebrow">App Store Connect Snapshot</p>
              <h2>Your portfolio status, translated into a premium command center.</h2>
            </div>
            <div className="status-summary" aria-label="App Store Connect summary">
              <span className="summary-ready">
                <strong>{readyCount}</strong> ready
              </span>
              <span className="summary-review">
                <strong>{reviewCount}</strong> in review
              </span>
            </div>
          </div>

          <div className="status-toolbar reveal" aria-label="Filter App Store Connect status">
            {statusFilters.map(([value, label]) => (
              <button className={`status-filter ${statusFilter === value ? "active" : ""}`} type="button" key={value} onClick={() => setStatusFilter(value)}>
                {label}
              </button>
            ))}
          </div>

          <div className="status-board" aria-live="polite">
            {filteredStatusApps.map((app) => (
              <button className="status-card magnetic reveal" type="button" key={app.name} onClick={() => setSelectedApp(app)}>
                <img src={app.icon} alt={`${app.name} icon`} />
                <div>
                  <h3>{app.name}</h3>
                  <p>{app.version}</p>
                  <StatusPill kind={app.statusKind} />
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section apps-section" id="apps">
          <div className="section-heading split reveal">
            <div>
              <p className="eyebrow">App Ecosystem</p>
              <h2>Real products. Real icons. One premium home.</h2>
            </div>
            <div className="metrics" aria-label="Portfolio metrics">
              <span>
                <strong>{apps.length}</strong> apps
              </span>
              <span>
                <strong>iOS</strong> native
              </span>
              <span>
                <strong>2026</strong> active
              </span>
            </div>
          </div>

          <div className="filter-bar reveal" aria-label="Filter apps by category">
            {appFilters.map(([value, label]) => (
              <button className={`filter ${appFilter === value ? "active" : ""}`} type="button" key={value} onClick={() => setAppFilter(value)}>
                {label}
              </button>
            ))}
          </div>

          <div className="app-grid" aria-live="polite">
            {filteredApps.map((app) => (
              <button className="app-card magnetic reveal" type="button" key={app.name} onClick={() => setSelectedApp(app)}>
                <img className="app-icon" src={app.icon} alt={`${app.name} icon`} />
                <div className="app-card-top">
                  <StatusPill kind={app.statusKind} />
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
            <p className="eyebrow">Identity System</p>
            <h2>The U is not decoration. It is the operating system of the brand.</h2>
          </div>
          <div className="identity-layout">
            <div className="identity-stage reveal">
              <div className="stage-card">
                <div className="stage-mark">U</div>
                <div className="stage-caption">
                  <span>UDesign</span>
                  <strong>by Ivan Kanev</strong>
                </div>
              </div>
            </div>
            <div className="system-list">
              {[
                ["Product naming", "Use the U prefix when the app belongs to the flagship family. Let specialist names like VideoY or AvoCue still carry the UDesign endorsement."],
                ["Launch language", "Lead with the specific app purpose, then anchor it back to the studio: A UDesign app by Ivan Kanev."],
                ["Visual behavior", "Icons, cards, panels, and motion should feel precise, illuminated, direct, and touchable across every product surface."],
              ].map(([title, copy]) => (
                <article className="reveal" key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section studio" id="studio">
          <div className="studio-panel reveal">
            <p className="eyebrow">Studio Direction</p>
            <h2>UDesign by Ivan Kanev</h2>
            <p>
              This is the strongest long-term brand direction: clear enough for a personal founder story, broad enough for a software ecosystem, and memorable enough to make future apps feel connected from day one.
            </p>
            <div className="studio-actions">
              <a className="button primary magnetic" href="#apps">
                Open app hub
              </a>
              <a className="button secondary magnetic" href="mailto:ikanev@icloud.com">
                Contact Ivan
              </a>
            </div>
          </div>
        </section>
      </main>

      <AppModal app={selectedApp} onClose={() => setSelectedApp(null)} />
    </>
  );
}
