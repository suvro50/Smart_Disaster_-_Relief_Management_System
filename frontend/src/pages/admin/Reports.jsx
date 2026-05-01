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
  const [loading, setLoading] = useState(false);

  const loadReports = () => {
    setLoading(true);
    reportService.getAll().then(setReports).catch(() => setReports([])).finally(() => setLoading(false));
  };

  useEffect(() => { loadReports(); }, []);

  const handleCreateMonthly = async () => {
    try {
      await reportService.createMonthlySummary(month);
      await loadReports();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to generate report");
    }
  };

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Reports
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
        <h3 className="text-white font-semibold mb-3">Generate Monthly Summary</h3>
        <div className="flex gap-3">
          <input value={month} onChange={(e) => setMonth(e.target.value)} type="month" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50" />
          <button type="button" onClick={handleCreateMonthly} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
            Generate
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-8">Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-white/40">No reports generated yet</p>
          <p className="text-white/25 text-sm mt-1">Generate a monthly summary to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <h4 className="text-white font-semibold mb-1">{report.title}</h4>
              <p className="text-white/40 text-sm mb-3">Type: {report.report_type}</p>
              <div className="flex gap-2">
                <button type="button" onClick={async () => saveBlob(await reportService.exportPdf(report.id), `report-${report.id}.pdf`)} className="text-xs bg-red-500/20 text-red-400 px-4 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">
                  PDF
                </button>
                <button type="button" onClick={async () => saveBlob(await reportService.exportCsv(report.id), `report-${report.id}.csv`)} className="text-xs bg-green-500/20 text-green-400 px-4 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                  CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
