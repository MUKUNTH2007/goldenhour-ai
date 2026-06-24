export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            GoldenHour AI
          </h1>

          <p className="text-xl mb-8">
            AI-Powered Emergency Response Network
          </p>

          <p className="max-w-3xl mx-auto text-lg">
            Helping accident victims receive faster medical
            treatment through AI-driven accident reporting,
            severity prediction, hospital recommendation,
            emergency alerts, and first aid assistance.
          </p>

        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-6">
          Why GoldenHour AI?
        </h2>

        <p className="text-gray-700 text-lg">
          The first hour after an accident is critical.
          GoldenHour AI helps emergency responders,
          hospitals, and citizens act quickly to save lives.
        </p>

      </section>

      {/* Emergency Actions */}
      <section className="max-w-6xl mx-auto px-6 py-10">

        <h2 className="text-3xl font-bold mb-8">
          Emergency Actions
        </h2>

        <div className="flex flex-wrap gap-4">

  <a href="/report" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
    Report Accident
  </a>

  <a href="/hospitals" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold">
    Find Hospital
  </a>

  <a href="/first-aid" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
    First Aid Assistant
  </a>

</div>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-10">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              Accident Reporting
            </h3>

            <p>
              Quickly report accidents with location,
              images and victim information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              Severity Prediction
            </h3>

            <p>
              AI predicts accident severity and
              recommends emergency actions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              Hospital Recommendation
            </h3>

            <p>
              Find nearby hospitals with ICU and
              trauma care availability.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}