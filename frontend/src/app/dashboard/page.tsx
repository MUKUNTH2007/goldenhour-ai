export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 text-black">

      <div className="max-w-6xl mx-auto ">

        <h1 className="text-3xl font-bold mb-8 text-black">
          Government Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-black">Total Accidents</h2>
            <p className="text-3xl font-bold">1,245</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-black">Lives Saved</h2>
            <p className="text-3xl font-bold">892</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-black">Hospitals Connected</h2>
            <p className="text-3xl font-bold">76</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-gray-500 text-black">Average Response Time</h2>
            <p className="text-3xl font-bold text-black">8 min</p>
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