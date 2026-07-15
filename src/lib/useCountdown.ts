"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "launch-countdown-deadline";

/**
 * Counts down to a persisted deadline stored in localStorage, so a page
 * refresh continues the existing countdown instead of restarting it.
 * Only rolls over to a fresh `totalSeconds` once the stored deadline has
 * actually passed. Starts at `totalSeconds` during SSR/first paint to
 * avoid a hydration mismatch, then corrects to the real value on mount.
 */
export function useCountdown(totalSeconds: number) {
  const [secs, setSecs] = useState(totalSeconds);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    const readOrCreateDeadline = (now: number) => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? parseInt(stored, 10) : NaN;
      if (!Number.isNaN(parsed) && parsed > now) return parsed;
      const fresh = now + totalSeconds * 1000;
      window.localStorage.setItem(STORAGE_KEY, String(fresh));
      return fresh;
    };

    const now = Date.now();
    deadlineRef.current = readOrCreateDeadline(now);
    setSecs(Math.max(0, Math.round((deadlineRef.current - now) / 1000)));

    const id = setInterval(() => {
      const remaining = Math.round((deadlineRef.current! - Date.now()) / 1000);
      if (remaining <= 0) {
        const fresh = Date.now() + totalSeconds * 1000;
        window.localStorage.setItem(STORAGE_KEY, String(fresh));
        deadlineRef.current = fresh;
        setSecs(totalSeconds);
      } else {
        setSecs(remaining);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [totalSeconds]);

  return secs;
}
