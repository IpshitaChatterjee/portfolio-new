"use client";

import { useState, useEffect } from "react";

const USERNAME = "IpshitaChatterjee";
const WEEKS = 38;
const CELL = 11;
const GAP = 3;
const DAY_LABEL_W = 28;

const LEGEND_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

interface DayData {
  date: string;
  count: number;
  inRange: boolean;
}

function buildDayMap(
  events: { type: string; created_at: string; payload?: { commits?: unknown[] } }[]
): Record<string, number> {
  const map: Record<string, number> = {};
  for (const event of events) {
    if (event.type === "PushEvent") {
      const date = event.created_at.slice(0, 10);
      const n = Array.isArray(event.payload?.commits) ? event.payload.commits.length : 1;
      map[date] = (map[date] || 0) + n;
    }
  }
  return map;
}

function buildAlignedGrid(
  byDate: Record<string, number>,
  weeks: number
): {
  grid: DayData[][];
  monthLabels: { label: string; weekIndex: number }[];
  maxCount: number;
} {
  // Work in UTC to match the API date strings
  const nowUtc = new Date();
  const todayStr = nowUtc.toISOString().slice(0, 10);
  const today = new Date(todayStr + "T00:00:00Z");

  const rangeStart = new Date(today);
  rangeStart.setUTCDate(today.getUTCDate() - (weeks * 7 - 1));

  // Rewind to most recent Sunday on or before rangeStart
  const gridStart = new Date(rangeStart);
  gridStart.setUTCDate(rangeStart.getUTCDate() - rangeStart.getUTCDay());

  const grid: DayData[][] = [];
  const cur = new Date(gridStart);

  while (cur <= today) {
    const week: DayData[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().slice(0, 10);
      const inRange = cur >= rangeStart && cur <= today;
      week.push({
        date: dateStr,
        count: inRange ? byDate[dateStr] || 0 : 0,
        inRange,
      });
      cur.setUTCDate(cur.getUTCDate() + 1);
    }
    grid.push(week);
  }

  // Month labels: emit one label per calendar month (at the first week that contains the 1st)
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
      break; // only check first in-range day per week
    }
  });

  const maxCount = Math.max(...grid.flat().map((d) => d.count), 1);

  return { grid, monthLabels, maxCount };
}

export function GitHubCard({ className = "" }: { className?: string }) {
  const [grid, setGrid] = useState<DayData[][]>([]);
  const [monthLabels, setMonthLabels] = useState<{ label: string; weekIndex: number }[]>([]);
  const [maxCount, setMaxCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error("api");
        const events = await res.json();
        const byDate = buildDayMap(events);
        const { grid: g, monthLabels: ml, maxCount: mc } = buildAlignedGrid(byDate, WEEKS);
        setGrid(g);
        setMonthLabels(ml);
        setMaxCount(mc);
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function getColor(count: number, inRange: boolean): string {
    if (!inRange) return "transparent";
    if (count === 0) return "#161b22";
    const i = count / maxCount;
    if (i < 0.25) return "#0e4429";
    if (i < 0.5) return "#006d32";
    if (i < 0.75) return "#26a641";
    return "#39d353";
  }

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

          {/* ── Month labels ── */}
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

          {/* ── Grid: day labels + week columns ── */}
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
                        ? `${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}`
                        : undefined
                    }
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: getColor(day.count, day.inRange),
                      border: day.inRange
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* ── Legend ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 4,
              marginTop: 8,
            }}
          >
            <span style={{ ...mono, fontSize: 10 }}>Less</span>
            {LEGEND_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 2,
                  background: color,
                  border: "1px solid rgba(255,255,255,0.06)",
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
