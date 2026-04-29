import { motion } from "framer-motion";

export default function LiveFeedTicker({ items = [] }) {
  const text = items.length ? items.join(" | ") : "Live updates will appear here";
  return (
    <div className="ticker">
      <motion.div
        className="ticker-track"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {text} | {text}
      </motion.div>
    </div>
  );
}
