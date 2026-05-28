import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send, Calendar, ChevronLeft, ChevronRight,
  MessageSquare, Video, FileText, CheckCircle2, Clock, Sun, Moon,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slot {
  id: string;
  label: string;       // e.g. "Thu 29 May"
  time: string;        // e.g. "10:00 AM"
  iso: string;         // ISO 8601 start time
  endIso: string;      // ISO 8601 end time
}

type SubmitState = "idle" | "submitting" | "success";

// ─── Fallback mock slots (used when /api/slots is unavailable locally) ────────

function buildMockSlots(): Slot[] {
  const base = new Date();
  base.setDate(base.getDate() + 1);
  base.setHours(10, 0, 0, 0);
  return [0, 4, 24, 28].map((h, i) => {
    const start = new Date(base.getTime() + h * 3600_000);
    const end   = new Date(start.getTime() + 30 * 60_000);
    return {
      id:     String(i),
      label:  start.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
      time:   start.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      iso:    start.toISOString(),
      endIso: end.toISOString(),
    };
  });
}

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon: MessageSquare,
    title: "Send a message",
    description: "Tell me about your project — what you're building, your timeline, and what help you need.",
  },
  {
    icon: Video,
    title: "30-min discovery call",
    description: "We'll discuss your goals, constraints, and whether my approach is the right fit.",
  },
  {
    icon: FileText,
    title: "Proposal in 48 hours",
    description: "A clear scope, timeline, and pricing proposal. No vague estimates, no surprise fees.",
  },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const fieldStyle: React.CSSProperties = {
  background: "#faf9f8",
  border: "1px solid #e7e5e4",
  borderRadius: "10px",
  padding: "11px 14px",
  width: "100%",
  fontSize: "14px",
  color: "#1c1917",
  outline: "none",
  transition: "border-color 0.15s ease",
};

const focusField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "var(--terra-500)");
const blurField = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = "#e7e5e4");

// ─── Date helpers ────────────────────────────────────────────────────────────

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function getMondayOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  d.setDate(d.getDate() + (dow === 0 ? -6 : 1 - dow));
  return d;
}
function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function jumpToMonth(from: Date, dir: -1 | 1): Date {
  const d = new Date(from);
  d.setDate(1);
  d.setMonth(d.getMonth() + dir);
  return getMondayOfWeek(d);
}

// ─── Week picker ──────────────────────────────────────────────────────────────

function WeekPicker({
  weekStart,
  selectedDate,
  availDates,
  onDateSelect,
  onWeekChange,
}: {
  weekStart: Date;
  selectedDate: string | null;
  availDates: Set<string>;
  onDateSelect: (key: string | null) => void;
  onWeekChange: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const firstDay = days[0];
  const lastDay  = days[6];
  const todayKey = dateKey(today);

  const prevMonthLabel = new Date(firstDay.getFullYear(), firstDay.getMonth() - 1, 1)
    .toLocaleString("default", { month: "short" });
  const nextMonthLabel = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 1)
    .toLocaleString("default", { month: "short" });
  const weekLabel = firstDay.getMonth() === lastDay.getMonth()
    ? `${firstDay.toLocaleString("default", { month: "short" })} ${firstDay.getDate()}–${lastDay.getDate()}, ${lastDay.getFullYear()}`
    : `${firstDay.toLocaleString("default", { month: "short" })} ${firstDay.getDate()} – ${lastDay.toLocaleString("default", { month: "short" })} ${lastDay.getDate()}, ${lastDay.getFullYear()}`;

  return (
    <div className="rounded-xl p-3" style={{ background: "#faf9f8", border: "1px solid #e7e5e4" }}>

      {/* Navigation row */}
      <div className="flex items-center justify-center sm:justify-between mb-2.5">

        {/* Month-jump back — desktop only */}
        <button
          type="button"
          onClick={() => onWeekChange(jumpToMonth(weekStart, -1))}
          className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
        >
          <ChevronLeft className="w-3 h-3" />{prevMonthLabel}
        </button>

        {/* Centre: ‹week  label  week› */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onWeekChange(addDays(weekStart, -7))}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
          </button>
          <span className="text-[12px] font-semibold text-stone-600 px-1 tabular-nums whitespace-nowrap">
            {weekLabel}
          </span>
          <button
            type="button"
            onClick={() => onWeekChange(addDays(weekStart, 7))}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>

        {/* Month-jump forward — desktop only */}
        <button
          type="button"
          onClick={() => onWeekChange(jumpToMonth(weekStart, 1))}
          className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
        >
          {nextMonthLabel}<ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-stone-400 pb-1">{d}</div>
        ))}
      </div>

      {/* Day cells — single row */}
      <div className="grid grid-cols-7">
        {days.map(day => {
          const key       = dateKey(day);
          const available = availDates.has(key) && day >= today;
          const picked    = selectedDate === key;
          const isToday   = key === todayKey;

          return (
            <div key={key} className="flex items-center justify-center py-0.5">
              <button
                type="button"
                disabled={!available}
                onClick={() => onDateSelect(picked ? null : key)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-all duration-150"
                style={{
                  background: picked ? "var(--terra-light)" : "transparent",
                  border: picked
                    ? "1px solid var(--terra-border)"
                    : isToday
                    ? "1px solid #d4ccc8"
                    : "1px solid transparent",
                  color: picked ? "var(--terra-600)" : available ? "#1c1917" : "#d4ccc8",
                  cursor: available ? "pointer" : "default",
                }}
                onMouseEnter={e => {
                  if (available && !picked)
                    (e.currentTarget as HTMLElement).style.background = "var(--terra-light)";
                }}
                onMouseLeave={e => {
                  if (!picked)
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Slot chip ────────────────────────────────────────────────────────────────

function SlotChip({
  slot,
  selected,
  onClick,
}: {
  slot: Slot;
  selected: boolean;
  onClick: () => void;
}) {
  if (selected) {
    // Selected: subtle pill — no clear button, Edit sits alongside in the parent
    return (
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold"
        style={{
          background: "var(--terra-light)",
          border: "1px solid var(--terra-border)",
          color: "var(--terra-600)",
        }}
      >
        <Clock className="w-3 h-3 flex-shrink-0" style={{ color: "var(--terra-500)" }} />
        <span>{slot.label}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>{slot.time}</span>
      </div>
    );
  }

  // Unselected: plain clickable button
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 hover:border-stone-300"
      style={{
        background: "#ffffff",
        border: "1px solid #e7e5e4",
        color: "#44403c",
      }}
    >
      <Clock className="w-3 h-3 flex-shrink-0" />
      <span>{slot.label}</span>
      <span style={{ opacity: 0.45 }}>·</span>
      <span>{slot.time}</span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [slots,         setSlots]         = useState<Slot[]>(buildMockSlots);
  const [slotsLoading,  setSlotsLoading]  = useState(true);
  const [selectedSlot,  setSelectedSlot]  = useState<Slot | null>(null);
  const [scheduleOn,    setScheduleOn]    = useState(false);
  const [amPm,          setAmPm]          = useState<"AM" | "PM">("AM");
  const [selectedDate,  setSelectedDate]  = useState<string | null>(null);
  const [weekStart,     setWeekStart]     = useState<Date>(() => getMondayOfWeek(new Date()));
  const [submitState,   setSubmitState]   = useState<SubmitState>("idle");
  const [submitError,   setSubmitError]   = useState<string | null>(null);

  // Dates that have at least one available slot — drives WeekPicker highlighting
  const availDates = new Set(slots.map(s => dateKey(new Date(s.iso))));

  // If a date is selected show that day's slots, otherwise show all (suggested)
  const slotsForView = selectedDate
    ? slots.filter(s => dateKey(new Date(s.iso)) === selectedDate)
    : slots;

  // Filtered by AM/PM, capped at 20
  const filteredViewSlots = slotsForView
    .filter(s => amPm === "AM" ? s.time.includes("AM") : s.time.includes("PM"))
    .slice(0, 20);

  // Readable label for the selected date, e.g. "Thu 29 May"
  const selectedDateLabel = selectedDate
    ? (() => {
        const [y, m, d] = selectedDate.split("-").map(Number);
        return new Date(y, m, d).toLocaleDateString("en-GB", {
          weekday: "short", day: "numeric", month: "short",
        });
      })()
    : null;

  // Fetch real slots from /api/slots on mount; fall back to mock if unavailable
  useEffect(() => {
    fetch("/api/slots")
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        if (data.slots?.length) {
          setSlots(data.slots);
        } else {
          setSlots(buildMockSlots());
        }
      })
      .catch(() => {
        // /api/slots not available locally — keep mock slots, no pre-selection
        setSlots(buildMockSlots());
      })
      .finally(() => setSlotsLoading(false));
  }, []);

  // Clear any submit error as soon as the user edits the form
  useEffect(() => { setSubmitError(null); }, [form]);

  const selectSlot = useCallback((slot: Slot) => {
    setSelectedSlot(slot);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setSubmitError(null);
    try {
      if (scheduleOn && selectedSlot) {
        // Book the Google Calendar event
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name:    form.name,
            email:   form.email,
            message: form.message,
            slotIso: selectedSlot.iso,
            endIso:  selectedSlot.endIso,
          }),
        });
        if (!res.ok) {
          // Capture Google's error detail so it's visible in the UI for debugging
          const body = await res.json().catch(() => ({}));
          throw new Error(body.detail ?? body.error ?? "Booking failed");
        }
      }
      setSubmitState("success");
    } catch (err: unknown) {
      setSubmitState("idle");
      const msg = err instanceof Error ? err.message : "Unknown error";
      setSubmitError(`Booking failed: ${msg}`);
    }
  };

  const hasSlot = scheduleOn && selectedSlot !== null;

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.07) 0%, transparent 55%), #f5f5f4",
        borderTop: "1px solid #e7e5e4",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-[620px] mx-auto"
        >

          {/* ── Header ────────────────────────────────────────────────────── */}
          <div className="text-center mb-10">
            <p
              className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-6"
              style={{ color: "var(--terra-500)" }}
            >
              Contact
            </p>

            <h2
              className="font-bold tracking-tight leading-tight mb-5"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                fontFamily: "var(--font-display)",
                color: "#1c1917",
              }}
            >
              Let's build<br />
              <span style={{ color: "#8c8680" }}>something great.</span>
            </h2>

            <p className="text-[17px] leading-relaxed max-w-lg mx-auto text-stone-500">
              Have a product to design, a system to fix, or a team to support?
              Tell me what you're working on.
            </p>
          </div>

          {/* ── Process strip ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mb-8"
          >
            {PROCESS_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex items-center gap-1.5">
                  <step.icon
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: "var(--terra-500)", opacity: 0.85 }}
                  />
                  <span className="text-[13px] font-medium" style={{ color: "#57534e" }}>
                    {step.title}
                  </span>
                </div>
                {i < PROCESS_STEPS.length - 1 && (
                  <span className="text-[10px] select-none" style={{ color: "#d4ccc8" }}>·</span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* ── Form card ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              background: "#ffffff",
              border: "1px solid #e7e5e4",
              boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
            }}
          >
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {submitState === "success" ? (

                  /* ── Success state ──────────────────────────────────────── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease }}
                    className="py-14 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4, ease }}
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "var(--terra-light)", border: "1px solid var(--terra-border)" }}
                    >
                      <CheckCircle2 className="w-6 h-6" style={{ color: "var(--terra-500)" }} />
                    </motion.div>
                    <h3
                      className="text-[20px] font-bold text-stone-900 mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {hasSlot ? "Message sent & call booked!" : "Message sent!"}
                    </h3>
                    <p className="text-[14px] text-stone-500 mb-1">
                      {hasSlot
                        ? `You'll receive a calendar invite for ${selectedSlot!.label} at ${selectedSlot!.time}.`
                        : "I'll get back to you within 24 hours."}
                    </p>
                    {hasSlot && (
                      <p className="text-[13px] text-stone-400">
                        Check your inbox for confirmation details.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitState("idle");
                        setForm({ name: "", email: "", message: "" });
                        setSelectedSlot(null);
                        setSelectedDate(null);
                        setScheduleOn(false);
                      }}
                      className="mt-6 text-[13px] font-medium transition-opacity hover:opacity-60"
                      style={{ color: "var(--terra-500)" }}
                    >
                      Send another message
                    </button>
                  </motion.div>

                ) : (

                  /* ── Form ───────────────────────────────────────────────── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: "#78716c" }}>
                          Name
                        </label>
                        <input
                          type="text" required placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          style={fieldStyle} onFocus={focusField} onBlur={blurField}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: "#78716c" }}>
                          Email
                        </label>
                        <input
                          type="email" required placeholder="your@email.com"
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                          style={fieldStyle} onFocus={focusField} onBlur={blurField}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-2" style={{ color: "#78716c" }}>
                        What are you working on?
                      </label>
                      <textarea
                        required rows={4}
                        placeholder="Tell me about your project — what you're building, your timeline, and what kind of help you're looking for."
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        className="resize-none"
                        style={fieldStyle} onFocus={focusField} onBlur={blurField}
                      />
                    </div>

                    {/* ── Schedule a call row ──────────────────────────── */}
                    <div
                      className="rounded-xl p-4"
                      style={{ background: "#faf9f8", border: "1px solid #f0ede9" }}
                    >
                      {/* Row header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--terra-500)" }} />
                          <span className="text-[12px] font-semibold" style={{ color: "#44403c" }}>
                            Schedule a call
                          </span>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: "var(--terra-light)", color: "var(--terra-600)", border: "1px solid var(--terra-border)" }}
                          >
                            Optional
                          </span>
                        </div>

                        {/* Pill toggle */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={scheduleOn}
                          onClick={() => {
                            const next = !scheduleOn;
                            setScheduleOn(next);
                            if (!next) { setSelectedSlot(null); setSelectedDate(null); }
                          }}
                          className="relative flex-shrink-0 w-9 h-5 rounded-full transition-colors duration-200"
                          style={{ background: scheduleOn ? "rgba(217,119,6,0.14)" : "#e2ddd9" }}
                        >
                          <span
                            className="absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-all duration-200 block"
                            style={{
                              background: scheduleOn ? "var(--terra-500)" : "#ffffff",
                              transform: scheduleOn ? "translateX(18px)" : "translateX(2px)",
                            }}
                          />
                        </button>
                      </div>

                      <AnimatePresence mode="wait">

                        {/* ── SELECTED: collapsed pill ────────────────────── */}
                        {scheduleOn && selectedSlot ? (
                          <motion.div
                            key="selected"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease }}
                            className="mt-3 flex items-center gap-2.5"
                          >
                            <SlotChip
                              slot={selectedSlot}
                              selected
                              onClick={() => {}}
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedSlot(null)}
                              className="text-[12px] font-semibold transition-opacity hover:opacity-60 flex-shrink-0"
                              style={{ color: "var(--terra-500)" }}
                            >
                              Edit
                            </button>
                          </motion.div>

                        /* ── PICKER: week + slots (default when on) ─────── */
                        ) : scheduleOn ? (
                          <motion.div
                            key="picker"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease }}
                            className="mt-3 space-y-3"
                          >
                            {/* Week date picker */}
                            <WeekPicker
                              weekStart={weekStart}
                              selectedDate={selectedDate}
                              availDates={availDates}
                              onDateSelect={setSelectedDate}
                              onWeekChange={setWeekStart}
                            />

                            {/* Slots section */}
                            <div>
                              {/* Row 1: heading left, AM/PM right */}
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
                                  {selectedDate ? `Available · ${selectedDateLabel}` : "Suggested times"}
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {(["AM", "PM"] as const).map(period => (
                                    <button
                                      key={period}
                                      type="button"
                                      onClick={() => setAmPm(period)}
                                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all duration-150"
                                      style={{
                                        background: amPm === period ? "var(--terra-light)" : "transparent",
                                        border: `1px solid ${amPm === period ? "var(--terra-border)" : "#e7e5e4"}`,
                                        color: amPm === period ? "var(--terra-600)" : "#78716c",
                                      }}
                                    >
                                      {period === "AM" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                                      {period}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Row 2: chips */}
                              <div className="flex flex-wrap gap-2">
                                {slotsLoading
                                  ? Array.from({ length: 3 }).map((_, i) => (
                                      <div key={i} className="h-8 rounded-xl animate-pulse" style={{ width: 140, background: "#f0ede9" }} />
                                    ))
                                  : filteredViewSlots.length > 0
                                    ? filteredViewSlots.map(slot => (
                                        <SlotChip
                                          key={slot.id}
                                          slot={slot}
                                          selected={false}
                                          onClick={() => selectSlot(slot)}
                                        />
                                      ))
                                    : (
                                      <p className="text-[12px] text-stone-400 py-1">
                                        No {amPm} slots {selectedDate ? "on this day" : "available right now"}.
                                      </p>
                                    )
                                }
                              </div>

                              <p className="text-[11px] text-stone-400 mt-2">All times in IST (UTC+5:30)</p>
                            </div>
                          </motion.div>

                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* Inline error */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-[13px] text-center px-2 py-1 rounded-lg"
                          style={{ color: "#b91c1c", background: "rgba(185,28,28,0.06)" }}
                        >
                          {submitError}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitState === "submitting"}
                      whileHover={submitState !== "submitting" ? { y: -1 } : {}}
                      whileTap={submitState !== "submitting" ? { scale: 0.98 } : {}}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-200"
                      style={{
                        background: submitState === "submitting" ? "var(--terra-400)" : "var(--terra-600)",
                        color: "#ffffff",
                        cursor: submitState === "submitting" ? "default" : "pointer",
                      }}
                    >
                      {submitState === "submitting" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                          />
                          {hasSlot ? "Booking your call…" : "Sending…"}
                        </>
                      ) : hasSlot ? (
                        <>
                          <Calendar className="w-4 h-4" />
                          Send Message &amp; Book Call
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Direct contact options ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-14"
          >
            {/* Email */}
            <a
              href="mailto:hpolepeddi@gmail.com"
              className="flex items-center gap-2 text-[13px] font-medium transition-colors duration-200 hover:text-stone-600"
              style={{ color: "var(--terra-500)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              hpolepeddi@gmail.com
            </a>

            {/* Separator */}
            <span className="hidden sm:block mx-5 text-stone-300 select-none text-[16px]">|</span>
            <span className="sm:hidden w-px h-4 bg-stone-200" />

            {/* WhatsApp */}
            <a
              href="https://wa.me/919701849481"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] font-medium text-stone-500 transition-colors duration-200 hover:text-stone-700"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, color: "#25d366" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
}
