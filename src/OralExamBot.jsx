import { useState, useEffect, useRef } from "react";

// ── Question Bank ────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "qualifications", label: "Pilot Qualifications", emoji: "🪪" },
  { id: "airworthiness",  label: "Airworthiness",        emoji: "🔧" },
  { id: "weather",        label: "Weather",               emoji: "🌦" },
  { id: "xc",            label: "Cross-Country Planning", emoji: "🗺" },
  { id: "nas",           label: "Airspace",              emoji: "🗼" },
  { id: "performance",   label: "Performance & Limits",  emoji: "📊" },
  { id: "systems",       label: "Aircraft Systems",      emoji: "⚙️" },
  { id: "human",         label: "Human Factors",         emoji: "🧠" },
  { id: "preflight",     label: "Preflight",             emoji: "📋" },
  { id: "airport",       label: "Airport Operations",    emoji: "✈️" },
  { id: "night",         label: "Night Operations",      emoji: "🌙" },
  { id: "postflight",    label: "Postflight",            emoji: "🏁" },
];

const QUESTIONS = {
  qualifications: [
    "What are the aeronautical experience requirements to be eligible for a private pilot certificate?",
    "What medical certificate is required for a private pilot, and how long is it valid?",
    "What are the currency requirements to carry passengers as a private pilot?",
    "What documents must a pilot have in their personal possession while acting as PIC?",
    "Under what conditions may a private pilot act as PIC of an aircraft carrying passengers for compensation?",
    "What is the minimum age requirement to obtain a private pilot certificate?",
    "What are the requirements for a flight review, and how often must it be accomplished?",
    "Can a private pilot fly in IMC? Under what conditions?",
    "What is a student pilot certificate, and what are the solo flight requirements?",
    "What is the definition of 'acting as pilot in command' under FAR 61.3?",
  ],
  airworthiness: [
    "What documents must be on board an aircraft for it to be considered airworthy?",
    "What is the purpose of an airworthiness certificate, and when does it expire?",
    "What are the required VFR day and night equipment lists per FAR 91.205?",
    "What is an Airworthiness Directive (AD), and what are the consequences of not complying?",
    "What inspections are required for an aircraft to remain airworthy?",
    "What is the difference between a 100-hour inspection and an annual inspection?",
    "What is the significance of the aircraft's Type Certificate Data Sheet?",
    "Who is responsible for ensuring an aircraft is airworthy before flight?",
    "What is an ELT, and when must it be inspected?",
    "What is a Special Airworthiness Certificate?",
    "What does ARROW stand for, and what does each document require?",
  ],
  weather: [
    "What is a METAR, and how do you read one?",
    "What is a TAF, and how does it differ from a METAR?",
    "What are the VFR weather minimums in Class G airspace below 1,200 feet AGL during the day?",
    "What is a SIGMET, and what weather phenomena does it cover?",
    "What is density altitude, and how does it affect aircraft performance?",
    "Describe the characteristics of a stable vs. unstable atmosphere.",
    "What is wind shear, and why is it dangerous to aviation?",
    "What causes thunderstorms, and what are their hazards to aircraft?",
    "How does icing affect an aircraft, and what types of in-flight icing can occur?",
    "What is a PIREP and why is it valuable to pilots?",
    "What weather briefing types are available from a flight service station?",
    "What is a prog chart, and how is it used in flight planning?",
    "Explain the difference between dew point and relative humidity.",
    "What are the characteristics of a microburst?",
    "How do you interpret winds aloft forecasts?",
  ],
  xc: [
    "What is the definition of a cross-country flight for logging time toward a PPL?",
    "How do you calculate fuel required for a cross-country flight?",
    "What is the VFR cruising altitude rule per FAR 91.159, and when does it apply?",
    "What are the steps for filing a VFR flight plan, and why is it recommended?",
    "How do you determine the true course and true airspeed for a cross-country flight?",
    "What is the difference between true course, magnetic course, and magnetic heading?",
    "How do you use dead reckoning for navigation?",
    "What is a VOR, and how is it used for navigation?",
    "Explain how to use a sectional chart to identify checkpoints and restricted areas.",
    "What are the fuel reserve requirements for VFR day and night flight?",
    "What is RAIM, and why is it important for GPS navigation?",
    "How do you determine the compass deviation correction?",
  ],
  nas: [
    "Describe the different classes of airspace (A, B, C, D, E, G) and their basic requirements.",
    "What equipment is required to fly in Class B airspace?",
    "What are the dimensions of Class D airspace?",
    "What is a TFR, and what are the consequences of violating one?",
    "What is a MOA, and are VFR flights permitted in one?",
    "What is a Restricted Area, and how does it differ from a Prohibited Area?",
    "What is a transponder, and when is one required under FAR 91.215?",
    "What is ADS-B Out, and when was it mandated for most airspace?",
    "What are the VFR weather minimums in Class B airspace?",
    "How do you identify airspace boundaries on a sectional chart?",
    "What is a Warning Area, and where are they typically found?",
    "What is the definition of controlled vs. uncontrolled airspace?",
  ],
  performance: [
    "How do you use a POH performance chart to determine takeoff distance?",
    "What is the relationship between aircraft weight and performance?",
    "How does pressure altitude differ from indicated altitude for performance purposes?",
    "What is Va (maneuvering speed), and why is it important?",
    "What happens to stall speed as weight increases?",
    "How do you calculate the center of gravity, and why is it critical?",
    "What is the difference between Vx and Vy?",
    "How does headwind vs. tailwind affect takeoff and landing distance?",
    "What is the significance of the weight and balance envelope?",
    "How does temperature affect engine performance and density altitude?",
    "What is Vso and Vfe, and when are they relevant?",
  ],
  systems: [
    "Describe how a four-stroke aircraft engine operates.",
    "What is carburetor ice, and under what conditions is it most likely to form?",
    "What is the purpose of the primer, and when should it be used?",
    "Explain how the pitot-static system works and which instruments it feeds.",
    "What are the gyroscopic flight instruments, and how are they powered?",
    "What is the function of the magnetos, and why are there two?",
    "How does the aircraft fuel system work, and what are the fuel grades for avgas?",
    "What is the purpose of the mixture control, and how should it be used?",
    "Explain how the vacuum system works and what happens if it fails.",
    "What is the function of the stall warning device?",
    "How does the electrical system work — alternator vs. battery?",
    "What is the purpose of the primer system and when should it NOT be used?",
  ],
  human: [
    "What does IMSAFE stand for, and how do you use it?",
    "What is hypoxia, and at what altitude does it typically begin to affect pilots?",
    "What is spatial disorientation, and why can it be fatal?",
    "What are the effects of carbon monoxide on a pilot?",
    "What is the 8-hour bottle-to-throttle rule, and are there additional considerations beyond it?",
    "What is hyperventilation, and how do you treat it in flight?",
    "Explain the DECIDE model for aeronautical decision making.",
    "What is get-there-itis, and why is it dangerous?",
    "How does fatigue affect pilot performance?",
    "What is the hazardous attitude of 'invulnerability', and what is its antidote?",
    "What is CRM, and why does it matter for single-pilot operations?",
    "What is scud running, and why should it be avoided?",
  ],
  preflight: [
    "What items do you check during a preflight inspection of a typical Cessna 172?",
    "What is the purpose of checking the fuel for color and sediment?",
    "How do you check engine oil level, and what are acceptable limits?",
    "What does sumping the fuel mean, and what are you looking for?",
    "How do you determine if the aircraft has sufficient fuel for a planned flight?",
    "What is the purpose of checking control surface freedom of movement?",
    "What is the significance of checking the stall warning indicator during preflight?",
    "What documentation should you review before every flight?",
    "What is an ATIS/AWOS/ASOS, and when should you obtain it?",
    "How do you check the pitot tube for blockage during preflight?",
  ],
  airport: [
    "What is the standard traffic pattern altitude and direction?",
    "What do the different runway markings mean (numbers, centerline, threshold, etc.)?",
    "What is a LAHSO clearance, and can a student pilot accept one?",
    "How do you interpret VASI and PAPI approach lighting?",
    "What does a red and white PAPI indication mean?",
    "How do you taxi at an unfamiliar controlled airport?",
    "What is a hot spot on an airport diagram?",
    "What is wake turbulence, and how do you avoid it on departure and landing?",
    "What does a flashing red light gun signal mean while airborne?",
    "Explain the right-of-way rules on the ground and in the air.",
    "What is a runway incursion, and how can pilots prevent one?",
    "What are the different types of runway lighting?",
  ],
  night: [
    "What are the additional equipment requirements for VFR night flight?",
    "How should you adapt your vision for night flying?",
    "What is dark adaptation, and how long does it take?",
    "What is the black hole approach illusion, and why is it dangerous?",
    "What are the required aircraft position lights and their colors?",
    "What is the anti-collision light requirement for night flight?",
    "How does spatial disorientation become more dangerous at night?",
    "What is the best technique for seeing other aircraft at night?",
    "What additional preflight planning is recommended for night cross-country flights?",
    "What is the definition of 'night' for currency and logging purposes?",
  ],
  postflight: [
    "What entries are required in the aircraft maintenance log after a flight?",
    "What is the significance of an inoperative item found after a flight?",
    "How should you properly secure an aircraft after flight?",
    "What is required in a pilot's logbook for each flight?",
    "If you discover a maintenance issue after landing, what are your responsibilities as PIC?",
    "When should you file a NASA ASRS report, and what protection does it provide?",
    "What is the purpose of a post-flight passenger debriefing?",
    "How do you properly tie down or hangar an aircraft after flight?",
  ],
};

// ── Utility ──────────────────────────────────────────────────────────────────

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickQuestion(catId) {
  const id = catId || randomFrom(CATEGORIES).id;
  return { catId: id, question: randomFrom(QUESTIONS[id]) };
}

// ── Score color helpers ───────────────────────────────────────────────────────

function scoreStyle(s) {
  if (s >= 8) return { color: "#16a34a", bg: "#f0fdf4", border: "#86efac" };
  if (s >= 5) return { color: "#d97706", bg: "#fffbeb", border: "#fcd34d" };
  return { color: "#dc2626", bg: "#fef2f2", border: "#fca5a5" };
}

function scoreLabel(s) {
  if (s >= 9) return "Outstanding";
  if (s >= 8) return "Strong answer";
  if (s >= 6) return "Partial credit";
  if (s >= 4) return "Needs work";
  return "Study this topic";
}

// ── Claude API calls ──────────────────────────────────────────────────────────

async function evalAnswer(question, answer) {
  const prompt = `You are a strict but fair FAA private pilot oral examiner evaluating a student's answer.

Question: "${question}"
Student's answer: "${answer}"

Respond ONLY with valid JSON in exactly this format, no markdown fences:
{
  "score": <integer 1-10>,
  "got_right": "<what the student got correct — 1-3 sentences>",
  "missed": "<key concepts or details missed or wrong — 1-3 sentences; if nothing missed say 'Nothing significant missed.'>",
  "correct_answer": "<the complete correct answer a student should know — 3-5 sentences>",
  "improvement_tips": "<1-2 actionable tips to improve knowledge on this topic>"
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.map((i) => i.text || "").join("").replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

async function getOverview(question) {
  const prompt = `You are a patient PPL ground school instructor. A student said they don't know the answer to this question:

"${question}"

Give them a clear, memorable overview of the topic so they can answer similar questions in the future. Keep it under 160 words. Focus on the most important facts an examiner would expect. Be direct and use plain language.

Respond ONLY with valid JSON, no markdown fences:
{
  "overview": "<your explanation>"
}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  const text = data.content.map((i) => i.text || "").join("").replace(/```json|```/g, "").trim();
  return JSON.parse(text);
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatBox({ value, label }) {
  return (
    <div style={{
      flex: 1, textAlign: "center",
      background: "#f8fafc", border: "1px solid #e2e8f0",
      borderRadius: 10, padding: "10px 8px",
    }}>
      <div style={{ fontSize: 22, fontWeight: 600, color: "#0f172a" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}

function FeedbackSection({ label, color, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function OralExamBot() {
  const [selectedCat, setSelectedCat] = useState(null); // null = random
  const [current, setCurrent] = useState(() => pickQuestion(null));
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | feedback | idk
  const [feedback, setFeedback] = useState(null);
  const [overview, setOverview] = useState(null);
  const [stats, setStats] = useState({ asked: 0, scores: [] });
  const textareaRef = useRef(null);

  const catInfo = CATEGORIES.find((c) => c.id === current.catId);
  const avgScore = stats.scores.length
    ? (stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length).toFixed(1)
    : "—";
  const bestScore = stats.scores.length ? Math.max(...stats.scores) : "—";

  function nextQuestion() {
    setCurrent(pickQuestion(selectedCat));
    setAnswer("");
    setFeedback(null);
    setOverview(null);
    setStatus("idle");
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  function selectCategory(id) {
    setSelectedCat(id);
    setCurrent(pickQuestion(id));
    setAnswer("");
    setFeedback(null);
    setOverview(null);
    setStatus("idle");
  }

  async function handleSubmit() {
    if (!answer.trim() || status !== "idle") return;
    setStatus("loading");
    try {
      const result = await evalAnswer(current.question, answer.trim());
      setFeedback(result);
      setStats((prev) => ({
        asked: prev.asked + 1,
        scores: [...prev.scores, result.score],
      }));
      setStatus("feedback");
    } catch {
      setStatus("idle");
      alert("Error connecting to AI. Please check your API key and try again.");
    }
  }

  async function handleIDK() {
    if (status !== "idle") return;
    setStatus("loading");
    try {
      const result = await getOverview(current.question);
      setOverview(result.overview);
      setStats((prev) => ({ ...prev, asked: prev.asked + 1 }));
      setStatus("idk");
    } catch {
      setStatus("idle");
      alert("Error connecting to AI. Please try again.");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  }

  const isAnswering = status === "idle";
  const isLoading = status === "loading";
  const showResult = status === "feedback" || status === "idk";

  const sStyle = feedback ? scoreStyle(feedback.score) : {};

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem" }}>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>✈️</span>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: 0 }}>PPL Oral Exam Simulator</h1>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Practice your private pilot checkride knowledge</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <StatBox value={stats.asked} label="Asked" />
        <StatBox value={avgScore} label="Avg score" />
        <StatBox value={bestScore} label="Best" />
      </div>

      {/* Category selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        <button
          onClick={() => selectCategory(null)}
          style={{
            fontSize: 12, padding: "5px 12px", borderRadius: 999,
            border: `1.5px solid ${selectedCat === null ? "#0f172a" : "#e2e8f0"}`,
            background: selectedCat === null ? "#0f172a" : "#fff",
            color: selectedCat === null ? "#fff" : "#64748b",
            cursor: "pointer", fontWeight: 500,
          }}
        >
          🎲 Random
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCategory(c.id)}
            style={{
              fontSize: 12, padding: "5px 12px", borderRadius: 999,
              border: `1.5px solid ${selectedCat === c.id ? "#0f172a" : "#e2e8f0"}`,
              background: selectedCat === c.id ? "#0f172a" : "#fff",
              color: selectedCat === c.id ? "#fff" : "#64748b",
              cursor: "pointer", fontWeight: selectedCat === c.id ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Question card */}
      <div style={{
        background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
        padding: "1.25rem", marginBottom: 12,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.07em", color: "#94a3b8", marginBottom: 10,
        }}>
          {catInfo?.emoji} {catInfo?.label}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", lineHeight: 1.55 }}>
          {current.question}
        </div>
      </div>

      {/* Answer input */}
      <textarea
        ref={textareaRef}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isAnswering}
        placeholder="Type your answer here… (Cmd/Ctrl + Enter to submit)"
        style={{
          width: "100%", minHeight: 110, padding: "12px 14px",
          border: "1px solid #e2e8f0", borderRadius: 10,
          fontFamily: "inherit", fontSize: 14, color: "#0f172a",
          background: isAnswering ? "#fff" : "#f8fafc",
          resize: "vertical", lineHeight: 1.65, marginBottom: 10,
          outline: "none", boxSizing: "border-box",
          opacity: isAnswering ? 1 : 0.6,
        }}
      />

      {/* Action buttons */}
      {isAnswering && (
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            style={{
              flex: 1, padding: "11px 16px", borderRadius: 9,
              border: "1px solid #e2e8f0",
              background: answer.trim() ? "#0f172a" : "#f1f5f9",
              color: answer.trim() ? "#fff" : "#94a3b8",
              fontSize: 14, fontWeight: 600, cursor: answer.trim() ? "pointer" : "not-allowed",
              transition: "all 0.15s", fontFamily: "inherit",
            }}
          >
            Submit answer
          </button>
          <button
            onClick={handleIDK}
            style={{
              padding: "11px 18px", borderRadius: 9,
              border: "1px solid #e2e8f0", background: "#fff",
              color: "#64748b", fontSize: 14, cursor: "pointer",
              fontFamily: "inherit", whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            I don't know
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div style={{
          textAlign: "center", padding: "1.5rem", color: "#94a3b8",
          fontSize: 14, background: "#f8fafc", borderRadius: 10, marginBottom: 12,
        }}>
          Evaluating...
        </div>
      )}

      {/* Feedback */}
      {status === "feedback" && feedback && (
        <div style={{
          background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
          padding: "1.25rem", marginBottom: 12,
        }}>
          {/* Score */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
              background: sStyle.bg, border: `2px solid ${sStyle.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column",
            }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: sStyle.color, lineHeight: 1 }}>
                {feedback.score}
              </span>
              <span style={{ fontSize: 9, color: sStyle.color, opacity: 0.8 }}>/10</span>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: sStyle.color }}>
                {scoreLabel(feedback.score)}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>Score: {feedback.score} out of 10</div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
            <FeedbackSection label="✅ What you got right" color="#16a34a">
              {feedback.got_right}
            </FeedbackSection>
            <FeedbackSection label="⚠️ What you missed" color="#d97706">
              {feedback.missed}
            </FeedbackSection>
            <FeedbackSection label="📖 Correct answer" color="#475569">
              {feedback.correct_answer}
            </FeedbackSection>
            <FeedbackSection label="💡 Improvement tips" color="#2563eb">
              {feedback.improvement_tips}
            </FeedbackSection>
          </div>
        </div>
      )}

      {/* IDK overview */}
      {status === "idk" && overview && (
        <div style={{
          background: "#faf5ff", border: "1px solid #e9d5ff", borderRadius: 12,
          padding: "1.25rem", marginBottom: 12,
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.08em", color: "#7c3aed", marginBottom: 8,
          }}>
            📚 Topic Overview
          </div>
          <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.7 }}>{overview}</div>
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <button
          onClick={nextQuestion}
          style={{
            width: "100%", padding: "12px 16px", borderRadius: 9,
            border: "1px solid #e2e8f0", background: "#fff",
            color: "#0f172a", fontSize: 14, fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#f8fafc")}
          onMouseOut={(e) => (e.target.style.background = "#fff")}
        >
          Next question →
        </button>
      )}

      <div style={{ marginTop: 24, fontSize: 11, color: "#cbd5e1", textAlign: "center" }}>
        Project-GS • PPL Oral Exam Simulator
      </div>
    </div>
  );
}
