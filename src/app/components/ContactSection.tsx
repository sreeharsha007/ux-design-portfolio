import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send, Calendar, X, ChevronLeft, ChevronRight,
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
    ? firstDay.toLocaleString("default", { month: "long", year: "numeric" })
    : `${firstDay.toLocaleString("default", { month: "short" })} – ${lastDay.toLocaleString("default", { month: "short", year: "numeric" })}`;

  return (
    <div className="rounded-xl p-3" style={{ background: "#faf9f8", border: "1px solid #e7e5e4" }}>

      {/* Navigation row */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onWeekChange(jumpToMonth(weekStart, -1))}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
          >
            <ChevronLeft className="w-3 h-3" />{prevMonthLabel}
          </button>
          <button
            type="button"
            onClick={() => onWeekChange(addDays(weekStart, -7))}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>

        <span className="text-[12px] font-semibold text-stone-600">{weekLabel}</span>

        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onWeekChange(addDays(weekStart, 7))}
            className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
          </button>
          <button
            type="button"
            onClick={() => onWeekChange(jumpToMonth(weekStart, 1))}
            className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[11px] font-semibold text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all"
          >
            {nextMonthLabel}<ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-stone-400 pb-1">{d}</div>
        ))}
      </div>

      {/* Day cells — single row */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map(day => {
          const key       = dateKey(day);
          const available = availDates.has(key) && day >= today;
          const picked    = selectedDate === key;
          const isToday   = key === todayKey;

          return (
            <button
              key={key}
              type="button"
              disabled={!available}
              onClick={() => onDateSelect(picked ? null : key)}
              className="aspect-square flex items-center justify-center rounded-xl text-[13px] font-medium transition-all duration-150"
              style={{
                background: picked ? "var(--terra-500)" : "transparent",
                border: isToday && !picked ? "1px solid #d4ccc8" : "1px solid transparent",
                color: picked ? "#ffffff" : available ? "#1c1917" : "#d4ccc8",
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
  onClear,
}: {
  slot: Slot;
  selected: boolean;
  onClick: () => void;
  onClear?: () => void;
}) {
  if (selected) {
    // Selected: non-interactive pill with X inside
    return (
      <div
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold"
        style={{
          background: "var(--terra-500)",
          border: "1px solid var(--terra-500)",
          color: "#ffffff",
          boxShadow: "0 2px 8px rgba(217,119,6,0.25)",
        }}
      >
        <Clock className="w-3 h-3 flex-shrink-0" />
        <span>{slot.label}</span>
        <span style={{ opacity: 0.75 }}>·</span>
        <span>{slot.time}</span>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            title="Clear selection"
            className="ml-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors hover:bg-white/25"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        )}
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

            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-9"
              style={{ background: "var(--terra-light)", border: "1px solid var(--terra-border)" }}
            >
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--terra-500)" }} />
              <span className="text-[12px] font-semibold" style={{ color: "var(--terra-500)" }}>
                Available for New Projects
              </span>
            </div>

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
                          style={{ background: scheduleOn ? "var(--terra-500)" : "#d4ccc8" }}
                        >
                          <span
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 block"
                            style={{ transform: scheduleOn ? "translateX(20px)" : "translateX(2px)" }}
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
                            className="mt-3"
                          >
                            <SlotChip
                              slot={selectedSlot}
                              selected
                              onClick={() => {}}
                              onClear={() => { setSelectedSlot(null); }}
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedSlot(null)}
                              className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-70"
                              style={{ color: "var(--terra-500)" }}
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                              Choose a different time
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
                                        background: amPm === period ? "var(--terra-500)" : "transparent",
                                        border: `1px solid ${amPm === period ? "var(--terra-500)" : "#e7e5e4"}`,
                                        color: amPm === period ? "#ffffff" : "#78716c",
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

          {/* ── Email fallback ─────────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="text-center text-[13px] text-stone-400 mb-14"
          >
            Or reach me directly at{" "}
            <a
              href="mailto:sreeharsha@alvyl.com"
              className="font-medium transition-colors duration-200 hover:text-stone-600"
              style={{ color: "var(--terra-500)" }}
            >
              sreeharsha@alvyl.com
            </a>
          </motion.p>


        </motion.div>
      </div>
    </section>
  );
}
