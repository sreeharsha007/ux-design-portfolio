import { useState } from "react";
import { Outlet } from "react-router";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./ScrollToTopButton";
import CustomCursor from "./CustomCursor";
import { ThemeProvider } from "../context/ThemeContext";

function CursorWrapper() {
  const [show] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches
  );
  return show ? <CustomCursor /> : null;
}

export default function Root() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300">
        <ScrollToTop />
        <ScrollToTopButton />
        <CursorWrapper />
        <Navigation />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}