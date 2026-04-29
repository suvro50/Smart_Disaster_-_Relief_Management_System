import { createContext, useMemo, useState } from "react";

export const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (alert) => setAlerts((prev) => [alert, ...prev]);
  const value = useMemo(() => ({ alerts, addAlert }), [alerts]);
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
}
