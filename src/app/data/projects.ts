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
  heroFit?: 'cover' | 'contain';
  contextImage?: string;
  context?: string;
  contextPoints?: ContextPoint[];
  keyDecisions?: KeyDecision[];
  decisionCategories?: string[];
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
    title: "AI-Assisted Pipeline Operations Platform",
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
    id: "case-study-3",
    title: "Transforming B2B E-Commerce Operations Through a Unified SaaS Ecosystem",
    category: "B2B E-Commerce",
    description: "A product ecosystem designed to simplify B2B commerce operations, improve admin efficiency, and help teams manage storefronts, workflows, integrations, and account operations from one connected platform.",
    image: "https://images.unsplash.com/photo-1752253604157-65fb42c30816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZnV0dXJpc3RpYyUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzIxMDUxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Head of Product Design",
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
    tagline: "A product ecosystem designed to simplify B2B commerce operations, improve admin efficiency, and help teams manage storefronts, workflows, integrations, and account operations from one connected platform.",
    heroImage: "/P3 - Hero.png",
    heroFit: "contain",
    contextImage: "/P3 - Context and Problems.png",
    context: "This project focused on shaping a unified SaaS ecosystem for B2B e-commerce operations. The platform needed to support multiple operational layers — from admin management and storefront control to scheduling, integrations, product workflows, drag-and-drop store building, and internal account management. My role was to bring structure to a fragmented product environment by translating research, market gaps, and business priorities into a scalable product direction, modular UX architecture, and production-ready design system.",
    contextPoints: [
      { title: "Fragmented operational workflows", description: "Teams had to move across disconnected tools and manual processes to manage products, storefronts, schedules, integrations, and account operations." },
      { title: "Complex admin experiences", description: "Existing admin workflows were functional but not intuitive enough for diverse users managing high-volume B2B operations." },
      { title: "Limited product scalability", description: "The ecosystem needed a modular structure that could support multiple product areas without creating inconsistent experiences." },
      { title: "High dependency on manual coordination", description: "Many operational tasks required repeated follow-ups, internal coordination, and platform workarounds." },
      { title: "Inconsistent experience across modules", description: "Different parts of the ecosystem lacked a unified interaction model, making the overall product harder to learn, scale, and maintain." },
    ],
    decisionCategories: ["Architecture", "Research & Alignment", "Automation", "Experience Design", "Scalable Design System"],
    keyDecisions: [
      { title: "Established a Modular Ecosystem Architecture", description: "The platform needed to work as more than a set of individual tools. I helped structure the experience as a connected SaaS ecosystem where each product area had a clear purpose, while still feeling part of one unified operating system. This created a scalable foundation for admin workflows, storefront management, integrations, scheduling, store building, and internal account operations.", artefacts: ["Ecosystem Design", "Modular Architecture"], image: "/P3 - Key Decision 1.png" },
      { title: "Defined Product Priorities Through Research, Strategy, and Collaboration", description: "The product direction was shaped through research into user needs, workflow gaps, competitive patterns, and business objectives. I translated these insights into product structures, user flows, and experience priorities that aligned business goals with operational realities, helping the team move from broad feature ideas to a clear product roadmap. The work also involved close collaboration with stakeholders through workshops, workflow mapping, strategic artifacts, and product discussions. These activities helped align teams around priorities, clarify requirements, and create a shared understanding of how different parts of the ecosystem worked together.", artefacts: ["User Research", "Product Strategy", "Stakeholder Alignment"], image: "/P3 - KD2.png" },
      { title: "Simplified Operational Workflows Across the Platform", description: "A major focus was reducing complexity across admin experiences, scheduling workflows, integrations, and account operations. This included defining and shaping the integrations product as a dedicated area of the platform, giving users a centralized way to connect, manage, and monitor third-party services. The experience was designed to help users complete tasks faster, understand system states more clearly, and manage interconnected workflows without relying on manual coordination or workarounds.", artefacts: ["Admin UX", "In-built Integrations"], image: "/P3 - KD3.png" },
      { title: "Empowered Teams Through Self-Service Storefront Management", description: "The drag-and-drop store builder gave business users greater control over storefront creation and management without heavy technical dependency. This increased flexibility while maintaining consistency with the broader ecosystem and operational standards.", artefacts: ["No-Code Control", "Storefront Management"], image: "/P3 - KD4.png" },
      { title: "Created a Scalable Design System and Delivery Framework", description: "The design delivery focused on reusable UI patterns, consistent interaction models, and clear handoff documentation. This established a scalable foundation that improved development efficiency, reduced inconsistencies, and made future product expansion easier.", artefacts: ["Design System", "Developer Handoff"], image: "/P3 - KD5.png" },
    ],
    impactItems: [
      { title: "Improved user experience and operational efficiency", detail: "The redesigned workflows simplified complex B2B operations, making key tasks easier to understand, manage, and complete while reducing manual effort, fragmented processes, and operational overhead." },
      { title: "Stronger product consistency and delivery execution", detail: "Reusable patterns, unified design decisions, and a structured design system created a more consistent experience across the platform while reducing friction between product, design, and engineering teams." },
      { title: "Enhanced scalability and market adaptability", detail: "The modular ecosystem provided a scalable foundation for growth, enabling the platform to support additional modules, customer segments, business models, and operational requirements over time." },
      { title: "Clearer product strategy and faster execution", detail: "Research-driven product structures, UX frameworks, and reusable artifacts transformed a broad SaaS vision into a focused roadmap, helping teams move more efficiently from strategy to design and development." },
    ],
  },
  {
    id: "case-study-4",
    title: "No-Code Integration Platform for Business Operations",
    category: "No-Code Workflows",
    description: "Designing a simpler way for teams to connect systems, map data, and automate workflows without depending heavily on technical teams.",
    image: "/P4 - Hero.png",
    role: "Head of Product Design",
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
    tagline: "Designing a simpler way for teams to connect systems, map data, and automate workflows without depending heavily on technical teams.",
    heroImage: "/P4 - Hero.png",
    contextImage: "/P4 - Context and Problems.png",
    context: "Business teams were increasingly dependent on connected tools, but the process of integrating systems, transforming data, and maintaining workflows was still too technical, fragmented, and difficult to manage without engineering support. I worked on the UX direction for a no-code integration experience that helped users configure data flows, map fields, build workflow logic, and monitor integration performance through a more accessible product interface. The goal was to make complex integration tasks feel structured, understandable, and usable for non-technical teams while still supporting the flexibility required by more advanced operational workflows.",
    contextPoints: [
      { title: "Integration setup was too technical", description: "Users needed to understand systems, fields, mappings, conditions, and dependencies before they could confidently build or modify workflows." },
      { title: "Data mapping was difficult to understand", description: "Users struggled to see how information moved between systems, where fields transformed, and what would happen when data changed." },
      { title: "Business users depended heavily on support teams", description: "Even simple changes often required technical help, creating delays, repeated support requests, and slower adoption." },
      { title: "Workflow visibility was limited", description: "Users could create or configure flows, but had limited clarity into what was running, what failed, and what needed attention." },
      { title: "The product needed to scale across different use cases", description: "The experience had to support multiple integration needs without becoming too rigid, too technical, or too overwhelming for everyday users." },
    ],
    decisionCategories: ["Guided Workflow Design", "Visual Data Mapping", "Modular Architecture", "Design Validation", "Lifecycle & Visibility"],
    keyDecisions: [
      { title: "Turning complex integrations into a structured no-code experience", description: "Integrations were redesigned as guided workflows with clear steps for setup, testing, and monitoring. Technical complexity was progressively revealed, allowing non-technical users to complete tasks without feeling overwhelmed. The result was a more approachable experience that reduced setup friction and improved user confidence.", artefacts: ["Guided setup", "Workflow clarity", "Non-technical UX"], image: "/P4 - KD1.png" },
      { title: "Making integrations easier to build and understand", description: "A drag-and-drop workflow builder helped users create integrations visually, while a simplified mapping experience made data relationships easier to understand. Together, these tools improved clarity, reduced errors, and helped users identify issues before workflows went live.", artefacts: ["Visual builder", "Data mapping", "Error prevention"], image: "/P4 - KD2 Updated.png" },
      { title: "Creating a scalable foundation for multiple integration scenarios", description: "A modular system of connectors, triggers, actions, and validations created a consistent framework for building integrations across different use cases. This approach improved scalability while keeping the experience cohesive as the platform expanded.", artefacts: ["Modular architecture", "Scalable UX"], image: "/P4 - KD3.png" },
      { title: "Testing concepts before implementation", description: "Concepts were refined through collaborative workshops, prototyping, and user testing to validate workflow logic, terminology, and usability. These iterations helped uncover confusion early and informed improvements before development.", artefacts: ["Iterative testing", "Design validation"], image: "/P4 - KD4.png" },
      { title: "Supporting users beyond initial setup", description: "The platform was designed to support the entire integration lifecycle, from setup and testing to monitoring and maintenance. Operational dashboards provided visibility into workflow health, failures, and activity, helping users resolve issues faster and reduce reliance on support teams.", artefacts: ["Monitoring UX", "Lifecycle UX", "Support reduction"], image: "/P4 - KD5.png" },
    ],
    impactItems: [
      { title: "Faster onboarding and broader adoption", detail: "The guided workflow structure and no-code builder made the platform easier to understand and use, reducing the learning curve for first-time users while increasing confidence and adoption among business teams." },
      { title: "Reduced support dependency and operational friction", detail: "Clearer configuration patterns, validation states, and error visibility helped users resolve common setup issues independently, reducing reliance on support teams and enabling faster workflow management." },
      { title: "Improved operational visibility and efficiency", detail: "Teams could connect tools, automate data movement, and maintain workflows more effectively, while dashboards provided clear visibility into workflow health, failures, activity, and performance." },
      { title: "Scalable foundation for future growth", detail: "The modular product structure created a flexible framework for supporting new connectors, workflows, and integration scenarios, helping the platform scale as business needs evolved." },
    ],
  },
  {
    id: "case-study-5",
    title: "Tailored Storefront Builder for Diverse Business Needs",
    category: "Storefront Builder",
    description: "Creating a flexible storefront builder that helped businesses customize online experiences, launch faster, and manage their websites with less external dependency.",
    image: "https://images.unsplash.com/photo-1752253604157-65fb42c30816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZnV0dXJpc3RpYyUyMGludGVyZmFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzIxMDUxNjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Head of Product Design",
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
    tagline: "Creating a flexible storefront builder that helped businesses customize online experiences, launch faster, and manage their websites with less external dependency.",
    heroImage: "/P5- Hero.png",
    contextImage: "/P5 - Context + Problems.png",
    context: "Businesses using the platform needed more control over how their online storefronts looked, worked, and scaled. The existing setup made customization possible, but it often required technical effort, external support, or repeated coordination with implementation teams. The opportunity was to design a storefront builder that could support different business models, product catalogs, content needs, and brand requirements without forcing every customer into the same rigid website structure. I led the design of a storefront builder that made website creation more modular, accessible, and scalable — helping businesses configure layouts, manage content, customize themes, and launch storefronts faster with greater control.",
    contextPoints: [
      { title: "Limited customization for different business needs", description: "Businesses needed more flexibility to shape storefronts around their industry, catalog structure, brand, and customer experience." },
      { title: "High dependency on external support", description: "Storefront setup and updates often required help from implementation or technical teams, slowing down changes." },
      { title: "Longer time to launch", description: "Without a more structured builder experience, creating and configuring storefronts took more time than expected." },
      { title: "Difficulty scaling storefront variations", description: "As business requirements became more specific, the platform needed a more repeatable way to support different storefront experiences." },
    ],
    decisionCategories: ["Product Architecture", "Customization & Editing", "Templates & Accelerators", "Brand & Experience Control", "Quality & Scalability"],
    keyDecisions: [
      { title: "Making storefront creation more modular and scalable", description: "Storefronts were built around reusable modules, layout sections, and configurable components instead of fixed templates. This gave businesses the flexibility to create tailored experiences without requiring custom design or development for every use case. The modular foundation also made it easier to support business-specific functionality through configurable content, product, and interaction components.", artefacts: ["Modular System", "Scalable Setup"], image: "/P5 - KD1.png" },
      { title: "Giving businesses more control without making the builder complex", description: "The builder simplified customization across layouts, content, styling, and page structure, allowing users to make changes confidently without technical expertise. A drag-and-drop editing experience made storefront creation more intuitive and reduced reliance on implementation teams.", artefacts: ["Self-Serve Editing", "Visual Builder"], image: "/P5 - KD2.png" },
      { title: "Designing a template library to speed up launch", description: "A template library provided ready-made storefront structures, helping businesses get started faster instead of building from scratch. Combined with reusable components and guided customization, templates accelerated launch while preserving flexibility.", artefacts: ["Template Library", "Faster Launch"], image: "/P5 - KD3.png" },
      { title: "Enabling customization while maintaining a strong and consistent brand identity", description: "Businesses could customize colors, typography, and visual styling while maintaining a consistent and usable storefront experience. Responsive tools helped teams preview and optimize layouts across desktop and mobile devices.", artefacts: ["Theme Customization", "Cross-Device Experience"], image: "/P5 - KD4.png" },
      { title: "Building storefronts that were flexible, usable, and production-ready", description: "Accessibility and SEO considerations were built into the experience, helping businesses create storefronts that were easier to use, discover, and launch. These guardrails balanced customization with platform standards and long-term scalability.", artefacts: ["Accessibility Basics", "SEO Readiness"], image: "/P5 - KD5.png" },
    ],
    impactItems: [
      { title: "Faster launches with greater independence", detail: "Businesses launched storefronts faster using templates, reusable components, and guided customization. Non-technical users could manage updates themselves, reducing reliance on implementation and development teams." },
      { title: "Scalable storefront creation", detail: "The modular architecture supported different industries, catalog structures, and business models without requiring custom storefront builds, making creation more repeatable and efficient." },
      { title: "Better storefronts, stronger engagement", detail: "Businesses created more polished, brand-aligned storefronts that showcased products and content more effectively, leading to stronger customer engagement." },
      { title: "Greater flexibility and efficiency", detail: "Teams could update content, test layouts, and manage storefronts with less overhead. The builder transformed a fixed storefront setup into a scalable website creation platform that evolved with customer needs." },
    ],
    reflection: "This project turned storefront creation into a more flexible, self-serve, and scalable experience. The work helped businesses move faster without losing control over quality. By combining templates, modular components, drag-and-drop editing, responsive tools, and theme customization, the storefront builder gave customers a clearer way to create tailored e-commerce experiences without depending on repeated technical support.",
  }
];
