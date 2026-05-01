import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatsCard({ title, value }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 18));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setAnimatedValue(target);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, 28);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:border-red-500/30 transition-colors"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <p className="text-white/50 text-sm">{title}</p>
      <h3 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-1">{animatedValue}</h3>
    </motion.div>
  );
}
