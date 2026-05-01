import { motion } from "framer-motion";

export default function LiveFeedTicker({ items = [] }) {
  const text = items.length ? items.join("  •  ") : "Live updates will appear here when disasters are reported";
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-1 border-b border-white/5">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-white/40 text-xs font-medium">LIVE FEED</span>
      </div>
      <div className="overflow-hidden py-2">
        <motion.div
          className="whitespace-nowrap text-white/60 text-sm"
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        >
          {text} &nbsp;&nbsp;|&nbsp;&nbsp; {text}
        </motion.div>
      </div>
    </div>
  );
}
