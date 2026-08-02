import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Brain,
  Award,
  Calendar,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  Briefcase,
  ExternalLink,
  Star,
  Target,
  Trophy,
  ChevronRight,
  GraduationCap,
  Medal,
  Timer,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────────── */

interface SkillMetric {
  name: string;
  current: number;
  previous: number;
  category: string;
}

interface ActivityDay {
  label: string;
  hours: number;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  skill: string;
  credentialUrl: string;
}

interface StatCardData {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: { direction: "up" | "down"; text: string; color: string };
  color: string;
}

/* ── Data ───────────────────────────────────────────────────── */

const skillData: SkillMetric[] = [
  { name: "System Design", current: 72, previous: 55, category: "Engineering" },
  { name: "Algorithms", current: 65, previous: 50, category: "Engineering" },
  { name: "Data Structures", current: 78, previous: 60, category: "Engineering" },
  { name: "API Design", current: 80, previous: 70, category: "Engineering" },
  { name: "Cloud Architecture", current: 45, previous: 30, category: "Engineering" },
  { name: "Product Strategy", current: 60, previous: 55, category: "Product" },
  { name: "User Research", current: 55, previous: 45, category: "Product" },
  { name: "Communication", current: 82, previous: 78, category: "Soft Skills" },
  { name: "Leadership", current: 70, previous: 65, category: "Soft Skills" },
  { name: "Presentation", current: 68, previous: 60, category: "Soft Skills" },
];

const weeklyActivity: ActivityDay[] = [
  { label: "Mon", hours: 1.5 },
  { label: "Tue", hours: 2.0 },
  { label: "Wed", hours: 0.75 },
  { label: "Thu", hours: 1.0 },
  { label: "Fri", hours: 0.5 },
  { label: "Sat", hours: 0 },
  { label: "Sun", hours: 0 },
];

const certificates: Certificate[] = [
  { id: 1, title: "Advanced System Design", issuer: "SkillPilot AI", date: "Dec 2024", skill: "System Design", credentialUrl: "#" },
  { id: 2, title: "REST API Mastery", issuer: "SkillPilot AI", date: "Nov 2024", skill: "API Design", credentialUrl: "#" },
  { id: 3, title: "Data Structures Foundation", issuer: "SkillPilot AI", date: "Oct 2024", skill: "Data Structures", credentialUrl: "#" },
];

const completedSkills = skillData.filter((s) => s.current >= 80);

const jobListings = [
  { title: "Senior Software Engineer", company: "TechCorp", salary: "$160K-$200K", match: "92%" },
  { title: "Staff Backend Engineer", company: "ScaleUp Inc.", salary: "$180K-$220K", match: "87%" },
  { title: "Engineering Manager", company: "StartupXYZ", salary: "$170K-$210K", match: "78%" },
];

/* ── Sub-Components ─────────────────────────────────────────── */

function CircularProgress({ value, size = 160, strokeWidth = 12 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  const center = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="progress-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          className="dark:opacity-30"
        />
        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#progress-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-foreground">{value}%</span>
        <span className="text-[11px] text-foreground/40 font-medium mt-0.5">Overall</span>
      </div>
    </div>
  );
}

function ProgressBar({ value, label, sublabel, color }: { value: number; label: string; sublabel?: string; color?: string }) {
  const barColor = color || (value >= 80 ? "bg-emerald-500" : value >= 60 ? "bg-primary" : value >= 40 ? "bg-amber-500" : "bg-rose-500");
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {sublabel && <span className="text-[10px] text-foreground/40">{sublabel}</span>}
        </div>
        <span className="text-xs font-semibold text-foreground">{value}%</span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend, color }: StatCardData) {
  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
            trend.direction === "up" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
          }`}>
            <ArrowUp className={`w-2.5 h-2.5 ${trend.direction === "down" ? "rotate-180" : ""}`} />
            {trend.text}
          </span>
        )}
      </div>
      <p className="text-xl font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-foreground/40 mt-0.5">{label}</p>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────── */

export default function ProgressReport() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("month");
  const [showJobs, setShowJobs] = useState(false);

  // Computed metrics
  const totalHours = weeklyActivity.reduce((a, d) => a + d.hours, 0);
  const avgScore = Math.round(skillData.reduce((a, s) => a + s.current, 0) / skillData.length);
  const prevAvgScore = Math.round(skillData.reduce((a, s) => a + s.previous, 0) / skillData.length);
  const skillsImproved = skillData.filter((s) => s.current > s.previous).length;
  const activeDays = weeklyActivity.filter((d) => d.hours > 0).length;
  const maxHour = Math.max(...weeklyActivity.map((d) => d.hours), 2.5);
  const completedCount = completedSkills.length;
  const bestSkill = skillData.reduce((best, s) => (s.current > best.current ? s : best), skillData[0]);
  const masteryLevel = avgScore >= 80 ? "Expert" : avgScore >= 65 ? "Advanced" : avgScore >= 50 ? "Intermediate" : "Beginner";

  // Stats cards
  const statsCards: StatCardData[] = [
    {
      icon: <Brain className="w-4 h-4 text-white" />,
      label: "Average skill score across all categories",
      value: `${avgScore}%`,
      trend: { direction: avgScore > prevAvgScore ? "up" : "down", text: `${Math.abs(avgScore - prevAvgScore)}%`, color: "bg-emerald-500" },
      color: "bg-gradient-to-br from-primary to-secondary",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      label: "Skills that improved this period",
      value: `${skillsImproved}/${skillData.length}`,
      trend: { direction: "up", text: "improved", color: "bg-emerald-500" },
      color: "bg-gradient-to-br from-emerald-500 to-green-500",
    },
    {
      icon: <Clock className="w-4 h-4 text-white" />,
      label: "Total study time this week",
      value: `${totalHours}h`,
      trend: { direction: "up", text: `${activeDays} days`, color: "bg-indigo-500" },
      color: "bg-gradient-to-br from-indigo-500 to-violet-500",
    },
    {
      icon: <Award className="w-4 h-4 text-white" />,
      label: "Skills mastered at 80%+",
      value: `${completedCount}`,
      trend: { direction: "up", text: "mastered", color: "bg-amber-500" },
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* ── Header ────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent rounded-2xl p-6 sm:p-8 border border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Progress Report</h1>
            </div>
            <p className="text-foreground/50 text-sm">Track your learning journey, skill growth, and achievements.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-card border border-border rounded-xl p-1 shadow-sm">
              {(["week", "month", "quarter"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
                    timeRange === range
                      ? "gradient-primary text-white shadow-sm"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
            {/* Apply for Jobs Button */}
            <button
              onClick={() => setShowJobs(!showJobs)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-[0.97] cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              Apply for Jobs
            </button>
          </div>
        </div>
      </div>

      {/* ── Job Listings Panel (expandable) ───────────────────── */}
      {showJobs && (
        <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden animate-fade-in-up">
          <div className="p-5 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Recommended Jobs for You
              </h2>
              <span className="text-xs text-foreground/50 bg-muted px-2.5 py-1 rounded-full">Based on your skills</span>
            </div>
            <p className="text-xs text-foreground/50 mt-1">Your {masteryLevel} profile matches these openings</p>
          </div>
          <div className="divide-y divide-border">
            {jobListings.map((job, i) => (
              <div key={i} className="p-5 flex items-center justify-between hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{job.title}</h3>
                    <p className="text-xs text-foreground/50">{job.company} · {job.salary}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded-full">
                        {job.match} Match
                      </span>
                    </div>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg gradient-primary text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.97] cursor-pointer">
                  Apply <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Top Row: Circular Progress + Stats ────────────────── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Circular Progress */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CircularProgress value={avgScore} size={180} strokeWidth={14} />
            <div className="text-center sm:text-left space-y-3">
              <div>
                <h2 className="text-lg font-bold text-foreground">{masteryLevel} Level</h2>
                <p className="text-xs text-foreground/50">Based on {skillData.length} skills assessed</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <Target className="w-3.5 h-3.5 text-primary" />
                  Best skill: <span className="font-semibold text-foreground">{bestSkill.name}</span> ({bestSkill.current}%)
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Skills mastered: <span className="font-semibold text-foreground">{completedCount}</span> at 80%+
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground/60">
                  <Timer className="w-3.5 h-3.5 text-indigo-500" />
                  Study streak: <span className="font-semibold text-foreground">{activeDays} days</span> this week
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 gap-4">
          {statsCards.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </div>

      {/* ── Middle Row: Weekly Chart + Certificates ───────────── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border bg-gradient-to-r from-muted/50 to-transparent flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Activity
            </h2>
            <span className="text-xs bg-muted px-2.5 py-1 rounded-full text-foreground/50">{totalHours}h this week</span>
          </div>
          <div className="p-6">
            <div className="flex items-end gap-3 h-48">
              {weeklyActivity.map((day) => {
                const heightPercent = day.hours > 0 ? (day.hours / maxHour) * 100 : 0;
                return (
                  <div key={day.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    {/* Tooltip */}
                    {day.hours > 0 && (
                      <span className="text-[10px] font-semibold text-foreground/60 bg-muted px-1.5 py-0.5 rounded-full">
                        {day.hours}h
                      </span>
                    )}
                    {/* Bar */}
                    <div className="relative w-full rounded-xl overflow-hidden" style={{ height: `${Math.max(heightPercent, day.hours > 0 ? 8 : 4)}%` }}>
                      <div
                        className={`absolute inset-0 rounded-xl transition-all duration-500 ${
                          day.hours > 0
                            ? "bg-gradient-to-t from-primary via-secondary to-accent"
                            : "bg-muted"
                        }`}
                        style={{
                          boxShadow: day.hours > 0 ? "0 4px 12px rgba(37,99,235,0.25)" : "none",
                        }}
                      />
                      {/* Shimmer effect on hover */}
                      <div
                        className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 hover:opacity-20 ${
                          day.hours > 0 ? "bg-gradient-to-t from-white/40 to-transparent" : ""
                        }`}
                      />
                    </div>
                    {/* Day label */}
                    <span className={`text-[11px] font-medium ${
                      day.hours > 0 ? "text-foreground/60" : "text-foreground/30"
                    }`}>
                      {day.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Chart legend */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-primary to-secondary" />
                <span className="text-[10px] text-foreground/40">Study time</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <span className="text-[10px] text-foreground/40">No activity</span>
              </div>
              <span className="text-[10px] text-foreground/30 ml-auto peer">{timeRange === "week" ? "Past 7 days" : timeRange === "month" ? "Past 30 days" : "Past 90 days"}</span>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-900/20">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Medal className="w-5 h-5 text-amber-500" />
              Certificates Earned
            </h2>
            <p className="text-xs text-foreground/50 mt-0.5">You've earned {certificates.length} certificate{certificates.length > 1 ? "s" : ""}</p>
          </div>
          <div className="p-5 space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/50 to-transparent border border-border/50 hover:shadow-card-hover transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate">{cert.title}</h3>
                  <p className="text-xs text-foreground/50">{cert.issuer} · {cert.date}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-primary font-medium bg-primary/5 px-2 py-0.5 rounded-full">
                      {cert.skill}
                    </span>
                    <button className="text-[10px] text-primary hover:text-primary-dark font-medium flex items-center gap-0.5 transition-colors underline-offset-2 hover:underline opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      View <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              </div>
            ))}
            <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-dashed border-border text-xs font-medium text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
              <Star className="w-3.5 h-3.5" />
              View All Certificates
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Completed Skills + AI Insight ─────────── */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Completed Skills */}
        <div className="lg:col-span-3 bg-card rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Completed Skills
              </h2>
              <p className="text-xs text-foreground/50">Skills where you've reached 80% or higher proficiency</p>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-semibold px-2.5 py-1 rounded-full">
              {completedCount} Mastered
            </span>
          </div>
          <div className="p-5">
            {completedSkills.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {completedSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/40 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-900/20 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{skill.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden max-w-24">
                          <div className="h-full rounded-full bg-emerald-500" style={{ width: `${skill.current}%` }} />
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{skill.current}%</span>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-10 h-10 text-foreground/20 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground/40">Keep going! Master skills to see them here.</p>
                <p className="text-xs text-foreground/30 mt-1">Reach 80% proficiency in any skill to unlock this section.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Insight + Progress paths */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Insight */}
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl border border-primary/10 p-6 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">AI Insight</h3>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  Your technical skills are growing consistently! To maximize interview readiness,
                  focus on <span className="font-semibold text-primary">Cloud Architecture</span> —
                  it has the largest gap at 45%. 
                </p>
                <div className="mt-3 space-y-2">
                  <ProgressBar value={45} label="Cloud Architecture" sublabel="Biggest gap" color="bg-amber-500" />
                  <ProgressBar value={78} label="Data Structures" sublabel="Strong" color="bg-emerald-500" />
                </div>
                <p className="text-[10px] text-foreground/40 mt-3 flex items-center gap-1">
                  <Target className="w-3 h-3" /> Recommended focus for next {timeRange}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Overview */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-card">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              All Skills Overview
            </h3>
            <div className="space-y-3.5">
              {skillData.slice(0, 5).map((skill) => {
                const improved = skill.current > skill.previous;
                return (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground truncate">{skill.name}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] text-foreground/40">{skill.previous}%</span>
                          <ChevronRight className="w-2.5 h-2.5 text-foreground/20" />
                          <span className="text-xs font-semibold text-foreground">{skill.current}%</span>
                          {improved && <ArrowUp className="w-2.5 h-2.5 text-emerald-500" />}
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden flex">
                        <div className="h-full bg-foreground/15 rounded-l-full transition-all" style={{ width: `${skill.previous}%` }} />
                        <div className={`h-full rounded-r-full transition-all ${skill.current >= 80 ? "bg-emerald-500" : skill.current >= 60 ? "bg-primary" : "bg-amber-500"}`} style={{ width: `${Math.max(skill.current - skill.previous, 0)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-border text-xs font-medium text-foreground/50 hover:text-foreground hover:bg-muted transition-all cursor-pointer">
              View Full Skill Breakdown <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}