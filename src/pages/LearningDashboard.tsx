import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import {
  BookOpen, Brain, Trophy, Clock, Target, ChevronRight, Play,
  Star, TrendingUp, Sparkles, CheckCircle2, Circle, Calendar,
  BarChart3, Zap, Award, Layers, Flame, GraduationCap, ArrowRight,
} from "lucide-react";

/* ── Mock Data ─────────────────────────────────────────────── */

const skills = [
  { name: "System Design", progress: 75, icon: Layers, lessons: 12, completed: 9, color: "blue" as const },
  { name: "Data Structures & Algorithms", progress: 45, icon: BarChart3, lessons: 20, completed: 9, color: "indigo" as const },
  { name: "Product Strategy", progress: 30, icon: Target, lessons: 15, completed: 4, color: "amber" as const },
  { name: "Machine Learning Basics", progress: 60, icon: Brain, lessons: 18, completed: 11, color: "emerald" as const },
];

type ColorKey = "blue" | "indigo" | "amber" | "emerald" | "rose";

const colorRingMap: Record<ColorKey, { ring: string; bg: string; track: string; dot: string }> = {
  blue:    { ring: "stroke-primary",    bg: "bg-blue-50 dark:bg-blue-900/30",     track: "text-primary/20",   dot: "bg-primary" },
  indigo:  { ring: "stroke-secondary",  bg: "bg-indigo-50 dark:bg-indigo-900/30",   track: "text-secondary/20", dot: "bg-secondary" },
  amber:   { ring: "stroke-warning",    bg: "bg-amber-50 dark:bg-amber-900/30",    track: "text-warning/20",   dot: "bg-warning" },
  emerald: { ring: "stroke-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30", track: "text-emerald-500/20", dot: "bg-emerald-500" },
  rose:    { ring: "stroke-rose-500",   bg: "bg-rose-50 dark:bg-rose-900/30",     track: "text-rose-500/20",  dot: "bg-rose-500" },
};

const weekPlan: Record<string, { label: string; tasks: string[]; completed: number }> = {
  Mon: { label: "Mon", tasks: ["System Design - Caching patterns", "LeetCode × 2 medium"], completed: 1 },
  Tue: { label: "Tue", tasks: ["DSA - Graphs practice", "Review ML notes"], completed: 0 },
  Wed: { label: "Wed", tasks: ["System Design - Database sharding", "Product strategy reading"], completed: 2 },
  Thu: { label: "Thu", tasks: ["Mock interview practice", "LeetCode × 1 hard"], completed: 0 },
  Fri: { label: "Fri", tasks: ["ML - Neural networks", "Weekly review & quiz"], completed: 0 },
  Sat: { label: "Sat", tasks: ["Catch up / rest"], completed: 0 },
  Sun: { label: "Sun", tasks: ["Plan next week", "Skill assessment"], completed: 0 },
};

const defaultTasks = [
  { id: "t1", text: "Complete System Design module 4", done: true, priority: "high" as const },
  { id: "t2", text: "Review DSA flashcards (20 min)", done: true, priority: "medium" as const },
  { id: "t3", text: "Take ML quiz on neural networks", done: false, priority: "high" as const },
  { id: "t4", text: "Read Product Strategy ch. 3", done: false, priority: "low" as const },
  { id: "t5", text: "Practice behavioral interview Qs", done: false, priority: "medium" as const },
];

const quizzes = [
  { title: "System Design Weekly Quiz", questions: 10, bestScore: 80, category: "Engineering" },
  { title: "DSA — Arrays & Strings", questions: 8, bestScore: 62, category: "Computer Science" },
  { title: "ML Fundamentals Check", questions: 12, bestScore: 0, category: "Data Science" },
];

const badges = [
  { name: "Quick Starter", icon: Zap, desc: "Complete 1st lesson", achieved: true },
  { name: "7-Day Streak", icon: Flame, desc: "Learn 7 days in a row", achieved: true },
  { name: "Skill Builder", icon: Award, desc: "Reach 80% in any skill", achieved: false, progress: 75 },
  { name: "Quiz Master", icon: GraduationCap, desc: "Score 90% on any quiz", achieved: false, progress: 80 },
  { name: "Course Finisher", icon: BookOpen, desc: "Complete a full course", achieved: false, progress: 45 },
  { name: "Interview Ready", icon: Star, desc: "Complete 3 mock interviews", achieved: false, progress: 33 },
];

/* ── SVG Progress Ring ────────────────────────────────────── */

function ProgressRing({ progress, color }: { progress: number; color: ColorKey }) {
  const r = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  const c = colorRingMap[color] || colorRingMap.blue;

  return (
    <svg width="68" height="68" viewBox="0 0 68 68" className="flex-shrink-0">
      <circle cx="34" cy="34" r={r} fill="none" stroke="currentColor" strokeWidth="5" className={c.track} />
      <circle
        cx="34" cy="34" r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className={c.ring}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 34 34)"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
      <text x="34" y="34" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[12px] font-bold">
        {progress}%
      </text>
    </svg>
  );
}

/* ── Priority Badge ────────────────────────────────────────── */

function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const map = {
    high: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/30",
    medium: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30",
    low: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30",
  };
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${map[priority]}`}>
      {priority}
    </span>
  );
}

/* ── Main Component ───────────────────────────────────────── */

export default function LearningDashboard() {
  const { user } = useAuth();
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  });

  const dayKeys = Object.keys(weekPlan);
  const todayLabel = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date().getDay()];
  const [selectedDay, setSelectedDay] = useState(todayLabel);
  const day = weekPlan[selectedDay] || weekPlan.Mon;

  const [tasks, setTasks] = useState(defaultTasks);

  const toggleTask = (id: string) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const tasksDone = tasks.filter((t) => t.done).length;

  const weekProgress = dayKeys.reduce((acc, d) => {
    const wd = weekPlan[d];
    return acc + Math.round((wd.completed / wd.tasks.length) * 100);
  }, 0) / dayKeys.length;

  return (
    <div className="space-y-7 pb-8">

      {/* ─── Welcome Header (Coursera-style) ─────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute inset-0 noise" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {greeting}, {user?.name || "Learner"}!
            </h1>
            <p className="text-white/70 mt-1 max-w-xl text-sm sm:text-base">
              You've completed{" "}
              <span className="font-semibold text-white">24 of 65 lessons</span> across your active courses.
              Keep the momentum going!
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-white/80 text-xs">
                <Flame className="w-4 h-4 text-orange-300" />
                <span className="font-semibold text-white">12</span> day streak
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1.5 text-white/80 text-xs">
                <Zap className="w-4 h-4 text-yellow-300" />
                <span className="font-semibold text-white">4.5</span> hrs this week
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-1.5 text-white/80 text-xs">
                <Award className="w-4 h-4 text-emerald-300" />
                <span className="font-semibold text-white">37%</span> overall progress
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
            <div className="w-16 h-16 relative">
              <svg width="64" height="64" viewBox="0 0 64 64" className="transform -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
                <circle
                  cx="32" cy="32" r="26"
                  fill="none" stroke="white" strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 26}
                  strokeDashoffset={2 * Math.PI * 26 * (1 - 37 / 100)}
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">37%</span>
            </div>
            <div className="text-xs text-white/70 leading-tight">Overall<br />Progress</div>
          </div>
        </div>
      </div>

      {/* ─── Stats Row ───────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Courses In Progress" value="4" change="+1 this week" changeType="positive" icon={BookOpen} accent="blue" />
        <StatCard title="Skills Assessed" value="12" change="85% proficiency" changeType="positive" icon={Brain} accent="indigo" />
        <StatCard title="Hours Learned" value="47" change="+5.5 this week" changeType="positive" icon={Clock} accent="green" />
        <StatCard title="Streak" value="12 days" change="Best: 21 days" changeType="neutral" icon={Trophy} accent="amber" />
      </div>

      {/* ─── Two Column Layout ───────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-7">

        {/* ═══ LEFT COLUMN ─────────────────────────────── */}
        <div className="lg:col-span-2 space-y-7">

          {/* Skill Progress Cards */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Layers className="w-5 h-5 text-primary" />
                Skill Progress
              </h2>
              <button className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1 group cursor-pointer">
                View All <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills.map((skill) => {
                const c = colorRingMap[skill.color as ColorKey] || colorRingMap.blue;
                return (
                  <div
                    key={skill.name}
                    className="bg-card rounded-xl border border-border/60 p-5 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shadow-sm`}>
                          <skill.icon className={`w-5 h-5 ${c.dot.replace("bg-", "text-")}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {skill.name}
                          </h3>
                          <p className="text-xs text-foreground/50">
                            {skill.completed} of {skill.lessons} lessons
                          </p>
                        </div>
                      </div>
                      <ProgressRing progress={skill.progress} color={skill.color as ColorKey} />
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                          skill.color === "blue" ? "from-primary to-secondary" :
                          skill.color === "indigo" ? "from-secondary to-purple-500" :
                          skill.color === "amber" ? "from-warning to-orange-500" :
                          "from-emerald-500 to-emerald-400"
                        }`}
                        style={{ width: `${skill.progress}%` }}
                      />
                    </div>
                    <button className="mt-3 w-full py-2 rounded-lg border border-border/60 text-xs font-semibold text-foreground/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer">
                      Continue <Play className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 7-Day Learning Plan */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Calendar className="w-5 h-5 text-primary" />
                7-Day Learning Plan
              </h2>
              <span className="text-xs text-foreground/50 bg-muted/60 px-2.5 py-1 rounded-full font-medium">
                {Math.round(weekProgress)}% this week
              </span>
            </div>
            <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
              <div className="flex overflow-x-auto border-b border-border/60 bg-muted/20 scrollbar-none">
                {dayKeys.map((d) => {
                  const wd = weekPlan[d];
                  const pct = wd.tasks.length > 0 ? Math.round((wd.completed / wd.tasks.length) * 100) : 0;
                  const isSelected = d === selectedDay;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDay(d)}
                      className={`flex-shrink-0 px-4 py-3 text-xs font-medium transition-all duration-150 border-b-2 cursor-pointer min-w-[64px] ${
                        isSelected
                          ? "border-primary text-primary bg-white dark:bg-card/80 shadow-sm"
                          : "border-transparent text-foreground/50 hover:text-foreground hover:bg-white/50 dark:hover:bg-card/40"
                      }`}
                    >
                      <span className="block">{wd.label}</span>
                      <span className="block mt-1.5 w-full h-1 bg-muted rounded-full overflow-hidden">
                        <span className={`block h-full rounded-full transition-all ${
                          pct >= 100 ? "bg-emerald-500" : "bg-primary/40"
                        }`} style={{ width: `${pct}%` }} />
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                {day.tasks.map((task, i) => {
                  const done = i < day.completed;
                  return (
                    <label
                      key={task}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                        done
                          ? "bg-primary border-primary text-white"
                          : "border-border/60 group-hover:border-primary/40"
                      }`}>
                        {done && <CheckCircle2 className="w-4 h-4" />}
                      </span>
                      <span className={`text-sm transition-all duration-150 ${
                        done ? "text-foreground/40 line-through" : "text-foreground"
                      }`}>
                        {task}
                      </span>
                    </label>
                  );
                })}
                <button className="w-full mt-2 px-3 py-2.5 rounded-lg text-xs text-foreground/30 hover:text-foreground/50 hover:bg-muted/30 transition-all border border-dashed border-border/40 flex items-center gap-2 cursor-pointer">
                  + Add task
                </button>
              </div>
            </div>
          </section>

          {/* Daily Tasks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Daily Tasks
              </h2>
              <span className="text-xs font-medium text-foreground/50">
                {tasksDone}/{tasks.length} done
              </span>
            </div>
            <div className="bg-card rounded-xl border border-border/60 shadow-sm divide-y divide-border/60">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/20 transition-colors cursor-pointer group"
                  role="checkbox"
                  aria-checked={t.done}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleTask(t.id); } }}
                >
                  <span className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
                    t.done
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-border/60 group-hover:border-primary/40"
                  }`}>
                    {t.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </span>
                  <span className={`flex-1 text-sm transition-all duration-150 ${
                    t.done ? "text-foreground/40 line-through" : "text-foreground"
                  }`}>
                    {t.text}
                  </span>
                  <PriorityBadge priority={t.priority} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-border/40 text-xs text-foreground/30 hover:text-foreground/50 hover:border-border/60 hover:bg-muted/20 transition-all cursor-pointer">
              <Circle className="w-4 h-4" />
              Add a new task...
            </div>
          </section>

          {/* Quiz Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Brain className="w-5 h-5 text-primary" />
                Quick Quizzes
              </h2>
              <button className="text-sm text-primary font-semibold hover:text-primary-dark transition-colors flex items-center gap-1 group cursor-pointer">
                All Quizzes <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {quizzes.map((q) => (
                <div
                  key={q.title}
                  className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{q.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{q.title}</h3>
                  <p className="text-xs text-foreground/50 mt-0.5">{q.questions} questions</p>
                  {q.bestScore > 0 ? (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-foreground/50">Best:</span>
                      <span className={`text-sm font-bold ${
                        q.bestScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : q.bestScore >= 60 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"
                      }`}>{q.bestScore}%</span>
                    </div>
                  ) : (
                    <span className="inline-block mt-3 text-xs font-medium text-primary bg-primary/5 px-2.5 py-1 rounded-full">
                      Not attempted
                    </span>
                  )}
                  <button className="mt-3 w-full py-2 rounded-lg border border-border/60 text-xs font-semibold text-foreground/50 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-150 cursor-pointer">
                    Take Quiz
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ═══ RIGHT COLUMN ─────────────────────────────── */}
        <div className="space-y-6">

          {/* Achievement Badges */}
          <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/60 bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-900/20 flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Award className="w-4 h-4 text-amber-500" />
                Achievements
              </h3>
              <span className="text-[10px] text-foreground/50 bg-muted px-2 py-0.5 rounded-full font-medium">
                {badges.filter((b) => b.achieved).length}/{badges.length}
              </span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-2.5">
              {badges.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all duration-200 ${
                    b.achieved
                      ? "bg-gradient-to-b from-amber-50 to-amber-50/50 border border-amber-200/60 dark:from-amber-900/30 dark:to-amber-900/20 dark:border-amber-800/40 shadow-sm"
                      : "bg-muted/20 border border-border/40 opacity-60"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${
                    b.achieved ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm" : "bg-muted"
                  }`}>
                    <b.icon className={`w-5 h-5 ${b.achieved ? "text-white" : "text-foreground/30"}`} />
                  </div>
                  <p className="text-[10px] font-semibold text-foreground leading-tight">{b.name}</p>
                  <p className="text-[9px] text-foreground/40 mt-0.5 leading-tight">{b.desc}</p>
                  {!b.achieved && b.progress !== undefined && (
                    <div className="w-full mt-2 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: `${b.progress}%` }} />
                    </div>
                  )}
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

          {/* AI Focus Pick */}
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl border border-primary/10 p-5 group hover:shadow-md transition-all duration-200">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Focus Pick</h3>
                <p className="text-xs text-foreground/60 mt-1 leading-relaxed">
                  Based on your progress, we recommend the{" "}
                  <span className="font-semibold text-primary">System Design — Caching</span> module next.
                  It bridges your current skill gap.
                </p>
                <button className="mt-2 text-xs font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1 cursor-pointer">
                  Start module <ArrowRight className="w-3 h-3" />
                </button>
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