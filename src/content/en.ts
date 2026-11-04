import type { Dictionary } from "./types";

export const en: Dictionary = {
  htmlLang: "en",
  meta: {
    title: "Ayrames Teodósio · Full Stack Developer",
    description:
      "Ayrames Teodósio, full stack developer in Maceió, Brazil. From pixel to database.",
  },
  skipLink: "Skip to content",
  brandLabel: "Ayrames Teodósio, home",
  navLabel: "Sections",
  languageLabel: "Language",
  team: { label: "Accent color", ver: "Blue, yellow and red", lec: "Rosso corsa" },
  sections: {
    top: { id: "top", title: "Home" },
    about: { id: "about", title: "About" },
    experience: { id: "experience", title: "Experience" },
    projects: { id: "projects", title: "Projects" },
    stack: { id: "stack", title: "Stack" },
    contact: { id: "contact", title: "Contact" },
  },
  hero: {
    status: "Open to projects and opportunities",
    location: "Maceió, Brazil",
    role: "Full Stack Developer",
    tagline: "From pixel to database.",
    ctaProjects: "See projects",
    ctaContact: "Get in touch",
    portraitAlt: "Portrait of Ayrames Teodósio wearing a black shirt and a badge at a tech event",
  },
  about: {
    lead: "I'm a full stack developer, and I spent a year and eight months at Inovaxio building lending, payments and delivery products for clients. I graduated in Internet Systems from UNCISAL. I work from the interface people use down to the API and the database behind it, and I go deeper into the back end every day.",
    facts: [
      { term: "Now", value: "Available to start now" },
      { term: "Education", value: "Internet Systems, UNCISAL" },
      { term: "Next", value: "Deeper into the back end" },
    ],
    offTrackLabel: "Off the clock:",
    offTrack: "race Sundays cheering for Max and Charles, and a game backlog that never ends.",
  },
  experience: {
    company: "Inovaxio",
    role: "Junior Full Stack Developer",
    period: "Apr 2025 to Nov 2026",
    lead: "A custom software company building products for clients. I started on the front end, became the main developer of two products' dashboards and, in 2026, also started maintaining the Rails APIs of the payment and debt renegotiation platforms.",
    facts: [
      { term: "Products", value: "10" },
      { term: "Commits", value: "1,100+" },
      { term: "Test files", value: "650+" },
      { term: "Tenure", value: "1 year, 8 months" },
    ],
    items: {
      credito: {
        name: "Lending platform",
        text: "Main developer of the admin dashboard, with 86% of the commits: analytics, customer pre-screening, loans and an audit trail.",
        period: "Nov 2025 to Apr 2026",
      },
      entregas: {
        name: "Delivery management",
        text: "Main developer of the business portal, with 77% of the commits: OTP login, digital signatures, audio recording and push notifications.",
        period: "Jun 2025 to Nov 2025",
      },
      pagamentos: {
        name: "Payment platforms",
        text: "Three products. On the front end, a digital account with charges, subscriptions, payment links, split payments and instant payment refunds. In Rails, prepaid card and anti-fraud approval screens, plus maintenance on filters and reports for charges, subscriptions and receivables.",
        period: "Apr 2026 to Nov 2026",
      },
      renegociacao: {
        name: "Debt renegotiation",
        text: "React dashboard with two-factor login and, on the Rails API, maintenance and improvements to the refinancing and bulk approval rules, with RSpec integration tests.",
        period: "Apr 2025 to Sep 2026",
      },
      crm: {
        name: "Internal CRM",
        text: "In a TypeScript monorepo, the email module with SendGrid and parts of the quoting engine and lead capture through n8n.",
        period: "Jun 2026 to Aug 2026",
      },
      site: {
        name: "Company website and landing pages",
        text: "Inovaxio's own website, in two versions, and landing pages, with a spam-protected form (honeypot and per-IP rate limiting), continuous integration and deployment.",
        period: "Jul 2025 to Oct 2026",
      },
      transmissoes: {
        name: "Live streaming",
        text: "Live streams page in the web app, with banners and ad slots.",
        period: "Jun 2025 to Aug 2025",
      },
    },
    practicesLabel: "Day to day:",
    practices: "tests shipped with every change, code review and continuous integration before deployment.",
  },
  projects: {
    legend: { public: "Public", running: "Running or in testing", design: "In design" },
    columns: { pos: "Pos", project: "Project", stack: "Stack", status: "Status" },
    items: {
      prumo: {
        name: "Prumo",
        summary:
          "Inventory, sales and delivery SaaS for mattress stores, with branches, POS and a driver app.",
        status: "In design",
        statusDetail: "prototype, 32 screens",
        statusShort: "In design, 32 screens",
        lead: {
          strong: "Clickable prototype",
          rest: " with the same sample data on every screen: stock per branch, POS, reconciliation, route planning and the driver app.",
        },
        note: "Next step: bring the design to Next.js with a Rails API.",
        detailsLabel: "Prumo details",
        mediaLabel:
          "Prumo outgoing shipments screen in dark mode, with transfers between stores, sales and gifts in a table",
      },
      "mouse-bridge": {
        name: "Mouse Bridge",
        summary:
          "One keyboard and one mouse for two computers, Windows and Linux, over the network with TLS.",
        status: "In testing",
        statusDetail: "Windows and Linux",
        statusShort: "In testing",
        lead: {
          strong: "TLS 1.3 pairing",
          rest: " with certificate fingerprint verification on both sides.",
        },
        note: "Control crosses the screen edge, and an emergency shortcut hands everything back to the local computer.",
        detailsLabel: "Mouse Bridge details",
        mediaLabel:
          "Mouse Bridge dashboard showing this computer, connected computers with latency and the emergency shortcut",
      },
      dualsense: {
        name: "Painel do DualSense",
        summary:
          "Controls the light, adaptive triggers and charge mode of the PS5 controller on Linux, Windows and macOS.",
        status: "Public on GitHub",
        statusDetail: "v0.2.1",
        statusShort: "Public, v0.2.1",
        lead: {
          strong: "Charge mode:",
          rest: " on USB, the controller disappears from Steam and games while the light bar pulses orange until it is full.",
        },
        note: "GTK 4 interface on Linux and Qt on Windows and macOS, with the same features.",
        detailsLabel: "Painel do DualSense details",
        mediaLabel:
          "Controller tab of the Painel do DualSense with the battery at 55 percent and the button to enter charge mode",
        repoLabel: "View on GitHub",
      },
      "bot-passagens": {
        name: "Flight deals bot",
        summary:
          "Telegram bot that watches flight prices out of Maceió and alerts me when a deal shows up.",
        status: "Running on my PC",
        statusDetail: "as a service",
        statusShort: "Running on my PC",
        lead: {
          strong: "Watches Santiago in December 2026",
          rest: ", 5 to 10 nights, and alerts me when the round trip drops below R$ 1,800.",
        },
        note: "Aviasales to pick the dates, Google Flights to confirm the price.",
        detailsLabel: "Flight deals bot details",
        mediaLabel: "Example bot command",
      },
    },
  },
  stack: { daily: "Day to day", also: "Also" },
  contact: {
    lead: "For projects, roles or a good conversation about code, email is the shortest way.",
    copy: "Copy",
    copied: "Copied",
    toast: "Email copied",
    copyFailed: "Couldn't copy. Select the email above.",
  },
  footer: { backToTop: "Back to top" },
};
