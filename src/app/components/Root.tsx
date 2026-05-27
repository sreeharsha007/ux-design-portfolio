import { Outlet } from "react-router";
import Navigation from "./Navigation";
import ScrollToTop from "./ScrollToTop";
import CustomCursor from "./CustomCursor";
import { ThemeProvider } from "../context/ThemeContext";

export default function Root() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface text-on-surface transition-colors duration-300">
        <ScrollToTop />
        <CustomCursor />
        <Navigation />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}