import { motion } from "motion/react";
import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, ExternalLink, CheckCircle2, Sparkles, Calendar, User, Building2, Zap, Package, ChevronRight, Clock } from "lucide-react";
import { projects } from "../data/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/** Extracts a leading metric string like "40%" or "3x" from an outcome sentence */
function extractMetric(outcome: string): { metric: string; rest: string } | null {
  const match = outcome.match(/^(\d+(?:\.\d+)?(?:%|x|\+)?)\s+(.+)/i);
  if (match) return { metric: match[1], rest: match[2] };
  return null;
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-20 bg-black text-white overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-full text-white/80 hover:text-white hover:bg-blue-500/10 hover:border-blue-500/30 transition-all mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>

            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-full text-sm text-blue-300">
                <Sparkles className="w-4 h-4" />
                {project.category}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm text-white/70">
                <Building2 className="w-4 h-4" />
                {project.industry}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Project Info Bar ─────────────────────────────── */}
      <section className="sticky top-20 z-40 border-y border-blue-500/20 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-blue-300/60 mb-0.5">Role</div>
                <div className="text-sm text-white">{project.role}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-cyan-300/60 mb-0.5">Timeline</div>
                <div className="text-sm text-white">{project.timeline}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-violet-300/60 mb-0.5">Industry</div>
                <div className="text-sm text-white">{project.industry}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-2 md:col-span-1">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-emerald-300/60 mb-0.5">Client Type</div>
                <div className="text-sm text-white">{project.clientSize}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-2 md:col-span-1">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs text-indigo-300/60 mb-0.5">Tools</div>
                <div className="text-sm text-white">
                  {project.technologies.slice(0, 2).join(", ")}
                  {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hero Image ───────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-blue-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-2xl" />
            <ImageWithFallback src={project.image} alt={project.title} className="w-full h-auto relative" />
          </motion.div>
        </div>
      </section>

      {/* ── AI Workflow Breakdown ─────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/15 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 backdrop-blur-xl border border-violet-500/30 rounded-full text-sm text-violet-300">
                <Zap className="w-4 h-4" />
                AI Workflow
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 tracking-tight">Where AI Made the Difference</h2>
            <p className="text-lg text-white/50 mb-12 max-w-2xl">
              Here's exactly how AI tools were used throughout this project — and what that meant for timeline and output quality.
            </p>

            <div className="space-y-4">
              {project.aiWorkflow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-transparent rounded-2xl blur-xl group-hover:from-violet-600/10 transition-all duration-500" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl group-hover:border-violet-500/30 transition-all">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-medium text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white/90 font-medium">{step.phase}</div>
                      </div>
                    </div>
                    <div className="sm:w-48 flex-shrink-0">
                      <span className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-200/80">
                        {step.tool}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      {step.impact}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process Timeline ─────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/30 rounded-full text-sm text-indigo-300 mb-8">
              <Clock className="w-4 h-4" />
              Project Timeline
            </div>
            <h2 className="text-4xl md:text-5xl mb-12 tracking-tight">How the Project Ran</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.processTimeline.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {index < project.processTimeline.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-4 h-px bg-gradient-to-r from-blue-500/40 to-transparent z-10" />
                  )}
                  <div className="p-6 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                      <span className="text-xs text-white/30">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                    <h4 className="text-white font-medium mb-1">{step.phase}</h4>
                    <div className="text-xs text-blue-300/60 mb-3 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-full text-sm text-red-300 mb-8">
              The Challenge
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">Problem Statement</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              {project.problem}
            </p>
            {/* Pull-quote highlight */}
            <div className="border-l-2 border-red-500/40 pl-6">
              <p className="text-lg text-red-200/60 italic leading-relaxed">
                "{project.problem.split(". ")[0]}."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 rounded-full text-sm text-emerald-300 mb-8">
              The Approach
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight">Design Solution</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              {project.solution}
            </p>
            {/* Key insight callout */}
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <div className="text-xs text-emerald-300/60 uppercase tracking-wide mb-2">Key Design Principle</div>
              <p className="text-emerald-200/80 leading-relaxed">
                {project.solution.split(". ").slice(-2).join(". ")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Outcomes ─────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full text-sm text-emerald-200/80 mb-8">
                Impact & Results
              </div>
              <h2 className="text-4xl md:text-6xl tracking-tight">
                <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
                  Measurable Impact
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.outcomes.map((outcome, index) => {
                const parsed = extractMetric(outcome);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl group-hover:border-blue-500/30 transition-all h-full">
                      {parsed ? (
                        <div>
                          <div className="text-6xl md:text-7xl font-light tracking-tighter bg-gradient-to-br from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                            {parsed.metric}
                          </div>
                          <p className="text-lg text-white/70 leading-relaxed capitalize">{parsed.rest}</p>
                        </div>
                      ) : (
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-lg text-white/80 leading-relaxed">{outcome}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-full text-sm text-blue-300 mb-8">
              <Package className="w-4 h-4" />
              What Was Delivered
            </div>
            <h2 className="text-4xl md:text-5xl mb-8 tracking-tight">Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((deliverable, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-xl hover:border-blue-500/30 transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{deliverable}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Technologies ─────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl mb-8 tracking-tight">Technologies & Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/20 text-white rounded-full text-sm cursor-default hover:border-blue-500/30 transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── More Projects ─────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl mb-12 tracking-tight text-center">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter((p) => p.id !== project.id)
                .slice(0, 3)
                .map((nextProject, index) => (
                  <motion.div
                    key={nextProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <Link to={`/project/${nextProject.id}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-white/5 border border-blue-500/20 group-hover:border-blue-500/30 transition-all">
                        <ImageWithFallback
                          src={nextProject.image}
                          alt={nextProject.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 rounded-full flex items-center justify-center">
                            <ArrowLeft className="w-6 h-6 text-white rotate-180" />
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-blue-300/60 mb-1">{nextProject.industry}</div>
                      <div className="text-sm text-white/40 mb-2">{nextProject.category}</div>
                      <h3 className="text-xl tracking-tight text-white/90 group-hover:text-white transition-colors">
                        {nextProject.title}
                      </h3>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                Need Similar Results?
              </span>
            </h2>
            <p className="text-xl text-white/60 mb-8 leading-relaxed max-w-2xl mx-auto">
              Let's start with a free 30-min discovery call. I'll tell you honestly whether I'm the right fit — and what a realistic timeline and scope looks like for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@example.com"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden"
              >
                <span className="relative z-10">Book a Discovery Call</span>
                <ExternalLink className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              </a>
              <Link
                to="/"
                className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 inline-flex items-center justify-center"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
