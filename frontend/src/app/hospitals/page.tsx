export default function HospitalsPage() {
  const hospitals = [
    {
      name: "City Trauma Center",
      distance: "2.5 km",
      icu: "Available",
      trauma: "Yes",
    },
    {
      name: "Apollo Emergency Hospital",
      distance: "4.2 km",
      icu: "Available",
      trauma: "Yes",
    },
    {
      name: "Government Medical College",
      distance: "6.1 km",
      icu: "Limited",
      trauma: "Yes",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Recommended Hospitals
        </h1>

        <div className="space-y-6">

          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {hospital.name}
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-4">

                <div>
                  <p className="font-medium">Distance</p>
                  <p>{hospital.distance}</p>
                </div>

                <div>
                  <p className="font-medium">ICU Status</p>
                  <p>{hospital.icu}</p>
                </div>

                <div>
                  <p className="font-medium">Trauma Center</p>
                  <p>{hospital.trauma}</p>
                </div>

              </div>

              <button className="bg-blue-900 text-white px-6 py-3 rounded-lg">
                Select Hospital
              </button>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}