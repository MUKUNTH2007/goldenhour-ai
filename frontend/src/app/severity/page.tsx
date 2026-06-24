export default function SeverityPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          AI Severity Analysis
        </h1>

        {/* Severity Card */}
        <div className="bg-red-100 border-l-8 border-red-600 p-6 rounded-xl mb-8">

          <h2 className="text-2xl font-bold text-red-700">
            High Severity Accident
          </h2>

          <p className="mt-3 text-gray-700">
            Immediate medical attention required.
          </p>

        </div>

        {/* Risk Score */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">

          <h3 className="text-xl font-semibold mb-4">
            Risk Score
          </h3>

          <div className="text-5xl font-bold text-red-600">
            87%
          </div>

          <p className="mt-3 text-gray-600">
            AI estimates a high probability of critical injuries.
          </p>

        </div>

        {/* Recommended Actions */}
        <div className="bg-white shadow-md rounded-xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            Recommended Actions
          </h3>

          <ul className="list-disc pl-6 space-y-2">

            <li>Call emergency services immediately.</li>

            <li>Alert nearby trauma centers.</li>

            <li>Prepare ICU bed allocation.</li>

            <li>Provide immediate first aid.</li>

          </ul>

        </div>

      </div>

    </main>
  );
}