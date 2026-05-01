import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function ActiveAlertBanner({ message = "No active critical alerts", isCritical = false }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current || !isCritical) return;
    const tween = gsap.to(bannerRef.current, {
      boxShadow: "0 0 20px rgba(255, 72, 72, 0.85), 0 0 40px rgba(255, 72, 72, 0.3)",
      duration: 0.7,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
    return () => tween.kill();
  }, [isCritical]);

  return (
    <motion.div
      ref={bannerRef}
      className={`backdrop-blur-md border rounded-xl px-5 py-3 flex items-center gap-3 ${
        isCritical
          ? "bg-red-500/15 border-red-500/40"
          : "bg-white/5 border-white/10"
      }`}
      initial={{ opacity: 0.65, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <span className={`w-3 h-3 rounded-full flex-shrink-0 ${isCritical ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
      <p className={`text-sm font-medium ${isCritical ? "text-red-400" : "text-white/60"}`}>{message}</p>
    </motion.div>
  );
}
