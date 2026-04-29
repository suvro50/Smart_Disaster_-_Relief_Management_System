import AlertToast from "./AlertToast";

export default function AlertList({ alerts = [] }) {
  return (
    <div className="grid">
      {alerts.map((alert, index) => (
        <AlertToast key={alert.id || index} title={alert.title} message={alert.message} />
      ))}
    </div>
  );
}
