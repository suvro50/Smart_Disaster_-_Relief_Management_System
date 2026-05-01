import { useEffect, useState } from "react";

const SEVERITY_STYLES = {
  info: "border-blue-500/40 bg-blue-500/10",
  warning: "border-yellow-500/40 bg-yellow-500/10",
  danger: "border-orange-500/40 bg-orange-500/10",
  critical: "border-red-500/40 bg-red-500/10 animate-pulse",
};

const SEVERITY_ICONS = {
  info: "ℹ️",
  warning: "⚠️",
  danger: "🟠",
  critical: "🚨",
};

export default function AlertToast({ title = "Alert", message = "Incoming update", severity = "warning", onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onDismiss) onDismiss();
    }, 8000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm backdrop-blur-md border rounded-xl p-4 shadow-lg shadow-red-500/10 transition-all duration-300 ${SEVERITY_STYLES[severity] || SEVERITY_STYLES.warning}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">{SEVERITY_ICONS[severity] || "⚠️"}</span>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-sm">{title}</h4>
          <p className="text-white/60 text-xs mt-1 line-clamp-2">{message}</p>
        </div>
        <button onClick={() => { setVisible(false); if (onDismiss) onDismiss(); }} className="text-white/40 hover:text-white/70 text-sm flex-shrink-0">
          ✕
        </button>
      </div>
    </div>
  );
}
