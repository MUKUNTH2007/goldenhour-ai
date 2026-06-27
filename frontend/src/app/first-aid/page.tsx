"use client"
import {useState} from "react"
export default function FirstAidPage() {

  const [description, setDescription] = useState("");
const [advice, setAdvice] = useState<string[]>([]);

const getFirstAidAdvice = async () => {
  const response = await fetch(
    "http://localhost:8000/first-aid",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  setAdvice(data.advice);
};
  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          AI First Aid Assistant
        </h1>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg p-6">

          {/* AI Message */}
          <div className="mb-6">
            <div className="bg-blue-100 p-4 rounded-lg max-w-xl">
              <p>
                Hello! Describe the accident and I will
                provide first aid guidance.
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex justify-end mb-6">
            <div className="bg-green-100 p-4 rounded-lg max-w-xl">
              <p>
                The victim has bleeding from the arm.
              </p>
            </div>
          </div>

          {/* AI Response */}
          {advice.length > 0 && (
  <div className="mb-6">
    <div className="bg-blue-100 p-4 rounded-lg max-w-xl">

      <p className="font-semibold mb-2">
        AI First Aid Advice:
      </p>

      <ul className="list-disc pl-5 space-y-2">

        {advice.map((item, index) => (
          <li key={index}>{item}</li>
        ))}

      </ul>

    </div>
  </div>
)}

          {/* Input Area */}
          <div className="flex gap-4 mt-8">

           <input
  type="text"
  placeholder="Describe the emergency..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="flex-1 border rounded-lg p-3"
/>
            <button
  onClick={getFirstAidAdvice}
  className="bg-blue-900 text-white px-6 py-3 rounded-lg"
></button>
          </div>

        </div>

      </div>

    </main>
  );
}