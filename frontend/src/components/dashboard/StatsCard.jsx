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
    <motion.div className="card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <p>{title}</p>
      <h3>{animatedValue}</h3>
    </motion.div>
  );
}
