import React, { useEffect, useMemo, useState } from "react";

type FullPageLoaderProps = {
  /** Main message */
  message?: string;
  /** Secondary line under the message */
  subtext?: string;
  /** 0–100 shows a determinate bar; omit for indeterminate */
  progress?: number;
  /** Rotating helpful tips */
  tips?: string[];
};

const DEFAULT_TIPS = [
  "Tip: Photos of you performing tasks are powerful RPL evidence.",
  "Tip: Third-party reports from licensed supervisors speed things up.",
  "Tip: Keep payslips and ABN docs handy for authenticity checks.",
  "Tip: Short videos showing technique can cover multiple units.",
];

const clamp = (n: number, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  message = "Preparing your RPL readiness check…",
  subtext = "Setting up your secure session",
  progress,
  tips,
}) => {
  const showDeterminate = typeof progress === "number";
  const pct = showDeterminate ? clamp(progress!) : undefined;

  const tipList = useMemo(() => (tips && tips.length ? tips : DEFAULT_TIPS), [tips]);
  const [tipIdx, setTipIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTipIdx((i) => (i + 1) % tipList.length), 3000);
    return () => clearInterval(id);
  }, [tipList.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 text-slate-100 overflow-hidden"
    >
      {/* Background layers */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(600px_300px_at_85%_-10%,rgba(253,183,21,0.1),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] animate-gridmove opacity-40 motion-reduce:animate-none"
      />

      {/* Card */}
      <div className="relative w-[min(92vw,680px)] rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur shadow-2xl p-8 md:p-10">
        {/* Brand badge */}
        <div className="mx-auto mb-6 md:mb-8 flex items-center justify-center">
          <div className="relative">
            {/* Outer progress ring */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow" aria-hidden>
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#fdb715"
                strokeWidth="10"
                strokeLinecap="round"
                className={showDeterminate ? "" : "animate-dash motion-reduce:animate-none"}
                style={
                  showDeterminate
                    ? {
                        strokeDasharray: 314,
                        strokeDashoffset: 314 - (pct! / 100) * 314,
                        transition: "stroke-dashoffset 400ms ease",
                      }
                    : { strokeDasharray: 314, strokeDashoffset: 0 }
                }
              />
            </svg>

            {/* Hard-hat icon (center) */}
            <div className="absolute inset-0 grid place-items-center animate-float motion-reduce:animate-none" aria-hidden>
              <svg width="44" height="44" viewBox="0 0 24 24" className="text-[#fdb715]">
                <path fill="currentColor" d="M19 13v-2a7 7 0 0 0-14 0v2a4 4 0 0 0-1 2v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1a4 4 0 0 0-1-2Zm-2 0H7v-2a5 5 0 0 1 10 0Zm2 3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-white">{message}</h2>
          <p className="mt-2 text-sm md:text-base text-slate-300">{subtext}</p>
        </div>

        {/* Progress bar */}
        <div className="mt-6 md:mt-8">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            {showDeterminate ? (
              <div
                className="h-full bg-[#fdb715] transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            ) : (
              <div className="relative h-full w-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-[#fdb715] animate-indeterminate motion-reduce:animate-none" />
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{showDeterminate ? `${pct}%` : "Working…"}</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#fdb715] animate-pulse" />
              Secure
            </span>
          </div>
        </div>

        {/* Rotating tip */}
        <div className="mt-6 md:mt-8 text-center">
          <div
            key={tipIdx}
            className="text-xs md:text-sm text-slate-300 px-4 py-2 inline-block rounded-md bg-white/5 animate-fadeIn motion-reduce:animate-none"
          >
            {tipList[tipIdx]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoader;