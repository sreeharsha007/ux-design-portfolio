# Information Architecture Audit — Harsha's UX Portfolio

IA Agent output. First run, April 2026.
Audience for this document: Design Director, Art Director, UX Writer, Engineering Lead.

This audit answers: **Does the current site structure and section order support high conversion — moving a visitor from first impression to taking action?**

---

## Current IA Map

Sections listed in render order as found in `Homepage.tsx` and `ProjectDetail.tsx`.

### Homepage

| # | Section | Anchor / ID | AIDA Stage | Purpose |
|---|---------|-------------|------------|---------|
| 1 | Hero | — | Awareness | Immediate positioning. Establishes who Harsha is, what the value proposition is, and presents two primary CTAs ("See My Work" / "How I Work"). Includes floating stat cards. |
| 2 | AI Workflow Stack | `#how-i-work` | Interest | Differentiator section. Walks through the five-phase process (Discover → Synthesise → Ideate → Design → Deliver) with interactive diamond stack on desktop, tool names, time savings per phase, and three summary stats (4×, 3×, 50%). |
| 3 | Featured Case Study | `#work` | Desire | Proof section, upper half. Large featured project card with outcome metrics, AI tools used, and a "Read Full Case Study" link. |
| 4 | More Projects Grid | — | Desire | Proof section, lower half. Three secondary project cards in a grid. Embedded in the same `#work` section as the featured card. |
| 5 | Services / WhoItsFor | — | Desire → Action | Audience segmentation and scope-setting. Three-tab segmented control (Startup / Growth / Enterprise). Each tab shows a tagline, deliverables bento grid, and a tier-specific CTA linking to `#contact`. |
| 6 | Testimonials | — | Desire | Social proof. Three quote cards with star ratings, role, and company type. All placeholder. |
| 7 | About | `#about` | Interest (late) | Human connection. Three-paragraph copy block, Industries Served sidebar card. No photo. No CTA. |
| 8 | Contact | `#contact` | Action | Conversion. Email CTA, LinkedIn button, "What happens next" three-step sequence. Placeholder email and LinkedIn URL. |
| 9 | Footer | — | — | Navigation fallback. Copyright line, social links (Dribbble, Twitter, LinkedIn). All placeholder links. |

### Navigation Bar

| Element | Destination | Notes |
|---------|-------------|-------|
| Logo "Your Name" | `/` (homepage) | Placeholder name. |
| Work | `/` (homepage route) | Links to the homepage, not to `#work`. Effectively the same page. |
| About | `#about` (anchor) | Jumps to about section on homepage. |
| Contact | `#contact` (anchor) | Jumps to contact section on homepage. |
| "Let's Talk" CTA | `#contact` (anchor) | Duplicate of Contact link, styled as a button. |
| Theme toggle | — | Sun/moon toggle. |

### Case Study Page (ProjectDetail.tsx) — Section Order

| # | Section | Purpose |
|---|---------|---------|
| 1 | Hero | Project title, category badge, industry badge, description. Full-screen with animated background. |
| 2 | Project Info Bar | Sticky metadata bar: Role, Timeline, Industry, Client Type, Tools. |
| 3 | Hero Image | Large full-width project image. Decorative. |
| 4 | AI Workflow Breakdown | Step-by-step listing of which AI tools were used at each phase and what impact they had. |
| 5 | Process Timeline | Phase-by-phase breakdown of how the project ran, with durations. |
| 6 | Problem Statement | The client challenge. Pull-quote from first sentence. |
| 7 | Design Solution | What Harsha did in response. Key design principle callout. |
| 8 | Outcomes / Measurable Impact | Result metrics displayed as large numbers. |
| 9 | Deliverables | List of what was produced. |
| 10 | Technologies & Tools | Tag cloud of tools used. |
| 11 | More Projects | Three other case study cards. |
| 12 | CTA | "Need Similar Results?" with email and "View All Projects" links. |

---

## Persuasion Arc Analysis

### Where It Works

**Hero → AI Stack is a coherent opening sequence for technically-curious visitors.**
The Hero establishes awareness quickly (who, what, why care). The immediately-following AI Stack section capitalises on that awareness by showing the mechanism behind the positioning — for a visitor who reads the hero and thinks "interesting, but how?", the answer is immediately below the fold. This Awareness → Interest transition is correct and smooth.

**WhoItsFor follows the case studies in the right order.**
Case studies create desire by proving results. WhoItsFor then converts that desire into action-readiness by helping the visitor self-identify and see what they'd receive. This is the correct sequence: proof first, then scope. A visitor who reads a case study and is persuaded would naturally want to know "can he do this for me?" — which WhoItsFor answers.

**Testimonials → About is an adequate trust layer.**
Having testimonials before About means social proof from third parties precedes self-description. This is the right order: third-party validation carries more weight than self-promotion, so leading with testimonials and then following with Harsha's own About copy reinforces rather than initiates trust.

**Contact as the final section is correct.**
The action stage belongs at the end, after desire and trust have been established. Its position is right.

### Where It Breaks

**Problem 1: The AI Stack section appears before the case studies, which is the wrong priority order for a first-time startup or growth-stage visitor.**

A startup founder or product lead landing on the portfolio is not immediately asking "what is your AI workflow?" They are asking "is this work good and relevant to me?" The current order makes the case for the process before the visitor has seen any proof that the process produces good results. Process detail is an Interest/credibility section — but it requires Desire to have been partly initiated first, which only the case studies can do. Placing process explanation before proof means visitors who are not already process-curious (most startup founders) hit a dense section before seeing a single piece of work.

The evidence is in the hero CTAs themselves: the two CTAs are "See My Work" (scrolls to `#work`) and "How I Work" (scrolls to `#how-i-work`). If the site placed the AI Stack above the case studies, a visitor who clicks "See My Work" would be forced to scroll past the entire AI Stack section to reach the work. That is correct in anchor behaviour — `#work` is further down — but the visual scroll journey is interrupted. The two CTAs invite two different visitor paths, but the page layout does not accommodate them independently.

**Problem 2: The About section appears after Testimonials, very late in the page.**

About is placed seventh out of eight content sections. For most professional services portfolios, the About section serves the Interest/trust function — it helps a visitor decide whether they want to work with this specific person. Placing it that late means a visitor who cares primarily about who Harsha is (common for clients evaluating fit on a personal engagement) has to scroll through case studies, services, and social proof before reaching any human context about the designer. This is particularly damaging for clients whose primary evaluation question is "is this person a good fit for my team?" rather than "is the output good?"

**Problem 3: There is no social proof or trust signal between the AI Stack and the Case Studies.**

A visitor who reads the AI Stack section and finds it interesting but wants to verify it before committing further attention has no trust bridge. The section describes tools and process but has no case study link, no client quote, no "here's a project where this approach produced X result" reference. The marketing audit flags this too. Without a bridge, the AI Stack section is a bold claim that hangs in the air until the visitor eventually reaches case studies — by which point the section's narrative impact has dissipated.

**Problem 4: Testimonials appear before About but after WhoItsFor, creating a trust gap at the wrong moment.**

The strongest logical position for testimonials is immediately after the case studies, not after services. After seeing the case studies, a visitor's natural question is "did real clients actually say this was good?" — testimonials directly answer that question. After WhoItsFor (services), the visitor is in an action-evaluation mode ("is this right for me?") — testimonials here feel like a speed bump rather than an accelerant. The current order places social proof too far downstream.

**Problem 5: No section exists for "How I Work" as a standalone human-process description.**

The nav links to `#how-i-work` but the section there is the technical AI stack, not a client-experience-of-working-with-me description. These are different things and both are needed. The AI Stack answers "what tools do you use and how fast?" The missing "How I Work" section would answer "what does a project with you actually look like from my side as a client?" — discovery call, feedback rounds, timeline expectations, communication style. The marketing audit identifies this as a high-impact missing element. Its absence leaves clients without the answer to the "will this be complicated to manage?" objection.

### Where Visitors Would Drop Off

- **After the Hero, before AI Stack:** Visitors who want to see work immediately and click "See My Work" in the CTA are scrolled past the entire AI Stack before reaching case studies. Founders with low patience will drop.
- **During the AI Stack section:** Tool-heavy, process-dense, no proof attached. Growth-stage and startup visitors who are outcome-focused (as Harsha noted these audiences prefer outcomes over tools) may lose attention before reaching the actual work.
- **After Case Studies:** Without a direct bridge from the case studies to a trust signal (testimonials or a quote), visitors who liked the work but wanted third-party validation are left to continue scrolling without the signal they need.
- **About section:** At position 7 of 8, most visitors won't reach it. Any visitor who evaluates primarily on personal fit is underserved by the current order.

---

## Navigation Audit

### Current Nav: Work · About · Contact + "Let's Talk"

**Does this serve a first-time Startup founder?**

Partially. A startup founder landing for the first time will likely click "Work" to verify the quality of the output, then "Contact" or "Let's Talk" if satisfied. This path is supported. However:

- "Work" links to the homepage root (`/`), not to the `#work` anchor. On initial load this is irrelevant, but if the visitor is on a project detail page and clicks "Work", they land at the top of the homepage — not at the case studies section. The first thing they'll see is the hero, then scroll through the AI Stack before reaching the work. This is a friction point for a returning visitor.
- There is no "Services" link. A startup founder who has seen the work and wants to understand what specifically they'd get (the WhoItsFor section) has no nav path to it. They must scroll the entire page to find it.
- There is no "Process" or "How I Work" link, even though the AI Stack section exists at `#how-i-work`. Visitors who care about process can't jump directly to it from the nav.

**Does this serve a first-time Growth-stage Product Lead?**

Less well. A Product Lead at a Series B+ company is evaluating on different criteria: design system experience, process rigour, ability to work with an existing team, and time-to-value. The current nav gives them no direct entry into the Services section (which contains the Growth-tier deliverable list that directly speaks to their needs), no direct path to "How I Work" (where process rigor would be demonstrated), and no way to jump to Testimonials (which, when real, would be their most important signal after the work itself).

**What is missing:**

1. "Services" link in the nav (or "Work With Me") — would give visitors direct access to the WhoItsFor section from any point in the site.
2. "Process" or "How I Work" link — the `#how-i-work` anchor exists but is hidden from the nav. If this section is important enough to be the second section on the page and to have its own hero CTA, it should be navigable.
3. The logo says "Your Name" — a placeholder. This must be corrected to "Harsha" immediately. It appears before every other element on the page and is the first thing a returning visitor sees.
4. No Upwork link anywhere in the nav — Harsha's primary acquisition channel is completely absent from the navigation.

**Recommendation:**

The nav should read: **Harsha** (logo) · Work · Process · Services · About · Contact + "Let's Talk"

- "Work" should link to `#work` as an anchor (or to a future `/work` page) rather than the homepage root
- "Process" should link to `#how-i-work`
- "Services" should link to the WhoItsFor section
- On mobile, collapse "Process" and "Services" into the hamburger menu but keep "Work", "About", "Contact", and the CTA visible
- Add a subtle Upwork profile link in the footer (and optionally a small badge near the CTA once the profile is live)

---

## Case Study Page IA Audit

### Current Order Analysis

The current order is: Hero → Info Bar → Hero Image → AI Workflow Breakdown → Process Timeline → Problem → Solution → Outcomes → Deliverables → Technologies → More Projects → CTA

**The core problem: this order leads with how before why.**

A hiring client reading a case study evaluates in a specific mental sequence:

1. What was the problem? (Is this relevant to my situation?)
2. What was your role? (Did you actually do this or were you part of a team?)
3. What did you decide and why? (Are you a strategic thinker or an executor?)
4. What were the results? (Did it work?)
5. How did you work? (What is it like to work with you?)

The current case study leads with the AI Workflow Breakdown (section 4) and Process Timeline (section 5) — before the client even knows what the problem was (section 6). A visitor who reads "Here's exactly how AI tools were used throughout this project" without yet understanding what the project was, what problem it solved, or what Harsha's role was is being asked to invest in process detail before being given context for why that process matters.

This is a classic mistake in UX case studies: designers often lead with their process because they are proud of it, but clients evaluate on outcomes and fit first. Process detail becomes convincing only after the client already believes the outcome was good and is trying to understand how to replicate it for their own project.

**Specific problems by section:**

- **AI Workflow Breakdown at position 4 (before Problem/Solution):** Undermines both sections. The AI workflow details are more persuasive when the reader already understands what challenge was being solved and what design decisions were made. As placed, the workflow steps describe "Research Synthesizer: synthesized 48 interviews in 6 hours" without the reader knowing what question those interviews were answering.
- **Process Timeline at position 5 (before Problem):** Same issue. A phase-by-phase timeline is only meaningful after the reader understands the project's scope and challenge. Before that context, timeline phases read as generic.
- **Outcomes buried at position 8:** This is the most important section for a hiring client. Metrics and results should be visible much earlier — ideally before the reader invests time in process sections. The case study currently makes the reader earn the results rather than leading with them as a hook.
- **Deliverables at position 9:** This is actually a reasonable late-page section. A client wants to know what they'd get, but they evaluate it after they've decided they're interested. Position 9 is acceptable.
- **Technologies & Tools at position 10:** Redundant with the Info Bar (which lists tools) and with the AI Workflow section. Either incorporate into the AI Workflow section or into the Info Bar. As a standalone section, it adds length without adding conversion value.
- **Missing: Harsha's specific role and contribution.** The Info Bar lists "Role" as a metadata field (e.g., "Lead UX Designer") but there is no narrative section where Harsha describes what specific decisions they made, what they were personally responsible for, and what was outside their scope. A hiring client who evaluates based on capability needs this detail to distinguish a project Harsha led from one Harsha contributed to.

**Does it match how a hiring client actually evaluates?**

No. The current order prioritises Harsha's workflow differentiator over the client's evaluation needs. The differentiator (AI Workflow) should appear after, not before, the core case study narrative (Problem → Role → Solution → Outcomes).

---

## Missing Sections

The following content blocks do not currently exist on the homepage. Evaluated against the goal of converting Startup and Growth-stage visitors.

---

### 1. Pricing Signal

**What it is:** A single line or small block indicating the minimum engagement size or a typical project range. Examples: "Projects typically from $3,000" or "Fixed-scope projects from $X / Monthly retainers from $Y per month."

**Why it helps conversion:** Budget misalignment is the most common reason a qualified lead does not reach out. Clients who are genuinely interested but fear Harsha might be out of their budget will not initiate contact — it feels like wasting both parties' time. A visible floor price filters out budget mismatches before they become wasted discovery calls, and simultaneously signals confidence and seniority. Designers who hide prices are often negotiating downward. A visible floor signals this is a professional business with a standard.

**Where it should sit:** At the bottom of the WhoItsFor section, near the tier-specific CTA, or in the Contact section as a one-line subheading. The WhoItsFor CTA area is the highest-leverage position: a visitor who has just read the services and is considering clicking "Let's get your MVP designed" is the right moment to clarify what that costs.

**Priority: Must Have** — this directly addresses the most common conversion blocker for the target audience.

---

### 2. Social Proof Bridge (between AI Stack and Case Studies)

**What it is:** A single client quote or a brief metric callout placed at the bottom of the AI Workflow Stack section, linking to a case study that demonstrates the workflow. This is not a full testimonials section — it is a one-sentence bridge. Example: "This workflow cut our research phase from 3 weeks to 4 days." — [Client Role], [Company Type]. See the full project →"

**Why it helps conversion:** The AI Stack section builds strong interest in the methodology but provides no proof that the methodology delivers real-world results. Visitors who are process-curious but skeptical leave the section with interest but no conviction. A single verified quote attached to the section converts interest into desire before the case studies section is even reached. For the startup audience in particular, this bridge can be structured as an outcome ("3-week MVP, investor-ready") rather than a process quote.

**Where it should sit:** Bottom of the AI Workflow Stack section, before the case studies. After the three summary stats (4×, 3×, 50%), before the next section.

**Priority: Must Have** — but blocked on having at least one real case study and one real client quote.

---

### 3. "How I Work" Client-Experience Section

**What it is:** A short section (3–5 steps or a brief narrative) describing what a project with Harsha looks like from the client's side. Not the technical AI stack — that is already covered. This describes: discovery call → brief alignment → delivery cadence → feedback rounds → handoff. It answers "what does it feel like to work with Harsha, practically speaking?"

**Why it helps conversion:** The "will this be complicated?" objection is the second-most-common barrier after budget. Clients who are intrigued by the work but unsure what the engagement process looks like are reluctant to initiate contact. A clear, plain-language description of the project experience removes this objection before the Contact section. The Contact section's existing "What happens next" three-step sequence (Send message → Discovery call → Proposal in 48 hours) starts to address this, but only at the inquiry stage, not at the project stage.

**Where it should sit:** After the Case Studies section, before WhoItsFor. This gives it a logical position in the persuasion flow: case studies prove outcomes → "How I Work" explains what getting those outcomes involves → WhoItsFor details what you'd receive for your specific situation.

**Priority: Must Have** — particularly for Growth-stage clients who are integrating an external designer with an existing team and need to understand the collaboration model.

---

### 4. Availability Signal with Specific Timeline

**What it is:** A one-line indicator of Harsha's current availability, added to the Contact section (which already has an "Available for New Projects" badge). Example: "Currently taking on new projects from [Month Year]. Capacity for 2–3 startup engagements or 1 growth-stage project."

**Why it helps conversion:** The existing badge says "Available" but gives no timeline. A client who needs a designer in three weeks and fears Harsha might be booked for three months will hesitate to reach out. An explicit available-from date creates mild urgency for clients who need to move quickly and reassures those who don't that they're not wasting Harsha's time.

**Where it should sit:** Inside the Contact section, near the "Available for New Projects" badge. One additional line.

**Priority: Nice to Have** — the current badge is functional without the date, but the date meaningfully reduces friction for time-sensitive clients.

---

### 5. FAQ Section

**What it is:** A short set of answered questions covering the most common objections and uncertainties a prospective client would have before reaching out. Suggested questions: "Do you sign NDAs?", "Can you work within our existing Figma setup?", "Do you do development or only design?", "Are you available for ongoing retainers?", "What if I only need one piece — not a full project?"

**Why it helps conversion:** FAQ sections reduce inquiry friction by pre-answering questions a client wants answered but feels awkward asking in a first contact email. Clients who find their question answered in an FAQ are more likely to proceed to contact because the uncertainty has been resolved. FAQ sections also signal professionalism — a designer who has thought through client questions in advance signals experience and client orientation.

**Where it should sit:** Between the WhoItsFor section and the Testimonials section, or between Testimonials and About. It fits naturally as a "still have questions?" bridge into the Contact section.

**Priority: Nice to Have** — high impact for reducing drop-off between WhoItsFor and Contact, but lower priority than the first three items.

---

### 6. Upwork Social Proof Badge or Integration

**What it is:** A small trust element referencing Harsha's Upwork presence — either a badge ("Available on Upwork"), a screenshot of a real review embedded in the testimonials section as a stopgap, or a direct profile link. This is distinct from the standard Upwork link in the Contact section.

**Why it helps conversion:** Upwork is Harsha's primary acquisition channel. Clients who discover the portfolio via search or referral will cross-reference the Upwork profile before reaching out. A portfolio that actively references its Upwork presence closes the loop between the two channels and signals that Harsha is an active, professional contractor with a public review record. A single real Upwork review (even "Great work, delivered on time") is more persuasive than any amount of designed social proof.

**Where it should sit:** Near the hero (small badge) and/or in the Contact section alongside the email and LinkedIn CTAs.

**Priority: Nice to Have** pending Upwork profile being live, but must be added immediately once it is.

---

## Three IA Restructuring Options

### Option A: Proof-First (Outcomes-Led)

**Full section order:**
1. Hero
2. Case Studies (Featured + Grid)
3. Social Proof Bridge / Testimonial Micro-Quote
4. AI Workflow Stack
5. Services / WhoItsFor
6. "How I Work" Client Experience
7. Testimonials (full)
8. About
9. Pricing Signal (brief)
10. Contact

**Persuasion logic:**
Lead with the work. The first thing a prospective client sees after the hero is proof. After proof convinces them the output is good, the AI Stack explains why the output is this good and positions the speed advantage. WhoItsFor then converts that conviction into a specific service match. "How I Work" answers the operational question. Testimonials reinforce social proof. About builds human connection. Pricing signals range. Contact converts.

This order prioritises the case studies because they are the single most important conversion element on the site. Everything else is support material. The AI Stack is compelling, but only to a visitor who already believes the work is worth investigating.

**Best suited for:** First-time Startup founders. Founders who landed from a search, a referral, or an Upwork profile are asking "is this work good?" first, not "what tools do you use?" They need to see proof immediately after the hero.

**Pros:**
- Highest conversion potential for the primary 90-day audience (Startups)
- Respects how professional buyers actually evaluate freelancers (output first, process second)
- Case studies at position 2 means the most important content is above the fold on desktop
- Social Proof Bridge between case studies and AI Stack creates a coherent narrative: "Here's what I made → Here's what clients said → Here's how I made it"

**Cons:**
- Requires real case studies to be in place — a placeholder case study as the second section will hurt rather than help
- Loses the technical differentiation of the AI Stack as an early hook (less ideal for technically-minded clients)
- "How I Work" section requires new content to be written

---

### Option B: Segmentation-First (Audience Self-Selection)

**Full section order:**
1. Hero
2. Services / WhoItsFor (with tier selection prominent)
3. Case Studies (filtered by tier if possible, or full grid)
4. AI Workflow Stack
5. "How I Work" Client Experience
6. Testimonials
7. About
8. Pricing Signal
9. Contact

**Persuasion logic:**
After the hero establishes Harsha's positioning, immediately help the visitor self-identify as the right type of client. A visitor who selects "Startup" or "Growth" in WhoItsFor is now primed to evaluate the case studies through that lens. The AI Stack then makes sense as a supporting argument for why the deliverables (just seen in WhoItsFor) are achievable at the claimed speed. "How I Work" answers the operational question. The rest follows a standard sequence.

**Best suited for:** Growth-stage Product Leads and technical clients who are evaluating fit quickly. A Product Lead at a Series B company wants to know "does this person do what I need?" before investing time in the case studies. WhoItsFor answers that question. If the answer is yes, they read the case studies; if no, they self-select out without wasting time.

**Pros:**
- Respects the multi-audience nature of the site by helping visitors self-identify early
- Reduces drop-off for visitors who would not have read case studies without confirming fit first
- The Growth tier's deliverable list (Design Systems, Multi-Platform Consistency, Tokens) is highly specific — a right-fit visitor will feel spoken to immediately
- Tier-specific CTAs appear early in the scroll, potentially converting faster

**Cons:**
- Asking visitors to select a tier before seeing any proof requires more cognitive trust investment upfront
- Less effective for a first-time visitor who doesn't know whether Harsha's work is good yet — they are being asked to identify a service before seeing the product
- WhoItsFor as section 2 may feel like a sales section before any credibility has been established
- Does not work well for visitors referred by a specific case study link

---

### Option C: Balanced Narrative (Recommended)

**Full section order:**
1. Hero
2. Case Studies (Featured + Grid)
3. Testimonials (moved up — or Social Proof Bridge if testimonials are not yet real)
4. AI Workflow Stack
5. "How I Work" Client Experience
6. Services / WhoItsFor
7. About
8. Pricing Signal (one line within WhoItsFor CTA area)
9. Contact

**Persuasion logic:**
The hero establishes awareness. Case studies create desire immediately — proof drives credibility faster than any positioning copy. Testimonials (or a proof bridge) attach social validation directly to the work while the visitor is still in evaluation mode. The AI Stack then explains how the results were achieved — at this point the visitor already believes the results are real, so the process explanation converts a believer rather than trying to persuade a skeptic. "How I Work" answers the operational question before WhoItsFor. WhoItsFor then converts the now-convinced visitor into a specific service match. About provides human connection for the visitor who wants it. Pricing signals range before the visitor reaches Contact. Contact converts.

This order follows the most natural professional evaluation arc: "Is the work good?" → "Did real clients say it was good?" → "How is it produced so well?" → "What would working together actually look like?" → "What would I get for my situation?" → "Who is this person?" → "Can I afford this?" → "Let me reach out."

**Best suited for:** Both Startup founders and Growth-stage Product Leads equally. This is the correct structure for the 90-day priority audience.

**Pros:**
- Follows the natural client evaluation sequence most closely
- Proof-before-process order converts skeptics rather than telling them to trust the process before seeing results
- Moving Testimonials immediately after Case Studies places social proof at the exact moment when a visitor most wants third-party validation
- The AI Stack after social proof becomes a credibility reinforcer, not a cold claim
- "How I Work" before WhoItsFor answers the operational question before the client sees the service scope — reducing the "but what does this engagement actually feel like?" objection
- WhoItsFor near the bottom of the content (before About/Contact) is a strong final persuasion step before conversion
- Pricing signal in WhoItsFor catches the visitor at peak decision intent

**Cons:**
- If testimonials are still placeholder, moving them to position 3 amplifies the credibility gap rather than reducing it — Option C requires real testimonials to function at maximum effectiveness. Until real testimonials exist, this position should use a Social Proof Bridge or be held at its current position.
- Requires building the "How I Work" section as new content
- About is positioned quite late (position 7) — visitors who evaluate primarily on personal fit still need to scroll significantly to find it

**Mitigation for the testimonials gap:** Until real testimonials exist, replace the testimonials position (3) with a "Why this approach works" stats block referencing the AI Stack summary metrics (4×, 3×, 50%) with a single CTA to the AI Stack detail below. This keeps the persuasion arc intact without requiring fake testimonials.

---

### Recommendation

**Adopt Option C (Balanced Narrative).**

The reasoning is direct: Harsha's primary goal for the next 90 days is to convert Startup founders and Growth-stage Product Leads. Both of these audiences evaluate primarily on proof of results, then on process, then on services. Option C places proof immediately after the hero, which is the highest-leverage structural decision for conversion.

Option A (Proof-First) is functionally similar but removes the social proof bridge early in the flow. Option B (Segmentation-First) optimises for the visitor who already knows they're interested, not for the visitor who needs to be convinced first.

The one adjustment required: do not implement Option C until at least one real case study exists. A placeholder case study at position 2 is worse than a placeholder at position 3. The structure is sound; it requires real content to function.

---

## One Recommendation for the Case Study Page

**Move Problem and Solution to positions 3 and 4, immediately after the Info Bar. Move AI Workflow and Process Timeline to positions 7 and 8, after Outcomes.**

The single highest-impact change to the ProjectDetail page IA is to invert the process-first, problem-last ordering into a problem-first, process-last ordering.

The revised order should be:
1. Hero
2. Project Info Bar (Role, Timeline, Industry, Client Type, Tools)
3. Problem Statement
4. Harsha's Role and Approach (new section — what specific decisions Harsha made)
5. Design Solution
6. Outcomes / Measurable Impact
7. AI Workflow Breakdown (now positioned as "how these results were achieved")
8. Process Timeline
9. Deliverables
10. More Projects
11. CTA

This change accomplishes three things simultaneously. First, it respects how a hiring client actually evaluates work: they need the problem context before they can evaluate whether the solution and process were appropriate. Second, it positions the AI Workflow section as a payoff rather than a preamble — the reader sees the results first, then learns how they were produced, which makes the AI Workflow more persuasive. Third, it adds urgency to the Outcomes section by placing it before the technical detail, which means a visitor who is time-poor can evaluate the case study on results alone in under 90 seconds without reading the full process description.

The cost of this change is minimal — it requires no new content, only reordering of existing sections in `ProjectDetail.tsx`.

---

## Last updated: April 2026
## Maintained by: IA Agent
