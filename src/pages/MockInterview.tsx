import { useState, useRef, useEffect } from "react";
import {
  GraduationCap,
  Send,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  Target,
  TrendingUp,
  BarChart3,
  Brain,
  ChevronDown,
  Volume2,
} from "lucide-react";

/* ── Types ──────────────────────────────────────────────────── */

type MessageRole = "assistant" | "user" | "feedback";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  feedback?: {
    score: number;
    strengths: string[];
    improvements: string[];
    sampleAnswer: string;
    confidenceTips: string[];
  };
  question?: Question;
}

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

/* ── Constants ──────────────────────────────────────────────── */

const roles = [
  "Software Engineer",
  "Senior Software Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
  "Engineering Manager",
];

const experienceLevels = ["Junior (0-2 yrs)", "Mid (3-5 yrs)", "Senior (6-10 yrs)", "Lead (10+ yrs)"];

const questionBank: Record<string, Question[]> = {
  "Software Engineer": [
    { id: 1, question: "Explain how you would design a URL shortening service like TinyURL.", category: "System Design", difficulty: "Medium" },
    { id: 2, question: "Describe the difference between REST and GraphQL APIs. When would you use each?", category: "API Design", difficulty: "Medium" },
    { id: 3, question: "How would you optimize a slow database query causing performance issues?", category: "Database", difficulty: "Hard" },
    { id: 4, question: "Walk me through implementing a caching layer in a web application.", category: "Architecture", difficulty: "Medium" },
    { id: 5, question: "Explain how garbage collection works in modern programming languages.", category: "Computer Science", difficulty: "Easy" },
    { id: 6, question: "How would you scale a web application to handle 10x traffic?", category: "Scalability", difficulty: "Hard" },
    { id: 7, question: "Describe your approach to debugging a production issue.", category: "Troubleshooting", difficulty: "Medium" },
    { id: 8, question: "What factors do you consider when choosing a database for a new service?", category: "Database", difficulty: "Easy" },
  ],
  "Frontend Engineer": [
    { id: 1, question: "How would you optimize a React application's rendering performance?", category: "React", difficulty: "Medium" },
    { id: 2, question: "Explain the difference between controlled and uncontrolled components.", category: "React", difficulty: "Easy" },
    { id: 3, question: "Describe a strategy for managing complex state in a large application.", category: "State Management", difficulty: "Hard" },
    { id: 4, question: "How would you implement an accessible dropdown component?", category: "Accessibility", difficulty: "Medium" },
    { id: 5, question: "What's your approach to responsive design and mobile-first development?", category: "CSS", difficulty: "Easy" },
  ],
  "Data Scientist": [
    { id: 1, question: "Explain bias-variance tradeoff in machine learning models.", category: "ML Theory", difficulty: "Medium" },
    { id: 2, question: "How would you handle imbalanced datasets?", category: "Data Processing", difficulty: "Medium" },
    { id: 3, question: "Describe the difference between bagging and boosting.", category: "ML Ensembles", difficulty: "Medium" },
    { id: 4, question: "Walk me through building a recommendation system from scratch.", category: "ML Systems", difficulty: "Hard" },
    { id: 5, question: "What metrics would you use to evaluate a classification model?", category: "Evaluation", difficulty: "Easy" },
  ],
  default: [
    { id: 1, question: "Tell me about a challenging project you worked on and how you overcame obstacles.", category: "Behavioral", difficulty: "Easy" },
    { id: 2, question: "How do you stay current with industry trends and new technologies?", category: "Professional Development", difficulty: "Easy" },
    { id: 3, question: "Describe a time you had to influence a team decision without formal authority.", category: "Leadership", difficulty: "Medium" },
    { id: 4, question: "How would you approach breaking down a complex problem into manageable pieces?", category: "Problem Solving", difficulty: "Medium" },
    { id: 5, question: "Tell me about a time you received constructive criticism and how you handled it.", category: "Behavioral", difficulty: "Easy" },
    { id: 6, question: "Describe a situation where you disagreed with a technical decision.", category: "Conflict Resolution", difficulty: "Medium" },
    { id: 7, question: "How would you explain a complex technical concept to a non-technical stakeholder?", category: "Communication", difficulty: "Easy" },
  ],
};

/* ── Helpers ─────────────────────────────────────────────────── */

function generateQuestionFeedback(q: Question, answer: string) {
  const wordCount = answer.split(/\s+/).filter(Boolean).length;

  // Score: based on answer quality signals
  const hasStructure = /\b(first|second|third|finally|initially|subsequently|ultimately)\b/i.test(answer);
  const hasMetrics = /\b(\d+|percent|%|increased|decreased|reduced|improved)\b/i.test(answer);
  const hasExample = /\b(for example|for instance|such as|specifically|in one case)\b/i.test(answer);
  const hasTechnical = /\b(architecture|scalable|latency|throughput|cache|database|api|algorithm)\b/i.test(answer);
  const lengthScore = wordCount < 15 ? 30 : wordCount < 30 ? 50 : wordCount < 50 ? 65 : 75;

  const qualityScore = [hasStructure, hasMetrics, hasExample, hasTechnical].filter(Boolean).length * 8;
  const rawScore = Math.min(lengthScore + qualityScore + Math.floor(Math.random() * 10), 96);
  const score = Math.max(rawScore, 25);

  // Strengths
  const strengths: string[] = [];
  if (wordCount >= 30) strengths.push("Good response length — you provided sufficient detail");
  if (hasStructure) strengths.push("Clear structure with logical flow and transitions");
  if (hasMetrics) strengths.push("Effective use of specific metrics and data points");
  if (hasExample) strengths.push("Strong use of concrete examples to illustrate your point");
  if (hasTechnical) strengths.push("Demonstrates solid technical understanding of key concepts");
  if (strengths.length === 0) strengths.push("You attempted to address the question directly");
  if (strengths.length === 1) strengths.push("There's potential to expand with more detail");

  // Improvements
  const improvements: string[] = [];
  if (wordCount < 30) improvements.push("Expand your answer with more detail — aim for 3-5 sentences");
  if (!hasStructure) improvements.push("Structure your response with clear sections (e.g. situation, approach, outcome)");
  if (!hasMetrics) improvements.push("Include specific metrics or results to make your answer more impactful");
  if (!hasExample) improvements.push("Add a concrete example from your experience to ground the answer");
  if (!hasTechnical && q.category !== "Behavioral") improvements.push("Use more technical terminology specific to this domain");
  if (improvements.length === 0) improvements.push("Consider mentioning trade-offs or alternative approaches you evaluated");
  if (improvements.length === 1) improvements.push("Review your answer for conciseness — every sentence should add value");

  // Sample answer
  const sampleAnswerMap: Record<string, string> = {
    "System Design":
      `A strong answer would start by clarifying requirements (scale, features). Then outline the high-level architecture: a web server layer, a short-code generation service, a database for mapping, and a caching layer (e.g. Redis) for hot URLs. Discuss trade-offs — base-62 encoding vs hashing, SQL vs NoSQL for the mapping table, how to handle collisions, and estimate storage needs. End with how you'd monitor and iterate.`,
    "API Design":
      `Start with key differences: REST uses fixed endpoints with HTTP verbs; GraphQL has a single endpoint with client-defined queries. REST is simpler for CRUD and benefits from HTTP caching. GraphQL excels when clients need different data shapes or when aggregating multiple resources. Mention real trade-offs: GraphQL's complexity with file uploads and rate limiting, REST's over-fetching problem. Recommend evaluating team expertise and use case.`,
    "Database":
      `Begin by identifying the bottleneck — is it a full table scan, missing index, or N+1 query? Use EXPLAIN ANALYZE to understand the query plan. Common fixes: add composite indexes, rewrite with JOINs instead of subqueries, denormalize for read-heavy workloads, or introduce a read replica. For specific cases, consider query caching or materialized views. Always measure before and after.`,
    "React":
      `Focus on key techniques: React.memo for pure components, useMemo/useCallback to avoid re-computation, virtualization (react-window) for long lists, code splitting with React.lazy, and profiling with React DevTools. Caution against premature optimization — profile first, then optimize the actual bottlenecks. Discuss the trade-off between memoization overhead and render cost.`,
  };
  const sampleForCategory = sampleAnswerMap[q.category];
  const sampleAnswer = sampleForCategory || (
    `A strong answer would follow the STAR method: describe the ${q.category === "Behavioral" ? "Situation and Task, the Action you took, and the Result achieved" : "context, your technical approach, the specific implementation details, and the outcome or trade-offs you considered"}. Keep it concise yet thorough, and tie it back to the role you're interviewing for.`
  );

  // Confidence tips (NEW)
  const confidenceTips = [
    "Speak slowly and deliberately — pausing before key points signals confidence",
    "Use the 'preview statement' technique: 'I'll approach this in three parts...' to buy thinking time",
    "If you don't know something, say 'I don't have direct experience with that, but here's how I'd reason through it'",
    "Keep a glass of water nearby — dry mouth is a common nervousness symptom",
    "Practice power poses for 2 minutes before the interview to boost confidence",
    "Remember: interviewers want you to succeed — they're evaluating potential, not perfection",
    "Use your hands to gesture while speaking — it can help organize your thoughts",
    "If you go blank, ask for a moment to collect your thoughts — it shows composure, not weakness",
  ];

  // Pick 3 tips based on the weaknesses detected
  const selectedTips: string[] = [];
  if (!hasStructure) selectedTips.push(confidenceTips[1]);
  if (wordCount < 30) selectedTips.push(confidenceTips[2]);
  selectedTips.push(confidenceTips[5]);
  if (selectedTips.length < 3) selectedTips.push(confidenceTips[3]);
  if (selectedTips.length < 3) selectedTips.push(confidenceTips[0]);

  return { score, strengths, improvements, sampleAnswer, confidenceTips: selectedTips.slice(0, 3) };
}

function getScoreColor(score: number) {
  if (score >= 80) return "emerald";
  if (score >= 60) return "amber";
  if (score >= 40) return "orange";
  return "rose";
}

function getScoreLabel(score: number) {
  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Work";
  return "Practice More";
}

/* ── Sub-Components ──────────────────────────────────────────── */

function ScoreBadge({ score }: { score: number }) {
  const color = getScoreColor(score);
  const map = {
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/40",
    amber: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/40",
    orange: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800/40",
    rose: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800/40",
  };
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${map[color]}`}>
      <BarChart3 className="w-3.5 h-3.5" />
      Score: {score}%
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */

export default function MockInterview() {
  const [step, setStep] = useState<"setup" | "interview">("setup");
  const [selectedRole, setSelectedRole] = useState("");
  const [experience, setExperience] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [allFeedback, setAllFeedback] = useState<Message["feedback"][]>([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Track scroll position for "scroll to bottom" button
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const startInterview = () => {
    if (!selectedRole || !experience) return;
    const bank = questionBank[selectedRole] || questionBank.default;
    const shuffled = [...bank].sort(() => Math.random() - 0.5).slice(0, 4);
    setQuestions(shuffled);
    setQuestionIndex(0);
    setAllFeedback([]);

    const firstQ = shuffled[0];
    const welcomeMsg: Message = {
      id: "welcome",
      role: "assistant",
      content: `I'll be your AI interviewer today. I've prepared 4 questions for a **${selectedRole}** role (${experience}). Take your time with each answer. Ready? Here's your first question.`,
    };
    const firstQuestionMsg: Message = {
      id: `q-${firstQ.id}`,
      role: "assistant",
      content: firstQ.question,
      question: firstQ,
    };
    setMessages([welcomeMsg, firstQuestionMsg]);
    setStep("interview");
  };

  const handleSubmitAnswer = async () => {
    const answer = currentInput.trim();
    if (!answer || isProcessing) return;

    setIsProcessing(true);
    const currentQ = questions[questionIndex];

    // Add the user's answer message
    const userMsg: Message = {
      id: `a-${currentQ.id}-${Date.now()}`,
      role: "user",
      content: answer,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentInput("");

    // Simulate AI processing delay
    await new Promise((r) => setTimeout(r, 1200));

    // Generate feedback
    const feedback = generateQuestionFeedback(currentQ, answer);
    setAllFeedback((prev) => [...prev, feedback]);

    // Add feedback message as an assistant message with feedback data
    const feedbackMsg: Message = {
      id: `f-${currentQ.id}`,
      role: "feedback",
      content: "",
      feedback,
      question: currentQ,
    };

    const nextIndex = questionIndex + 1;

    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      const nextQMsg: Message = {
        id: `q-${nextQ.id}`,
        role: "assistant",
        content: nextQ.question,
        question: nextQ,
      };
      setMessages((prev) => [...prev, feedbackMsg, nextQMsg]);
      setQuestionIndex(nextIndex);
    } else {
      // Last question — only feedback, then session complete
      setMessages((prev) => [...prev, feedbackMsg]);
      setQuestionIndex(nextIndex);
    }

    setIsProcessing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
    }
  };

  const resetInterview = () => {
    setStep("setup");
    setMessages([]);
    setQuestions([]);
    setQuestionIndex(0);
    setCurrentInput("");
    setAllFeedback([]);
  };

  const overallScore =
    allFeedback.length > 0
      ? Math.round(allFeedback.reduce((sum, f) => sum + (f?.score || 0), 0) / allFeedback.length)
      : 0;

  /* ── Render ────────────────────────────────────────────────── */

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-w-4xl mx-auto">
      {step === "setup" && (
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="w-full max-w-2xl space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Mock Interview</h1>
              <p className="text-foreground/50 mt-1 text-sm">
                Practice with AI-generated questions. Get instant feedback after every answer.
              </p>
            </div>

            {/* Setup Card */}
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2.5">Target Role</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer ${
                        selectedRole === role
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary shadow-sm"
                          : "bg-card border-border text-foreground/60 hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2.5">Experience Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setExperience(level)}
                      className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer ${
                        experience === level
                          ? "bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 text-primary shadow-sm"
                          : "bg-card border-border text-foreground/60 hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={startInterview}
                disabled={!selectedRole || !experience}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                Start Interview
              </button>

              <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-800/40">
                <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <p>You'll answer 4 questions tailored to your role.</p>
                  <p>After each answer, you'll receive instant feedback including a score, strengths, areas to improve, a sample answer, and confidence tips.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "interview" && (
        <div className="flex-1 flex flex-col bg-card rounded-2xl border border-border overflow-hidden shadow-card">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">AI Interviewer</h2>
                <p className="text-[10px] text-foreground/40">
                  {selectedRole} · {experience}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className="flex items-center gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i < questionIndex ? "bg-emerald-500" :
                      i === questionIndex ? "bg-primary shadow-[0_0_6px_rgba(37,99,235,0.4)]" :
                      "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-foreground/40 font-medium">
                {Math.min(questionIndex, questions.length)}/{questions.length}
              </span>
              <button
                onClick={resetInterview}
                className="p-1.5 rounded-lg text-foreground/30 hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                title="End interview"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6"
            role="log"
            aria-live="polite"
            aria-label="Interview conversation"
          >
            {messages.map((msg) => {
              if (msg.role === "feedback" && msg.feedback) {
                return <FeedbackCard key={msg.id} feedback={msg.feedback} question={msg.question!} />;
              }
              return <MessageBubble key={msg.id} message={msg} />;
            })}

            {/* Processing indicator */}
            {isProcessing && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="text-xs text-foreground/40 ml-1">Analyzing your answer...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Session complete banner */}
            {questionIndex >= questions.length && !isProcessing && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 text-emerald-700 dark:from-emerald-900/30 dark:to-emerald-800/30 dark:border-emerald-800/40 dark:text-emerald-400 text-sm font-medium mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Interview Complete
                </div>
                <div className="bg-card rounded-xl border border-border p-6 shadow-card max-w-sm mx-auto">
                  <p className="text-xs text-foreground/50 mb-1">Overall Performance</p>
                  <div className="text-4xl font-extrabold text-gradient">{overallScore}%</div>
                  <p className="text-[10px] text-foreground/40 mt-1">
                    {getScoreLabel(overallScore)}
                  </p>
                  <button
                    onClick={resetInterview}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-xs font-semibold shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-[0.97] cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Another Interview
                  </button>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t border-border bg-background px-4 sm:px-6 py-4">
            <div className="flex items-end gap-3 max-w-3xl mx-auto">
              <div className="flex-1 relative">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={questionIndex >= questions.length ? "Interview complete — start a new session" : "Type your answer... (Enter to submit, Shift+Enter for new line)"}
                  rows={1}
                  disabled={questionIndex >= questions.length || isProcessing}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150 resize-none disabled:opacity-50"
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
                  }}
                />
              </div>
              <button
                onClick={handleSubmitAnswer}
                disabled={!currentInput.trim() || isProcessing || questionIndex >= questions.length}
                className="flex-shrink-0 w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 active:scale-[0.9] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Send answer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scroll to bottom button */}
          {showScrollButton && (
            <button
              onClick={() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="absolute bottom-20 right-8 w-9 h-9 rounded-full bg-card border border-border shadow-card flex items-center justify-center text-foreground/50 hover:text-foreground hover:shadow-card-hover transition-all cursor-pointer"
              aria-label="Scroll to latest message"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Message Bubble ──────────────────────────────────────────── */

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? "bg-gradient-to-br from-secondary to-primary" : "gradient-primary"
      }`}>
        {isUser ? (
          <span className="text-[10px] font-bold text-white">U</span>
        ) : (
          <Brain className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "order-1" : "order-1"}`}>
        <div className={`px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-tr-none shadow-sm"
            : "bg-muted text-foreground rounded-2xl rounded-tl-none"
        }`}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {/* Meta info */}
        {isAssistant && message.question && (
          <div className="flex items-center gap-2 mt-1.5 px-1">
            {message.question.difficulty && (
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                message.question.difficulty === "Easy" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" :
                message.question.difficulty === "Medium" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
              }`}>
                {message.question.difficulty}
              </span>
            )}
            {message.question.category && (
              <span className="text-[10px] text-foreground/40">{message.question.category}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Feedback Card ────────────────────────────────────────────── */

function FeedbackCard({ feedback, question }: { feedback: NonNullable<Message["feedback"]>; question: Question }) {
  const color = getScoreColor(feedback.score);
  const colorRing = color === "emerald" ? "stroke-emerald-500" :
    color === "amber" ? "stroke-amber-500" :
    color === "orange" ? "stroke-orange-500" : "stroke-rose-500";
  const colorBg = color === "emerald" ? "bg-emerald-50" :
    color === "amber" ? "bg-amber-50" :
    color === "orange" ? "bg-orange-50" : "bg-rose-50";
  const colorText = color === "emerald" ? "text-emerald-700" :
    color === "amber" ? "text-amber-700" :
    color === "orange" ? "text-orange-700" : "text-rose-700";

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
        <BarChart3 className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-[85%] sm:max-w-[80%] space-y-3">
        {/* Score indicator */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-card shadow-sm">
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg width="40" height="40" viewBox="0 0 40 40" className="transform -rotate-90">
              <circle cx="20" cy="20" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
              <circle
                cx="20" cy="20" r="16"
                fill="none"
                className={colorRing}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={2 * Math.PI * 16 * (1 - feedback.score / 100)}
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
              {feedback.score}%
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{getScoreLabel(feedback.score)}</p>
            <p className="text-[10px] text-foreground/40">{question.difficulty} · {question.category}</p>
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Strengths
          </h4>
          <ul className="space-y-1.5">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="text-xs text-foreground/60 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <h4 className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Areas to Improve
          </h4>
          <ul className="space-y-1.5">
            {feedback.improvements.map((imp, i) => (
              <li key={i} className="text-xs text-foreground/60 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                {imp}
              </li>
            ))}
          </ul>
        </div>

        {/* Sample Answer */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 dark:from-blue-900/30 dark:to-indigo-900/30 dark:border-blue-800/40">
          <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" />
            Better Sample Answer
          </h4>
          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">{feedback.sampleAnswer}</p>
        </div>

        {/* Confidence Tips */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-4 dark:from-purple-900/30 dark:to-pink-900/30 dark:border-purple-800/40">
          <h4 className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Confidence Tips
          </h4>
          <ul className="space-y-1.5">
            {feedback.confidenceTips.map((tip, i) => (
              <li key={i} className="text-xs text-purple-600 dark:text-purple-400 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
