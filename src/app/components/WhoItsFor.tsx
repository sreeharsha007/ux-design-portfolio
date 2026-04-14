import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

type CompanyType = "startup" | "growth" | "enterprise";

type ServiceItem = {
  name: string;
  detail: string;
  hero?: boolean;
  metric?: { value: string; label: string };
};

const TIERS: { id: CompanyType; label: string; gradient: string; accent: string }[] = [
  { id: "startup", label: "Startup", gradient: "from-emerald-500 to-green-500", accent: "emerald" },
  { id: "growth", label: "Growth", gradient: "from-blue-500 to-cyan-500", accent: "blue" },
  { id: "enterprise", label: "Enterprise", gradient: "from-violet-500 to-purple-500", accent: "violet" },
];

const CONTENT: Record<
  CompanyType,
  { tagline: string; services: ServiceItem[]; cta: string; accent: string; gradient: string }
> = {
  startup: {
    tagline: "Get investor-ready, user-validated design — without hiring a full team.",
    services: [
      { name: "MVP Screens", detail: "10–15 key flows, fully responsive, dev-annotated", hero: true, metric: { value: "2–3 wks", label: "to ship-ready designs" } },
      { name: "Interactive Prototype", detail: "Investor demos + usability testing ready" },
      { name: "Design System Foundations", detail: "Tokens, core components, your dev team can extend" },
      { name: "UX Research & Personas", detail: "User interviews, synthesis report, persona docs" },
      { name: "Dev-Ready Handoff", detail: "Figma specs with redlines, spacing, and assets" },
    ],
    cta: "Let's get your MVP designed",
    accent: "emerald",
    gradient: "from-emerald-500 to-green-500",
  },
  growth: {
    tagline: "Build the design infrastructure that lets your team ship faster.",
    services: [
      { name: "Design System & Component Library", detail: "Cross-platform, documented, engineer-adopted", hero: true, metric: { value: "50% less", label: "dev build time" } },
      { name: "Multi-Platform Consistency", detail: "Web, iOS, Android — one coherent experience" },
      { name: "Usability Research Rounds", detail: "Moderated testing, synthesis, actionable findings" },
      { name: "Design Tokens & Handoff Pipeline", detail: "Automated, versioned, CI-integrated" },
      { name: "Team Onboarding Docs", detail: "So your internal designers can maintain it" },
    ],
    cta: "Let's scale your product design",
    accent: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  enterprise: {
    tagline: "Design leadership that handles stakeholder complexity and compliance.",
    services: [
      { name: "Enterprise Design System", detail: "Governance model, contribution guidelines, scale", hero: true, metric: { value: "WCAG AA", label: "compliance built in from day one" } },
      { name: "Accessibility Audit & Compliance", detail: "WCAG 2.1 AA/AAA, full remediation report" },
      { name: "Stakeholder Alignment Workshops", detail: "Structured facilitation, documented decisions" },
      { name: "Executive Presentation Decks", detail: "Design rationale your C-suite understands" },
      { name: "Phased Rollout Plan", detail: "Change management, risk mitigation, timeline" },
    ],
    cta: "Let's discuss your programme",
    accent: "violet",
    gradient: "from-violet-500 to-purple-500",
  },
};

const ACCENT_TEXT: Record<string, { dark: string; light: string }> = {
  emerald: { dark: "text-emerald-400", light: "text-emerald-600" },
  blue: { dark: "text-blue-400", light: "text-blue-600" },
  violet: { dark: "text-violet-400", light: "text-violet-600" },
};

const ACCENT_GRADIENT_CSS: Record<string, string> = {
  emerald: "from-emerald-500 to-green-500",
  blue: "from-blue-500 to-cyan-500",
  violet: "from-violet-500 to-purple-500",
};

// ─── Glow Card Wrapper ─────────────────────────────────────────────────────────

function GlowCard({
  children,
  accent,
  isHero,
  isDark,
  className = "",
}: {
  children: React.ReactNode;
  accent: string;
  isHero?: boolean;
  isDark: boolean;
  className?: string;
}) {
  const gradient = ACCENT_GRADIENT_CSS[accent];
  return (
    <div className={`relative group ${className}`}>
      {/* Gradient border — glow for hero, crisp line for non-hero */}
      <div
        className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${gradient} transition-opacity duration-500 ${
          isHero
            ? isDark ? "opacity-20 group-hover:opacity-50" : "opacity-15 group-hover:opacity-40"
            : "opacity-0 group-hover:opacity-40"
        }`}
        style={{ filter: isHero ? "blur(1px)" : "none" }}
      />
      {/* Card body — non-hero dark uses opaque bg so gradient only shows at the 1px edge */}
      <div
        className={`relative rounded-2xl h-full transition-colors duration-300 ${
          isDark
            ? isHero
              ? "bg-[rgba(255,255,255,0.03)] border border-white/10"
              : "bg-[#080808] border border-white/10"
            : "bg-white border border-black/8 shadow-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function WhoItsFor() {
  const [active, setActive] = useState<CompanyType>("startup");
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const content = CONTENT[active];
  const tier = TIERS.find((t) => t.id === active)!;
  const accentText = isDark ? ACCENT_TEXT[content.accent].dark : ACCENT_TEXT[content.accent].light;

  const heroService = content.services[0];
  const standardServices = content.services.slice(1);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className={`text-sm tracking-wide ${isDark ? "text-blue-200/80" : "text-blue-700"}`}>
              What's Included
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl tracking-tighter leading-tight">
            <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
              Services tailored
            </span>
            <br />
            <span className={isDark ? "text-white/60" : "text-gray-400"}>to your stage.</span>
          </h2>
        </motion.div>

        {/* Segmented control */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-start gap-4 mb-16"
        >
          <div
            className={`inline-flex rounded-full p-1 transition-colors duration-300 ${
              isDark ? "bg-white/5 border border-white/10" : "bg-black/5 border border-black/10"
            }`}
          >
            {TIERS.map((t) => {
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="relative px-6 py-2 text-sm rounded-full transition-colors duration-200"
                >
                  {isActive && (
                    <motion.div
                      layoutId="serviceTierPill"
                      className={`absolute inset-0 rounded-full ${isDark ? "bg-white/10" : "bg-black/8"}`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-medium ${
                      isActive
                        ? accentText
                        : isDark
                          ? "text-white/40"
                          : "text-black/40"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tagline */}
          <AnimatePresence mode="wait">
            <motion.p
              key={active + "-tagline"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`text-lg max-w-2xl leading-relaxed ${isDark ? "text-white/45" : "text-gray-500"}`}
            >
              {content.tagline}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Desktop bento layout */}
            <div className="hidden lg:grid gap-4 mb-12" style={{ gridTemplateColumns: "3fr 2fr", gridTemplateRows: "auto auto" }}>
              {/* Hero card — spans 2 rows */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ gridColumn: "1 / 2", gridRow: "1 / 3" }}
              >
                <GlowCard accent={content.accent} isHero isDark={isDark} className="h-full">
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-8 h-full flex flex-col"
                  >
                    {/* Subtle accent overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.gradient} ${isDark ? "opacity-[0.04]" : "opacity-[0.03]"} pointer-events-none`}
                    />
                    <div className="relative flex-1 flex flex-col">
                      <span className={`text-5xl font-light ${accentText} opacity-20 mb-4`}>01</span>
                      <h3 className={`text-2xl font-semibold tracking-tight mb-3 ${isDark ? "" : "text-gray-900"}`}>
                        {heroService.name}
                      </h3>
                      <p className={`text-base leading-relaxed mb-auto ${isDark ? "text-white/55" : "text-gray-500"}`}>
                        {heroService.detail}
                      </p>
                      {heroService.metric && (
                        <div
                          className={`mt-6 inline-flex items-baseline gap-3 px-5 py-3 rounded-xl w-fit ${
                            isDark
                              ? "bg-white/5 border border-white/10"
                              : "bg-gray-50 border border-gray-200/60"
                          }`}
                        >
                          <span className={`text-2xl font-light tracking-tight ${accentText}`}>
                            {heroService.metric.value}
                          </span>
                          <span className={`text-sm ${isDark ? "text-white/45" : "text-gray-500"}`}>
                            {heroService.metric.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </GlowCard>
              </motion.div>

              {/* Standard cards 2 & 3 — stacked on right */}
              {standardServices.slice(0, 2).map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i + 1) * 0.07 }}
                  style={{ gridColumn: "2 / 3", gridRow: `${i + 1} / ${i + 2}` }}
                >
                  <GlowCard accent={content.accent} isDark={isDark} className="h-full">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 h-full"
                    >
                      <span className={`text-3xl font-light ${accentText} opacity-20`}>
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <h4 className={`text-lg font-medium tracking-tight mt-2 mb-2 ${isDark ? "" : "text-gray-900"}`}>
                        {s.name}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        {s.detail}
                      </p>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              ))}

              {/* Standard cards 4 & 5 — bottom row */}
              {standardServices.slice(2).map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i + 3) * 0.07 }}
                >
                  <GlowCard accent={content.accent} isDark={isDark}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="p-6"
                    >
                      <span className={`text-3xl font-light ${accentText} opacity-20`}>
                        {String(i + 4).padStart(2, "0")}
                      </span>
                      <h4 className={`text-lg font-medium tracking-tight mt-2 mb-2 ${isDark ? "" : "text-gray-900"}`}>
                        {s.name}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>
                        {s.detail}
                      </p>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Tablet layout: 2 columns */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-4 mb-12">
              {/* Hero spans full width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="col-span-2"
              >
                <GlowCard accent={content.accent} isHero isDark={isDark}>
                  <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="p-8">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.gradient} ${isDark ? "opacity-[0.04]" : "opacity-[0.03]"} pointer-events-none`} />
                    <div className="relative">
                      <span className={`text-5xl font-light ${accentText} opacity-20 mb-4 block`}>01</span>
                      <h3 className={`text-2xl font-semibold tracking-tight mb-3 ${isDark ? "" : "text-gray-900"}`}>
                        {heroService.name}
                      </h3>
                      <p className={`text-base leading-relaxed mb-4 ${isDark ? "text-white/55" : "text-gray-500"}`}>
                        {heroService.detail}
                      </p>
                      {heroService.metric && (
                        <div className={`inline-flex items-baseline gap-3 px-5 py-3 rounded-xl ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200/60"}`}>
                          <span className={`text-2xl font-light tracking-tight ${accentText}`}>{heroService.metric.value}</span>
                          <span className={`text-sm ${isDark ? "text-white/45" : "text-gray-500"}`}>{heroService.metric.label}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </GlowCard>
              </motion.div>
              {standardServices.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i + 1) * 0.07 }}
                >
                  <GlowCard accent={content.accent} isDark={isDark} className="h-full">
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="p-6 h-full">
                      <span className={`text-3xl font-light ${accentText} opacity-20`}>{String(i + 2).padStart(2, "0")}</span>
                      <h4 className={`text-lg font-medium tracking-tight mt-2 mb-2 ${isDark ? "" : "text-gray-900"}`}>{s.name}</h4>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>{s.detail}</p>
                    </motion.div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* Mobile layout: single column */}
            <div className="grid md:hidden grid-cols-1 gap-4 mb-12">
              {content.services.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <GlowCard accent={content.accent} isHero={s.hero} isDark={isDark}>
                    <div className="p-6">
                      <span className={`text-3xl font-light ${accentText} opacity-20`}>{String(i + 1).padStart(2, "0")}</span>
                      <h4 className={`text-lg font-medium tracking-tight mt-2 mb-2 ${isDark ? "" : "text-gray-900"}`}>{s.name}</h4>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/50" : "text-gray-500"}`}>{s.detail}</p>
                      {s.hero && s.metric && (
                        <div className={`mt-4 inline-flex items-baseline gap-3 px-4 py-2 rounded-xl ${isDark ? "bg-white/5 border border-white/10" : "bg-gray-50 border border-gray-200/60"}`}>
                          <span className={`text-xl font-light tracking-tight ${accentText}`}>{s.metric.value}</span>
                          <span className={`text-sm ${isDark ? "text-white/45" : "text-gray-500"}`}>{s.metric.label}</span>
                        </div>
                      )}
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${tier.gradient} rounded-full text-sm hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] transition-all duration-300 group`}
              style={{ color: "#ffffff" }}
            >
              {content.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
