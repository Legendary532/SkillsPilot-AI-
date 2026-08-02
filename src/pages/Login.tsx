import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (isSignUp && !name) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      if (isSignUp) {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - brand */}
      <div className="hidden lg:flex flex-col justify-center w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 noise">
        {/* Decorative elements */}
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[80px]" />
        <div className="absolute top-[40%] left-[20%] w-20 h-20 rounded-2xl bg-white/5 backdrop-blur border border-white/10 rotate-12 animate-float" />
        <div className="absolute bottom-[30%] right-[15%] w-12 h-12 rounded-xl bg-white/5 backdrop-blur border border-white/10 -rotate-6 animate-float-delayed" />

        <div className="relative z-10 px-16">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur border border-white/10 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">SkillPilot AI</span>
          </div>

          <h1 className="text-4xl font-extrabold text-white leading-tight mb-6">
            Your AI-powered<br />career accelerator
          </h1>
          <p className="text-lg text-white/70 max-w-md mb-10">
            Identify skill gaps, practice with AI interviews, and track your growth — all in one place.
          </p>

          <div className="space-y-4">
            {[
              "Personalized skill gap analysis",
              "AI mock interviews with feedback",
              "Real-time progress tracking",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-white/15 backdrop-blur border border-white/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Background subtle pattern */}
        <div className="absolute inset-0 dot-grid opacity-30" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">SkillPilot AI</span>
            </div>
          </div>

          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/60 p-8 shadow-elevated">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-foreground/50 text-sm mb-8">
              {isSignUp
                ? "Start your learning journey today."
                : "Sign in to continue your progress."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50/80 backdrop-blur border border-rose-200 text-rose-600 dark:bg-rose-900/30 dark:border-rose-800/40 dark:text-rose-400 text-sm flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  {error}
                </div>
              )}

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-foreground/60 mb-1.5">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-150" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-1.5">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-150" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/60 mb-1.5">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-150" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-background/50 backdrop-blur-sm text-foreground text-sm placeholder:text-foreground/25 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl gradient-primary text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer glow-blue"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-foreground/50">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                  className="text-primary font-semibold hover:text-primary-dark transition-colors cursor-pointer"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border/40 text-center">
              <Link to="/" className="text-sm text-foreground/40 hover:text-primary transition-colors duration-150 inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}