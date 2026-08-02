import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import {
  BookOpen, Brain, GraduationCap, BarChart3, ArrowRight, Sparkles,
  Flame, Zap, Award, Clock, Target, TrendingUp, ChevronRight,
  CalendarDays, Activity,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────────── */

const quickActions = [
  { to: "/skill-gap", label: "Skill Gap Analyzer", desc: "Identify what to learn next", icon: Brain, color: "indigo" as const },
  { to: "/mock-interview", label: "Mock Interview", desc: "Practice with AI & get feedback", icon: GraduationCap, color: "blue" as const },
  { to: "/progress", label: "Progress Report", desc: "Track your growth over time", icon: BarChart3, color: "emerald" as const },
  { to: "/learning", label: "Learning Dashboard", desc: "Courses, tasks & daily plan", icon: BookOpen, color: "amber" as const },
];

const recentActivity = [
  { action: "Completed", target: "System Design — Caching Patterns", time: "2 hours ago", type: "lesson" as const },
  { action: "Scored 80%", target: "System Design Weekly Quiz", time: "Yesterday", type: "quiz" as const },
  { action: "Started", target: "DSA — Graphs & Traversals", time: "2 days ago", type: "lesson" as const },
  { action: "Scored 72%", target: "Mock Interview — Product Strategy", time: "3 days ago", type: "interview" as const },
  { action: "Earned badge", target: "7-Day Streak", time: "4 days ago", type: "badge" as const },
];

const upcomingDeadlines = [
  { task: "ML — Neural Networks Quiz", due: "Tomorrow", urgent: true },
  { task: "System Design Module 5", due: "In 3 days", urgent: false },
  { task: "Weekly Progress Review", due: "In 5 days", urgent: false },
];

type ActivityType = "lesson" | "quiz" | "interview" | "badge";

const activityMeta: Record<ActivityType, { icon: typeof BookOpen; bg: string }> = {
  lesson:    { icon: BookOpen, bg: "bg-blue-100 dark:bg-blue-900/40" },
  quiz:      { icon: Brain, bg: "bg-indigo-100 dark:bg-indigo-900/40" },
  interview: { icon: GraduationCap, bg: "bg-emerald-100 dark:bg-emerald-900/40" },
  badge:     { icon: Award, bg: "bg-amber-100 dark:bg-amber-900/40" },
};

/* ── Main Component ───────────────────────────────────────── */

export default function Dashboard() {
  const { user } = useAuth();
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  });

  return (
    <div className="space-y-7 pb-8">

      {/* ─── Welcome Header ─────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-0 noise" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {greeting}, {user?.name || "Learner"}!
              </h1>
              <p className="text-white/70 mt-1 max-w-xl text-sm sm:text-base">
                Here's your learning overview. You've completed{" "}
                <span className="font-semibold text-white">24 of 65</span> lessons
                across your active courses.
              </p>
              <div className="flex items-center gap-4 mt-4 flex-wrap">
                {[
                  { icon: Flame, label: "12 day streak", value: "12", color: "text-orange-300" },
                  { icon: Zap, label: "4.5 hrs this week", value: "4.5", color: "text-yellow-300" },
                  { icon: Award, label: "37% overall", value: "37%", color: "text-emerald-300" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-white/80 text-xs">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="font-semibold text-white">{item.value}</span>
                    <span className="text-white/60">{item.label.replace(item.value, "").trim()}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              to="/learning"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/15 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200 active:scale-[0.97] group"
            >
              Go to Learning
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Stats Row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Courses In Progress" value="4" change="+1 this week" changeType="positive" icon={BookOpen} accent="blue" />
        <StatCard title="Skills Assessed" value="12" change="85% proficiency" changeType="positive" icon={Brain} accent="indigo" />
        <StatCard title="Hours Learned" value="47" change="+5.5 this week" changeType="positive" icon={Clock} accent="green" />
        <StatCard title="Streak" value="12 days" change="Best: 21 days" changeType="neutral" icon={TrendingUp} accent="amber" />
      </div>

      {/* ─── Two Column Layout ───────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-7">

        {/* ═══ LEFT COLUMN — Quick Actions ─────────────── */}
        <div className="lg:col-span-2 space-y-7">

          {/* Quick Action Cards */}
          <section>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4 tracking-tight">
              <Zap className="w-5 h-5 text-primary" />
              Quick Actions
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const bgMap = {
                  blue:    "bg-blue-50 dark:bg-blue-900/30",
                  indigo:  "bg-indigo-50 dark:bg-indigo-900/30",
                  emerald: "bg-emerald-50 dark:bg-emerald-900/30",
                  amber:   "bg-amber-50 dark:bg-amber-900/30",
                };
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="group bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 block"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${bgMap[action.color]} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110`}>
                        <action.icon className={`w-6 h-6 text-${action.color === "blue" ? "primary" : action.color === "indigo" ? "secondary" : action.color === "emerald" ? "emerald-500" : "amber-500"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {action.label}
                        </h3>
                        <p className="text-xs text-foreground/50 mt-0.5">{action.desc}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-primary transition-all duration-200 group-hover:translate-x-0.5 flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <button className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1 group cursor-pointer">
                View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="bg-card rounded-xl border border-border/60 shadow-sm divide-y divide-border/60">
              {recentActivity.map((item, i) => {
                const meta = activityMeta[item.type];
                const Icon = meta.icon;
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors">
                    <div className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-foreground/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{item.action}</span>{" "}
                        <span className="text-foreground/70">{item.target}</span>
                      </p>
                      <p className="text-xs text-foreground/40 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Skill Progress Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Target className="w-5 h-5 text-primary" />
                Top Skills
              </h2>
              <Link
                to="/skill-gap"
                className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1 group"
              >
                Analyze Gaps <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="bg-card rounded-xl border border-border/60 shadow-sm p-5 space-y-4">
              {[
                { name: "System Design", progress: 75, color: "from-primary to-secondary" },
                { name: "Data Structures & Algorithms", progress: 45, color: "from-secondary to-purple-500" },
                { name: "Product Strategy", progress: 30, color: "from-amber-500 to-orange-500" },
                { name: "Machine Learning Basics", progress: 60, color: "from-emerald-500 to-emerald-400" },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-xs font-semibold text-foreground/50">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-500`}
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ═══ RIGHT COLUMN ─────────────────────────────── */}
        <div className="space-y-6">

          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/60 bg-gradient-to-r from-rose-50/50 to-transparent dark:from-rose-900/20 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 tracking-tight">
                <CalendarDays className="w-4 h-4 text-rose-500" />
                Upcoming Deadlines
              </h3>
            </div>
            <div className="divide-y divide-border/60">
              {upcomingDeadlines.map((d) => (
                <div key={d.task} className="flex items-center gap-3 px-4 py-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${d.urgent ? "bg-rose-500 animate-pulse" : "bg-amber-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{d.task}</p>
                  </div>
                  <span className={`text-xs font-semibold flex-shrink-0 ${
                    d.urgent ? "text-rose-600 dark:text-rose-400" : "text-foreground/40"
                  }`}>
                    {d.due}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Goal */}
          <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 tracking-tight">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Weekly Goal
              </h3>
              <span className="text-xs font-medium text-foreground/50">4.5 / 10 hrs</span>
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: "45%" }} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-foreground/40">45% complete</span>
              <span className="text-xs font-medium text-foreground/50 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                +2.5 hrs remaining
              </span>
            </div>
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl border border-primary/10 p-5 group hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Suggestion</h3>
                <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                  Based on your progress, we recommend trying the{" "}
                  <span className="font-semibold text-primary">Skill Gap Analyzer</span>{" "}
                  to identify your next learning priority.
                </p>
                <Link
                  to="/skill-gap"
                  className="mt-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1 group/link"
                >
                  Analyze now <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Learning Stats */}
          <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-foreground mb-1 tracking-tight">Learning Stats</h3>
            {[
              { label: "Total lessons completed", value: "24" },
              { label: "Active days this month", value: "18" },
              { label: "Avg session length", value: "42 min" },
              { label: "Quizzes passed", value: "5 / 8" },
              { label: "Next milestone", value: "30 lessons" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between text-xs">
                <span className="text-foreground/50">{s.label}</span>
                <span className="font-semibold text-foreground">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}