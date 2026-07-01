"use client";

import { useState } from "react";

export default function ReportPage() {
  const [location, setLocation] = useState("");
const [vehicleType, setVehicleType] = useState("Car");
const [injuredCount, setInjuredCount] = useState("");
const [description, setDescription] = useState("");
const [message, setMessage] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const response = await fetch(
    "http://localhost:8000/accidents",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Reporter",
        location: location,
        description: `
Vehicle Type: ${vehicleType}
Injured Count: ${injuredCount}

${description}
        `,
      }),
    }
  );

  const data = await response.json();

  setMessage(data.message);

setLocation("");
setVehicleType("Car");
setInjuredCount("");
setDescription("");
};
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 text-black">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8 text-black">
          Report Accident
        </h1>
        {message && (
  <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
    {message}
  </div>
)}

       <form onSubmit={handleSubmit} className="space-y-6">

          {/* Location */}
          <div>
            <label className="block font-medium mb-2 text-black">
              Accident Location
            </label>

            <input
  type="text"
  placeholder="Enter accident location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-medium mb-2 text-black">
              Vehicle Type
            </label>

            <select
  value={vehicleType}
  onChange={(e) => setVehicleType(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
          </div>

          {/* Injured Count */}
          <div>
            <label className="block font-medium mb-2 text-black">
              Number of Injured
            </label>

            <input
  type="number"
  placeholder="Enter number"
  value={injuredCount}
  onChange={(e) => setInjuredCount(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2 text-black">
              Accident Description
            </label>

           <textarea
  rows={5}
  placeholder="Describe the accident..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border rounded-lg p-3"
/>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2 text-black">
              Upload Image
            </label>

            <input
              type="file"
              className="w-full border rounded-lg p-3 text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Submit Accident Report
          </button>

        </form>

      </div>

    </main>
  );
}