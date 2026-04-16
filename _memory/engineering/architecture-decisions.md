# Architecture Decisions — UX Design Portfolio Website

Maintained by the Engineering Director agent.
Records key technical decisions, the reasoning behind them, and any trade-offs accepted.

---

## Decision Log

### ADR-001: React SPA with Vite (April 2026)
**Decision:** Build as a React Single Page Application using Vite as the build tool.
**Reasoning:** Harsha's existing codebase is already set up this way. Vite is fast and modern. React is the industry standard for component-based UIs.
**Trade-offs accepted:** SPAs require extra work for SEO (meta tags per route). This needs to be addressed before launch. (See SEO audit.)
**Status:** Accepted

---

### ADR-002: Tailwind CSS 4 for styling (April 2026)
**Decision:** Use Tailwind CSS 4 with CSS-first configuration (no `tailwind.config.js`).
**Reasoning:** Tailwind 4 is the latest version. CSS-first config is cleaner and more maintainable. The `@tailwindcss/vite` plugin handles everything automatically.
**Trade-offs accepted:** Team members familiar with Tailwind v3 need to learn the new approach.
**Status:** Accepted — see `engineering-learnings.md` for the rule on this.

---

### ADR-003: Radix UI as the primary component library (April 2026)
**Decision:** Use Radix UI for all interactive components. MUI only for data tables.
**Reasoning:** Radix provides accessible-by-default primitives without opinionated styling. MUI is only needed for complex data components.
**Trade-offs accepted:** More styling work required vs. using a fully-styled component library. Worth it for the flexibility and accessibility.
**Status:** Accepted

---

### ADR-004: React Router v7 for routing (April 2026)
**Decision:** Use React Router v7 with `createBrowserRouter`.
**Reasoning:** Already in place. React Router v7 is the latest stable release with improved performance.
**Trade-offs accepted:** v7 API is significantly different from v5/v6 — any routing changes must use the v7 patterns.
**Status:** Accepted — see `engineering-learnings.md` for the rule on this.

---

## Pending Decisions

| # | Decision needed | Why it's pending |
|---|----------------|-----------------|
| 1 | SEO solution (react-helmet-async vs SSG vs SSR) | Need to choose how to handle per-route meta tags before launch |
| 2 | Contact form backend | How will the contact form send emails? (Resend, Formspree, etc.) |
| 3 | Analytics solution | Which analytics tool to add post-launch |

---

## Last updated: April 2026
