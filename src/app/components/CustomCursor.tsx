import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "default" | "hovering" | "clicking";

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]';

export default function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  // Very tight spring — nib feels precise, not laggy
  const nibX = useSpring(mouseX, { stiffness: 600, damping: 34, mass: 0.2 });
  const nibY = useSpring(mouseY, { stiffness: 600, damping: 34, mass: 0.2 });

  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [nibAngle, setNibAngle] = useState(-45); // default calligraphy nib angle
  const [isIdle, setIsIdle] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const trailPoints = useRef<Array<{ x: number; y: number; t: number; w: number }>>([]);
  const rafRef = useRef<number>();
  const lastAngleUpdate = useRef(0);
  const idleTimer = useRef<number>();

  // Hide native cursor on fine-pointer devices
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const style = document.createElement("style");
    style.setAttribute("data-custom-cursor", "");
    style.textContent = `
      @media (pointer: fine) {
        html, body, *, *::before, *::after { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  // Canvas RAF loop — clears and redraws trail with time-based fade
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const now = Date.now();
        trailPoints.current = trailPoints.current.filter(p => now - p.t < 420);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pts = trailPoints.current;
        for (let i = 1; i < pts.length; i++) {
          const p1 = pts[i - 1];
          const p2 = pts[i];
          const age = now - p2.t;
          const alpha = Math.max(0, (1 - age / 420)) * 0.78;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(196, 82, 42, ${alpha.toFixed(3)})`;
          ctx.lineWidth = p2.w;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (lastPos.current) {
        const dx = x - lastPos.current.x;
        const dy = y - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1.5) {
          const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);

          // Throttle React state updates to ~30fps — canvas draws every frame independently
          const now = Date.now();
          if (now - lastAngleUpdate.current > 32) {
            setNibAngle(newAngle);
            lastAngleUpdate.current = now;
          }

          // Speed 0→1: slow movement = thick stroke, fast = hairline
          const speed = Math.min(dist / 18, 1);
          const lineWidth = Math.max(0.8, 3.5 - speed * 2.5);

          trailPoints.current.push({ x, y, t: Date.now(), w: lineWidth });
          if (trailPoints.current.length > 150) {
            trailPoints.current = trailPoints.current.slice(-150);
          }
        }
      }

      lastPos.current = { x, y };
      mouseX.set(x);
      mouseY.set(y);
      if (!visible) setVisible(true);

      // Reset idle timer
      if (isIdle) setIsIdle(false);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIsIdle(true), 900);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest(INTERACTIVE)) setState("hovering");
      else setState(prev => prev === "clicking" ? "clicking" : "default");
    };

    const onDown = () => setState("clicking");
    const onUp = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setState(el.closest(INTERACTIVE) ? "hovering" : "default");
    };

    const onDocLeave = () => setVisible(false);
    const onDocEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
  }, [mouseX, mouseY, visible, isIdle]);

  // Cleanup idle timer on unmount
  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  return (
    <>
      {/* Ink trail — transparent canvas, fades by time */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 9997 }}
      />

      {/* Nib cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: nibX,
          y: nibY,
          translateX: "-50%",
          translateY: "-50%",
          willChange: "transform",
          zIndex: 9999,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          style={{
            background: "var(--terra-500)",
            originX: "50%",
            originY: "50%",
          }}
          animate={{
            width: state === "hovering" ? 20 : state === "clicking" ? 10 : 18,
            height: state === "hovering" ? 20 : state === "clicking" ? 10 : 3,
            borderRadius:
              state === "hovering" || state === "clicking" ? "50%" : "1px",
            rotate:
              state === "hovering"
                ? 0
                : isIdle
                  ? [nibAngle, nibAngle + 360]
                  : nibAngle,
            opacity: state === "clicking" ? 0.65 : 1,
          }}
          transition={{
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
            rotate: isIdle
              ? { duration: 2.8, ease: "linear", repeat: Infinity }
              : { duration: 0.1, ease: "easeOut" },
          }}
        />
      </motion.div>
    </>
  );
}
