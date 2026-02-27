"use client";

import { useState, useEffect } from "react";

const USERNAME = "IpshitaChatterjee";
const WEEKS = 16;

interface DayData {
  date: string;
  count: number;
}

function buildDayMap(events: { type: string; created_at: string; payload?: { commits?: unknown[] } }[]): Record<string, number> {
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

function getLastNDays(n: number): DayData[] {
  const days: DayData[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ date: d.toISOString().slice(0, 10), count: 0 });
  }
  return days;
}

export function GitHubCard({ className = "" }: { className?: string }) {
  const [days, setDays] = useState<DayData[]>([]);
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
        const n = WEEKS * 7;
        const dayData = getLastNDays(n);
        for (const d of dayData) d.count = byDate[d.date] || 0;
        setDays(dayData);
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const weeks: DayData[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <div
      className={`bento-card card-github ${className}`}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      <span className="label">GitHub</span>

      {loading ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          Loading activity…
        </div>
      ) : failed ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontFamily: "var(--font-geist-mono)",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          Could not load activity
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", gap: 3 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
              {week.map((day) => {
                const intensity = day.count / maxCount;
                return (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}`}
                    style={{
                      flex: 1,
                      borderRadius: 2,
                      background:
                        day.count === 0
                          ? "#161b22"
                          : intensity < 0.25
                          ? "#0e4429"
                          : intensity < 0.5
                          ? "#006d32"
                          : intensity < 0.75
                          ? "#26a641"
                          : "#39d353",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
