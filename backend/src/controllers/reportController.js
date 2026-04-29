import { Op } from "sequelize";
import { Disaster, Report, Resource } from "../models/index.js";
import { generateReportPdfBuffer } from "../services/pdfService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getReports = async (_req, res) => {
  try {
    const reports = await Report.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, reports, "Reports fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch reports.");
  }
};

export const createReport = async (req, res) => {
  try {
    const report = await Report.create({ ...req.body, generated_by: req.user?.id || null });
    return sendSuccess(res, report, "Report created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create report.");
  }
};

export const exportReport = async (req, res) => {
  try {
    const { id } = req.params;
    const format = (req.query.format || "pdf").toLowerCase();
    const report = await Report.findByPk(id);
    if (!report) return sendError(res, "Report not found.", 404);

    const [totalDisasters, activeDisasters, criticalDisasters, resources] = await Promise.all([
      Disaster.count(),
      Disaster.count({ where: { status: "active" } }),
      Disaster.count({ where: { severity: "critical" } }),
      Resource.findAll({ attributes: ["quantity", "minimum_stock"] })
    ]);
    const totalResourceQuantity = resources.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const lowStockCount = resources.filter(
      (item) => Number(item.quantity || 0) <= Number(item.minimum_stock || 0)
    ).length;
    const lowStockRate = resources.length ? Math.round((lowStockCount / resources.length) * 100) : 0;
    const criticalDisasterRate = totalDisasters ? Math.round((criticalDisasters / totalDisasters) * 100) : 0;

    const metrics = {
      totalDisasters,
      activeDisasters,
      criticalDisasters,
      totalResourceQuantity,
      lowStockRate,
      criticalDisasterRate
    };

    if (format === "csv") {
      const headers = [
        "id",
        "title",
        "report_type",
        "disaster_id",
        "generated_by",
        "created_at",
        "content",
        "total_disasters",
        "active_disasters",
        "critical_disasters",
        "total_resource_quantity",
        "low_stock_rate"
      ];
      const values = [
        report.id,
        report.title,
        report.report_type,
        report.disaster_id || "",
        report.generated_by || "",
        new Date(report.created_at).toISOString(),
        (report.content || "").replaceAll('"', '""'),
        metrics.totalDisasters,
        metrics.activeDisasters,
        metrics.criticalDisasters,
        metrics.totalResourceQuantity,
        metrics.lowStockRate
      ];
      const csv = `${headers.join(",")}\n${values.map((v) => `"${String(v)}"`).join(",")}\n`;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=report-${report.id}.csv`);
      return res.status(200).send(csv);
    }

    const pdfBuffer = await generateReportPdfBuffer(report, metrics);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=report-${report.id}.pdf`);
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return sendError(res, error.message || "Failed to export report.");
  }
};

export const createMonthlySummaryReport = async (req, res) => {
  try {
    const month = req.body.month || new Date().toISOString().slice(0, 7);
    const [year, monthValue] = month.split("-").map(Number);
    const start = new Date(Date.UTC(year, monthValue - 1, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, monthValue, 1, 0, 0, 0));

    const [totalDisasters, activeDisasters, criticalDisasters] = await Promise.all([
      Disaster.count({ where: { created_at: { [Op.gte]: start, [Op.lt]: end } } }),
      Disaster.count({ where: { status: "active", created_at: { [Op.gte]: start, [Op.lt]: end } } }),
      Disaster.count({
        where: { severity: "critical", created_at: { [Op.gte]: start, [Op.lt]: end } }
      })
    ]);

    const content =
      `Monthly Summary: ${month}\n` +
      `Total disasters reported: ${totalDisasters}\n` +
      `Active disasters: ${activeDisasters}\n` +
      `Critical disasters: ${criticalDisasters}\n`;

    const report = await Report.create({
      title: `Monthly Summary ${month}`,
      report_type: "monthly",
      content,
      generated_by: req.user?.id || null
    });

    return sendSuccess(res, report, "Monthly summary report created.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create monthly summary.");
  }
};
