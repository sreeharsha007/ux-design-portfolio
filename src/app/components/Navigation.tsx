import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isHome = location.pathname === "/";
  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-nav-bg backdrop-blur-2xl border-b border-nav-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-light tracking-tight"
            >
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--gradient-text-from), var(--gradient-text-via), var(--gradient-text-to))` }}>
                Your Name
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-cyan-500 mt-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm tracking-wide transition-colors ${
                isHome ? "text-on-surface" : "text-on-surface-secondary hover:text-blue-500"
              }`}
            >
              Work
            </Link>
            <a
              href="#about"
              className="text-sm tracking-wide text-on-surface-secondary hover:text-blue-500 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm tracking-wide text-on-surface-secondary hover:text-blue-500 transition-colors"
            >
              Contact
            </a>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-secondary text-on-surface-secondary hover:text-on-surface transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm tracking-wide rounded-full overflow-hidden group"
            >
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-nav-border bg-nav-bg backdrop-blur-2xl"
        >
          <div className="px-6 py-6 space-y-4">
            <Link
              to="/"
              className="block text-base text-on-surface"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <a
              href="#about"
              className="block text-base text-on-surface-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-base text-on-surface-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-center text-sm tracking-wide rounded-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
