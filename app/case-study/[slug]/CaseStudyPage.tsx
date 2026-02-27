"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/app/data/case-studies";

// ── Aspect ratio map ──
const ASPECT_RATIO: Record<string, string> = {
  landscape: "16 / 9",
  portrait: "2 / 3",
  square: "1 / 1",
  wide: "21 / 9",
};

// ── Icons ──
function ArrowLeft({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  );
}

function ArrowUpRight({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

// ── Placeholder image cell ──
function PlaceholderCell({
  index,
  aspect,
  onClick,
}: {
  index: number;
  aspect: string;
  onClick: () => void;
}) {
  // Subtle varied tones for visual interest
  const tones = [
    "var(--bg-subtle)",
    "var(--bg-card-deep)",
    "var(--bg-card)",
    "var(--bg-subtle)",
    "var(--bg-card-deep)",
    "var(--bg-card)",
    "var(--bg-subtle)",
    "var(--bg-card-deep)",
    "var(--bg-card)",
  ];
  const bg = tones[index % tones.length];

  return (
    <div
      className="cs-image-cell"
      style={{ aspectRatio: ASPECT_RATIO[aspect] }}
      onClick={onClick}
    >
      <div
        className="cs-image-cell-inner"
        style={{
          background: bg,
          backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.03) 0%, transparent 60%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-dim)",
          width: "100%",
          height: "100%",
        }}
      >
        <CameraIcon />
      </div>
    </div>
  );
}

// ── Lightbox ──
function Lightbox({
  images,
  openIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: CaseStudy["images"];
  openIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[openIndex];

  return (
    <div
      className="lightbox-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>

      {/* Prev */}
      {openIndex > 0 && (
        <button
          className="lightbox-nav lightbox-nav-prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
      )}

      {/* Image placeholder in lightbox */}
      <div
        className="lightbox-img"
        style={{
          aspectRatio: ASPECT_RATIO[img.aspect],
          background: "var(--bg-card-deep)",
          backgroundImage: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.04) 0%, transparent 60%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <CameraIcon />
      </div>

      {/* Next */}
      {openIndex < images.length - 1 && (
        <button
          className="lightbox-nav lightbox-nav-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      )}

      {/* Counter */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "var(--font-geist-mono)",
          fontSize: 11,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        {openIndex + 1} / {images.length}
      </div>
    </div>
  );
}

// ── Main component ──
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => setOpenIndex(null), []);
  const handlePrev = useCallback(() =>
    setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const handleNext = useCallback(() =>
    setOpenIndex((i) => (i !== null && i < study.images.length - 1 ? i + 1 : i)), [study.images.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, handleClose, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [openIndex]);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "calc(52px + 1.5rem)" }}>

      {/* ── Header ── */}
      <header className="cs-header">
        {/* Back button */}
        <Link href="/" className="cs-back-btn" style={{ marginBottom: 20, display: "inline-flex" }}>
          <ArrowLeft size={12} />
          Back to portfolio
        </Link>

        {/* Meta chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          <span className="cs-meta-chip">{study.date}</span>
          <span className="cs-meta-chip">{study.role}</span>
          <span className="cs-meta-chip">{study.client}</span>
        </div>

        {/* Title */}
        <h1 className="cs-title">{study.title}</h1>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border)", marginTop: 8 }} />
      </header>

      {/* ── Problem statement ── */}
      <section className="cs-section">
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <span className="cs-section-label">Problem Statement</span>
          <p className="cs-section-body">{study.problem}</p>
        </div>
      </section>

      {/* ── Outcome ── */}
      <section className="cs-section">
        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <span className="cs-section-label">Outcome</span>
          <p className="cs-section-body">{study.outcome}</p>
        </div>
      </section>

      {/* ── Image grid ── */}
      <section
        className="cs-section"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="label"
          style={{ display: "block", marginBottom: 16 }}
        >
          Process &amp; Deliverables
        </span>
        <div className="cs-image-grid">
          {study.images.map((img, i) => (
            <div
              key={i}
              style={{
                gridColumn: img.span === 2 ? "span 2" : "span 1",
              }}
            >
              <PlaceholderCell
                index={i}
                aspect={img.aspect}
                onClick={() => setOpenIndex(i)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact section ── */}
      <section
        style={{
          padding: "0 24px 48px",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 14,
            border: "1px solid var(--border)",
            padding: 32,
            background: "linear-gradient(135deg, var(--bg-card-deep) 0%, var(--bg-card) 100%)",
            minHeight: 180,
          }}
        >
          {/* Blue glow */}
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

          <div style={{ position: "relative", zIndex: 1 }}>
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
                maxWidth: 400,
              }}
            >
              I&apos;m always open to discussing design challenges, new projects, or
              opportunities to be part of your vision.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
              <a
                href="mailto:ipshita.chatterjee02@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  background: "#0070f3",
                  color: "#fff",
                  borderRadius: 8,
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "background 0.15s ease",
                }}
              >
                Say hello <ArrowUpRight size={12} />
              </a>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                }}
              >
                ipshita.chatterjee02@gmail.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <div
        style={{
          textAlign: "center",
          paddingBottom: 32,
          fontFamily: "var(--font-geist-mono)",
          fontSize: 10,
          color: "var(--text-dim)",
          letterSpacing: "0.08em",
        }}
      >
        Ipshita · {new Date().getFullYear()} · Built with Next.js
      </div>

      {/* ── Lightbox ── */}
      {openIndex !== null && (
        <Lightbox
          images={study.images}
          openIndex={openIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </main>
  );
}
