import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ============================================================
   RISHU SINGH — DEVELOPER PORTFOLIO
   Theme: dark void + pink/violet signal, terminal-voiced HUD
   Signature: the whole page speaks in a persistent code voice —
   section dividers type like a shell, nav tracks like a scroll-spy
   process list, and Cmd+K opens a real command palette.
   ============================================================ */

// ---------- DATA ----------

const PROJECTS = [
  {
    id: "khushi",
    name: "Khushi Pawar",
    role: "Influencer Portfolio",
    desc: "Dark-themed personal site with a custom cursor and an in-built AI chatbot answering on her behalf.",
    tech: ["HTML", "CSS", "Vanilla JS"],
    link: "https://khushi-insta-landing-page.vercel.app",
    accent: "#FF2D78",
    status: "live",
  },
  {
    id: "vaishno",
    name: "Vaishno Devi",
    role: "Pilgrimage Website",
    desc: "A temple trip's digital memory — animated, calm, and built to feel like a journey, not a brochure.",
    tech: ["React", "Vite"],
    link: "https://vaishno-devi.vercel.app",
    accent: "#7C3AED",
    status: "live",
  },
  {
    id: "shaff",
    name: "Shaff Birthday",
    role: "Digital Scrapbook",
    desc: "A one-page gift — polaroid gallery, confetti, and base64-embedded memories for a close friend.",
    tech: ["HTML", "CSS", "JS"],
    link: "https://shaff-birthday.vercel.app",
    accent: "#FF2D78",
    status: "live",
  },
  {
    id: "rohit",
    name: "Rohit Portfolio",
    role: "Personal Site v1",
    desc: "An earlier portfolio pass — typed strict, and shipped on the modern Next.js stack.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
    link: "https://rohit-portfolio-fawn-sigma.vercel.app",
    accent: "#7C3AED",
    status: "live",
  },
];

const SKILLS = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 80 },
  { name: "JavaScript", level: 92 },
  { name: "TypeScript", level: 75 },
  { name: "Tailwind CSS", level: 90 },
  { name: "WordPress", level: 78 },
  { name: "HTML / CSS", level: 95 },
  { name: "Framer Motion", level: 82 },
];

const SERVICES = [
  {
    code: "01",
    title: "Web Development",
    desc: "Full builds from scratch — fast, responsive, production-ready.",
  },
  {
    code: "02",
    title: "Landing Pages",
    desc: "Conversion-focused single pages for launches and campaigns.",
  },
  {
    code: "03",
    title: "Portfolios",
    desc: "Personal sites that make the first impression do the work.",
  },
  {
    code: "04",
    title: "WordPress Sites",
    desc: "Custom themes, fast setup, client-editable out of the box.",
  },
];

const TYPED_LINES = [
  "I build Websites.",
  "I create Experiences.",
  "I code Dreams.",
];

const SOCIALS = [
  { name: "GitHub", handle: "@Mrrishu4ever", href: "https://github.com/Mrrishu4ever" },
  { name: "Fiverr", handle: "mrrishu4ever", href: "https://fiverr.com/mrrishu4ever" },
  { name: "Instagram", handle: "@ohh.rishu", href: "https://www.instagram.com/ohh.rishu/" },
  { name: "WhatsApp", handle: "+91 87575 87540", href: "https://wa.me/918757587540" },
  { name: "LinkedIn", handle: "rohitx05", href: "https://www.linkedin.com/in/rohitx05/" },
  { name: "Gmail", handle: "mrrishu4ever@gmail.com", href: "mailto:mrrishu4ever@gmail.com" },
];

const SECTIONS = ["top", "about", "projects", "services", "contact"];
const SECTION_LABELS = { top: "hero", about: "about", projects: "projects", services: "services", contact: "contact" };

const COMMANDS = [
  { id: "github", label: "open github", run: "https://github.com/Mrrishu4ever" },
  { id: "whatsapp", label: "message on whatsapp", run: "https://wa.me/918757587540" },
  { id: "linkedin", label: "open linkedin", run: "https://www.linkedin.com/in/rohitx05/" },
  { id: "email", label: "email rishu", run: "mailto:mrrishu4ever@gmail.com" },
  { id: "fiverr", label: "open fiverr profile", run: "https://fiverr.com/mrrishu4ever" },
  { id: "about", label: "go to about", run: "#about" },
  { id: "projects", label: "go to projects", run: "#projects" },
  { id: "services", label: "go to services", run: "#services" },
  { id: "contact", label: "go to contact", run: "#contact" },
  { id: "top", label: "go to top", run: "#top" },
];

// ---------- CURSOR (custom + magnetic + trail) ----------

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 300 });
  const sy = useSpring(y, { damping: 25, stiffness: 300 });
  const [trail, setTrail] = useState([]);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let last = 0;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      if (now - last > 45) {
        last = now;
        setTrail((t) => [...t.slice(-7), { x: e.clientX, y: e.clientY, id: now }]);
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovering(!!el?.closest("[data-magnetic]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div className="cursor-root">
      {trail.map((t, i) => (
        <motion.div
          key={t.id}
          className="cursor-trail-dot"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ left: t.x, top: t.y, background: i % 2 ? "#FF2D78" : "#7C3AED" }}
        />
      ))}
      <motion.div
        className="cursor-dot"
        style={{ x: sx, y: sy, scale: hovering ? 2.6 : 1 }}
      />
    </div>
  );
}

function Magnetic({ children, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      ref={ref}
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// ---------- CINEMATIC LIGHT BARS (mouse-reactive, alive backdrop) ----------

function LightBars() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 30, stiffness: 60 });
  const smy = useSpring(my, { damping: 30, stiffness: 60 });

  const beamShift = useTransform(smx, [0, 1], [-40, 40]);
  const beamTilt = useTransform(smy, [0, 1], [-4, 4]);
  const glowX = useTransform(smx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(smy, [0, 1], ["10%", "60%"]);

  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const dust = useRef(
    Array.from({ length: 26 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.4 + 0.6,
      dur: Math.random() * 10 + 8,
      delay: Math.random() * 6,
      drift: Math.random() * 30 - 15,
    }))
  ).current;

  return (
    <div className="lightbars" ref={ref} aria-hidden="true">
      <motion.div className="hero-glow" style={{ left: glowX, top: glowY }} />
      <motion.svg
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid slice"
        style={{ x: beamShift, rotate: beamTilt }}
      >
        <defs>
          <linearGradient id="warmBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF2D78" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="warmBeam2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#FF2D78" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.rect
              key={i}
              x={120 + i * 95}
              y={-120}
              width={26}
              height={900}
              transform={`rotate(28 ${120 + i * 95} 350)`}
              fill={i % 2 === 0 ? "url(#warmBeam)" : "url(#warmBeam2)"}
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </motion.g>
      </motion.svg>
      <div className="dust-field">
        {dust.map((d, i) => (
          <motion.span
            key={i}
            className="dust-mote"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
            animate={{ y: [0, -24, 0], x: [0, d.drift, 0], opacity: [0, 0.7, 0] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------- AMBIENT GLOW (carries beams/dust feeling into rest of page) ----------

function AmbientGlow() {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { damping: 40, stiffness: 40 });
  const smy = useSpring(my, { damping: 40, stiffness: 40 });
  const glowX = useTransform(smx, [0, 1], ["10%", "90%"]);
  const glowY = useTransform(smy, [0, 1], ["10%", "90%"]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      className="ambient-glow"
      style={{ left: glowX, top: glowY }}
      aria-hidden="true"
    />
  );
}

// ---------- STARFIELD BACKGROUND ----------

function Starfield() {
  const stars = useRef(
    Array.from({ length: 90 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      dur: Math.random() * 4 + 3,
      delay: Math.random() * 4,
    }))
  ).current;

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ---------- SCROLL PROGRESS BAR ----------

function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return <motion.div className="scroll-bar" style={{ width }} />;
}

// ---------- SECTION DIVIDER (terminal-voiced transition between sections) ----------

function SectionDivider({ from, to }) {
  const [text, setText] = useState("");
  const ref = useRef(null);
  const full = `loading_${to}.module()...`;
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const iv = setInterval(() => {
            i++;
            setText(full.slice(0, i));
            if (i >= full.length) clearInterval(iv);
          }, 28);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [full]);

  return (
    <div className="section-divider mono" ref={ref}>
      <span className="divider-line" />
      <span className="divider-text">{text || "\u00A0"}</span>
      <span className="divider-line" />
    </div>
  );
}

// ---------- SCROLL-SPY NAV ----------

function useActiveSection() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4, rootMargin: "-80px 0px -40% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Nav({ onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const links = ["About", "Projects", "Services", "Contact"];

  return (
    <header className="nav">
      <Magnetic className="nav-logo" as="div">
        <span className="mono">~/</span>rishu
      </Magnetic>
      <nav className="nav-links">
        {links.map((l) => {
          const id = l.toLowerCase();
          const isActive = active === id;
          return (
            <Magnetic key={l} as="a" href={`#${id}`} className={`nav-link ${isActive ? "is-active" : ""}`}>
              {isActive && (
                <motion.span
                  className="nav-dot"
                  layoutId="nav-dot"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="mono dim">//</span> {l}
            </Magnetic>
          );
        })}
      </nav>
      <div className="nav-right">
        <button className="nav-kbd" onClick={onOpenPalette} aria-label="Open command palette">
          <span className="mono">⌘K</span>
        </button>
        <Magnetic
          as="a"
          href="https://wa.me/918757587540"
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
        >
          Hire Me
        </Magnetic>
      </div>

      <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu">
        <span className={open ? "open" : ""} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                {l}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ---------- COMMAND PALETTE (Cmd+K easter egg) ----------

function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const runCommand = (cmd) => {
    if (!cmd) return;
    if (cmd.run.startsWith("#")) {
      document.querySelector(cmd.run)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(cmd.run, "_blank", "noreferrer");
    }
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(filtered[selected]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="palette-box"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input-row mono">
              <span className="prompt">$</span>
              <input
                ref={inputRef}
                className="palette-input mono"
                placeholder="type a command..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onKeyDown}
              />
              <span className="palette-esc mono">esc</span>
            </div>
            <div className="palette-list">
              {filtered.length === 0 && (
                <div className="palette-empty mono dim">no command found</div>
              )}
              {filtered.map((c, i) => (
                <div
                  key={c.id}
                  className={`palette-item mono ${i === selected ? "is-selected" : ""}`}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => runCommand(c)}
                >
                  <span className="prompt">›</span> {c.label}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- HERO ----------

function TypingLine() {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPED_LINES[lineIdx];
    let timeout;
    if (!deleting && text.length < full.length) {
      timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), 55);
    } else if (!deleting && text.length === full.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), 30);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setLineIdx((i) => (i + 1) % TYPED_LINES.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, lineIdx]);

  return (
    <span className="typed">
      {text}
      <span className="caret">_</span>
    </span>
  );
}

function Hero() {
  const name = "Rishu Singh".split("");
  const tx = useMotionValue(0.5);
  const ty = useMotionValue(0.5);
  const stx = useSpring(tx, { damping: 25, stiffness: 90 });
  const sty = useSpring(ty, { damping: 25, stiffness: 90 });
  const cardRotateX = useTransform(sty, [0, 1], [6, -6]);
  const cardRotateY = useTransform(stx, [0, 1], [-8, 8]);

  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx.set((e.clientX - r.left) / r.width);
      ty.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [tx, ty]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <LightBars />
      <div className="hero-grid">
        <motion.div
          className="hero-left"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
        >
          <motion.p
            className="eyebrow mono"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="dot-live" /> available_for_work: true
          </motion.p>

          <h1 className="hero-name">
            {name.map((ch, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: 40, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h1>

          <h2 className="hero-typed">
            <TypingLine />
          </h2>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Building stunning websites for businesses & creators.
            <br />
            React · WordPress · HTML/CSS · Next.js — out of Bangalore, India.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
          >
            <Magnetic as="a" href="#projects" className="btn btn-primary">
              View Work →
            </Magnetic>
            <Magnetic as="a" href="#contact" className="btn btn-ghost">
              Let's Talk
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="terminal-card"
            style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="terminal-bar">
              <span className="tdot" style={{ background: "#FF5F56" }} />
              <span className="tdot" style={{ background: "#FFBD2E" }} />
              <span className="tdot" style={{ background: "#27C93F" }} />
              <span className="mono terminal-title">rishu@bangalore: whoami</span>
            </div>
            <div className="terminal-body mono">
              <p>
                <span className="prompt">$</span> whoami
              </p>
              <p className="out">Rishu Singh — Full Stack Web Developer</p>
              <p>
                <span className="prompt">$</span> cat stack.json
              </p>
              <p className="out">
                {"{"} <br />
                &nbsp;&nbsp;"frontend": ["React", "Next.js", "TS"],
                <br />
                &nbsp;&nbsp;"styling": ["Tailwind", "Framer Motion"],
                <br />
                &nbsp;&nbsp;"cms": ["WordPress"],
                <br />
                &nbsp;&nbsp;"status": "shipping"
                <br />
                {"}"}
              </p>
              <p>
                <span className="prompt">$</span> <span className="blink-cursor">▌</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-hint mono"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}

// ---------- ABOUT (bento grid) ----------

function SkillTile({ name, level, i, big }) {
  return (
    <motion.div
      className={`bento-tile ${big ? "bento-tile-wide" : ""}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="skill-label">
        <span>{name}</span>
        <span className="mono dim">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <SectionHead tag="// 01_about" title="A bit about the build" />
      <div className="about-grid">
        <motion.div
          className="bento-tile bento-copy"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>
            I'm a full-stack developer who treats every site like a product,
            not a template. From WordPress brochure sites to React/Next.js
            applications, I care about how a page feels in the first three
            seconds — fast loads, tight animation, zero clutter.
          </p>
          <p className="bento-sub mono dim">based_in: "Bangalore, India"</p>
        </motion.div>
        <div className="bento-grid">
          {SKILLS.map((s, i) => (
            <SkillTile key={s.name} {...s} i={i} big={i === 0 || i === 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ tag, title }) {
  return (
    <motion.div
      className="section-head"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="mono section-tag">{tag}</span>
      <h2 className="section-title">{title}</h2>
    </motion.div>
  );
}

// ---------- PROJECTS (tilt cards + live preview) ----------

function TiltCard({ project, i }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -10, y: px * 14 });
  };
  const reset = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const shortUrl = project.link.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      className="project-card"
      style={{ "--accent": project.accent }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      initial={{ opacity: 0, y: 50, rotateZ: i % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="project-glow" />
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-preview"
        aria-label={`Open ${project.name} live site`}
      >
        <div className="mock-browser-bar">
          <span className="mock-dot" />
          <span className="mock-dot" />
          <span className="mock-dot" />
          <span className="mock-url mono">{shortUrl}</span>
        </div>
        <div className="mock-browser-screen">
          <motion.div
            className="mock-screen-glow"
            animate={{ opacity: hovered ? 0.5 : 0.22, scale: hovered ? 1.15 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="mock-screen-bars">
            <span style={{ width: "62%" }} />
            <span style={{ width: "84%" }} />
            <span style={{ width: "40%" }} />
          </div>
          <motion.span
            className="mock-screen-cta"
            animate={{ opacity: hovered ? 1 : 0.7 }}
          >
            visit_live_site ↗
          </motion.span>
        </div>
      </a>
      <div className="project-top">
        <span className="mono project-role">{project.role}</span>
        <a href={project.link} target="_blank" rel="noreferrer" className="project-arrow" aria-label={`Open ${project.name}`}>
          ↗
        </a>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="tech-pill mono">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead tag="// 02_projects" title="Shipped & live" />
      <div className="project-rail">
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.id} project={p} i={i} />
        ))}
      </div>
    </section>
  );
}

// ---------- SERVICES ----------

function Services() {
  return (
    <section className="section" id="services">
      <SectionHead tag="// 03_services" title="What I can build for you" />
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.code}
            className="service-card"
            initial={{ opacity: 0, rotateY: -40, x: -20 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
          >
            <span className="mono service-code">{s.code}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ---------- CONTACT ----------

function Contact() {
  return (
    <section className="section contact" id="contact">
      <SectionHead tag="// 04_contact" title="Let's build something" />
      <motion.p
        className="contact-line"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Got a project in mind? I reply fastest on WhatsApp.
      </motion.p>
      <div className="contact-grid">
        {SOCIALS.map((s, i) => (
          <Magnetic
            as="a"
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="contact-card"
          >
            <span className="contact-name">{s.name}</span>
            <span className="contact-handle mono">{s.handle}</span>
          </Magnetic>
        ))}
      </div>
      <footer className="footer mono">
        © 2026 Rishu Singh — built with React & Framer Motion ·{" "}
        <span className="dim">press ⌘K to explore</span>
      </footer>
    </section>
  );
}

// ---------- WHATSAPP FLOAT ----------

function WhatsAppFloat() {
  return (
    <motion.a
      href="https://wa.me/918757587540"
      target="_blank"
      rel="noreferrer"
      className="wa-float"
      data-magnetic
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff">
        <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-1.71-.85-2.83-1.52-3.96-3.44-.3-.51.3-.48.86-1.6.1-.2.05-.36-.04-.51-.1-.15-.66-1.59-.9-2.18-.24-.58-.49-.5-.66-.51-.17-.01-.36-.01-.56-.01-.2 0-.51.07-.78.36-.27.29-1.03 1.01-1.03 2.46s1.06 2.86 1.21 3.06c.15.2 2.01 3.08 4.93 4.2 2.43.92 2.92.74 3.45.69.53-.05 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.38-.07-.12-.27-.19-.56-.34z" />
        <path d="M12.05 2C6.5 2 2 6.5 2 12.05c0 1.95.55 3.78 1.5 5.34L2.05 22l4.74-1.45c1.5.83 3.22 1.3 5.26 1.3 5.55 0 10.05-4.5 10.05-10.05S17.6 2 12.05 2zm0 18.1c-1.78 0-3.43-.52-4.82-1.42l-.34-.21-3.32 1.02 1.04-3.23-.23-.34a8.06 8.06 0 0 1-1.32-4.42c0-4.46 3.63-8.09 8.09-8.09 4.46 0 8.09 3.63 8.09 8.09-.01 4.46-3.64 8.6-7.19 8.6z" />
      </svg>
    </motion.a>
  );
}

// ---------- LOADER (name reveal) ----------

function Loader({ done }) {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <motion.h1
        className="loader-text"
        initial={{ letterSpacing: "0.5em", opacity: 0 }}
        animate={{ letterSpacing: "0em", opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        RISHU SINGH
      </motion.h1>
      <motion.div
        className="loader-bar-track"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="loader-bar-fill"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ---------- ROOT ----------

export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      <style>{CSS}</style>
      <AnimatePresence>{!loaded && <Loader done={loaded} />}</AnimatePresence>
      <CustomCursor />
      <ScrollBar />
      <Starfield />
      <AmbientGlow />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <SectionDivider from="hero" to="about" />
        <About />
        <SectionDivider from="about" to="projects" />
        <Projects />
        <SectionDivider from="projects" to="services" />
        <Services />
        <SectionDivider from="services" to="contact" />
        <Contact />
      </main>
      <WhatsAppFloat />
    </div>
  );
}

// ---------- CSS ----------

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root{
  --bg:#05000A;
  --surface:#0A0612;
  --border:#1A1024;
  --text:#E8E3F0;
  --dim:#8B7FA0;
  --pink:#FF2D78;
  --violet:#7C3AED;
}

*{box-sizing:border-box; cursor:none;}
html,body{margin:0;}
.app{
  background:var(--bg);
  color:var(--text);
  font-family:'Inter',sans-serif;
  position:relative;
  overflow-x:hidden;
  min-height:100vh;
}
.mono{font-family:'JetBrains Mono',monospace;}
.dim{color:var(--dim);}
a{color:inherit; text-decoration:none;}

@media (prefers-reduced-motion: reduce){
  *{animation-duration:0.001ms !important; transition-duration:0.001ms !important;}
}

/* ---------- cursor ---------- */
.cursor-root{position:fixed; inset:0; pointer-events:none; z-index:9999;}
.cursor-dot{
  position:fixed; top:0; left:0;
  width:18px; height:18px; margin:-9px 0 0 -9px;
  border-radius:50%;
  background:var(--pink);
  mix-blend-mode:difference;
}
.cursor-trail-dot{
  position:fixed; top:0; left:0;
  width:6px; height:6px; margin:-3px 0 0 -3px;
  border-radius:50%;
}
@media (max-width: 820px){
  *{cursor:auto;}
  .cursor-root{display:none;}
}

/* ---------- scroll bar ---------- */
.scroll-bar{
  position:fixed; top:0; left:0; height:3px;
  background:linear-gradient(90deg,var(--pink),var(--violet));
  z-index:9998;
}

/* ---------- ambient glow (page-wide alive feel) ---------- */
.ambient-glow{
  position:fixed; width:600px; height:600px; border-radius:50%;
  background:radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%);
  transform:translate(-50%,-50%);
  pointer-events:none; z-index:0;
}

/* ---------- starfield ---------- */
.starfield{position:fixed; inset:0; z-index:0; pointer-events:none;}
.star{position:absolute; background:#fff; border-radius:50%;}

/* ---------- loader ---------- */
.loader{
  position:fixed; inset:0; z-index:10000;
  background:var(--bg);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;
}
.loader-text{
  font-family:'Bricolage Grotesque',sans-serif;
  font-size:clamp(28px,6vw,52px);
  font-weight:700;
}
.loader-bar-track{width:200px; height:2px; background:var(--border); border-radius:2px; overflow:hidden;}
.loader-bar-fill{height:100%; background:linear-gradient(90deg,var(--pink),var(--violet));}

/* ---------- nav ---------- */
.nav{
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding:22px 5vw;
  background:linear-gradient(to bottom, rgba(5,0,10,0.85), transparent);
}
.nav-logo{font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:18px;}
.nav-links{display:flex; gap:28px;}
.nav-link{position:relative; font-size:14px; color:var(--dim); transition:color .2s; padding-bottom:6px;}
.nav-link:hover{color:var(--text);}
.nav-link.is-active{color:var(--text);}
.nav-dot{
  position:absolute; left:0; bottom:0; width:100%; height:2px;
  background:linear-gradient(90deg,var(--pink),var(--violet));
  border-radius:2px;
}
.nav-right{display:flex; align-items:center; gap:14px;}
.nav-kbd{
  background:var(--surface); border:1px solid var(--border); border-radius:8px;
  padding:6px 10px; font-size:12px; color:var(--dim);
}
.nav-cta{
  padding:9px 20px; border:1px solid var(--pink); border-radius:30px;
  font-size:13px; font-weight:600;
  background:rgba(255,45,120,0.08);
}
.nav-burger{display:none; background:none; border:none; width:30px; height:20px; position:relative; z-index:110;}
.nav-burger span, .nav-burger span::before, .nav-burger span::after{
  content:''; position:absolute; left:0; width:100%; height:2px; background:var(--text); transition:.3s;
}
.nav-burger span{top:9px;}
.nav-burger span::before{content:''; top:-8px;}
.nav-burger span::after{content:''; top:8px;}
.nav-mobile{
  position:fixed; inset:0; background:var(--bg); z-index:105;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px;
}
.nav-mobile a{font-size:28px; font-family:'Bricolage Grotesque',sans-serif;}

@media (max-width:820px){
  .nav-links, .nav-cta, .nav-kbd{display:none;}
  .nav-burger{display:block;}
}

/* ---------- command palette ---------- */
.palette-backdrop{
  position:fixed; inset:0; z-index:9000;
  background:rgba(5,0,10,0.7);
  display:flex; align-items:flex-start; justify-content:center;
  padding-top:14vh;
}
.palette-box{
  width:min(560px,88vw);
  background:rgba(15,9,22,0.95);
  border:1px solid var(--border);
  border-radius:14px;
  overflow:hidden;
  backdrop-filter:blur(20px);
  box-shadow:0 40px 100px -20px rgba(0,0,0,0.6);
}
.palette-input-row{display:flex; align-items:center; gap:10px; padding:16px 18px; border-bottom:1px solid var(--border);}
.palette-input{
  flex:1; background:none; border:none; outline:none; color:var(--text); font-size:14px;
}
.palette-input::placeholder{color:var(--dim);}
.palette-esc{font-size:11px; color:var(--dim); border:1px solid var(--border); border-radius:6px; padding:2px 6px;}
.palette-list{max-height:300px; overflow-y:auto; padding:8px;}
.palette-empty{padding:14px 12px; font-size:13px;}
.palette-item{
  display:flex; align-items:center; gap:8px;
  padding:10px 12px; border-radius:8px; font-size:13.5px; color:var(--dim);
  cursor:pointer;
}
.palette-item .prompt{color:var(--violet);}
.palette-item.is-selected{background:rgba(255,45,120,0.1); color:var(--text);}
.palette-item.is-selected .prompt{color:var(--pink);}

/* ---------- hero ---------- */
.hero{
  min-height:100vh; display:flex; flex-direction:column; justify-content:center;
  padding:120px 5vw 60px; position:relative; z-index:1; overflow:hidden;
}
.lightbars{
  position:absolute; inset:0; z-index:0; pointer-events:none;
  opacity:0.9; mix-blend-mode:screen; overflow:hidden;
}
.lightbars svg{width:100%; height:100%;}
.hero-glow{
  position:absolute; width:420px; height:420px; border-radius:50%;
  background:radial-gradient(circle, rgba(255,45,120,0.16), transparent 70%);
  transform:translate(-50%,-50%);
  filter:blur(10px);
}
.dust-field{position:absolute; inset:0;}
.dust-mote{
  position:absolute; border-radius:50%;
  background:rgba(232,227,240,0.55);
  box-shadow:0 0 4px rgba(255,255,255,0.4);
}
.hero-grid{display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; align-items:center; position:relative; z-index:1;}
.eyebrow{display:flex; align-items:center; gap:10px; color:var(--dim); font-size:13px; margin-bottom:18px;}
.dot-live{width:7px; height:7px; border-radius:50%; background:#27C93F; box-shadow:0 0 8px #27C93F; display:inline-block;}
.hero-name{
  font-family:'Bricolage Grotesque',sans-serif;
  font-size:clamp(48px,8vw,96px);
  font-weight:800; line-height:0.95; margin:0 0 18px;
  background:linear-gradient(135deg,#fff 30%,var(--pink) 90%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.hero-typed{
  font-family:'JetBrains Mono',monospace;
  font-size:clamp(18px,2.6vw,28px);
  color:var(--violet); font-weight:500; min-height:1.4em; margin-bottom:22px;
}
.caret{animation:blink 1s step-end infinite; color:var(--pink);}
@keyframes blink{50%{opacity:0;}}
.hero-bio{color:var(--dim); font-size:16px; line-height:1.7; max-width:440px; margin-bottom:34px;}
.hero-ctas{display:flex; gap:16px; flex-wrap:wrap;}
.btn{
  padding:14px 28px; border-radius:30px; font-weight:600; font-size:15px;
  display:inline-block;
}
.btn-primary{background:linear-gradient(135deg,var(--pink),var(--violet)); color:#fff;}
.btn-ghost{border:1px solid var(--border); color:var(--text);}

.terminal-card{
  background:rgba(20,12,30,0.6);
  border:1px solid var(--border);
  border-radius:16px;
  backdrop-filter:blur(16px);
  box-shadow:0 30px 80px -20px rgba(124,58,237,0.35);
  overflow:hidden;
  transform-style:preserve-3d;
}
.hero-right{perspective:1200px;}
.terminal-bar{display:flex; align-items:center; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border);}
.tdot{width:11px; height:11px; border-radius:50%;}
.terminal-title{margin-left:8px; font-size:12px; color:var(--dim);}
.terminal-body{padding:20px; font-size:13.5px; line-height:1.9;}
.prompt{color:var(--pink);}
.out{color:var(--dim); margin:4px 0 14px; white-space:pre-wrap;}
.blink-cursor{animation:blink 1s step-end infinite; color:var(--violet);}

.scroll-hint{position:absolute; bottom:24px; left:50%; transform:translateX(-50%); font-size:12px; color:var(--dim);}

@media (max-width:900px){
  .hero-grid{grid-template-columns:1fr;}
  .hero-right{order:-1; margin-bottom:20px;}
}

/* ---------- section divider (terminal voice transition) ---------- */
.section-divider{
  display:flex; align-items:center; gap:16px;
  padding:0 5vw; max-width:1200px; margin:0 auto;
  color:var(--dim); font-size:12px;
}
.divider-line{flex:1; height:1px; background:var(--border);}
.divider-text{white-space:nowrap; min-width:200px; text-align:center;}

/* ---------- sections ---------- */
.section{padding:80px 5vw; position:relative; z-index:1;}
.section-head{margin-bottom:50px;}
.section-tag{color:var(--violet); font-size:13px; display:block; margin-bottom:10px;}
.section-title{
  font-family:'Bricolage Grotesque',sans-serif;
  font-size:clamp(28px,4vw,44px); font-weight:700; margin:0;
}

/* ---------- about (bento) ---------- */
.about-grid{display:grid; grid-template-columns:1fr 1.3fr; gap:24px; align-items:start;}
.bento-tile{
  background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:24px;
}
.bento-copy{display:flex; flex-direction:column; gap:18px; height:100%;}
.bento-copy p{color:var(--dim); font-size:16.5px; line-height:1.8; margin:0;}
.bento-sub{font-size:13px; margin-top:auto;}
.bento-grid{display:grid; grid-template-columns:1fr 1fr; gap:16px;}
.bento-tile-wide{grid-column:span 2;}
.skill-label{display:flex; justify-content:space-between; font-size:14px; margin-bottom:10px;}
.skill-track{height:6px; background:var(--border); border-radius:4px; overflow:hidden;}
.skill-fill{height:100%; background:linear-gradient(90deg,var(--violet),var(--pink)); border-radius:4px;}

@media (max-width:900px){
  .about-grid{grid-template-columns:1fr;}
  .bento-grid{grid-template-columns:1fr 1fr;}
}
@media (max-width:560px){
  .bento-grid{grid-template-columns:1fr;}
  .bento-tile-wide{grid-column:span 1;}
}

/* ---------- projects ---------- */
.project-rail{
  display:grid; grid-template-columns:repeat(2,1fr); gap:24px;
}
.project-card{
  position:relative;
  display:block;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:18px;
  padding:24px;
  transform-style:preserve-3d;
  perspective:800px;
  overflow:hidden;
  transition:border-color .3s;
}
.project-card:hover{border-color:var(--accent);}
.project-glow{
  position:absolute; top:-40%; right:-20%; width:240px; height:240px; border-radius:50%;
  background:var(--accent); opacity:0.12; filter:blur(60px); pointer-events:none;
}
.project-preview{
  display:block;
  position:relative; width:100%; border-radius:12px; overflow:hidden;
  background:#0D0815; margin-bottom:18px; border:1px solid var(--border);
}
.mock-browser-bar{
  display:flex; align-items:center; gap:6px; padding:9px 12px;
  background:rgba(255,255,255,0.03); border-bottom:1px solid var(--border);
}
.mock-dot{width:8px; height:8px; border-radius:50%; background:var(--border);}
.mock-url{
  flex:1; text-align:center; font-size:11px; color:var(--dim);
  margin-right:24px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}
.mock-browser-screen{
  position:relative; height:140px; overflow:hidden;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
}
.mock-screen-glow{
  position:absolute; width:160px; height:160px; border-radius:50%;
  background:var(--accent); filter:blur(40px);
}
.mock-screen-bars{
  position:relative; display:flex; flex-direction:column; gap:8px; width:70%; z-index:1;
}
.mock-screen-bars span{
  display:block; height:7px; border-radius:4px;
  background:rgba(255,255,255,0.12);
}
.mock-screen-cta{
  position:relative; z-index:1; font-size:11.5px; color:var(--text);
  font-family:'JetBrains Mono',monospace;
  border:1px solid var(--accent); border-radius:20px; padding:5px 14px;
}
.project-top{display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;}
.project-role{font-size:12px; color:var(--dim);}
.project-arrow{color:var(--accent); font-size:18px;}
.project-name{font-family:'Bricolage Grotesque',sans-serif; font-size:26px; margin:0 0 10px;}
.project-desc{color:var(--dim); font-size:14.5px; line-height:1.6; margin-bottom:20px;}
.project-tech{display:flex; gap:8px; flex-wrap:wrap;}
.tech-pill{
  font-size:11.5px; padding:5px 12px; border-radius:20px;
  border:1px solid var(--border); color:var(--dim);
}

@media (max-width:900px){.project-rail{grid-template-columns:1fr;}}

/* ---------- services ---------- */
.services-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:20px;}
.service-card{
  background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:28px;
  transform-style:preserve-3d;
}
.service-code{color:var(--violet); font-size:13px;}
.service-card h3{font-family:'Bricolage Grotesque',sans-serif; margin:14px 0 10px; font-size:19px;}
.service-card p{color:var(--dim); font-size:14px; line-height:1.6; margin:0;}

@media (max-width:900px){.services-grid{grid-template-columns:repeat(2,1fr);}}
@media (max-width:560px){.services-grid{grid-template-columns:1fr;}}

/* ---------- contact ---------- */
.contact-line{color:var(--dim); font-size:17px; margin-bottom:40px;}
.contact-grid{display:grid; grid-template-columns:repeat(3,1fr); gap:16px;}
.contact-card{
  display:flex; flex-direction:column; gap:6px;
  padding:22px; border:1px solid var(--border); border-radius:14px;
  background:var(--surface);
}
.contact-card:hover{border-color:var(--pink);}
.contact-name{font-weight:600; font-size:15px;}
.contact-handle{font-size:13px; color:var(--dim);}
.footer{margin-top:60px; color:var(--dim); font-size:12.5px; text-align:center;}

@media (max-width:900px){.contact-grid{grid-template-columns:1fr 1fr;}}
@media (max-width:560px){.contact-grid{grid-template-columns:1fr;}}

/* ---------- whatsapp float ---------- */
.wa-float{
  position:fixed; bottom:26px; right:26px; z-index:200;
  width:58px; height:58px; border-radius:50%;
  background:#25D366;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 8px 24px rgba(37,211,102,0.4);
}
`;
