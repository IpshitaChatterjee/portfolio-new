"use client";

import { useState, useRef } from "react";

interface DirectionAwareCardProps {
  imageUrl: string;
  label: string;
  title: string;
  description: string;
  href: string;
  className?: string;
}

type Direction = "top" | "right" | "bottom" | "left";

function getDirection(
  e: React.MouseEvent<HTMLElement>,
  el: HTMLElement
): Direction {
  const { width: w, height: h, left, top } = el.getBoundingClientRect();
  const x = e.clientX - left - (w / 2) * (w > h ? h / w : 1);
  const y = e.clientY - top - (h / 2) * (h > w ? w / h : 1);
  const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
  const dirs: Direction[] = ["top", "right", "bottom", "left"];
  return dirs[d];
}

function ArrowUpRight({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export function DirectionAwareCard({
  imageUrl,
  label,
  title,
  description,
  href,
  className = "",
}: DirectionAwareCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("left");
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) setDirection(getDirection(e, cardRef.current));
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  const cls = `bento-card dac-card ${className} ${isHovered ? "dac-hovered" : ""} dac-dir-${direction}`;

  return (
    <a
      ref={cardRef}
      href={href}
      className={cls}
      style={{ textDecoration: "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Full-bleed image — shifts subtly on hover */}
      <div className="dac-img-wrap">
        <img src={imageUrl} alt={title} className="dac-img" />
      </div>

      {/* Persistent dark gradient from bottom (improves label legibility) */}
      <div className="dac-gradient" aria-hidden="true" />

      {/* Hover dark overlay */}
      <div className="dac-overlay" aria-hidden="true" />

      {/* At-rest label — top-right only */}
      <div className="dac-label" aria-hidden="true">
        <span className="dac-label-tag">Case Study</span>
      </div>

      {/* Hover content — fades in with direction-aware translate */}
      <div className="dac-content">
        <h3 className="dac-title">{title}</h3>
        <p className="dac-desc">{description}</p>
        <span className="dac-cta">
          View case study <ArrowUpRight size={11} />
        </span>
      </div>
    </a>
  );
}
