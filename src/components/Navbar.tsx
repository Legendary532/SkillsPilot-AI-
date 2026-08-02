import { Link } from "react-router-dom";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Skill<span className="text-primary">Pilot</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-150 rounded-xl hover:bg-muted/60"
            >
              Home
            </Link>
            <a
              href="#features"
              className="px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-150 rounded-xl hover:bg-muted/60"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-150 rounded-xl hover:bg-muted/60"
            >
              How It Works
            </a>

            <div className="w-px h-5 bg-border mx-2" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-foreground/40 hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary/15 text-primary font-semibold text-sm hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 active:scale-[0.97] ml-1"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-[0.97] glow-blue ml-1"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile menu button + Theme toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-foreground/40 hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-xl text-foreground/70 hover:bg-muted/60 transition-colors duration-150 cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav - Slide in from right */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-background/95 backdrop-blur-xl border-l border-border z-50 shadow-elevated md:hidden animate-slide-in-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold text-foreground">Menu</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg text-foreground/50 hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <a
                href="#features"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all"
                onClick={() => setMenuOpen(false)}
              >
                How It Works
              </a>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-3">
              <Link
                to="/login"
                className="block w-full text-center px-5 py-3 rounded-xl border-2 border-primary/15 text-primary font-semibold text-sm hover:bg-primary/5 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="block w-full text-center px-5 py-3 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md"
                onClick={() => setMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}