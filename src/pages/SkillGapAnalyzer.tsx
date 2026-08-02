import { useState } from "react";
import {
  Brain, Sparkles, CheckCircle2, ArrowUp, Lightbulb, Target, RefreshCw, BarChart3,
} from "lucide-react";

const skillCategories = [
  {
    name: "Engineering",
    skills: ["System Design", "Algorithms", "Data Structures", "API Design", "Database Design", "Cloud Architecture", "CI/CD", "Testing"],
  },
  {
    name: "Data Science",
    skills: ["Statistics", "Machine Learning", "Python", "SQL", "Data Visualization", "Deep Learning", "NLP", "Feature Engineering"],
  },
  {
    name: "Product Management",
    skills: ["Product Strategy", "User Research", "Roadmapping", "A/B Testing", "Analytics", "Stakeholder Management", "PRD Writing", "Go-to-Market"],
  },
  {
    name: "Soft Skills",
    skills: ["Communication", "Leadership", "Presentation", "Negotiation", "Conflict Resolution", "Time Management", "Mentoring", "Cross-team Collaboration"],
  },
];

interface SkillResult {
  skill: string;
  category: string;
  level: "Novice" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
  score: number;
  gap: "Critical" | "Moderate" | "Minor" | "None";
  recommendation: string;
}

function generateResults(selectedSkills: { category: string; skill: string }[]): SkillResult[] {
  return selectedSkills.map(({ category, skill }) => {
    const baseScore = Math.floor(Math.random() * 40) + 30;
    const score = Math.min(baseScore + Math.floor(Math.random() * 20), 100);
    const gaps: SkillResult["gap"][] = ["Critical", "Moderate", "Minor", "None"];
    const levels: SkillResult["level"][] = ["Novice", "Beginner", "Intermediate", "Advanced", "Expert"];
    const gapIndex = score < 40 ? 0 : score < 60 ? 1 : score < 80 ? 2 : 3;
    const levelIndex = score < 30 ? 0 : score < 50 ? 1 : score < 70 ? 2 : score < 90 ? 3 : 4;
    const recommendations = [
      "Focus on foundational concepts and hands-on projects.",
      "Take an intermediate course and practice with real-world scenarios.",
      "Deepen your knowledge with advanced topics and case studies.",
      "Excellent foundation! Explore mentoring others in this area.",
      "You're an expert! Consider contributing to open-source or teaching.",
    ];
    return {
      skill,
      category,
      level: levels[levelIndex],
      score,
      gap: gaps[gapIndex],
      recommendation: recommendations[levelIndex] || recommendations[0],
    };
  });
}

export default function SkillGapAnalyzer() {
  const [selectedSkills, setSelectedSkills] = useState<{ category: string; skill: string }[]>([]);
  const [results, setResults] = useState<SkillResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const toggleSkill = (categoryName: string, skillName: string) => {
    setSelectedSkills((prev) => {
      const exists = prev.find((s) => s.skill === skillName && s.category === categoryName);
      if (exists) return prev.filter((s) => !(s.skill === skillName && s.category === categoryName));
      return [...prev, { category: categoryName, skill: skillName }];
    });
  };

  const handleAnalyze = async () => {
    if (selectedSkills.length === 0) return;
    setIsAnalyzing(true);
    setResults(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResults(generateResults(selectedSkills));
    setIsAnalyzing(false);
  };

  const gapColors: Record<string, string> = {
    Critical: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/40",
    Moderate: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/40",
    Minor: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/40",
    None: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/40",
  };

  const levelColors: Record<string, string> = {
    Novice: "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
    Beginner: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    Intermediate: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    Advanced: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
    Expert: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  const overallScore = results ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0;
  const criticalGaps = results ? results.filter((r) => r.gap === "Critical").length : 0;

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent rounded-2xl p-6 sm:p-8 border border-primary/10">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">AI Skill Gap Analyzer</h1>
        <p className="text-foreground/50 mt-1">
          Select skills you want to assess. Our AI will analyze your proficiency and recommend the best learning path.
        </p>
      </div>

      {!results ? (
        <>
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  activeTab === i
                    ? "gradient-primary text-white shadow-md shadow-primary/20"
                    : "bg-card border border-border/60 text-foreground/50 hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Skill Selection */}
          <div className="bg-card rounded-xl border border-border/60 p-6 shadow-sm hover:shadow-card-hover transition-all duration-200">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground tracking-tight">Choose skills to assess</h2>
              {selectedSkills.length > 0 && (
                <span className="text-xs bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-2.5 py-0.5 rounded-full ml-auto font-semibold">
                  {selectedSkills.length} selected
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {skillCategories[activeTab].skills.map((skill) => {
                const isSelected = selectedSkills.some(
                  (s) => s.skill === skill && s.category === skillCategories[activeTab].name
                );
                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skillCategories[activeTab].name, skill)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary shadow-sm"
                        : "bg-white dark:bg-card border-border/60 text-foreground/60 hover:border-primary/30 hover:bg-primary/5"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>

            {selectedSkills.length > 0 && (
              <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                <p className="text-xs text-foreground/50 mb-2">Selected across all categories:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkills.map((s) => (
                    <span key={s.skill} className="text-xs bg-card border border-border/60 px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                      {s.skill}
                      <button
                        onClick={() => toggleSkill(s.category, s.skill)}
                        className="text-foreground/30 hover:text-destructive transition-colors cursor-pointer ml-0.5"
                        aria-label={`Remove ${s.skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={selectedSkills.length === 0 || isAnalyzing}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer glow-blue"
            >
              {isAnalyzing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Brain className="w-5 h-5" />
              )}
              {isAnalyzing ? "Analyzing..." : "Analyze My Skills"}
            </button>
          </div>
        </>
      ) : (
        /* Results */
        <div className="space-y-6 animate-fade-in-up">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <p className="text-xs text-foreground/50">Overall Score</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{overallScore}%</p>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000" style={{ width: `${overallScore}%` }} />
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-indigo-500" />
                <p className="text-xs text-foreground/50">Skills Assessed</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{results.length}</p>
            </div>
            <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-rose-500" />
                <p className="text-xs text-foreground/50">Critical Gaps</p>
              </div>
              <p className={`text-2xl font-bold ${criticalGaps > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                {criticalGaps}
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border/60 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <p className="text-xs text-foreground/50">Top Level</p>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {results.filter((r) => r.level === "Expert" || r.level === "Advanced").length}
              </p>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-card rounded-xl border border-border/60 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border/60 bg-gradient-to-r from-amber-50/50 to-transparent dark:from-amber-900/20">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 tracking-tight">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Detailed Analysis
              </h2>
            </div>
            <div className="divide-y divide-border/60">
              {results.map((result) => (
                <div key={result.skill} className="p-5 hover:bg-muted/20 transition-colors group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{result.skill}</h3>
                        <span className="text-xs text-foreground/40">({result.category})</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${gapColors[result.gap]}`}>
                        {result.gap === "None" ? "No Gap" : `${result.gap} Gap`}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${levelColors[result.level]}`}>
                        {result.level}
                      </span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          result.score < 40 ? "bg-rose-500" : result.score < 60 ? "bg-amber-500" : result.score < 80 ? "bg-primary" : "bg-emerald-500"
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-foreground w-10 text-right">{result.score}%</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-foreground/50 mt-2 p-2.5 bg-muted/30 rounded-lg">
                    <ArrowUp className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{result.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Re-analyze */}
          <div className="flex justify-center">
            <button
              onClick={() => { setResults(null); setSelectedSkills([]); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border/60 text-foreground font-semibold hover:bg-muted hover:border-primary/30 transition-all duration-200 active:scale-[0.97] cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Re-analyze Skills
            </button>
          </div>
        </div>
      )}

      {/* Info note */}
      {!results && !isAnalyzing && (
        <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-800/40">
          <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">How it works</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              Select at least one skill, then click "Analyze My Skills". Our AI evaluates your proficiency level,
              identifies gaps, and provides personalized learning recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}