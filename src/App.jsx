import { useState } from "react";
import FifteenFramework from "./Framework.jsx";
import FifteenScorecard from "./Scorecard.jsx";

const TABS = [
  { id: "framework", label: "The Framework" },
  { id: "scorecard", label: "The Scorecard" },
];

export default function App() {
  const [tab, setTab] = useState("framework");

  return (
    <div style={{ minHeight: "100vh", background: "#0B1120" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Sticky top nav */}
      <nav style={{
        display: "flex", justifyContent: "center", gap: 8, padding: "16px",
        borderBottom: "1px solid #1a1f2e", position: "sticky", top: 0, zIndex: 50,
        background: "rgba(11,17,32,0.85)", backdropFilter: "blur(8px)",
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? "#C8A96E" : "none",
            color: tab === t.id ? "#0B1120" : "#7a7a7a",
            border: `1px solid ${tab === t.id ? "#C8A96E" : "#2a2a3a"}`,
            padding: "8px 22px", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
            cursor: "pointer", borderRadius: 2, fontWeight: tab === t.id ? 600 : 400,
            transition: "all 0.25s ease",
          }}>{t.label}</button>
        ))}
      </nav>

      {/* Active section */}
      {tab === "framework" ? <FifteenFramework /> : <FifteenScorecard />}
    </div>
  );
}
