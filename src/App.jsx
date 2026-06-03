import { useState, useEffect, useRef } from "react";

const STAGES = [
  {
    id: "discover", num: "01", name: "Discover", verb: "Find the truth",
    description: "Before strategy, before positioning, before a single word of copy is written — we look for the truth already living inside your business.",
    proof: "For Base Intelligent Communities, we discovered the murmuration — a scientific phenomenon where starlings coordinate with six to seven neighbours, creating collective intelligence with no leader. That single insight became the foundation for an entire six-month campaign.",
    pillars: [
      { name: "Market Intelligence", desc: "Map the landscape, the competitors, and the gaps no one is filling", detail: "We audit your market with the precision of a researcher, not the speed of an agency. Competitor positioning, market white space, pricing gaps, unmet needs — everything that tells us where the opportunity lives." },
      { name: "Audience Mapping", desc: "Identify who matters, what frustrates them, and what they wish existed", detail: "Not demographics. Frustrations. We build personas around the specific pain your audience carries — because that pain is what your story must address before anything else." },
      { name: "Story Excavation", desc: "Find the narrative truth your business was already trying to tell", detail: "Every business has a truth inside it that could power its marketing for years. Most never find it because no one looks. We look — in the founder's origin, in the product's design choices, in the customers' words. The story is always there." },
    ],
    angle: -90, color: "#C8A96E",
  },
  {
    id: "distill", num: "02", name: "Distill", verb: "Turn truth into positioning",
    description: "Raw insight becomes ownable positioning. The story sharpens into a strategic claim no competitor can make.",
    proof: "For Base, the murmuration insight was distilled into 'The Gathering' — a campaign positioning that framed the app not as a communication tool, but as the modern continuation of an ancient human need to gather.",
    pillars: [
      { name: "Brand Positioning", desc: "Define where you stand in the market and what territory you own", detail: "Positioning is not a tagline. It is the strategic decision about what space you occupy in your customer's mind — and what space you refuse to compete in. We define both." },
      { name: "Value Architecture", desc: "Build the proposition that makes your brand the only logical choice", detail: "Your value proposition must pass one test: if a competitor could say the same thing, it is not a value proposition. We build propositions that are true, specific, and ownable." },
      { name: "Competitive Framing", desc: "Articulate why you, why now, and why not them", detail: "Competitive framing is not about attacking competitors. It is about defining the game so clearly that your business is the obvious winner by the rules you set." },
    ],
    angle: -18, color: "#D4B87A",
  },
  {
    id: "design", num: "03", name: "Design", verb: "Build the narrative architecture",
    description: "The story becomes a system. Messaging frameworks, campaign structures, and content engines — all flowing from one narrative root.",
    proof: "For Base, Design produced the C.O.R.E. Framework, a messaging system with four audience dialects, 30 tagged headlines, a writer's handbook, and a six-act campaign architecture spanning June to November.",
    pillars: [
      { name: "Messaging Framework", desc: "Create the voice, the audience dialects, and the emotional beats", detail: "One brand. Multiple audiences. Each needs to hear the story in their language. We build messaging frameworks with distinct audience dialects — the way Base speaks to a pastor is fundamentally different from how it speaks to a startup founder." },
      { name: "Campaign Architecture", desc: "Build the story structure across time, channels, and touchpoints", detail: "Campaigns are not collections of ads. They are stories told in acts. We design campaign architectures with narrative themes that build on each other — so momentum compounds instead of resetting every month." },
      { name: "Content Strategy", desc: "Define the pillars, formats, and flywheel that compounds reach", detail: "Content pillars, publishing cadence, format mix, distribution channels, and the flywheel logic that turns every piece of content into fuel for the next. Not a calendar — a compounding system." },
    ],
    angle: 54, color: "#E0C88A",
  },
  {
    id: "deploy", num: "04", name: "Deploy", verb: "Execute with precision",
    description: "Strategy meets the real world. Every channel, every touchpoint, every interaction carries the same story.",
    proof: "For Coreo Real Estate, Deploy produced Cora — an AI-powered property concierge that responds to natural language, displays property cards, and provides expert comparisons. Not just a website. A product.",
    pillars: [
      { name: "Channel Execution", desc: "Activate across digital, social, paid, and owned media", detail: "Every channel is selected for a reason, not by default. LinkedIn for B2B trust. Instagram for brand awareness. SEO for compounding reach. Paid for acceleration. We activate the channels that serve the story — and ignore the ones that don't." },
      { name: "Sales Enablement", desc: "Arm the team with decks, scripts, proof, and conversion tools", detail: "Your sales team should never have to invent the pitch. We deliver presentation decks, objection responses, case study one-pagers, and email templates — all flowing from the same strategic narrative." },
      { name: "Experience Design", desc: "Build the touchpoints — websites, AI tools, funnels, journeys", detail: "The experience is the brand. We build websites, AI-powered tools, landing pages, and conversion funnels that don't just look right — they feel like the story the customer was already expecting." },
    ],
    angle: 126, color: "#D4B87A",
  },
  {
    id: "diagnose", num: "05", name: "Diagnose", verb: "Measure, learn, compound",
    description: "Data reveals what's working and what's not. The narrative adjusts. The system gets smarter. The flywheel accelerates.",
    proof: "For Base, Diagnose defined pre-launch targets across all six campaign months — from referral activation rates in June to cumulative K-factor in November. Every metric tied to a business outcome, not a vanity number.",
    pillars: [
      { name: "Performance Analytics", desc: "Track the 15 metrics that connect activity to business outcomes", detail: "We track fifteen metrics across revenue, conversion, and engagement. Not forty. Not a hundred. Fifteen — because every metric must earn its place by connecting directly to a decision the team needs to make." },
      { name: "Attribution Mapping", desc: "Connect every channel and campaign to pipeline and revenue", detail: "If you cannot trace a lead back to the content, channel, or campaign that produced it, you are guessing. We build attribution models that show exactly which investments are working and which are noise." },
      { name: "Strategic Optimisation", desc: "Adjust the narrative based on what the data says, not what feels right", detail: "Diagnose feeds back into Discover. The data tells us which parts of the story are resonating and which aren't. The narrative adjusts. The framework rotates. The system compounds." },
    ],
    angle: 198, color: "#C8A96E",
  },
];

const METRICS = [
  { name: "Customer Acquisition Cost", cat: "revenue", desc: "Total marketing spend divided by new clients acquired. The number that determines whether growth is profitable or just expensive." },
  { name: "Lifetime Value", cat: "revenue", desc: "Total revenue a client generates across the entire relationship. The metric that justifies premium pricing and long-term thinking." },
  { name: "Marketing ROI", cat: "revenue", desc: "Revenue attributable to marketing divided by marketing investment. The ultimate proof that strategy drives growth, not just activity." },
  { name: "Revenue per Client", cat: "revenue", desc: "Average revenue generated per active engagement. Tracks whether the business is attracting the right clients at the right price point." },
  { name: "Pipeline Velocity", cat: "revenue", desc: "Speed at which leads move from first contact to signed engagement. Reveals whether the sales process is creating urgency or friction." },
  { name: "Lead-to-Client Rate", cat: "conversion", desc: "Percentage of qualified leads that become paying clients. The metric that separates good outreach from good closing." },
  { name: "Website Conversion", cat: "conversion", desc: "Percentage of website visitors who take a desired action — contact form, audit booking, newsletter signup. The website's report card." },
  { name: "Proposal Win Rate", cat: "conversion", desc: "Percentage of proposals sent that convert to signed engagements. Tracks whether the pitch matches the prospect's expectations." },
  { name: "Email Response Rate", cat: "conversion", desc: "Percentage of outreach emails that receive a reply. The earliest signal of whether the messaging is landing or being ignored." },
  { name: "Campaign Conversion", cat: "conversion", desc: "Percentage of campaign audience that takes the intended action. Measures whether the narrative architecture is driving behaviour, not just attention." },
  { name: "Social Engagement", cat: "engagement", desc: "Meaningful interactions (comments, shares, saves) relative to reach. Tracks whether content provokes thought or just occupies feed space." },
  { name: "Content Reach", cat: "engagement", desc: "Total unique audience exposed to published content across all channels. The top-of-funnel indicator of brand visibility." },
  { name: "Organic Growth", cat: "engagement", desc: "Month-over-month increase in unpaid traffic and followers. The long-term compound effect of consistent content and SEO investment." },
  { name: "Client Retention", cat: "engagement", desc: "Percentage of clients who continue beyond their initial engagement term. The proof that the work creates lasting value, not temporary excitement." },
  { name: "Net Promoter Score", cat: "engagement", desc: "Likelihood of a client recommending FifteenConsult to others. The single metric that predicts referral-driven growth." },
];

const CAT_LABELS = { revenue: "Revenue", conversion: "Conversion", engagement: "Engagement" };
const CAT_COLORS = { revenue: "#C8A96E", conversion: "#6EB5C8", engagement: "#6EC87A" };

export default function App() {
  const [active, setActive] = useState(null);
  const [expandedPillar, setExpandedPillar] = useState(null);
  const [activeMetric, setActiveMetric] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [entered, setEntered] = useState(false);
  const [view, setView] = useState("framework"); // framework | metrics | journey
  const canvasRef = useRef(null);

  useEffect(() => { setTimeout(() => setEntered(true), 100); }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + 0.3, dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25, o: Math.random() * 0.2 + 0.04 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.x += p.dx; p.y += p.dy; if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0; if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,169,110,${p.o})`; ctx.fill(); });
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) { const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y); if (d < 100) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(200,169,110,${0.03*(1-d/100)})`; ctx.lineWidth = 0.5; ctx.stroke(); } }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const cx = 300, cy = 300, radius = 200;
  const getPos = (angle) => ({ x: cx + radius * Math.cos(angle * Math.PI / 180), y: cy + radius * Math.sin(angle * Math.PI / 180) });
  const activeStage = STAGES.find(s => s.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#0B1120", color: "#E8E4D9", fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.5 }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity:0.3; } 50% { opacity:0.8; } }
        @keyframes rotate { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        .node { cursor:pointer; transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .node:hover { filter:brightness(1.3); }
        .pcard { animation:scaleIn 0.3s ease forwards; opacity:0; cursor:pointer; transition:border-color 0.3s ease, background 0.3s ease; }
        .pcard:hover { border-color:#C8A96E44; background:linear-gradient(135deg,#151d30,#121a2e); }
        .mtag { cursor:pointer; transition:all 0.25s ease; user-select:none; }
        .mtag:hover { border-color:#C8A96E; color:#E8E4D9; }
        .tab { cursor:pointer; transition:all 0.3s ease; border:none; background:none; font-family:'DM Mono',monospace; }
        .tab:hover { color:#C8A96E; }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:#1e2a3a; border-radius:2px; }
      `}</style>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "36px 32px" }}>
        {/* Header */}
        <div style={{ opacity: entered ? 1 : 0, transform: entered ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s ease 0.2s", textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 10 }}>FifteenConsult</div>
          <h1 style={{ fontSize: 48, fontWeight: 300, color: "#E8E4D9", lineHeight: 1.1, letterSpacing: "-0.02em" }}>The Fifteen Framework</h1>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,#C8A96E,transparent)", margin: "14px auto" }} />
          <p style={{ fontSize: 14, color: "#555", fontFamily: "'DM Mono',monospace", fontWeight: 300, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>Five stages. Fifteen pillars. One story.<br />From discovery to measurable growth.</p>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28, opacity: entered ? 1 : 0, transition: "opacity 0.6s ease 0.5s" }}>
          {[["framework", "The Framework"], ["metrics", "The 15 Metrics"], ["journey", "How It Works"]].map(([k, label]) => (
            <button key={k} className="tab" onClick={() => { setView(k); setActive(null); setActiveMetric(null); setExpandedPillar(null); }} style={{
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 18px",
              color: view === k ? "#C8A96E" : "#444", borderBottom: view === k ? "1px solid #C8A96E" : "1px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {/* ═══ FRAMEWORK VIEW ═══ */}
        {view === "framework" && (
          <div style={{ display: "flex", gap: 0, alignItems: "flex-start", animation: "fadeIn 0.4s ease" }}>
            {/* Pentagon */}
            <div style={{ width: 600, height: 600, flexShrink: 0, position: "relative" }}>
              <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
                <circle cx={cx} cy={cy} r={radius + 40} fill="none" stroke="#C8A96E" strokeWidth="0.3" opacity="0.15" />
                <circle cx={cx} cy={cy} r={radius + 70} fill="none" stroke="#C8A96E" strokeWidth="0.2" opacity="0.06" />
                <circle cx={cx} cy={cy} r={radius + 55} fill="none" stroke="#C8A96E" strokeWidth="0.3" opacity="0.08" strokeDasharray="3 8" style={{ animation: "rotate 100s linear infinite", transformOrigin: `${cx}px ${cy}px` }} />
                {STAGES.map((s, i) => { const next = STAGES[(i + 1) % 5]; const p1 = getPos(s.angle); const p2 = getPos(next.angle); const isA = active === s.id || active === next.id; return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#C8A96E" strokeWidth={isA ? 1.5 : 0.5} opacity={isA ? 0.5 : 0.12} style={{ transition: "all 0.4s" }} />; })}
                {STAGES.map((s, i) => { const next = STAGES[(i + 1) % 5]; const p1 = getPos(s.angle); const p2 = getPos(next.angle); const mx = (p1.x + p2.x) / 2; const my = (p1.y + p2.y) / 2; const a = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI; return <polygon key={`a${i}`} points="-3.5,-2.5 3.5,0 -3.5,2.5" fill="#C8A96E" opacity="0.2" transform={`translate(${mx},${my}) rotate(${a})`} />; })}
                <text x={cx} y={cy - 14} textAnchor="middle" fill="#C8A96E" fontSize="38" fontFamily="Cormorant Garamond,serif" fontWeight="300" opacity="0.2">15</text>
                <text x={cx} y={cy + 12} textAnchor="middle" fill="#555" fontSize="7" fontFamily="DM Mono,monospace" letterSpacing="2.5" opacity="0.35">FRAMEWORK</text>
                {STAGES.map(s => { const p = getPos(s.angle); const isA = active === s.id; return (
                  <g key={s.id} className="node" onClick={() => { setActive(isA ? null : s.id); setExpandedPillar(null); }}>
                    {isA && <circle cx={p.x} cy={p.y} r={42} fill="none" stroke={s.color} strokeWidth="0.8" opacity="0.3" style={{ animation: "pulse 2.5s ease infinite" }} />}
                    <circle cx={p.x} cy={p.y} r={isA ? 36 : 32} fill={isA ? "#131d2e" : "#0e1526"} stroke={s.color} strokeWidth={isA ? 1.8 : 0.7} style={{ transition: "all 0.4s" }} />
                    <text x={p.x} y={p.y - 5} textAnchor="middle" fill={s.color} fontSize="9" fontFamily="DM Mono,monospace" opacity={isA ? 1 : 0.45}>{s.num}</text>
                    <text x={p.x} y={p.y + 9} textAnchor="middle" fill="#E8E4D9" fontSize={isA ? "12" : "11"} fontFamily="Cormorant Garamond,serif" fontWeight={isA ? "600" : "400"} style={{ transition: "all 0.3s" }}>{s.name}</text>
                  </g>
                ); })}
              </svg>
            </div>

            {/* Detail Panel */}
            <div style={{ flex: 1, minHeight: 480, display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 16 }}>
              {!activeStage ? (
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 14 }}>Select a stage</div>
                  <p style={{ fontSize: 17, color: "#555", lineHeight: 1.8, fontWeight: 300, maxWidth: 440 }}>Click any node to explore the three pillars within each stage. Together, the five stages form a continuous cycle — Diagnose feeds back into Discover, and the system compounds with every rotation.</p>
                  <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
                    {STAGES.map(s => (
                      <div key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "8px 12px", borderRadius: 3, border: "1px solid #141e30", transition: "all 0.25s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "#C8A96E33"} onMouseLeave={e => e.currentTarget.style.borderColor = "#141e30"}>
                        <span style={{ fontSize: 10, color: s.color, fontFamily: "'DM Mono',monospace", opacity: 0.5, width: 20 }}>{s.num}</span>
                        <span style={{ fontSize: 15, color: "#E8E4D9", fontWeight: 400 }}>{s.name}</span>
                        <span style={{ fontSize: 11, color: "#444", fontFamily: "'DM Mono',monospace", marginLeft: "auto" }}>{s.verb}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={activeStage.id} style={{ animation: "fadeUp 0.35s ease forwards" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 42, fontWeight: 300, color: activeStage.color, fontFamily: "'DM Mono',monospace", opacity: 0.35, lineHeight: 1 }}>{activeStage.num}</span>
                    <h2 style={{ fontSize: 32, fontWeight: 400, color: "#E8E4D9", letterSpacing: "-0.01em" }}>{activeStage.name}</h2>
                  </div>
                  <div style={{ fontSize: 12, color: activeStage.color, fontFamily: "'DM Mono',monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{activeStage.verb}</div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, fontWeight: 300, marginBottom: 14, maxWidth: 440 }}>{activeStage.description}</p>
                  {/* Proof snippet */}
                  <div style={{ padding: "10px 14px", borderLeft: `2px solid ${activeStage.color}33`, marginBottom: 20, background: "#0d1424" }}>
                    <div style={{ fontSize: 9, color: activeStage.color, fontFamily: "'DM Mono',monospace", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4, opacity: 0.7 }}>In practice</div>
                    <p style={{ fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.7 }}>{activeStage.proof}</p>
                  </div>
                  {/* Pillars */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {activeStage.pillars.map((p, i) => {
                      const pillarNum = String((parseInt(activeStage.num) - 1) * 3 + i + 1).padStart(2, "0");
                      const isExpanded = expandedPillar === `${activeStage.id}-${i}`;
                      return (
                        <div key={p.name} className="pcard" onClick={() => setExpandedPillar(isExpanded ? null : `${activeStage.id}-${i}`)} style={{
                          background: isExpanded ? "linear-gradient(135deg,#151d30,#121a2e)" : "linear-gradient(135deg,#111827,#0F1628)",
                          border: `1px solid ${isExpanded ? activeStage.color + "44" : "#1a2236"}`, borderRadius: 3,
                          padding: isExpanded ? "16px 18px" : "14px 18px", borderLeft: `3px solid ${activeStage.color}`,
                          animationDelay: `${i * 0.08}s`,
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 9, color: activeStage.color, fontFamily: "'DM Mono',monospace", opacity: 0.5 }}>{pillarNum}</span>
                            <span style={{ fontSize: 15, color: "#E8E4D9", fontWeight: 500 }}>{p.name}</span>
                            <span style={{ marginLeft: "auto", fontSize: 10, color: "#333", transition: "transform 0.3s", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>▸</span>
                          </div>
                          <p style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.6, marginTop: 4 }}>{p.desc}</p>
                          {isExpanded && (
                            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #1a2236", animation: "fadeIn 0.3s ease" }}>
                              <p style={{ fontSize: 13, color: "#777", lineHeight: 1.8, fontWeight: 300 }}>{p.detail}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button onClick={() => { setActive(null); setExpandedPillar(null); }} style={{ marginTop: 18, background: "none", border: "1px solid #1a2236", color: "#444", padding: "5px 14px", fontSize: 10, fontFamily: "'DM Mono',monospace", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}>Back to overview</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ METRICS VIEW ═══ */}
        {view === "metrics" && (
          <div style={{ animation: "fadeUp 0.4s ease", maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ fontSize: 28, fontWeight: 300, color: "#E8E4D9", marginBottom: 6 }}>The 15 Metrics That Matter</h2>
              <p style={{ fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.7 }}>Every engagement tracks only these fifteen. No vanity metrics. No dashboard bloat.<br />Click any metric to see why it earns its place.</p>
            </div>
            {["revenue", "conversion", "engagement"].map(cat => (
              <div key={cat} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.25em", color: CAT_COLORS[cat], fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${CAT_COLORS[cat]}15` }}>{CAT_LABELS[cat]}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {METRICS.filter(m => m.cat === cat).map((m, i) => {
                    const isActive = activeMetric === m.name;
                    return (
                      <div key={m.name} onClick={() => setActiveMetric(isActive ? null : m.name)} style={{
                        padding: isActive ? "14px 16px" : "10px 16px", borderRadius: 3,
                        border: `1px solid ${isActive ? CAT_COLORS[cat] + "44" : "#141e30"}`,
                        background: isActive ? "#0d1424" : "transparent", cursor: "pointer",
                        transition: "all 0.25s ease",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 9, fontFamily: "'DM Mono',monospace", color: CAT_COLORS[cat], opacity: 0.5, width: 18 }}>{String(METRICS.indexOf(m) + 1).padStart(2, "0")}</span>
                          <span style={{ fontSize: 15, color: isActive ? "#E8E4D9" : "#888", fontWeight: isActive ? 500 : 400, transition: "all 0.25s" }}>{m.name}</span>
                          <span style={{ marginLeft: "auto", fontSize: 10, color: "#333", transform: isActive ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.3s" }}>▸</span>
                        </div>
                        {isActive && (
                          <p style={{ marginTop: 8, fontSize: 13, color: "#666", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.8, paddingLeft: 28, animation: "fadeIn 0.3s ease" }}>{m.desc}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ JOURNEY VIEW ═══ */}
        {view === "journey" && (
          <div style={{ animation: "fadeUp 0.4s ease", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 28, fontWeight: 300, color: "#E8E4D9", marginBottom: 6 }}>How It Works</h2>
              <p style={{ fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.7 }}>The Fifteen Framework is a continuous cycle. Each stage builds on the last.<br />Diagnose feeds back into Discover. The system compounds with every rotation.</p>
            </div>
            {STAGES.map((s, i) => (
              <div key={s.id} style={{ display: "flex", gap: 20, marginBottom: 32, animation: "fadeUp 0.4s ease forwards", animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{ width: 60, flexShrink: 0, textAlign: "center", paddingTop: 4 }}>
                  <div style={{ fontSize: 28, fontWeight: 300, color: s.color, fontFamily: "'DM Mono',monospace", opacity: 0.4 }}>{s.num}</div>
                  {i < 4 && <div style={{ width: 1, height: 80, background: `linear-gradient(${s.color}33, transparent)`, margin: "8px auto 0" }} />}
                  {i === 4 && <div style={{ fontSize: 16, color: "#C8A96E", opacity: 0.2, marginTop: 8 }}>↻</div>}
                </div>
                <div style={{ flex: 1, paddingBottom: 16, borderBottom: i < 4 ? "1px solid #141e30" : "none" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 400, color: "#E8E4D9", marginBottom: 2 }}>{s.name}</h3>
                  <div style={{ fontSize: 11, color: s.color, fontFamily: "'DM Mono',monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{s.verb}</div>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.8, fontWeight: 300, marginBottom: 12 }}>{s.description}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {s.pillars.map(p => (
                      <span key={p.name} style={{ fontSize: 11, color: "#555", padding: "4px 10px", border: "1px solid #1a2236", borderRadius: 2, fontFamily: "'DM Mono',monospace" }}>{p.name}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 10, padding: "8px 12px", borderLeft: `2px solid ${s.color}22`, background: "#0c1220" }}>
                    <p style={{ fontSize: 12, color: "#444", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.7, fontStyle: "italic" }}>{s.proof}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom nav */}
        <div style={{ marginTop: 28, padding: "20px 0", borderTop: "1px solid #141e30", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 1s" }}>
          {STAGES.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span onClick={() => { setView("framework"); setActive(s.id); setExpandedPillar(null); }} style={{ fontSize: 12, color: active === s.id && view === "framework" ? s.color : "#333", cursor: "pointer", fontWeight: active === s.id ? 600 : 300, transition: "all 0.3s" }}>{s.name}</span>
              {i < 4 && <span style={{ color: "#1e2a3a", fontSize: 9 }}>→</span>}
              {i === 4 && <span style={{ color: "#1e2a3a", fontSize: 9, marginLeft: 3 }}>↻</span>}
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", padding: "14px 0", opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 1.2s" }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "#222", fontFamily: "'DM Mono',monospace", textTransform: "uppercase" }}>Storytelling as Strategic Infrastructure</span>
        </div>
      </div>
    </div>
  );
}
