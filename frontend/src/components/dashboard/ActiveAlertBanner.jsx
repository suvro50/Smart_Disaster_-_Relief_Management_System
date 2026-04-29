import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function ActiveAlertBanner({ message = "No active critical alerts", isCritical = false }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current || !isCritical) return;
    const tween = gsap.to(bannerRef.current, {
      boxShadow: "0 0 16px rgba(255, 72, 72, 0.85)",
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
      className={`alert-banner ${isCritical ? "alert-banner-critical" : ""}`}
      initial={{ opacity: 0.65, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {message}
    </motion.div>
  );
}
