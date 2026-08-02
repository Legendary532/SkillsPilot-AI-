import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard,
  Brain,
  GraduationCap,
  BarChart3,
  BookOpen,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/learning", label: "Learning", icon: BookOpen },
  { to: "/skill-gap", label: "Skill Gap Analyzer", icon: Brain },
  { to: "/mock-interview", label: "Mock Interview", icon: GraduationCap },
  { to: "/progress", label: "Progress Report", icon: BarChart3 },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: (val: boolean) => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full bg-card border-r border-border transition-all duration-300 flex flex-col ${
        collapsed ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 border-b border-border/60 ${collapsed ? "justify-center" : "gap-2.5 px-4"}`}>
        <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="text-lg font-bold text-foreground tracking-tight">
            Skill<span className="text-primary">Pilot</span>
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer group ${
                collapsed ? "justify-center relative" : ""
              } ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/15"
                  : "text-foreground/50 hover:bg-muted/60 hover:text-foreground border border-transparent"
              }`
            }
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-150 group-hover:scale-105`} />
                {!collapsed && <span>{item.label}</span>}
                {isActive && collapsed && (
                  <span className="absolute right-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div className="border-t border-border/60 py-2 px-2.5 space-y-0.5">
        {/* Collapse toggle */}
        <button
          onClick={() => onToggle(!collapsed)}
          className="w-full p-2.5 rounded-xl text-foreground/40 hover:bg-muted/60 hover:text-foreground transition-colors duration-150 cursor-pointer hidden md:flex items-center justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full p-2.5 rounded-xl text-foreground/40 hover:bg-muted/60 hover:text-foreground transition-all duration-150 cursor-pointer flex items-center justify-center"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* User & Logout */}
      <div className={`border-t border-border/60 p-3 ${collapsed ? "px-1.5 text-center" : ""}`}>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 mb-2.5 px-1">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
              {user.avatar || user.name?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-foreground/40 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/50 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-all duration-150 w-full cursor-pointer border border-transparent hover:border-rose-200 dark:hover:border-rose-800/40 ${
            collapsed ? "justify-center" : ""
          }`}
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}