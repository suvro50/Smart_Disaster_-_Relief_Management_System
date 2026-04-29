export default function AlertToast({ title = "Alert", message = "Incoming update" }) {
  return (
    <div className="card">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}
