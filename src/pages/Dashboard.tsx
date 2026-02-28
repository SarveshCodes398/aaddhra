import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, Shield, Users, Zap, Award, Star, LogOut,
  Briefcase, Clock, CheckCircle, AlertTriangle, MessageCircle,
  BarChart2, Lock, Search
} from "lucide-react";
import { useUser } from "@/context/UserContext";

// Mock data
const MOCK_JOBS = [
  { id: 1, title: "React + Node.js Full-Stack App", client: "TechCorp India", wage: 320, match: 92, escrow: true, category: "Development", country: "India" },
  { id: 2, title: "UI/UX for SaaS Dashboard", client: "StartupXYZ", wage: 280, match: 88, escrow: true, category: "Design", country: "India" },
  { id: 3, title: "Python Data Pipeline Engineer", client: "DataFlow Ltd", wage: 450, match: 85, escrow: true, category: "Data", country: "India" },
  { id: 4, title: "WordPress Speed Optimization", client: "Agency Hub", wage: 180, match: 79, escrow: false, category: "Web", country: "India" },
  { id: 5, title: "Mobile App (Flutter)", client: "Founder Co.", wage: 390, match: 91, escrow: true, category: "Mobile", country: "India" },
];

const MOCK_WORKERS = [
  { id: 1, name: "Priya Sharma", role: "Full-Stack Dev", wage: 350, rating: 4.9, verified: true, eshram: true, jobs: 47, match: 94 },
  { id: 2, name: "Rahul Mehta", role: "UI Designer", wage: 290, rating: 4.8, verified: true, eshram: true, jobs: 32, match: 91 },
  { id: 3, name: "Ananya Roy", role: "Data Scientist", wage: 480, rating: 5.0, verified: true, eshram: true, jobs: 61, match: 96 },
  { id: 4, name: "Vikram Nair", role: "Mobile Dev", wage: 400, rating: 4.7, verified: true, eshram: false, jobs: 28, match: 87 },
  { id: 5, name: "Sneha Patel", role: "Backend Eng.", wage: 320, rating: 4.9, verified: true, eshram: true, jobs: 55, match: 93 },
];

const LEADERBOARD = [
  { rank: 1, name: "Ananya Roy", category: "Data Science", wage: 480, badge: "🏆" },
  { rank: 2, name: "Vikram Nair", category: "Mobile Dev", wage: 400, badge: "🥈" },
  { rank: 3, name: "Priya Sharma", category: "Full-Stack", wage: 350, badge: "🥉" },
  { rank: 4, name: "Rahul Mehta", category: "UI Design", wage: 290, badge: "⭐" },
  { rank: 5, name: "Sneha Patel", category: "Backend", wage: 320, badge: "⭐" },
];

const ESCROW_PROJECTS = [
  { id: 1, worker: "Priya Sharma", title: "E-commerce Platform", amount: 45000, status: "In Escrow", milestone: "Design Review", pct: 60 },
  { id: 2, worker: "Rahul Mehta", title: "Brand Identity Kit", amount: 18000, status: "Milestone Done", milestone: "Final Delivery", pct: 90 },
  { id: 3, worker: "Ananya Roy", title: "Analytics Dashboard", amount: 72000, status: "In Escrow", milestone: "Development", pct: 40 },
];

type Tab = "overview" | "jobs" | "leaderboard" | "community" | "projects";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [search, setSearch] = useState("");

  const isWorker = user?.role === "worker";
  const isIndia = user?.country === "India";

  const filteredJobs = MOCK_JOBS.filter(j =>
    j.wage >= 176 &&
    (search === "" || j.title.toLowerCase().includes(search.toLowerCase()) || j.category.toLowerCase().includes(search.toLowerCase()))
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = isWorker
    ? [
        { key: "overview", label: "Overview", icon: <BarChart2 size={16} /> },
        { key: "jobs", label: "Matched Jobs", icon: <Briefcase size={16} /> },
        { key: "leaderboard", label: "Wage Board", icon: <Award size={16} /> },
        { key: "community", label: "Community", icon: <Users size={16} /> },
      ]
    : [
        { key: "overview", label: "Overview", icon: <BarChart2 size={16} /> },
        { key: "jobs", label: "Talent Pool", icon: <Users size={16} /> },
        { key: "projects", label: "Escrow Status", icon: <Lock size={16} /> },
        { key: "community", label: "Community", icon: <MessageCircle size={16} /> },
      ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* Sidebar */}
      <div className="flex">
        <aside className="hidden lg:flex flex-col w-60 min-h-screen fixed left-0 top-0 p-5 gap-4" style={{ background: "hsl(var(--sidebar-background))", borderRight: "1px solid hsl(var(--sidebar-border))" }}>
          <div className="flex items-center gap-2 mb-4 mt-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))" }}>
              <span className="text-xs font-bold" style={{ color: "hsl(220 20% 7%)" }}>A</span>
            </div>
            <span className="font-display font-bold">Aaddhra</span>
          </div>

          <div className="flex-1 space-y-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={tab === t.key ? {
                  background: "hsl(43 95% 56% / 0.15)",
                  color: "hsl(var(--gold))",
                  border: "1px solid hsl(43 95% 56% / 0.25)"
                } : { color: "hsl(var(--sidebar-foreground))" }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* User info */}
          <div className="glass-card p-3 mt-auto">
            <div className="text-xs font-semibold truncate mb-0.5">{user?.email}</div>
            <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              {isWorker ? "👷 Worker" : "💼 Client"} · {user?.country}
            </div>
            {isIndia && <span className="badge-emerald mt-2 text-xs">e-Shram Active</span>}
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs mt-3 transition-colors" style={{ color: "hsl(var(--muted-foreground))" }}>
              <LogOut size={12} /> Sign Out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 lg:ml-60 p-6 pb-32">
          {/* Mobile nav */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <span className="font-display font-bold">Aaddhra</span>
            <button onClick={handleLogout} style={{ color: "hsl(var(--muted-foreground))" }}><LogOut size={18} /></button>
          </div>

          {/* Mobile tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto lg:hidden pb-1">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all"
                style={tab === t.key ? {
                  background: "hsl(43 95% 56% / 0.15)",
                  color: "hsl(var(--gold))",
                  border: "1px solid hsl(43 95% 56% / 0.25)"
                } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <motion.div variants={item}>
                <h1 className="font-display font-bold text-2xl md:text-3xl">
                  Good morning, {user?.email?.split("@")[0]} 👋
                </h1>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {isWorker ? "Your worker dashboard — Fair wages, e-Shram protection" : "Your client dashboard — Verified talent, escrow safety"}
                </p>
              </motion.div>

              {/* India alert */}
              {isIndia && (
                <motion.div variants={item} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "hsl(43 95% 56% / 0.1)", border: "1px solid hsl(43 95% 56% / 0.25)" }}>
                  <Shield size={18} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <div className="font-semibold text-sm text-gold-gradient">Social Security Code 2020 Active</div>
                    <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {isWorker ? "Your ₹176/hr floor wage, UAN, and portable benefits are protected on this platform." : "Your escrow payments and AI dispute protection are fully active."}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats */}
              <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(isWorker ? [
                  { label: "Active Gigs", value: "3", icon: <Briefcase size={18} />, color: "text-gold" },
                  { label: "Total Earned", value: "₹1.24L", icon: <TrendingUp size={18} />, color: "text-emerald" },
                  { label: "Avg. Wage", value: "₹312/hr", icon: <BarChart2 size={18} />, color: "text-sapphire" },
                  { label: "Match Score", value: "89%", icon: <Zap size={18} />, color: "text-gold" },
                ] : [
                  { label: "Active Projects", value: "3", icon: <Briefcase size={18} />, color: "text-gold" },
                  { label: "In Escrow", value: "₹1.35L", icon: <Lock size={18} />, color: "text-sapphire" },
                  { label: "Hired Workers", value: "8", icon: <Users size={18} />, color: "text-emerald" },
                  { label: "Disputes Won", value: "2/2", icon: <Shield size={18} />, color: "text-gold" },
                ]).map(s => (
                  <div key={s.label} className="glass-card-hover p-5">
                    <div className={`mb-2 ${s.color}`}>{s.icon}</div>
                    <div className="text-2xl font-display font-bold">{s.value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Active work tracker */}
              <motion.div variants={item} className="glass-card p-6">
                <h2 className="font-display font-semibold mb-4">Active Work Tracker</h2>
                <div className="space-y-4">
                  {ESCROW_PROJECTS.slice(0, isWorker ? 2 : 3).map(p => (
                    <div key={p.id} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-sm">{p.title}</span>
                          <span className="text-xs ml-2" style={{ color: "hsl(var(--muted-foreground))" }}>· {isWorker ? "Client" : p.worker}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gold-gradient">₹{p.amount.toLocaleString()}</span>
                          <span className="badge-emerald">{p.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                          <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "linear-gradient(90deg, hsl(43 95% 56%), hsl(38 90% 45%))" }} />
                        </div>
                        <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{p.pct}%</span>
                      </div>
                      <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <Clock size={10} className="inline mr-1" />Milestone: {p.milestone}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* JOBS TAB (Worker) */}
          {tab === "jobs" && isWorker && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <motion.div variants={item} className="flex items-center gap-3">
                <h2 className="font-display font-bold text-xl">AI Skill Matched Jobs</h2>
                <span className="badge-gold">80%+ match only</span>
              </motion.div>

              {isIndia && (
                <motion.div variants={item} className="flex items-center gap-2 p-3 rounded-xl text-sm" style={{ background: "hsl(0 72% 58% / 0.1)", border: "1px solid hsl(0 72% 58% / 0.25)", color: "hsl(0 72% 65%)" }}>
                  <AlertTriangle size={14} />
                  Floor Wage Filter Active: All jobs below ₹176/hr are hidden automatically.
                </motion.div>
              )}

              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search jobs, skills, categories..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                />
              </div>

              <motion.div variants={container} className="space-y-3">
                {filteredJobs.filter(j => j.match >= 80).map(job => (
                  <motion.div key={job.id} variants={item} className="glass-card-hover p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-sm">{job.title}</h3>
                          {job.escrow && <span className="badge-emerald"><Lock size={9} /> Escrow</span>}
                          {job.wage < 176 && <span className="badge-gold"><AlertTriangle size={9} /> Below Floor</span>}
                        </div>
                        <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{job.client} · {job.category}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-gold-gradient">₹{job.wage}/hr</div>
                        <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>AI Match</div>
                        <div className="flex items-center gap-1 justify-end mt-1">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                            <div className="h-full rounded-full" style={{ width: `${job.match}%`, background: "linear-gradient(90deg, hsl(160 60% 45%), hsl(43 95% 56%))" }} />
                          </div>
                          <span className="text-xs font-bold text-emerald">{job.match}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <motion.button whileHover={{ scale: 1.02 }} className="px-4 py-1.5 rounded-lg text-xs font-semibold glow-gold" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}>
                        Apply Now
                      </motion.button>
                      <button className="px-4 py-1.5 rounded-lg text-xs font-medium" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* TALENT POOL (Client) */}
          {tab === "jobs" && !isWorker && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <motion.div variants={item} className="flex items-center gap-3">
                <h2 className="font-display font-bold text-xl">Verified Talent Pool</h2>
                <span className="badge-emerald"><CheckCircle size={10} /> e-Shram Verified</span>
              </motion.div>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search workers by skill..." className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }} />
              </div>
              <motion.div variants={container} className="grid md:grid-cols-2 gap-4">
                {MOCK_WORKERS.filter(w => search === "" || w.role.toLowerCase().includes(search.toLowerCase()) || w.name.toLowerCase().includes(search.toLowerCase())).map(w => (
                  <motion.div key={w.id} variants={item} className="glass-card-hover p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0" style={{ background: "linear-gradient(135deg, hsl(43 95% 56% / 0.2), hsl(220 80% 58% / 0.2))", color: "hsl(var(--gold))" }}>
                        {w.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{w.name}</span>
                          {w.eshram && <span className="badge-emerald"><CheckCircle size={9} /> UAN</span>}
                          {w.verified && <span className="badge-sapphire">Verified</span>}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>{w.role} · {w.jobs} jobs done</div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="font-bold text-sm text-gold-gradient">₹{w.wage}/hr</span>
                          <span className="flex items-center gap-0.5 text-xs"><Star size={10} style={{ color: "hsl(var(--gold))", fill: "hsl(var(--gold))" }} className="fill-current" />{w.rating}</span>
                          <span className="text-xs font-semibold text-emerald">{w.match}% match</span>
                        </div>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} className="mt-4 w-full py-2 rounded-lg text-xs font-semibold" style={{ background: "hsl(43 95% 56% / 0.15)", color: "hsl(var(--gold))", border: "1px solid hsl(43 95% 56% / 0.3)" }}>
                      Hire with Escrow
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* LEADERBOARD (Worker) */}
          {tab === "leaderboard" && isWorker && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <motion.div variants={item}>
                <h2 className="font-display font-bold text-xl">Fair Wage Leaderboard</h2>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>Top earners setting the standard for fair wages on Aaddhra India.</p>
              </motion.div>
              <motion.div variants={item} className="glass-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                      {["Rank", "Worker", "Category", "Avg. Wage", ""].map(h => (
                        <th key={h} className="text-xs font-semibold px-4 py-3 text-left" style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LEADERBOARD.map((l, i) => (
                      <motion.tr key={l.rank} variants={item} style={{ borderBottom: i < LEADERBOARD.length - 1 ? "1px solid hsl(var(--border))" : "none" }}>
                        <td className="px-4 py-3 text-lg">{l.badge}</td>
                        <td className="px-4 py-3 font-medium text-sm">{l.name}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{l.category}</td>
                        <td className="px-4 py-3 font-bold text-sm text-gold-gradient">₹{l.wage}/hr</td>
                        <td className="px-4 py-3"><span className="badge-gold">Top {l.rank === 1 ? "1%" : l.rank <= 3 ? "5%" : "10%"}</span></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
              <motion.div variants={item} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Zap size={16} className="text-gold" />
                  <span className="font-semibold text-sm">Your Position</span>
                </div>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>You're in the top 22% of earners. Complete 5 more gigs to break into the top 10%.</p>
                <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                  <div className="h-full rounded-full" style={{ width: "78%", background: "linear-gradient(90deg, hsl(43 95% 56%), hsl(38 90% 45%))" }} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ESCROW (Client) */}
          {tab === "projects" && !isWorker && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <motion.div variants={item}>
                <h2 className="font-display font-bold text-xl">Escrow Status</h2>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>All your payments are locked safely until delivery is confirmed.</p>
              </motion.div>
              {ESCROW_PROJECTS.map(p => (
                <motion.div key={p.id} variants={item} className="glass-card-hover p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>Worker: {p.worker}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gold-gradient">₹{p.amount.toLocaleString()}</div>
                      <span className={p.status === "Milestone Done" ? "badge-emerald" : "badge-sapphire"}>{p.status}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                      <span>Current: {p.milestone}</span><span>{p.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: "linear-gradient(90deg, hsl(43 95% 56%), hsl(38 90% 45%))" }} />
                    </div>
                  </div>
                  {p.status === "Milestone Done" && (
                    <motion.button whileHover={{ scale: 1.02 }} className="mt-4 px-5 py-2 rounded-lg text-xs font-semibold glow-gold" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}>
                      Release Payment
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* COMMUNITY TAB */}
          {tab === "community" && (
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <motion.div variants={item}>
                <h2 className="font-display font-bold text-xl">{isWorker ? "Worker Community" : "Client Community"}</h2>
                <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {isWorker ? "Connect with fellow workers, share tips, and access e-Shram resources." : "Network with other clients and share hiring best practices."}
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-4">
                {(isWorker ? [
                  { title: "e-Shram Help Center", desc: "Get help linking your UAN, understanding social security benefits, and filing claims.", icon: "🛡️", members: 12400 },
                  { title: "Skill Development", desc: "Free courses, certification prep, and mentorship from top-earning workers.", icon: "📚", members: 8200 },
                  { title: "Wage Negotiation Tips", desc: "Community wisdom on negotiating above floor wage and spotting low-ball offers.", icon: "💬", members: 5600 },
                  { title: "Legal Corner", desc: "AI-moderated Q&A on worker rights under Social Security Code 2020.", icon: "⚖️", members: 3100 },
                ] : [
                  { title: "Client Best Practices", desc: "Tips on writing great briefs, working with Indian freelancers, and escrow strategy.", icon: "💡", members: 4200 },
                  { title: "Dispute Avoidance", desc: "How to set clear milestones and avoid disagreements before they start.", icon: "🤝", members: 2900 },
                  { title: "Compliance Corner", desc: "Stay compliant with Indian gig-work laws when hiring platform workers.", icon: "📋", members: 1800 },
                  { title: "Success Stories", desc: "Real client case studies — projects completed, team built, money saved.", icon: "🏆", members: 3400 },
                ]).map(c => (
                  <motion.div key={c.title} variants={item} className="glass-card-hover p-5">
                    <div className="text-2xl mb-3">{c.icon}</div>
                    <h3 className="font-display font-semibold mb-1">{c.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>{c.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}><Users size={10} className="inline mr-1" />{c.members.toLocaleString()} members</span>
                      <button className="text-xs font-semibold text-gold-gradient">Join →</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
