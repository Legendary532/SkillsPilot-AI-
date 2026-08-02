import { Link } from "react-router-dom";
import {
  ArrowRight, Brain, GraduationCap, BarChart3, Sparkles,
  Target, Shield, Star, ChevronRight, CheckCircle2, Layers, Zap, RefreshCw
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: Brain,
    title: "AI Skill Gap Analysis",
    description: "Identify strengths and weaknesses with AI-powered assessments. Get a personalized roadmap to bridge your skill gaps.",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
    border: "border-blue-100 dark:border-blue-900/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    icon: GraduationCap,
    title: "Mock Interviews",
    description: "Practice with AI-driven interview simulations tailored to your industry. Receive real-time feedback and improve your responses.",
    gradient: "from-indigo-500/20 via-indigo-500/5 to-transparent",
    border: "border-indigo-100 dark:border-indigo-900/30",
    iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
  {
    icon: BarChart3,
    title: "Progress Reports",
    description: "Visualize your learning journey with detailed analytics. Track skill growth, completion rates, and mastery levels over time.",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-100 dark:border-emerald-900/30",
    iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    content: "SkillPilot helped me identify critical gaps in my system design knowledge. After following the recommended path, I aced my senior engineer interview.",
    rating: 5,
  },
  {
    name: "Marcus Rivera",
    role: "Product Manager at Stripe",
    content: "The mock interview feature is incredible. The AI feedback on my product strategy answers was spot-on and helped me land my dream role.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Data Scientist at Airbnb",
    content: "I love how the dashboard tracks my progress across different skill areas. It's like having a personal career coach available 24/7.",
    rating: 5,
  },
];

const howItWorks = [
  { step: "01", icon: Target, title: "Analyze", desc: "Take an AI-powered assessment to map your current skill landscape across dozens of competencies." },
  { step: "02", icon: Layers, title: "Learn", desc: "Follow a personalized curriculum designed to close your specific gaps with targeted content." },
  { step: "03", icon: Zap, title: "Succeed", desc: "Practice with mock interviews and prove your readiness for the next level in your career." },
];

const stats = [
  { value: "10K+", label: "Active Learners" },
  { value: "95%", label: "Success Rate" },
  { value: "500+", label: "Skill Tracks" },
  { value: "4.9★", label: "User Rating" },
];

const logos = ["Stripe", "Linear", "Notion", "Vercel", "Figma"];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden">
        {/* Premium mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-blue-50/60 via-indigo-50/30 to-background dark:from-background dark:via-blue-950/20 dark:via-indigo-950/10" />
        {/* Mesh gradient blobs */}
        <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[700px] bg-gradient-to-br from-primary/12 to-secondary/10 rounded-full blur-[120px] animate-breath" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-accent/8 to-primary/10 rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-gradient-to-br from-secondary/8 to-accent/6 rounded-full blur-[80px] animate-float" />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-50" />

        {/* Noise texture */}
        <div className="absolute inset-0 noise" />

        {/* Floating decorative elements */}
        <div className="absolute top-24 left-[8%] w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 rotate-12 animate-float hidden lg:block border border-white/20 backdrop-blur-sm" />
        <div className="absolute bottom-40 right-[12%] w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 -rotate-6 animate-float-delayed hidden lg:block border border-white/20 backdrop-blur-sm" />
        <div className="absolute top-1/3 right-[25%] w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 rotate-45 animate-float hidden lg:block border border-white/20 backdrop-blur-sm" />
        <div className="absolute top-[60%] left-[15%] w-8 h-8 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 animate-orbit hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-primary/20 text-sm font-medium mb-8 shadow-sm animate-fade-in-up dark:bg-card/60">
              <div className="w-5 h-5 rounded-md gradient-primary flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold">
                AI-Powered Learning Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight animate-fade-in-up">
              Master Skills Faster
              <br />
              <span className="text-gradient">with AI Guidance</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/50 leading-relaxed animate-fade-in-up-delayed">
              SkillPilot AI analyzes your current abilities, identifies gaps, and creates a personalized
              learning path. Practice with AI mock interviews and track every milestone.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delayed-2">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-primary text-white text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-200 active:scale-[0.97] glow-blue"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-border bg-white/50 backdrop-blur-sm text-foreground font-semibold hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 active:scale-[0.97] cursor-pointer dark:bg-card/50"
              >
                Explore Features
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up-delayed-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-5 rounded-2xl bg-white/50 backdrop-blur border border-border/40 hover:bg-white/70 hover:shadow-sm transition-all duration-200 dark:bg-card/40 dark:hover:bg-card/60"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-gradient">{stat.value}</p>
                <p className="text-sm text-foreground/50 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Social proof logos */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 animate-fade-in-up-delayed-4">
            <span className="text-xs text-foreground/30 uppercase tracking-widest font-semibold">Trusted by teams at</span>
            {logos.map((logo) => (
              <span key={logo} className="text-sm font-bold text-foreground/20 dark:text-foreground/15 hover:text-foreground/40 transition-colors duration-200 tracking-tight cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-24 bg-white dark:bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              Core Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Everything you need to grow
            </h2>
            <p className="mt-4 text-lg text-foreground/50 max-w-2xl mx-auto">
              Three powerful tools designed to accelerate your career growth through intelligent, personalized learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl border border-border/60 p-8 shadow-sm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                {/* Top gradient line */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />

                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 shadow-md transition-all duration-200 group-hover:scale-110 group-hover:-rotate-3`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-foreground/50 leading-relaxed text-sm">{feature.description}</p>
                </div>

                {/* Bottom accent dot */}
                <div className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-primary/20 group-hover:bg-primary/60 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-white dark:to-card/30 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 noise" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 border border-secondary/10 text-sm font-medium text-secondary mb-6">
              <Target className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              How SkillPilot Works
            </h2>
            <p className="mt-4 text-lg text-foreground/50 max-w-2xl mx-auto">
              Three simple steps to transform your career trajectory.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent/30 animate-shimmer" />
            </div>

            {howItWorks.map((item) => (
              <div key={item.step} className="text-center relative group">
                {/* Icon container */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-full h-full rounded-2xl gradient-primary flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/50 text-sm max-w-xs mx-auto leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white dark:bg-card/50 relative">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm font-medium text-emerald-600 dark:bg-emerald-900/30 dark:border-emerald-800/40 dark:text-emerald-400 mb-6">
              <Star className="w-4 h-4" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Loved by professionals
            </h2>
            <p className="mt-4 text-lg text-foreground/50 max-w-2xl mx-auto">
              Hear from learners who transformed their careers with SkillPilot.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative bg-card rounded-2xl border border-border/60 p-6 shadow-sm hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Quote decoration */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-lg font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                  &ldquo;
                </div>

                {/* Gradient top line on hover */}
                <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />

                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3.5 pt-4 border-t border-border/40">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-foreground/40">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="absolute inset-0 noise" />
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-300/20 rounded-full blur-[60px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to accelerate your career?
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              Join thousands of professionals who are mastering skills faster with AI-powered guidance.
              No credit card required.
            </p>
            <Link
              to="/login"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-white text-blue-700 text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 active:scale-[0.97]"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <div className="flex items-center justify-center gap-6 mt-8">
              {["No credit card", "Free forever", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-xs text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/40" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}