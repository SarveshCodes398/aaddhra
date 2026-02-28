import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import lawIndiaImg from "@/assets/law-india.jpg";
import escrowImg from "@/assets/escrow.jpg";
import aiMatchImg from "@/assets/ai-match.jpg";

interface Slide {
  title: string;
  subtitle: string;
  bullets: string[];
  image: string;
  badge: string;
  color: string;
}

const WORKER_INDIA_SLIDES: Slide[] = [
  {
    title: "₹176/hr Floor Wage",
    subtitle: "Your minimum is protected by law.",
    bullets: [
      "National Floor Wage enforced on every Aaddhra job post",
      "Client bids below ₹176/hr are automatically blocked",
      "Real-time wage transparency with leaderboard",
      "Dispute resolution if underpayment is attempted",
    ],
    image: lawIndiaImg,
    badge: "Ministry of Labour",
    color: "text-gold",
  },
  {
    title: "Social Security Code 2020",
    subtitle: "India's landmark gig-worker protection law.",
    bullets: [
      "All platform workers covered under Code on Social Security 2020",
      "Portable benefits across gigs — health, maternity, disability",
      "Accident insurance automatically activated on project start",
      "Ministry-aligned reporting and transparency",
    ],
    image: lawIndiaImg,
    badge: "Govt. of India",
    color: "text-emerald",
  },
  {
    title: "e-Shram UAN Verification",
    subtitle: "Your digital work identity — verified & portable.",
    bullets: [
      "Link your e-Shram UAN directly to your Aaddhra profile",
      "Clients instantly see your verified worker status",
      "UAN badge boosts profile trust score by 40%",
      "Access govt. schemes via your linked UAN",
    ],
    image: aiMatchImg,
    badge: "e-Shram Portal",
    color: "text-sapphire",
  },
  {
    title: "You're Protected. Let's Begin.",
    subtitle: "Accept the terms and enter your dashboard.",
    bullets: [
      "All the above protections are active on your account",
      "AI Skill Matcher will surface only 80%+ fit jobs",
      "Escrow payments guarantee you always get paid",
      "24/7 AI Legal Assistant available in your dashboard",
    ],
    image: aiMatchImg,
    badge: "All protections active",
    color: "text-gold",
  },
];

const CLIENT_INDIA_SLIDES: Slide[] = [
  {
    title: "Digital Escrow Protection",
    subtitle: "Your payment, locked safely until delivery.",
    bullets: [
      "Funds held in verified escrow — never lost to scams",
      "Release payment only when satisfied with delivery",
      "Dispute escrow hold with AI Adjudicator backing",
      "Full refund guarantee on verified fraud cases",
    ],
    image: escrowImg,
    badge: "100% Secure",
    color: "text-sapphire",
  },
  {
    title: "AI Adjudicator",
    subtitle: "Disputes resolved fairly by Gemini AI.",
    bullets: [
      "AI reviews contracts, milestones, and communications",
      "Neutral, fast binding decisions in under 48 hours",
      "Trained on Indian Contract Act and gig-work precedents",
      "Human mediator escalation if needed",
    ],
    image: aiMatchImg,
    badge: "Gemini Powered",
    color: "text-emerald",
  },
  {
    title: "Scam Priority Protection",
    subtitle: "Zero tolerance for fraud on Aaddhra.",
    bullets: [
      "All workers are e-Shram or identity verified",
      "Scam reports processed in under 2 hours",
      "Fake profile detection via AI pattern analysis",
      "Blacklist shared with partner platforms",
    ],
    image: escrowImg,
    badge: "Cloudflare + AI",
    color: "text-gold",
  },
  {
    title: "Ready to Hire with Confidence.",
    subtitle: "Accept the terms and find your talent.",
    bullets: [
      "Access 2.4M+ verified, skill-matched workers",
      "Floor-wage transparency — no exploitation liability",
      "Escrow active from first milestone",
      "24/7 AI support for contract and compliance queries",
    ],
    image: aiMatchImg,
    badge: "Verified Talent Pool",
    color: "text-sapphire",
  },
];

const GENERIC_SLIDES: Slide[] = [
  {
    title: "Secure Escrow Payments",
    subtitle: "Money is safe until both parties are satisfied.",
    bullets: ["Platform-held escrow on all transactions", "Dispute resolution within 48 hours", "Transparent milestone tracking"],
    image: escrowImg, badge: "Secure", color: "text-gold",
  },
  {
    title: "AI-Powered Matching",
    subtitle: "Find the right fit, every time.",
    bullets: ["Gemini AI scores skill compatibility", "80%+ match threshold for quality", "Instant match notifications"],
    image: aiMatchImg, badge: "AI Powered", color: "text-emerald",
  },
  {
    title: "You're All Set.",
    subtitle: "Accept and enter your dashboard.",
    bullets: ["All platform protections are active", "24/7 AI assistant available", "Community support forums open"],
    image: aiMatchImg, badge: "Ready", color: "text-sapphire",
  },
];

const getSlides = (role: string, country: string): Slide[] => {
  if (country === "India" && role === "worker") return WORKER_INDIA_SLIDES;
  if (country === "India" && role === "client") return CLIENT_INDIA_SLIDES;
  return GENERIC_SLIDES;
};

export default function Onboarding() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = getSlides(user?.role || "worker", user?.country || "India");
  const isLast = current === slides.length - 1;

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const handleAccept = () => {
    if (!user) return navigate("/auth");
    // Save to localStorage (mock Airtable)
    const record = { ...user, onboarded: true, createdAt: new Date().toISOString() };
    localStorage.setItem("aaddhra_user", JSON.stringify(record));
    setUser(record as typeof user);
    navigate("/dashboard");
  };

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "hsl(var(--background))" }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))" }}>
              <span className="text-xs font-bold" style={{ color: "hsl(220 20% 7%)" }}>A</span>
            </div>
            <span className="font-display font-bold">Aaddhra</span>
          </div>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            Welcome, {user?.email?.split("@")[0]} · {user?.country} {user?.role === "worker" ? "Worker" : "Client"}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => i < current && go(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "32px" : "8px",
                height: "8px",
                background: i <= current ? "hsl(var(--gold))" : "hsl(var(--border))",
              }}
            />
          ))}
        </div>

        {/* Slide card */}
        <div className="glass-card overflow-hidden" style={{ minHeight: "460px" }}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="p-8"
            >
              {/* Image */}
              <div className="w-full h-44 rounded-xl overflow-hidden mb-6">
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className={`font-display font-bold text-2xl mb-1 ${slide.color}`}>{slide.title}</h2>
                  <p style={{ color: "hsl(var(--muted-foreground))" }}>{slide.subtitle}</p>
                </div>
                <span className="badge-gold shrink-0 whitespace-nowrap">{slide.badge}</span>
              </div>

              <ul className="space-y-2.5 mt-5">
                {slide.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-emerald" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-30"
            style={{ color: "hsl(var(--muted-foreground))", border: "1px solid hsl(var(--border))" }}
          >
            ← Back
          </button>

          {isLast ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAccept}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm glow-gold"
              style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
            >
              Accept & Continue <ArrowRight size={16} />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go(current + 1)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium"
              style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}
            >
              Next <ArrowRight size={15} />
            </motion.button>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "hsl(var(--muted-foreground))" }}>
          Slide {current + 1} of {slides.length} · Your data is saved to Aaddhra's secure registry
        </p>
      </div>
    </div>
  );
}
