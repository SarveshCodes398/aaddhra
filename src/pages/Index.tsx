import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Users, TrendingUp, Star, CheckCircle, ArrowRight, Globe, Lock, Award } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const STATS = [
  { label: "Active Workers", value: "2.4M+" },
  { label: "Jobs Completed", value: "18M+" },
  { label: "Avg. Wage", value: "₹312/hr" },
  { label: "Countries", value: "5" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "e-Shram Verified",
    desc: "Every Indian worker is linked to their UAN via the Social Security Code 2020.",
    color: "text-emerald",
  },
  {
    icon: Lock,
    title: "Digital Escrow",
    desc: "Payments locked in escrow until both parties confirm delivery. Zero scam tolerance.",
    color: "text-sapphire",
  },
  {
    icon: TrendingUp,
    title: "Floor Wage Enforced",
    desc: "All Indian job posts must meet the ₹176/hr national floor wage. No exploitation.",
    color: "text-gold",
  },
  {
    icon: Zap,
    title: "AI Skill Match",
    desc: "Gemini-powered matching surfaces only 80%+ compatible jobs for high-skill workers.",
    color: "text-emerald",
  },
  {
    icon: Users,
    title: "Mediator Workflow",
    desc: "Disputes handled by certified platform mediators — neutral, fast, binding.",
    color: "text-sapphire",
  },
  {
    icon: Award,
    title: "Wage Leaderboard",
    desc: "Real-time transparency on top-paying categories and fair-wage champions.",
    color: "text-gold",
  },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Full-stack Dev", country: "🇮🇳 India", text: "Aaddhra's escrow gave me confidence to take on big clients. Floor wage protection changed my life.", rating: 5 },
  { name: "Rahul M.", role: "UI Designer", country: "🇮🇳 India", text: "My e-Shram UAN is right in my profile. Clients trust me instantly. Skill match is incredibly accurate.", rating: 5 },
  { name: "Sarah K.", role: "Client, SaaS Co.", country: "🇬🇧 UK", text: "Found 3 verified Indian developers in under an hour. The AI mediator resolved a minor dispute in 2 days.", rating: 5 },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "hsl(220 20% 7% / 0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid hsl(220 15% 18% / 0.5)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 50%))" }}>
            <span className="text-xs font-display font-bold text-background">A</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground">Aaddhra</span>
          <span className="badge-gold ml-2 hidden sm:inline-flex">Beta</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["Platform", "For Workers", "For Clients", "Trust & Safety"].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/auth")} className="nav-link px-4 py-2 rounded-lg transition-colors hover:text-foreground">Sign In</button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-xl font-semibold text-sm glow-gold"
            style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroBg} alt="Aaddhra hero" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(220 20% 7% / 0.3) 0%, hsl(220 20% 7%) 100%)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="badge-gold mb-6 inline-flex items-center gap-2">
              <Globe size={12} /> India's First Fair-Wage Gig Platform
            </span>
          </motion.div>

          <motion.h1
            className="font-display font-bold leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Work Fairly.<br />
            <span className="text-gold-gradient">Earn Fairly.</span><br />
            Protected by Law.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "hsl(var(--muted-foreground))" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            Aaddhra enforces India's Social Security Code 2020, ₹176/hr floor wages, and e-Shram UAN verification — so every gig is protected, every rupee is fair.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg glow-gold"
              style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
            >
              Start as a Worker <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg glass-card border"
              style={{ borderColor: "hsl(var(--glass-border))" }}
            >
              Hire Verified Talent
            </motion.button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div className="flex flex-wrap justify-center gap-4 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
            {["Ministry of Labour Aligned", "Cloudflare Protected", "AI-Powered Escrow", "e-Shram Integrated"].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <CheckCircle size={14} className="text-emerald" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          {STATS.map(s => (
            <motion.div key={s.label} variants={item} className="glass-card p-6 text-center">
              <div className="text-3xl font-display font-bold text-gold-gradient mb-1">{s.value}</div>
              <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-4xl mb-4">Built on Indian Trust</h2>
            <p style={{ color: "hsl(var(--muted-foreground))" }}>Every feature enforces a law, protects a worker, or shields a client.</p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {FEATURES.map(f => (
              <motion.div key={f.title} variants={item} className="glass-card-hover p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "hsl(var(--muted))" }}>
                  <f.icon size={22} className={f.color} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="font-display font-bold text-3xl text-center mb-12"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          >
            Voices from the Platform
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            {TESTIMONIALS.map(t => (
              <motion.div key={t.name} variants={item} className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="text-gold fill-current" style={{ color: "hsl(var(--gold))", fill: "hsl(var(--gold))" }} />)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>"{t.text}"</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{t.role} · {t.country}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center glass-card p-12"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ border: "1px solid hsl(43 95% 56% / 0.25)" }}
        >
          <div className="shimmer absolute inset-0 rounded-2xl pointer-events-none" />
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">India Deserves Better Gig Work</h2>
          <p className="mb-8 text-lg" style={{ color: "hsl(var(--muted-foreground))" }}>Join 2.4M+ workers and clients building a fair digital economy.</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/auth")}
            className="px-10 py-4 rounded-2xl font-bold text-lg glow-gold"
            style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
          >
            Join Aaddhra Free
          </motion.button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-sm" style={{ borderTop: "1px solid hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}>
        <span className="font-display font-semibold text-foreground">Aaddhra</span> · Aligned with India's Social Security Code 2020 · Ministry of Labour & Employment · © 2025
      </footer>
    </div>
  );
}
