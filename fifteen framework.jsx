import { useState, useEffect, useRef } from "react";

const STAGES = [
  {
    id: "discover",
    num: "01",
    name: "Discover",
    verb: "Find the truth",
    description: "Before strategy, before positioning, before a single word of copy is written — we look for the truth already living inside your business.",
    pillars: [
      { name: "Market Intelligence", desc: "Map the landscape, the competitors, and the gaps no one is filling" },
      { name: "Audience Mapping", desc: "Identify who matters, what frustrates them, and what they wish existed" },
      { name: "Story Excavation", desc: "Find the narrative truth your business was already trying to tell" },
    ],
    angle: -90,
    color: "#C8A96E",
  },
  {
    id: "distill",
    num: "02",
    name: "Distill",
    verb: "Turn truth into positioning",
    description: "Raw insight becomes ownable positioning. The story sharpens into a strategic claim no competitor can make.",
    pillars: [
      { name: "Brand Positioning", desc: "Define where you stand in the market and what territory you own" },
      { name: "Value Architecture", desc: "Build the proposition that makes your brand the only logical choice" },
      { name: "Competitive Framing", desc: "Articulate why you, why now, and why not them" },
    ],
    angle: -18,
    color: "#D4B87A",
  },
  {
    id: "design",
    num: "03",
    name: "Design",
    verb: "Build the narrative architecture",
    description: "The story becomes a system. Messaging frameworks, campaign structures, and content engines — all flowing from one narrative root.",
    pillars: [
      { name: "Messaging Framework", desc: "Create the voice, the audience dialects, and the emotional beats" },
      { name: "Campaign Architecture", desc: "Build the story structure across time, channels, and touchpoints" },
      { name: "Content Strategy", desc: "Define the pillars, formats, and flywheel that compounds reach" },
    ],
    angle: 54,
    color: "#E0C88A",
  },
  {
    id: "deploy",
    num: "04",
    name: "Deploy",
    verb: "Execute with precision",
    description: "Strategy meets the real world. Every channel, every touchpoint, every interaction carries the same story.",
    pillars: [
      { name: "Channel Execution", desc: "Activate across digital, social, paid, and owned media" },
      { name: "Sales Enablement", desc: "Arm the team with decks, scripts, proof, and conversion tools" },
      { name: "Experience Design", desc: "Build the touchpoints — websites, AI tools, funnels, journeys" },
    ],
    angle: 126,
    color: "#D4B87A",
  },
  {
    id: "diagnose",
    num: "05",
    name: "Diagnose",
    verb: "Measure, learn, compound",
    description: "Data reveals what's working and what's not. The narrative adjusts. The system gets smarter. The flywheel accelerates.",
    pillars: [
      { name: "Performance Analytics", desc: "Track the 15 metrics that connect activity to business outcomes" },
      { name: "Attribution Mapping", desc: "Connect every channel and campaign to pipeline and revenue" },
      { name: "Strategic Optimisation", desc: "Adjust the narrative based on what the data says, not what feels right" },
    ],
    angle: 198,
    color: "#C8A96E",
  },
];

const METRICS = {
  revenue: ["Customer Acquisition Cost", "Lifetime Value", "Marketing ROI", "Revenue per Client", "Pipeline Velocity"],
  conversion: ["Lead-to-Client Rate", "Website Conversion", "Proposal Win Rate", "Email Response Rate", "Campaign Conversion"],
  engagement: ["Social Engagement", "Content Reach", "Organic Growth", "Client Retention", "Net Promoter Score"],
};

export default function FifteenFramework() {
  const [active, setActive] = useState(null);
  const [entered, setEntered] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setEntered(true), 100);
  }, []);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => { canvas.width = canvas.offsetWidth * 2; canvas.height = canvas.offsetHeight * 2; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.3 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 110, ${p.o})`;
        ctx.fill();
      });
      // Connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200, 169, 110, ${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const cx = 300, cy = 300, radius = 200;

  const getPos = (angle) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  const activeStage = STAGES.find(s => s.id === active);

  return (
    <div style={{
      minHeight: "100vh", background: "#0B1120", color: "#E8E4D9",
      fontFamily: "'Cormorant Garamond', Georgia, serif", position: "relative", overflow: "hidden",
    }}>
      <canvas ref={canvasRef} style={{
        position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
        pointerEvents: "none", opacity: 0.6,
      }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }
        .stage-node { cursor: pointer; transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
        .stage-node:hover { filter: brightness(1.2); }
        .pillar-card { animation: scaleIn 0.3s ease forwards; opacity: 0; }
        .metric-tag { animation: fadeIn 0.3s ease forwards; opacity: 0; }
      `}</style>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>

        {/* Header */}
        <div style={{
          opacity: entered ? 1 : 0, transform: entered ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s ease 0.2s", textAlign: "center", marginBottom: 20,
        }}>
          <div style={{
            fontSize: 11, letterSpacing: "0.4em", color: "#C8A96E",
            fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 12,
          }}>FifteenConsult</div>
          <h1 style={{
            fontSize: 52, fontWeight: 300, color: "#E8E4D9", lineHeight: 1.1,
            letterSpacing: "-0.02em", marginBottom: 8,
          }}>The Fifteen Framework</h1>
          <div style={{
            width: 60, height: 1, background: "linear-gradient(90deg, transparent, #C8A96E, transparent)",
            margin: "16px auto",
          }} />
          <p style={{
            fontSize: 15, color: "#666", fontFamily: "'DM Mono', monospace",
            fontWeight: 300, maxWidth: 540, margin: "0 auto", lineHeight: 1.7,
          }}>
            Five stages. Fifteen pillars. One story.<br />
            From discovery to measurable growth.
          </p>
        </div>

        {/* Main Layout */}
        <div style={{ display: "flex", gap: 0, alignItems: "flex-start", marginTop: 20 }}>

          {/* Pentagon Diagram */}
          <div style={{
            width: 600, height: 600, flexShrink: 0, position: "relative",
            opacity: entered ? 1 : 0, transition: "opacity 1s ease 0.4s",
          }}>
            <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
              {/* Outer ring */}
              <circle cx={cx} cy={cy} r={radius + 40} fill="none" stroke="#C8A96E" strokeWidth="0.3" opacity="0.2" />
              <circle cx={cx} cy={cy} r={radius + 80} fill="none" stroke="#C8A96E" strokeWidth="0.2" opacity="0.08" />

              {/* Rotating dashed orbit */}
              <circle cx={cx} cy={cy} r={radius + 60} fill="none" stroke="#C8A96E"
                strokeWidth="0.4" opacity="0.12" strokeDasharray="4 8"
                style={{ animation: "rotate 120s linear infinite", transformOrigin: `${cx}px ${cy}px` }} />

              {/* Connection lines between stages */}
              {STAGES.map((s, i) => {
                const next = STAGES[(i + 1) % 5];
                const p1 = getPos(s.angle);
                const p2 = getPos(next.angle);
                const isActive = active === s.id || active === next.id;
                return (
                  <line key={`line-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                    stroke="#C8A96E" strokeWidth={isActive ? 1.5 : 0.6}
                    opacity={isActive ? 0.6 : 0.15}
                    style={{ transition: "all 0.4s ease" }}
                  />
                );
              })}

              {/* Center mark */}
              <text x={cx} y={cy - 18} textAnchor="middle" fill="#C8A96E" fontSize="42"
                fontFamily="Cormorant Garamond, serif" fontWeight="300" opacity="0.25">15</text>
              <text x={cx} y={cy + 14} textAnchor="middle" fill="#666" fontSize="8"
                fontFamily="DM Mono, monospace" letterSpacing="3" opacity="0.4">FRAMEWORK</text>

              {/* Stage nodes */}
              {STAGES.map((s) => {
                const pos = getPos(s.angle);
                const isActive = active === s.id;
                return (
                  <g key={s.id} className="stage-node" onClick={() => setActive(isActive ? null : s.id)}>
                    {/* Glow */}
                    {isActive && (
                      <circle cx={pos.x} cy={pos.y} r={44} fill="none" stroke={s.color}
                        strokeWidth="1" opacity="0.3" style={{ animation: "pulse 2s ease infinite" }} />
                    )}
                    {/* Outer circle */}
                    <circle cx={pos.x} cy={pos.y} r={isActive ? 38 : 34}
                      fill={isActive ? "#151C33" : "#0F1628"}
                      stroke={s.color} strokeWidth={isActive ? 2 : 0.8}
                      style={{ transition: "all 0.4s ease" }} />
                    {/* Number */}
                    <text x={pos.x} y={pos.y - 6} textAnchor="middle" fill={s.color}
                      fontSize="10" fontFamily="DM Mono, monospace" fontWeight="400"
                      opacity={isActive ? 1 : 0.5}>{s.num}</text>
                    {/* Name */}
                    <text x={pos.x} y={pos.y + 10} textAnchor="middle" fill="#E8E4D9"
                      fontSize={isActive ? "13" : "12"} fontFamily="Cormorant Garamond, serif"
                      fontWeight={isActive ? "600" : "400"}
                      style={{ transition: "all 0.3s ease" }}>{s.name}</text>
                  </g>
                );
              })}

              {/* Flow arrows (small triangles on the connection lines) */}
              {STAGES.map((s, i) => {
                const next = STAGES[(i + 1) % 5];
                const p1 = getPos(s.angle);
                const p2 = getPos(next.angle);
                const mx = (p1.x + p2.x) / 2;
                const my = (p1.y + p2.y) / 2;
                const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
                return (
                  <polygon key={`arrow-${i}`}
                    points="-4,-3 4,0 -4,3"
                    fill="#C8A96E" opacity="0.25"
                    transform={`translate(${mx}, ${my}) rotate(${angle})`} />
                );
              })}
            </svg>
          </div>

          {/* Detail Panel */}
          <div style={{
            flex: 1, minHeight: 500, display: "flex", flexDirection: "column",
            justifyContent: "center", paddingLeft: 20,
          }}>
            {!activeStage && (
              <div style={{
                opacity: entered ? 1 : 0, transition: "opacity 0.6s ease 0.8s",
              }}>
                <div style={{
                  fontSize: 11, letterSpacing: "0.3em", color: "#C8A96E",
                  fontFamily: "'DM Mono', monospace", textTransform: "uppercase", marginBottom: 16,
                }}>Select a stage</div>
                <p style={{
                  fontSize: 18, color: "#555", lineHeight: 1.8, fontWeight: 300,
                }}>
                  Click any node to explore the three pillars within each stage.
                  Together, the five stages form a continuous cycle —
                  Diagnose feeds back into Discover, and the system compounds with every rotation.
                </p>

                <div style={{ marginTop: 40 }}>
                  <button onClick={() => setShowMetrics(!showMetrics)} style={{
                    background: "none", border: `1px solid ${showMetrics ? '#C8A96E' : '#2a2a3a'}`,
                    color: showMetrics ? "#C8A96E" : "#555", padding: "8px 20px",
                    fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: "0.2em",
                    textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
                    transition: "all 0.3s ease",
                  }}>
                    {showMetrics ? "Hide" : "Show"} the 15 Metrics
                  </button>

                  {showMetrics && (
                    <div style={{ marginTop: 24 }}>
                      {Object.entries(METRICS).map(([cat, items], ci) => (
                        <div key={cat} style={{ marginBottom: 20 }}>
                          <div style={{
                            fontSize: 10, letterSpacing: "0.25em", color: "#C8A96E",
                            fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
                            marginBottom: 8,
                          }}>{cat}</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {items.map((m, mi) => (
                              <span key={m} className="metric-tag" style={{
                                fontSize: 11, color: "#888", padding: "4px 10px",
                                border: "1px solid #1e2a3a", borderRadius: 2,
                                fontFamily: "'DM Mono', monospace",
                                animationDelay: `${ci * 0.1 + mi * 0.05}s`,
                              }}>{m}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeStage && (
              <div key={activeStage.id} style={{ animation: "fadeUp 0.4s ease forwards" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 48, fontWeight: 300, color: activeStage.color, lineHeight: 1,
                    fontFamily: "'DM Mono', monospace", opacity: 0.4,
                  }}>{activeStage.num}</span>
                  <h2 style={{
                    fontSize: 36, fontWeight: 400, color: "#E8E4D9",
                    letterSpacing: "-0.01em",
                  }}>{activeStage.name}</h2>
                </div>

                <div style={{
                  fontSize: 13, color: activeStage.color, fontFamily: "'DM Mono', monospace",
                  letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16,
                }}>{activeStage.verb}</div>

                <p style={{
                  fontSize: 15, color: "#777", lineHeight: 1.8, fontWeight: 300,
                  marginBottom: 32, maxWidth: 460,
                }}>{activeStage.description}</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {activeStage.pillars.map((p, i) => (
                    <div key={p.name} className="pillar-card" style={{
                      background: "linear-gradient(135deg, #111827, #0F1628)",
                      border: "1px solid #1e2a3a", borderRadius: 3, padding: "18px 22px",
                      borderLeft: `3px solid ${activeStage.color}`,
                      animationDelay: `${i * 0.1}s`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                        <span style={{
                          fontSize: 10, color: activeStage.color, fontFamily: "'DM Mono', monospace",
                          opacity: 0.6,
                        }}>{String(parseInt(activeStage.num) * 3 - 2 + i).padStart(2, "0")}</span>
                        <span style={{
                          fontSize: 16, color: "#E8E4D9", fontWeight: 500,
                        }}>{p.name}</span>
                      </div>
                      <p style={{
                        fontSize: 13, color: "#666", fontFamily: "'DM Mono', monospace",
                        fontWeight: 300, lineHeight: 1.7,
                      }}>{p.desc}</p>
                    </div>
                  ))}
                </div>

                <button onClick={() => setActive(null)} style={{
                  marginTop: 24, background: "none", border: "1px solid #1e2a3a",
                  color: "#555", padding: "6px 16px", fontSize: 11,
                  fontFamily: "'DM Mono', monospace", letterSpacing: "0.15em",
                  textTransform: "uppercase", cursor: "pointer", borderRadius: 2,
                }}>Back to overview</button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom: The journey in one line */}
        <div style={{
          marginTop: 40, padding: "28px 0", borderTop: "1px solid #1a1f2e",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          opacity: entered ? 1 : 0, transition: "opacity 1s ease 1.2s",
        }}>
          {STAGES.map((s, i) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span onClick={() => setActive(s.id)} style={{
                fontSize: 13, color: active === s.id ? s.color : "#444",
                cursor: "pointer", fontWeight: active === s.id ? 600 : 300,
                transition: "all 0.3s ease", letterSpacing: "0.05em",
              }}>{s.name}</span>
              {i < 4 && (
                <span style={{ color: "#2a2a3a", fontSize: 10 }}>→</span>
              )}
              {i === 4 && (
                <span style={{ color: "#2a2a3a", fontSize: 10, marginLeft: 4 }}>↻</span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: "center", padding: "20px 0", marginTop: 10,
          opacity: entered ? 1 : 0, transition: "opacity 1s ease 1.4s",
        }}>
          <span style={{
            fontSize: 10, letterSpacing: "0.3em", color: "#333",
            fontFamily: "'DM Mono', monospace", textTransform: "uppercase",
          }}>Storytelling as Strategic Infrastructure</span>
        </div>
      </div>
    </div>
  );
}