# Design System — UX Design Portfolio Website

Maintained by the Design System Expert agent.

---

## Stack

- **Styling:** Tailwind CSS 4 (CSS-first, configured via `src/styles/theme.css`)
- **UI Primitives:** Radix UI (50+ components in `src/app/components/ui/`)
- **Complex components:** Material UI (MUI) — used sparingly
- **Animations:** Motion library (Framer Motion API)
- **Icons:** Lucide React

---

## Design Tokens

All tokens are defined in `src/styles/theme.css` as CSS custom properties.
**Rule:** Never use hardcoded hex values or pixel values in components. Always reference tokens.

### Color Tokens (reference theme.css for full list)
- Background, foreground, card, popover, primary, secondary, muted, accent, destructive, border, input, ring

### Typography (defined in `src/styles/fonts.css`)
- Review this file for the current font stack and scale

### Spacing
- Use Tailwind's built-in spacing scale (4px base unit)
- No arbitrary values like `w-[347px]` — use the closest Tailwind step

---

## Component Library

Located at: `src/app/components/ui/`

54 components following shadcn/ui patterns. Before creating any new component, check if one already exists here.

Key components:
- `button.tsx` — all button variants
- `card.tsx` — card layouts
- `dialog.tsx` — modal dialogs (Radix)
- `tabs.tsx` — tabbed content (Radix)
- `badge.tsx` — status badges
- `separator.tsx` — visual dividers
- `tooltip.tsx` — hover tooltips (Radix)

---

## Rules

1. **Radix UI first** — for any interactive component (dialog, menu, tooltip, tab), use Radix
2. **MUI only for data tables** — don't use MUI for layout or standard UI elements
3. **Dark/light mode required** — every component must work in both themes
4. **No custom class names** — use Tailwind utilities and `cn()` helper for conditional classes
5. **Animation via Motion** — no CSS transitions in components; use Motion for all animations

---

## Known Inconsistencies (to fix)

*(Design System Expert agent will populate this as it runs audits)*

---

## Last updated: April 2026
