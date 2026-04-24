# Art Director Audit — Visual Brand Specification

**Author:** Art Director agent
**Date:** April 2026
**Status:** Complete — ready for implementation

---

## 1. Current Visual Brand Inventory

### Dark Mode Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--surface` | `#000000` | Page background (dark mode) |
| `--surface-secondary` | `rgba(255,255,255,0.05)` | Subtle card tint |
| `--surface-tertiary` | `rgba(255,255,255,0.10)` | Elevated surface / hover |
| `--nav-bg` | `rgba(0,0,0,0.40)` | Frosted nav bar |
| `--card-bg` | `rgba(255,255,255,0.05)` | Case study / service cards |

### Light Mode Surfaces

| Token | Value | Role |
|-------|-------|------|
| `--surface` | `#ffffff` | Page background (light mode) |
| `--surface-secondary` | `rgba(0,0,0,0.03)` | Subtle section separation |
| `--surface-tertiary` | `rgba(0,0,0,0.06)` | Elevated card |
| `--nav-bg` | `rgba(255,255,255,0.70)` | Frosted nav bar |
| Hero override | `radial-gradient(#eef2f9 → #f8fafc)` | Hero background in light mode |

### Text Tokens (Dark Mode)

| Token | Value | Use |
|-------|-------|-----|
| `--on-surface` | `#ffffff` | Primary body text |
| `--on-surface-secondary` | `rgba(255,255,255,0.60)` | Secondary / supporting text |
| `--on-surface-muted` | `rgba(255,255,255,0.40)` | Captions, metadata |
| `--on-surface-faint` | `rgba(255,255,255,0.15)` | Decorative numbers |

### Gradient Text Tokens

| Mode | From | Via | To | Usage |
|------|------|-----|----|-------|
| Dark | `#bfdbfe` (blue-200) | `#a5b4fc` (indigo-200) | `#c4b5fd` (violet-200) | Headline fragments |
| Light | `#1e3a5f` | `#2d4a8f` | `#1a4070` | Headline fragments |

### Accent Colour System (Current State — Broken)

| Role | Colour | Tailwind Reference | Hex approx |
|------|--------|---------------------|------------|
| Global brand accent | Blue | `blue-500`, `blue-400` | `#3b82f6` / `#60a5fa` |
| Nav border highlight | Blue | `rgba(59,130,246,0.20)` | — |
| Card border highlight | Blue | `rgba(59,130,246,0.15)` | — |
| Hero glow | Blue | `rgba(59,130,246,0.15)` | — |
| Startup tier | Emerald / Green | `emerald-400`, `emerald-200` | `#34d399` / `#6ee7b7` |
| **Growth-stage tier** | **Blue / Cyan** | `blue-400`, `cyan-300` | `#60a5fa` / `#67e8f9` |
| Enterprise tier | Violet / Purple | `violet-300`, `violet-200` | `#c4b5fd` / `#ddd6fe` |

**The collision:** Blue is simultaneously the site-wide brand accent AND the Growth-tier accent. Every decorative border glow, nav highlight, and card shimmer uses blue. When the Growth-tier card also uses blue, the tier has no visual identity of its own — it blends into the background of the entire page.

### Typography (Current State)

- `fonts.css` is empty. No typeface is declared anywhere in the design system.
- The browser falls back to the OS system font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI"` etc.
- `--font-size: 16px` base is set but serves no purpose without a declared face.
- Font weights: `--font-weight-medium: 500`, `--font-weight-normal: 400` — the only two weights in use.
- Heading sizes are mapped to `--text-2xl` through `--text-base` via Tailwind's scale (no custom type scale defined).

### Decorative System (Current State)

- Gradient text applied to fragmented headline phrases across Hero, Process, Services, Case Studies, Testimonials, and About sections — at least 6 locations.
- Animated blob glows (blue, cyan, violet) pulse in the hero background.
- Isometric diamond grid illustrating the AI workflow stack — the only genuinely distinctive visual element.
- A CSS dot/grid overlay at very low opacity sits behind the hero.
- Card hover states use blue border elevation.

---

## 2. Brand Strength Assessment

### What Is Working

**The isometric workflow diamond.** This is the single strongest asset on the site. It is immediately legible as a system diagram, it is visually distinctive, and it communicates the core differentiator (AI embedded across design phases) without requiring the user to read a word. It should be treated as the flagship visual and preserved in full.

**The typographic scale and hierarchy.** Despite the missing typeface, the size relationships between hero statement, section headings, body text, and captions are correctly proportioned. This scaffolding is solid.

**The tier colour assignment logic.** Emerald for Startups and Violet for Enterprise are both strong, culturally appropriate choices. Emerald signals growth and momentum (right for early-stage companies). Violet signals depth and authority (right for enterprise). The intent is correct; only the Growth-stage tier is broken.

**Dark mode contrast discipline.** The light-overrides.css file shows careful WCAG thinking — opacity values have been mapped with contrast ratios annotated in comments. This discipline is good and should be retained.

### What Is Not Working

**Pure black background.** `#000000` is the most generic dark surface possible. It reads as default, not designed. Premium dark interfaces use very slightly elevated neutral surfaces — deep charcoal, rich almost-black greys — that give the eye somewhere to rest and make card surfaces feel lifted rather than floating in void.

**Gradient text overuse.** Gradient text should be used once — on the single most important headline phrase on the page — to signal "this is what the whole site is about." When it appears on five or more fragments across six sections, it becomes ambient visual noise. The eye stops registering it as signal and starts ignoring it. This is the most damaging decorative decision currently in the site.

**Blue as both brand and tier accent.** Covered in the inventory above. It creates a visual collision that makes the Growth-tier card invisible against its own background context.

**No typeface identity.** System fonts are competent but anonymous. On a portfolio site whose entire pitch is "I bring craft and intentionality to design," arriving with no declared typeface is a contradiction of the brand promise.

**Light mode has no personality.** The light overrides correctly translate dark-mode utilities to their light-mode equivalents, but the result is a mechanically correct surface with no warmth, no character, and no design intention of its own. It reads as "the same design, inverted" rather than as a designed light experience. Corporate and enterprise clients are likely to view the site in light mode. It cannot remain an afterthought.

**All imagery is Unsplash stock.** The case study thumbnails, process section backgrounds, and About section imagery are all generic stock photography. This directly contradicts the positioning of a designer whose entire value is the quality and authenticity of their work. A UX designer showing stock photos as case study evidence is a trust-destroying signal.

---

## 3. Personal Mark / Wordmark Evaluation

### Option 1 — Logotype: "Harsha" in Instrument Sans, tracked wide, medium weight

**Description:** The name "HARSHA" set in the recommended typeface (see Section 5), all-caps, letter-spacing approximately +0.12em, weight 500. No icon, no geometric shape. Just the name treated with intention.

**Pros:**
- Zero ambiguity — name and brand are the same object.
- Scales perfectly from 12px favicon text to 48px hero lockup.
- Requires no illustration or icon assets.
- Feels contemporary — wide-tracked all-caps humanist grotesque is the current language of boutique studios and independent consultants.
- Instant to implement.

**Cons:**
- No distinctive visual mark for use at very small sizes (16×16px favicon) or as an icon on social profiles.
- If Harsha ever wants a distinctive icon-based identity, this approach offers no path there.
- Feels close to generic if not set in the right face with the right spacing.

---

### Option 2 — Typographic lockup: "H / Harsha" stacked with a thin rule

**Description:** A capital "H" at approximately 2× scale sits above a thin horizontal rule (1px, accent colour), below which "HARSHA" is set smaller and tracked. The H acts as an overscaled initial; the rule creates separation and a structured lockup.

**Pros:**
- Creates visual interest and structural identity without requiring a custom icon.
- The overscaled initial is a well-established convention in independent design practices and law firms — it reads as considered and professional.
- The thin rule can use the brand accent colour (indigo) for a touch of colour without being loud.
- Works at medium sizes (nav, email signature, PDF headers).

**Cons:**
- More complex to implement consistently than a pure logotype.
- At very small sizes (favicon, 16px) the lockup collapses — the rule disappears and the stacked layout breaks.
- The "H" initial is a common convention — less unique than a purposefully drawn monogram.

**This is the recommended option for the nav wordmark and primary brand identity.** It is the best balance of distinctiveness, simplicity, and professional credibility for the contexts where it will appear most (nav bar, About section, contact footer).

---

### Option 3 — H monogram: geometric construction

**Description:** The letter H constructed using the same isometric or grid-based geometry as the workflow diamond illustration. The crossbar of the H could be drawn at a diagonal to echo the isometric angle, or it could be a clean geometric construction on a grid. Used only at small sizes — favicon, social avatar, app icon.

**Pros:**
- Creates a visual link between the personal mark and the site's strongest visual asset (the isometric diamond).
- Works excellently as a favicon (16×16, 32×32) and social profile image where only an icon-sized mark is needed.
- If the isometric diamond is to be the visual signature of the brand, having the monogram share its geometric language creates coherence.

**Cons:**
- Requires actual illustration/design work — cannot be done in CSS alone.
- Geometric monograms can look overwrought if not executed with restraint.
- Risk of looking like a logo-generator output if the geometry is not distinctive.

**This is the recommended option for favicon and small-format usage.** It is not suitable as the primary nav mark.

---

### Final Recommendation

Use Option 2 (H / Harsha typographic lockup) as the nav and primary wordmark. Use Option 3 (H monogram) as the favicon once real design work is done. Do not commission Option 3 before launch — use a clean typeset "H" in Instrument Sans as the favicon placeholder. The priority is getting the nav wordmark right first.

---

## 4. Imagery Strategy

### The Problem

Every image currently in the site is Unsplash stock. The thumbnails on case study cards show generic "technology" and "people working" photography. This is the single most credibility-destroying element of the site when viewed by a senior buyer. A UX designer's portfolio is evaluated on the quality of the work shown. Stock photography in place of real work signals either that no real work exists or that the designer does not understand what a portfolio is for.

### Case Study Imagery — What Is Needed Per Case Study

Each case study needs three types of images:

**1. Hero / thumbnail image (used on the card and at the top of the case study page)**
- A representative screen from the final design — ideally a key flow, the dashboard, or the most visually compelling moment of the product.
- Should show real UI, real content (or appropriately anonymised real content), shot at high resolution.
- Format: 16:9 or 3:2, presented with a subtle device frame (browser chrome or phone chrome depending on the product type) if the screenshot benefits from contextualisation.

**2. Process evidence images (used within the case study body)**
- Wireframes, flows, or early-stage sketches that show the thinking.
- Figjam or Miro board screenshots showing research synthesis, affinity mapping, or journey mapping.
- These do not need to be polished — messiness is evidence of process, which is what senior buyers want to see.

**3. Outcome / before-after comparison (used to anchor the metrics)**
- A side-by-side or before/after of the problem state vs. the solution.
- This is the highest-value imagery type for conversion — it makes abstract metrics tangible.

### Treatment Specification

All case study imagery should be treated consistently:

- **Dark mode:** Screenshots sit on a `#0d0d12` surface (slightly elevated from the page background) inside a card with a `1px rgba(255,255,255,0.08)` border. A very subtle inner glow (`box-shadow: inset 0 0 40px rgba(99,102,241,0.06)`) adds depth without being decorative.
- **Light mode:** Screenshots sit on a `#f4f5f8` surface inside a card with a `1px rgba(0,0,0,0.08)` border. No inner glow in light mode — the border is sufficient.
- **No filters, no colour overlays, no blur effects on real screenshots.** The work should speak without decoration.
- **Device frames:** Use only when the product is a mobile app. For web products, present the interface full-bleed within the card, not in a browser mockup — browser mockups look dated.

### Better Placeholder Approach (Pre-Launch)

Until real screenshots are available, use this approach instead of Unsplash stock:

- Create placeholder cards using the brand colour system: a card with a coloured left border in the tier accent colour, the project name and outcome metric as text, and a simple abstract shape (e.g., a dot grid or geometric fragment) as a background element.
- This approach signals "content coming" without pretending to be real work.
- Alternatively, use a blurred, desaturated version of a wireframe or sketch from the real project to indicate the domain and scale of the work without revealing confidential designs.
- What to avoid: any stock photography of people, laptops, or generic "technology" imagery.

### Professional Photo — About Section

A professional headshot is needed. Until it exists, the About section should be text-only with a typographically treated placeholder (e.g., an "H" monogram in a circle with the brand accent colour, at the correct dimensions) rather than a stock photo of someone who is not Harsha.

---

## 5. Visual Brand Specification

### Brand Essence

**"Precise by system, warm by nature."**

This one line governs every design decision that follows. The site should feel like it was built by someone who thinks in systems (precise grid, deliberate hierarchy, consistent tokens) but is not cold or corporate (warm mid-tone accent, humanist typeface, approachable writing). The visual identity should make a technical expert feel confident and a non-technical founder feel welcomed.

---

### Colour System

#### Primary Palette

| Name | Hex | OKLCH approx | Role |
|------|-----|--------------|------|
| Surface Dark | `#0c0c10` | oklch(0.09 0.006 264) | Page background, dark mode — replaces pure black |
| Surface Dark Elevated | `#14141a` | oklch(0.12 0.008 264) | Cards, modals, elevated surfaces |
| Surface Light | `#ffffff` | oklch(1 0 0) | Page background, light mode |
| Surface Light Elevated | `#f4f5f8` | oklch(0.97 0.004 264) | Cards and section backgrounds, light mode |
| On-surface primary (dark) | `#f2f2f5` | oklch(0.96 0.003 264) | Body text, dark mode — not pure white |
| On-surface primary (light) | `#0f0f14` | oklch(0.10 0.006 264) | Body text, light mode — not pure black |
| Indigo (brand accent) | `#6366f1` | oklch(0.585 0.233 264) | Primary interactive accent, borders, focus rings |
| Indigo dark-mode glow | `rgba(99,102,241,0.12)` | — | Hero background glow, card shimmer |

#### Tier Accent System (Corrected)

| Tier | Primary Accent | Secondary | Hex | Rationale |
|------|---------------|-----------|-----|-----------|
| Startup | Emerald | `#34d399` dark / `#059669` light | `emerald-400` / `emerald-600` | Growth, momentum, optimism — correct as-is |
| Growth-stage | Blue / Cyan | `#38bdf8` dark / `#0284c7` light | `sky-400` / `sky-600` | Shifted to sky blue, freeing true blue for global use; cyan remains the secondary |
| Enterprise | Violet | `#a78bfa` dark / `#7c3aed` light | `violet-400` / `violet-700` | Authority, depth — correct as-is |

**Why this change resolves the collision:**

The global brand accent shifts from `blue-500` (`#3b82f6`) to `indigo-500` (`#6366f1`). Indigo sits between blue and violet in the spectrum — it is distinct from both, it reads as considered rather than default, and it has no cultural association with "tech startup generic blue." This frees `blue/cyan` to be exclusively the Growth-tier accent. The three tier accents (emerald, sky-blue/cyan, violet) now have clear visual separation from each other and from the site-wide indigo.

#### Supporting Utility Colours

| Name | Hex | Role |
|------|-----|------|
| Amber | `#f59e0b` | Warning states, availability indicators |
| Red | `#ef4444` | Destructive actions |
| Neutral 800 | `#1e1e26` | Section dividers, decorative elements, dark mode only |

---

### Typography

#### Approved Stack

**Primary face:** Instrument Sans (Google Fonts, free, variable weight)
- Category: Humanist grotesque
- Why: Humanist grotesques have the geometric precision of modernist sans-serifs but with optically balanced letterforms that feel human rather than mechanical. Instrument Sans in particular has slightly organic terminals that prevent the "cold tech" reading of faces like Inter or DM Sans. It is legible at both display and caption sizes, and its variable weight axis allows expressive control across the size scale.
- Import: `https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400..700&display=swap`

**Monospace (code/tool names only):** JetBrains Mono (Google Fonts, free)
- Used exclusively for: tool names in the AI workflow stack, file names in case study process sections, and any inline code references.
- Do not use for UI text or body copy.

#### Size Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Hero statement | 56–72px (clamp) | 600 | 1.1 | -0.02em | One to two lines, hero section only |
| Section heading | 40–48px (clamp) | 600 | 1.2 | -0.01em | Section titles (H2) |
| Subsection heading | 28–32px (clamp) | 500 | 1.3 | 0 | Card headers, sub-section titles (H3) |
| Body large | 18px | 400 | 1.6 | 0 | Hero supporting text, section introductions |
| Body | 16px | 400 | 1.6 | 0 | Standard paragraph text |
| Body small | 14px | 400 | 1.5 | 0 | Secondary supporting text, card body copy |
| Caption | 12px | 400 | 1.4 | +0.01em | Labels, metadata, timestamps |
| CTA / button | 15px | 600 | 1 | +0.02em | All call-to-action buttons |
| Overline | 11px | 600 | 1 | +0.08em | Section labels above headings (e.g., "PROCESS", "CASE STUDIES") — all-caps |

#### Tracking and Weight Guidelines

- **Never use weight 700 (bold) on body text.** Bold weight is reserved for the hero statement and CTA buttons only.
- **Never use tracking wider than +0.04em on body text.** Wide tracking degrades readability at paragraph scale; it is for overlines and small labels only.
- **Negative tracking on display sizes is mandatory.** At 48px and above, default tracking makes text look loose and unsettled. Apply -0.01em to -0.02em.
- **Do not mix weights within a single text block.** Use size and opacity to create hierarchy, not weight variation within the same line.
- **Gradient text: weight 600 minimum.** Gradient fills require sufficient stroke weight to be legible. Never apply gradient text to weight 400 body copy.

---

### Spacing and Density Recommendation

The current site is dense for the quantity of information it contains. The spacing between sections is adequate but within sections — particularly the Services / "Who It's For" section and the Process section — elements are packed tightly. This works against the premium positioning.

**Recommended approach:**

- **Section padding:** 120px top/bottom on desktop, 80px on tablet, 64px on mobile. Do not reduce below these values.
- **Card internal padding:** 32px on desktop, 24px on tablet. Cards with less than 24px internal padding read as compressed.
- **Between-element gaps within a section:** Use an 8px base grid. Acceptable gaps: 8, 16, 24, 32, 48, 64. Do not use arbitrary values like 20px or 28px.
- **Max content width:** 1200px. Do not allow content to stretch wider. The temptation on wide monitors is to let the hero text become very large — resist it. Constrain and let the whitespace breathe.
- **Line measure (body text):** 60–75 characters per line. Lines longer than 80 characters hurt readability. Use `max-width: 65ch` on body text columns.

---

### Dark Mode Principles (What Makes It Premium vs. Generic)

**1. Never use pure black (`#000000`) as the base surface.**
Pure black has no depth — everything above it floats without context. Replace with `#0c0c10`: it has just enough blue-indigo to be perceived as neutral-dark without being visibly coloured, and it creates a natural relationship with the indigo brand accent.

**2. Surfaces should be stratified, not flat.**
There are three surface levels in dark mode: the page background (`#0c0c10`), elevated content surfaces like cards (`#14141a`), and interactive/highlighted surfaces (`#1c1c24`). These create a spatial hierarchy. Users should be able to tell at a glance that a card is "in front of" the page.

**3. White text should never be pure white.**
`#f2f2f5` instead of `#ffffff`. The 97% luminosity prevents the harsh "screen burn" effect of white on black and reads as sophisticated rather than default.

**4. Accent glows should be used with extreme restraint.**
One glow per section maximum. The hero section may have a radial indigo glow behind the central content. No other section should have a background glow. Glows are for elevation, not decoration — if everything glows, nothing is elevated.

**5. Border lights should be dim, not bright.**
Card borders in dark mode: `rgba(255,255,255,0.07)`. Tier-accented card borders on hover: `rgba(99,102,241,0.20)`. Borders brighter than 20% opacity read as neon, not premium.

**6. The isometric diamond illustration defines the ceiling of visual complexity.**
Everything else on the page should be quieter than the workflow illustration. If any other element competes with it for visual weight, it is too loud.

---

### Light Mode Principles (How to Make It Co-Equal, Not a Washed-Out Version)

Light mode is not dark mode with the colours flipped. It is a different designed experience with its own visual logic.

**1. Light mode has warmth; dark mode has depth.**
The dark mode feels cool and technical. The light mode should feel warm and approachable. This is achieved through the surface colour (`#f4f5f8` has a very subtle blue-grey warmth rather than being pure white) and through the hero background (the existing `radial-gradient(#eef2f9 → #f8fafc)` is a good start — keep it).

**2. The hero gradient text must be richer in light mode.**
The current light-mode gradient text uses navy and dark blue values. These are correct in principle but feel heavy. The recommended values: `from: #1d4ed8` (blue-700) via `#4338ca` (indigo-700) to `#6d28d9` (violet-700). This produces a blue-to-violet sweep that reads as intentional rather than just "dark colours."

**3. Card shadows replace border lights.**
In dark mode, cards are defined by their elevated background and a faint border. In light mode, use a soft box shadow (`0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`) instead of a border. This is a more natural spatial signal in a light environment where borders tend to look clunky.

**4. Section separation uses tinted backgrounds, not dividers.**
Alternate sections in light mode between pure white (`#ffffff`) and the slightly tinted `#f4f5f8`. This creates visual rhythm without visible divider lines. The alternation should be deliberate: Hero (white), Process (tinted), Case Studies (white), Services (tinted), Testimonials (white), About (tinted), Contact (white).

**5. Accent colours in light mode must be darker.**
The current `light-overrides.css` already does this correctly for most values — for example, `text-blue-200` maps to `#1d4ed8` in light mode rather than the light blue it would be in dark mode. This principle must be applied consistently to every accent usage. In light mode, any accent used for text must be at minimum 45% lightness in OKLCH to meet 4.5:1 contrast on white.

**6. The nav bar in light mode needs a bottom border.**
The frosted nav bar in dark mode is defined by the subtle transparency. In light mode, a frosted bar on a white page is nearly invisible. Add a `1px solid rgba(0,0,0,0.08)` bottom border to the nav in light mode. This is already partially specified in the token system — ensure it is applied.

---

### Animation Principles (What Should Animate, What Should Stay Still, Personality)

**What should animate:**

- **Page-in transitions on scroll.** As sections enter the viewport, content should fade up: `opacity 0 → 1`, `translateY 20px → 0`, duration 400ms, easing `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out). This easing feels like something settling into place, not bouncing.
- **The isometric workflow diamond.** The diamond illustration should have a slow, subtle float: `translateY 0 → -8px → 0` over 6 seconds, ease-in-out, infinite. This is the only element that should animate continuously. Everything else animates once on enter.
- **CTA button hover.** The primary CTA button should have a very slight upward translate on hover (`translateY -2px`), a box-shadow elevation increase, and a 150ms transition. This creates a tactile "lift" sensation.
- **Card hover states.** Cards should respond to hover with a border color transition to the tier accent (200ms, ease) and a very subtle elevation shadow. Nothing more.
- **Metric counters.** If the metrics section includes counting-up numbers (e.g., "40%" counting from 0), these should animate on scroll-enter. Duration: 1000ms, easing: ease-out. Numbers should not start counting until they are in the viewport.

**What should stay still:**

- Navigation bar. Never animate the nav. Movement in the nav while the user is trying to navigate is disorienting.
- Body text. Paragraph copy should not fade in line by line or word by word. This is a portfolio, not a storytelling experience — text should be immediately readable.
- Background blob animations. The existing animated blobs (pulsing radial gradients) should be reconsidered. If retained, they should move at maximum 8-second cycles and at opacity below 0.10. At higher opacity or faster speed, they compete with the content.
- Icons and static decorative elements. Static icons should not spin, pulse, or bounce. Icon animation should be reserved for interactive feedback (loading, success confirmation) only.

**Personality of animation:**

All motion on this site should feel like it was designed by someone who knows when to stop. The brand personality is "precise by system, warm by nature" — motion should be confident and economical, not expressive or showy. If an animation could be removed without the page feeling broken, it should be removed. Motion exists to direct attention and provide spatial feedback, not to entertain.

---

### Imagery Principles (Art Direction Spec for Real Screenshots)

When real project screenshots are available, they should be presented according to the following spec:

**Selection criteria:**
- Choose screens that show a decision, not just a surface. The best case study screenshot shows a moment where design thinking is visible — a complex table made scannable, a multi-step flow compressed into a single screen, a data visualisation that makes something previously opaque instantly clear.
- Avoid choosing "pretty" hero screens that show well but reveal nothing about the design problem. A good wireframe that shows structural thinking is more valuable than a polished screen that could have been built by anyone.
- Show at least one screen per case study that would make another senior designer say "I see what they were solving."

**Technical preparation:**
- Resolution: 2× minimum for all displayed images (retina-ready). A 800px-wide display image should be provided at 1600px source resolution.
- Colour profile: sRGB. Do not use Display P3 source images — they will shift on non-P3 displays.
- Format: WebP with JPEG fallback. PNG only for screenshots requiring sharp pixel-level detail (design system token documentation, etc.).
- File size: Compress to under 200KB per image after resizing. Large uncompressed screenshots will destroy page performance.

**Presentation in the UI:**
- All case study hero images use consistent aspect ratios within the same grid. Recommended: 16:9 for desktop-product screenshots, 9:16 for mobile-product screenshots. Do not mix orientations in the same grid.
- No decorative overlays, colour washes, or blur effects on real screenshots. The work is the visual.
- Captions below screenshots are mandatory. Format: "[What the screen shows] — [Why it matters to the outcome]." Example: "Reworked dashboard information architecture — reduced time-on-task from 4.2 minutes to 1.8 minutes in usability testing."

---

## 6. Implementation Priority List

The following 14 items are sequenced from those requiring no design content to those requiring real content. Items 1–6 can be completed immediately. Items 7–10 require design decisions but no client content. Items 11–14 require real project material from Harsha.

---

**1. Declare the typeface in `fonts.css`**
No design decisions required. Add the Google Fonts import for Instrument Sans and set `font-family: 'Instrument Sans', system-ui, sans-serif` on the `:root`. This single change will visually transform the entire site immediately.
*Requires: Nothing. Implement now.*

---

**2. Replace `--surface: #000000` with `#0c0c10` in dark mode**
One token change in `theme.css`. Also update `--surface-secondary` to `rgba(255,255,255,0.05)` on the new base (already set; verify it still reads correctly visually). Replace the nav bar `rgba(0,0,0,0.40)` background with `rgba(12,12,16,0.80)`.
*Requires: Nothing. Implement now.*

---

**3. Fix the nav wordmark: replace "Your Name" with "Harsha"**
This is a critical trust failure (documented in harsha-answers.md). Find the nav component and replace the placeholder text. Apply the Option 2 typographic treatment: Instrument Sans, weight 600, tracked at +0.04em, indigo accent colour on the "H" or the separator rule.
*Requires: Nothing. Implement now.*

---

**4. Shift the global brand accent from blue to indigo**
In `theme.css` and `light-overrides.css`, audit every instance of `rgba(59,130,246,...)` (blue-500) that is being used for site-wide decoration (nav border, card borders, hero glow) and replace with `rgba(99,102,241,...)` (indigo-500). Leave the Growth-tier card accents as blue — those are correct for the tier.
*Requires: Nothing. Implement now.*

---

**5. Reduce gradient text to one location**
The hero section headline is the only correct location for gradient text. Remove the `bg-clip-text` gradient treatment from all other sections. Replace with the standard on-surface text colour plus weight or size variation for emphasis. This will significantly reduce visual noise across the page.
*Requires: Nothing. Implement now.*

---

**6. Add Instrument Sans monospace companion for tool names**
In the AI Workflow Stack section, tool names (Figma, Claude, Notion, etc.) are rendered as pills. Add JetBrains Mono as the font for these pill labels. This creates a code/system aesthetic that reinforces the AI-workflow positioning without overusing it.
*Requires: Nothing. Implement now.*

---

**7. Implement the stratified dark surface system**
Create three distinct surface levels: page background (`#0c0c10`), card background (`#14141a`), and hover/elevated state (`#1c1c24`). Update the `--surface`, `--surface-secondary`, and `--surface-tertiary` tokens accordingly and verify all cards, sections, and overlays use the correct level.
*Requires: No content — pure CSS token work.*

---

**8. Implement light mode card shadow system**
Remove border-based card definition in light mode. Add box-shadow to cards: `0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`. Update the light mode overrides to suppress card borders and inject shadows instead. Verify all four card types (case study, service, testimonial, process step).
*Requires: No content — CSS work in `light-overrides.css`.*

---

**9. Add the overline type treatment to section headers**
Above each section's H2 heading, add an all-caps overline label (11px, weight 600, tracking +0.08em, indigo accent colour). Examples: "PROCESS", "CASE STUDIES", "WHO IT'S FOR", "CLIENTS SAY", "ABOUT". This adds structural rhythm and makes section scanning faster. The overline text already exists as visual labels in some sections — this standardises and elevates the treatment.
*Requires: No content — CSS and minor markup.*

---

**10. Replace blob animations with a single restrained glow**
Remove or disable the animated blob elements (`from-blue-600/30`, `from-cyan-600/30`, `from-violet-600/20`). Replace with a single static radial glow centred behind the hero headline: `radial-gradient(ellipse 800px 400px at center 40%, rgba(99,102,241,0.08), transparent 70%)`. This achieves atmospheric depth without the visual busyness of moving blobs.
*Requires: No content — CSS only.*

---

**11. Replace placeholder testimonials with real Upwork reviews**
The three testimonials (Sarah Kim, Marcus Osei, Priya Nair) are confirmed placeholder. Export real client reviews from Upwork, or request written testimonials from past clients. Update the testimonials section with real names, real companies (or anonymised to "Series B SaaS, UK"), and real quotes. The component design does not need to change — only the data.
*Requires: Real client testimonials from Harsha.*

---

**12. Replace hero metrics with real or restructured proof points**
The metrics (40% faster, 20+ projects, 5.0★) are confirmed aspirational. Three options: (a) replace with verified metrics once available, (b) reframe as capabilities rather than statistics ("Design research in days, not weeks"), or (c) remove the metric strip entirely and use a single strong testimonial quote in its place. Harsha must decide which approach. Do not leave unverified statistics on the live site.
*Requires: Decision and direction from Harsha.*

---

**13. Replace stock photography with real or correctly-placeholder imagery**
Remove all Unsplash stock images from case study cards and the About section. For the About section: replace with the "H" monogram placeholder described in Section 4 until a professional photo is taken. For case study cards: replace with tier-colour placeholder cards (coloured left border, project name, outcome metric as text) until real screenshots are available.
*Requires: Decision to implement placeholders; real photos for final state.*

---

**14. Build real case study content**
The four case studies are confirmed placeholder. Each needs: a real project brief, real screenshots (prepared to the spec in Section 4 and Section 5), real process documentation (wireframes, flows, research artefacts), and a real outcome metric. This is the most significant piece of work on the entire site and the one that cannot be rushed or substituted. The portfolio cannot be treated as a live conversion tool until at least two real case studies are published.
*Requires: Real project material from Harsha — highest effort, highest impact item on the site.*

---

*End of Art Director Audit — April 2026*
