
"use client";

import { useState } from "react";

export default function FirstAidPage() {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("English");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFirstAidAdvice = async () => {
    if (!description.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch(
        "http://localhost:8000/first-aid",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description,
            language,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong.");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to get first-aid advice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6 text-black">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          AI First Aid Assistant
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="mb-6">
            <div className="bg-blue-100 p-4 rounded-lg max-w-xl">
              Hello! Describe the emergency and I will provide first-aid guidance.
            </div>
          </div>

          <div className="mb-6">
            <label className="font-semibold">
              Response Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-lg p-3 w-full mt-2"
            >
              <option>English</option>
              <option>Tamil</option>
              <option>Hindi</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Describe the emergency..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                getFirstAidAdvice();
              }
            }}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={getFirstAidAdvice}
            disabled={loading}
            className="mt-4 bg-blue-900 text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Generating..." : "Send"}
          </button>

          {error && (
            <div className="mt-6 bg-red-100 p-4 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {answer && (
            <div className="mt-6 bg-blue-100 p-4 rounded-lg">
              <h2 className="font-bold mb-2">
                AI First Aid Advice
              </h2>

              <p>{answer}</p>
            </div>
          )}

          <div className="mt-8 text-sm text-gray-600 border-t pt-4">
            <strong>Disclaimer:</strong> This AI provides first-aid guidance
            only and does not replace professional medical care. Always contact
            emergency medical services for serious injuries.
          </div>

        </div>
        <button
  onClick={() => {
    setDescription("");
    setAnswer("");
    setError("");
  }}
  className="ml-4 bg-gray-300 px-4 py-3 rounded-lg"
>
  Clear
</button>

      </div>
    </main>
  );
}

