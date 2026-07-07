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
if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-xl font-semibold text-gray-600">
        Loading Government Dashboard...
      </div>
    </main>
  );
}
if (error) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-red-100 border border-red-300 rounded-lg p-6">
        <h2 className="text-xl font-bold text-red-700">
          Dashboard Error
        </h2>

        <p className="mt-2 text-red-600">
          {error}
        </p>
      </div>
    </main>
  );
}
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
        {/* Severity Distribution */}
<div className="mb-10">
  <h2 className="text-2xl font-semibold mb-4">
    Severity Distribution
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    <div className="bg-green-100 rounded-xl p-6 shadow">
      <p className="text-green-700 font-semibold">LOW</p>
      <p className="text-3xl font-bold">
        {severityDistribution.LOW}
      </p>
    </div>

    <div className="bg-yellow-100 rounded-xl p-6 shadow">
      <p className="text-yellow-700 font-semibold">MEDIUM</p>
      <p className="text-3xl font-bold">
        {severityDistribution.MEDIUM}
      </p>
    </div>

    <div className="bg-orange-100 rounded-xl p-6 shadow">
      <p className="text-orange-700 font-semibold">HIGH</p>
      <p className="text-3xl font-bold">
        {severityDistribution.HIGH}
      </p>
    </div>

    <div className="bg-red-100 rounded-xl p-6 shadow">
      <p className="text-red-700 font-semibold">CRITICAL</p>
      <p className="text-3xl font-bold">
        {severityDistribution.CRITICAL}
      </p>
    </div>

  </div>
</div>
{/* Hospital Usage */}
<div className="bg-white rounded-xl shadow-md p-6 mb-10">

  <h2 className="text-2xl font-semibold mb-4">
    Hospital Usage
  </h2>

  {hospitalUsage.length === 0 ? (
    <p className="text-gray-500">
      No hospital usage data available.
    </p>
  ) : (
    <table className="w-full border-collapse">

      <thead>
        <tr className="border-b">
          <th className="text-left py-3">Hospital</th>
          <th className="text-left py-3">Emergency Alerts Sent</th>
        </tr>
      </thead>

      <tbody>
        {hospitalUsage.map((hospital, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50"
          >
            <td className="py-3">
              {hospital.hospital_name}
            </td>

            <td className="py-3">
              {hospital.total_alerts}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )}

</div>
{/* Recent Accident Activity */}
<div className="bg-white rounded-xl shadow-md p-6 mb-10">

  <h2 className="text-2xl font-semibold mb-4">
    Recent Accident Activity
  </h2>

  {recentActivity.length === 0 ? (
    <p className="text-gray-500">
      No recent accident activity available.
    </p>
  ) : (
    <table className="w-full border-collapse">

      <thead>
        <tr className="border-b">
          <th className="text-left py-3">Accident ID</th>
          <th className="text-left py-3">Severity</th>
          <th className="text-left py-3">Hospital</th>
          <th className="text-left py-3">Alert Status</th>
          <th className="text-left py-3">Reported At</th>
        </tr>
      </thead>

      <tbody>
        {recentActivity.map((activity, index) => (
          <tr
            key={index}
            className="border-b hover:bg-gray-50"
          >
            <td className="py-3">
              {activity.accident_id}
            </td>

            <td className="py-3 font-semibold">
              {activity.severity}
            </td>

            <td className="py-3">
              {activity.hospital_name}
            </td>

            <td className="py-3">
              {activity.alert_status}
            </td>

            <td className="py-3">
              {new Date(activity.timestamp).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )}

</div>

      </div>

    </main>
  );
}