"use client";

import { useEffect, useState } from "react";

export default function Countdown({ target }: { target: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const end = new Date(target).getTime();
      const diff = Math.max(0, end - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const blocks = [
    { value: timeLeft.days, label: "Tage" },
    { value: timeLeft.hours, label: "Stunden" },
    { value: timeLeft.minutes, label: "Minuten" },
    { value: timeLeft.seconds, label: "Sekunden" },
  ];

  return (
    <div className="flex gap-4 md:gap-8 justify-center">
      {blocks.map((b) => (
        <div key={b.label} className="text-center">
          <div className="text-5xl md:text-7xl lg:text-8xl font-black tabular-nums tracking-tight">
            {String(b.value).padStart(b.label === "Tage" ? 3 : 2, "0")}
          </div>
          <div className="text-sm md:text-base text-neutral-500 mt-2 uppercase tracking-widest">
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}
