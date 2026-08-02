import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Sparkles, Sun, Moon } from "lucide-react";
import Sidebar from "./Sidebar";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? "md:pl-[68px]" : "md:pl-64"
        }`}
      >
        {/* Premium top bar */}
        <div className={`sticky top-0 z-30 transition-all duration-200 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
            : "bg-gradient-to-r from-primary/[0.04] via-secondary/[0.03] to-transparent border-b border-border/30"
        }`}>
          <div className="flex items-center h-11 px-4 sm:px-6 lg:px-8 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md gradient-primary flex items-center justify-center shadow-sm">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground/50 tracking-wide">
                SkillPilot AI
              </span>
              <span className="text-[10px] text-foreground/20 hidden sm:inline">·</span>
              <span className="text-[10px] text-foreground/30 hidden sm:inline font-medium">
                AI-Powered Learning Platform
              </span>
            </div>
            <div className="flex-1" />
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-foreground/30 hover:text-foreground hover:bg-muted/60 transition-all duration-150 cursor-pointer"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}