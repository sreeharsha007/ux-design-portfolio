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
}

export const projects: Project[] = [
  {
    id: "ai-assistant",
    title: "AI-Powered Design System",
    category: "AI/ML Product",
    description: "An intelligent design toolchain that uses machine learning to enforce consistency, flag accessibility issues, and generate on-brand component variants — reducing manual review cycles for a fast-moving product team.",
    image: "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMG5ldXJhbCUyMG5ldHdvcmslMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc3MjA2OTExMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    role: "Lead UX Designer",
    timeline: "8 months (2025)",
    industry: "SaaS / Productivity",
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
    ]
  },
  {
    id: "neural-insights",
    title: "AI Analytics Dashboard",
    category: "Data Visualization",
    description: "A real-time analytics platform that translates complex ML model performance data into clear, actionable business insights — designed specifically for non-technical stakeholders who need to make fast decisions.",
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
    ]
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
    ]
  }
];
