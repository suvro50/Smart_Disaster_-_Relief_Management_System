import { useEffect, useRef } from "react";

export default function SoundAlert({ enabled, severity = "warning" }) {
  const audioCtxRef = useRef(null);

  const playBeep = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      const freqMap = { info: 440, warning: 660, danger: 880, critical: 1100 };
      oscillator.frequency.value = freqMap[severity] || 660;
      oscillator.type = severity === "critical" ? "square" : "sine";

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not supported
    }
  };

  useEffect(() => {
    if (enabled) {
      playBeep();
    }
  }, [enabled, severity]);

  return null;
}
