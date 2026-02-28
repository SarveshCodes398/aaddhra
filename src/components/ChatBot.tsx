import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";

const GEMINI_KEY = "AIzaSyDhMiZpnC_XnRy-hluoc4daHASOcGmRBS0";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_MESSAGES: Message[] = [
  { role: "assistant", content: "Namaste! 🙏 I'm Aaddhra's AI assistant, available 24/7. I can help with worker rights, e-Shram UAN, escrow queries, floor wages, and more. How can I help you today?" }
];

export default function ChatBot() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(STARTER_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const systemContext = `You are Aaddhra's AI legal and platform assistant. User is a ${user?.role || "user"} in ${user?.country || "India"}. 
Use Indian labor laws (e-Shram, Social Security Code 2020, Floor Wage ₹176/hr) when relevant. 
Prioritise client scam protection. Be concise, friendly, and helpful. 
For Indian workers: always reference their rights under Social Security Code 2020, e-Shram UAN benefits, and floor wage protections.
For clients: emphasise escrow protection, dispute resolution, and AI adjudicator.
Keep responses under 150 words unless detailed legal info is required.`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemContext }] },
          contents: history,
        }),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your internet and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl pulse-ring"
        style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%)", color: "hsl(220 20% 7%)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(o => !o)}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.span>
            : <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 glass-card flex flex-col overflow-hidden"
            style={{ width: "360px", height: "480px", maxWidth: "calc(100vw - 3rem)", maxHeight: "calc(100vh - 8rem)", border: "1px solid hsl(43 95% 56% / 0.25)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid hsl(var(--border))", background: "hsl(43 95% 56% / 0.08)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))" }}>
                <span className="text-xs font-bold" style={{ color: "hsl(220 20% 7%)" }}>AI</span>
              </div>
              <div>
                <div className="font-semibold text-sm">Aaddhra Assistant</div>
                <div className="text-xs flex items-center gap-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" style={{ background: "hsl(160 60% 45%)" }} />
                  Online · Powered by Gemini
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={m.role === "user" ? {
                      background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))",
                      color: "hsl(220 20% 7%)",
                      borderBottomRightRadius: "4px"
                    } : {
                      background: "hsl(var(--secondary))",
                      color: "hsl(var(--foreground))",
                      borderBottomLeftRadius: "4px"
                    }}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl flex items-center gap-2" style={{ background: "hsl(var(--secondary))", borderBottomLeftRadius: "4px" }}>
                    <Loader2 size={14} className="animate-spin" style={{ color: "hsl(var(--gold))" }} />
                    <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 p-3 shrink-0" style={{ borderTop: "1px solid hsl(var(--border))" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask about wages, e-Shram, escrow..."
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{ background: "hsl(var(--input))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, hsl(43 95% 56%), hsl(38 90% 45%))", color: "hsl(220 20% 7%)" }}
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
