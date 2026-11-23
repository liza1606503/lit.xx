"use client";

import { useState, useEffect, useRef } from "react";
import { IconPlay, IconPause } from "@/components/site/sharp-icons";

interface AudioPlayerBigProps {
  /** Длительность в секундах (для демо-плейсхолдера). */
  durationSec?: number;
  /** Подпись над плеером — например, название выпуска. */
  label?: string;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function AudioPlayerBig({
  durationSec = 432,
  label,
}: AudioPlayerBigProps) {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setPos((p) => {
          if (p + 1 >= durationSec) {
            setPlaying(false);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, durationSec]);

  const pct = durationSec > 0 ? (pos / durationSec) * 100 : 0;

  return (
    <div className="border-2 border-primary bg-card p-6 md:p-8">
      {label && (
        <div className="mb-5 font-sans-ui text-xs font-bold uppercase tracking-widest text-primary">
          {label}
        </div>
      )}
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
        <button
          type="button"
          onClick={() => setPlaying((v) => !v)}
          aria-label={playing ? "Пауза" : "Слушать"}
          className="flex h-24 w-24 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90 md:h-28 md:w-28"
        >
          {playing ? <IconPause size={40} /> : <IconPlay size={40} />}
        </button>
        <div className="w-full flex-1">
          <div className="h-2 w-full bg-border">
            <div
              className="h-full bg-primary transition-[width] duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs text-muted-foreground">
            <span>{fmt(pos)}</span>
            <span>{fmt(durationSec)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
