"use client";

import { useState, useEffect } from "react";

const USERNAME = "IpshitaChatterjee";
const WEEKS = 16; // 16 weeks ≈ 4 months of history

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

function calcStreak(days: DayData[]): number {
  const today = new Date().toISOString().slice(0, 10);
  const reversed = [...days].reverse();
  // If nothing today, start from yesterday
  const start = reversed[0].count > 0 ? 0 : 1;
  let s = 0;
  for (let i = start; i < reversed.length; i++) {
    if (reversed[i].count > 0) s++;
    else break;
  }
  return s;
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function GitHubCard({ className = "" }: { className?: string }) {
  const [days, setDays] = useState<DayData[]>([]);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
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
        setStreak(calcStreak(dayData));
        setTotal(dayData.reduce((s, d) => s + d.count, 0));
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Split into week columns (each column = 7 days)
  const weeks: DayData[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <div className={`bento-card card-github ${className}`}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>

        {/* ── Left: streak ── */}
        <div style={{ flexShrink: 0, width: 100 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="label">GitHub</span>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-linkedin-link"
              aria-label="GitHub profile"
            >
              <GitHubIcon size={12} />
            </a>
          </div>
          <div
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: 52,
              lineHeight: 1,
              color: "var(--text)",
              marginTop: 12,
            }}
          >
            {loading ? "—" : streak}
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 9,
              color: "var(--text-muted)",
              marginTop: 5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            day streak
          </div>
        </div>

        {/* ── Centre: heatmap ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <div
              style={{
                height: 91,
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
                height: 91,
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
            <div style={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
              {/* Day-of-week labels */}
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {["S", "M", "T", "W", "T", "F", "S"].map((l, i) => (
                  <div
                    key={i}
                    style={{
                      width: 10,
                      height: 10,
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 7,
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i % 2 === 1 ? l : ""}
                  </div>
                ))}
              </div>
              {/* Week columns */}
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {week.map((day) => {
                    const intensity = day.count / maxCount;
                    return (
                      <div
                        key={day.date}
                        title={`${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}`}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 2,
                          background:
                            day.count === 0
                              ? "var(--bg-subtle)"
                              : `rgba(255,255,255,${0.18 + intensity * 0.72})`,
                          border: "1px solid var(--border)",
                          flexShrink: 0,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 10,
              color: "var(--text-muted)",
              marginTop: 8,
            }}
          >
            {loading
              ? ""
              : failed
              ? ""
              : `${total} public commits · last ${WEEKS} weeks`}
          </div>
        </div>

        {/* ── Right: total commits ── */}
        <div style={{ flexShrink: 0, textAlign: "right", paddingTop: 28 }}>
          <div
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontSize: 36,
              lineHeight: 1,
              color: "var(--text-sub)",
            }}
          >
            {loading ? "—" : total}
          </div>
          <div
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontSize: 9,
              color: "var(--text-muted)",
              marginTop: 5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            commits
          </div>
        </div>

      </div>
    </div>
  );
}
