"use client";

import { useState, useEffect } from "react";

interface StopWatchProps {
  expiresAt?: string;
}

export default function StopWatch({ expiresAt }: StopWatchProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiresAt) return;

    const endTime = new Date(expiresAt).getTime();

    const updateTimeLeft = () => {
      const remaining = endTime - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  const formatTime = () => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const pad = (num: number) => num.toString().padStart(2, "0");

    return {
      days,
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const { days, hours, minutes, seconds } = formatTime();
  const saleEnded = timeLeft <= 0;

  if (!expiresAt) return null;

  return (
    <div className="flex flex-col items-center justify-center p-6 w-72 text-white">
      {saleEnded ? (
        <div className="text-xl font-bold text-red-500 mb-2">Sale Ended</div>
      ) : (
        <div className="flex items-end gap-2 font-mono tabular-nums">
          <TimeUnit value={days} label="Days" />
          <span className="text-2xl font-bold pb-4">:</span>
          <TimeUnit value={hours} label="Hrs" />
          <span className="text-2xl font-bold pb-4">:</span>
          <TimeUnit value={minutes} label="Min" />
          <span className="text-2xl font-bold pb-4">:</span>
          <TimeUnit value={seconds} label="Sec" />
        </div>
      )}
    </div>
  );
}

interface TimeUnitProps {
  value: number | string;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold bg-gray-800 rounded-lg px-3 py-2 min-w-[56px] text-center">
        {value}
      </div>
      <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}
