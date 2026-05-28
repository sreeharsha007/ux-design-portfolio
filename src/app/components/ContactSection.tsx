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

// ─── Mini inline calendar ─────────────────────────────────────────────────────

function InlineCalendar({
  availableSlots,
  onSelect,
  onClose,
  amPm,
  onAmPmChange,
}: {
  availableSlots: Slot[];
  onSelect: (slot: Slot) => void;
  onClose: () => void;
  amPm: "AM" | "PM";
  onAmPmChange: (p: "AM" | "PM") => void;
}) {
  const today = new Date();
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [pickedDate, setPickedDate] = useState<string | null>(null);

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const blanks = (firstDay + 6) % 7; // Mon-start offset

  // Available dates for this view
  const availDates = new Set(
    availableSlots.map(s => {
      const d = new Date(s.iso);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })
  );

  const isAvailable = (day: number) =>
    availDates.has(`${viewYear}-${viewMonth}-${day}`);

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(23, 59, 59);
    return d < today;
  };

  const slotsForDate = pickedDate
    ? availableSlots.filter(s => {
        const d = new Date(s.iso);
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}` === pickedDate;
      })
    : [];

  // Filter by the shared AM/PM state
  const filteredTimes = slotsForDate.filter(s =>
    amPm === "AM" ? s.time.includes("AM") : s.time.includes("PM")
  );

  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long", year: "numeric",
  });

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setPickedDate(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setPickedDate(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease }}
      style={{ overflow: "hidden" }}
    >
      <div
        className="mt-3 rounded-xl p-4"
        style={{ background: "#faf9f8", border: "1px solid #e7e5e4" }}
      >
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-stone-100"
          >
            <ChevronLeft className="w-4 h-4 text-stone-500" />
          </button>
          <span className="text-[13px] font-semibold text-stone-700">{monthName}</span>
          <button
            type="button"
            onClick={nextMonth}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-stone-100"
          >
            <ChevronRight className="w-4 h-4 text-stone-500" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-stone-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 gap-y-0.5">
          {Array.from({ length: blanks }).map((_, i) => <div key={`b${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const key = `${viewYear}-${viewMonth}-${day}`;
            const available = isAvailable(day) && !isPast(day);
            const picked = pickedDate === key;

            return (
              <button
                key={day}
                type="button"
                disabled={!available}
                onClick={() => setPickedDate(picked ? null : key)}
                className="aspect-square flex items-center justify-center rounded-lg text-[12px] font-medium transition-all duration-150"
                style={{
                  color: available ? (picked ? "#ffffff" : "#1c1917") : "#d4ccc8",
                  background: picked
                    ? "var(--terra-500)"
                    : available
                    ? "transparent"
                    : "transparent",
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
                {day}
              </button>
            );
          })}
        </div>

        {/* Time slots for picked date */}
        <AnimatePresence>
          {pickedDate && slotsForDate.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease }}
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid #e7e5e4" }}
            >
              {/* AM / PM toggle — same shared state as the chip picker */}
              <div className="flex items-center gap-2 mb-3">
                {(["AM", "PM"] as const).map(period => (
                  <button
                    key={period}
                    type="button"
                    onClick={() => onAmPmChange(period)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all duration-150"
                    style={{
                      background: amPm === period ? "var(--terra-500)" : "transparent",
                      border: `1px solid ${amPm === period ? "var(--terra-500)" : "#e7e5e4"}`,
                      color: amPm === period ? "#ffffff" : "#78716c",
                    }}
                  >
                    {period === "AM"
                      ? <Sun  className="w-3 h-3" />
                      : <Moon className="w-3 h-3" />
                    }
                    {period}
                  </button>
                ))}
              </div>

              {filteredTimes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filteredTimes.map(slot => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => onSelect(slot)}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150"
                      style={{
                        background: "var(--terra-light)",
                        border: "1px solid var(--terra-border)",
                        color: "var(--terra-600)",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = "var(--terra-500)";
                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--terra-500)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = "var(--terra-light)";
                        (e.currentTarget as HTMLElement).style.color = "var(--terra-600)";
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--terra-border)";
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-stone-400 py-1">
                  No {amPm} times on this day.
                </p>
              )}
            </motion.div>
          )}

          {pickedDate && slotsForDate.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-[12px] text-stone-400 text-center py-2"
            >
              No available times on this day.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Close calendar */}
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full text-[12px] text-stone-400 hover:text-stone-600 transition-colors text-center"
        >
          Cancel
        </button>
      </div>
    </motion.div>
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
  const [customMode,    setCustomMode]    = useState(false); // true = date picker, false = chip grid
  const [submitState,   setSubmitState]   = useState<SubmitState>("idle");
  const [submitError,   setSubmitError]   = useState<string | null>(null);

  // Slots filtered to the selected AM / PM period (used by the chip picker)
  const filteredSlots = slots.filter(s =>
    amPm === "AM" ? s.time.includes("AM") : s.time.includes("PM")
  );

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
    setCustomMode(false);
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
                      <div className="flex items-center justify-between mb-3">
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

                        {/* Toggle off */}
                        <AnimatePresence>
                          {scheduleOn && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              type="button"
                              onClick={() => { setScheduleOn(false); setCustomMode(false); setSelectedSlot(null); }}
                              className="w-6 h-6 rounded-full flex items-center justify-center transition-colors hover:bg-stone-100"
                            >
                              <X className="w-3.5 h-3.5 text-stone-400" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>

                      <AnimatePresence mode="wait">

                        {/* ── MODE 1: slot already selected ───────────────── */}
                        {scheduleOn && selectedSlot ? (
                          <motion.div
                            key="selected"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease }}
                          >
                            <SlotChip
                              slot={selectedSlot}
                              selected={true}
                              onClick={() => {}}
                              onClear={() => { setSelectedSlot(null); setCustomMode(false); }}
                            />
                            <button
                              type="button"
                              onClick={() => { setSelectedSlot(null); setCustomMode(false); }}
                              className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-70"
                              style={{ color: "var(--terra-500)" }}
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                              Choose a different time
                            </button>
                          </motion.div>

                        /* ── MODE 2: custom date picker (calendar) ──────── */
                        ) : scheduleOn && customMode ? (
                          <motion.div
                            key="custom"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease }}
                          >
                            <button
                              type="button"
                              onClick={() => setCustomMode(false)}
                              className="flex items-center gap-1 text-[12px] font-semibold mb-1 transition-opacity hover:opacity-70"
                              style={{ color: "var(--terra-500)" }}
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              Back to suggested times
                            </button>
                            <InlineCalendar
                              availableSlots={slots}
                              onSelect={selectSlot}
                              onClose={() => setCustomMode(false)}
                              amPm={amPm}
                              onAmPmChange={setAmPm}
                            />
                          </motion.div>

                        /* ── MODE 3: suggested chip grid (default) ──────── */
                        ) : scheduleOn ? (
                          <motion.div
                            key="suggested"
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2, ease }}
                          >
                            <div className="flex gap-3">
                              {/* Left — AM / PM icon toggle */}
                              <div className="flex flex-col gap-2 flex-shrink-0">
                                {(["AM", "PM"] as const).map(period => (
                                  <button
                                    key={period}
                                    type="button"
                                    onClick={() => setAmPm(period)}
                                    className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150"
                                    style={{
                                      background: amPm === period ? "var(--terra-500)" : "transparent",
                                      border: `1px solid ${amPm === period ? "var(--terra-500)" : "#e7e5e4"}`,
                                      color: amPm === period ? "#ffffff" : "#78716c",
                                    }}
                                  >
                                    {period === "AM"
                                      ? <Sun  className="w-3.5 h-3.5" />
                                      : <Moon className="w-3.5 h-3.5" />
                                    }
                                    <span className="text-[10px] font-bold leading-none">{period}</span>
                                  </button>
                                ))}
                              </div>

                              {/* Right — filtered chips, scrollable */}
                              <div
                                className="flex-1 flex flex-wrap gap-2 content-start overflow-y-auto"
                                style={{ maxHeight: 168, scrollbarWidth: "none" }}
                              >
                                {slotsLoading
                                  ? Array.from({ length: 4 }).map((_, i) => (
                                      <div key={i} className="h-8 rounded-xl animate-pulse" style={{ width: 140, background: "#f0ede9" }} />
                                    ))
                                  : filteredSlots.length > 0
                                    ? filteredSlots.slice(0, 20).map(slot => (
                                        <SlotChip
                                          key={slot.id}
                                          slot={slot}
                                          selected={false}
                                          onClick={() => selectSlot(slot)}
                                        />
                                      ))
                                    : (
                                      <p className="text-[12px] text-stone-400 py-1">
                                        No {amPm} slots available right now.
                                      </p>
                                    )
                                }
                              </div>
                            </div>

                            {/* Custom time link + IST note */}
                            <div className="flex items-center justify-between mt-2.5">
                              <button
                                type="button"
                                onClick={() => setCustomMode(true)}
                                className="flex items-center gap-1.5 text-[12px] font-semibold transition-opacity hover:opacity-70"
                                style={{ color: "var(--terra-500)" }}
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                                Choose a custom time
                              </button>
                              <span className="text-[11px] text-stone-400">IST (UTC+5:30)</span>
                            </div>
                          </motion.div>

                        /* ── SCHEDULING OFF: re-enable button ───────────── */
                        ) : (
                          <motion.button
                            key="reenable"
                            type="button"
                            onClick={() => setScheduleOn(true)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="text-[12px] font-medium transition-opacity hover:opacity-70"
                            style={{ color: "var(--terra-500)" }}
                          >
                            + Add a time slot
                          </motion.button>
                        )}
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
