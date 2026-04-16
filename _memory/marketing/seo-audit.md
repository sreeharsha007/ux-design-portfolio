# SEO Audit — UX Design Portfolio Website

Maintained by the SEO Specialist agent.

---

## Current Status: Critical issues present — not launch-ready from an SEO perspective

---

## Critical Issues (Fix Before Launch)

### 1. Single `<title>` for all pages
**Issue:** All routes share the same title from `public/index.html`. Search engines see every page as identical.
**Impact:** Case study pages — the highest-value pages for ranking — will not appear in search results with meaningful titles.
**Fix:** Install `react-helmet-async` and add unique `<title>` and `<meta name="description">` to every route component.
**Priority: CRITICAL**

### 2. No meta descriptions
**Issue:** No `<meta name="description">` tags on any page.
**Impact:** Google will auto-generate a description from page content, which is almost always worse than a written one.
**Fix:** Write a unique 150-160 character description for each page.
**Priority: HIGH**

### 3. No Open Graph tags
**Issue:** No `<meta property="og:*">` tags present.
**Impact:** When the portfolio is shared on LinkedIn, Twitter, or Slack, it will show a blank or broken preview.
**Fix:** Add OG title, description, and image tags per page. Especially important for case study pages.
**Priority: HIGH**

---

## Opportunities (Improve After Launch)

| Opportunity | Impact | Effort |
|-------------|--------|--------|
| Keyword-optimize case study titles and descriptions | High | Low |
| Add structured data (Schema.org Person + Portfolio types) | Medium | Medium |
| Submit sitemap to Google Search Console | Medium | Low |
| Add canonical URL tags | Medium | Low |
| Improve image alt text for image search | Low | Low |

---

## Keyword Focus Areas

*(To be filled in with Harsha's actual target keywords — e.g. "UX designer portfolio", "AI product designer", "SaaS UX designer")*

---

## Audit History

| Date | What was audited | Status |
|------|-----------------|--------|
| April 2026 | Initial codebase review | Critical issues identified |

---

## Last updated: April 2026
