import { useEffect, useState } from "react";
import { reportService } from "../../services/reportService";

const saveBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));

  const loadReports = () => reportService.getAll().then(setReports).catch(() => setReports([]));

  useEffect(() => {
    loadReports();
  }, []);

  const handleCreateMonthly = async () => {
    await reportService.createMonthlySummary(month);
    await loadReports();
  };

  return (
    <main className="page">
      <h2>Reports</h2>
      <p>Generate and export disaster response reports.</p>
      <div className="form">
        <input value={month} onChange={(e) => setMonth(e.target.value)} placeholder="YYYY-MM" />
        <button type="button" onClick={handleCreateMonthly}>
          Generate Monthly Summary
        </button>
      </div>
      <div className="grid">
        {reports.map((report) => (
          <div className="card" key={report.id}>
            <h4>{report.title}</h4>
            <p>Type: {report.report_type}</p>
            <div className="row">
              <button
                type="button"
                onClick={async () => saveBlob(await reportService.exportPdf(report.id), `report-${report.id}.pdf`)}
              >
                Download PDF
              </button>
              <button
                type="button"
                onClick={async () => saveBlob(await reportService.exportCsv(report.id), `report-${report.id}.csv`)}
              >
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
