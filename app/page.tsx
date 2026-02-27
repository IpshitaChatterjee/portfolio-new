import React from "react";
import { DirectionAwareCard } from "./components/DirectionAwareCard";

/* ─────────────────────────────────────────────
   DATA — swap in your real content here
───────────────────────────────────────────── */
const PERSON = {
  name: "Your Name",
  initials: "YN",
  role: "Product Design Engineer",
  tagline: "Crafting interfaces\nthat think.",
  bio: "I build at the intersection of design and code — obsessing over the details that make products feel inevitable. Previously at Figma, Vercel.",
  location: "San Francisco, CA",
  email: "hello@yourname.com",
  currentWork: "a design token sync tool for multi-brand systems",
  currentSince: "Jan 2025",
};


const ARTICLES = [
  {
    title: "The Art of Invisible UX",
    publication: "Medium",
    readTime: "8 min",
    date: "Jan 2025",
    href: "#",
  },
  {
    title: "Why Design Systems Fail",
    publication: "Substack",
    readTime: "5 min",
    date: "Dec 2024",
    href: "#",
  },
  {
    title: "Spatial Computing & the Future of Interface",
    publication: "Personal Blog",
    readTime: "12 min",
    date: "Oct 2024",
    href: "#",
  },
];


const STACK = {
  Design: ["Figma", "Framer", "Spline", "Rive"],
  Development: ["React", "Next.js", "TypeScript", "Rust"],
  Tools: ["Vercel", "Linear", "Raycast", "Arc"],
};

const LINKS = [
  { label: "GitHub", href: "#", icon: GitHubIcon },
  { label: "Twitter / X", href: "#", icon: XIcon },
  { label: "LinkedIn", href: "#", icon: LinkedInIcon },
  { label: "Read.cv", href: "#", icon: CvIcon },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CvIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function MapPin({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}


/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function Portfolio() {
  return (
    <main
      className="min-h-screen"
      style={{
        background: "var(--bg)",
        paddingTop: "calc(52px + 1.5rem)",
        paddingBottom: "1.5rem",
      }}
    >
      <div className="bento-grid">

        {/* ── About Me ── */}
        <div className="bento-card card-hero" style={{ minHeight: 380, padding: 0 }}>
          {/* Full-bleed photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.jpg"
            alt="Ipshita"
            style={{
              width: "100%",
              aspectRatio: "4 / 3",
              objectFit: "cover",
              objectPosition: "center 15%",
              display: "block",
            }}
          />

          {/* Text content */}
          <div style={{ padding: "20px 24px 24px" }}>
            <span className="label">About</span>
            <h2
              style={{
                fontFamily: "var(--font-instrument-serif)",
                fontStyle: "italic",
                fontSize: 28,
                lineHeight: 1.2,
                color: "var(--text)",
                marginTop: 10,
                marginBottom: 12,
              }}
            >
              Ipshita
            </h2>
            <p
              style={{
                fontFamily: "var(--font-geist-sans)",
                fontSize: 13,
                lineHeight: 1.7,
                color: "var(--text-muted)",
              }}
            >
              Product designer with 7 years of experience, currently working at JP Morgan Chase. If you&apos;re looking for someone who can hold their own in a strategy meeting and then jump into Figma or code to bring ideas to life, let&apos;s talk.
            </p>

            {/* Status section */}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 20, paddingTop: 16 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="status-dot" />
                  <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 12, color: "var(--text)" }}>
                    Available for full-time roles in Germany
                  </span>
                </div>
                <a
                  href="mailto:ipshita.chatterjee02@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-button cta-button-sm"
                >
                  Say hello <ArrowUpRight size={11} />
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <span style={{ fontFamily: "var(--font-geist-sans)", fontSize: 11, color: "var(--text-muted)" }}>
                  See what I&apos;ve been doing on
                </span>
                <a href="#" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
                  <XIcon size={14} />
                </a>
                <a href="#" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GitHubIcon size={14} />
                </a>
                <a href="#" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedInIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Now ── */}
        <div className="bento-card card-now" style={{ minHeight: 160 }}>
          <div className="flex items-start justify-between">
            <span className="label">Now</span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: 4,
                padding: "2px 7px",
              }}
            >
              since {PERSON.currentSince}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: 20,
              lineHeight: 1.35,
              color: "var(--text-sub)",
              marginTop: 14,
            }}
          >
            Building {PERSON.currentWork}.
          </p>
        </div>

        {/* ── Work Card 1 ── */}
        <DirectionAwareCard
          className="card-work-1"
          imageUrl="/chase.png"
          label="Product Design · 2024"
          title="Redesigning Onboarding at Scale"
          description="Reduced drop-off by 34% through progressive disclosure and behavioural nudges."
          href="#"
        />

        {/* ── Writing ── */}
        <div className="bento-card card-writing" style={{ minHeight: 200 }}>
          <div className="flex items-center justify-between">
            <span className="label">Writing</span>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontSize: 10,
                color: "var(--text-muted)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              All articles <ArrowUpRight size={10} />
            </a>
          </div>

          <div className="mt-3">
            {ARTICLES.map((article) => (
              <a
                key={article.title}
                href={article.href}
                className="writing-entry"
                style={{ display: "block", textDecoration: "none" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontSize: 13,
                    fontWeight: 450,
                    color: "var(--text-sub)",
                    lineHeight: 1.4,
                    marginBottom: 4,
                  }}
                >
                  {article.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 10,
                    color: "var(--text-muted)",
                    display: "flex",
                    gap: 8,
                  }}
                >
                  <span>{article.publication}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                  <span>·</span>
                  <span>{article.date}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Work Card 2 ── */}
        <DirectionAwareCard
          className="card-work-2"
          imageUrl="/cbm.png"
          label="Design Systems · 2023"
          title="Design System for Fintech"
          description="Built a component library serving 12 teams and 200+ engineers across 4 products."
          href="#"
        />

        {/* ── Stack ── */}
        <div className="bento-card card-stack" style={{ minHeight: 180 }}>
          <span className="label">Stack</span>
          <div className="flex flex-col gap-4 mt-4">
            {Object.entries(STACK).map(([category, tools]) => (
              <div key={category}>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 9,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <span key={tool} className="stack-tag">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div
          className="bento-card card-contact"
          style={{
            minHeight: 180,
            background: "linear-gradient(135deg, var(--bg-card-deep) 0%, var(--bg-card) 100%)",
          }}
        >
          {/* Subtle blue glow in contact card */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "60%",
              height: "60%",
              background:
                "radial-gradient(ellipse at bottom right, rgba(0,112,243,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between h-full" style={{ minHeight: 130 }}>
            <div>
              <span className="label">Let&apos;s work together</span>
              <p
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontStyle: "italic",
                  fontSize: 22,
                  lineHeight: 1.3,
                  color: "var(--text-sub)",
                  marginTop: 12,
                }}
              >
                Have a project in mind?
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 8,
                  lineHeight: 1.5,
                }}
              >
                I&apos;m always open to discussing design challenges, new projects, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <a href={`mailto:${PERSON.email}`} className="cta-button">
                Say hello <ArrowUpRight size={12} />
              </a>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                {PERSON.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center mt-8 pb-6"
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: 10,
          color: "var(--text-muted)",
          letterSpacing: "0.08em",
        }}
      >
        {PERSON.name} · {new Date().getFullYear()} · Built with Next.js
      </div>
    </main>
  );
}
