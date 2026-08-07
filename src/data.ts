export type StatusKind = "ready" | "review";

export type AppInfo = {
  name: string;
  version: string;
  statusKind: StatusKind;
  icon: string;
  category: "Utility" | "Finance" | "Learning" | "Lifestyle";
  tags: string[];
  subtitle: string;
  marketing?: string;
  support?: string;
  privacy?: string;
  description: string;
  features: string[];
};

export const statusLabels: Record<StatusKind, string> = {
  ready: "Ready for Distribution",
  review: "Waiting for Review",
};

export const apps: AppInfo[] = [
  {
    name: "UPerifery",
    version: "iOS 1.0",
    statusKind: "review",
    icon: "assets/appstore-connect/uperifery.png",
    category: "Utility",
    tags: ["u-family", "utility", "appstore-review"],
    subtitle: "Peripheral-focused utility in the UDesign family",
    description: "UPerifery joins the UDesign family as a focused utility product with a distinctive blue navigation-style icon and a clear App Store Connect review state.",
    features: [
      "Part of the U-prefixed flagship product family.",
      "Currently visible in App Store Connect as iOS 1.0 Waiting for Review.",
      "Presented as an active signal in the growing UDesign ecosystem.",
    ],
  },
  {
    name: "UPlugPay",
    version: "iOS 1.0",
    statusKind: "ready",
    icon: "assets/appstore-connect/uplugpay.png",
    category: "Finance",
    tags: ["u-family", "finance", "utility", "appstore-ready"],
    subtitle: "Payment-energy utility with a bold UDesign signal",
    description: "UPlugPay appears in App Store Connect as ready for distribution, extending the UDesign family into a sharper payment and utility direction.",
    features: [
      "Part of the U-prefixed flagship product family.",
      "Marked iOS 1.0 Ready for Distribution in App Store Connect.",
      "Uses a bold green lightning identity that adds range to the UDesign product wall.",
    ],
  },
  {
    name: "UCircuit",
    version: "iOS 1.0.6",
    statusKind: "ready",
    icon: "assets/appstore-connect/ucircuit.png",
    category: "Learning",
    tags: ["u-family", "learning", "appstore-ready"],
    subtitle: "First engineering lab for kids",
    marketing: "https://ivan-kanev.github.io/ucircuit-support/index.html",
    support: "https://ivan-kanev.github.io/ucircuit-support/support.html",
    privacy: "https://ivan-kanev.github.io/ucircuit-support/privacy.html",
    description: "A playful visual learning app that helps children understand electricity through guided circuit labs, safe experimentation, feedback, badges, and progress.",
    features: [
      "Guided labs starting from Battery + Bulb + Switch concepts.",
      "Instant animation-based feedback when circuits work.",
      "Marked iOS 1.0.6 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "GitBudgetStudio",
    version: "iOS 1.0.6",
    statusKind: "ready",
    icon: "assets/appstore-connect/gitbudgetstudio.png",
    category: "Finance",
    tags: ["finance", "appstore-ready"],
    subtitle: "Income, expenses, and trends",
    marketing: "https://ivan-kanev.github.io/gitbudgetstudio-support/",
    support: "https://ivan-kanev.github.io/gitbudgetstudio-support/support.html",
    privacy: "https://ivan-kanev.github.io/gitbudgetstudio-support/privacy.html",
    description: "A modern personal finance app focused on clarity, income, expenses, trends, and visual understanding rather than spreadsheet-style budgeting.",
    features: [
      "Income overview and expense tracking.",
      "Smart history with edit, duplicate, and transaction management.",
      "Marked iOS 1.0.6 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "SwitchAir",
    version: "iOS 1.0",
    statusKind: "ready",
    icon: "assets/appstore-connect/switchair.png",
    category: "Utility",
    tags: ["utility", "appstore-ready"],
    subtitle: "Flight reminders, refined",
    marketing: "https://ivan-kanev.github.io/switchair-support/index.html",
    support: "https://ivan-kanev.github.io/switchair-support/support.html",
    privacy: "https://ivan-kanev.github.io/switchair-support/privacy.html",
    description: "A travel utility that reminds users exactly when to enable and disable Airplane Mode, with boarding pass import, local reminders, and flight history.",
    features: [
      "Takeoff reminders before departure and landing reminders after arrival.",
      "Flight details including airline, route, departure, arrival, and duration.",
      "Marked iOS 1.0 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "AvoCue",
    version: "iOS 1.0",
    statusKind: "ready",
    icon: "assets/appstore-connect/avocue.png",
    category: "Lifestyle",
    tags: ["lifestyle", "utility", "appstore-ready"],
    subtitle: "Smart avocado freshness guidance",
    marketing: "https://ivan-kanev.github.io/avocue-support/index.html",
    support: "https://ivan-kanev.github.io/avocue-support/support.html",
    privacy: "https://ivan-kanev.github.io/avocue-support/privacy.html",
    description: "A premium dark-interface app for evaluating avocado ripeness, tracking freshness checks, reviewing previous results, and making better timing decisions.",
    features: [
      "Quick avocado freshness and ripeness guidance.",
      "Camera-centered flow for fast visual checking.",
      "Marked iOS 1.0 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "UFood",
    version: "iOS 1.0",
    statusKind: "ready",
    icon: "assets/appstore-connect/ufood.png",
    category: "Lifestyle",
    tags: ["u-family", "lifestyle", "appstore-ready"],
    subtitle: "Private recipe studio for iPhone and iPad",
    marketing: "https://ivan-kanev.github.io/ufood-support/index.html",
    support: "https://ivan-kanev.github.io/ufood-support/support.html",
    privacy: "https://ivan-kanev.github.io/ufood-support/privacy.html",
    description: "A private recipe studio for saving meals, organizing personal recipes, adding photos, tracking favorites, and understanding cooking habits through clean food statistics.",
    features: [
      "Create recipes with ingredients, steps, servings, preparation time, and photos.",
      "Browse a polished personal food library with filters and favorites.",
      "Marked iOS 1.0 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "BudgetFlowStudio",
    version: "iOS 1.0.2",
    statusKind: "ready",
    icon: "assets/appstore-connect/budgetflowstudio.png",
    category: "Finance",
    tags: ["finance", "appstore-ready"],
    subtitle: "Visual-first personal finance",
    marketing: "https://ivan-kanev.github.io/budgetflow-studio-support/index.html",
    support: "https://ivan-kanev.github.io/budgetflow-studio-support/support.html",
    privacy: "https://ivan-kanev.github.io/budgetflow-studio-support/privacy.html",
    description: "A privacy-first personal finance app built around visual clarity, spending flows, trends, predictions, and deep analytics.",
    features: [
      "Clean dashboard for an instant financial overview.",
      "Spending bars and flow-style visualizations.",
      "Marked iOS 1.0.2 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "UProxi",
    version: "iOS 1.0.2",
    statusKind: "ready",
    icon: "assets/appstore-connect/uproxi.png",
    category: "Utility",
    tags: ["u-family", "utility", "appstore-ready"],
    subtitle: "Location-aware loyalty cards for Bulgaria",
    marketing: "https://ivan-kanev.github.io/uproxi-support/index.html",
    support: "https://ivan-kanev.github.io/uproxi-support/support.html",
    privacy: "https://ivan-kanev.github.io/uproxi-support/privacy.html",
    description: "A local utility that shows the right loyalty card near supported stores in Bulgaria, reducing checkout friction with proximity hints and quick barcode access.",
    features: [
      "Nearby supported stores with distance indicators.",
      "One-tap barcode or QR loyalty card display.",
      "Marked iOS 1.0.2 Ready for Distribution in App Store Connect.",
    ],
  },
  {
    name: "CircuitLab Designer",
    version: "iOS 1.3",
    statusKind: "ready",
    icon: "assets/appstore-connect/circuitlab-designer.png",
    category: "Learning",
    tags: ["learning", "appstore-ready"],
    subtitle: "Build circuits. See electricity.",
    marketing: "https://ivan-kanev.github.io/circuitlab-designer-support/index.html",
    support: "https://ivan-kanev.github.io/circuitlab-designer-support/support.html",
    privacy: "https://ivan-kanev.github.io/circuitlab-designer-support/privacy.html",
    description: "An offline learning experience for understanding electrical circuits through interactive challenges, progressive levels, smart hints, and instant feedback.",
    features: [
      "Progressive circuit-building levels.",
      "Smart hints that help without giving away the solution.",
      "Marked iOS 1.3 Ready for Distribution in App Store Connect.",
    ],
  },
];
