import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import type { Country } from "@/context/UserContext";

const COUNTRIES: Country[] = ["India", "USA", "UK", "UAE", "Singapore"];

type Phase = "cloudflare" | "form";

export default function Auth() {
  const [phase, setPhase] = useState<Phase>("cloudflare");
  const [progress, setProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState<Country>("India");
  const [role, setRole] = useState<"worker" | "client">("worker");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Cloudflare auto-progress
  useEffect(() => {
    if (phase !== "cloudflare") return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("form"), 300);
          return 100;
        }
        return p + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 1000));
    setUser({ email, role, country });
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* BG orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(43 95% 56%), transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(220 80% 58%), transparent)" }} />

      <AnimatePresence mode="wait">
        {phase === "cloudflare" ? (
          <motion.div
            key="cf"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass-card p-12 max-w-sm w-full mx-6 text-center"
          >
            {/* Cloudflare logo row */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))" }}>
                <Shield size={16} style={{ color: "hsl(220 20% 7%)" }} />
              </div>
              <span className="font-display font-bold text-lg">Aaddhra</span>
            </div>

            {/* Spinner */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="hsl(var(--gold))" strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield size={26} style={{ color: "hsl(var(--gold))" }} />
              </div>
            </div>

            <h2 className="font-display font-semibold text-xl mb-2">Security Check</h2>
            <p className="text-sm mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>Verifying your connection is secure...</p>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Aaddhra uses Cloudflare for payment protection.</p>

            {/* Progress bar */}
            <div className="mt-6 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--border))" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(43 95% 56%), hsl(38 90% 45%))", transition: "width 0.1s linear" }}
              />
            </div>
            <p className="text-xs mt-2" style={{ color: "hsl(var(--muted-foreground))" }}>{progress}%</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 max-w-md w-full mx-6"
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))" }}>
                <span className="text-xs font-display font-bold" style={{ color: "hsl(220 20% 7%)" }}>A</span>
              </div>
              <span className="font-display font-bold text-lg">Aaddhra</span>
              <span className="badge-emerald ml-auto text-xs flex items-center gap-1"><Shield size={10} /> Secured</span>
            </div>

            <h1 className="font-display font-bold text-2xl mb-1">Welcome</h1>
            <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>Sign in or create your account to get started.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                  onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--ring))"}
                  onBlur={e => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                    onFocus={e => e.currentTarget.style.borderColor = "hsl(var(--ring))"}
                    onBlur={e => e.currentTarget.style.borderColor = "hsl(var(--border))"}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Country</label>
                <div className="relative">
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value as Country)}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none cursor-pointer"
                    style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c === "India" ? "🇮🇳 " : c === "USA" ? "🇺🇸 " : c === "UK" ? "🇬🇧 " : c === "UAE" ? "🇦🇪 " : "🇸🇬 "}{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "hsl(var(--muted-foreground))" }} />
                </div>
              </div>

              {/* Role toggle */}
              <div>
                <label className="block text-sm font-medium mb-2">I am a...</label>
                <div className="flex rounded-xl overflow-hidden p-1" style={{ background: "hsl(var(--muted))" }}>
                  {(["worker", "client"] as const).map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize"
                      style={role === r ? {
                        background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))",
                        color: "hsl(220 20% 7%)",
                        boxShadow: "0 2px 8px hsl(43 95% 56% / 0.3)"
                      } : { color: "hsl(var(--muted-foreground))" }}
                    >
                      {r === "worker" ? "👷 Worker" : "💼 Client"}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm px-3 py-2 rounded-lg" style={{ background: "hsl(var(--destructive) / 0.1)", color: "hsl(var(--destructive))", border: "1px solid hsl(var(--destructive) / 0.2)" }}>
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all disabled:opacity-70"
                style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
              >
                {loading ? "Verifying..." : "Continue →"}
              </motion.button>
            </form>

            <p className="text-center text-xs mt-6" style={{ color: "hsl(var(--muted-foreground))" }}>
              By continuing, you agree to Aaddhra's Terms. Indian users are covered under the Social Security Code 2020.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
