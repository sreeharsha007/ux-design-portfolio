export interface AIWorkflowStep {
  phase: string;
  tool: string;
  impact: string;
}

export interface ProcessTimelineStep {
  phase: string;
  duration: string;
  description: string;
}

export interface ContextPoint {
  title: string;
  description: string;
}

export interface KeyDecision {
  title: string;
  description: string;
  rationale?: string;
  artefacts?: string[];
  image?: string;
}

export interface ImpactItem {
  title: string;
  detail?: string;
}

export interface ProjectAsset {
  src: string;
  caption?: string;
}

export interface AIInProject {
  summary: string;
  points: Array<{ area: string; detail: string }>;
}

export interface LearningItem {
  title: string;
  detail: string;
}

export interface Testimonial {
  quote: string;
  highlightText?: string;
  highlightParts?: string[];
  role: string;
  company: string;
  location: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  role: string;
  timeline: string;
  industry: string;
  clientSize: string;
  problem: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
  deliverables: string[];
  aiWorkflow: AIWorkflowStep[];
  processTimeline: ProcessTimelineStep[];
  tagline?: string;
  heroImage?: string;
  contextImage?: string;
  context?: string;
  contextPoints?: ContextPoint[];
  keyDecisions?: KeyDecision[];
  impactItems?: ImpactItem[];
  aiInProject?: AIInProject;
  learnings?: LearningItem[];
  aiDesignNote?: string;
  reflection?: string;
  projectAssets?: ProjectAsset[];
  nextPhase?: string[];
  testimonial?: Testimonial;
}

export const projects: Project[] = [
  {
    id: "ai-assistant",
    title: "AI-Native Security Intelligence Platform",
    category: "AI Security Platform",
    description: "An AI-native security platform that connects vulnerabilities across code, teams, and ownership — helping organisations see not just what's broken, but who owns it, why it matters, and how to act on it.",
    image: "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MjA2OTExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Lead UX Designer",
    timeline: "8 months (2025)",
    industry: "Enterprise SaaS / Cybersecurity",
    clientSize: "Growth Stage (Series B)",
    problem: "The product team was shipping inconsistent UI across 3 platforms due to a sprawling, undocumented design system. Accessibility regressions were caught late in QA, and designers spent 30% of their time on component audits rather than solving user problems.",
    solution: "Built an AI-assisted design system layer on top of Figma that auto-flags inconsistencies, suggests accessible color pairings, and generates component variants from natural language prompts. Embedded linting directly into the design workflow so issues are caught before handoff — not after.",
    outcomes: [
      "40% reduction in design-to-development handoff time",
      "100% WCAG 2.1 AA compliance across all new components",
      "12 engineers reported fewer design-related QA cycles",
      "Design system adoption increased from 60% to 94% across the product"
    ],
    technologies: ["Figma API", "OpenAI GPT-4", "TensorFlow.js", "React", "Node.js"],
    deliverables: [
      "Figma design system with 80+ documented components",
      "AI linting plugin (Figma)",
      "Accessibility audit report",
      "Component usage guidelines doc",
      "Handoff spec templates"
    ],
    aiWorkflow: [
      {
        phase: "Research & Audit",
        tool: "Claude + Notion AI",
        impact: "Synthesized 200+ Figma components and user complaints in 2 days vs. 2 weeks manually"
      },
      {
        phase: "Accessibility Review",
        tool: "GPT-4 + Figma Plugin API",
        impact: "Automated WCAG checks across entire component library — 8 hours saved per sprint"
      },
      {
        phase: "Component Generation",
        tool: "Figma AI + custom prompts",
        impact: "Generated 30+ variant drafts in 1 hour; team refined instead of built from scratch"
      },
      {
        phase: "Documentation",
        tool: "Notion AI + Claude",
        impact: "Full system documentation written in 3 days vs. typical 3-week timeline"
      }
    ],
    processTimeline: [
      {
        phase: "Discovery",
        duration: "Week 1–2",
        description: "Audited existing Figma files, interviewed 8 engineers and 4 designers, mapped inconsistency patterns"
      },
      {
        phase: "Define",
        duration: "Week 3–4",
        description: "Prioritised component gaps, defined accessibility requirements, scoped AI integration points"
      },
      {
        phase: "Design",
        duration: "Week 5–10",
        description: "Built core component library, designed AI linting rules, created variant generation prompts"
      },
      {
        phase: "Deliver",
        duration: "Week 11–12",
        description: "Handed off to engineering with full documentation, ran onboarding sessions with both teams"
      }
    ],
    tagline: "Finding vulnerabilities was possible. Understanding them in context was not.",
    context: "In modern organisations, resources, ownership, costs, and risks are spread across teams — making it difficult to trace accountability or prioritise what actually matters. As structures grow more layered, users need a faster way to access context, investigate issues, and align the right people around action. The market had tools that could surface security signals; very few could connect those signals to ownership, accountability, and business impact in a way that reflected how an organisation actually operates.",
    contextPoints: [
      { title: "Risk context was fragmented", description: "Technical findings were visible, but their relationship to ownership, organisational structure, and business impact was hard to trace." },
      { title: "Accessing insights took too much effort", description: "Critical information was buried inside deep hierarchies — slowing down workflows where minutes matter." },
      { title: "RCA was collaborative, the workflow was not", description: "Root cause analysis involved multiple teams, but the supporting experience was disjointed and hard to share." },
    ],
    keyDecisions: [
      { title: "Making organisational complexity more intelligible", description: "Introduced a semantic layer during onboarding and mapping to better structure organisational information for both users and AI — creating a stronger basis for linking vulnerabilities to ownership, accountability, cost visibility, and business context.", rationale: "Before you can rank risk, the system has to understand who a risk belongs to. Structure first, intelligence second.", artefacts: ["Semantic schema", "Onboarding mapping"] },
      { title: "Reducing dependence on drill-down navigation", description: "Introduced both global and contextual AI chat so users could retrieve answers, updates, and next steps without losing the ability to drill deeper when they needed to.", rationale: "Hierarchies are good for storage, bad for retrieval. Conversation collapses the path between question and answer.", artefacts: ["Chat surface spec", "Context handoff"] },
      { title: "Reframing RCA around collaboration", description: "Shaped an AI-powered canvas that supported investigation in context, live team collaboration, and shareable outputs — closer to how teams actually resolve issues together.", rationale: "RCA is a team sport. The tool should reflect the crowd, not a single analyst's screen.", artefacts: ["RCA canvas", "Shareable report"] },
      { title: "Grounding AI interactions in usability principles", description: "Used HCI principles to shape AI interactions so they felt understandable, responsive, and trustworthy in a high-stakes environment where misreading a signal has real consequences.", rationale: "In security, confidence matters as much as capability. If people can't read the AI, they won't act on it.", artefacts: ["Interaction heuristics", "Trust checklist"] },
      { title: "Building a scalable design system foundation", description: "Established a scalable design system direction to support consistency, reuse, and faster product evolution as the platform grew from MVP into a multi-surface product.", rationale: "An early system costs a week. A missing one costs a quarter, every quarter, forever.", artefacts: ["Foundation tokens", "Component baseline"] },
    ],
    impactItems: [
      { title: "MVP became clearer", detail: "Product framing and prioritisation helped define a more credible direction for funding and future growth." },
      { title: "Organisational context became more intelligent", detail: "The semantic layer connected teams, resources, ownership, and vulnerabilities in a more meaningful way." },
      { title: "Investigation and reporting became more accessible", detail: "AI chat and collaborative workflows made it easier to find answers, investigate issues, and share outcomes across teams." },
      { title: "Delivery became more scalable", detail: "A stronger design system and cleaner UI handoff reduced friction between design and implementation." },
    ],
    aiDesignNote: "One of the most important parts of this project was designing in a space where AI interaction patterns were still taking shape. Rather than treating AI as a layer on top of the interface, I approached it as part of the workflow itself — which required careful thinking around trust, system feedback, usability, and user control. In AI-led experiences, capability alone is not enough. Users need clarity, orientation, and confidence in how the system is helping them.",
    reflection: "This project reinforced how important it is to design AI experiences around clarity, feedback, and control — especially in complex and high-stakes environments. It also surfaced a broader lesson: when designing emerging AI products, the challenge is not only shaping the intelligence itself, but shaping the interaction patterns that help people trust and use that intelligence effectively.",
    projectAssets: [
      {
        src: "/ChatGPT Image Apr 22, 2026, 10_46_47 PM.png",
        caption: "Semantic onboarding — mapping teams, ownership, and resources into organizational context the AI can reason about.",
      },
      {
        src: "/ChatGPT Image Apr 23, 2026, 12_34_56 PM.png",
        caption: "Global overview — vulnerabilities connected to the teams and business areas that own the risk.",
      },
      {
        src: "/ChatGPT Image Apr 23, 2026, 12_48_33 PM.png",
        caption: "Contextual AI chat — pulling prioritized answers without drilling through hierarchies.",
      },
      {
        src: "/ChatGPT Image Apr 23, 2026, 01_02_26 PM.png",
        caption: "Vulnerability deep-dive — evidence, ownership trail, and recommended actions in one frame.",
      },
      {
        src: "/ChatGPT Image Apr 23, 2026, 01_05_00 PM.png",
        caption: "RCA canvas — cross-functional root cause investigation with shareable outputs.",
      },
      {
        src: "/ChatGPT Image Apr 23, 2026, 02_19_25 PM.png",
        caption: "System view — scalable design foundations supporting consistency as the platform grows.",
      },
    ],
    testimonial: {
      quote: "Harsha helped us see our problem was organizational clarity, not technology. His RCA canvas made ownership visible — incident response cycles cut in half, adoption jumped to 94%. Investors saw this as a differentiator: we weren't just faster, we were building preventive intelligence. That capability shift became core to our growth story.",
      highlightParts: ["incident response cycles cut in half,", "adoption jumped to 94%."],
      role: "CISO",
      company: "Series B Security Company",
      location: "California",
      rating: 5,
    },
  },
  {
    id: "neural-insights",
    title: "Pipeline operations were information-rich, but not decision-friendly.",
    category: "Data Visualization",
    description: "I helped shape a modern operational platform that made complex pipeline workflows across design, monitoring, and diagnostics more visual, usable, and actionable — without losing the rigor required in industrial environments.",
    image: "https://images.unsplash.com/photo-1752253604157-65fb42c30816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZnV0dXJpc3RpYyUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzIxMDUxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Head of UX Design",
    timeline: "6 months (2025)",
    industry: "Enterprise SaaS / AI Tooling",
    clientSize: "Enterprise (250+ employees)",
    problem: "Business leaders needed to track AI model performance but lacked the technical context to interpret raw metrics. The existing dashboard was built for data engineers — it overwhelmed non-technical users and led to constant escalations to the data team for basic questions.",
    solution: "Designed a progressive disclosure dashboard that adapts its complexity to the viewer's role. Executives see business-impact summaries; data teams get granular controls. Custom visualizations translate technical metrics into revenue and risk language, with contextual tooltips that teach rather than just label.",
    outcomes: [
      "85% of non-technical users correctly interpreted model performance in usability testing",
      "60% decrease in data team support tickets within 8 weeks of launch",
      "3x increase in weekly active usage among leadership team",
      "Average time-to-decision reduced from 4 days to same-day"
    ],
    technologies: ["D3.js", "WebGL", "React", "Python / FastAPI", "WebSockets"],
    deliverables: [
      "High-fidelity Figma prototype (desktop + tablet)",
      "Role-based view specifications (Executive / Analyst / Engineer)",
      "Custom data visualization component library",
      "Onboarding flow design",
      "UX research report with usability test findings"
    ],
    aiWorkflow: [
      {
        phase: "User Research",
        tool: "Claude + Dovetail AI",
        impact: "Analyzed 15 stakeholder interviews and 6 months of support tickets in 4 hours"
      },
      {
        phase: "Information Architecture",
        tool: "GPT-4 + FigJam AI",
        impact: "Generated and evaluated 8 IA structures in 1 day vs. 1 week of workshops"
      },
      {
        phase: "Chart Design",
        tool: "Midjourney + manual Figma work",
        impact: "Produced 20 visualization concepts in a half-day for stakeholder review"
      },
      {
        phase: "Copy & Tooltips",
        tool: "Claude",
        impact: "Wrote plain-language explanations for 40+ technical metrics in 2 hours"
      }
    ],
    processTimeline: [
      {
        phase: "Discovery",
        duration: "Week 1–2",
        description: "Shadowed 6 user sessions, reviewed support ticket patterns, mapped decision-making workflows"
      },
      {
        phase: "Define",
        duration: "Week 3",
        description: "Defined 3 user personas, prioritised metrics by business impact, aligned with engineering on data availability"
      },
      {
        phase: "Design",
        duration: "Week 4–9",
        description: "Iterated on IA, built interactive prototype, ran 2 rounds of usability testing with 5 participants each"
      },
      {
        phase: "Deliver",
        duration: "Week 10–11",
        description: "Final handoff with annotated specs, edge case documentation, and a live walkthrough with the engineering team"
      }
    ],
    tagline: "I helped shape a modern operational platform that made complex pipeline workflows across design, monitoring, and diagnostics more visual, usable, and actionable — without losing the rigor required in industrial environments.",
    heroImage: "/Pipeline - Hero Image, Key Decision 5.png",
    contextImage: "/Pipeline - Context and Problems.png",
    context: "Pipeline operations sit across interconnected infrastructure, legacy operational systems, and safety-critical workflows. Teams need to design, monitor, and diagnose complex networks of pipelines, valves, tanks, pumps, and control systems — often within environments where clarity, speed, and trust matter as much as functionality. While the tools in this space were operationally powerful, they were often dense, engineering-heavy, and not naturally aligned with modern product workflows. The opportunity was not just to modernize the interface, but to make complex operational systems easier to understand, work through, and act on without compromising domain rigor.",
    contextPoints: [
      { title: "Operational complexity was hard to interpret", description: "Infrastructure relationships, component dependencies, and system behavior were visible, but not always easy to read as one connected operational picture." },
      { title: "Design, monitoring, and diagnostics felt disconnected", description: "Users had to think across multiple operational modes, but the experience did not naturally unify system creation, live visibility, and issue analysis into one coherent workflow." },
      { title: "Usability had to improve without breaking operational trust", description: "Any modernization had to work within the expectations of industrial and SCADA-like environments, where readability, control, and confidence mattered more than visual novelty." },
    ],
    keyDecisions: [
      { title: "Framing the product around operational workflows, not isolated screens", description: "Reframed the platform around connected workflows such as design, monitoring, and diagnostics, creating a more coherent operational system instead of a set of disconnected industrial views.", rationale: "PRODUCT STRUCTURE", artefacts: ["Workflow architecture", "Journey mapping", "Operational mode mapping"], image: "/Pipeline - Key Decisions 1.png" },
      { title: "Making pipeline design feel visual, precise, and usable", description: "Defined a canvas-first builder with domain-specific components and structured interaction logic, making pipeline creation clearer, more deliberate, and easier to work through.", rationale: "WORKFLOW DESIGN", artefacts: ["Canvas workflow design", "Component behavior mapping", "Interaction prototyping"] },
      { title: "Building a modern design foundation without losing operational credibility", description: "Created a scalable design foundation across reusable UI patterns and SCADA-aware component representations, helping the product feel more modern, consistent, and trustworthy in a high-stakes operational environment.", rationale: "DESIGN FOUNDATION", artefacts: ["Component library", "SCADA-aware component representations", "Visual system exploration", "Hierarchy and state logic"], image: "/Pipeline - Key Decision 3.png" },
      { title: "Turning pipeline monitoring into an actionable diagnostic experience", description: "Designed the viewer experience to move beyond passive monitoring by connecting live pipeline states, component-level signals, and diagnostic details into a clearer workflow for identifying issues and acting faster.", rationale: "MONITORING & DIAGNOSIS", artefacts: ["Monitoring workflow mapping", "Diagnostic state design", "Component details interaction", "Alert hierarchy"], image: "/Pipeline - Key Decision 4.png" },
      { title: "Positioning AI as practical workflow support", description: "Positioned AI as an assistive layer for diagnostics, recommendations, and workflow support, helping the platform feel more intelligent and useful without becoming distracting or speculative.", rationale: "AI WORKFLOW SUPPORT", artefacts: ["AI workflow exploration", "Use-case framing", "Assistive interaction patterns"], image: "/Pipeline - Hero Image, Key Decision 5.png" },
    ],
    impactItems: [
      { title: "Product direction became clearer", detail: "Workflow framing and prioritization turned a broad industrial concept into a more coherent platform direction." },
      { title: "Operational complexity became more usable", detail: "The builder and interaction model made pipeline workflows easier to create, read, and work through." },
      { title: "Modernization became more credible", detail: "A stronger visual and component system improved clarity and consistency without losing operational trust." },
      { title: "The platform became more scalable", detail: "Reusable foundations and a clearer role for AI created a stronger base for future product growth." },
    ],
    aiInProject: {
      summary: "AI compressed the research and content phases from weeks to days — freeing design time for the parts that needed human judgement.",
      points: [
        { area: "Research synthesis", detail: "Claude clustered themes across 15 stakeholder interviews and 6 months of support tickets in an afternoon." },
        { area: "IA exploration", detail: "GPT-4 generated and evaluated 8 information architectures against role-based jobs-to-be-done — enabling wider option-space exploration." },
        { area: "Visualization concepts", detail: "Midjourney produced 20 visual directions for stakeholder review, turning a week of exploration into half a day." },
        { area: "Plain-language metric copy", detail: "Claude drafted the business-translation tooltips for 40+ metrics — humans reviewed, sharpened, and signed off." },
      ],
    },
    learnings: [
      { title: "Progressive disclosure beats simplification", detail: "Hiding complexity for experts broke their workflow. Revealing complexity on demand preserved both audiences." },
      { title: "Business language is a design decision", detail: "Naming metrics in money and risk terms wasn't copywriting — it was a framing choice that shaped every chart." },
      { title: "Test with the real decision, not the interface", detail: "Tree tests and 5-second tests missed the real question — we switched to 'what would you do next?' tasks and got honest data." },
    ],
    testimonial: {
      quote: "Harsha didn't impose a solution — he ran workshops with our domain engineers to understand what made them confident. The design that shipped came from their thinking. Operators didn't just adopt it; they started thinking differently about diagnostics. They're faster, better at their jobs, teaching each other new patterns. That capability shift is the real ROI.",
      highlightText: "That capability shift is the real ROI",
      role: "VP of Engineering",
      company: "Industrial SaaS",
      location: "Texas",
      rating: 5,
    },
  },
  {
    id: "adaptive-mobile",
    title: "Context-Aware Mobile App",
    category: "Mobile Design",
    description: "A context-aware mobile interface that adapts its layout, density, and interaction patterns based on user behaviour and environment — improving usability in real-world conditions that lab testing misses.",
    image: "https://images.unsplash.com/photo-1713857297379-6fc26e70f581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcxOTg4MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Lead Product Designer",
    timeline: "10 months (2024–2025)",
    industry: "Consumer Mobile / Logistics",
    clientSize: "Scale-up (Series C)",
    problem: "Field workers using the app in variable conditions — low light, gloves, moving vehicles — reported high error rates and task abandonment. The one-size-fits-all interface optimised for desktop-tested scenarios was failing the people who used it most.",
    solution: "Designed an adaptive interface system that reads environmental signals (ambient light, motion, connectivity) and adjusts tap target sizes, contrast ratios, and information density in real time. Introduced a simplified 'field mode' that surfaces only the 3 most-needed actions based on time-of-day and usage patterns.",
    outcomes: [
      "45% improvement in task completion rates in low-light conditions",
      "78% reduction in accidental taps during motion (field testing)",
      "4.7/5 average rating from field workers in post-launch survey",
      "30% increase in daily active usage within 60 days of launch"
    ],
    technologies: ["React Native", "TensorFlow Lite", "Device Sensors API", "Expo", "Figma"],
    deliverables: [
      "Adaptive UI specification document",
      "React Native component library (Figma + code)",
      "Field mode interaction prototype",
      "Environmental trigger logic documentation",
      "Accessibility audit + WCAG compliance report"
    ],
    aiWorkflow: [
      {
        phase: "Field Research Synthesis",
        tool: "Claude + Otter.ai",
        impact: "Transcribed and synthesised 20+ field interviews in 1 day vs. 1.5 weeks"
      },
      {
        phase: "Scenario Mapping",
        tool: "GPT-4",
        impact: "Generated 40 edge-case usage scenarios in 2 hours to stress-test designs"
      },
      {
        phase: "Visual Exploration",
        tool: "Midjourney",
        impact: "Produced high-contrast UI mood boards for 3 environment modes in 3 hours"
      },
      {
        phase: "Prototype Copy",
        tool: "Claude",
        impact: "Drafted all microcopy for adaptive state transitions — 60+ strings — in under an hour"
      }
    ],
    processTimeline: [
      {
        phase: "Discovery",
        duration: "Week 1–3",
        description: "Conducted 20 field observations across 4 locations, analysed crash logs and error patterns"
      },
      {
        phase: "Define",
        duration: "Week 4–5",
        description: "Defined environmental trigger logic, created adaptive behaviour matrix, aligned with mobile engineering"
      },
      {
        phase: "Design",
        duration: "Week 6–14",
        description: "Designed 3 adaptive states, built React Native prototype, ran 3 rounds of field usability testing"
      },
      {
        phase: "Deliver",
        duration: "Week 15–16",
        description: "Full spec handoff, component library documentation, engineer onboarding and QA support"
      }
    ],
    tagline: "An interface that adapts to the real world — not the lab it was tested in.",
    context: "Field workers in logistics used the app in conditions the design team never saw: dim warehouses, cold-storage gloves, moving trucks. Task abandonment spiked outside business hours, and the support inbox filled with 'accidental tap' complaints. A one-size interface was failing the people the product existed for.",
    contextPoints: [
      { title: "The lab was lying", description: "Usability scores in the office were excellent. In the field, error rates tripled. The gap was environment, not interface logic." },
      { title: "Motion and gloves broke touch targets", description: "Standard 44pt targets weren't enough for gloved taps on moving vehicles. Misfires cascaded into order errors." },
      { title: "Fatigue, not features, was the issue", description: "By hour 6 of a shift, users needed fewer choices — not more guidance — and the interface didn't recognise that." },
    ],
    keyDecisions: [
      { title: "Environment as a first-class input", description: "Ambient light, device motion, and connectivity feed into a state machine that adjusts target size, contrast, and density in real time.", rationale: "Adaptation has to be automatic. Asking tired field workers to change settings defeats the point.", artefacts: ["Sensor state machine", "Adaptation rules"] },
      { title: "Field Mode: three actions, nothing else", description: "A simplified mode surfaces only the top three actions based on time-of-day and prior usage.", rationale: "In harsh conditions, the interface's job is to let someone finish — not to show them everything they could do.", artefacts: ["Field Mode spec", "Shortlist logic"] },
      { title: "Prototype in the real environment", description: "Usability testing moved to warehouses and moving vehicles, not conference rooms.", rationale: "If the lab couldn't produce the failure mode, the lab couldn't validate the fix.", artefacts: ["In-field protocol", "Test rigs"] },
      { title: "Larger targets by default, not a setting", description: "Every primary action is sized for a gloved tap — the 'regular' mode never re-appears.", rationale: "Accessibility you can turn off is accessibility most users never find.", artefacts: ["Target size guide", "Regression tests"] },
      { title: "Offline is the default state", description: "Every screen assumes the connection is gone; syncs are background and silent when it returns.", rationale: "Trucks go through tunnels. Warehouses have dead zones. Offline-first is the only honest mode.", artefacts: ["Offline cache plan", "Sync reconciler"] },
    ],
    impactItems: [
      { title: "45% better completion in low light", detail: "Field-tested across 4 warehouse locations" },
      { title: "78% fewer accidental taps in motion", detail: "Measured with in-vehicle instrumentation" },
      { title: "4.7 / 5 rating from field workers", detail: "Post-launch survey, n=312" },
      { title: "30% growth in daily active usage", detail: "Within 60 days of rollout" },
    ],
    aiInProject: {
      summary: "AI helped us see usage patterns that interviews alone would have missed, and accelerated the long tail of microcopy work.",
      points: [
        { area: "Field research synthesis", detail: "Claude + Otter processed 20+ field interviews overnight — themes surfaced in one working day, not two weeks." },
        { area: "Scenario stress-testing", detail: "GPT-4 generated 40 edge-case usage scenarios — gloves, rain, 5% battery — that we walked designs through before prototyping." },
        { area: "Environmental mood boards", detail: "Midjourney produced high-contrast UI direction for three lighting modes in an afternoon." },
        { area: "Adaptive state microcopy", detail: "Claude drafted 60+ transition strings; humans picked the 30 that read well under pressure." },
      ],
    },
    learnings: [
      { title: "Context is a feature", detail: "Designing for the average user in the average environment is designing for no one. Environmental signals deserve the same treatment as user input." },
      { title: "Field testing reshaped scope twice", detail: "Two features that tested well in the office failed in-vehicle — we cut them. The instinct to defend prior decisions is the enemy of good adaptation." },
      { title: "Less is more under strain", detail: "Field Mode's 'three actions' rule felt reductive in review and indispensable in use. Cognitive load is a first-order constraint." },
    ]
  },
  {
    id: "quantum-collab",
    title: "Async Collaboration Platform",
    category: "Enterprise SaaS",
    description: "A next-generation collaboration workspace that uses predictive AI to surface the right information at the right time — cutting context-switching and notification overload for globally distributed teams.",
    image: "https://images.unsplash.com/photo-1688413709025-5f085266935a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBwYXR0ZXJufGVufDF8fHx8MTc3MjAwOTE2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "UX Design Lead & Researcher",
    timeline: "12 months (2024–2025)",
    industry: "Future of Work / Enterprise",
    clientSize: "Enterprise (500+ employees, 12 time zones)",
    problem: "Remote teams across 12 time zones were drowning in fragmented communication — Slack threads with no resolution, emails with attachments that became outdated, and weekly syncs that existed to compensate for unclear async handoffs. People spent more time searching for context than doing the actual work.",
    solution: "Designed a unified async workspace with an AI context layer that intelligently links related conversations, files, and decisions. Smart notifications respect focus hours and time zones. A 'catch-up digest' feature summarises overnight activity into a 3-minute brief, personalised by role and active projects.",
    outcomes: [
      "55% reduction in reported context-switching time (post-launch survey)",
      "70% decrease in 'where is that file/decision?' Slack messages",
      "Meeting frequency reduced by 40% — replaced with structured async handoffs",
      "NPS score improved from 22 to 61 among power users in 3 months"
    ],
    technologies: ["GraphQL", "Electron", "React", "ML Recommendation Engine", "WebRTC"],
    deliverables: [
      "End-to-end product design (web + desktop)",
      "AI notification logic UX specification",
      "Catch-up digest feature prototype",
      "Onboarding and empty-state designs",
      "Design system with async-first component patterns",
      "Research report: async work mental models across cultures"
    ],
    aiWorkflow: [
      {
        phase: "Research Synthesis",
        tool: "Claude + Dovetail AI",
        impact: "Analysed 300+ survey responses and 25 interviews in 3 days — normally a 3-week effort"
      },
      {
        phase: "Workflow Mapping",
        tool: "GPT-4 + Miro AI",
        impact: "Auto-clustered 180 sticky notes from workshops into themes in 20 minutes"
      },
      {
        phase: "Feature Ideation",
        tool: "Claude",
        impact: "Generated 50+ feature concepts aligned to job-to-be-done framework in 1 session"
      },
      {
        phase: "Prototype Narrative",
        tool: "Claude + Framer AI",
        impact: "Wrote stakeholder demo script and in-prototype microcopy 4x faster than previous projects"
      }
    ],
    processTimeline: [
      {
        phase: "Discovery",
        duration: "Week 1–4",
        description: "300-person survey, 25 in-depth interviews, 2 diary studies across 3 time zones"
      },
      {
        phase: "Define",
        duration: "Week 5–6",
        description: "Synthesised insights into 4 core problems, created opportunity statements, aligned stakeholders on scope"
      },
      {
        phase: "Design",
        duration: "Week 7–18",
        description: "3 design sprints, 4 prototype rounds, usability testing with 24 participants across 6 countries"
      },
      {
        phase: "Deliver",
        duration: "Week 19–20",
        description: "Phased handoff across 3 engineering squads, design QA for beta release, post-launch monitoring plan"
      }
    ],
    tagline: "Async work, without the context tax.",
    context: "A 500-person enterprise across 12 time zones had grown faster than its communication norms. Slack threads went unresolved, email attachments went stale, and weekly sync meetings existed to patch over unclear async handoffs. The team was spending more time finding context than producing work.",
    contextPoints: [
      { title: "Fragmented by channel", description: "Every decision lived somewhere different — Slack, Notion, email, call recordings. Finding 'the latest' meant asking three people." },
      { title: "Meetings compensated for bad async", description: "30+ weekly syncs existed to re-establish context that async handoffs had failed to carry." },
      { title: "Notification overload, signal drought", description: "The average user received 90+ notifications per day and reported missing the ones that actually mattered." },
    ],
    keyDecisions: [
      { title: "An AI context layer, not a new channel", description: "The product links related messages, files, and decisions automatically rather than adding another inbox.", rationale: "The problem wasn't too few tools — it was that tools didn't know about each other.", artefacts: ["Context graph", "Integration map"] },
      { title: "Catch-up digest as the primary surface", description: "A role-aware three-minute overnight digest became the morning home screen for distributed teams.", rationale: "People returning to work don't want a firehose. They want the 10% of activity that needs them specifically.", artefacts: ["Digest template", "Relevance model"] },
      { title: "Respect focus, explicitly", description: "Notification logic reads focus hours and time zones before it fires.", rationale: "Interrupting someone in their deep-work block at 2am local time is a bug, not a feature.", artefacts: ["Focus policy", "Quiet-hours rules"] },
      { title: "Decisions are first-class objects", description: "Threads can be promoted to 'decisions' with owner, status, and linked context — searchable long after the conversation fades.", rationale: "Messages disappear. Decisions shouldn't have to be re-asked every quarter.", artefacts: ["Decision schema", "Thread promotion UX"] },
      { title: "Async rituals replace standing meetings", description: "Structured templates for updates, handoffs, and check-ins let teams retire 40% of their recurring syncs.", rationale: "Meetings are a bandaid for async that doesn't carry context. Fix the async, lose the bandaid.", artefacts: ["Ritual templates", "Cadence guide"] },
    ],
    impactItems: [
      { title: "55% less reported context-switching", detail: "From the post-launch user survey" },
      { title: "70% fewer 'where is that?' messages", detail: "Measured via keyword tracking in Slack" },
      { title: "40% fewer meetings", detail: "Replaced with structured async handoffs" },
      { title: "+39 NPS improvement", detail: "From 22 to 61 in 3 months among power users" },
    ],
    aiInProject: {
      summary: "AI accelerated qualitative research and workshop synthesis — the two phases that historically drown async projects in process before design begins.",
      points: [
        { area: "Survey + interview synthesis", detail: "Claude clustered 300 open-ended survey responses and 25 interviews in 3 days — a job that normally takes 3 weeks." },
        { area: "Workshop clustering", detail: "GPT-4 + Miro auto-grouped 180 sticky notes into themes in 20 minutes, freeing workshop time for discussion rather than sorting." },
        { area: "Feature ideation", detail: "Claude generated 50+ concepts mapped to job-to-be-done statements in one session — we kept 12." },
        { area: "Demo narrative", detail: "Claude drafted the stakeholder-demo script and in-prototype microcopy at 4x our historical pace." },
      ],
    },
    learnings: [
      { title: "Notifications are a product, not a setting", detail: "Treating notification logic as a first-class design surface — not an afterthought — changed the adoption story more than any feature." },
      { title: "Culture is downstream of defaults", detail: "Switching the default landing surface from the inbox to the digest shifted team behaviour within two weeks. Defaults matter more than docs." },
      { title: "Async is a capability, not a style", detail: "Teams didn't need more async — they needed better async. The difference is product infrastructure, not etiquette guidelines." },
    ]
  }
];
