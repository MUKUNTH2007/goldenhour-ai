"use client";
import { useEffect, useState } from "react";

export default function HospitalsPage() {

  type Hospital = {
    id: number;
    name: string;
    available_beds: number;
    address: string;
    phone: string;
    latitude: number;
    longitude: number;
    distance_km: number;
    recommendation_score: number;
    emergency_available: boolean;
    is_best_match?: boolean;
  };

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState<{
  latitude: number;
  longitude: number;
} | null>(null);

  const accidentLocation = {
    latitude: 13.0827,
    longitude: 80.2707,
  };

  useEffect(() => {
  getLocation();
}, []);;

useEffect(() => {
  if (location) {
    fetchHospitals(location.latitude, location.longitude);
  }
}, [location]);

  const getLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      console.error(error);
      alert("Unable to fetch location");
    }
  );
};
const fetchHospitals = async (lat: number, lon: number) => {
  const response = await fetch(
    "http://localhost:8000/hospitals/recommend",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lon,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  setHospitals(data.data);
  setLoading(false);
};

  if (loading) {
  return (
    <main className="p-10">
      <h1 className = "text-black">📍 Detecting location and finding nearest hospitals...</h1>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 text-black">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Recommended Hospitals (AI Ranked)
        </h1>

        <div className="space-y-6">

          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`shadow-md rounded-xl p-6 border ${
                hospital.is_best_match
                  ? "bg-green-100 border-green-500"
                  : "bg-white"
              }`}
            >

              {/* Header */}
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-semibold text-black">
                  {hospital.name}
                </h2>

                {hospital.is_best_match && (
                  <span className="ml-3 bg-green-600 text-white text-sm px-2 py-1 rounded">
                    BEST MATCH
                  </span>
                )}
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">

                <div>
                  <p className="font-medium">Distance</p>
                  <p>{hospital.distance_km} km</p>
                </div>

                <div>
                  <p className="font-medium">AI Score</p>
                  <p>{hospital.recommendation_score}</p>
                </div>

                <div>
                  <p className="font-medium">Available Beds</p>
                  <p>{hospital.available_beds}</p>
                </div>

              </div>

              {/* Footer */}
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