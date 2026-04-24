# Product Strategy Audit — Harsha's UX Portfolio

Product Manager output. First run, April 2026.
Audience: Harsha (product owner), all agent roles.

This audit evaluates the portfolio as a product: does it have what it needs to achieve its primary goal — winning freelance UX design projects via Upwork and direct inbound?

Read project-brief.md, harsha-answers.md, content-alignment-audit.md, success-metrics.md, projects.ts, Homepage.tsx, and WhoItsFor.tsx before acting on this document.

---

## Executive Summary

Once populated with real content, this portfolio is structurally viable as a client acquisition tool for the Startup and Growth-stage audiences Harsha wants to prioritise in the next 90 days. The section architecture is sound (positioning → credibility → proof → conversion → trust → relationship → action), the copy strategy is outcome-first rather than designer-first, and the three-tier segmentation model in WhoItsFor is the clearest on-site audience segmentation I have seen on any freelance portfolio. The AI workflow section is genuinely differentiated — it signals that Harsha thinks and operates differently from the median UX freelancer, and it does so with enough specificity to be credible to a technical buyer.

The single most dangerous gap is not a design problem or a copywriting problem. It is an identity problem: the site has no real person in it. No name, no face, no verified track record, no real client quotes. Right now this is a highly polished shell around a hollow core. A serious client — the $15k–$50k client Harsha intends to attract at the 6-month mark — will look for evidence that the person they are about to wire money to is real and has done this before. They will find none. This is a launch blocker, not a polish issue.

The single most important strategic decision Harsha needs to make before launch is this: **which two or three real projects will anchor the portfolio?** Everything else in this audit — the testimonials, the metrics, the AI workflow proof points — flows downstream from that decision. The case study content is the product. Everything else is the packaging.

---

## Does the Portfolio Cover What Clients Actually Need to See?

A Startup founder or Growth-stage Product Lead hiring a freelance UX designer evaluates four things, in roughly this order:

### 1. Do I understand what this person does and for whom?

**Current state: Strong once real content exists.**

The hero copy ("I help startups and growth-stage companies ship better products faster") names the audience and the outcome in one sentence. The WhoItsFor section further narrows the offer with tier-specific taglines and deliverable lists. A founder landing on this page can identify themselves and their problem within 10 seconds — but only if they scroll to WhoItsFor, which sits three full sections deep. The hero does name the target audience, which is the correct shortcut for clients who don't scroll.

**Gap:** Harsha's name does not appear in the hero, the nav, or anywhere above the fold. "Your Name" in the nav is a trust signal failure that will cause some visitors to question whether this is a live site or a template. This costs Harsha leads at the very top of the funnel.

### 2. Can I assess the quality and depth of the process?

**Current state: Excellent structural scaffolding, zero real evidence.**

The AI workflow section is genuinely impressive infrastructure. The five-phase model (Discover → Synthesise → Ideate → Design → Deliver), named agents, specific tool pills, and before/after time comparisons all signal senior-level process thinking. A technical Product Lead at a Series B company would read this and think "this designer thinks in systems, not tasks." That is the right first impression for the Growth-stage audience.

However, the section is entirely self-asserted. There is no case study, no client deliverable, and no external validation connected to any of these claims. A sceptical buyer's response to "4× faster research synthesis" is "prove it." The proof is currently absent. The Marketing Director's audit correctly identifies the missing bridge from AI Stack → case study; from a product strategy perspective, this is not just a nice-to-have — it is the one structural change that would most increase the section's conversion value before launch.

### 3. Can I trust that Harsha has done this type of work before?

**Current state: Critical failure.**

This is where the portfolio currently breaks down entirely as a sales tool. The four case studies are placeholder. The three testimonials are fabricated. The hero metrics (40% faster, 20+ projects, 5.0★) are aspirational. There is no professional photo. The contact email is hello@example.com. A client performing even minimal due diligence will encounter at least two of these signals within 60 seconds of arriving on the page. The site's current state communicates "this designer is building a portfolio" rather than "this designer has a track record."

The risk is asymmetric: a client who notices the inconsistency (fake name, generic LinkedIn URL, aspirational star rating for a platform they can check) will not send an inquiry — they will simply close the tab. This will not show up in analytics as a bounce from fake testimonials; it will show up as a bounce from the hero. The site will appear to underperform at the top of the funnel when the actual failure is at the trust layer.

### 4. Do I know how to engage and what to expect?

**Current state: Good structural foundation, missing the primary channel link.**

The Contact section's "What happens next" three-step sequence (Send a message → 30-min discovery call → Proposal in 48 hours) is the strongest single piece of copy on the site. It removes the two biggest friction points in a B2B freelance engagement: "what do I say?" and "will I be pressured into something?" The proposal commitment in 48 hours is a specific professional promise that communicates confidence and reliability.

The critical gap here is that Upwork — Harsha's stated primary acquisition channel — does not appear anywhere on the site. A client who arrives on the portfolio and prefers to transact through Upwork (which is a meaningful subset of Harsha's target clients in the startup and growth tiers) has no path to the Upwork profile. The portfolio and the primary acquisition channel are currently disconnected systems. This is a medium-severity issue now, and it becomes a high-severity issue the moment Harsha has Upwork reviews to surface.

---

## Three-Tier Strategy Evaluation

### Does targeting three tiers simultaneously strengthen or dilute the message?

It dilutes the hero and strengthens the services section — in that order. The hero sub-headline correctly focuses on startups and growth-stage clients ("I help startups and growth-stage companies ship better products faster"), which reflects the 90-day priority Harsha confirmed. Enterprise is appropriately invisible at the hero level. So far, so good.

The problem is that below the hero, the site treats all three tiers as co-equal. The WhoItsFor segmented control defaults to Startup (correct), but the visual weight of the three tabs is identical. A visitor scanning the services section gets the impression that Harsha serves three distinct markets with equal emphasis — which either dilutes the startup/growth message or raises the question "does this person actually specialise in anything?"

The three-tier model is the right framework for a portfolio that intends to grow into the enterprise market over time. But in its current form, it positions Harsha as a generalist with three flavours rather than a specialist who can also serve adjacent markets.

### Is the current on-site differentiation between tiers clear enough for a visitor to self-identify?

Mostly yes. The taglines are strong, the deliverables are tier-specific, and the segmented control is an elegant interaction pattern. However, Harsha's own input correctly identifies the fundamental problem: clients describe problems, not company stages. A seed-stage founder does not think "I am a Startup." They think "I need an investor demo in three weeks and my internal designer just quit." The tier labels (Startup / Growth / Enterprise) are useful organising labels for Harsha, but they are not the entry point for a client.

The taglines partially solve this — "Get investor-ready, user-validated design — without hiring a full team" is problem-language, not stage-language. But the tab labels that gate access to those taglines are stage-language. A founder who identifies as "a company that needs a design system" might click Growth without knowing that the Startup tier also covers design system foundations. There is currently no cross-tier navigation or "not sure which tier fits?" guidance.

### Should the near-term focus (Startups + Growth) be reflected differently in primary messaging?

Yes. Three specific changes would make the near-term priority visible without removing enterprise from the site:

1. The WhoItsFor section headline currently reads "Services tailored to your stage" — neutral across all three. A small adjustment ("Services built for startups and growing products") would signal priority without removing the Enterprise tab.

2. The two near-term tiers (Startup and Growth) should receive noticeably more visual weight than Enterprise in the tab area — either through a default-visible "recommended" tag on the Startup tab, or a subtle de-emphasis on the Enterprise tab (e.g., "Enterprise →" with a note that it requires a conversation, not a standard engagement).

3. The case studies should skew visibly toward startup and growth-stage work. If the featured project and two of the three secondary projects are clearly startup or growth-stage, the site's implicit positioning becomes "I'm primarily a startup/growth designer who can also handle enterprise" — which matches Harsha's 90-day priority.

### Recommendation

Maintain the three-tier structure. It is the right long-term architecture and is already built. Make two adjustments before launch: (a) change the WhoItsFor headline to reflect the near-term priority audience, and (b) ensure the featured case study and at least two of the three secondary case studies represent startup or growth-stage work. These two changes shift the implicit positioning without any structural site changes.

---

## Case Study Strategy

### Are the right types of projects represented to attract Startup and Growth-stage clients?

The four placeholder projects are:

| Title | Category | Client Stage | Audience Match |
|-------|----------|--------------|----------------|
| AI-Powered Design System | AI/ML Product | Growth Stage (Series B) | Strong Growth-stage match |
| AI Analytics Dashboard | Data Visualization | Enterprise (250+ employees) | Enterprise match only |
| Context-Aware Mobile App | Mobile Design | Scale-up (Series C) | Moderate Growth match |
| Async Collaboration Platform | Enterprise SaaS | Enterprise (500+ employees) | Enterprise match only |

Two of the four projects are explicitly enterprise-scale. None is a pre-seed or Series A MVP project. For a designer whose 90-day priority is startups and growth-stage clients, this is a significant positioning mismatch. A pre-seed founder reading this portfolio would see two enterprise projects and a Series C project and conclude that Harsha works with large, established companies — not early-stage teams.

### Portfolio mix gaps

- **No MVP / pre-launch project.** The most common startup engagement is "we need screens and a prototype before our funding round." None of the four projects represents this. This is the single biggest case study gap for the 90-day target audience.
- **No B2C project.** All four are B2B or enterprise. Consumer Mobile is listed as an industry served, but there is no consumer-facing project in the portfolio.
- **No research-led project.** The AI Analytics Dashboard has the most research depth (user shadowing, support ticket analysis), but it is framed as a dashboard design project. A standalone research engagement — "I ran discovery that changed the product strategy" — would differentiate Harsha from execution-only designers and signal seniority to growth-stage Product Leads who need a thought partner, not just screens.
- **No clearly "fast" project.** The AI speed positioning claims 2–3 weeks to ship-ready designs for startups, but the four placeholder projects span 6–12 months. A short-duration, high-quality project would directly prove the speed claim. The absence of one undermines the 40% faster delivery positioning.

### Ideal case study mix

Given the 90-day priority (Startups + Growth equally) and the eventual enterprise goal:

| Slot | Ideal Project Type | Why |
|------|--------------------|-----|
| Featured | MVP / prototype for a Series A or pre-seed client | Most direct proof for the primary 90-day audience; investor-demo angle speaks directly to the startup tagline |
| Secondary 1 | Design system or platform consistency for a Series B+ client | Direct proof for the Growth-stage audience; design system work also signals to Enterprise buyers |
| Secondary 2 | Research-led project (any stage) | Differentiates Harsha from execution-only designers; proves the AI research synthesis claims concretely |
| Secondary 3 | Mobile or B2C project | Broadens the portfolio without undermining the positioning; signals range |

If Harsha has real projects from these categories, this is the ideal ordering. If the real project history is enterprise-heavy, the framing strategy matters: even an enterprise project can be described at the "team" or "product area" level rather than the full-organisation level, making it relatable to growth-stage clients.

### Ordering recommendation

The featured project should always be the one most directly aligned with the primary 90-day target audience (startups). It should show the fastest timeline, the most concrete outcome, and the clearest connection to the AI workflow. The three secondary projects should follow in order: Growth-stage proof → research/process depth → portfolio range.

**Important technical note:** The featured project's secondary description ("Unified 3 platforms under one AI-assisted design system — catching accessibility issues before handoff, not after.") is hardcoded in Homepage.tsx at line 685 and is independent of the project data in projects.ts. When the featured project is replaced with a real one, this line must be updated manually alongside the data change. This is a code maintenance risk that the development agent should address.

---

## Missing Content Inventory

The following items are absent from the site and are needed for it to function as a conversion tool. Listed in order of impact on the primary goal (winning Startup and Growth-stage clients via Upwork and direct inbound).

### Blocking items (site cannot launch without these)

1. **Harsha's real name in the nav.** Replace "Your Name" in the navigation component. Takes 30 seconds. Has the largest trust impact per minute of effort of any item on this list.

2. **At least one real case study with real images.** The featured slot must be a real project with real Figma screenshots (blurred or cropped if under NDA). A single real project outperforms four placeholder ones in every dimension: trust, search relevance, and conversion. Harsha must supply the project details; the agent can handle the formatting and copy.

3. **Real email address in the contact CTA.** The primary conversion button links to hello@example.com. Any client who clicks it and receives a bounce or no reply will not return.

4. **Testimonials section hidden or replaced.** The three placeholder testimonials (Sarah Kim, Marcus Osei, Priya Nair) must be removed before the URL is shared with any prospective client. Replace with: (a) real Upwork review screenshots if any exist, (b) a single genuine quote from any past client however brief, or (c) a temporary bridge section such as "Clients consistently say..." framed as anticipated outcomes rather than fabricated quotes. Option (a) or (b) is strongly preferred.

5. **Hero metrics replaced or reframed.** The floating stat cards (40% faster, 20+ projects, 5.0★) are aspirational and unsupported. The 5.0★ Upwork claim is particularly exposed — a client who searches for Harsha on Upwork and finds no profile or a profile with no reviews will immediately question every other claim on the site. Replace with real numbers, even modest ones ("8 projects shipped" is honest and credible), or reframe as process differentiators that cannot be directly falsified ("Research in days, not weeks / Full lifecycle: research to dev handoff / SaaS, FinTech & HealthTech").

6. **Real LinkedIn URL.** The LinkedIn link currently resolves to https://linkedin.com (the generic homepage). A client who clicks it arrives at LinkedIn's front page, not Harsha's profile. Replace with the actual profile URL.

### High-impact pre-launch improvements

7. **Upwork profile link in Contact section and footer.** Add a third CTA button in the Contact section: "Hire me on Upwork →" linking to Harsha's actual Upwork profile. Also replace the Dribbble link in the footer with Upwork. Dribbble signals visual/UI design, not the product/UX positioning Harsha wants. Upwork is the primary acquisition channel and should be the most prominent external link on the site.

8. **Professional headshot in the About section.** The layout allocates a full 2/5 column on desktop for the right-side panel, currently used only for the Industries Served card. A headshot above the Industries card would use this space correctly. In professional services, a face is a conversion asset. A smartphone photo with good natural light is acceptable as an interim solution; a professional headshot is the goal.

9. **"9 years of experience" added to About copy.** The years-of-experience figure appears in the project brief but nowhere on the site. Add it to the first paragraph of the About section: "I'm Harsha, a UX designer with 9 years of experience..." This is a one-sentence change with measurable credibility impact — particularly for growth-stage and enterprise buyers who need to justify the hiring decision internally.

10. **Pricing floor signal in WhoItsFor or Contact.** Add a single line under the CTA in each tier: "Projects typically start at [amount]." Harsha confirmed current project values of sub-$5k to $15k and a 6-month target of $15k–$50k. A floor signal of "from $3,000" or "from $5,000" filters out budget-mismatched inquiries, signals that Harsha is not a low-cost option, and reduces the cognitive overhead of reaching out for a client who doesn't want to waste a discovery call.

### Medium-impact post-launch improvements

11. **"How I Work" client experience summary.** The AI workflow section explains Harsha's internal process. It does not explain what working with Harsha looks like from the client's side. A 3-step visual — e.g. "Brief → AI-accelerated research and design → Dev-ready delivery with annotated specs" — set as a horizontal bar below or above the WhoItsFor section would answer the question "will this be complicated?" before it is asked.

12. **Availability signal in Contact section.** Replace or supplement the "Available for New Projects" badge with a specific month: "Currently taking on new projects from May 2026." This creates mild urgency, prevents the "I'll reach out in a few months" delay response, and filters out leads who need someone today if Harsha is not available today.

13. **Calendly link once set up.** Add to the Contact section alongside the email CTA. Eliminates the email-to-call scheduling loop for clients who prefer to book directly. Low effort once the Calendly account exists.

14. **"Not sure which tier fits?" micro-copy in WhoItsFor.** Add a single line below the segmented control: "Not sure which fits? Just tell me what you're working on." Links to the contact anchor. Catches the visitors who don't cleanly self-identify as Startup, Growth, or Enterprise — which, per Harsha's own input, is most visitors.

15. **Bridge link from AI Stack section to a relevant case study.** At the bottom of the AI workflow section, add: "See how this worked in [Project Name] →" linking to the case study that most directly demonstrates the AI workflow (ideally the featured project). This converts process interest into case study engagement.

16. **Footer attribution.** Change "© 2026 · AI-Powered UX Designer" to "© 2026 · Harsha" or "© 2026 Harsha [surname if using]." The current copy reads like a job title, not a person's name.

---

## Competitive Positioning

### What this portfolio does better than the average freelance UX portfolio

- **The three-tier audience segmentation in WhoItsFor is exceptional.** Most freelance portfolios either list generic services or describe a single ideal client. The interactive segmented control with tier-specific taglines, deliverables, and CTAs is architecturally superior to anything comparable in the freelance UX space. It allows a single-page site to speak three different languages without losing clarity.

- **The AI workflow section is a genuine competitive differentiator — if backed by proof.** Every UX freelancer is now claiming "I use AI tools." Harsha's workflow section names specific agents, describes specific workflows, and quantifies specific phase-level time reductions. This is the difference between a positioning claim and a capability demonstration. No comparable freelance portfolio I am aware of makes this argument with this level of specificity and visual investment.

- **The contact section's "What happens next" sequence eliminates the most common objection to outreach.** "What do I say?" and "Will this be a hard sell?" are the two reasons a warm lead doesn't become an inquiry. The three-step sequence (message → discovery call → proposal in 48 hours) addresses both. This copy is better than the average agency contact page, let alone a freelancer.

- **The section copy is outcome-first throughout.** "Get investor-ready, user-validated design — without hiring a full team" is the language of a client's P&L, not a designer's CV. Most freelance portfolios still default to "I am passionate about user-centred design." This site does not. That distinction is meaningful for the $15k–$50k client Harsha is targeting at the 6-month mark.

### What comparable portfolios typically have that this one lacks

- **Real work.** This is not a nuanced gap. Every portfolio that converts has real work in it. The site is currently competing in a category (serious professional portfolio) where the admission price is demonstrated evidence. It is not yet paying that price.

- **A pricing signal.** High-conversion freelance portfolios at the $10k+ level typically include a "starting from" figure or an engagement type guide. It signals confidence, filters mismatched leads, and is a proxy for seniority. Its absence is conspicuous at the level Harsha is positioning for.

- **A "worked with" or "clients include" section.** Even anonymised client descriptions ("a Series A FinTech startup, a 500-person healthcare software company") provide the social proof of a client roster without requiring named references. This is a lightweight social proof mechanism that requires no new content creation — just an honest description of the real projects Harsha provides.

- **An external profile link to the primary acquisition channel.** Upwork is Harsha's primary channel. Its absence from the site means the portfolio is a closed loop — a client who finds the site and wants to hire through Upwork has to leave the site and independently search for Harsha. This creates drop-off at the exact moment conversion intent is highest.

### The risk of launching without addressing the critical placeholder issues

The risk is specifically to the $15k–$50k client Harsha wants to attract within 6 months. That client — a VP of Product at a Series B company, a Director of UX at a healthcare enterprise — is a professional buyer who evaluates vendors for a living. They will:

1. Search for "Harsha UX designer" and expect to find a consistent professional presence.
2. Click the LinkedIn link on the site and expect to find a real profile.
3. Look for the Upwork profile and 5.0★ rating the hero claims.
4. Ask in a discovery call how many of the 20+ projects were similar to their problem.

If any of these checks fails — and currently three of the four would fail — the client does not proceed. The client does not explain why. The site analytics show a session that viewed the hero and bounced. Harsha will not know the real reason.

The lower-budget client (sub-$5k, often found on Upwork directly) is less likely to perform due diligence at this level. Launching with placeholder content might generate low-budget inquiries while silently filtering out the higher-value clients the portfolio is architecturally designed to attract.

**The net risk: the site, if launched in its current state, would actively work against Harsha's goal of moving upmarket.** It would attract clients who don't do due diligence, at the price point Harsha is trying to move away from.

---

## Recommendations Table

| # | What to Change | Why It Matters | Effort | Timing | Owner |
|---|---------------|----------------|--------|--------|-------|
| 1 | Replace "Your Name" in nav with "Harsha" | First thing any client sees; signals the site is not a live template | Low | Pre-launch blocker | Agent can do |
| 2 | Replace hello@example.com with real email | Primary conversion button is broken | Low | Pre-launch blocker | Harsha must provide real email |
| 3 | Replace https://linkedin.com with real LinkedIn URL | Currently links to LinkedIn homepage, not Harsha's profile | Low | Pre-launch blocker | Harsha must provide URL |
| 4 | Replace "© 2026 · AI-Powered UX Designer" footer with "Harsha" | Footer attribution reads as job title, not person | Low | Pre-launch blocker | Agent can do |
| 5 | Populate at minimum the featured case study with a real project, real images, real outcomes | Portfolio cannot convert without real work; featured slot has highest visibility | High | Pre-launch blocker | Harsha must supply project details and images |
| 6 | Hide or replace the testimonials section | Fabricated testimonials are a credibility liability that outweighs the social proof benefit | Low (hide) / High (replace) | Pre-launch blocker | Harsha must supply real quotes; agent can hide section |
| 7 | Replace or reframe hero stat cards (40%, 20+, 5.0★) | Aspirational metrics on a professional portfolio are a trust risk; 5.0★ is directly checkable on Upwork | Low (reframe) / Medium (replace with real data) | Pre-launch blocker | Harsha to decide approach; agent can implement |
| 8 | Add Upwork profile link to Contact section and replace footer Dribbble link | Primary acquisition channel not linked from the site; Dribbble misaligns with product/UX positioning | Low | Pre-launch improvement | Harsha must provide Upwork URL once live |
| 9 | Add "9 years of experience" to About section first paragraph | Significant credibility signal currently absent from the site | Low | Pre-launch improvement | Agent can do once Harsha confirms wording |
| 10 | Add professional headshot to About section right column | Face builds disproportionate trust in professional services; layout space already allocated | Medium | Pre-launch improvement | Harsha must arrange and provide photo |
| 11 | Populate a second real case study (Growth-stage or research-led) | One case study is sufficient to launch; two establishes pattern and covers the second priority audience | High | Pre-launch improvement | Harsha must supply project details |
| 12 | Change WhoItsFor headline to reflect startup/growth priority | "Services tailored to your stage" is neutral; headline should signal near-term specialisation | Low | Pre-launch improvement | Agent can do |
| 13 | Add "not sure which tier?" micro-copy under segmented control | Clients identify by problems, not stages; catch self-uncertain visitors before they bounce | Low | Pre-launch improvement | Agent can do |
| 14 | Add pricing floor signal to WhoItsFor CTAs or Contact section | Filters budget mismatches; signals seniority; reduces wasted discovery calls | Low | Pre-launch improvement | Harsha must confirm the number |
| 15 | Add bridge CTA at bottom of AI Stack section linking to featured case study | Converts process interest into case study engagement; the AI section currently has no proof attached | Low | Pre-launch improvement | Agent can do (depends on item 5) |
| 16 | Fix hardcoded featured project description in Homepage.tsx line 685 | Description is independent of projects.ts data; will not auto-update when featured project changes | Low | Pre-launch improvement | Agent can do (depends on item 5) |
| 17 | Add availability signal to Contact section ("Taking on new projects from [Month]") | Reduces "I'll come back later" deferrals; creates mild urgency | Low | Pre-launch improvement | Harsha must confirm availability date |
| 18 | Add Calendly booking link to Contact section | Eliminates email-to-meeting scheduling friction for motivated leads | Low | Pre-launch improvement | Harsha must set up Calendly first |
| 19 | Add "worked with" or anonymised client context to case study descriptions | Social proof without requiring named references; establishes client roster pattern | Low | Pre-launch improvement | Agent can do once Harsha supplies real project details |
| 20 | Install Google Analytics 4 and configure contact CTA goal events | No baseline data; cannot measure what is working once the site is live | Medium | Pre-launch improvement | Technical agent or Harsha (if GA4 code can be added to the site) |
| 21 | Add "How I Work" client experience summary (3-step visual) | The AI stack explains Harsha's process; clients also need to understand their experience | Medium | Post-launch | Agent can draft; Harsha to review |
| 22 | Populate third and fourth real case studies | Full portfolio strength; supports 180-day target | High | Post-launch | Harsha must supply project details |
| 23 | Collect and publish real testimonials (minimum 1 Upwork review, 2 client quotes) | Social proof is the most trust-building section; currently entirely absent | High | Post-launch | Harsha must source; agent can format |
| 24 | Add /work or /projects route for a full portfolio page | Enables showing more than 4 projects as portfolio grows | Medium | Post-launch | Agent can do |
| 25 | Consider adding a FAQ section addressing NDA, retainer, team integration, and scope questions | Removes friction from the inquiry process; addresses objections before discovery call | Medium | Post-launch | Agent can draft from standard freelance UX objections; Harsha to review |

---

## Summary of Pre-Launch Blockers

These seven items must be resolved before the URL is shared with any prospective client:

- [ ] "Your Name" replaced with "Harsha" in navigation
- [ ] hello@example.com replaced with Harsha's real email address
- [ ] https://linkedin.com replaced with Harsha's real LinkedIn profile URL
- [ ] Footer attribution updated from "AI-Powered UX Designer" to "Harsha"
- [ ] Featured case study replaced with a real project (real images, real outcomes, real problem statement)
- [ ] Testimonials section hidden or replaced with real quotes
- [ ] Hero stat cards replaced with real data or reframed as non-performance claims

Everything else improves the site. The seven items above make it launchable.

---

## The Single Most Important Action Harsha Can Take Right Now

Provide the details of one real project. Even a short engagement: a startup MVP, a research sprint, a design system audit. Include: what the client was trying to do, what Harsha specifically decided or built, and what the result was — even a qualitative one ("the prototype was used to raise [funding round]" or "the client said handoff was the cleanest they'd received"). 

That one project unlocks: a real featured case study, a real hero metric, a real AI stack proof point, and — once published — a testimonial request to the client. It is the single action with the most downstream leverage on the site's ability to convert.

---

## Last updated: April 2026
## Maintained by: Product Manager agent
