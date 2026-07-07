"use client";
import {useEffect , useState} from "react";

export default function DashboardPage() 
{
  const [summary, setSummary] = useState({
  total_accidents: 0,
  total_alerts: 0,
  total_hospitals_used: 0,
  average_confidence_score: 0,
  critical_accidents: 0,
  high_accidents: 0,
});

const [severityDistribution, setSeverityDistribution] = useState({
  LOW: 0,
  MEDIUM: 0,
  HIGH: 0,
  CRITICAL: 0,
});

const [hospitalUsage, setHospitalUsage] = useState<any[]>([]);

const [recentActivity, setRecentActivity] = useState<any[]>([]);

const [loading, setLoading] = useState(true);

const [error, setError] = useState("");

const fetchDashboardData = async () => {
  try {
    setLoading(true);
    setError("");

    const [
      summaryRes,
      severityRes,
      hospitalRes,
      activityRes,
    ] = await Promise.all([
      fetch("http://127.0.0.1:8000/analytics/summary"),
      fetch("http://127.0.0.1:8000/analytics/severity-distribution"),
      fetch("http://127.0.0.1:8000/analytics/hospital-usage"),
      fetch("http://127.0.0.1:8000/analytics/recent-activity"),
    ]);

    if (
      !summaryRes.ok ||
      !severityRes.ok ||
      !hospitalRes.ok ||
      !activityRes.ok
    ) {
      throw new Error("Failed to load dashboard data.");
    }

    const summaryData = await summaryRes.json();
    const severityData = await severityRes.json();
    const hospitalData = await hospitalRes.json();
    const activityData = await activityRes.json();

    setSummary(summaryData);
    setSeverityDistribution(severityData);
    setHospitalUsage(hospitalData);
    setRecentActivity(activityData);

    console.log("Summary:", summaryData);
console.log("Severity:", severityData);
console.log("Hospital Usage:", hospitalData);
console.log("Recent Activity:", activityData);

  } catch (err) {
    console.error(err);
    setError("Unable to load dashboard data.");
  } finally {
    setLoading(false);
  }
}; 

useEffect(() => {
  fetchDashboardData();
}, []);
  return (
    
    <main className="min-h-screen bg-gray-50 py-10 px-6 text-black">

      <div className="max-w-6xl mx-auto ">

        <h1 className="text-3xl font-bold mb-8 text-black">
          Government Dashboard
        </h1>

        {/* Statistics Cards */}
<div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">Total Accidents</h2>
    <p className="text-3xl font-bold">
      {summary.total_accidents}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">Total Alerts</h2>
    <p className="text-3xl font-bold">
      {summary.total_alerts}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">Critical</h2>
    <p className="text-3xl font-bold text-red-600">
      {summary.critical_accidents}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">High Severity</h2>
    <p className="text-3xl font-bold text-orange-500">
      {summary.high_accidents}
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">AI Confidence</h2>
    <p className="text-3xl font-bold">
      {summary.average_confidence_score}%
    </p>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-gray-500">Hospitals Used</h2>
    <p className="text-3xl font-bold">
      {summary.total_hospitals_used}
    </p>
  </div>

</div>
        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Accident Trends
          </h2>

          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            Chart Placeholder
          </div>

        </div>

        {/* Heatmap Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Accident Heatmap
          </h2>

          <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
            Heatmap Placeholder
          </div>

        </div>

      </div>

    </main>
  );
}