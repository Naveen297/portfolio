
import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import { resumeData } from "./resumeData.js"; // ← update path if required

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let model = null;
try {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
} catch (err) {
  // eslint-disable-next-line no-console
  console.error("❌ Failed to initialise Gemini:", err);
}

/* -------------------------------------------------------------------------- */
/*                            Tiny UI Helper Pieces                            */
/* -------------------------------------------------------------------------- */
const GradientAvatar = ({ children }) => (
  <motion.div
    whileHover={{ rotate: 5, scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400 }}
    className="flex justify-center items-center w-10 h-10 font-bold text-white bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full shadow-lg"
  >
    {children}
  </motion.div>
);

const GeminiBadge = () => (
  <motion.svg
    className="inline-block ml-1"
    viewBox="0 0 24 24"
    width={14}
    height={14}
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <defs>
      <linearGradient id="g" x1="4" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#89F1FF" />
        <stop offset="0.5" stopColor="#4ADE80" />
        <stop offset="1" stopColor="#A589FF" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l2.09 6.26L20 9.27l-4.45 4.7L16.64 20 12 17.27 7.36 20l1.09-5.33L4 9.27l5.91-.99L12 2z"
      stroke="url(#g)"
      strokeWidth={2}
      strokeLinejoin="round"
      fill="none"
    />
  </motion.svg>
);

/* -------------------------------------------------------------------------- */
/*                             Typing Effect Hook                              */
/* -------------------------------------------------------------------------- */
function useTypewriter(text = "", speed = 24) {
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    setTyping(true);
    setOutput("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        setTyping(false);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { output, typing };
}

/* -------------------------------------------------------------------------- */
/*                              Message Bubble                                */
/* -------------------------------------------------------------------------- */
function ChatMessage({ msg, isAnimating }) {
  const { output, typing } = useTypewriter(isAnimating ? msg.text : "", 22);
  const body = isAnimating ? output : msg.text;
  const isBot = msg.isBot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`flex gap-3 items-end ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && <GradientAvatar>AI</GradientAvatar>}

      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 350 }}
        className={`${isBot ? "rounded-bl-md border bg-gray-800/90 border-gray-600/40" : "bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-br-md"} max-w-[78%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg text-gray-100`}
      >
        {body}
        {isAnimating && typing && (
          <motion.span
            className="inline-block ml-1 w-2 h-4 bg-cyan-400 rounded-sm"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>
      {!isBot && <GradientAvatar>U</GradientAvatar>}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Typing Dots UI                                 */
/* -------------------------------------------------------------------------- */
const TypingDots = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.25 }}
    className="flex gap-3 items-end"
  >
    <GradientAvatar>AI</GradientAvatar>
    <div className="flex p-4 rounded-2xl rounded-bl-md border shadow-lg bg-gray-800/90 border-gray-600/40">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-0.5"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*                           Floating Action Button                            */
/* -------------------------------------------------------------------------- */
function Fab({ open, toggle }) {
    return (
      <motion.button
        onClick={toggle}
        className="flex fixed right-6 bottom-6 z-50 justify-center items-center w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-full border-2 shadow-xl origin-center outline-none border-white/20"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 17 }}
      >
        {/* Decorative pulse dot - only show when closed */}
        {!open && (
          <motion.span
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.4, 1], opacity: [0.9, 0, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        {/* Icon container with smooth transition */}
        <motion.div
          className="flex justify-center items-center text-white"
          animate={{ rotate: open ? -45 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 17 }}
        >
          {open ? (
            // Close icon (X)
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Chat/Message icon
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M8 10h8"></path>
              <path d="M8 14h6"></path>
            </svg>
          )}
        </motion.div>
      </motion.button>
    );
  }

/* -------------------------------------------------------------------------- */
/*                              Main Component                                 */
/* -------------------------------------------------------------------------- */
export default function ResumeChatbot() {
  /* ------------------------------- State refs ------------------------------ */
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: 0,
      text: `Hi! I\'m ${resumeData.name.split(" ")[0]}\'s AI assistant. Ask me anything about my experience, skills, or projects!`,
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingId, setTypingId] = useState(null);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  /* ------------------------------ Auto scroll ----------------------------- */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* --------------------------- Focus on open ------------------------------ */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  /* --------------------------- AI Response -------------------------------- */
  async function askGemini(question) {
    if (!model) return fallback(question);
    const prompt = `You are Naveen Malhotra's AI assistant. Answer concisely in first‑person based on the resume below.\n\nResume:\nName: ${resumeData.name}\nCurrent‑Role: ${resumeData.title} at ${resumeData.experience[0].company}\nExperience: ${resumeData.experience
      .map((e) => `${e.position} at ${e.company} (${e.description})`)
      .join("; ")}\nProjects: ${resumeData.projects.map((p) => p.name).join(", ")}\nSkills: ${[
      ...resumeData.skills.programmingLanguages,
      ...resumeData.skills.frontEnd,
      ...resumeData.skills.backEnd,
      ...resumeData.skills.cloud,
    ].join(", ")}\nEducation: ${resumeData.education.degree} – ${resumeData.education.university}\nContact: ${resumeData.email} | ${resumeData.linkedin}\n---\nUser Question: ${question}\nAI Answer:`;
    try {
      const { response } = await model.generateContent(prompt);
      const text = response.text().trim();
      return text.length ? text : fallback(question);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Gemini error", e);
      return fallback(question);
    }
  }

  /* -------------------------- Basic fallback ------------------------------ */
  function fallback(q) {
    const s = q.toLowerCase();
    if (s.includes("experience"))
      return `I\'m currently an ${resumeData.experience[0].position} at ${resumeData.experience[0].company}, focusing on full‑stack development with React, Node.js and Python.`;
    if (s.includes("skill"))
      return `My core skills include React/Next.js on the front‑end, Node/Flask on the back‑end, and deployments on Azure & GCP.`;
    if (s.includes("project"))
      return `I\'ve built an AI‑Powered Engineering Assistant, a real‑time worker‑safety dashboard, and a VIN plate OCR verification system.`;
    if (s.includes("contact"))
      return `Reach me at ${resumeData.email} or connect on LinkedIn (${resumeData.linkedin}).`;
    return "Could you specify whether you\'d like to know about my experience, skills, or a project?";
  }

  /* --------------------------- Send Message ------------------------------- */
  async function send() {
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), text, isBot: false };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Get AI response
    const replyText = await askGemini(text);
    const botId = Date.now() + 1;
    setTypingId(botId);
    setMessages((m) => [...m, { id: botId, text: replyText, isBot: true }]);
    setLoading(false);
    setTimeout(() => setTypingId(null), 1600);
  }

  /* --------------------------- Keyboard send ------------------------------ */
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  /* --------------------------- Suggested Qs ------------------------------ */
  const starterQs = [
    "Tell me about your work experience",
    "What are your key technical skills?",
    "How can I contact you?",
  ];

  /* ------------------------------------------------------------------------ */
  /*                               RENDER UI                                  */
  /* ------------------------------------------------------------------------ */
  return (
    <>
      <Fab open={open} toggle={() => setOpen(!open)} />

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 25 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-full max-w-sm h-[34rem] bg-gray-900/95 border border-gray-700/50 rounded-2xl backdrop-blur-xl shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* ------------------------- Header ------------------------- */}
            <motion.header
              className="flex justify-between items-center p-4 bg-gradient-to-r border-b from-gray-900/80 via-gray-800/80 to-gray-900/80 border-gray-700/50"
            >
              <div className="flex gap-3 items-center">
                <GradientAvatar>N</GradientAvatar>
                <div>
                  <h3 className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {resumeData.name.split(" ")[0]}'s AI
                  </h3>
                  <div className="flex gap-2 items-center">
                    <motion.span
                      className="w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-xs text-gray-400">online</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="flex gap-1 items-center px-3 py-1 rounded-full border bg-green-500/10 border-green-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-xs font-medium text-green-400">Online</span>
              </motion.div>
            </motion.header>

            {/* -------------------- Messages Area ----------------------- */}
            <div className="overflow-y-auto flex-1 p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-900/20">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <ChatMessage key={m.id} msg={m} isAnimating={m.id === typingId} />
                ))}
                {loading && <TypingDots />}
              </AnimatePresence>
              <div ref={endRef} />
            </div>

            {/* ---------------------- Composer ------------------------- */}
            <motion.footer
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-4 bg-gradient-to-r border-t from-gray-900/90 via-gray-800/90 to-gray-900/90 border-gray-700/50"
            >
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 mb-3"
                >
                  {starterQs.map((q) => (
                    <motion.button
                      key={q}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 text-xs rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-400"
                      onClick={() => setInput(q)}
                    >
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div className="flex gap-3 items-center">
                <motion.input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask something…"
                  disabled={loading}
                  className="flex-1 px-4 py-3 placeholder-gray-400 text-white rounded-xl border bg-gray-800/70 border-gray-700/50 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-50"
                />
                <motion.button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="grid place-items-center p-3 text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg disabled:opacity-40"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.172 2.172a4 4 0 015.656 0l7 7a4 4 0 010 5.656l-7 7a4 4 0 11-5.656-5.656l4.586-4.586a2 2 0 010-2.828l-4.586-4.586a4 4 0 010-5.656z" />
                  </svg>
                </motion.button>
              </div>

              <p className="flex justify-center items-center mt-3 text-xs text-center text-gray-500">
                Powered by Gemini AI <GeminiBadge />
              </p>
            </motion.footer>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}