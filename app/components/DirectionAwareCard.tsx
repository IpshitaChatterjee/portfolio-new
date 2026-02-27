"use client";

import { useState, useRef } from "react";

interface DirectionAwareCardProps {
  background: string;
  accentColor: string;
  label: string;
  title: string;
  description: string;
  href: string;
  className?: string;
  patternStyle?: "diagonal" | "dots";
}

function getDirection(e: React.MouseEvent<HTMLElement>, el: HTMLElement): 0 | 1 | 2 | 3 {
  const { left, top, width, height } = el.getBoundingClientRect();
  const x = e.clientX - (left + width / 2);
  const y = e.clientY - (top + height / 2);
  const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  if (deg >= 315 || deg < 45) return 1;  // right
  if (deg >= 45 && deg < 135) return 2;  // bottom
  if (deg >= 135 && deg < 225) return 3; // left
  return 0;                               // top
}

const directionTransform: Record<0 | 1 | 2 | 3, string> = {
  0: "translateY(-100%)",
  1: "translateX(100%)",
  2: "translateY(100%)",
  3: "translateX(-100%)",
};

function ArrowUpRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export function DirectionAwareCard({
  background,
  accentColor,
  label,
  title,
  description,
  href,
  className = "",
  patternStyle = "diagonal",
}: DirectionAwareCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<0 | 1 | 2 | 3>(0);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) {
      setDirection(getDirection(e, cardRef.current));
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const overlayTransform = isHovered ? "translate(0, 0)" : directionTransform[direction];

  const patternBg =
    patternStyle === "diagonal"
      ? `repeating-linear-gradient(
          45deg,
          rgba(255,255,255,0.018) 0px,
          rgba(255,255,255,0.018) 1px,
          transparent 1px,
          transparent 24px
        )`
      : `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`;

  const patternSize = patternStyle === "diagonal" ? undefined : "20px 20px";

  return (
    <a
      ref={cardRef}
      href={href}
      className={`bento-card dac-card ${className}`}
      style={{ background, textDecoration: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: patternBg,
          backgroundSize: patternSize,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* At-rest label strip */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          right: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono)",
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: 11,
            color: accentColor,
            opacity: 0.8,
          }}
        >
          Work
        </span>
      </div>

      {/* Direction-aware overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          transform: overlayTransform,
          transition: "transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          willChange: "transform",
        }}
      >
        {/* Accent top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: accentColor,
          }}
        />

        {/* Overlay backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8, 8, 8, 0.86)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />

        {/* Overlay content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {/* Number */}
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 11,
              color: accentColor,
              opacity: 0.7,
              marginBottom: 10,
            }}
          >
            ↗
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.2,
              color: "#ededed",
              marginBottom: 10,
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: 12,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 20,
            }}
          >
            {description}
          </p>

          {/* CTA */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "var(--font-geist-sans)",
              fontSize: 11,
              color: accentColor,
              letterSpacing: "0.04em",
            }}
          >
            View case study <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </a>
  );
}
