import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  accent?: "blue" | "indigo" | "green" | "amber" | "rose";
}

const accentMap = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400",
  rose: "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400",
};

const accentGradientMap = {
  blue: "from-blue-500/20 via-blue-500/5 to-transparent",
  indigo: "from-indigo-500/20 via-indigo-500/5 to-transparent",
  green: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  amber: "from-amber-500/20 via-amber-500/5 to-transparent",
  rose: "from-rose-500/20 via-rose-500/5 to-transparent",
};

const changeColorMap = {
  positive: "text-emerald-600 dark:text-emerald-400",
  negative: "text-rose-600 dark:text-rose-400",
  neutral: "text-foreground/50",
};

const changeBgMap = {
  positive: "bg-emerald-50 dark:bg-emerald-900/30",
  negative: "bg-rose-50 dark:bg-rose-900/30",
  neutral: "bg-muted",
};

export default function StatCard({ title, value, change, changeType = "neutral", icon: Icon, accent = "blue" }: StatCardProps) {
  return (
    <div className="relative bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 group overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentGradientMap[accent]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground/50">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${changeBgMap[changeType]} ${changeColorMap[changeType]}`}>
              {change}
            </span>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${accentMap[accent]} flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}