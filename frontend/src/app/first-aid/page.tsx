export default function FirstAidPage() {
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
          <div className="mb-6">
            <div className="bg-blue-100 p-4 rounded-lg max-w-xl">
              <p>
                Apply direct pressure using a clean cloth.
                Elevate the injured arm if possible and
                seek medical assistance immediately.
              </p>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-4 mt-8">

            <input
              type="text"
              placeholder="Describe the emergency..."
              className="flex-1 border rounded-lg p-3"
            />

            <button
              className="bg-blue-900 text-white px-6 py-3 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}