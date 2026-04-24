# Content Alignment Audit — Harsha's UX Portfolio

Marketing Director output. First run, April 2026.
Audience for this document: Design Director, IA Agent, Art Director, UX Writer.

This audit answers: **Does the current site content give Harsha what he needs to win freelance clients?**

Read the project-brief.md, harsha-answers.md, and the actual site components (Homepage.tsx, WhoItsFor.tsx, projects.ts) before acting on anything in this document.

---

## Executive Summary

Yes — once populated with real content, this site is structurally capable of winning the clients Harsha is targeting. The architecture is sound: the section sequence moves from positioning (Hero) → credibility (AI Stack + Case Studies) → conversion (WhoItsFor) → trust (Testimonials) → relationship (About) → action (Contact). That is the right order for a freelance portfolio aimed at informed professional buyers.

The three most important things to get right are:

1. **Real case studies with real outcomes.** The site's conversion architecture depends on them. Everything else is scaffolding. Without them, the site cannot convert; with even two strong real ones, it becomes competitive immediately.

2. **Fix the trust-breakers before launch.** The nav shows "Your Name", the email link goes to hello@example.com, and hero metrics are aspirational. These are not polish issues — they are signals that the site is not real, and any serious client will notice. They must be fixed as the absolute first step.

3. **The AI workflow section needs to earn its depth.** It is the most elaborate section on the site and the clearest differentiator. But it is all process description and no proof. It needs at least one case study that ties back to the stack — showing a specific project where the AI workflow produced a specific outcome.

---

## Section-by-Section Evaluation

---

### 1. Hero

**What it's trying to do:**
Immediate positioning. Answer "who is this person, what do they do, and why should I care?" within 5 seconds.

**What's working:**
- The headline triad — "UX Design. AI Speed. Real Results." — is strong. Three words. Concrete nouns. No design-speak. It communicates the core differentiation cleanly.
- The sub-headline names the audience directly ("startups and growth-stage companies") and makes a benefit promise ("ship better products faster"). This is correct positioning.
- The "See My Work" / "How I Work" CTA pair is well-structured. One drives toward proof (case studies), one drives toward process (AI stack). These are the two things a prospective client most needs to evaluate.
- The stat cards are visually excellent — the floating animated format makes them memorable.
- The "AI-Powered UX Design" badge with the pulsing indicator signals freshness and current relevance.

**What's missing or misaligned:**
- Harsha's name is not in the hero. A visitor who lands from a search or a referral link has no immediate confirmation whose portfolio this is. The nav still shows "Your Name" — this must be corrected before anything else.
- The stat cards show aspirational metrics (40%, 20+, 5.0★). See success-metrics.md for full recommendation, but in short: these cannot go live as-is.
- The email in the contact button is hello@example.com — a placeholder that would immediately break trust if a client tried to reach out from the hero.
- The hero only addresses startups and growth-stage companies. Enterprise is invisible at this level. That is acceptable for the 90-day priority, but if enterprise is added later, the hero copy will need a revision.

**What real content is needed:**
- Harsha's actual name in the nav and ideally in the hero area (e.g. "I'm Harsha.")
- Real metric stats, or interim replacement framing (see success-metrics.md)
- Real email address for the primary CTA
- Once Upwork profile is live: a subtle trust badge in the hero ("Available on Upwork") would reinforce the primary acquisition channel

---

### 2. AI Workflow Stack

**What it's trying to do:**
Differentiation and credibility. Show how the AI advantage works — not just that Harsha uses AI, but what specific tools are used at each phase, what the workflow produces, and how fast. This section is aimed at technically-minded clients who want to understand the process before buying.

**What's working:**
- The five-phase structure (Discover → Synthesise → Ideate → Design → Deliver) is exactly how professional UX is structured. This signals seniority — a designer who thinks in phases, not tasks.
- The "before vs. after" time comparisons are compelling: 2–4 weeks → 3–5 days (research synthesis), 1–2 weeks → 4–8 hours (synthesis). These are specific and believable as process claims.
- The interactive diamond stack on desktop and the accordion panel is genuinely distinctive UI. It communicates "this designer is not generic" before the copy even registers.
- Named agents (Research Synthesizer, Insight Clustering, Spec Writer) with specific descriptions add depth. They make the workflow feel real, not aspirational.
- The tool pills (Claude, Dovetail AI, GPT-4, Figma AI) are exactly what a technical client wants to see. Specific tools, not vague AI claims.
- The three summary stats (4×, 3×, 50%) are well-positioned as process mechanics rather than performance claims.

**What's missing or misaligned:**
- This section has no link to the case studies. After reading about the AI workflow, a visitor's natural next question is "can I see this in practice?" There is no direct bridge to a case study that demonstrates the stack.
- The mobile layout collapses to simple stacked cards — the interactive diamond is hidden on mobile (`hidden lg:flex`). Given that many clients will initially browse on mobile, the mobile experience of this section is substantially weaker.
- Harsha noted that the AI angle should be framed differently for different audiences: startups/growth-stage get outcomes; technical clients get tools. Currently the section leads heavily with tools and process. For startups particularly, the process detail may be secondary to outcome proof.
- "The AI Difference" badge with "Every phase. AI-accelerated." is a strong headline but it positions AI as the subject. The subject should be the client's outcome, with AI as the mechanism.

**What real content is needed:**
- At least one case study that explicitly references this stack — a link from this section ("See how this worked in [Project Name]") would dramatically increase its persuasiveness.
- A brief outcome-framing intro before the phase breakdown: what does all of this mean for the client? One sentence that translates process into value. e.g. "The result: research in days not weeks, and more design directions per dollar."
- Consider adding a short paragraph or callout in each phase detail panel that shows how the phase connected to a client deliverable — a micro case study within the stack.

---

### 3. Case Studies

**What it's trying to do:**
Proof. Real projects with real outcomes. The single most important conversion element on any professional portfolio.

**What's working — structurally:**
- The layout is excellent. Featured case study gets a large card with outcome metrics prominently displayed. The three secondary projects get grid cards with an outcome metric overlay on the image thumbnail. This hierarchy correctly signals "there is one best project, and here are more."
- The outcome metric format (extracted number + short label) in the featured project's right column is the right approach — numbers first, context second. Clients scan before they read.
- The AI tools pill display on the featured card ("AI-powered" label with tool names) is a smart detail. It connects the work to the positioning without requiring the visitor to cross-reference the AI stack section.
- "Work that ships." is a strong section headline — active, outcome-oriented.
- The case study data model (projects.ts) is comprehensive: problem, solution, outcomes, AI workflow steps, process timeline, deliverables. The structure is correct for a senior-level portfolio.

**What's missing or misaligned — critically:**
- ALL FOUR CASE STUDIES ARE PLACEHOLDER. This is the most severe gap on the site. The site cannot launch until at least two real projects are here. One real case study beats four placeholder ones.
- All images are Unsplash stock photos. On a UX design portfolio, project images should be screenshots of actual work — Figma screens, prototypes, mockups. A client looking at AI-generated neural network photos is not seeing design work; they are seeing a template.
- The placeholder projects are all impressive (Series B, Enterprise, Series C clients). Real projects from Harsha's actual experience may not match this tier initially. The UX writer must work with Harsha to frame real projects at their actual scale without under-selling them.
- The featured project description in the hero card reads "Unified 3 platforms under one AI-assisted design system — catching accessibility issues before handoff, not after." — this is hardcoded in Homepage.tsx (line 685) independently of the project data. If the featured project is replaced, this copy must be updated too.
- There is no "View all projects" link or separate /projects page visible in the case study section. If Harsha has more than 4 projects, there is no path to show them.

**What real content is needed (for each case study):**
- Real project name or anonymised client description (e.g. "Series A FinTech startup, London")
- Actual problem statement in client language
- Harsha's specific contribution (not generic "led UX" but what decisions were made)
- 2–3 real, specific, measurable outcomes — or honest qualitative outcomes if metrics aren't available
- Real Figma screenshots, prototype frames, or design artifacts — even partial or blurred if NDA applies
- Which AI tools were actually used, and what they specifically produced

---

### 4. Services / WhoItsFor

**What it's trying to do:**
Help visitors self-identify as the right type of client and understand exactly what they will receive. This section doubles as a price signal (indirectly) and a scope clarifier.

**What's working:**
- The three-tier segmented control (Startup / Growth / Enterprise) is the cleanest way to handle audience segmentation on a single-page portfolio. The visitor self-selects rather than being forced to read all three versions.
- Each tier has a distinct, well-written tagline that speaks to a real pain point:
  - Startup: "Get investor-ready, user-validated design — without hiring a full team." — addresses the cost objection directly.
  - Growth: "Build the design infrastructure that lets your team ship faster." — addresses the bottleneck pain.
  - Enterprise: "Design leadership that handles stakeholder complexity and compliance." — addresses the organisational pain.
- The hero service card with a metric (e.g. "2–3 wks to ship-ready designs") within each tier is correct. It answers "how fast?" immediately.
- The bento grid layout with numbered services (01–05) gives the section a premium, structured feel that signals senior-level work.
- Each CTA is tier-specific ("Let's get your MVP designed", "Let's scale your product design") — not a generic "Contact me." This is smart copy.
- The deliverables are specific: "10–15 key flows, fully responsive, dev-annotated". A client can read this and immediately understand what they're buying.

**What's missing or misaligned:**
- Harsha confirmed that the three-tier labels (Startup / Growth / Enterprise) are Harsha's framing, not how clients describe themselves. Clients describe problems, not company stages. The section works well visually, but the entry label copy could be strengthened. A startup founder may not identify as "Startup" — they identify as "I need to raise my Series A."
- There is no pricing signal anywhere in this section or the site. Freelance portfolios that omit pricing entirely force clients into an inquiry to learn if Harsha is even in their budget. This creates friction and filters out leads who might be the right fit but don't want to "waste" their time on a discovery call. Even a range ("Projects typically start at $X") reduces drop-off.
- The Growth tier's hero metric is "50% less dev build time" — this is aspirational/placeholder in the same way as the hero stats. It needs to either be backed by a real client outcome or reframed as a process claim.
- Enterprise tier is included despite not being a 90-day priority. This is fine — the section should remain — but the Startup and Growth tabs should be the default and primary visual weight.
- No visual differentiation of deliverable types: research vs. design vs. documentation. A client who only needs research (not design) can't quickly identify whether Harsha does that.

**What real content is needed:**
- The taglines and deliverable lists are strong as-is. Primarily needs the metrics within each tier card to be backed by real data or reframed appropriately.
- Consider adding one line of "best for" context under each tier label: "Startup — pre-seed to Series A" / "Growth — Series B and beyond" / "Enterprise — complex orgs, 250+ employees". This helps clients self-select more accurately.
- A soft pricing signal: one line anywhere on the site ("Engagements from $X") reduces the qualification burden on both sides.

---

### 5. Testimonials

**What it's trying to do:**
Social proof. Confirm that real clients have worked with Harsha, received results, and were satisfied. The most trust-building section on the page.

**What's working — structurally:**
- Three testimonials in a grid is the right number. One is thin; three shows a pattern.
- The testimonials are well-written as templates: each speaks to a specific outcome (speed, depth, enterprise constraints), covers a different client type (Series B SaaS, FinTech Startup, Enterprise Healthcare), and references a specific detail rather than being generic praise.
- The role + company format ("VP of Product, Series B SaaS") is the right format for a B2B freelance portfolio. Job title + company stage is more persuasive than a name alone.
- Star ratings are present but appropriately secondary to the quote text.

**What's missing or misaligned — critically:**
- ALL THREE TESTIMONIALS ARE PLACEHOLDER. Sarah Kim, Marcus Osei, and Priya Nair are not real clients. This section cannot go live.
- The risk of placeholder testimonials on a portfolio is higher than placeholder case studies. Case studies can be anonymised or described as "selected work." Testimonials with made-up names are straightforwardly dishonest if a client tries to verify them. This section must either be hidden until real testimonials exist, or replaced with something else (see recommendations below).
- There is no link from the testimonials to the relevant case study. "Delivered a full design system in 8 weeks" — which project is that? A testimonial that links back to a case study dramatically increases persuasiveness.
- No Upwork reviews are embedded or referenced. Upwork is Harsha's primary acquisition channel and has a built-in review system. Even a single real Upwork review is more persuasive than three fabricated testimonials.

**What real content is needed:**
- Real client quotes, even short ones, from real people. Even "Harsha delivered exactly what we needed, on time" from one real person outperforms three detailed fabricated testimonials.
- Upwork review integration or screenshots (with client permission) as a bridge until written testimonials exist.
- If no testimonials exist yet: replace this section temporarily with "What clients typically say about working with me" framed as anticipated outcomes, or remove it entirely until real quotes are available.

---

### 6. About

**What it's trying to do:**
Build the human connection. Answer "who is this person beyond their work?" and establish that Harsha is someone worth having a conversation with.

**What's working:**
- The headline "UX Designer. AI Practitioner." is well-framed — two parallel identities, both relevant to the positioning.
- The three-paragraph structure is correct: paragraph 1 = who Harsha is and the macro approach, paragraph 2 = what that means for clients (the outcomes they get), paragraph 3 = the range of experience. Clear, direct, no design-speak.
- Paragraph 2 is particularly strong: "research synthesis in hours, more design directions per dollar, and documentation that engineers actually read." This is client-outcome language, not designer-process language.
- The "Industries Served" sidebar card is a useful at-a-glance reference. A client who works in FinTech can immediately confirm Harsha has worked in their sector.

**What's missing or misaligned:**
- No professional photo. This is a significant gap in the About section specifically. In a professional services context, a face builds trust and signals that this is a real person with a real business. The layout reserves a 2/5 column width for right-side content, but currently fills it only with the Industries card. The photo placeholder space is implied but absent.
- The three paragraphs are serviceable but generic in their current form. They describe a category (senior UX designer who uses AI) rather than a person (Harsha, specifically). There are no specific personal details, no voice markers, no story. A UX Writer should work with Harsha to add at least one specific, humanising detail — a particular project type Harsha finds most interesting, a way of working that clients consistently mention, something that makes this section feel written by a person rather than assembled from a template.
- The About section currently has no CTA. A visitor who resonates with the About section and wants to reach out must scroll further to the Contact section. A single "Get in touch" text link at the bottom of the About section would improve conversion flow.
- Nine years of experience is mentioned in the brief but not in the About copy. That is a significant credibility signal that is being omitted.

**What real content is needed:**
- A professional photo (headshot, not smartphone selfie — good natural light, neutral background, minimum 800px wide)
- At least one specific personal detail that distinguishes Harsha from the generic senior designer description
- Years of experience made explicit: "9 years" is a strong number and belongs in this section
- A light CTA at the bottom of the About section

---

### 7. Contact

**What it's trying to do:**
Convert. Make it as easy as possible for the right person to take the next step. Remove uncertainty about what happens after they reach out.

**What's working:**
- The "Available for New Projects" badge with the pulsing green dot is an excellent availability signal. It is small but meaningful — it communicates that Harsha is actively looking for work, which is exactly what a client browsing a portfolio needs to know.
- The "What happens next" three-step sequence (Send a message → 30-min discovery call → Proposal in 48 hours) is outstanding copy. It removes the two biggest fears of a prospective client: "What do I say?" and "Will this be a hard sell?" The proposal in 48 hours with no vague estimates is a specific, professional promise.
- "Have a product to design, a system to fix, or a team to support?" is excellent — it names three client situations that map to startup, growth, and enterprise without using those labels.
- The page leads with email as the primary CTA (correct per Harsha's stated preference) and LinkedIn as the secondary.

**What's missing or misaligned:**
- The primary email CTA links to hello@example.com — a placeholder. This must be replaced before launch. This is not a polish issue; it is a broken conversion path.
- LinkedIn links to https://linkedin.com — a generic URL, not Harsha's actual profile.
- No Upwork link. Upwork is Harsha's primary acquisition channel. It is not present anywhere in the contact section or navigation. This is a high-severity omission — a client who prefers to hire through Upwork has no path from the portfolio to the place where Harsha is most active.
- No Calendly link. This is planned but not implemented. Its absence means a potential client who wants to book directly must initiate an email exchange first, adding friction.
- The "Start a Conversation" CTA label is good but could be more specific. "Email Harsha directly" or "Start a Project" reduces ambiguity about what clicking the button does.
- The footer shows "© 2026 · AI-Powered UX Designer" with a Dribbble link. Dribbble is primarily a visual design showcase platform — it is not aligned with Harsha's positioning as an AI-led product/UX designer. If Harsha doesn't have an active Dribbble presence, this link should be replaced with Upwork.

**What real content is needed:**
- Harsha's actual email address
- Harsha's actual LinkedIn profile URL
- Harsha's actual Upwork profile URL (once created)
- Calendly link (once set up)
- Footer: "Your Name" → "Harsha", Dribbble link → Upwork link

---

## Audience Alignment Check

### Startups (Pre-seed to Series A)

**Pain points addressed:** Yes — the WhoItsFor section directly addresses cost ("without hiring a full team") and speed ("2–3 wks to ship-ready designs"). The hero sub-headline names startups explicitly.

**Self-identification path:** Moderate. The "Startup" tab in WhoItsFor is immediately accessible. But a founder who lands on the hero and wants to see work relevant to their stage has to scroll past the entire AI stack section before reaching case studies. If they skip scroll to the case studies, the placeholder projects currently show Series B and enterprise work — which may cause a pre-seed founder to self-select out even though Harsha can serve them.

**Missing for this audience specifically:**
- At least one case study that is explicitly a startup project (MVP, pre-launch, investor demo). This is the single most important gap for the startup audience.
- A clearer speed signal in the hero or early in the scroll: startups are time-constrained and need to know Harsha can move fast. The AI stack section shows this, but it is the second section. Consider a single time-to-value statement in the hero ("Investor-ready prototype in 3 weeks" is more compelling for a startup than "40% faster delivery").
- An Upwork link — many startup founders source contractors through Upwork and want to see reviews before taking a discovery call.

### Growth-Stage Companies (Series B+)

**Pain points addressed:** Yes — the WhoItsFor Growth tab is the strongest of the three tiers. "Build the design infrastructure that lets your team ship faster" is exactly the language a Product Lead at a Series B company uses internally to justify this kind of engagement.

**Self-identification path:** Good. The Growth tab is immediately adjacent to the default Startup tab and is second in the tab order. The deliverables list (Design System, Multi-Platform Consistency, Design Tokens) is technically specific enough for a growth-stage Product Manager or Engineering Lead to recognize as exactly what they need.

**Missing for this audience specifically:**
- A case study of a design system or platform consistency project. The placeholder "AI-Powered Design System" project is actually well-positioned for this audience — but it's not real. This is the case study that most directly maps to the Growth audience.
- Specificity about team size and integration: growth-stage clients want to know if Harsha can work alongside an existing internal team, not replace it. The site implies solo freelancer throughout. One sentence about how Harsha integrates with existing design teams would reduce a common objection.
- The "50% less dev build time" metric in the Growth tier's hero card is aspirational. This audience is data-driven and will push back on unverified metrics in a discovery call. Replace with a real outcome or reframe as a process claim.

---

## Missing Sections / Elements

The following sections or elements are present on comparable freelance UX portfolios and would meaningfully improve conversion. Ranked by impact.

### 1. Pricing Signal (High impact)
No pricing information exists anywhere on the site. This is the most common reason qualified clients don't reach out — they don't want to "waste" a discovery call if Harsha is outside their budget. A range ("Projects typically from $3,000") or an engagement type guide ("Fixed-scope projects from $X / Monthly retainers from $Y") reduces friction for qualified leads and filters out budget mismatches before they reach the proposal stage. It also signals confidence and seniority — designers who hide their prices often do so because they're negotiating downward. A clear floor signals Harsha is not competing on price.

### 2. Process / How I Work Page or Section (High impact)
The AI Workflow Stack section describes the tools but not the client experience of working with Harsha. What does a project actually look like from the client's side? Week-by-week? Key decision points? Turnaround times for feedback? A simple "How I Work" explainer — even as a 3-step visual on the homepage or a standalone page — addresses the "will this be complicated?" objection that stops prospects from reaching out.

### 3. Upwork Review Integration or Badge (High impact for 90-day goal)
Harsha's primary acquisition channel is Upwork. A prospective client who finds the portfolio will immediately search for the Upwork profile. Closing that gap on the portfolio (with a link, a badge, or an embedded review) makes the portfolio a trust accelerator for the Upwork channel, not just a standalone channel. This is a quick win that has zero content creation cost.

### 4. Availability / Capacity Signal (Medium impact)
The Contact section has an "Available for New Projects" badge — good. But there is no sense of timeline. Clients who need a designer in two weeks will not reach out if they fear Harsha is booked for three months. A simple "Currently available from [month]" or "Taking on [X] new projects this quarter" would increase urgency and reduce wasted inquiries.

### 5. FAQ Section (Medium impact)
Common objections and questions that a prospective client would have but not ask: "Do you sign NDAs?", "Can you work within our existing Figma setup?", "Do you do development or only design?", "Are you available for ongoing retainers?", "What if I only need a small piece of work?" Addressing these on the site removes friction from the inquiry process and positions Harsha as professional and experienced.

### 6. Dedicated /work or /projects Page (Medium impact)
There is currently no route to a full portfolio page — only 4 projects shown on the homepage. If Harsha has more than 4 real projects, there is no way to show them. A paginated /work page that can grow over time is a structural investment worth making now, before the case studies are populated.

### 7. LinkedIn and/or Upwork Review Embed (Medium impact)
Without a testimonials section (because placeholders are unusable), an embedded LinkedIn recommendation or a Upwork review screenshot — even one — provides social proof in the interim. This is a bridge strategy while real testimonials are collected.

### 8. Engagement Type Clarification (Low-to-medium impact)
Harsha is open to fixed-scope, retainer, consulting, and Upwork hourly work. The site implies project-based fixed-scope work throughout. A client looking for an ongoing retainer relationship may not self-identify as a match. One line clarifying "I work on fixed-scope projects, monthly retainers, and consulting arrangements" removes ambiguity.

---

## Top 10 Recommendations — Ranked by Conversion Impact

---

**#1 — Fix the Trust-Breakers Before Anything Else**
What to change: Replace "Your Name" in the nav with "Harsha". Replace hello@example.com with Harsha's real email. Replace https://linkedin.com with Harsha's real LinkedIn URL. Replace "© 2026 · AI-Powered UX Designer" footer with "Harsha" as the name.
Why it matters: These are the first things a serious client will notice. They signal the site is not ready. They cost nothing to fix and must be done before the URL is shared with anyone.
Type: Quick Win — no new content required, just real values.

---

**#2 — Add Upwork Profile Link**
What to change: Add Harsha's Upwork profile URL to the Contact section (alongside email and LinkedIn) and in the footer. Consider a small "Hire me on Upwork" badge.
Why it matters: Upwork is the primary acquisition channel. The portfolio is currently a dead end for clients who want to hire via Upwork — the most natural path for a new client is to find the profile, read reviews, then reach out. Without this link, the site and the primary channel are disconnected.
Type: Quick Win — once the Upwork profile exists, this is a two-minute code change.

---

**#3 — Replace Hero Metrics with Real or Reframed Stats**
What to change: Replace the three floating stat cards (40% faster, 20+ projects, 5.0★) with either real data or credible non-performance alternatives (see success-metrics.md for options).
Why it matters: These are the first numbers a visitor sees. If a client asks Harsha about them in a discovery call and Harsha can't back them up, the conversation goes backwards. The visual component is excellent — the content just needs to be truthful.
Type: Quick Win (reframe approach) or Strategic Improvement (real data approach).

---

**#4 — Populate at Least Two Real Case Studies**
What to change: Replace at minimum the featured project and one secondary project with real Harsha projects. Real project images (Figma screenshots). Real problem statements. Real outcomes — even qualitative ones.
Why it matters: The portfolio literally cannot convert without real work. This is the highest-priority content task. Everything else on this list is secondary to this.
Type: Strategic Improvement — requires Harsha to provide project details.

---

**#5 — Replace Placeholder Testimonials (or Temporarily Remove the Section)**
What to change: Either source real quotes from real clients (Upwork reviews, LinkedIn recommendations, direct requests to past clients) and publish them, or hide the testimonials section entirely until real quotes exist.
Why it matters: Fake testimonials on a professional portfolio are a credibility liability, not an asset. The section is better absent than dishonest. Real testimonials from modest projects ("Great to work with, delivered on time") are more persuasive than fabricated quotes from impressive-sounding VPs.
Type: Strategic Improvement — requires outreach to past clients.

---

**#6 — Add Pricing Signal**
What to change: Add a single line somewhere visible (WhoItsFor section CTA area, Contact section, or its own callout) indicating the minimum engagement size. e.g. "Fixed-scope projects from $3,000 / Monthly retainers from $X per month."
Why it matters: Budget misalignment is the most common reason a qualified lead doesn't reach out. A floor price filters out low-budget requests and signals seniority to high-budget clients. It also reduces the number of discovery calls that end in a mismatch.
Type: Quick Win — one line of copy, once Harsha confirms the number.

---

**#7 — Add Harsha's Photo to the About Section**
What to change: Commission or shoot a professional headshot and add it to the About section (the layout already allocates right-column space for it).
Why it matters: In a professional services relationship, a face builds disproportionate trust. This is especially true for freelance engagements where the client is essentially hiring a person, not a company. A photo communicates "I am a real person with a real business."
Type: Strategic Improvement — requires Harsha to arrange and provide the photo.

---

**#8 — Add a Bridge from the AI Stack Section to a Relevant Case Study**
What to change: At the bottom of the AI Workflow Stack section, add a single CTA that links to the case study that best demonstrates the AI workflow in action. e.g. "See how this worked in [Project Name] →"
Why it matters: The AI Stack section builds strong interest in the methodology. But it has no proof attached. A visitor who finds the stack compelling has no immediate path to see it demonstrated. This bridge converts that interest into case study engagement, which is the next step toward a conversion.
Type: Quick Win (structurally easy) but depends on #4 (needs a real case study to link to).

---

**#9 — Add "9 Years Experience" and a Specific Personal Detail to the About Section**
What to change: Add the 9-year experience figure to the About copy. Ask Harsha for one specific, memorable detail — a particular project type, a way of working, an honest opinion about design — and add it to humanise the section.
Why it matters: Nine years is a credibility signal that is completely absent from the current copy. It is in the brief but nowhere on the site. The About section reads like a category description rather than a specific person. Both changes take one sentence each.
Type: Quick Win (9 years figure) + Strategic Improvement (personal detail requires input from Harsha).

---

**#10 — Add a Calendly Link and Explicit Availability Date**
What to change: Once Calendly is set up, add the booking link to the Contact section. Add a one-line availability indicator: "Currently taking on new projects from [Month Year]."
Why it matters: Reducing the steps between "I'm interested" and "we have a meeting booked" directly increases conversion. Calendly eliminates the back-and-forth email thread. An explicit availability date creates mild urgency and prevents clients from assuming Harsha is booked out for months.
Type: Quick Win (once Calendly exists) — one link and one sentence.

---

## Pre-Launch Checklist Summary

These are the items that must be resolved before the site URL is shared with any prospective client:

- [ ] "Your Name" → "Harsha" in navigation
- [ ] hello@example.com → Harsha's real email address
- [ ] https://linkedin.com → Harsha's real LinkedIn profile URL
- [ ] At least one real case study with real outcomes and real images
- [ ] Testimonials section either hidden or replaced with real quotes
- [ ] Hero metrics either replaced or reframed (see success-metrics.md)
- [ ] Upwork profile link added once profile is live
- [ ] Footer name updated

Everything else on this list improves the site. The items above make it launchable.

---

## Last updated: April 2026
## Maintained by: Marketing Director agent
