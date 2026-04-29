import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { label: "Active Disasters", value: 24, suffix: "", icon: "🌊" },
  { label: "Lives Saved", value: 12847, suffix: "+", icon: "❤️" },
  { label: "Rescue Teams", value: 340, suffix: "+", icon: "🚁" },
  { label: "Aid Delivered", value: 98, suffix: "%", icon: "📦" },
];

const FEATURES = [
  {
    icon: "🗺️",
    title: "Live Disaster Map",
    desc: "Real-time interactive map showing active disasters, rescue teams, and evacuation zones across all districts.",
    link: "/public-map",
    color: "#ef4444",
  },
  {
    icon: "🚨",
    title: "Instant Alerts",
    desc: "Socket-powered live alerts broadcast to all users instantly. Zero delay emergency notifications with sound.",
    link: "/login",
    color: "#f97316",
  },
  {
    icon: "🆘",
    title: "Request Aid",
    desc: "Victims can request food, water, medicine, or rescue without login. Track your request status live.",
    link: "/victim/request-help",
    color: "#eab308",
  },
  {
    icon: "📊",
    title: "Admin Dashboard",
    desc: "Full control panel with live stats, resource management, rescue team coordination and PDF reports.",
    link: "/login",
    color: "#22c55e",
  },
  {
    icon: "🏥",
    title: "Resource Tracking",
    desc: "Track food, medicine, shelter and equipment inventory across all warehouses in real time.",
    link: "/login",
    color: "#3b82f6",
  },
  {
    icon: "🌤️",
    title: "Weather Integration",
    desc: "Live weather data for all disaster zones. Storm and flood risk indicators powered by OpenWeather API.",
    link: "/public-map",
    color: "#a855f7",
  },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [alertVisible, setAlertVisible] = useState(true);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "#ef4444" : "#f97316",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      // Draw connections
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(239,68,68,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Live Alert Banner */}
      {alertVisible && (
        <div style={styles.alertBanner}>
          <span style={styles.alertDot} />
          <span>🚨 LIVE: 3 active disasters being monitored — Flood warning in Sylhet, Cyclone alert in Cox's Bazar</span>
          <button onClick={() => setAlertVisible(false)} style={styles.alertClose}>✕</button>
        </div>
      )}

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            LIVE SYSTEM ACTIVE
          </div>

          <h1 style={styles.heroTitle}>
            Smart Disaster &<br />
            <span style={styles.heroGradient}>Relief Management</span>
          </h1>

          <p style={styles.heroSub}>
            Real-time disaster monitoring, rescue coordination, and public safety platform.
            Built to save lives — fast.
          </p>

          <div style={styles.heroBtns}>
            <button
              onClick={() => navigate("/public-map")}
              style={styles.btnPrimary}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              🗺️ View Live Map
            </button>
            <button
              onClick={() => navigate("/victim/request-help")}
              style={styles.btnDanger}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              🆘 Request Help NOW
            </button>
            <button
              onClick={() => navigate("/login")}
              style={styles.btnOutline}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              🔐 Admin Login
            </button>
          </div>

          <div style={styles.heroMeta}>
            <span>✅ 100% Free & Open</span>
            <span>⚡ Real-time Updates</span>
            <span>🌏 Bangladesh Coverage</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div style={styles.heroVisual}>
          <div style={styles.glowCircle} />
          <div style={styles.radarRing1} />
          <div style={styles.radarRing2} />
          <div style={styles.radarRing3} />
          <div style={styles.radarCenter}>
            <span style={{ fontSize: 48 }}>🌍</span>
          </div>
          <div style={{ ...styles.floatBadge, top: "10%", right: "5%" }}>
            <span>🔴</span> Flood — Sylhet
          </div>
          <div style={{ ...styles.floatBadge, top: "40%", left: "0%" }}>
            <span>🟠</span> Cyclone — Cox's Bazar
          </div>
          <div style={{ ...styles.floatBadge, bottom: "15%", right: "10%" }}>
            <span>🟡</span> Drought — Rajshahi
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        {STATS.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statValue}>
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>
          Everything You Need to{" "}
          <span style={styles.heroGradient}>Respond Faster</span>
        </h2>
        <p style={styles.sectionSub}>
          A complete disaster management ecosystem — from reporting to recovery.
        </p>
        <div style={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={styles.featureCard}
              onClick={() => navigate(f.link)}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = f.color;
                e.currentTarget.style.boxShadow = `0 0 24px ${f.color}33`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ ...styles.featureIcon, background: `${f.color}22`, border: `1px solid ${f.color}44` }}>
                {f.icon}
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
              <span style={{ ...styles.featureLink, color: f.color }}>Learn more →</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <h2 style={styles.ctaTitle}>Ready to Make a Difference?</h2>
          <p style={styles.ctaSub}>
            Join rescue teams, report disasters, or volunteer — every action saves lives.
          </p>
          <div style={styles.heroBtns}>
            <button
              onClick={() => navigate("/register")}
              style={styles.btnPrimary}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              🙋 Register as Volunteer
            </button>
            <button
              onClick={() => navigate("/report-disaster")}
              style={styles.btnDanger}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            >
              📢 Report a Disaster
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f0a 100%)",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
    position: "relative",
    overflowX: "hidden",
  },
  canvas: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    pointerEvents: "none",
    zIndex: 0,
  },
  alertBanner: {
    position: "relative",
    zIndex: 10,
    background: "linear-gradient(90deg, #7f1d1d, #991b1b)",
    color: "#fca5a5",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    fontWeight: 500,
  },
  alertDot: {
    width: 8, height: 8,
    borderRadius: "50%",
    background: "#ef4444",
    display: "inline-block",
    animation: "pulse 1s infinite",
    flexShrink: 0,
  },
  alertClose: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    color: "#fca5a5",
    cursor: "pointer",
    fontSize: 16,
  },
  hero: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "80px 60px",
    minHeight: "85vh",
    gap: 40,
    flexWrap: "wrap",
  },
  heroContent: {
    flex: "1 1 480px",
    maxWidth: 600,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(239,68,68,0.15)",
    border: "1px solid rgba(239,68,68,0.4)",
    color: "#fca5a5",
    padding: "6px 16px",
    borderRadius: 100,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 24,
  },
  badgeDot: {
    width: 7, height: 7,
    borderRadius: "50%",
    background: "#ef4444",
    display: "inline-block",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: 20,
    color: "#fff",
  },
  heroGradient: {
    background: "linear-gradient(90deg, #ef4444, #f97316, #eab308)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 18,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.7,
    marginBottom: 36,
    maxWidth: 480,
  },
  heroBtns: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 24,
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
  },
  btnDanger: {
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
  },
  btnOutline: {
    background: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "14px 28px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  heroMeta: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
  },
  heroVisual: {
    flex: "1 1 300px",
    maxWidth: 420,
    position: "relative",
    height: 400,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  glowCircle: {
    position: "absolute",
    width: 300, height: 300,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
  },
  radarRing1: {
    position: "absolute",
    width: 300, height: 300,
    borderRadius: "50%",
    border: "1px solid rgba(239,68,68,0.2)",
    animation: "ping 3s ease-out infinite",
  },
  radarRing2: {
    position: "absolute",
    width: 200, height: 200,
    borderRadius: "50%",
    border: "1px solid rgba(249,115,22,0.3)",
    animation: "ping 3s ease-out infinite 1s",
  },
  radarRing3: {
    position: "absolute",
    width: 100, height: 100,
    borderRadius: "50%",
    border: "1px solid rgba(234,179,8,0.4)",
    animation: "ping 3s ease-out infinite 2s",
  },
  radarCenter: {
    position: "relative",
    zIndex: 2,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "50%",
    width: 80, height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  floatBadge: {
    position: "absolute",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "6px 12px",
    fontSize: 12,
    color: "#fff",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  statsSection: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
    padding: "40px 40px 60px",
  },
  statCard: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "32px 40px",
    textAlign: "center",
    flex: "1 1 160px",
    maxWidth: 200,
  },
  statIcon: { fontSize: 32, marginBottom: 12 },
  statValue: {
    fontSize: 36,
    fontWeight: 800,
    background: "linear-gradient(90deg, #ef4444, #f97316)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 6,
  },
  statLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
    fontWeight: 500,
  },
  featuresSection: {
    position: "relative",
    zIndex: 1,
    padding: "60px 60px",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 800,
    marginBottom: 12,
  },
  sectionSub: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    marginBottom: 48,
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
    textAlign: "left",
  },
  featureCard: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 28,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  featureIcon: {
    width: 52, height: 52,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
    color: "#fff",
  },
  featureDesc: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
    lineHeight: 1.7,
    marginBottom: 16,
  },
  featureLink: {
    fontSize: 13,
    fontWeight: 600,
  },
  ctaSection: {
    position: "relative",
    zIndex: 1,
    padding: "60px 40px 100px",
    display: "flex",
    justifyContent: "center",
  },
  ctaBox: {
    background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 24,
    padding: "60px 60px",
    textAlign: "center",
    maxWidth: 700,
    width: "100%",
    backdropFilter: "blur(10px)",
  },
  ctaTitle: {
    fontSize: "clamp(24px, 3vw, 38px)",
    fontWeight: 800,
    marginBottom: 14,
  },
  ctaSub: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    marginBottom: 36,
  },
};