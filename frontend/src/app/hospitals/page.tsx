"use client";
import {useEffect , useState} from "react";
export default function HospitalsPage() {

  type Hospital = {
  id: number;
  name: string;
  distance: string;
  beds: number;
}; 

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchHospitals();
}, []);

const fetchHospitals = async () => {
  const response = await fetch(
    "http://localhost:8000/hospitals"
  );

  const data = await response.json();

  console.log(data);

  setHospitals(data);
  setLoading(false);
};
if (loading) {
  return (
    <main className="p-10">
      <h1>Loading hospitals...</h1>
    </main>
  );
}

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
  <p className="font-medium">Available Beds</p>
  <p>{hospital.beds}</p>
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