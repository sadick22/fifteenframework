import { useState, useMemo } from "react";

const SCORES = [
  {
    id: "truth", name: "Truth Score", stage: "Discover", verb: "Find the truth",
    color: "#C8A96E", lightColor: "#C8A96E22",
    pillars: [
      { id: "mi", name: "Market Intelligence", question: "How well does this business understand its competitive landscape, market gaps, and positioning opportunities?", low: "No competitive awareness. Marketing decisions made in a vacuum.", high: "Deep market understanding. Clear knowledge of gaps and opportunities." },
      { id: "am", name: "Audience Mapping", question: "How clearly has this business defined who it serves, what frustrates them, and what they wish existed?", low: "Vague audience definition. Marketing speaks to 'everyone.'", high: "Sharp personas. Messaging addresses specific frustrations." },
      { id: "se", name: "Story Excavation", question: "Does this business have a core narrative truth — an ownable story — that its marketing is built around?", low: "No discernible story. Marketing is a collection of disconnected tactics.", high: "Clear narrative truth. Every piece of marketing serves the same story." },
    ]
  },
  {
    id: "positioning", name: "Positioning Score", stage: "Distill", verb: "Turn truth into positioning",
    color: "#D4B87A", lightColor: "#D4B87A22",
    pillars: [
      { id: "bp", name: "Brand Positioning", question: "Does this business own a clear, defensible position in its market that competitors cannot easily claim?", low: "Interchangeable with competitors. No ownable territory.", high: "Distinct market position. Competitors cannot credibly claim the same space." },
      { id: "va", name: "Value Architecture", question: "Is the value proposition specific, true, and impossible for a competitor to copy word-for-word?", low: "Generic value proposition. Could describe any company in the sector.", high: "Specific, ownable proposition. Passes the 'could a competitor say this?' test." },
      { id: "cf", name: "Competitive Framing", question: "Has this business clearly articulated why them, why now, and why not the alternatives?", low: "No competitive narrative. The buyer is left to figure out differentiation alone.", high: "Clear competitive frame. The buyer understands why this is the only logical choice." },
    ]
  },
  {
    id: "narrative", name: "Narrative Score", stage: "Design", verb: "Build the narrative architecture",
    color: "#E0C88A", lightColor: "#E0C88A22",
    pillars: [
      { id: "mf", name: "Messaging Framework", question: "Does this business have a structured messaging system — voice, tone, audience-specific language, emotional beats?", low: "No messaging consistency. Every piece of content sounds different.", high: "Complete messaging framework. Voice is recognisable across every channel." },
      { id: "ca", name: "Campaign Architecture", question: "Are marketing campaigns structured as narrative arcs that build over time, or disconnected one-off efforts?", low: "Campaign-to-campaign. No narrative thread. No compounding effect.", high: "Narrative campaigns that build on each other. Momentum compounds monthly." },
      { id: "cs", name: "Content Strategy", question: "Is there a defined content system — pillars, formats, distribution, and a flywheel that compounds reach?", low: "Ad hoc content. No pillars, no calendar, no flywheel.", high: "Structured content engine with clear pillars and compounding distribution." },
    ]
  },
  {
    id: "execution", name: "Execution Score", stage: "Deploy", verb: "Execute with precision",
    color: "#D4B87A", lightColor: "#D4B87A22",
    pillars: [
      { id: "ce", name: "Channel Execution", question: "Is each active marketing channel selected strategically and performing against defined benchmarks?", low: "Channels chosen by default, not strategy. No performance benchmarks.", high: "Every channel justified. Clear benchmarks. Underperformers cut." },
      { id: "sl", name: "Sales Enablement", question: "Does the sales team have decks, scripts, case studies, and objection responses that flow from the brand narrative?", low: "Sales team invents the pitch every time. No standardised materials.", high: "Complete sales toolkit. Every conversation carries the same story." },
      { id: "ed", name: "Experience Design", question: "Do the brand's digital touchpoints (website, tools, funnels) deliver an experience that matches the strategic narrative?", low: "Website is a brochure. No journey design. No conversion optimisation.", high: "Every touchpoint designed as part of the story. Website converts." },
    ]
  },
  {
    id: "growth", name: "Growth Score", stage: "Diagnose", verb: "Measure, learn, compound",
    color: "#C8A96E", lightColor: "#C8A96E22",
    pillars: [
      { id: "pa", name: "Performance Analytics", question: "Is this business tracking the metrics that connect marketing activity to business outcomes — not just vanity numbers?", low: "Tracking impressions and reach only. No connection to revenue.", high: "Clear metrics tied to pipeline, revenue, and growth. Data drives decisions." },
      { id: "at", name: "Attribution Mapping", question: "Can this business trace a lead back to the specific content, channel, or campaign that produced it?", low: "No attribution. Marketing spend is an act of faith.", high: "Full attribution model. Every lead traced to source. ROI visible by channel." },
      { id: "so", name: "Strategic Optimisation", question: "Does this business use data to adjust its marketing narrative and strategy — or does it just repeat what it's always done?", low: "No feedback loop. Same approach regardless of results.", high: "Continuous optimisation. Strategy adjusts based on what the data reveals." },
    ]
  },
];

const PRIORITY_MAP = {
  1: { label: "Critical", color: "#E74C3C", action: "Requires immediate strategic intervention" },
  2: { label: "Weak", color: "#E67E22", action: "Significant gap — high-priority build" },
  3: { label: "Developing", color: "#F1C40F", action: "Foundation exists — needs structure and consistency" },
  4: { label: "Strong", color: "#27AE60", action: "Performing well — optimise and protect" },
  5: { label: "Excellent", color: "#2ECC71", action: "Best-in-class — maintain and document as proof" },
};

export default function FifteenScorecard() {
  const [clientName, setClientName] = useState("");
  const [clientIndustry, setClientIndustry] = useState("");
  const [ratings, setRatings] = useState({});
  const [view, setView] = useState("assess"); // assess | results
  const [expandedPillar, setExpandedPillar] = useState(null);

  const setRating = (pillarId, value) => {
    setRatings(prev => ({ ...prev, [pillarId]: value }));
  };

  const totalPillars = SCORES.reduce((s, g) => s + g.pillars.length, 0);
  const ratedCount = Object.keys(ratings).length;
  const isComplete = ratedCount === totalPillars;

  const compositeScores = useMemo(() => {
    return SCORES.map(group => {
      const values = group.pillars.map(p => ratings[p.id] || 0);
      const rated = values.filter(v => v > 0);
      const avg = rated.length > 0 ? rated.reduce((a, b) => a + b, 0) / rated.length : 0;
      return { ...group, avg: Math.round(avg * 10) / 10, allRated: rated.length === 3 };
    });
  }, [ratings]);

  const overallScore = useMemo(() => {
    const allRated = compositeScores.filter(c => c.allRated);
    if (allRated.length === 0) return 0;
    return Math.round(allRated.reduce((s, c) => s + c.avg, 0) / allRated.length * 10) / 10;
  }, [compositeScores]);

  const priorities = useMemo(() => {
    return [...compositeScores]
      .filter(c => c.allRated)
      .sort((a, b) => a.avg - b.avg);
  }, [compositeScores]);

  // Pentagon chart coordinates
  const chartCx = 200, chartCy = 200, chartR = 150;
  const getChartPos = (i, r) => {
    const angle = (i * 72 - 90) * Math.PI / 180;
    return { x: chartCx + r * Math.cos(angle), y: chartCy + r * Math.sin(angle) };
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0B1120", color: "#E8E4D9", fontFamily: "'Cormorant Garamond', Georgia, serif", padding: "32px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .score-btn { cursor:pointer; transition:all 0.2s ease; border:none; font-family:'DM Mono',monospace; }
        .score-btn:hover { transform:scale(1.1); }
        .pillar-row { transition:all 0.25s ease; cursor:pointer; }
        .pillar-row:hover { background:#0d1526; }
        .tab { cursor:pointer; transition:all 0.3s ease; border:none; background:none; font-family:'DM Mono',monospace; }
        .tab:hover { color:#C8A96E; }
        input { outline:none; }
        input:focus { border-color:#C8A96E; }
      `}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 10 }}>FifteenConsult</div>
          <h1 style={{ fontSize: 42, fontWeight: 300, color: "#E8E4D9", letterSpacing: "-0.02em", marginBottom: 4 }}>The Fifteen Scorecard</h1>
          <div style={{ width: 50, height: 1, background: "linear-gradient(90deg,transparent,#C8A96E,transparent)", margin: "12px auto" }} />
          <p style={{ fontSize: 14, color: "#8a8a8a", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.7 }}>
            Five scores. Fifteen pillars. One diagnostic.
          </p>
        </div>

        {/* Client Info */}
        <div style={{ display: "flex", gap: 12, marginBottom: 28, justifyContent: "center" }}>
          <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client name" style={{
            background: "#0d1526", border: "1px solid #1a2236", borderRadius: 3, padding: "10px 16px",
            color: "#E8E4D9", fontSize: 15, fontFamily: "'Cormorant Garamond',serif", width: 260, textAlign: "center",
          }} />
          <input value={clientIndustry} onChange={e => setClientIndustry(e.target.value)} placeholder="Industry" style={{
            background: "#0d1526", border: "1px solid #1a2236", borderRadius: 3, padding: "10px 16px",
            color: "#E8E4D9", fontSize: 15, fontFamily: "'Cormorant Garamond',serif", width: 200, textAlign: "center",
          }} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 28 }}>
          {[["assess", `Assessment (${ratedCount}/${totalPillars})`], ["results", "Results & Priorities"]].map(([k, label]) => (
            <button key={k} className="tab" onClick={() => setView(k)} style={{
              fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", padding: "7px 20px",
              color: view === k ? "#C8A96E" : "#7a7a7a", borderBottom: view === k ? "1px solid #C8A96E" : "1px solid transparent",
            }}>{label}</button>
          ))}
        </div>

        {/* ═══ ASSESSMENT VIEW ═══ */}
        {view === "assess" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {SCORES.map((group, gi) => (
              <div key={group.id} style={{ marginBottom: 32, animation: "fadeUp 0.4s ease forwards", animationDelay: `${gi * 0.08}s`, opacity: 0 }}>
                {/* Group Header */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
                  <span style={{ fontSize: 28, fontWeight: 300, color: group.color, fontFamily: "'DM Mono',monospace", opacity: 0.3 }}>0{gi + 1}</span>
                  <h2 style={{ fontSize: 24, fontWeight: 400, color: "#E8E4D9" }}>{group.name}</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 11, color: group.color, fontFamily: "'DM Mono',monospace", letterSpacing: "0.12em", textTransform: "uppercase" }}>{group.stage} — {group.verb}</span>
                  {group.pillars.every(p => ratings[p.id]) && (
                    <span style={{ fontSize: 20, fontWeight: 600, color: group.color, marginLeft: "auto", fontFamily: "'DM Mono',monospace" }}>
                      {compositeScores[gi].avg}/5
                    </span>
                  )}
                </div>

                {/* Pillars */}
                {group.pillars.map((pillar, pi) => {
                  const isExpanded = expandedPillar === pillar.id;
                  const rating = ratings[pillar.id];
                  return (
                    <div key={pillar.id} className="pillar-row" onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)} style={{
                      padding: "16px 18px", marginBottom: 4, borderRadius: 3,
                      border: `1px solid ${rating ? group.color + "33" : "#141e30"}`,
                      borderLeft: `3px solid ${rating ? group.color : "#1a2236"}`,
                      background: isExpanded ? "#0d1526" : "transparent",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 9, color: group.color, fontFamily: "'DM Mono',monospace", opacity: 0.5 }}>
                          {String(gi * 3 + pi + 1).padStart(2, "0")}
                        </span>
                        <span style={{ fontSize: 16, color: "#E8E4D9", fontWeight: 500, flex: 1 }}>{pillar.name}</span>
                        {/* Rating buttons */}
                        <div style={{ display: "flex", gap: 4 }} onClick={e => e.stopPropagation()}>
                          {[1, 2, 3, 4, 5].map(v => (
                            <button key={v} className="score-btn" onClick={() => setRating(pillar.id, v)} style={{
                              width: 32, height: 32, borderRadius: 3, fontSize: 13,
                              background: rating === v ? group.color : "#0d1526",
                              color: rating === v ? "#0B1120" : "#7a7a7a",
                              border: `1px solid ${rating === v ? group.color : "#1a2236"}`,
                              fontWeight: rating === v ? 700 : 400,
                            }}>{v}</button>
                          ))}
                        </div>
                      </div>

                      {isExpanded && (
                        <div style={{ marginTop: 14, animation: "fadeIn 0.25s ease" }}>
                          <p style={{ fontSize: 15, color: "#9a9a9a", lineHeight: 1.8, fontWeight: 300, marginBottom: 14 }}>{pillar.question}</p>
                          <div style={{ display: "flex", gap: 16 }}>
                            <div style={{ flex: 1, padding: "10px 14px", background: "#0a0f1a", borderRadius: 3, borderLeft: "2px solid #E74C3C33" }}>
                              <div style={{ fontSize: 9, color: "#E74C3C", fontFamily: "'DM Mono',monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Score 1</div>
                              <p style={{ fontSize: 13, color: "#8a8a8a", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.6 }}>{pillar.low}</p>
                            </div>
                            <div style={{ flex: 1, padding: "10px 14px", background: "#0a0f1a", borderRadius: 3, borderLeft: "2px solid #2ECC7133" }}>
                              <div style={{ fontSize: 9, color: "#2ECC71", fontFamily: "'DM Mono',monospace", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Score 5</div>
                              <p style={{ fontSize: 13, color: "#8a8a8a", fontFamily: "'DM Mono',monospace", fontWeight: 300, lineHeight: 1.6 }}>{pillar.high}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {isComplete && (
              <div style={{ textAlign: "center", padding: "20px 0", animation: "fadeUp 0.4s ease" }}>
                <button onClick={() => setView("results")} style={{
                  background: "#C8A96E", color: "#0B1120", border: "none", padding: "12px 32px",
                  fontSize: 13, fontFamily: "'DM Mono',monospace", letterSpacing: "0.15em",
                  textTransform: "uppercase", borderRadius: 3, cursor: "pointer", fontWeight: 600,
                }}>View Results & Priorities →</button>
              </div>
            )}
          </div>
        )}

        {/* ═══ RESULTS VIEW ═══ */}
        {view === "results" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            {/* Client header */}
            {(clientName || clientIndustry) && (
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 22, fontWeight: 400, color: "#E8E4D9" }}>{clientName || "Client"}</div>
                {clientIndustry && <div style={{ fontSize: 13, color: "#8a8a8a", fontFamily: "'DM Mono',monospace" }}>{clientIndustry}</div>}
              </div>
            )}

            <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
              {/* Pentagon Chart */}
              <div style={{ width: 400, flexShrink: 0 }}>
                <svg viewBox="0 0 400 400" style={{ width: "100%" }}>
                  {/* Grid rings */}
                  {[1, 2, 3, 4, 5].map(level => {
                    const r = (level / 5) * chartR;
                    const points = [0, 1, 2, 3, 4].map(i => getChartPos(i, r)).map(p => `${p.x},${p.y}`).join(" ");
                    return <polygon key={level} points={points} fill="none" stroke="#1a2236" strokeWidth={level === 5 ? 1 : 0.5} />;
                  })}
                  {/* Axis lines */}
                  {[0, 1, 2, 3, 4].map(i => {
                    const p = getChartPos(i, chartR);
                    return <line key={i} x1={chartCx} y1={chartCy} x2={p.x} y2={p.y} stroke="#1a2236" strokeWidth="0.5" />;
                  })}
                  {/* Data polygon */}
                  {isComplete && (() => {
                    const points = compositeScores.map((c, i) => {
                      const r = (c.avg / 5) * chartR;
                      return getChartPos(i, r);
                    }).map(p => `${p.x},${p.y}`).join(" ");
                    return (
                      <>
                        <polygon points={points} fill="#C8A96E15" stroke="#C8A96E" strokeWidth="2" />
                        {compositeScores.map((c, i) => {
                          const pos = getChartPos(i, (c.avg / 5) * chartR);
                          return <circle key={i} cx={pos.x} cy={pos.y} r="4" fill={c.color} stroke="#0B1120" strokeWidth="2" />;
                        })}
                      </>
                    );
                  })()}
                  {/* Labels */}
                  {compositeScores.map((c, i) => {
                    const pos = getChartPos(i, chartR + 28);
                    return (
                      <g key={c.id}>
                        <text x={pos.x} y={pos.y - 6} textAnchor="middle" fill="#E8E4D9" fontSize="12" fontFamily="Cormorant Garamond,serif" fontWeight="500">{c.stage}</text>
                        <text x={pos.x} y={pos.y + 10} textAnchor="middle" fill={c.color} fontSize="14" fontFamily="DM Mono,monospace" fontWeight="600">{c.allRated ? c.avg : "—"}</text>
                      </g>
                    );
                  })}
                  {/* Center overall score */}
                  <text x={chartCx} y={chartCy - 8} textAnchor="middle" fill="#C8A96E" fontSize="32" fontFamily="Cormorant Garamond,serif" fontWeight="300">{isComplete ? overallScore : "—"}</text>
                  <text x={chartCx} y={chartCy + 14} textAnchor="middle" fill="#7a7a7a" fontSize="8" fontFamily="DM Mono,monospace" letterSpacing="2">FIFTEEN SCORE</text>
                </svg>
              </div>

              {/* Score Breakdown + Priorities */}
              <div style={{ flex: 1 }}>
                {/* Score bars */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 14 }}>Score Breakdown</div>
                  {compositeScores.map((c) => {
                    const pct = c.allRated ? (c.avg / 5) * 100 : 0;
                    const pInfo = PRIORITY_MAP[Math.round(c.avg)] || PRIORITY_MAP[1];
                    return (
                      <div key={c.id} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                          <span style={{ fontSize: 15, color: "#E8E4D9", fontWeight: 400 }}>{c.name}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            {c.allRated && <span style={{ fontSize: 10, color: pInfo.color, fontFamily: "'DM Mono',monospace" }}>{pInfo.label}</span>}
                            <span style={{ fontSize: 16, color: c.color, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>{c.allRated ? c.avg : "—"}</span>
                          </div>
                        </div>
                        <div style={{ height: 4, background: "#141e30", borderRadius: 2 }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: 2, transition: "width 0.8s ease" }} />
                        </div>
                        {/* Individual pillar scores */}
                        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
                          {c.pillars.map(p => (
                            <span key={p.id} style={{ fontSize: 11, color: "#7a7a7a", fontFamily: "'DM Mono',monospace" }}>
                              {p.name}: <span style={{ color: ratings[p.id] ? "#E8E4D9" : "#333" }}>{ratings[p.id] || "—"}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Priority Actions */}
                {isComplete && (
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 14 }}>Priority Actions</div>
                    {priorities.map((p, i) => {
                      const pInfo = PRIORITY_MAP[Math.round(p.avg)] || PRIORITY_MAP[1];
                      return (
                        <div key={p.id} style={{
                          padding: "12px 16px", marginBottom: 6, borderRadius: 3,
                          border: `1px solid ${i === 0 ? pInfo.color + "44" : "#141e30"}`,
                          borderLeft: `3px solid ${pInfo.color}`,
                          background: i === 0 ? "#0d1526" : "transparent",
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10, color: pInfo.color, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>P{i + 1}</span>
                            <span style={{ fontSize: 15, color: "#E8E4D9", fontWeight: 500 }}>{p.name}</span>
                            <span style={{ fontSize: 13, color: p.color, fontFamily: "'DM Mono',monospace", marginLeft: "auto" }}>{p.avg}/5</span>
                          </div>
                          <p style={{ fontSize: 12, color: "#8a8a8a", fontFamily: "'DM Mono',monospace", fontWeight: 300, marginTop: 4 }}>{pInfo.action}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {!isComplete && (
                  <div style={{ padding: "20px", border: "1px solid #1a2236", borderRadius: 3, textAlign: "center" }}>
                    <p style={{ fontSize: 14, color: "#7a7a7a", fontFamily: "'DM Mono',monospace" }}>
                      Rate all 15 pillars to generate priorities.
                    </p>
                    <button onClick={() => setView("assess")} className="tab" style={{
                      marginTop: 10, fontSize: 11, color: "#C8A96E", letterSpacing: "0.12em",
                      textTransform: "uppercase", padding: "6px 16px", border: "1px solid #C8A96E33", borderRadius: 2,
                    }}>Complete Assessment →</button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom summary */}
            {isComplete && (
              <div style={{ marginTop: 32, padding: "20px 24px", border: "1px solid #1a2236", borderRadius: 3, background: "#0d1526" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#C8A96E", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginBottom: 10 }}>Recommendation</div>
                <p style={{ fontSize: 16, color: "#E8E4D9", lineHeight: 1.8, fontWeight: 300 }}>
                  {overallScore >= 4 ?
                    `${clientName || "This business"} scores ${overallScore}/5 overall — a strong foundation. The opportunity is in optimising ${priorities[0]?.name || "the lowest-scoring area"} (${priorities[0]?.avg}/5) to close the gap between good and exceptional. A Fifteen Advance engagement would maintain momentum and compound results.` :
                  overallScore >= 3 ?
                    `${clientName || "This business"} scores ${overallScore}/5 overall — the foundation exists but critical gaps remain. The immediate priority is ${priorities[0]?.name || "the lowest-scoring area"} (${priorities[0]?.avg}/5), followed by ${priorities[1]?.name || "the second priority"} (${priorities[1]?.avg}/5). A Fifteen Build engagement over 3–6 months would address both systematically.` :
                    `${clientName || "This business"} scores ${overallScore}/5 overall — significant strategic infrastructure needs to be built. The most urgent gap is ${priorities[0]?.name || "the lowest-scoring area"} (${priorities[0]?.avg}/5). Without addressing this, other marketing investments will underperform. A Fifteen Audit followed by a structured Fifteen Build is the recommended path.`
                  }
                </p>
              </div>
            )}

            {/* CTA */}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <div style={{ fontSize: 12, color: "#7a7a7a", fontFamily: "'DM Mono',monospace", marginBottom: 8 }}>
                This scorecard was produced using The Fifteen Framework by FifteenConsult.
              </div>
              <div style={{ fontSize: 11, color: "#C8A96E", fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em" }}>
                fifteenconsult.com — Storytelling as Strategic Infrastructure
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0", marginTop: 20 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "#222", fontFamily: "'DM Mono',monospace", textTransform: "uppercase" }}>
            The Fifteen Scorecard — FifteenConsult
          </span>
        </div>
      </div>
    </div>
  );
}
