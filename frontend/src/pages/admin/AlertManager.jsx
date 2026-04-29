import AlertList from "../../components/alerts/AlertList";

export default function AlertManager() {
  return (
    <main className="page">
      <h2>Alert Manager</h2>
      <AlertList alerts={[]} />
    </main>
  );
}
