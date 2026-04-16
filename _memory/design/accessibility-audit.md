# Accessibility Audit — UX Design Portfolio Website

Maintained by the Accessibility Expert agent.

---

## Current Status: Not yet audited

Full WCAG 2.1 AA audit pending. Known risk areas listed below based on codebase review.

---

## Known Risk Areas (Pre-Audit)

### 1. Dark/Light Mode Contrast
- The project has both dark and light themes (`ThemeContext.tsx`, `light-overrides.css`)
- Contrast has not been verified in light mode
- **Priority: HIGH** — contrast failures in light mode are a common and silent issue

### 2. Per-Route Page Titles
- All routes share the same `<title>` from `index.html`
- Screen reader users cannot distinguish between pages
- **Priority: HIGH**

### 3. Interactive Animations
- Homepage uses Motion animations extensively
- `prefers-reduced-motion` support has not been verified
- **Priority: MEDIUM**

### 4. Image Alt Text
- Project images are currently Unsplash placeholders
- Alt text status unknown
- **Priority: MEDIUM**

### 5. Focus Indicators
- Custom styled components may have removed default browser focus rings
- Needs manual keyboard navigation test
- **Priority: MEDIUM**

---

## Audit History

| Date | What was audited | Status | Agent |
|------|-----------------|--------|-------|
| *(pending)* | Full WCAG 2.1 AA audit | Not started | Accessibility Expert |

---

## Open Issues

*(Accessibility Expert agent will populate this after first audit run)*

---

## Last updated: April 2026
