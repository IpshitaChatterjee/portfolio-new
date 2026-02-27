"use client";

import { useState, useEffect } from "react";

const USERNAME = "IpshitaChatterjee";
// 35 weeks gives equal visual left/right balance:
// left = DAY_LABEL_W(28) + GAP(3) = 31px before first cell
// right = GAP(3) + spacer(28) = 31px after last cell
const WEEKS = 35;
const CELL = 11;
const GAP = 3;
const DAY_LABEL_W = 28;

// GitHub-standard palettes for dark and light mode
const DARK = {
  empty: "#161b22",
  l1: "#0e4429",
  l2: "#006d32",
  l3: "#26a641",
  l4: "#39d353",
  cellBorder: "rgba(255,255,255,0.06)",
};
const LIGHT = {
  empty: "#ebedf0",
  l1: "#9be9a8",
  l2: "#40c463",
  l3: "#30a14e",
  l4: "#216e39",
  cellBorder: "rgba(0,0,0,0.06)",
};

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface DayData {
  date: string;
  count: number;
  // level 0–4 as returned by GitHub (matches their own colour thresholds)
  level: number;
  inRange: boolean;
}

// Fetch full contribution history from the GitHub profile calendar.
// Uses github-contributions-api.jogruber.de which reads the public profile
// page — returns ALL contributions (public + private) just like GitHub's
// own heatmap, for the rolling last-12-months window.
async function fetchContributions(): Promise<
  Record<string, { count: number; level: number }>
> {
  const r = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    { cache: "no-store" }
  );
  if (!r.ok) throw new Error("api");
  const data = await r.json();
  const map: Record<string, { count: number; level: number }> = {};
  for (const c of data.contributions as { date: string; count: number; level: number }[]) {
    map[c.date] = { count: c.count, level: c.level };
  }
  return map;
}

function buildAlignedGrid(
  byDate: Record<string, { count: number; level: number }>,
  weeks: number
): {
  grid: DayData[][];
  monthLabels: { label: string; weekIndex: number }[];
} {
  const nowUtc = new Date();
  const todayStr = nowUtc.toISOString().slice(0, 10);
  const today = new Date(todayStr + "T00:00:00Z");

  const rangeStart = new Date(today);
  rangeStart.setUTCDate(today.getUTCDate() - (weeks * 7 - 1));

  // Rewind to Sunday on or before rangeStart
  const gridStart = new Date(rangeStart);
  gridStart.setUTCDate(rangeStart.getUTCDate() - rangeStart.getUTCDay());

  const grid: DayData[][] = [];
  const cur = new Date(gridStart);

  while (cur <= today) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().slice(0, 10);
      const inRange = cur >= rangeStart && cur <= today;
      const info = inRange ? byDate[dateStr] : undefined;
      week.push({
        date: dateStr,
        count: info?.count ?? 0,
        level: info?.level ?? 0,
        inRange,
      });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    grid.push(week);
  }

  // Month labels: one per calendar month at the first in-range week
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    for (const day of week) {
      if (!day.inRange) continue;
      const d = new Date(day.date + "T00:00:00Z");
      const month = d.getUTCMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          label: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
          weekIndex: wi,
        });
        lastMonth = month;
      }
      break;
    }
  });

  return { grid, monthLabels };
}

export function GitHubCard({ className = "" }: { className?: string }) {
  const [grid, setGrid] = useState<DayData[][]>([]);
  const [monthLabels, setMonthLabels] = useState<{ label: string; weekIndex: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Track light/dark mode by watching the html.light class
  useEffect(() => {
    const update = () =>
      setIsDark(!document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Fetch full contribution history from the profile calendar API
  useEffect(() => {
    async function load() {
      try {
        const byDate = await fetchContributions();
        const { grid: g, monthLabels: ml } = buildAlignedGrid(byDate, WEEKS);
        setGrid(g);
        setMonthLabels(ml);
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const pal = isDark ? DARK : LIGHT;

  // Use GitHub's own level (0–4) for colour — exactly matches their heatmap
  function getColor(level: number, inRange: boolean): string {
    if (!inRange) return "transparent";
    if (level === 0) return pal.empty;
    if (level === 1) return pal.l1;
    if (level === 2) return pal.l2;
    if (level === 3) return pal.l3;
    return pal.l4;
  }

  const legendColors = [pal.empty, pal.l1, pal.l2, pal.l3, pal.l4];

  const mono: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono)",
    color: "var(--text-muted)",
  };

  return (
    <div
      className={`bento-card card-github ${className}`}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <span className="label">GitHub</span>

      {loading ? (
        <div style={{ ...mono, fontSize: 11 }}>Loading activity…</div>
      ) : failed ? (
        <div style={{ ...mono, fontSize: 11 }}>Could not load activity</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* ── Month labels — offset to align with cell grid ── */}
          <div
            style={{
              position: "relative",
              height: 16,
              marginLeft: DAY_LABEL_W + GAP,
              marginBottom: 4,
            }}
          >
            {monthLabels.map(({ label, weekIndex }, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  left: weekIndex * (CELL + GAP),
                  ...mono,
                  fontSize: 10,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* ── Grid: day labels + week columns + right spacer ── */}
          <div style={{ display: "flex", gap: GAP, alignItems: "flex-start" }}>

            {/* Day-of-week labels */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: GAP,
                width: DAY_LABEL_W,
                flexShrink: 0,
              }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  style={{
                    height: CELL,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 4,
                    ...mono,
                    fontSize: 9,
                    visibility: label ? "visible" : "hidden",
                  }}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            {grid.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={
                      day.inRange && day.date
                        ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                        : undefined
                    }
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: getColor(day.level, day.inRange),
                      border: day.inRange ? `1px solid ${pal.cellBorder}` : "none",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}

            {/* Right spacer — mirrors day label width for equal visual padding */}
            <div style={{ width: DAY_LABEL_W, flexShrink: 0 }} />
          </div>

          {/* ── Legend — inset to align with cell grid edges ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 4,
              marginTop: 8,
              marginRight: DAY_LABEL_W + GAP,
            }}
          >
            <span style={{ ...mono, fontSize: 10 }}>Less</span>
            {legendColors.map((color, i) => (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 2,
                  background: color,
                  border: `1px solid ${pal.cellBorder}`,
                  flexShrink: 0,
                }}
              />
            ))}
            <span style={{ ...mono, fontSize: 10 }}>More</span>
          </div>

        </div>
      )}
    </div>
  );
}
