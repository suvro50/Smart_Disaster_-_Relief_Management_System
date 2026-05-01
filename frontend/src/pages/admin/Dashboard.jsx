import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import ActiveAlertBanner from "../../components/dashboard/ActiveAlertBanner";
import LiveFeedTicker from "../../components/dashboard/LiveFeedTicker";
import ResourceGauge from "../../components/dashboard/ResourceGauge";
import ResourceBarChart from "../../components/dashboard/ResourceBarChart";
import SeverityDonut from "../../components/dashboard/SeverityDonut";
import StatsCard from "../../components/dashboard/StatsCard";
import WeatherWidget from "../../components/dashboard/WeatherWidget";
import DisasterMap from "../../components/map/DisasterMap";
import { useSocket } from "../../hooks/useSocket";
import { dashboardService } from "../../services/dashboardService";
import { disasterService } from "../../services/disasterService";
import { resourceService } from "../../services/resourceService";
import { addAlert } from "../../store/slices/alertSlice";
import { addDisaster, setDisasters, updateDisasterItem } from "../../store/slices/disasterSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const disasters = useSelector((state) => state.disasters.items);
  const alerts = useSelector((state) => state.alerts.items);
  const [feedItems, setFeedItems] = useState(["Dashboard initialized"]);
  const [stats, setStats] = useState(null);
  const [resourcePercent, setResourcePercent] = useState(0);
  const [resourceAnalytics, setResourceAnalytics] = useState(null);
  const [riskSpotlight, setRiskSpotlight] = useState(null);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    disasterService.getAll().then((items) => dispatch(setDisasters(items)));
    dashboardService.getStats().then(setStats).catch(() => setStats(null));
    dashboardService
      .getLiveFeed()
      .then((items) =>
        setFeedItems(items.map((item) => `${item.type}: ${item.payload?.title || item.payload?.name || "update"}`))
      )
      .catch(() => undefined);
    resourceService
      .getAnalytics()
      .then((analytics) => {
        setResourceAnalytics(analytics);
        setResourcePercent(100 - Number(analytics.lowStockRate || 0));
      })
      .catch(() => setResourcePercent(0));
    resourceService.getAll().then(setResources).catch(() => setResources([]));
  }, [dispatch]);

  useEffect(() => {
    if (!disasters.length) return;
    const candidate = [...disasters].sort(
      (a, b) => Number(b.affected_population || 0) - Number(a.affected_population || 0)
    )[0];
    disasterService
      .predictRisk({
        type: candidate.type,
        affected_population: candidate.affected_population || 0,
        casualties: candidate.casualties || 0,
        injuries: candidate.injuries || 0
      })
      .then((risk) => setRiskSpotlight({ title: candidate.title, ...risk }))
      .catch(() => setRiskSpotlight(null));
  }, [disasters]);

  useEffect(() => {
    if (!socket) return;

    const onNewDisaster = (payload) => {
      dispatch(addDisaster(payload));
      setFeedItems((prev) => [`New disaster: ${payload.title}`, ...prev].slice(0, 10));
    };
    const onDisasterUpdated = (payload) => {
      dispatch(updateDisasterItem(payload));
      setFeedItems((prev) => [`Disaster updated: ${payload.title}`, ...prev].slice(0, 10));
    };
    const onNewAlert = (payload) => {
      dispatch(addAlert(payload));
      setFeedItems((prev) => [`Alert: ${payload.title}`, ...prev].slice(0, 10));
    };
    const onResourceLow = (payload) => {
      setFeedItems((prev) => [`Low stock: ${payload.name}`, ...prev].slice(0, 10));
    };
    const onTeamLocation = (payload) => {
      setFeedItems((prev) => [`Team #${payload.teamId} location updated`, ...prev].slice(0, 10));
    };

    socket.on("new_disaster", onNewDisaster);
    socket.on("disaster_updated", onDisasterUpdated);
    socket.on("new_alert", onNewAlert);
    socket.on("resource_low", onResourceLow);
    socket.on("team_location_update", onTeamLocation);

    return () => {
      socket.off("new_disaster", onNewDisaster);
      socket.off("disaster_updated", onDisasterUpdated);
      socket.off("new_alert", onNewAlert);
      socket.off("resource_low", onResourceLow);
      socket.off("team_location_update", onTeamLocation);
    };
  }, [dispatch, socket]);

  const activeDisasters = useMemo(
    () => disasters.filter((item) => item.status === "active").length,
    [disasters]
  );

  return (
    <main className="page">
      <motion.h2
        className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Admin Dashboard
      </motion.h2>

      <ActiveAlertBanner
        isCritical={alerts.some((item) => item.severity === "critical")}
        message={alerts[0]?.title ? `Latest alert: ${alerts[0].title}` : "System ready for real-time alerts"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <StatsCard title="Total Disasters" value={disasters.length} />
        <StatsCard title="Active Disasters" value={stats?.activeDisasters ?? activeDisasters} />
        <StatsCard title="Active Alerts" value={alerts.length || stats?.criticalAlerts || 0} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <WeatherWidget />
        <ResourceGauge value={resourcePercent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <SeverityDonut disasters={disasters} />
        <ResourceBarChart resources={resources} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <StatsCard title="Low Stock Rate (%)" value={resourceAnalytics?.lowStockRate ?? 0} />
        <StatsCard title="Total Resource Qty" value={resourceAnalytics?.totalQuantity ?? 0} />
        <StatsCard title="AI Risk Score" value={riskSpotlight?.score ?? 0} />
      </div>

      {riskSpotlight ? (
        <motion.div
          className="bg-white/5 backdrop-blur-md border border-red-500/20 rounded-xl p-5 mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h4 className="text-white font-semibold mb-2">AI Risk Spotlight</h4>
          <p className="text-white/60 text-sm">{riskSpotlight.title}</p>
          <p className="text-red-400 text-sm mt-1">
            Severity: {riskSpotlight.severity.toUpperCase()} (Score {riskSpotlight.score})
          </p>
        </motion.div>
      ) : null}

      <div className="mt-4">
        <DisasterMap />
      </div>

      <div className="mt-4">
        <LiveFeedTicker items={feedItems} />
      </div>
    </main>
  );
}
