"use client"
import {useState} from "react"

export default function SeverityPage() {

  const [vehicleType, setVehicleType] = useState("Bike");
const [injuredCount, setInjuredCount] = useState("");
const [description, setDescription] = useState("");

const [severity, setSeverity] = useState("");

const analyzeSeverity = async () => {
  const response = await fetch(
    "http://localhost:8000/severity",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vehicle_type: vehicleType,
        injured_count: Number(injuredCount),
        description: description,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  setSeverity(data.severity);
};
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          AI Severity Analysis
        </h1>
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">

  <div className="space-y-4">

    <select
      value={vehicleType}
      onChange={(e) => setVehicleType(e.target.value)}
      className="w-full border rounded-lg p-3"
    >
      <option>Bike</option>
      <option>Car</option>
      <option>Bus</option>
      <option>Truck</option>
    </select>

    <input
      type="number"
      placeholder="Number of Injured"
      value={injuredCount}
      onChange={(e) => setInjuredCount(e.target.value)}
      className="w-full border rounded-lg p-3"
    />

    <textarea
      placeholder="Describe accident"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full border rounded-lg p-3"
    />

    <button
  onClick={analyzeSeverity}
  className="bg-blue-900 text-white px-6 py-3 rounded-lg"
></button>

  </div>

</div>

        {/* Severity Card */}
        {severity && (
  <div className="bg-red-100 border-l-8 border-red-600 p-6 rounded-xl mb-8">

    <h2 className="text-2xl font-bold text-red-700">
      {severity} Severity Accident
    </h2>

    <p className="mt-3 text-gray-700">
      {severity === "High"
        ? "Immediate medical attention required."
        : "Monitor patient and seek medical evaluation."}
    </p>

  </div>
)}

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