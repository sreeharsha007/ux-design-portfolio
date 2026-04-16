# Product Backlog — UX Design Portfolio Website

Maintained by the Product Manager agent. Items are listed in priority order.
Top item = work on this next.

---

## 🔴 Do This Now

1. **Replace placeholder content** — "Your Name", `hello@example.com`, and generic social links are still visible in the live codebase. This is the highest priority — a portfolio with placeholder content cannot be shared.
   - File: `src/app/components/Homepage.tsx`
   - File: `src/app/components/Navigation.tsx`

2. **Add real case studies** — Only 1 sample project exists in `src/app/data/projects.ts`. A portfolio needs at least 3-4 real projects to be credible.

3. **Fix SEO meta tags** — Every route currently shares the same `<title>` from `index.html`. Each page needs its own unique title and description.

---

## 🟡 Do This Soon

4. **Audit accessibility** — Full WCAG AA audit needed, especially for dark/light mode contrast.

5. **Add real project images** — Current images are Unsplash placeholders. Replace with actual project screenshots.

6. **Deploy to Vercel** — The project is build-ready but not yet live on the internet.

---

## 🟢 Nice to Have

7. Add a contact form with working email delivery
8. Add Posthog analytics
9. Add Open Graph images for social sharing previews
10. Add a blog/writing section

---

## Last updated: April 2026
## Maintained by: Product Manager agent
