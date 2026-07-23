"use client";

import { useState, useEffect } from "react";

// How many days the flash sale lasts
const SALE_DURATION_DAYS = 3;

// Calculate (or retrieve) a fixed end date, so it doesn't reset on every page reload
function getSaleEndTime(): number {
  const storageKey = "flashSaleEndTime";

  if (typeof window === "undefined") return 0; // SSR guard

  const stored = localStorage.getItem(storageKey);

  if (stored) {
    return Number(stored);
  }

  // First time visiting: set the end time to "now + 3 days"
  const endTime = Date.now() + SALE_DURATION_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(storageKey, endTime.toString());
  return endTime;
}

export default function FlashSaleCountdown() {
  const [endTime, setEndTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Set the fixed end time once, on mount
  useEffect(() => {
    setEndTime(getSaleEndTime());
  }, []);

  // Tick every second, counting down until endTime
  useEffect(() => {
    if (!endTime) return;

    const updateTimeLeft = () => {
      const remaining = endTime - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateTimeLeft(); // run immediately so there's no 1s delay on load
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

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

// Small reusable box for each unit (days/hours/min/sec)
function TimeUnit({ value, label }: { value: number | string; label: string }) {
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
