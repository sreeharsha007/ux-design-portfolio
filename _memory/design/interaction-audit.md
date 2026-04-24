# Interaction Audit
**v2 — written with full project memory context**
*Senior Interaction Designer & UI Systems review — April 2026*
*Based on: project-brief.md, harsha-answers.md, art-director-audit.md, design-director-audit.md, brand-language.md, Homepage.tsx, WhoItsFor.tsx, Navigation.tsx*

---

## 1. Interaction Character Diagnosis

**What the current system communicates: "Assembled by someone who knows the tools."**

The brand essence is "Precise by system, warm by nature." That sentence describes a designer who knows when to use a system — and when to bend it with intention. The current interaction system is the inverse: warm in its ambition (it wants to impress), but not precise in its execution (every component improvises independently).

The result is an interaction language that feels crowd-sourced rather than authored. You can trace the origin of almost every gesture to a specific open-source component library, Framer template, or popular CodePen:

- The `y: 20 → 0 + opacity` entrance: every Framer Motion starter kit, 2022–2024
- The `group-hover:translate-x-1` arrow on CTAs: Tailwind UI component docs
- The glow box-shadow behind gradient buttons: Vercel/Linear-era AI SaaS aesthetic
- The `whileHover={{ y: -4 }}` card lift: shadcn/ui card hover pattern

None of these are mistakes in isolation. The problem is that a senior designer's portfolio should have a *point of view* expressed through its interactions — not a best-of compilation of borrowed gestures.

**What it should communicate:** That Harsha thinks structurally about interaction decisions the same way he thinks structurally about design systems. Every interaction choice should be traceable to a principle, not to a component template. The site should feel like it was designed by the same person who drew the AI Workflow Stack — someone who has a framework in their head and makes deliberate decisions within it.

**The one exception:** The `StackWithDetail` diamond component in the AI Workflow section. The ResizeObserver-driven overlap calculation, the phase-linked visual state changes, the synchronized accordion — this is a designed interaction, not a borrowed one. The entire site should aspire to the intentionality visible in that 370-line component.

---

## 2. Problems by Category

### 2a. Hover State Vocabulary — No Coherent System

**The ArrowRight problem.**

`ArrowRight` with `group-hover:translate-x-1 transition-transform` appears **4 times** in the interactive portfolio components:

| Location | Line | Context |
|---|---|---|
| Hero "See My Work" CTA | Homepage.tsx:472 | Primary page CTA |
| Featured case study "Read Full Case Study" | Homepage.tsx:576 | Navigation to project detail |
| Contact "Start a Conversation" | Homepage.tsx:940 | Conversion action |
| WhoItsFor tier CTA | WhoItsFor.tsx:409 | Conversion action |

There is also an `ArrowRight` at line 708 (Upwork profile link) and line 871 (About "Get in touch") — static, no translate. And one at line 322 inside the accordion detail panel — purely decorative, pointing from `timeBefore` to `timeAfter`.

**What this signals about the interaction design:** The `translate-x-1` arrow gesture is meant to communicate directionality — "something will move forward when you activate this." Used once, it creates a clear convention. Used four times across four categorically different actions (navigation, routing, conversion, external link), it communicates nothing except "I am interactive." The gesture has been diluted to zero meaning.

**The structural hover problem goes deeper than arrows.** There is currently one hover vocabulary for all interactive surfaces:

- Cards: `border-color` opacity increase + `group-hover:opacity-90` on images
- Gradient buttons: `hover:shadow-[0_0_30px/40px_rgba(99,102,241,0.4)]` glow
- Ghost buttons: `hover:bg-indigo-500/10 hover:border-indigo-500/30`
- Text links: `hover:text-indigo-300`

There is no distinction between a card that navigates (project card), a card that reveals (WhoItsFor GlowCard), and a card that is purely informational (contact step card). They all respond to hover with the same weight of gesture. A visitor cannot tell from the hover response what kind of interaction is about to happen.

**Specific offenders:**
- Project grid cards (Homepage.tsx:615–616): `bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-xl group-hover:blur-2xl opacity-0 group-hover:opacity-100` — a behind-card glow bloom appears. This is atmospheric, not directional.
- `GlowCard` in WhoItsFor: `whileHover={{ y: -2 }}` on the hero card only (line 238). Standard cards don't lift. No explanation for why the first card is special. This leaked in, it wasn't decided.
- Nav "Harsha" wordmark: `whileHover={{ scale: 1.05 }}` (Navigation.tsx:26). Scaling a wordmark is a nervous gesture — it communicates uncertainty about what the hover should do.
- Footer social links: `hover:text-blue-500`, `hover:text-cyan-500`, `hover:text-indigo-500` (Homepage.tsx:992–994). Three different hover colours for three links in the same row. This is either three separate decisions or the result of auto-completing CSS. Either way it looks template-generated.
- Mobile menu items: `block text-base text-on-surface-secondary` with zero hover state (Navigation.tsx:107–140). Tapping a link in the mobile menu gives no feedback until the route changes.

**What's missing:**
- `focus-visible` rings on any interactive element — keyboard accessibility is invisible throughout
- Explicit `cursor-pointer` on elements that are wrapped in custom `<div>` or `<motion.div>` click handlers
- Any distinction between hover states that declare "navigate," "reveal," or "submit"

---

### 2b. Navigation Intelligence — Active Section Awareness is Completely Absent

The five nav links (Work, Process, Services, About, Contact) have no active state. A user who scrolls from the hero to the contact section sees the same five identical text links throughout. Nothing tracks their position on the page.

This is a significant failure against the brand premise. A UX designer's portfolio that cannot track which section the user is in has not implemented a basic navigational behaviour that every considered portfolio site expects. It signals either that the designer doesn't think about scroll behaviour, or that the implementation was rushed.

**Specific Navigation.tsx problems:**

1. **No scroll-direction awareness.** The nav is always visible at full opacity. `useScroll` + `useMotionValueEvent` is imported nowhere in Navigation.tsx. A scroll-direction-aware nav (hides on scroll down, reappears on scroll up) is standard for single-page portfolios. Its absence makes the nav feel static and inert.

2. **No active section indicator.** The `a href="#work"` links have `hover:text-blue-500` but no active state class, no `aria-current`, and no visual indicator. `IntersectionObserver` is not implemented for any section.

3. **Mobile menu exit animation bug.** `AnimatePresence` wraps a conditional render incorrectly (Navigation.tsx:98). The pattern is:

   ```tsx
   // BROKEN — AnimatePresence is inside the conditional, not wrapping it
   {mobileMenuOpen && (
     <motion.div exit={{ opacity: 0, height: 0 }}>
   ```

   The `exit` animation never runs because the element is removed from the DOM by the conditional before the animation can play. The menu cuts out instantly on close. Fix: wrap the conditional in `AnimatePresence`:

   ```tsx
   <AnimatePresence>
     {mobileMenuOpen && (
       <motion.div exit={{ opacity: 0, height: 0 }}>
   ```

4. **Logo hover conflict.** Navigation.tsx:25–33 has `whileHover={{ scale: 1.05 }}` on a `motion.div`, AND a CSS underline that animates `scale-x-0 → scale-x-100` via `group-hover` on the parent `<Link>`. Two hover effects competing for the same gesture. The underline is the better idea; the scale should be removed.

5. **All nav links hover to the same blue.** `hover:text-blue-500` on all five links (Navigation.tsx:42, 47, 52, 57, 62). The page itself uses tier-specific accent colours per section — emerald for startup content, blue for growth, violet for enterprise. The nav colour language is disconnected from the page colour language it sits above.

---

### 2c. Entrance Animation Grammar — `whileInView y:20→0` Is Not a Language

The entrance pattern is `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` with `viewport={{ once: true }}` and `duration: 0.6–0.8`. It is applied to:

- Section heading wrappers
- Individual stat items within sections that are already wrapped in `whileInView`
- Individual project grid cards
- Individual contact step cards
- The entire featured case study block
- About section columns with horizontal `x: -40 / x: 40` variants

When every element animates identically, the animation pattern loses its function as a communication tool. The eye learns to ignore it after the first two sections. By the time the user reaches the contact section, `whileInView` has been trained out of their attention.

**Specific issues:**

- **Double-wrapped entrances.** The AI Workflow stats section (Homepage.tsx:724–758): a container `motion.div` has `whileInView={{ opacity: 0, y: 30 } → { opacity: 1, y: 0 }}`, then each individual stat also has `initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}`. Two layers of the same entrance on nested elements.

- **Horizontal entrances on About section columns** (Homepage.tsx:835 and 875): `initial={{ opacity: 0, x: -40 }}` on the text column, `initial={{ opacity: 0, x: 40 }}` on the info card. Horizontal slide-in on text columns is a layout-composition pattern from landing page builders. It reads as generic here and undermines the "precise by system" positioning.

- **Duration 0.8s used for heading entrances** (Homepage.tsx:509, 724, 916). 800ms is a slow entrance. It communicates weight — appropriate for a hero reveal, not for a section heading in the middle of a page. Headings that appear slowly feel delayed. The brand should feel brisk, not deliberate.

- **Nothing that communicates relationship.** The stagger on project grid cards (`delay: index * 0.1`) is correct — it communicates sequence. But the stagger delay is the same whether the cards are siblings (they are) or unrelated elements. There's no choreographic logic: "this element appears after the heading because it's subordinate to it."

- **No counter animation on proof-point numbers.** The stats (`4×`, `3×`, `50%`) in the AI Workflow section animate in with `whileInView` like any other text. They are the most persuasive content on that section of the page — they should count up from zero on scroll entry. The counting animation is a direct reflection of Harsha's positioning: numbers that arrive with precision communicate measured thinking, not aspirational claims.

---

### 2d. CTAs — Hover Exists; Nothing Else Does

Every CTA button has a hover state. Nothing else:
- No `whileTap` / `:active` press state on the hero CTAs (Homepage.tsx:466–484) or contact CTAs (Homepage.tsx:933–953)
- No `focus-visible` ring on any button or link
- No `disabled` visual state

The "Let's Talk" nav button has `whileTap={{ scale: 0.95 }}` (Navigation.tsx:79). The hero "See My Work" and contact "Start a Conversation" — the two highest-conversion actions on the page — have none. On mobile, pressing these CTAs gives zero feedback before the scroll happens. This is the interaction equivalent of a tap target that doesn't respond.

**The ghost CTA has no distinct personality from the primary.** The "How I Work" secondary CTA (Homepage.tsx:476–484) and "Connect on LinkedIn" (Homepage.tsx:945–952) both hover with `hover:bg-indigo-500/10 hover:border-indigo-500/30`. This is identical in gesture weight to the primary CTA's glow. A secondary action should feel like lesser commitment — either a text-only hover (colour shift only, no background), or a smaller-scale physical response. When both CTAs respond with the same energy, there is no hierarchy of commitment.

---

### 2e. Missing Interactions — Where the Gap Is Visible

The design-director audit recommended removing the animated hero blobs and floating stat cards. That has been done. The site is cleaner. But several interactions that would elevate the site beyond "template-with-better-defaults" are still absent:

1. **No scroll-direction-aware nav.** Covered in 2b. Highest-signal absence.

2. **No active section tracking in nav.** Covered in 2b. Second-highest-signal absence.

3. **No `layoutId` transition between project card and project detail.** The current flow: click project card → hard cut to ProjectDetail page. There is no visual continuity between the card and the page. The image, the title, the project's visual identity all start over from scratch. A `layoutId`-based shared-element transition on the card image and heading would make the click feel like expanding, not navigating. This is the interaction that most clearly separates "someone who knows Framer Motion" from "someone who thinks about page-to-page continuity as a UX problem."

4. **No `whileTap` on primary conversion CTAs.** Covered in 2d. 10-line fix with significant mobile feel impact.

5. **No counter animation on stat values.** The `4×`, `3×`, `50%` values in the AI Workflow section animate in as static text. These should count from 0 on `whileInView` entry. In a portfolio for an outcome-driven designer, numbers that arrive with precision communicate credibility.

6. **No scroll-progress trace in the AI Workflow section.** This is the signature interaction (see Section 5 below). Currently the section scrolls without any visual feedback about progress through the five phases.

---

## 3. Harsha-Alignment Gaps

### Gap 1: The interactions don't reflect a systems thinker

Harsha's core positioning — the thing that genuinely distinguishes him — is that he thinks in systems. He has a five-phase framework (Discover → Synthesise → Ideate → Design → Deliver). He designs with AI embedded *in every phase*. He builds design infrastructure (tokens, components, pipelines), not just screens.

The current interaction system has no evidence of this. There is no consistent vocabulary. There is no decision framework visible in the hover states. There are no interactions that demonstrate process awareness.

A systems thinker's portfolio should have interaction decisions that can be explained with a principle. Currently, none of them can. They were inherited from libraries.

**Brand misalignment:** "Precise by system" requires that system to be visible. Right now it isn't.

### Gap 2: The animations contradict the brand's stated speed advantage

Harsha's positioning is explicitly about speed: "40% faster delivery," "research synthesis in hours not weeks," "4× faster synthesis." This is the core value proposition.

The animations are slow. Section heading entrances at `duration: 0.8s`. Featured case study block at `duration: 0.8s` (Homepage.tsx:525). About section columns at `duration: 0.8s` (Homepage.tsx:835, 875).

A portfolio that claims to work fast but animates slowly is communicating two contradictory things to the body and the eye. The user reads "fast" and feels "slow." The animation timing should match the brand claim: brisk, confident, efficient.

**Recalibration target:**
- Section headings: 0.5s max
- Card entrances: 0.4s, `ease: [0.16, 1, 0.3, 1]` (expo-out, snaps into place)
- Hover transitions: 0.15s `easeOut` — immediate, responsive
- Exit animations: 0.2s — things disappear quickly; things appear with intention

### Gap 3: The hover vocabulary doesn't communicate UX expertise

Harsha designs products where hover states carry information. A well-designed B2B dashboard has hover states that declare the affordance of each element — a row that expands has a different hover from a row that navigates. This is standard UX competency for the products he designs.

His own portfolio does not demonstrate this. Every interactive element — cards that navigate, cards that reveal, buttons that submit, links that open externally — responds with the same `border-glow + opacity-shift` gesture. This is the interaction equivalent of a portfolio that uses the same typeface for headings, body text, captions, and UI labels.

A startup founder evaluating a $15k–$50k UX engagement is unconsciously testing for taste level. The hover vocabulary of this site does not pass that test.

### Gap 4: The `ArrowRight` problem is a positioning problem

The `group-hover:translate-x-1` arrow on CTAs is used four times across three categorically different actions:
1. "See My Work" — page navigation (anchor scroll)
2. "Read Full Case Study" — route navigation (React Router)
3. "Start a Conversation" — conversion action (opens mailto)
4. "Let's get your MVP designed" — conversion action (anchor scroll)

A UX designer who builds products for startups and enterprise knows that affordance language should distinguish action types. The fact that all four actions use the same directional gesture is the kind of detail that a visitor with UX experience will notice — even if they can't articulate why the site feels assembled rather than designed.

**Brand misalignment:** "Precise by system" requires that similar gestures mean the same thing. They don't here.

---

## 4. Three Changes With the Highest Impact

### Change 1: Scroll-direction navigation + active section indicator

**Impact:** This single change moves the site the furthest away from "template" toward "designed." It demonstrates that Harsha thinks about scroll behaviour, attention management, and spatial feedback — which are core competencies of a senior UX designer.

**What to implement in Navigation.tsx:**

```tsx
import { useScroll, useMotionValueEvent } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Scroll-direction awareness
const { scrollY } = useScroll();
const [hidden, setHidden] = useState(false);

useMotionValueEvent(scrollY, "change", (latest) => {
  const previous = scrollY.getPrevious() ?? 0;
  if (latest > previous && latest > 80) setHidden(true);
  else setHidden(false);
});

// Apply to the nav element:
<motion.nav
  animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
  ...
>
```

**Active section indicator:** Use `IntersectionObserver` on each section ID (`#work`, `#how-i-work`, `#services`, `#about`, `#contact`). Track the most recently intersected section. In the nav, render an active indicator as a `motion.div` with `layoutId="navActiveIndicator"` — a 2px line *below* the active link text, animated with spring physics so it slides between links rather than jumping:

```tsx
{isActive && (
  <motion.div
    layoutId="navActiveIndicator"
    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500"
    transition={{ type: "spring", stiffness: 500, damping: 40 }}
  />
)}
```

This creates the physical sliding indicator that makes section tracking feel like a design decision, not a CSS class swap.

---

### Change 2: Establish a three-family hover vocabulary

**Impact:** Eliminates the most template-like quality of the interaction system. Creates a vocabulary that can be explained with a principle — which is what "precise by system" requires.

**The three families:**

**Navigate** (going to a new route or anchor): Used on project cards, "Read Full Case Study", "View case study"
- Corner `ArrowUpRight` icon fades in at `opacity-0 group-hover:opacity-100` in the top-right corner
- Image lifts: `group-hover:scale-105` (already implemented on project images — keep it)
- Text title shifts `group-hover:text-white` (already partially implemented — keep it)
- Remove the `translate-x-1` arrow from these contexts

**Reveal / expand** (accordion, tab change, toggle): Used on WhoItsFor segmented control, diamond stack, accordion panel
- Already well-implemented in `StackWithDetail` and the WhoItsFor segmented pill
- No changes needed to these — they are the strongest interaction examples on the site
- Do not add `whileHover: { y: -2 }` to the GlowCard hero (WhoItsFor.tsx:238) — informational cards should not lift

**Submit / convert** (mailto, external link, anchor-to-contact): Used on "See My Work", "Start a Conversation", "Let's Talk", tier CTAs
- Keep the `translate-x-1` arrow on these only — forward-pointing for forward-moving actions
- Add `whileTap={{ scale: 0.97 }}` to all primary CTAs — press feedback signals that the action registered
- Add `whileTap={{ scale: 0.97 }}` to secondary ghost CTAs — same feedback, softer
- Ghost CTA hover should use text colour shift only (`hover:text-indigo-300`), no background fill — lower commitment gesture for secondary actions

**Implementation scope:** ~40 lines across Homepage.tsx and WhoItsFor.tsx. No new dependencies.

---

### Change 3: Calibrate animation timing to match the brand's speed positioning

**Impact:** Fixes a brand contradiction that is felt subliminally rather than consciously. A portfolio claiming speed advantage should feel swift. Currently it feels heavy.

**Specific changes:**

Replace all `duration: 0.8` section entrances with `duration: 0.5` maximum. Replace `duration: 0.6` on heading entrances with `duration: 0.45`. Use `ease: [0.16, 1, 0.3, 1]` (expo-out) instead of default `ease: "easeOut"` on card entrances — this easing snaps into place quickly with a deceleration that feels confident rather than drifting.

**Remove the double-wrapped `whileInView`.** In the AI Workflow section (Homepage.tsx:724–758), either the container OR the individual stat items should have entrance animations. Not both. The stats should animate in relative to the container's entrance, not independently.

**Remove `x: -40 / x: 40` on the About section columns.** Replace with the standard `y: 20 → 0` entrance, or remove the entrance entirely for the About section — it is static content that does not need to announce its arrival.

**Add `whileTap={{ scale: 0.97 }}` to all primary and secondary CTAs.** This is a 2-line addition per button and is the highest-ROI interaction improvement on the mobile experience.

**Framer Motion API specifics:**
```tsx
// Replace existing entrance pattern:
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

// With this:
initial={{ opacity: 0, y: 16 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
```

---

## 5. The Signature Interaction: The Phase Trace

**This is the one interaction that cannot exist on any other portfolio.**

### Concept

When a visitor scrolls through the AI Workflow Stack section, a vertical trace draws itself down the left spine of the section. It connects five nodes — one per phase (Discover, Synthesise, Ideate, Design, Deliver). The trace fills progressively as the user scrolls, using `pathLength` driven by `useScroll`. When a phase becomes active (either by scroll intersection or by click), the node at that phase pulses once — a brief ring-expand animation that collapses — and the trace fills down to that node in the appropriate phase gradient.

The trace uses the indigo-to-emerald gradient that already exists in the AI Workflow stats. This is not decorative: it connects the visual logic of "AI accelerates every phase" to a physical, progressive representation of that workflow.

### Why this is genuinely distinctive

- It is content-specific. No template would have it because the interaction only exists to serve the five-phase workflow narrative — a concept unique to Harsha's practice.
- It demonstrates scroll interaction design as a design decision, not a feature. The visitor is navigating a process. The trace communicates "you are here in this process" — which is the exact cognitive task Harsha performs for his clients.
- It is subtle. Most visitors will not consciously notice the trace; they will feel that the section is more alive than others. This is the correct level of signature interaction for a "precise by system" brand — it operates below the threshold of showing off.
- It directly connects to Harsha's stated differentiator: AI embedded in every phase. The trace is a literal visualisation of that claim. Scrolling through the trace is experiencing the workflow, not reading about it.

### Connection to Harsha's actual work

The five-phase framework (Discover → Synthesise → Ideate → Design → Deliver) is the only content on this entire site that is specific to Harsha's practice. The `StackWithDetail` component is already the strongest interaction on the site. The Phase Trace does not replace it — it extends it with a scroll-linked narrative layer that gives the section a beginning, a middle, and an end.

This mirrors a pattern Harsha's enterprise clients recognise: a phased process where each stage feeds the next, and where progress is visually tracked. The interaction communicates "this designer thinks in structured sequences" — which is the exact claim the AI Workflow section is trying to make.

### Implementation

**Framer Motion `useScroll` + SVG pathLength approach:**

```tsx
import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

// Inside the How I Work section component:
const sectionRef = useRef<HTMLDivElement>(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start 70%", "end 30%"],  // trace fills as section moves through viewport
});

// Map scroll progress to SVG path fill
const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

// Render: a narrow SVG strip anchored to the left of the section
// On mobile: hide (the diamond and trace are both desktop-only)
// On desktop: position absolute left-0 inside the section container
```

```tsx
<div ref={sectionRef} className="relative">
  {/* Trace SVG — desktop only */}
  <svg
    className="absolute left-6 top-0 h-full w-4 hidden lg:block pointer-events-none"
    preserveAspectRatio="none"
    viewBox="0 0 4 100"
    style={{ height: "100%" }}
  >
    <defs>
      <linearGradient id="phaseTraceGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366f1" />   {/* indigo — brand accent */}
        <stop offset="100%" stopColor="#10b981" />  {/* emerald — Deliver phase */}
      </linearGradient>
    </defs>
    {/* Background track — always visible */}
    <line
      x1="2" y1="0" x2="2" y2="100%"
      stroke="rgba(255,255,255,0.06)"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
    {/* Animated fill */}
    <motion.line
      x1="2" y1="0" x2="2" y2="100%"
      stroke="url(#phaseTraceGradient)"
      strokeWidth="1.5"
      vectorEffect="non-scaling-stroke"
      style={{ pathLength }}
    />
  </svg>

  {/* Existing section content */}
  {/* ... StackWithDetail, stats, etc. ... */}
</div>
```

**Phase node pulses:** At each phase's vertical position in the section, render a small `motion.circle` or `motion.div` that scales from `0.6 → 1` when that phase becomes active (matching the existing `active` state in `StackWithDetail`). When transitioning to a new active phase, emit a single ring-expand animation (`scale: 1 → 1.8`, `opacity: 1 → 0`, `duration: 0.5`) — a ripple that confirms "this phase just became active."

**Total implementation scope:** Approximately 60–80 lines, zero new dependencies. Extends existing `StackWithDetail` state (`active`) without breaking it.

---

## 6. Interaction Principles

These five principles derive from the brand essence ("Precise by system, warm by nature") and from Harsha's specific practice as an AI-led, outcome-driven, systems-focused UX designer. They are decision rules, not aesthetic preferences. Every future interaction decision should be tested against them.

---

### Principle 1: Motion is a vocabulary, not a decoration

Before adding any animation, name what it communicates. Motion should carry one of three meanings:
- **Sequence:** "These elements have an order" (stagger)
- **State change:** "Something about this element has changed" (accordion expand, tab selection)
- **Directionality:** "Something will move forward when you act" (arrow translate on submit CTAs only)

If an animation cannot be described with one of these three meanings, it should be static. The `whileInView y: 20 → 0` entrance communicates sequence when applied to a list of items. It communicates nothing when applied to a standalone heading. The About section heading does not benefit from entering — it should be there.

**Test:** "Why does this animate?" If the answer is "it looks nice," cut it.

---

### Principle 2: Hover states are affordance signals, not identity badges

Each interactive family needs a distinct hover vocabulary:

| Family | Hover pattern | Signal |
|---|---|---|
| Navigate (route/anchor) | Corner `ArrowUpRight` appears, image scales | "You will go somewhere" |
| Reveal (expand, accordion) | Chevron rotates, height changes | "More will appear here" |
| Submit / convert (mailto, CTA) | `translate-x-1` arrow + `whileTap` press | "This action will be sent" |
| Informational (stats, step cards) | Border opacity increase only | "This is context, not a destination" |

Once this vocabulary is established, it must be applied consistently. A navigable card that has the same hover as an informational card is not a vocabulary — it is a gesture randomly distributed.

---

### Principle 3: The navigation is the user's working memory

The nav must answer "where am I?" at all times — not just "where can I go?" Active section tracking is not optional decoration. It is the navigation's primary function on a single-page portfolio. Without it, the nav is a list of links, not a navigation system.

The nav must also disappear when it isn't needed (scroll-direction awareness) and return when it is (scroll reversal). An always-visible nav with no state awareness is the interaction equivalent of a modal that can't be dismissed.

---

### Principle 4: Timing communicates brand character

Harsha's brand claim is speed: "40% faster," "3–5 days vs. 2–4 weeks." Animation durations must not contradict this claim at the body level.

**Calibration standards:**
- Hover state transitions: `0.12–0.15s, easeOut` — immediate, responsive, confident
- Card and element entrances: `0.4–0.5s, ease: [0.16, 1, 0.3, 1]` — snaps into place, no drift
- Section entrances: `0.5s` maximum
- Exit animations: `0.2s` — things disappear quickly, things appear with intention
- Signature interactions (Phase Trace, layoutId transitions): up to `0.6s` — these earn their duration

Do not use `duration: 0.8s` for anything that is not a hero-level entrance. The 800ms duration reads as deliberate, heavy, considered. That is not the brand.

---

### Principle 5: One signature, quiet everything else

The portfolio should have exactly one interaction that no template has. That is the Phase Trace in the AI Workflow section. Everything else should be quiet, reliable, and invisible.

This principle is the hardest to follow because the temptation is to make more things special. Resist it. A portfolio that tries to be clever everywhere is a portfolio that is clever nowhere. The signature interaction earns its right to exist *because* everything else has been stripped to minimum.

The `StackWithDetail` diamond is already a visual signature. The Phase Trace makes it an interaction signature. Both should be the ceiling of ambition for the AI Workflow section — not a platform for adding more cleverness.

The WhoItsFor segmented control spring animation is the second-best interaction on the site. It should remain unchanged. These two interactions — the diamond phase system and the tier pill animation — establish the ceiling of interaction quality. Every other component should aspire to stay below that ceiling without drawing attention.

---

## Prior Audit Implementation Status

The design-director and art-director audits made specific animation recommendations. Current implementation status:

| Recommendation | Status | Notes |
|---|---|---|
| Remove animated hero gradient blobs | DONE | Replaced with static radial glow — significant improvement |
| Remove floating stat card bob animations | DONE | Replaced with proof strip text |
| Remove scroll indicator mouse icon | DONE | No longer present |
| Remove `whileHover: { y: -4 }` from testimonials | N/A | Testimonial section removed; replaced with Upwork bridge |
| Reduce glow CTA to primary only | PARTIALLY DONE | Hero + contact CTAs still have `blur-lg opacity-50 group-hover:opacity-75` glow div; secondary CTAs do not |
| Workflow diamond interaction: keep and refine | KEPT | Diamond is intact; no new refinements added |
| Accordion expand/collapse: keep | KEPT | Unchanged, well-implemented |
| Segmented control pill animation: keep | KEPT | Unchanged, still the best single animation on the site |
| Scroll entrance animations: keep `viewport once` | KEPT | `once: true` is correct throughout |

**Not yet implemented from prior audits:**
- Active section tracking in nav
- Scroll-direction-aware nav behaviour
- Mobile menu `AnimatePresence` fix (exit animation still broken)
- `whileTap` on hero and contact primary CTAs
- `focus-visible` ring styles on any element

---

*Audit by: Interaction Design Agent — v2 with full project context*
*Previous version written without access to project-brief.md, harsha-answers.md, or brand-language.md*
*Status: Ready for engineering prioritisation*
*Recommended implementation order: Change 3 (timing) → Change 2 (hover vocabulary) → Change 1 (nav intelligence) → Signature Interaction (Phase Trace)*
